import { useState } from "react"



function UserView({id, name, email, address, onUpdate, onDelete, onClick}) {
    const [isShowOtherData,setIsShowOtherData] = useState(false)
    const [user,setUser] = useState({})
    const [userAddress,setUserAddress] = useState({})
    const style ={
      background :"blue"
      }
    
    const handleOnClick =(e) =>{
      onClick(id,e); 
    }

    return (
      <div onClick={handleOnClick} style={style}>
        ID: <input onChange={e => setUser({...user, id:e.target.value})} value={id} type="text"/> 
        Name: <input onChange={e => setUser({...user, name:e.target.value})} value={name} type="text"/> 
        Email:<input  onChange={e => setUser({...user, email:e.target.value})} value={email} type="text"/> 

        <button onMouseEnter={e => setIsShowOtherData(true)} onMouseLeave={e => setIsShowOtherData(false)}> other data </button> <br />
        <button onClick={e => onUpdate(id,{user:{}, address:userAddress})}> update </button> <br />
        <button onClick={e => onDelete(id)}> delete </button> <br />

        {
            isShowOtherData ? <div>
                        street: <input onChange={e => setUserAddress({...userAddress,id:e.target.value})} value={address.street} type="text"/> 
                        city: <input onChange={e => setUserAddress({...userAddress,id:e.target.value})} value={address.city} type="text"/> 
                        zipcode:<input onChange={e => setUserAddress({...userAddress,id:e.target.value})} value={address.zipcode} type="text"/> 
            </div> : null
        }

      </div>
    )
  }
  
  export default UserView
  