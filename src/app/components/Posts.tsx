import InfiniteScrollPosts from "@/src/app/components/InfiniteScroll";
import { getSortedPostsData } from "@/src/app/lib/getPosts";

const NUMBER_OF_POSTS = 10

export default async function Posts() {
    const initialPosts = await getSortedPostsData(1, NUMBER_OF_POSTS);
    if (initialPosts === null) {
        return
    }
    return <InfiniteScrollPosts initialPosts={initialPosts}/>
}


/*
export default function Post() {
    const posts = getSortedPostsData()

    return (
        <section className="mt-6 mx-auto max-w-2xl">
        <h2 className="text-4xl font-bold dark:text-white/90">Blog</h2>
        <ul className="w-full">
            {posts.map(post => (
                <ListItem key={post.id} post={post} />
            ))}
        </ul>
        </section>
    )
}
*/