import { useState } from 'react';

import styles from '../styles/Home.module.css';
import {Text} from "@nextui-org/react";

export default function AddPost() {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [error, setError] = useState('');
    const [message, setMessage] = useState('');

    const handlePost = async (e) => {
        e.preventDefault();

        // reset error and message
        setError('');
        setMessage('');

        // fields check
        if (!title || !content) return setError('All fields are required');

        // post structure
        let post = {
            title,
            content,
            published: false,
            createdAt: new Date().toISOString(),
        };
        // save the post
        let response = await fetch('/api/posts', {
            method: 'POST',
            body: JSON.stringify(post),
        });

        // get the data
        let data = await response.json();

        if (data.success) {
            // reset the fields
            setTitle('');
            setContent('');
            // set the message
            return setMessage(data.message);
        } else {
            // set the error
            return setError(data.message);
        }
    };

    return (
        <div>
            {/*<Nav />*/}
            <div className={styles.container}>
                <form onSubmit={handlePost} className={styles.form}>
                    {error ? (
                        <div className={styles.formItem}>
                            <Text className={styles.error}>{error}</Text>
                        </div>
                    ) : null}
                    {message ? (
                        <div className={styles.formItem}>
                            <Text size={6} className={styles.message}>{message}</Text>
                        </div>
                    ) : null}
                    <div className={styles.formItem}>
                        <Text size={6} >Title</Text>
                        <input
                            type="text"
                            name="title"
                            onChange={(e) => setTitle(e.target.value)}
                            value={title}
                            style={{fontSize: "1.5rem"}}
                            placeholder="title"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <Text size={6}>Content</Text>
                        <textarea
                            name="content"
                            onChange={(e) => setContent(e.target.value)}
                            value={content}
                            style={{fontSize: "1.5rem"}}
                            placeholder="Post content"
                        />
                    </div>
                    <div className={styles.formItem}>
                        <button style={{fontSize:"1.5rem"}} type="submit">Add post</button>
                    </div>
                </form>
            </div>
        </div>
    );
}