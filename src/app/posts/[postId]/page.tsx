import { getSortedPostsData, getPostData } from '@/src/app/lib/getPosts'
import { notFound } from 'next/navigation'
import getFormattedDate from '@/src/app/lib/getFormattedDate'
import Link from 'next/link'
import { getIssueComments } from '@/src/app/lib/comments'
import { ListComments } from '@/src/app/components/ListComments'
import MarkdownRenderer from '../../lib/markdown'
import EditButton from '@/src/app/components/Button_Edit'
import DeleteButton from '@/src/app/components/Button_Delete'

export async function generateMetadata({ params }: { params: { postId: string} }) {
    const posts = await getSortedPostsData() // deduped!
    const { postId } = params
    const post = posts?.find(post => post.id === postId) // Add null check
    if (!post) {
        return {
            title: 'Post Not Found'
        }
    }
    return {
        title: post.title,
    }
}

export default async function Page({ params }: { params: { postId: string} }) {
    const posts = await getSortedPostsData() // deduped!
    const { postId } = params

    if (!posts?.find(post => post.id === postId)) {
        return notFound()
    }

    const blogPost = await getPostData(postId)
    
    const pubDate = getFormattedDate(blogPost.date)

    const comments = await getIssueComments(postId)
    
    const allcomments = comments.map(comment => ({
        id: comment.id.toString(),
        body: comment.body,
        created_at: comment.created_at,
        user: {
            login: comment.user.login,
        },
      }));

    return (
        <main className="px-6 prose prose-xl prose-slate dark:prose-invert mx-auto">
            <DeleteButton post = {blogPost} />
            <EditButton post = {blogPost} />
            <h1 className="text-3xl mt-4 mb-0">{blogPost.title}</h1>
            <p className="mt-0">
                {pubDate}
            </p>
            <article style={{wordBreak: 'break-word', overflowWrap: 'break-word'}}>
                <MarkdownRenderer markdownText ={ blogPost.contentHtml } />
                <p>
                    <Link href="/">← Back to home</Link>
                </p>
                <div className='flex flex-col gap-3'>
                    {allcomments?.map(comment => (
                        <ListComments key={comment.id} comment={comment} />
                    ))}
                </div>
            </article>
        </main>
    )
}