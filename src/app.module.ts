import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GithubModule } from './github/github.module';
import { ConfigModule } from './config/config.module';

@Module({
  imports: [ GithubModule, ConfigModule ],
  controllers: [ AppController ],
  providers: [ AppService ],
})

export class AppModule {}
