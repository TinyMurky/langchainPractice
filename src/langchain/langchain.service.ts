import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ChatPromptTemplate } from '@langchain/core/prompts';

@Injectable()
export class LangchainService {
  private readonly chatOllama: ChatOllama;
  private readonly baseUrl: string =
    this.configService.get<string>('OLLAMA_URL');

  constructor(private readonly configService: ConfigService) {
    this.chatOllama = new ChatOllama({
      baseUrl: this.baseUrl,
      model: 'llama3',
    });
  }

  public async invoke(): Promise<void> {
    const invokeResult = await this.chatOllama.invoke('What is LangSmith?');
    console.log(JSON.stringify(invokeResult, null, 2));
  }

  public async withPromptTemplate(): Promise<void> {
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', 'You are the world class LLM engineer.'],
      ['user', '{input}'],
    ]);

    const chain = prompt.pipe(this.chatOllama);

    const invokeResult = await chain.invoke({ input: 'What is LangSmith?' });
    console.log(JSON.stringify(invokeResult, null, 2));
  }
}
