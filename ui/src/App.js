import React,{Component} from 'react';
import $ from 'min-jquery';
import Login from './login.js';
import UserAccounts from './userAccount';
import './App.css';

 class App extends Component {
	constructor(props){
		super(props);
		this.state={
				toggle:localStorage.getItem('user')=='active' ?false:true,
		}
	}
	 clickCall=()=>{
		 /*fetch('http://localhost:8080/Component1')
	        .then(res => res.json())
	        .then(res2=>{
	            console.log(res2);
	        })*/
	        $.ajax({
				url:'http://localhost:8080/Component1',
				type:'POST',
				data:{aa:'jayant'},
				success:(data)=>{
					console.log(data)
				}
			});
	 }
render(){
  return (
    <div className="App">
    		{this.state.toggle && <Login />}
    		{!this.state.toggle && <UserAccounts/>}
    </div>
  );
}
 }

export default App;
