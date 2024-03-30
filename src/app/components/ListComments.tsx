import MarkdownRenderer from "@/src/app/lib/markdown"

type CommentProps =  {
    comment: IssueComment
}


export function ListComments({ comment }: CommentProps) {
    const { body, user, created_at } = comment
    return (
        <div>
            <MarkdownRenderer markdownText = {body} />
            <p className="comment-author" style = {{fontSize: '12px'}}>Posted by {user.login} on {new Date(created_at).toLocaleDateString()}</p>
        </div>
    )
}