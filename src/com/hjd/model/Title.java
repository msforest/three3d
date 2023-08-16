package com.hjd.model;

import com.alibaba.fastjson.annotation.JSONField;

public class Title {
	 /// <summary>
    /// 标题内容
    /// </summary>
    public String Text;
    /// <summary>
    /// 标题字体大小
    /// </summary>
    public int FontSize;
    /// <summary>
    /// 字体颜色
    /// </summary>
    public String TextColor;
    /// <summary>
    /// 字体位置
    /// </summary>
    public  Position Position;
    @JSONField(name="Text")
	public String getText() {
		return Text;
	}
	public void setText(String text) {
		Text = text;
	}
	@JSONField(name="FontSize")
	public int getFontSize() {
		return FontSize;
	}
	public void setFontSize(int fontSize) {
		FontSize = fontSize;
	}
	@JSONField(name="TextColor")
	public String getTextColor() {
		return TextColor;
	}
	public void setTextColor(String textColor) {
		TextColor = textColor;
	}
	@JSONField(name="Position")
	public Position getPosition() {
		return Position;
	}
	public void setPosition(Position position) {
		Position = position;
	}
    
}
