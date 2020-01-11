import React, { Component } from 'react';
import './App.css';
import $ from 'min-jquery';


export default class UserAccounts extends Component{
	
	constructor(props){
		super(props);
		this.state={
				name:undefined,
				address:undefined,
				dob:undefined,
				state:undefined,
				gender:undefined,
				message:undefined,
		}
		window.document.title='Login';
	}
	logout=()=>{
		localStorage.removeItem('user');
		setTimeout(function(){window.location.reload()},2000);
	}
	
	updateVal=()=>{
		console.log(this.state.name);
		console.log(this.state.address);
		console.log(this.state.gender);
		console.log(this.state.date);
		console.log(this.state.state);
		let user=localStorage.getItem('userName');
		//alert(user);
		let name=this.state.name;
			let add=this.state.address;
				let gender=this.state.gender;
					let date=this.state.date;
						let state=this.state.state;
		if(name != undefined && add != undefined && gender != undefined
				&& date != undefined && state != undefined){
			$.ajax({
			      url: 'http://localhost:8080/update',
			      type:'POST',
			      data:{user:user,name:name,add:add,gender:gender,date:date,state:state},
			      success: (data)=> {
			    	//alert(data);
			    	 if(data=='Success'){
			    		 this.setState({message:<div className="alert alert-success">SuccessFull Updated.....</div>})
			    		  
			    	  }else{
			    		  this.setState({message:<div className="alert alert-danger">Not Updated.</div>})
			    	  }
			    	
			       
			      },
			      error: (data)=> {
			    	
			      }
			     
			    });	
		}else{
			 this.setState({message:<div className="alert alert-danger">All fields must select.</div>})
		}				
		
	
		
	}
	changeData=(val,e)=>{
		
		this.setState({[val]:e.target.value,message:undefined});
	}
	
	onSlectdata=(e)=>{
		this.setState({state:e.target.value,message:undefined});
	}
	render(){
		
		return(<div>
				<div style={{backgroundColor:'black',height:'50px',width:'100%',padding:'5px 5px 5px 5px'}}>
				<button onClick={this.logout} className="btn btn-info" style={{float:'right'}}>Logout</button>
				</div>
			<div className="container" >
			
			<div className="panel panel-primary" style={{marginTop:'100px'}}>
		      <div className="panel-heading">Update User Details</div>
		      <div className="panel-body">
		        	<div>
		        	<div className="form-group">
		            <label className="control-label col-sm-2" for="email">Name:</label>
		            <div className="col-sm-10">
		              <input type="text" className="form-control" id="name" placeholder="Enter name" onChange={this.changeData.bind(this,'name')}/>
		            </div>
		          </div>
		          <div className="form-group">
		            <label className="control-label col-sm-2" for="email">Address:</label>
		            <div className="col-sm-10">
		              <input type="text" className="form-control" id="add" placeholder="Enter Address" onChange={this.changeData.bind(this,'address')}/>
		            </div>
		          </div>
		          
		          
		          
		          <div className="form-group">
		            <label className="control-label col-sm-2" for="email">DOB:</label>
		            <div className="col-sm-10">
		              <input type="date" className="form-control" id="dob" placeholder="Select DOB" onChange={this.changeData.bind(this,'date')}/>
		            </div>
		          </div>
		          <div className="form-group">
		            <label className="control-label col-sm-2" for="email">State:</label>
		            <div className="col-sm-10">
		              <select className="form-control" onChange={this.onSlectdata}>
		              <option >Select</option>
		              <option value="tamilnadu">Tamil Nadu</option>
		              <option value="jharkhnad">Jharkhand</option>
		              </select>
		            </div>
		          </div>
		           
		          <div className="form-radio" style={{width:'100%'}}>
		            <label className="control-label col-sm-2" for="email">Gender:</label>
		            <div className="col-sm-10">
		            <div className="col-sm-4"><input type="radio"  id="gender" name="gender" value="male"onChange={this.changeData.bind(this,'gender')}/> Male </div>
		            <div className="col-sm-4"> <input type="radio"  id="gender" name="gender" value="female" onChange={this.changeData.bind(this,'gender')}/> Female </div>
		            </div>
		          </div>
		          
		        </div>
		      </div>
		      <div className="panel-footer">
		      		
		      		<button onClick={this.updateVal} className="btn btn-info">Update</button>
		      		
		      		
		      </div>
		      {this.state.message}
		    </div>
			</div>
			
			</div>
		);
	}
}