import {useCallback, useEffect, useState} from "react";
import styles from "./PostsList.module.css";

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) {
                throw new Error("Failed to load posts.");
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setError("Failed to load posts. Please try again later.");
            console.error(error);
        }
    }, []);

    useEffect(() => {
        (async () => {
            await fetchPosts();
        })();
    }, [fetchPosts]);

    return (
        <div>
            <h2>Posts</h2>
            {error && <p className={styles.error}>{error}</p>}
            {posts.map(({ title, body, id }) => (
                <div key={id} className={styles.post}>
                    <p className={styles.title}><strong>{title}</strong></p>
                    <p>{body}</p>
                </div>
            ))}
        </div>
    );
};