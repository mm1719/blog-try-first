import Link from 'next/link'
import getFormattedDate from '@/src/app/lib/GetFormattedDate'
// tsrfc 牛逼

type PostProps = {
    post: Post
}

type CommentProps =  {
    comment: IssueComment
}

export function ListPosts({ post }: PostProps) {
    const { id, title, date } = post
    const formattedDate = getFormattedDate(date)
    return (
        <div className="mt-4 text-2xl dark:text-white/90">
            <Link className="underline hover:text-black/70 dark:hover:text-white" href={`/posts/${id}`}>{title}</Link>
            <br />
            <p className="text-sm mt-1">{formattedDate}</p>
        </div>
    )
}

export function ListComments({ comment }: CommentProps) {
    const { body, user, created_at } = comment
    return (
        <div>
            <section dangerouslySetInnerHTML={{ __html: body }} />
            <p className="comment-author" style = {{fontSize: '12px'}}>Posted by {user.login} on {new Date(created_at).toLocaleDateString()}</p>
        </div>
    )
}