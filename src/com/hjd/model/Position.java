package com.hjd.model;

import com.alibaba.fastjson.annotation.JSONField;

public class Position {
	 /// <summary>
    /// X轴坐标
    /// </summary>
    public int X;
    /// <summary>
    /// Y轴坐标
    /// </summary>
    public int Y;
    /// <summary>
    /// Z轴坐标
    /// </summary>
    public int Z;
    @JSONField(name="X")
	public int getX() {
		return X;
	}
	public void setX(int x) {
		X = x;
	}
	@JSONField(name="Y")
	public int getY() {
		return Y;
	}
	public void setY(int y) {
		Y = y;
	}
	@JSONField(name="Z")
	public int getZ() {
		return Z;
	}
	public void setZ(int z) {
		Z = z;
	}
}
