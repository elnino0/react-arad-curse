
import { useState } from 'react'
import UserView from "./UserView"
import TodosView from "./TodosView"
import PortsView from "./PortsView"
import AddUser from "./AddUser"

const sideNav = {
  newuser: 'newUser',
  empty: 'empty',
  detail: 'detail',
};

function MainView() {
  // const [userslist,setUserslist] = useState([{name:"putin",id:"1",email:"xxx@xxx",address:{city:"moskva",street:"putina",zipcode:"1111222"} ,todos:[{id:1,title:"xxxx",complite:false}],posts:[{id:1,title:"xxxx",body:{text:"someting"}}]}])

    const [users,setUsers] = useState({"1":{name:"putin",id:"1",email:"xxx@xxx",address:{city:"moskva",street:"putina",zipcode:"1111222"} ,todos:[{id:1,title:"xxxx",complite:false}],posts:[{id:1,title:"xxxx",body:{text:"someting"}}]}})
    const [search,setSearch] = useState("")
    const [currentUser,setCurrentUser] = useState({})
    const [sideNavMod,setSideNavMod] = useState(sideNav.empty)



    const mainStyle = {
      background:"green",
      width: 500,
      hight: 500
      }

      const sideStyle = {
        background:"pink",
        width: 500,
        hight: 500
      }
    
    const onClickAddNewUser = () =>{
      setSideNavMod(sideNav.newuser)
    }

    const onAddUser = (data) =>{
      setSideNavMod(sideNav.detail)

    }

    const onCancel = () =>{
      setSideNavMod(sideNav.detail)
    }


    const onUpdate = (id,data) =>{

    }

    const onDelete = id =>{

    }

    const OnAdd = data =>{

    }

    const onTodoComplite = (id) =>{

    }

    const onAddPost= (id,data) =>{

    }


    const  OnAddTodo = (data) =>{

    }

    const onClickListItem = (id,event) =>{

      if(event.target.tagName==="DIV"){
        
      console.log(JSON.stringify(users[id]))
      if(id === currentUser.id && event.target.style.background === "orange"){
        event.target.style.background = "blue"
        setSideNavMod(sideNav.empty)
        setCurrentUser({})
       return;
      }else{
        event.target.style.background = "orange"
        setSideNavMod(sideNav.detail)
        setCurrentUser(users[id])
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
      <div style={{display: 'flex'}}>
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
  