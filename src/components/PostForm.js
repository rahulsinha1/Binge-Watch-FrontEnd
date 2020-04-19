import React, { Component } from 'react'
import axios from "axios";
 class PostForm extends Component {
     constructor(props) {
         super(props)
     
         this.state = {
              username:'',
              pass:''
         }
     }
     changeHandler=(e)=>{
         this.setState({[e.target.name]:e.target.value})
     }

     submitHandler=e=>{
         e.preventDefault()
         console.log(this.state)
         axios.post('http://localhost:8080/api/user/create',this.state)
         .then(response=>{
            console.log(response)
         })
         .catch(error=>{
             console.log(error)
         })
     }


    render() {
        const{username,pass}=this.state
        return (
            <div>
                <form onSubmit={this.submitHandler}>
                    
                    <div>
                        <input type="text" name="username" value={username} onChange={this.changeHandler}/>
                    </div>
                    <div>
                        <input type="text" name="pass"value={pass} onChange={this.changeHandler}/>
                    </div>
                    <button type="submit">
                        submit
                    </button>
                </form>
            </div>
        )
    }
}

export default PostForm
