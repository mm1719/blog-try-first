import type { NextApiRequest, NextApiResponse } from 'next';
import { RepoOwner, RepoName } from '@/src/app/lib/env'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method !== 'PATCH') {
        return res.status(405).end(); // Method Not Allowed
    }

    // Extract data from the request body
    const { issueNumber } = req.body;

    const url = `https://api.github.com/repos/${RepoOwner}/${RepoName}/issues/${issueNumber}`;

    const response = await fetch(url, {
        method: 'PATCH',
        headers: {
            'Authorization': `Bearer ${process.env.GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
        },
        body: JSON.stringify({
            state: "closed",
        }),
    });

    if (!response.ok) {
        // Handle errors, e.g., issue not found or deletion failed
        return res.status(response.status).json({ error: 'Failed to delete the issue' });
    }

    res.status(204).end();
}
