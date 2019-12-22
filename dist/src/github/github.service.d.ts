import { AxiosResponse } from 'axios';
import { AuthPayload } from './interfaces/auth-payload.interface';
export declare class GithubService {
    private readonly clientId;
    private readonly clientSecret;
    getAuthToken(body: AuthPayload): Promise<string>;
    static hasResponseFailed(res: AxiosResponse): boolean;
}
