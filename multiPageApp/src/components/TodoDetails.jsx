import {useEffect, useState, useCallback} from "react";
import {useNavigate, useParams} from "react-router";
import styles from "./TodosList.module.css";

export default function TodoDetails() {
    const navigate = useNavigate();
    const {id} = useParams()
    const [todo, setTodo] = useState(null);
    const [error, setError] = useState(null);

    const handleDelete = async () => {
        try {
            await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
                method: "DELETE",
            });
            navigate("/todos");
        } catch (err) {
            console.error(err);
            setError("Failed to delete the todo.");
        }
    };

    const fetchTodo = useCallback(async () => {
        if (!id) {
            return;
        }

        try {
            const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`)
            if (!response.ok) {
                const message = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${message}`)
            }
            const data = await response.json()
            setTodo(data);
        } catch (error) {
            setError("Failed to load the todo. Please try again later.");
            console.error("Error fetching todo:", error);
        }
    }, [id]);

    useEffect(() => {
        setTodo(null);
        (async () => {
            await fetchTodo();
        })();
    }, [fetchTodo])

    return (
        <div>
            <h2>To-do of id: {id}</h2>

            {error && <p className={styles.error}>{error}</p>}

            {!error && !todo ? (
                <p>Loading...</p>
            ) : (
                todo && (
                    <>
                        <button onClick={handleDelete}>Delete</button>
                        <div key={todo.id} className={styles.todoItem}>
                            <p>
                                <span className={styles.title}>{todo.title}</span>
                                – {todo.completed ? "✅ Done" : "❌ Not done"}
                            </p>
                        </div>
                    </>
                )
            )}
        </div>
    );
}