import React, { useState } from 'react'

export default function Input({rawi}) {
  const [input,setInput]=useState({
    price:0,
    reason:""
})
    const handleInput=(e)=>{
    const temp={...input}
    temp[e.target.name]=e.target.value;
    setInput(temp)
    }
    return (
              <form action=""  id="myForm" onSubmit={
                  e=>{
                  e.preventDefault();
                  rawi(input)
              }}>
                <div className="form-control">
                <label htmlFor="input">Enter Price : </label>
                <input type="text" name="price" onChange={e=>handleInput(e)} />
                </div>
                  <div className="form-control">
                <label htmlFor="input">Transfer Reason : </label>
                <input type="text" name="reason" onChange={e=>handleInput(e)} />
                
              
                </div>
                  <input type="submit" value="submit"/>
            </form>

    )
}
