package com.hjd.model;

import java.util.Date;

import com.alibaba.fastjson.annotation.JSONField;

public class Bin {
	/// <summary>
    /// 库位编码
    /// </summary>
    public String No;
    /// <summary>
    /// 库位名称
    /// </summary>
    public String Name;
    /// <summary>
    /// 行
    /// </summary>
    public int Row;
    /// <summary>
    /// 列
    /// </summary>
    public int Col;
    /// <summary>
    /// 层
    /// </summary>
    public int Layer;
    /// <summary>
    /// 货号
    /// </summary>
    public String Barcode;

    /// <summary>
    /// 库位状态
    /// </summary>
    public int State;
    /// <summary>
    /// 生产日期
    /// </summary>
    public String c_date;
    /// <summary>
    /// 保质期
    /// </summary>
    public String s_date;
    /// <summary>
    /// 产地
    /// </summary>
    public String cd;
    
    public String getC_date() {
		return c_date;
	}
	public void setC_date(String c_date) {
		this.c_date = c_date;
	}
	public String getS_date() {
		return s_date;
	}
	public void setS_date(String s_date) {
		this.s_date = s_date;
	}
	public String getCd() {
		return cd;
	}
	public void setCd(String cd) {
		this.cd = cd;
	}
	public int IsLoad;
    
    @JSONField(name="No")
	public String getNo() {
		return No;
	}
	public void setNo(String no) {
		No = no;
	}
	@JSONField(name="Name")
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	@JSONField(name="Row")
	public int getRow() {
		return Row;
	}
	public void setRow(int row) {
		Row = row;
	}
	@JSONField(name="Col")
	public int getCol() {
		return Col;
	}
	public void setCol(int col) {
		Col = col;
	}
	@JSONField(name="Layer")
	public int getLayer() {
		return Layer;
	}
	public void setLayer(int layer) {
		Layer = layer;
	}
	@JSONField(name="Barcode")
	public String getBarcode() {
		return Barcode;
	}
	public void setBarcode(String barcode) {
		Barcode = barcode;
	}
	@JSONField(name="State")
	public int getState() {
		return State;
	}
	public void setState(int state) {
		State = state;
	}
	@JSONField(name="IsLoad")
	public int getIsLoad() {
		return IsLoad;
	}
	public void setIsLoad(int isLoad) {
		IsLoad = isLoad;
	}
    
}
