import { GithubService } from 'src/github/github.service';
import { AppModule } from 'dist/src/app.module';
import { INestApplication } from '@nestjs/common';
import { TokenObject } from 'src/github/classes/token-object';
import { Test } from '@nestjs/testing';
import { GithubMockService } from 'test/__mocks__/github-mock-service';

describe('Github Service', () => {
  let app: INestApplication;
  let githubService: GithubService;
  let authToken: TokenObject;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [AppModule],
    })
    .overrideProvider(GithubService)
    .useValue(new GithubMockService())
    .compile();

    app = module.createNestApplication();
    githubService = app.get(GithubService);
    authToken = await githubService.getAuthToken({ code: '2132541255215'});

    await app.init();
  });

  it('to return Github auth token', async () => {
    const tokenProps = ['accessToken', 'tokenType', 'scope'];

    expect(Object.keys(authToken)).toEqual(tokenProps);
    for (const prop of tokenProps) {
        expect(authToken[prop]).toBeDefined();
    }
  });

  it('to return commit lsit', async () => {
    const commitList = await githubService.getCommitList(authToken.accessToken);

    const commitInfoProps = [
        'sha',
        'author',
        'authoredTime',
        'committer',
        'commitTime',
        'commitMessage',
        'url',
    ];

    expect(commitList).toBeInstanceOf(Array);
    expect(commitList.length).toBeGreaterThan(0);
    expect(Object.keys(commitList[0])).toEqual(commitInfoProps);
    for (const prop of commitInfoProps) {
        expect(commitList[0][prop]).toBeDefined();
    }
  });

});
