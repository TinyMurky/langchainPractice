import { Module } from '@nestjs/common';
import { LangchainService } from './langchain.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [ConfigModule.forRoot()],
  providers: [LangchainService],
  exports: [LangchainService],
})
export class LangchainModule {}
