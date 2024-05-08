import { Ollama } from '@langchain/community/llms/ollama';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { StringOutputParser } from '@langchain/core/output_parsers';
import { DirectoryLoader } from 'langchain/document_loaders/fs/directory';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { RecursiveCharacterTextSplitter } from 'langchain/text_splitter';
import { OllamaEmbeddings } from '@langchain/community/embeddings/ollama';
import { MemoryVectorStore } from 'langchain/vectorstores/memory';
import { writeFileSync } from 'fs';
@Injectable()
export class LangchainService {
  private readonly ollama: Ollama;
  private readonly baseUrl: string =
    this.configService.get<string>('OLLAMA_URL');

  constructor(private readonly configService: ConfigService) {
    this.ollama = new Ollama({
      baseUrl: this.baseUrl,
      model: 'llama3',
    });
  }

  public async invoke(): Promise<void> {
    const invokeResult = await this.ollama.invoke('What is LangSmith?');
    console.log(JSON.stringify(invokeResult, null, 2));
  }

  public async withPromptTemplate(): Promise<void> {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are the world class LLM engineer.'],
      ['user', '{input}'],
    ]);

    const chain = prompt.pipe(this.ollama);

    const invokeResult = await chain.invoke({ input: 'What is LangSmith?' });
    console.log(JSON.stringify(invokeResult, null, 2));
  }

  public async withOutputParser(): Promise<void> {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are the world class LLM engineer.'],
      ['user', '{input}'],
    ]);

    const outputParser = new StringOutputParser();

    const chain = prompt.pipe(this.ollama).pipe(outputParser);

    const invokeResult = await chain.invoke({ input: 'What is LangSmith?' });
    console.log(invokeResult);
  }

  public async splitText(): Promise<void> {
    const directoryLoader = new DirectoryLoader(
      '/home/tinymurky/Documents/IFRS/',
      {
        '.pdf': (path: string) => new PDFLoader(path),
      },
    );

    const docs = await directoryLoader.load();

    console.log({ docs });

    /* Additional steps : Split text into chunks with any TextSplitter. You can then use it as context or save it to memory afterwards. */
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    });

    const splitDocs = await textSplitter.splitDocuments(docs);

    // 記得要先pull ollama pull nomic-embed-text
    const embeddings = new OllamaEmbeddings({
      model: 'nomic-embed-text',
      baseUrl: this.baseUrl,
    });

    const vectorStore = await MemoryVectorStore.fromDocuments(
      splitDocs,
      embeddings,
    );

    const json = vectorStore.toJSON();
    writeFileSync(
      '/home/tinymurky/Documents/IFRS_vector_store.json',
      JSON.stringify(json, null, 2),
    );
  }
}
