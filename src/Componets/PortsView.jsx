import { useState } from 'react'

function PortsView({id,posts,OnAddPost}) {
  const [savedposts,setPosts] = useState({})
  const [isAddMod,setIsAddMod] = useState(false)

  const handleAdd = () => {
    setIsAddMod(true)
  }

  const render = () =>{

    if(!isAddMod){
      return  <div>
      <button onClick={e=>{handleAdd(id)}} >Add</button>
    <ol>
      {
          posts.map((item,index) =>{
              return <li key={index}>
                  <label > {item.title} </label> <br />
                  <label > {JSON.stringify(item.body)} </label>
              </li>
          })
      }
    </ol>
    </div>
    }else{
      return <div>
        <button onClick={() =>{OnAddPost(savedposts);setIsAddMod(false);} }>Add</button>
        <button onClick={()=>{setIsAddMod(false)}}>Cancel</button>
        Title : <input  onChange={e =>{setPosts({title:e.target.value})}} type="text" />
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
  
  export default PortsView