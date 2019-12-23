import {
    Controller,
    Post,
    Body,
    Get,
    Headers,
    NotFoundException,
    UnauthorizedException,
    InternalServerErrorException,
    BadRequestException,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { GithubService } from './github.service';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { TokenObject } from './classes/token-object';
import { CommitDto } from './dto/commit.dto';

@ApiTags('Github')
@Controller('github')
export class GithubController {

    constructor(private readonly githubService: GithubService) { }

    @Post('auth')
    @ApiOperation({ summary: 'Authenticate - generate Github access token from the code provided.' })
    @ApiResponse({ status: 200, description: 'Retrieved token.', type: TokenObject })
    @ApiResponse({ status: 400, description: 'Not Found.', type: BadRequestException })
    @ApiResponse({ status: 500, description: 'Internal server error.', type: InternalServerErrorException })
    async auth(@Body() body: AuthPayload): Promise<TokenObject> {
        const token = await this.githubService.getAuthToken(body);
        return token;
    }

    @Get('commit')
    @ApiOperation({ summary: 'Retrieve a list of commits.' })
    @ApiResponse({ status: 200, description: 'Retrieved list of commits.', type: [CommitDto] })
    @ApiResponse({ status: 401, description: 'Unauthorized', type: UnauthorizedException })
    @ApiResponse({ status: 404, description: 'Not Found.', type: NotFoundException })
    @ApiResponse({ status: 500, description: 'Internal server error.', type: InternalServerErrorException })
    async getCommitList(@Headers('authorization') accessToken: string): Promise<CommitDto[]> {
        if (!accessToken) {
            throw new UnauthorizedException('Token not found in the header');
        }
        return this.githubService.getCommitList(accessToken);
    }

}
