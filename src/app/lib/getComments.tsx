'use server'

import fetch from 'node-fetch';
import { remark } from 'remark';
import html from 'remark-html';
import { RepoOwner, RepoName } from '@/src/app/lib/env'

interface GitHubComment {
    id: number;
    body: string;
    user: {
        login: string;
    };
    created_at: string;
}

export async function getIssueComments(id: string) {
    const url = `https://api.github.com/repos/${RepoOwner}/${RepoName}/issues/${id}/comments`;
    const commentsResponse = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
        },
    });

    if (!commentsResponse.ok) {
        throw new Error('GitHub API response not OK.');
    }

    const comments = await commentsResponse.json() as GitHubComment[];
    return comments;
}