import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { TokenObject } from './classes/token-object';
import { CommitDto } from './dto/commit.dto';
import { ConfigService } from 'src/config/config.service';

@Injectable()
export class GithubService {

    private clientId: string;
    private clientSecret: string;
    private githubUrl: string;
    private githubApiUrl: string;

    constructor(private configService: ConfigService) {
        this.clientId = configService.GITHUB_CLIENT_ID;
        this.clientSecret = configService.GITHUB_CLIENT_SECRET;
        this.githubUrl = configService.GITHUB_URL;
        this.githubApiUrl = configService.GITHUB_API_URL;
    }

    async getAuthToken(body: AuthPayload): Promise<TokenObject> {
        const params = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code: body.code,
        };

        const result = await axios({
            method: 'POST',
            url: `${this.githubUrl}/login/oauth/access_token`,
            params,
        }).catch((err) => {
            throw new Error(err);
        });

        const data = result && new TokenObject(result.data);
        return data;
    }

    async getCommitList(accessToken: string): Promise<CommitDto[]> {
        const res = await axios({
            method: 'GET',
            headers: {
                Authorization: accessToken,
                Accept: 'application/vnd.github.v3+json',
            },
            url: `${this.githubApiUrl}/repos/striko-bild/gitception/commits`,
        }).catch((err) => {
            throw new Error(err);
        });

        return res && res.data.map((commitInfo) => new CommitDto(commitInfo));
    }

}
