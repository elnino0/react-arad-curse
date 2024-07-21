import { useState } from 'react'

function TodosView({id, todos, onTodoComplite, OnAddTodo }) {
  const [todo,setTodo] = useState({})
  const [isAddMod,setIsAddMod] = useState(false)
  
  const handleAdd = () =>{
    setIsAddMod(true)
  }

  const render = () =>{

      if(isAddMod){
        return <div>
        <button onClick={() => {OnAddTodo(id,todo);setIsAddMod(false);setTodo({})}}>Add</button>
        <button onClick={()=>{setIsAddMod(false)}}>Cancel</button>
        Title : <input  onChange={e =>{setTodo({...todo,title:e.target.value})}} type="text" />
        Task : <input  onChange={e =>{setTodo({...todo,task:e.target.value})}} type="text" />
      </div>
      }else{
          return <div>
            <button onClick={()=>{handleAdd()}}>Add</button>
          {
              <ol>
                  {
                      todos.map((item,index) =>{
                          return <li key={index}>
                              <label > {item.title} </label>
                              <label > { item.complite ? "True" : <div>False <button onClick={e=>(onTodoComplite(id, item.id))} >mark as complite</button></div>  } </label>
                          </li>
                      })
                  }
                </ol>
          }
          </div>
      }

  }

    return (
    <div>
      {
        render()
      }
      </div>
    )
  }
  
  export default TodosView