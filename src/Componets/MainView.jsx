import { v4 as uuid } from 'uuid';
import { useState } from 'react'
import UserView from "./UserView"
import TodosView from "./TodosView"
import PortsView from "./PortsView"
import AddUser from "./AddUser"
import { useEffect } from 'react';
import axios from 'axios';
const sideNav = {
  newuser: 'newUser',
  empty: 'empty',
  detail: 'detail',
};

const URl_users = "https://jsonplaceholder.typicode.com/users"
const URl_TODOS = "https://jsonplaceholder.typicode.com/todos"
const URl_POSTS = "https://jsonplaceholder.typicode.com/posts"


function MainView() {

  const [users,setUsers] = useState({})
  const [search,setSearch] = useState("")
  const [currentUser,setCurrentUser] = useState({})
  const [sideNavMod,setSideNavMod] = useState(sideNav.empty)

    useEffect(()=>{
      const fetchData = async () =>{
        const {data:usersData} = await axios.get(URl_users)
        const {data:todosData} = await axios.get(URl_TODOS)
        const {data:postsData} = await axios.get(URl_POSTS)
        const data = {}

        for ( let item of usersData){
          data[item.id] = item
          data[item.id]["posts"] = []
          data[item.id]["todos"] = []
        }

        for(let item of todosData){
          if(item.userId in data){
            data[item.userId]["todos"].push(item)
          }
        }
        
        for(let item of postsData){
          if(item.userId in data){
            data[item.userId]["posts"].push(item)
          }
          
        }
        setUsers(data)
      }
      fetchData()
    },[])

    const mainStyle = {
      background:"green",
      width: 500,
      hight: 500,
      border: '5px solid black',
      }

      const sideStyle = {
        background:"pink",
        width: 500,
        hight: 500,
        border: '5px solid back',
      }
    
    const onClickAddNewUser = () =>{
      setSideNavMod(sideNav.newuser)
    }

    const onAddUser = (data) =>{
      setSideNavMod(sideNav.detail)
      const id = uuid().substring(0,5)
      data["id"] = id
      users[id] = data
      setUsers(users)
    }

    const onCancel = () =>{
      setSideNavMod(sideNav.detail)
    }


    const onUpdate = (id,data) =>{
      if (id in users){
        
        users[id].address = {...data.address}
        users[id].name = data.name
        users[id].id = data.id
        users[id].email = data.email

        setUsers({...users})
      }
    }

    const onDelete = id =>{
      if (id in users){
        delete users[id]
        setUsers({...users})
      }
    }
    
    const onTodoComplite = (userId,id) =>{
      if(userId in users){
        const user = users[userId]
        for(let item of user.todos){
            if(item.id === id){
              item.complite = true
            }
        } 
        setCurrentUser({...user})
        users[userId] = user
        setUsers(users)
        setSideNavMod(sideNav.detail)
      }
    }

    const onAddPost = (id,data) =>{
      if (id in users){
        data["id"] = uuid().substring(0,5)
        users[id].posts.push(data)
        setUsers({...users})
      }
    }
    
    const  OnAddTodo = (id, data) =>{
      if (id in users){
        data["id"] = uuid().substring(0,5)
        users[id].todos.push(data)
        setUsers({...users})
      }   
    }
    const [previuseEvent,setPreviuseEvent] = useState(undefined)  
    const onClickListItem = (id,event) =>{

      if(event.target.tagName==="DIV"){
      if(id === currentUser.id && event.target.style.background === "orange"){
        event.target.style.background = "blue"
        setSideNavMod(sideNav.empty)
        setCurrentUser({})
       return;
      }else{
        if(previuseEvent){
          previuseEvent.target.style.background = "blue"
        }
        event.target.style.background = "orange"
        setSideNavMod(sideNav.detail)
        setCurrentUser(users[id])
        setPreviuseEvent(event) 
      }
    }
    }
    
    const renderSwitch =(param) => {
      switch(param) {
        case sideNav.empty:
          return <></>;
        case sideNav.detail:
            return Object.keys(currentUser).length > 0 ? 
            <div style={sideStyle}>
             <TodosView id={currentUser.id} todos={currentUser.todos} onTodoComplite={onTodoComplite} OnAddTodo={OnAddTodo} /> <br />
             <PortsView id={currentUser.id} posts={currentUser.posts} OnAddPost={onAddPost}/>
            </div>:<></>
        case sideNav.newuser:
          return <AddUser onAdd={onAddUser} onCancel={onCancel}></AddUser>;
        default:
          return <></>;
      }
    }

    return (
      <div style={{display: 'flex', border: '2px solid red',}}>
       <div style={mainStyle}>
        Sreach : <input type = "text"  onChange={e => {setSearch(e.target.value)}}/> <br />
        <button onClick={e =>{onClickAddNewUser()}}>Add</button>
        <ol>
            {
                
               Object.values(users).map((item,index) => {
                    if (search.trim().length === 0){
                      return  <li key ={index}>
                      <UserView id={item.id} name={item.name} email={item.email} address={item.address} onUpdate={onUpdate} onDelete ={onDelete} onClick={onClickListItem}/>
                       </li>
                    }else{
                      if (item.name.includes(search) || item.email.includes(search)){
                        return  <li key ={index}>
                        <UserView id={item.id} name={item.name} email={item.email} address={item.address} onUpdate={onUpdate} onDelete ={onDelete} onClick={onClickListItem}/>
                         </li>
                    }
                  }
              })
            }

        </ol>
       </div>
       <div>
       {renderSwitch(sideNavMod)}
       </div>


      </div>
    )
  }
  
  export default MainView
  