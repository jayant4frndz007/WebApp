package com.webDaoImpl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.sql.ResultSet;
import com.web.dao.WebDao;
import com.web.dbutility.DBUtility;

public class WebDaoImpl implements WebDao {
	
	@Override
	public String login(String user, String pass) {
		System.out.println(DBUtility.getDBConnection());
		Connection con=DBUtility.getDBConnection();
		ResultSet rs=null;
		int count=0;
		// TODO Auto-generated method stub
		try {
			PreparedStatement ps=con.prepareStatement("select * from useraccount where userName=? and password=?");
			ps.setString(1, user);
			ps.setString(2, pass);
			rs=ps.executeQuery();
			
			while(rs.next()){
				count++;
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		if(count>0){
			return "Success";
		}
		return "Failure";
		
	}

	@Override
	public String register(String user, String pass) {
		System.out.println(DBUtility.getDBConnection());
		Connection con=DBUtility.getDBConnection();
		ResultSet rs=null;
		int count=0;
		// TODO Auto-generated method stub
		try {
			String res=login(user,pass);
			if(res.equalsIgnoreCase("Success")){
				return "Failure";
			}
			PreparedStatement ps=con.prepareStatement("insert into useraccount(userName,password) values(?,?)");
			ps.setString(1, user);
			ps.setString(2, pass);
			int ins=ps.executeUpdate();
			System.out.println(ins);
			if(ins>0){
				return "Success";
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "Failure";
		
	}

	
	@Override
	public String audit(String user, String add, String gender, String state, String date,String name) {


		System.out.println(DBUtility.getDBConnection());
		Connection con=DBUtility.getDBConnection();
		ResultSet rs=null;
		int count=0;
		// TODO Auto-generated method stub
		System.out.println("useer:"+user);
		System.out.println("add:"+add);
		System.out.println("gender:"+gender);
		System.out.println("state:"+state);
		System.out.println("date:"+date);
		System.out.println("name:"+name);
		try {
			
			String delRes=deleteData(user);
			
			PreparedStatement ps=con.prepareStatement("insert into userdetails(name,gender,address,dob,state,userName) values(?,?,?,?,?,?)");
			ps.setString(1, name);
			ps.setString(2, gender);
			ps.setString(3, add);
			ps.setString(4, date);
			ps.setString(5, state);
			ps.setString(6, user);
			int ins=ps.executeUpdate();
			
			//System.out.println(ins);
			String res=insertAuditTable(name,gender,add,date,state,user);
			if(res.equalsIgnoreCase("Success")){
				return "Success";
			}else{
				return "false";
			}
			
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "Failure";
		
	
	}

	private String deleteData(String user) {

		// TODO Auto-generated method stub
		Connection con=DBUtility.getDBConnection();
		PreparedStatement ps;
		try {
			ps = con.prepareStatement("delete from userdetails where userName=?");
			
			ps.setString(1, user);
			int ins=ps.executeUpdate();
			if(ins>0){
				return "Success";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "Failure";
	}

	private String insertAuditTable(String name, String gender, String add, String date, String state, String user) {
		// TODO Auto-generated method stub
		Connection con=DBUtility.getDBConnection();
		PreparedStatement ps;
		try {
			ps = con.prepareStatement("insert into useraudit(name,gender,address,dob,state,userName) values(?,?,?,?,?,?)");
			ps.setString(1, name);
			ps.setString(2, gender);
			ps.setString(3, add);
			ps.setString(4, date);
			ps.setString(5, state);
			ps.setString(6, user);
			int ins=ps.executeUpdate();
			if(ins>0){
				return "Success";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		
		return "Failure";
	}

	

	

	

	

	

}
