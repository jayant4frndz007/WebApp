import React, { Component } from 'react';
import './App.css';
import $ from 'min-jquery';


export default class Register extends Component{
	
	constructor(props){
		super(props);
		this.state={
				username:undefined,
				password:undefined,
				message:undefined,
		}
		window.document.title='Register';
	}
	login=()=>{
		var user=this.state.username;
		var pass=this.state.password;
		if(user==null || user==undefined || pass==null || pass==undefined){
			this.setState({message:<div className="alert alert-info">Please fill username and password</div>})
		}else{
			$.ajax({
			      url: 'http://localhost:8080/login',
			      type:'POST',
			      data:{user:user,pass:pass},
			      success: (data)=> {
			    	alert(data);
			    	 if(data=='user'){
			    		  localStorage.setItem('user', 'active');
			    		  localStorage.setItem('access','user');
			    		  localStorage.setItem('accessdata',user);
			    		  window.location.reload();
			    	  }else{
			    		  this.setState({message:<div className="alert alert-danger">Invalid credentials.</div>})
			    	  }
			    	
			       
			      },
			      error: (data)=> {
			    	
			      }
			     
			    });	
		}
		
		
		
	}
	userFun=(e)=>{
		this.setState({username:e.target.value});
		this.setState({message:undefined});
	}
	passFun=(e)=>{
		this.setState({password:e.target.value});
		this.setState({message:undefined});
	}
	render(){
		
		return(<div>
		<center><h1 style={{color:'Black'}}>DATA</h1></center>
		<div style={{height:'180px'}}> </div>
		
		<div className="container" id="loginalign">
		<div data-toggle="modal" data-target="#login-modal" >Login</div>
		</div>

				<div className="modal fade" id="login-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: 'none'}}>
		    	  <div className="modal-dialog">
						<div className="loginmodal-container">
							<h1>Login</h1>
							
						  <form>
							<label>User ID</label><input type="text" id="userId"  name="user" required value={this.state.username} onChange={this.userFun} placeholder="Username"/>
							<label>Password</label><input type="password" id="password" name="pass" required value={this.state.password} onChange={this.passFun} placeholder="Password"/>
							<input type="button" id="login" name="login" className="login loginmodal-submit" onClick={this.login} value="Login"/>
						  </form>
						</div>
						<div id="errors">
						{this.state.message}
						</div>
					</div>
				</div>
		</div>);
	}
}