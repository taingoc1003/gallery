import React, { useState } from "react";
import "./todo.scss"
import { toast } from 'react-toastify';
import { AiOutlineCloseCircle, AiOutlineEdit } from "react-icons/ai"

const Todo = () => {
    const [title, setTitle] = useState('')
    const [todo, setTodo] = useState([])
    const [checked, setChecked] = useState([])
    const [editTodo, setEditTodo] = useState({})


    const handleOnChangeInput = (e) => {
        setTitle(e.target.value)

    }

    const handleOnKeydown = (e) => {
        if (e.key === 'Enter') {
            if (title) {
                let randomNumber = Math.floor(Math.random() * 1000)
                let newTodo = { id: randomNumber, title: title }

                // const randomColor = Math.floor(Math.random() * 16777215).toString(16);
                // document.querySelector('.todo-child').style.backgroundColor = "#" + randomColor
                setTodo([...todo, newTodo])
                setTitle('')
            }
            else {
                toast.error('Missing Title!')
                return;
            }
        }

    }

    const handleChecked = (id) => {
        setChecked(prev => {
            const isChecked = checked.includes(id)
            if (isChecked) {
                return checked.filter(item => item !== id)
            } else {
                return [...prev, id]
            }
        })

        todo.map(todo => {
            if (todo.id === id) {
                todo.isComplete = !todo.isComplete
            }
        })
    }


    const handleEdit = (todo) => {
        setEditTodo(todo)
    }

    const handleDelete = (id) => {
        let newTodo = todo
        newTodo = newTodo.filter(item => item.id !== id)
        setTodo(newTodo)
    }

    const handleOnChangeEditTodo = (e) => {
        // setEditTodo({ id: e.target.id, title: e.target.value })
        let newEditTodo = { ...editTodo }
        newEditTodo.title = e.target.value
        setEditTodo(newEditTodo)
    }

    const handleOnClickSave = (todoItem) => {
        let isEmptyObj = Object.keys(editTodo).length === 0;
        if (isEmptyObj === false && editTodo.id === todoItem) {
            let newTodo = [...todo]
            let objIndex = newTodo.findIndex((item => item.id === todoItem));
            newTodo[objIndex].title = editTodo.title

            setTodo(newTodo)
            setEditTodo({})
        }

    }

    let isEmptyObj = Object.keys(editTodo).length === 0
    return (
        <div className="todo-wrapper">
            <div className="todo-header">THINGS TO DO</div>
            <div className="todo-body">
                <div className="add-todo">
                    <input className="todo-input-text" type="text" value={title} placeholder="Add text"
                        onChange={(e) => handleOnChangeInput(e)}
                        onKeyDown={(e) => handleOnKeydown(e)}
                    />
                </div>
                <div className={"todo-show"}>
                    {todo && todo.length >= 0 &&
                        todo.map(item => {
                            return (
                                <div key={item.id} className={item.isComplete ? 'todo-child complete' : 'todo-child'}>
                                    <input type="checkbox"
                                        checked={checked.includes(item.id)}
                                        onChange={() => handleChecked(item.id)}
                                    />

                                    {isEmptyObj === true ?
                                        <span>{item.title}</span>
                                        :
                                        <>
                                            {item.id === editTodo.id ?
                                                <div className="todo-onchange">
                                                    <input value={editTodo.title}
                                                        onChange={(e) => handleOnChangeEditTodo(e)}
                                                    />
                                                    <button type="button" onClick={() => handleOnClickSave(item.id)}>
                                                        Save</button>
                                                </div>

                                                :
                                                <span>{item.title}</span>
                                            }
                                        </>
                                    }
                                    <div className="todo-edit">
                                        <AiOutlineEdit className="btn-edit" onClick={() => handleEdit(item)} />
                                        <AiOutlineCloseCircle className="btn-del" onClick={() => handleDelete(item.id)} />
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default Todo;