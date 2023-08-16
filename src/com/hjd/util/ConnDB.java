package com.hjd.util;

import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;

public class ConnDB {
static{
	try {
		Class.forName("com.mysql.jdbc.Driver");
	} catch (ClassNotFoundException e) {
		e.printStackTrace();
	}
}
private String url="jdbc:mysql://127.0.0.1:3306/store3d_new";
private String user="root";
private String pwd="root";

public Connection getConn(){
	try {
		return DriverManager.getConnection(url, user, pwd);
	} catch (SQLException e) {
		e.printStackTrace();
	}
	return null;
}

}
