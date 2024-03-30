'use server'

import path from 'path';
import matter from 'gray-matter';
import {remark} from 'remark';
import html from 'remark-html';
import fetch from 'node-fetch';
import { GitHubToken, RepoOwner, RepoName } from '@/src/app/lib/env'

//const githubToken = process.env.GITHUB_TOKEN as string;
//const repoOwner = process.env.GITHUB_REPO_OWNER as string;
//const repoName = process.env.GITHUB_REPO_NAME as string;

// Type definition for GitHub issues
interface GitHubIssue {
    number: number;
    title: string;
    created_at: string;
    body: string;
}

/**
 * Fetches GitHub issues with optional pagination.
 * 
 * @param perPage - Number of issues per page (max 100).
 * @param page - Page number of issues to fetch.
 * @returns An array of GitHubIssue objects.
 */

async function fetchGitHubIssues(page?: number, perPage?: number): Promise<GitHubIssue[]> {
  // Construct the URL with optional query parameters for pagination
    let url = `https://api.github.com/repos/${RepoOwner}/${RepoName}/issues`;
    const params = new URLSearchParams();
    
    if (perPage) params.append('per_page', perPage.toString());
    if (page) params.append('page', page.toString());
    
    if (params.toString()) url += `?${params.toString()}`;
    console.log(url);
    const issuesResponse = await fetch(url, {
        headers: {
            'Authorization': `Bearer ${GitHubToken}`,
        },
    });

    if (!issuesResponse.ok) {
        throw new Error('GitHub API response not OK.');
    }

    const issues = await issuesResponse.json() as GitHubIssue[];
    /*if (page && page > 1) {
        console.log(issues)
    }*/
    return issues;
}

// Function to get sorted posts data from GitHub issues
export async function getSortedPostsData(page?: number, perPage?: number) {
    const issues = await fetchGitHubIssues(page, perPage);
    if (issues.length === 0) {
      return null;
    }
    const allPostsData = issues.map(issue => ({
      id: issue.number.toString(),
      title: issue.title,
      date: issue.created_at,
    }));
    //.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    return allPostsData;
}

// Function to get post data for a specific issue by ID
export async function getPostData(id: string) {
    const issueResponse = await fetch(`https://api.github.com/repos/${RepoOwner}/${RepoName}/issues/${id}`, {
        headers: {
          'Authorization': `Bearer ${GitHubToken}`,
        },
    });
    if (!issueResponse.ok) {
        throw new Error('GitHub API response not OK.');
    }

    const issue = await issueResponse.json() as GitHubIssue;

    // Processing Markdown content to HTML
    const processedContent = await remark()
      .use(html)
      .process(issue.body);
    
    const contentHtml = processedContent.toString();
    //console.log(issue.body)
    const postData = {
        id: issue.number,
        title: issue.title,
        date: issue.created_at,
        contentHtml,
    };

    return postData;
}


/*
const postsDirectory = path.join(process.cwd(), 'blogposts');

export function getSortedPostsData() {
  // Get file names under /posts
  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames.map((fileName) => {
    // Remove ".md" from file name to get id
    const id = fileName.replace(/\.md$/, '');

    // Read markdown file as string
    const fullPath = path.join(postsDirectory, fileName);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const post: Post = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
    }

    // Combine the data with the id
    return post
  });
  // Sort posts by date
  return allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });
}

export async function getPostData(id: string) {
    const fullPath = path.join(postsDirectory, `${id}.md`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');

    // Use gray-matter to parse the post metadata section
    const matterResult = matter(fileContents);

    const processedContent = await remark()
        .use(html)
        .process(matterResult.content);

    const contentHtml = processedContent.toString();

    const blogPostWithHTML: Post & { contentHtml: string } = {
        id,
        title: matterResult.data.title,
        date: matterResult.data.date,
        contentHtml,
    }

    // Combine the data with the id
    return blogPostWithHTML
}
*/