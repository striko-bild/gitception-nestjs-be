import { GithubService } from './github.service';
import { AuthPayload } from './interfaces/auth-payload.interface';
export declare class GithubController {
    private readonly githubService;
    constructor(githubService: GithubService);
    auth(body: AuthPayload): Promise<string>;
}
