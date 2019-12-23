import { Module } from '@nestjs/common';
import { GithubService } from './github.service';
import { GithubController } from './github.controller';
import { ConfigModule } from 'src/config/config.module';

@Module({
    imports: [ ConfigModule ],
    providers: [ GithubService ],
    controllers: [ GithubController ],
})

export class GithubModule { }
