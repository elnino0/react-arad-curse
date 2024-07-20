import { useState } from "react"

function AddUser({onAdd,onCancel}) {
    const [user,setUser] = useState({})

    const style = {
        background:"grey",
        width: 500,
        hight: 500
      }

    return (
    <div style={style}>
        Name: <input onChange={e=>{setUser({...user,name:e.target.value})}} type="text" />
        Email: <input onChange={e=>{setUser({...user,name:e.target.value})}} type="text" />

        <button onClick={() =>{onAdd(user) }}>Add</button>
        <button onClick={()=>{onCancel()}} >Cancel</button>
    </div>
    )
  }
  
  export default AddUser