package com.web.dao;

public interface WebDao {

		public String login(String user,String pass);
		public String register(String user,String pass);
		public String audit(String user, String add, String gender, String state, String date, String name);
		
}
