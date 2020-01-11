package com.web.web;

import javax.servlet.http.HttpServletRequest;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.web.bo.BusinessObject;
import com.web.dbutility.DBUtility;

@RestController
public class WebController {
	BusinessObject bo=new BusinessObject();
	@RequestMapping(value="/login", method = RequestMethod.POST)  
	public String login(HttpServletRequest request)  
{  
		
		System.out.println(request.getParameter("pass"));
		String user=request.getParameter("user");
		String pass=request.getParameter("pass");
	    return bo.login(user, pass);  
}  
	@RequestMapping(value="/Register", method = RequestMethod.POST)  
	public String register(HttpServletRequest request)  
{  
	System.out.println(request.getParameter("user"));
	System.out.println(request.getParameter("pass"));
	String user=request.getParameter("user");
	String pass=request.getParameter("pass");
    return bo.register(user, pass);  
}  
	@RequestMapping(value="/update", method = RequestMethod.POST)  
	public String fetch(HttpServletRequest request)  
{  
		System.out.println(request.getParameter("user"));
		System.out.println(request.getParameter("name"));
		System.out.println(request.getParameter("add"));
		System.out.println(request.getParameter("gender"));
		System.out.println(request.getParameter("state"));
		System.out.println(request.getParameter("date"));
		String user=request.getParameter("user");
		System.out.println(user);
	    return bo.audit(user,request.getParameter("add"),request.getParameter("gender"),request.getParameter("state"),request.getParameter("date"),request.getParameter("name")); 
}  
}
