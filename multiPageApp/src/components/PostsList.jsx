import {useCallback, useEffect, useState} from "react";
import styles from "./PostsList.module.css";
import { Link } from "react-router"

export default function PostsList() {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(null);

    const fetchPosts = useCallback(async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/posts");
            if (!response.ok) {
                const message = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${message}`)
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            setError("Failed to load posts. Please try again later.");
            console.error("Error fetching post:", error);
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
                    <Link to={`/posts/${id}`}>Read more</Link>
                    <p>{body}</p>
                </div>
            ))}
        </div>
    );
};