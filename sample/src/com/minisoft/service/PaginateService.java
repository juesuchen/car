package com.minisoft.service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.commons.codec.binary.StringUtils;

import com.jfinal.kit.StrKit;
import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.Model;
import com.jfinal.plugin.activerecord.Page;
import com.jfinal.plugin.activerecord.Table;
import com.jfinal.plugin.activerecord.TableMapping;

public class PaginateService {

	public Page doPagin(Map<String, String[]> paraMap) throws Exception {
		String queryId = paraMap.get("queryId")[0];
		Class<? extends Model> modelClass = (Class<? extends Model>) Class
				.forName("com.minisoft.model."
						+ StrKit.firstCharToUpperCase(queryId));
		Table table = TableMapping.me().getTable(modelClass);
		List<Object> paras = new ArrayList<Object>();
		StringBuffer sqlStr = new StringBuffer("from " + table.getName()
				+ " where 1 = 1 ");
		Set<String> nameSet = paraMap.keySet();
		Object val = null;
		for (String name : nameSet) {
			String[] props = name.split("\\.");
			if (props[0].equals(queryId)) {
				Class<?> type = table.getColumnType(props[1]);
				if (paraMap.get(name) != null
						&& !paraMap.get(name)[0].equals("")) {
					val = paraMap.get(name)[0];
					if (type == String.class) {
						sqlStr.append(" and ").append(props[1])
								.append(" like ?");
						val = "'%" + val + "%'";
					} else {
						sqlStr.append(" and ").append(props[1]).append(" = ?");
					}
					paras.add(val);
				}
			}
		}
		int pageNumber = Integer.parseInt(paraMap.get("page")[0]);
		int pageSize = Integer.parseInt(paraMap.get("limit")[0]);
		return Db.paginate(pageNumber, pageSize, "select * ",
				sqlStr.toString(), paras.toArray());
	}
}
