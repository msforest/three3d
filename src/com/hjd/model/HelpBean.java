package com.hjd.model;

import java.sql.Connection;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.List;

import com.hjd.util.ConnDB;

public class HelpBean {
private Connection conn;
private Statement stm;
private ResultSet set;

public List<Area> getData(){
	List<Area> list=new ArrayList<Area>();
	try{
		conn=new ConnDB().getConn();
		stm=conn.createStatement();
		String sql="select * from area";
		set=stm.executeQuery(sql);
		while(set.next()){
			Area a=new Area();
			a.setName(set.getString("name"));
			a.setNo(set.getString("NO"));
			a.setLength(set.getInt("length"));
			a.setWidth(set.getInt("width"));
			Position position=new Position();
			position.setX(set.getInt("PositionX"));
			//position.setY(set.getInt("PositionY"));
			position.setZ(set.getInt("PositionZ"));
			a.setPosition(position);
			Title t=new Title();			
			Position p=new Position();
			p.setX(set.getInt("TitlePositionX"));
			p.setZ(set.getInt("TitlePositionZ"));
			t.setPosition(p);
			t.setText(set.getString("TitleText"));
			t.setTextColor(set.getString("TitleTextColor"));
			t.setFontSize(set.getInt("TitleFontSize"));
			a.setTitle(t);
			List<Store> stores=getStores(a.getNo());
			a.setStores(stores);
			list.add(a);
		}		
	}catch(Exception e){
		e.printStackTrace();
	}
	finally{
		close();
	}
	return list;
}

private List<Store> getStores(String areaNo){
	List<Store> list=new ArrayList<Store>();
	try {
		ResultSet rs=conn.createStatement().executeQuery("select * from store where AreaNo='"+areaNo+"'");
		while(rs.next()){
			Store s=new Store();			
			s.setNo(rs.getString("NO"));
			s.setName(rs.getString("name"));
			s.setLength(rs.getInt("length"));
			s.setWidth(rs.getInt("width"));
			s.setHeight(rs.getInt("height"));
			s.setRotationY(rs.getInt("rotationY"));
			Position p=new Position();
			p.setX(rs.getInt("PositionX"));
			p.setY(rs.getInt("PositionY"));
			p.setZ(rs.getInt("PositionZ"));
			s.setPosition(p);
			List<Group> gs=getGroups(s.getNo());			
			s.setGroups(gs);
			/*s.setTotalBinNum(rs.getInt("TotalBinNum"));
			s.setOccurpyBinNum(rs.getInt("OccurpyBinNum"));
			s.setInStoreNum(rs.getInt("InStoreNum"));
			s.setOutStoreNum(rs.getInt("OutStoreNum"));
			s.setOutOfTimeNum(rs.getInt("OutOfTimeNum"));
			s.setPreOutOfTimeNum(rs.getInt("PreOutOfTimeNum"));
			s.setNgNum(rs.getInt("NgNum"));
			s.setAlarmNum(rs.getInt("AlarmNum"));*/
			list.add(s);
		}
		rs.close();
	} catch (SQLException e) {
		e.printStackTrace();
	}
	return list;
}

private List<Group> getGroups(String storeNo){
	List<Group> list=new ArrayList<Group>();
	try {
		ResultSet rs=conn.createStatement().executeQuery("select * from `group` where storeNo='"+storeNo+"'");
		while(rs.next()){
			Group g=new Group();
			g.setNo(rs.getString("NO"));
			g.setName(rs.getString("name"));
			g.setLength(rs.getInt("length"));
			g.setWidth(rs.getInt("width"));
			g.setHeight(rs.getInt("height"));
			g.setBinHeight(rs.getInt("binHeight"));
			g.setBinLength(rs.getInt("binLength"));
			g.setBinWidth(rs.getInt("binWidth"));
			g.setBinXNum(rs.getInt("binXNum"));
			g.setBinYNum(rs.getInt("binYNum"));
			g.setBinZNum(rs.getInt("binZNum"));
			g.setBottomHeight(rs.getInt("bottomHeight"));
			Position p=new Position();
			p.setX(rs.getInt("PositionX"));
			p.setY(rs.getInt("PositionY"));
			p.setZ(rs.getInt("PositionZ"));
			g.setPosition(p);
			List<Bin> bs=getBins(g.getNo());
			g.setBins(bs);	
		    /*g.setTotalBinNum(rs.getInt("TotalBinNum"));
			g.setOccurpyBinNum(rs.getInt("OccurpyBinNum"));
			g.setInStoreNum(rs.getInt("InStoreNum"));
			g.setOutStoreNum(rs.getInt("OutStoreNum"));
			g.setOutOfTimeNum(rs.getInt("OutOfTimeNum"));
			g.setPreOutOfTimeNum(rs.getInt("PreOutOfTimeNum"));
			g.setNgNum(rs.getInt("NgNum"));
			g.setAlarmNum(rs.getInt("AlarmNum"));
			List<String> ColNames=new ArrayList<String>();
			ColNames.add(rs.getString("ColNums"));
		    List<Integer> ColNums=new ArrayList<Integer>();
		    ColNums.add(Integer.parseInt(rs.getString("ColNums")));
		    g.setColNames(ColNames);
		    g.setColNums(ColNums);*/
			list.add(g);
		}
		rs.close();
	} catch (SQLException e) {
		e.printStackTrace();
	}
	return list;
}

private List<Bin> getBins(String groupNo){
	List<Bin> list=new ArrayList<Bin>();
	try {
		ResultSet rs=conn.createStatement().executeQuery("select * from bin where GroupNo='"+groupNo+"'");
		while(rs.next()){
			Bin b=new Bin();
			b.setNo(rs.getString("NO"));
			b.setName(rs.getString("name"));
			b.setRow(rs.getInt("row"));
			b.setCol(rs.getInt("col"));
			b.setLayer(rs.getInt("layer"));
			b.setBarcode(rs.getString("barcode"));
			b.setIsLoad(rs.getInt("isLoad"));
			b.setState(rs.getInt("state"));
			b.setC_date(rs.getString("c_date"));
			b.setS_date(rs.getString("s_date"));
			b.setCd(rs.getString("cd"));
			list.add(b);
		}
		rs.close();
	} catch (SQLException e) {
		e.printStackTrace();
	}
	return list;
}
public void close(){
	if(set!=null)
		try {
			set.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	if(stm!=null)
		try {
			stm.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
	if(conn!=null)
		try {
			conn.close();
		} catch (SQLException e) {
			e.printStackTrace();
		}
}
}
