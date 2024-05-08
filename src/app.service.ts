import { Injectable } from '@nestjs/common';
import { LangchainService } from './langchain/langchain.service';
@Injectable()
export class AppService {
  constructor(private readonly langchainService: LangchainService) {}

  start(): string {
    //this.langchainService.invoke();
    this.langchainService.splitText();
    return 'Hello World!';
  }
}
