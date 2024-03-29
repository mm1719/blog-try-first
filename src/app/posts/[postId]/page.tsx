import { getSortedPostsData, getPostData } from '@/src/app/lib/posts'
import { notFound } from 'next/navigation'
import getFormattedDate from '@/src/app/lib/GetFormattedDate'
import Link from 'next/link'
import { getIssueComments } from '@/src/app/lib/comments'
import { ListComments } from '@/src/app/components/ListItem'

export async function generateStaticParams() {
    const posts = await getSortedPostsData() // deduped!
    return posts?.map((post) => ({
        postId: post.id
    }))
}

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

    const { title, date, contentHtml } = await getPostData(postId)
    
    const pubDate = getFormattedDate(date)

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
            <h1 className="text-3xl mt-4 mb-0">{title}</h1>
            <p className="mt-0">
                {pubDate}
            </p>
            <article>
                <section dangerouslySetInnerHTML={{ __html: contentHtml }} />
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