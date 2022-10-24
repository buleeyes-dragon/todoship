import Head from 'next/head';
import AddPost from "./AddPosts";
import PostCard from './Postcard';
import styles from '../styles/Home.module.css';
import {Text} from "@nextui-org/react";

export default function Home({ posts }) {
    console.log(posts);
    return (
        <div>
            <Head>
                <title>Home</title>
            </Head>

            {/*<Nav />*/}
            <AddPost/>
            <main>
                <div className={styles.container}>

                    {posts.length === 0 ? (
                        <Text size={5}>No added posts</Text>
                    ) : (
                        <ul>
                            {posts.map((post, i) => (
                                <PostCard post={post} key={i} />
                            ))}
                        </ul>
                    )}
                </div>
            </main>
        </div>
    );
}

