import { useEffect, useState,  useCallback } from "react";
import { useNavigate, useParams } from "react-router";
import styles from "./TodosList.module.css";

export default function TodoDetails() {
    const navigate = useNavigate();
    const { id } = useParams()
    const [todo, setTodo] = useState([]);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`,
            {
                method: "DELETE",
            });

        navigate("/todos");
    }

    const fetchTodo = useCallback( async () => {
        if (!id) {
            return;
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            if (!response.ok) {
                throw new Error("Failed to load todo.");
            }
            const data = await response.json()
            setTodo(data);
        } catch (error) {
            console.error(error);
            setError("Something went wrong while loading the todo.")
        }
    }, [id]);

    useEffect(() => {
        (async () => {
            await fetchTodo();
        })();
    }, [fetchTodo])

    if (error) {
        return <p className={styles.error}>{error}</p>;
    }


    if (!todo) {
        return <p>Loading...</p>;
    }

    const { title, completed } = todo;

    return (
        <div>
            <h2>To-do of id: {id}</h2>
            {error && <p className={styles.error}>{error}</p>}
            <button onClick={handleDelete}>Delete</button>
            <div key={id} className={styles.todoItem}>
                <p>
                    <span className={styles.title}>{title}</span>
                    – {completed ? "✅ Done" : "❌ Not done"}
                </p>
            </div>
        </div>
    );
};