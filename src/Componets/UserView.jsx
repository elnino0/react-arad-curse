import { useState } from "react"

function UserView({id, name, email, address, onUpdate, onDelete, onClick}) {
    const [isShowOtherData,setIsShowOtherData] = useState(false)
    const [user,setUser] = useState({})
    const [userAddress,setUserAddress] = useState({})
    const style ={
      background :"blue",
      hight:200,
      border: '1px solid black',
      flex:1
    }
    
    const handleOnClick =(e) =>{
      onClick(id,e); 
    }

    return (
      <div onClick={handleOnClick} style={style}>
        ID: <input onChange={e => setUser({...user, id:e.target.value})} defaultValue={id} type="text"/> <br />
        Name: <input onChange={e => setUser({...user, name:e.target.value})} defaultValue={name} type="text"/> 
        Email:<input  onChange={e => setUser({...user, email:e.target.value})} defaultValue={email} type="text"/> <br /> 

        <label onMouseEnter={e => setIsShowOtherData(!isShowOtherData)}> other data </label> <br />
        <button onClick={e => onUpdate(id,{user:user, address:userAddress})}> update </button> 
        <button onClick={e => onDelete(id)}> delete </button> <br />

        {
            isShowOtherData ? <div>
                        street: <input onChange={e => setUserAddress({...userAddress,street:e.target.value})} defaultValue={address.street} type="text"/> 
                        city: <input onChange={e => setUserAddress({...userAddress,city:e.target.value})} defaultValue={address.city} type="text"/> 
                        zipcode:<input onChange={e => setUserAddress({...userAddress,zipcode:e.target.value})} defaultValue={address.zipcode} type="text"/> 
            </div> : null
        }

      </div>
    )
  }
  
  export default UserView
  