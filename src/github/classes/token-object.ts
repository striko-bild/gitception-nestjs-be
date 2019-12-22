// tslint:disable-next-line:variable-name
export class TokenObject {
    accessToken: string;
    tokenType; string;
    scope: string;

    constructor(tokenString: string) {
        tokenString.split('&').forEach((keyVal) =>{
            const [ k, v ] = keyVal.split('=');
            switch (k) {
                case 'access_token':
                    this.accessToken = v;
                    break;
                case 'scope':
                    this.scope = v;
                    break;
                case 'token_type':
                    this.tokenType = v;
                    break;
                default:
                    break;
            }
        });
    }
}
