import { AuthPayload } from 'dist/src/github/interfaces/auth-payload.interface';
import { TokenObject } from 'src/github/classes/token-object';
import { CommitDto } from 'src/github/dto/commit.dto';

export class GithubMockService {

    async getAuthToken(body: AuthPayload): Promise<TokenObject> {
        return require('./tokenObject.json');
    }

    async getCommitList(accessToken: string): Promise<CommitDto[]> {
        return require('./commitList.json');
    }

}
