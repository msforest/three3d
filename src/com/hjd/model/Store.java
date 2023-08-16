package com.hjd.model;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

public class Store {
	 /// <summary>
    /// 仓库编号
    /// </summary>
    public String No;
    /// <summary>
    /// 仓库名称
    /// </summary>
    public String Name;
    /// <summary>
    /// 长
    /// </summary>
    public int Length;
    /// <summary>
    /// 宽
    /// </summary>
    public int Width;
    /// <summary>
    /// 高
    /// </summary>
    public int Height;

    /// <summary>
    /// 位置信息
    /// </summary>
    public Position Position;
  /// <summary>
    /// 旋转角度
    /// </summary>
    public int RotationY;
    //---------------------------------------
    /// <summary>
    /// 库存总数量
    /// </summary>
    public int TotalBinNum;
    /// <summary>
    /// 已占用库存数量
    /// </summary>
    public int OccurpyBinNum;
    /// <summary>
    /// 当天入库数量
    /// </summary>
    public int InStoreNum;
    /// <summary>
    /// 当前出库数量
    /// </summary>
    public int OutStoreNum;
    /// <summary>
    /// 超期
    /// </summary>
    public int OutOfTimeNum;
    /// <summary>
    /// 预超期数量
    /// </summary>
    public int PreOutOfTimeNum;
    /// <summary>
    /// 不合格数量
    /// </summary>
    public int NgNum;
    /// <summary>
    /// 合格数量
    /// </summary>
    public int AlarmNum;
    
    /// <summary>
    /// 组数
    /// </summary>
    public List<Group> Groups;
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
	@JSONField(name="Length")
	public int getLength() {
		return Length;
	}
	public void setLength(int length) {
		Length = length;
	}
	@JSONField(name="Width")
	public int getWidth() {
		return Width;
	}
	public void setWidth(int width) {
		Width = width;
	}
	@JSONField(name="Height")
	public int getHeight() {
		return Height;
	}
	public void setHeight(int height) {
		Height = height;
	}
	@JSONField(name="Position")
	public Position getPosition() {
		return Position;
	}
	public void setPosition(Position position) {
		Position = position;
	}
	@JSONField(name="TotalBinNum")
	public int getTotalBinNum() {
		return TotalBinNum;
	}
	public void setTotalBinNum(int totalBinNum) {
		TotalBinNum = totalBinNum;
	}
	@JSONField(name="OccurpyBinNum")
	public int getOccurpyBinNum() {
		return OccurpyBinNum;
	}
	public void setOccurpyBinNum(int occurpyBinNum) {
		OccurpyBinNum = occurpyBinNum;
	}
	@JSONField(name="InStoreNum")
	public int getInStoreNum() {
		return InStoreNum;
	}
	public void setInStoreNum(int inStoreNum) {
		InStoreNum = inStoreNum;
	}
	@JSONField(name="OutStoreNum")
	public int getOutStoreNum() {
		return OutStoreNum;
	}
	public void setOutStoreNum(int outStoreNum) {
		OutStoreNum = outStoreNum;
	}
	@JSONField(name="OutOfTimeNum")
	public int getOutOfTimeNum() {
		return OutOfTimeNum;
	}
	public void setOutOfTimeNum(int outOfTimeNum) {
		OutOfTimeNum = outOfTimeNum;
	}
	@JSONField(name="PreOutOfTimeNum")
	public int getPreOutOfTimeNum() {
		return PreOutOfTimeNum;
	}
	
	public void setPreOutOfTimeNum(int preOutOfTimeNum) {
		PreOutOfTimeNum = preOutOfTimeNum;
	}
	@JSONField(name="NgNum")
	public int getNgNum() {
		return NgNum;
	}
	public void setNgNum(int ngNum) {
		NgNum = ngNum;
	}
	@JSONField(name="AlarmNum")
	public int getAlarmNum() {
		return AlarmNum;
	}
	public void setAlarmNum(int alarmNum) {
		AlarmNum = alarmNum;
	}
	@JSONField(name="RotationY")
	public int getRotationY() {
		return RotationY;
	}
	public void setRotationY(int rotationY) {
		RotationY = rotationY;
	}
	@JSONField(name="Groups")
	public List<Group> getGroups() {
		return Groups;
	}
	public void setGroups(List<Group> groups) {
		Groups = groups;
	}
    
}
