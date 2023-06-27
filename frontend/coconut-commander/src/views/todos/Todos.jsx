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
        setLoading(true)
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
        setLoading(true)
        try {
            await axios.delete(`http://127.0.0.1:8000/todos/${id}`)
            fetchTodos()
            setLoading(false)
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const AddTodoMenu = () => {

        const handleAdd = async (task) => {
            console.log(task)
            //Set the task id to the length of the todos array + 1
            task.id = String(todos.length + 1)
            try {
                await axios.post(`http://127.0.0.1:8000/todos`, task)
                fetchTodos()
                setTodoMenuOpen(false)
            } catch (error) {
                console.log(error)
                setTodoMenuOpen(false)
            }
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