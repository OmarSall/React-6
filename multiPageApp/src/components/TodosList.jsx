import {useCallback, useEffect, useState} from "react";
import styles from "./TodosList.module.css";

export default function TodosList() {
    const [todos, setTodos] = useState([]);
    const [error, setError] = useState(null);

    const fetchTodos = useCallback(async () => {
        try {
            const response = await fetch("https://jsonplaceholder.typicode.com/todos");
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            setError("Failed to load todos. Please try again later.");
            console.error(error);
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
                </div>
            ))}
        </div>
    );
};