import axios from 'axios';
import { Injectable } from '@nestjs/common';
import { AuthPayload } from './interfaces/auth-payload.interface';
import { TokenObject } from './classes/token-object';
import { CommitDto } from './dto/commit.dto';

@Injectable()
export class GithubService {

    private readonly clientId = '5a4442d08297067abfef';
    private readonly clientSecret = '2a49003dad2e139b4109a441a793c7d4dcec189c';

    async getAuthToken(body: AuthPayload): Promise<TokenObject> {
        const params = {
            client_id: this.clientId,
            client_secret: this.clientSecret,
            code: body.code,
        };

        const result = await axios({
            method: 'POST',
            url: 'https://github.com/login/oauth/access_token',
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
            url: 'https://api.github.com/repos/striko-bild/gitception/commits',
        }).catch((err) => {
            throw new Error(err);
        });

        return res && res.data.map((commitInfo) => new CommitDto(commitInfo));
    }

}
