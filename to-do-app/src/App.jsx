import React from 'react'
import { useState, useEffect } from 'react'
import './App.css'
import Nav from './components/Nav.jsx'
import { v4 as uuidv4 } from 'uuid';
import { MdOutlineEdit, MdOutlineDeleteOutline } from "react-icons/md";

function App() {
  const [showForm, setShowForm] = useState(false)
  const [todo, setTodo] = useState("")
  const [todos, setTodos] = useState([])
  const [editingId, setEditingId] = useState(null)
  const [showFinished, setShowFinished] = useState(true)

  useEffect(() => {
    let todoString = localStorage.getItem("todos");
    if (todoString) {
      try {
        let todos = JSON.parse(todoString);
        if (Array.isArray(todos)) {
          setTodos(todos);
        }
      } catch (e) {
        console.error("Error parsing todos from localStorage:", e);
      }
    }
  }, [])
  

  const saveToLS = (todos) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }

  const handleAdd = () => {
    let newTodos;
    if (editingId) {
      newTodos = todos.map(t => t.id === editingId ? { ...t, todo: todo } : t);
      setEditingId(null);
    } else {
      newTodos = [...todos, { todo, isCompleted: false, id: uuidv4() }];
    }
    setTodos(newTodos);
    setTodo("");
    saveToLS(newTodos);
    setShowForm(false);
  }

  const handleEdit = (e, id) => {
    let t = todos.filter(todo => todo.id === id)[0];
    setTodo(t.todo);
    setEditingId(id);
    setShowForm(true);
  }

  const handleDelete = (e, id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
    saveToLS(newTodos);
  }

  const handleChange = (e) => {
    setTodo(e.target.value)
  }

  const handleCheckbox=(e) => {
    let id = e.target.name;
    const newTodos = todos.map(todo => 
      todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
    );
    setTodos(newTodos);
    saveToLS(newTodos);
  }
  

  return (
    <>
      <Nav />
      <div className='container pl-6 m-auto rounded-lg flex flex-col gap-5 w-3/4 mt-12'>
        <div className="header flex justify-between items-center">
          <h1 className='font-bold text-teal-900 text-3xl pt-4'>My Tasks</h1>
          <button onClick={() => setShowForm(!showForm)} className='add-task p-3 font-bold border-teal-950 border-[0.5px] bg-teal-50 hover:bg-teal-900 hover:text-white rounded-md text-teal-950 text-md'>Add Task +</button>
        </div>
        <div className="show-finished flex items-center gap-2 mb-4">
          <input type="checkbox" checked={showFinished} onChange={(e) => setShowFinished(e.target.checked)} />
          <label className='text-teal-900 font-medium'>Show finished</label>
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
            <button onClick={handleAdd} disabled={todo.length === 0} className='p-3 bg-teal-900 text-white rounded-md'>{editingId ? "Save" : "Add"}</button>
            <button onClick={() => { setShowForm(false); setEditingId(null); }} className='p-3 ml-2 bg-gray-300 text-black rounded-md'>Cancel</button>
          </div>
        )}
        <div className="tasks flex flex-col gap-3 mb-12">
          {(() => {
            const filteredTodos = showFinished ? todos : todos.filter(t => !t.isCompleted);
            return (
              <>
                {filteredTodos.length === 0 && <p className='text-gray-800 font-light'>No tasks available. Please add a task.</p>}
                {filteredTodos.map(item => {
                  return <div className='flex flex-col gap-3'>
                    <div className='single-todo flex justify-between items-center bg-teal-100 w-full p-4 rounded-md font-semibold list-none'>
                      <div className='flex items-center gap-3'>
                        <input name={item.id} type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} />
                        <li className={item.isCompleted ? "text-gray-600 line-through" : ""} >{item.todo}</li>
                      </div>

                      <div className='flex items-center gap-3 ml-2'>
                        <button onClick={(e)=>{handleEdit(e, item.id)}} className='flex gap-1 items-center'>Edit<MdOutlineEdit /></button>
                        <button onClick={(e)=>{handleDelete(e, item.id)}} className='flex gap-0.5 items-center'>Delete<MdOutlineDeleteOutline /></button>
                      </div>
                    </div>
                  </div>
                })}
              </>
            );
          })()}
        </div>
      </div>
    </>
  )
}

export default App
