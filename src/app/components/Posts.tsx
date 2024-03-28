"use client"

import React, { useEffect, useState } from 'react'
import { getSortedPostsData } from '@/src/app/lib/posts'
import ListItem from '@/src/app/components/ListItem'

// Assuming your post type looks something like this
type Post = {
    id: string;
    title: string;
    date: string;
}

export default function Posts() {
    // Use useState to hold your posts
    const [posts, setPosts] = useState<Post[]>([]);

    // Use useEffect to fetch the data when the component mounts
    useEffect(() => {
        async function fetchData() {
            // Call the async function getSortedPostsData and update state
            const sortedPostsData = await getSortedPostsData();
            setPosts(sortedPostsData);
        }
        fetchData();
    }, []); // The empty array means this effect runs once on mount

    return (
        <section className="mt-6 mx-auto max-w-2xl">
            <h2 className="text-4xl font-bold dark:text-white/90">Recent Posts</h2>
            <ul className="w-full">
                {posts.map(post => (
                    <ListItem key={post.id} post={post} />
                ))}
            </ul>
        </section>
    )
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