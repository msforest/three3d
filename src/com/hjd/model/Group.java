package com.hjd.model;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

/// <summary>
/// 仓库组
/// </summary>
public class Group
{
    /// <summary>
    /// 组编号
    /// </summary>
    public String No;
    /// <summary>
    /// 库区名称
    /// </summary>
    public String Name;
    /// <summary>
    /// 位置信息
    /// </summary>
    public Position Position;    
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
    /// 库位长
    /// </summary>
    public int BinLength;
    /// <summary>
    /// 库位宽
    /// </summary>
    public int BinWidth;
    /// <summary>
    /// 库位高
    /// </summary>
    public int BinHeight;
    /// <summary>
    /// 底层高度
    /// </summary>
    public int BottomHeight;

    /// <summary> 
    ///  X轴库位数量
    /// </summary>
    public int BinXNum;
    /// <summary>
    /// Y轴库位数量
    /// </summary>
    public int BinYNum;

    /// <summary>
    /// Z轴库位数量
    /// </summary>
    public int BinZNum;
//------------------------------------------------
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
    /// 各列的名称
    /// </summary>
    public List<String> ColNames;
    /// <summary>
    /// 各列的数量
    /// </summary>
    public List<Integer> ColNums;
    /// <summary>
    /// 库位信息
    /// </summary>
    public List<Bin> Bins;
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
	@JSONField(name="Position")
	public Position getPosition() {
		return Position;
	}
	public void setPosition(Position position) {
		Position = position;
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
	@JSONField(name="BinLength")
	public int getBinLength() {
		return BinLength;
	}
	public void setBinLength(int binLength) {
		BinLength = binLength;
	}
	@JSONField(name="BinWidth")
	public int getBinWidth() {
		return BinWidth;
	}
	public void setBinWidth(int binWidth) {
		BinWidth = binWidth;
	}
	@JSONField(name="BinHeight")
	public int getBinHeight() {
		return BinHeight;
	}
	public void setBinHeight(int binHeight) {
		BinHeight = binHeight;
	}
	@JSONField(name="BottomHeight")
	public int getBottomHeight() {
		return BottomHeight;
	}
	public void setBottomHeight(int bottomHeight) {
		BottomHeight = bottomHeight;
	}
	@JSONField(name="BinXNum")
	public int getBinXNum() {
		return BinXNum;
	}
	public void setBinXNum(int binXNum) {
		BinXNum = binXNum;
	}
	@JSONField(name="BinYNum")
	public int getBinYNum() {
		return BinYNum;
	}
	public void setBinYNum(int binYNum) {
		BinYNum = binYNum;
	}
	@JSONField(name="BinZNum")
	public int getBinZNum() {
		return BinZNum;
	}
	public void setBinZNum(int binZNum) {
		BinZNum = binZNum;
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
	@JSONField(name="ColNames")
	public List<String> getColNames() {
		return ColNames;
	}
	public void setColNames(List<String> colNames) {
		ColNames = colNames;
	}
	@JSONField(name="ColNums")
	public List<Integer> getColNums() {
		return ColNums;
	}
	public void setColNums(List<Integer> colNums) {
		ColNums = colNums;
	}
	@JSONField(name="Bins")
	public List<Bin> getBins() {
		return Bins;
	}
	public void setBins(List<Bin> bins) {
		Bins = bins;
	}

}
