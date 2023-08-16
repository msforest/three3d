package com.hjd.servlet;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.List;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;


import com.alibaba.fastjson.JSON;
import com.hjd.model.Area;
import com.hjd.model.HelpBean;
import com.hjd.model.StoreFrame;

public class getData extends HttpServlet {

	public void doGet(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		doPost(request, response);
	}

	public void doPost(HttpServletRequest request, HttpServletResponse response)
			throws ServletException, IOException {

		response.setContentType("text/html");
		response.setCharacterEncoding("utf-8");
		PrintWriter out = response.getWriter();
		List<Area> list=new HelpBean().getData();
		StoreFrame sf=new StoreFrame();
		sf.setAreas(list);
		String json=JSON.toJSONString(sf);
		out.print(json);
		out.flush();
		out.close();
	}
	
	

}
