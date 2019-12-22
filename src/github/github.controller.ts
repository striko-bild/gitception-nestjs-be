import { Controller, Post, Body, Get, Headers } from '@nestjs/common';
import { GithubService } from './github.service';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { TokenObject } from './classes/token-object';
import { CommitDto } from './dto/commit.dto';

@Controller('github')
export class GithubController {

    constructor(private readonly githubService: GithubService) { }

    @Post('auth')
    async auth(@Body() body: AuthPayload): Promise<TokenObject> {
        const token = await this.githubService.getAuthToken(body);
        return token;
    }

    @Get('commit')
    async getCommitList(@Headers('authorization') accessToken: string): Promise<CommitDto[]> {
        return this.githubService.getCommitList(accessToken);
    }

}
