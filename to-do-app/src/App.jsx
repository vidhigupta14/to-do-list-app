import React from 'react'
import { useState } from 'react'
import './App.css'
import Nav from './components/nav.jsx'
import { v4 as uuidv4 } from 'uuid';

function App() {
  const [showForm, setShowForm] = useState(false)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])

  const handleAdd = () => {
    // Logic to add a new task will go here
    setTodos([...todos, { todo, isCompleted: false, id: uuidv4() }])
    setTodo("")
  }

  const handleEdit = () => {
    // Logic to edit an existing task will go here
  }

  const handleDelete = () => {
    // Logic to delete a task will go here
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox=(e) => {
    let id = e.target.name;
    setTodos(todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    ));
  }
  

  return (
    <>
      <Nav />
      <div className='container pl-6 m-auto rounded-lg flex flex-col gap-5 w-3/4 mt-12'>
        <div className="header flex justify-between items-center">
          <h1 className='font-bold text-teal-900 text-3xl pt-4'>My Tasks</h1>
          <button onClick={() => setShowForm(!showForm)} className='add-task p-3 font-bold border-teal-950 border-[0.5px] bg-teal-50 hover:bg-teal-900 hover:text-white rounded-md text-teal-950 text-md'>Add Task +</button>
        </div>
        {showForm && (
          <div className='add-task-form bg-teal-50 p-4 rounded-md'>
            <input
              onChange={handleChange}
              value={todo}
              type='text'
              placeholder='Enter new task'
              className='p-2 border border-teal-800 rounded-md w-full mb-2'
            />
            <button onClick={handleAdd} className='p-3 bg-teal-900 text-white rounded-md'>Add</button>
            <button onClick={() => setShowForm(false)} className='p-3 ml-2 bg-gray-300 text-black rounded-md'>Cancel</button>
          </div>
        )}
        <div className="tasks">
          {todos.map(item => {
            return <div className='flex flex-col gap-3'>
              <div className='single-todo flex justify-between items-center bg-teal-100 w-full p-4 rounded-md font-semibold list-none'>
                <div className='flex items-center gap-3'>
                  <input name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} />
                  <li className={item.isCompleted ? "text-gray-600 line-through" : ""} >{item.todo}</li>
                </div>

                <div className='flex items-center gap-2'>
                  <button onClick={handleEdit}>Edit</button>
                  <button onClick={handleDelete}>Delete</button>
                </div>
              </div>
            </div>
          })}

        </div>
      </div>
    </>
  )
}

export default App
