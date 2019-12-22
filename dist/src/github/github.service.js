"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var GithubService_1;
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const common_1 = require("@nestjs/common");
let GithubService = GithubService_1 = class GithubService {
    constructor() {
        this.clientId = '5a4442d08297067abfef';
        this.clientSecret = '2a49003dad2e139b4109a441a793c7d4dcec189c';
    }
    getAuthToken(body) {
        return __awaiter(this, void 0, void 0, function* () {
            const params = {
                client_id: this.clientId,
                client_secret: this.clientSecret,
                code: body.code,
            };
            const result = yield axios_1.default({
                method: 'POST',
                url: 'https://github.com/login/oauth/access_token',
                params,
            });
            if (GithubService_1.hasResponseFailed(result)) {
                throw new common_1.InternalServerErrorException('Authentication failed');
            }
            const data = result.data;
            console.log('data', data);
            return data.access_token;
        });
    }
    static hasResponseFailed(res) {
        if (res.data.success === false || res.data.Success === false) {
            return true;
        }
    }
};
GithubService = GithubService_1 = __decorate([
    common_1.Injectable()
], GithubService);
exports.GithubService = GithubService;
//# sourceMappingURL=github.service.js.map