import { ChatOllama } from '@langchain/community/chat_models/ollama';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
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
}
