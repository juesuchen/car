package com.minisoft.utils;

import java.sql.Date;
import java.util.Map;
import java.util.Set;

import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Table;
import com.jfinal.plugin.activerecord.TableMapping;

public class BeanUtil {
	
	public static <T extends Model> T  getModel(Class<T> modelClass,Map<String, String[]> paraMap) throws Exception {
		Table table = TableMapping.me().getTable(modelClass);
		Set<String> nameSet = paraMap.keySet();
		Object value = null;
		T model = modelClass.newInstance();
		for (String name : nameSet) {
			if(table.hasColumnLabel(name)) {
				Class<?> type = table.getColumnType(name);
				value = paraMap.get(name)[0];
				if ("Date".equals(type.getSimpleName())) {
					value = DateKit.toDate((String) value);
				}
				model.set(name, value);
			}
		}
		return model;
	}
}
