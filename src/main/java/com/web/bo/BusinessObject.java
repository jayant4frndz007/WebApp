package com.web.bo;

import com.web.dao.WebDao;
import com.webDaoImpl.WebDaoImpl;

public class BusinessObject {
	WebDao dao=new WebDaoImpl();
	public String login(String user,String pass){
		return dao.login(user, pass);
	}
	public String register(String user,String pass){
		return dao.register(user, pass);
	}
	public String audit(String user, String add, String gender, String state, String date, String name){
		return dao.audit(user,add,gender,state,date,name);
	}

}
