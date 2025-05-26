import { useEffect, useState,  useCallback } from "react";
import { useNavigate, useParams } from "react-router";

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
                throw new Error("Failed to load post.");
            }
            const data = await response.json();
            setPost(data);
        } catch (error) {
            console.error(error);
            setError("Something went wrong while loading the post.");
        }
    }, [id]);

    useEffect(() => {
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
            <h2>{post.title}</h2>
            <p>{post.body}</p>
        </div>
    );
};