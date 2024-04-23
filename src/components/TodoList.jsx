import React, { useEffect, useState } from "react"
import { FaRegEdit } from "react-icons/fa"
import { MdDeleteOutline } from "react-icons/md"
import { v4 as uuidv4 } from 'uuid'

const TodoList = () => {
    const [todo, setTodo] = useState("");
    const [task,setTask] = useState([]);
    const [finishedTask, setFinishedtask] = useState(false);

    useEffect(()=>{
      let todosLength = localStorage.getItem('task');
      if(todosLength){
      let todos = JSON.parse(localStorage.getItem('task'));
      setTask(todos);
      }
    },[])

    const handleChange = (e) => {
        setTodo(e.target.value);
    }
    const handleAdd = () => {
      setTask([...task, { id:uuidv4() , todo, isCompleted:false}])
      setTodo("");
      LS();
    }  

    const handleCheckbox = (e) => {
      let id = e.target.name;
      let index = task.findIndex(item=>{
        return item.id === id;
      })
      let newtask = [...task];
      newtask[index].isCompleted = !newtask[index].isCompleted;
      setTask(newtask);
      LS();
    }

    const handleDelete = (e,id) => {
      let newtask = task.filter(item=>{
        return item.id != id;
      })
      setTask(newtask);
      LS();
    }

    const handleEdit = (e,id) => {
      let t = task.filter(i=>i.id === id);
      console.log(t);
      setTodo(t[0].todo);
      let newtask = task.filter(item=>{
        return item.id != id;
      });
      setTask(newtask);
      LS();
    }

    const toggleFinished = () =>{
      setFinishedtask(!finishedTask);
    }

    const LS = () => {
      localStorage.setItem('task',JSON.stringify(task));
    }
    return (
    <div className=" w-full h-[100%] bg-[#544B3D] flex justify-center min-h-[100vh]">
      <div className=" w-[80vw] bg-[#4E6E58] rounded-3xl my-3 text-center min-h-[90vh]">
        <h1 className="text-4xl font-bold font-serif text-[#7ADFBB] m-2 italic">
          To do list
        </h1>
        <div className="flex flex-col justify-center items-center ">
          <input
            type="text"
            placeholder="Enter task"
            className="w-[90%] mx-4 h-11 rounded-xl px-4 font-serif font-thin border-transparent hover:border-white"
            value = {todo}
            onChange={handleChange}
          />
          <button onClick={handleAdd} disabled={todo.length<=3} className="bg-green-900 px-8 py-1 my-3 rounded-full text-white font-bold disabled:bg-green-400 ">
            Add task
          </button>
        </div>
        <div className="h-1 w-3/4 bg-black m-auto rounded-full opacity-30"></div>
        <div className="flex justify-between m-5 ">
          <div className="font-semibold text-2xl underline italic ">Tasks</div>
          <div className="flex gap-3 items-center ">
            <input type="checkbox" className="h-5 w-5" checked={finishedTask} onChange={toggleFinished} />
            <p className="text-lg italic">Show Finished</p>
          </div>
        </div>
        {task.length === 0 && <div className="text-xl italic font-serif text-start mx-9">No todos to display</div>}
        {task.map(item=>{
        return(finishedTask || !item.isCompleted)&&<div key={item.id} className="flex justify-between items-center w-[80%] mx-8 my-1 bg-slate-600 p-2 rounded-xl md:w-1/2">
          <div className="flex gap-3">
            <input type="checkbox" checked={item.isCompleted} onChange={handleCheckbox} name={item.id}/>
            <p className={item.isCompleted?"line-through":""}>{item.todo}</p>
          </div>
          <div className="flex gap-4">
            <button onClick={(e)=>handleEdit(e,item.id)} className="bg-green-700 px-4 py-2 rounded-2xl text-white text-xl" title="Edit"><FaRegEdit/></button>
            <button onClick={(e)=>handleDelete(e,item.id)} className='bg-green-700 px-4 py-2 rounded-2xl text-white text-xl' title="Delete" ><MdDeleteOutline/></button>
          </div>
        </div>
        })}
      </div>
    </div>
  );
};

export default TodoList;
