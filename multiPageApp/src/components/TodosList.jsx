import {useCallback, useEffect, useState} from "react";
import styles from "./TodosList.module.css";
import { Link } from "react-router"

export default function TodosList() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    const fetchTodos = useCallback(async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            if (!response.ok) {
                const message = await response.text();
                throw new Error(`HTTP error! Status: ${response.status} - ${message}`);
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            setError("Failed to load todos. Please try again later.");
            console.error("Error fetching todos:", error);
        }
    }, []);

    useEffect(() => {
        (async () => {
            await fetchTodos();
        })();
    }, [fetchTodos])

    return (
        <div>
            <h2>Todos</h2>
            {error && <p className={styles.error}>{error}</p>}
            {todos.map(({ id, title, completed }) => (
                <div key={id} className={styles.todoItem}>
                    <p>
                        <span className={styles.title}>{title}</span>
                        – {completed ? "✅ Done" : "❌ Not done"}
                    </p>
                    <Link to={`/todos/${id}`}>Read more</Link>
                </div>
            ))}
        </div>
    );
};