type Post = {
    id: string,
    title: string,
    date: string,
}

type IssueComment = {
    id: string,
    body: string,
    created_at: string,
    user: {
        login: string,
    },
}