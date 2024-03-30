import type { NextApiRequest, NextApiResponse } from 'next';
import { GitHubToken, RepoOwner, RepoName } from '@/src/app/lib/env'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'POST') {
        return res.status(405).end(); // Method Not Allowed
    }

    // Extract data from the request body
    const { issueNumber, title, body } = req.body;

    const response = await fetch(`https://api.github.com/repos/${RepoOwner}/${RepoName}/issues/${issueNumber}`, {
        method: 'PATCH',
        headers: {
            'Authorization': `token ${GitHubToken}`,
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            title,
            body,
        }),
    });

    if (!response.ok) {
        // Extract error message from response, if any
        const errorData = await response.json();
        return res.status(500).json({ message: errorData.message || 'Failed to update the issue' });
    }

    // Successfully updated the issue
    const updatedIssue = await response.json();
    return res.status(200).json(updatedIssue);
}
