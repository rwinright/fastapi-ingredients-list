import axios from 'axios'
import React, { useEffect, useState } from 'react'
import AddButton from '../shared_components/add_button/AddButton'

const Todos = () => {
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        fetchTodos()
    }, [])

    const [todos, setTodos] = useState([{ title: "Loading...", description: "Loading..." }])

    const [todoMenuOpen, setTodoMenuOpen] = useState(false)

    const fetchTodos = async () => {
        try {
            const data = await axios.get('http://127.0.0.1:8000/todos')
            const todosArray = Object.keys(data.data).map(key => {
                const constructedData = {
                    id: key,
                    ...data.data[key]
                }
                return constructedData;
            })

            setTodos(todosArray)
            setLoading(false)
        } catch (error) {
            console.log(error)
        }
    }

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://127.0.0.1:8000/todos/${id}`)
            fetchTodos()
        } catch (error) {
            console.log(error)
        }
    }

    const AddTodoMenu = () => {

        const handleAdd = async (task) => {
            console.log(task)
            //Set the task id to the length of the todos array + 1
            task.id = todos.length + 1
            try {
                await axios.post(`http://127.0.0.1:8000/todos`, task)
                fetchTodos()
                setTodoMenuOpen(false)
            } catch (error) {
                console.log(error)
                setTodoMenuOpen(false)
            }
        }

        const seedTodos = async () => {
            const todos = [
                {
                    "id": 1,
                    "task": "Do the dishes",
                    "complete": false
                },
                {
                    "id": 2,
                    "task": "Buy groceries",
                    "complete": false
                },
                {
                    "id": 3,
                    "task": "Take out the trash",
                    "complete": false
                },
                {
                    "id": 4,
                    "task": "Call mom",
                    "complete": false
                },
                {
                    "id": 5,
                    "task": "Pay bills",
                    "complete": false
                },
                {
                    "id": 6,
                    "task": "Go for a run",
                    "complete": false
                },
                {
                    "id": 7,
                    "task": "Read a book",
                    "complete": false
                },
                {
                    "id": 8,
                    "task": "Write a report",
                    "complete": false
                },
                {
                    "id": 9,
                    "task": "Attend a meeting",
                    "complete": false
                },
                {
                    "id": 10,
                    "task": "Fix the broken faucet",
                    "complete": false
                },
                {
                    "id": 11,
                    "task": "Organize the closet",
                    "complete": false
                },
                {
                    "id": 12,
                    "task": "Study for the exam",
                    "complete": false
                },
                {
                    "id": 13,
                    "task": "Water the plants",
                    "complete": false
                },
                {
                    "id": 14,
                    "task": "Clean the car",
                    "complete": false
                },
                {
                    "id": 15,
                    "task": "Finish the presentation",
                    "complete": false
                },
                {
                    "id": 16,
                    "task": "Schedule a doctor's appointment",
                    "complete": false
                },
                {
                    "id": 17,
                    "task": "Start a new project",
                    "complete": false
                },
                {
                    "id": 18,
                    "task": "Learn a new language",
                    "complete": false
                },
                {
                    "id": 19,
                    "task": "Visit a museum",
                    "complete": false
                },
                {
                    "id": 20,
                    "task": "Cook a new recipe",
                    "complete": false
                },
                {
                    "id": 21,
                    "task": "Practice meditation",
                    "complete": false
                }
            ]
            
            todos.forEach(async (todo) => {
                await axios.post(`http://127.0.0.1:8000/todos`, todo)
            })
        }
            
            
            


        const [task, setTask] = useState({
            id: 0,
            task: "",
            complete: false
        })

        return <div className="add-todo-menu">
            <div className="add-todo-inputs">
                <input type="text" placeholder="Task" onChange={(e) => setTask({ ...task, task: e.target.value })} />
            </div>
            <div className="add-todo-buttons">
                <AddButton cb={() => handleAdd(task)} disabled={!task.task} />
                <button onClick={() => seedTodos()}>Seed</button>
                <button onClick={() => setTodoMenuOpen(!todoMenuOpen)}>Cancel</button>
            </div>
        </div>
    }

    return (
        <div className="Todos">
            {
                loading ? <div className="loading">Loading...</div> :
                    <>
                        {!todoMenuOpen ? <div className="container">
                            {
                                todos && todos.map((todo, i) => {
                                    console.log(todo)
                                    return (
                                        <div className="todo" key={i}>
                                            <span>{todo.task}</span>
                                            <button onClick={() => handleDelete(todo.id)} className="delete-button">Delete</button>
                                        </div>
                                    )
                                })
                            }
                        </div> : <AddTodoMenu />}

                        {todoMenuOpen ? null : <div className="add-todo-button-container">
                            <AddButton cb={() => setTodoMenuOpen(!todoMenuOpen)} />
                        </div>}
                    </>
            }
        </div>
    )
}

export default Todos