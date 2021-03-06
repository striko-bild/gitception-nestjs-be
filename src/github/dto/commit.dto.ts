import { CommitInfo } from '../interfaces/commit-list.interface';
import * as moment from 'moment';
import { ApiProperty } from '@nestjs/swagger';

export class CommitDto {
    @ApiProperty()
    sha: string;

    @ApiProperty()
    author: string;

    @ApiProperty()
    authoredTime: string;

    @ApiProperty()
    committer: string;

    @ApiProperty()
    commitTime: string;

    @ApiProperty()
    commitMessage: string;

    @ApiProperty()
    url: string;

    constructor(commitInfo: CommitInfo) {
        this.sha = commitInfo.sha;
        this.author = `${commitInfo.commit.author.name} ${commitInfo.commit.author.email}`;
        this.authoredTime = moment(commitInfo.commit.author.date).format('MMMM Do YYYY, h:mm:ss a');
        this.committer = `${commitInfo.commit.committer.name} ${commitInfo.commit.committer.email}`;
        this.commitTime = moment(commitInfo.commit.committer.date).format('MMMM Do YYYY, h:mm:ss a');
        this.commitMessage = commitInfo.commit.message;
        this.url = commitInfo.html_url;
    }

}
