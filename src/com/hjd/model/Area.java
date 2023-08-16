package com.hjd.model;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

public class Area {
	 /// <summary>
    /// 编号
    /// </summary>
    public String No;
    /// <summary>
    /// 名称
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
    /// X轴位置
    /// </summary>
    public Position Position;
    /// <summary>
    /// 库区标题
    /// </summary>
    public Title Title;

    /// <summary>
    /// 仓库
    /// </summary>
    public List<Store> Stores;
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
	@JSONField(name="Position")
	public Position getPosition() {
		return Position;
	}

	public void setPosition(Position position) {
		Position = position;
	}

	@JSONField(name="Title")
	public Title getTitle() {
		return Title;
	}

	public void setTitle(Title title) {
		Title = title;
	}
	@JSONField(name="Stores")
	public List<Store> getStores() {
		return Stores;
	}

	public void setStores(List<Store> stores) {
		Stores = stores;
	}
    
}
