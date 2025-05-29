import { useEffect, useState,  useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./PostsList.module.css";

export default function PostDetails() {
    const navigate = useNavigate();
    const { id } = useParams();
    const [post, setPost] = useState();
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`,
            {
                method: "DELETE",
            });

        navigate("/posts");
    }

    const fetchPost = useCallback(async () => {
        if (!id) {
            return;
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
            if (!response.ok) {
                const message = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${message}`)
            }
            const data = await response.json();
            setPost(data);
        } catch (error) {
            setError("Failed to load the post. Please try again later.");
            console.error("Error fetching post:", error);
        }
    }, [id]);

    useEffect(() => {
        setPost(null);
        (async () => {
            await fetchPost();
        })();
    }, [fetchPost])

    if (!post) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <button onClick={handleDelete}>Delete</button>
            {error && <p className={styles.error}>{error}</p>}
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
};