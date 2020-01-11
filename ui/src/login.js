import React, { Component } from 'react';
import './App.css';
import $ from 'min-jquery';


export default class Login extends Component{
	
	constructor(props){
		super(props);
		this.state={
				username:undefined,
				password:undefined,
				message:undefined,
				cnfPass:undefined,
		}
		window.document.title='Login';
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
			    	 if(data=='Success'){
			    		  localStorage.setItem('user', 'active');
			    		  localStorage.setItem('userName', user);
			    		  window.location.reload();
			    	  }else{
			    		  this.setState({message:<div className="alert alert-danger">Invalid credentials or Please Register.</div>})
			    	  }
			    	
			       
			      },
			      error: (data)=> {
			    	
			      }
			     
			    });	
		}
		
		
		
	}
	passWordValidation=(par)=>{
		var passw = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9])(?!.*\s).{8}$/;
		if(par.match(passw)) 
		{ 
		//alert('Correct, try another...')
		return false;
		}
		else
		{ 
		//alert('Wrong...!')
		return true;
		}
	}
	register=()=>{
		var user=this.state.username;
		var pass=this.state.password;
		var cnfPass=this.state.cnfPass;
		if(this.passWordValidation(pass)){
			
			this.setState({message:<div className="alert alert-info">PassWord should Contain atleast one Upper case,lower case and special characters with more then 8 size</div>});
			return ;
		}
		
		if(user==null || user==undefined || pass==null || pass==undefined){
			this.setState({message:<div className="alert alert-info">Please fill username and password</div>})
		}else{
			
			if(pass !== cnfPass){
				this.setState({message:<div className="alert alert-info">PassWord not matching</div>});
				return;
			}
			$.ajax({
			      url: 'http://localhost:8080/Register',
			      type:'POST',
			      data:{user:user,pass:pass},
			      success: (data)=> {
			    	alert(data);
			    	 if(data=='Success'){
			    		 this.setState({message:<div className="alert alert-success">Successfully Inserted, Please Login.. auto Redirect</div>});
			    		 setTimeout(function(){window.location.reload()},5000);
			    	  }else{
			    		  this.setState({message:<div className="alert alert-danger">Already Exist.</div>})
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
	cnfPass1=(e)=>{
		this.setState({cnfPass:e.target.value});
		this.setState({message:undefined});
	}
	render(){
		
		return(<div>
		<center><h1 style={{color:'Black'}}>DATA</h1></center>
		<div style={{height:'180px'}}> </div>
		
		<div className="container" id="loginalign">
		<div data-toggle="modal" data-target="#login-modal" >Login</div>
		
		</div>
		<div className="container" id="registeralign">
		<div data-toggle="modal" data-target="#register-modal" >Register</div>		
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
				
			
				
						<div className="modal fade" id="register-modal" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{display: 'none'}}>
				    	  <div className="modal-dialog">
								<div className="loginmodal-container">
									<h1>Register</h1>
									
								  <form>
									<label>User ID</label><input type="text" id="userId"  name="user" required value={this.state.username} onChange={this.userFun} placeholder="Username"/>
									<label>Password</label><input type="password" id="password" name="pass" required value={this.state.password} onChange={this.passFun} placeholder="Password"/>
										<label>Confirm Password:</label><input type="password" id="password" name="pass" required value={this.state.cnfPass} onChange={this.cnfPass1} placeholder="Confirm Password"/>
									<input type="button" id="login" name="login" className="login loginmodal-submit" onClick={this.register} value="Register"/>
									
									
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