package com.hjd.model;

import java.util.List;

import com.alibaba.fastjson.annotation.JSONField;

public class StoreFrame {
	  /// <summary>
    /// 库区集合
    /// </summary>
    public List<Area> Areas;
    @JSONField(name="Areas")
	public List<Area> getAreas() {
		return Areas;
	}

	public void setAreas(List<Area> areas) {
		Areas = areas;
	}
    
}
