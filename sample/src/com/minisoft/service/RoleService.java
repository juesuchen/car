package com.minisoft.service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.plugin.activerecord.Record;
import com.minisoft.common.Cols;
import com.minisoft.model.Menu;
import com.minisoft.model.RoleMenu;
import com.minisoft.model.User;
import com.minisoft.utils.Digests;

public class RoleService {

    public User login(String userid, String password) {
        User user = User.me.findByUserid(userid);
        if (user != null) {
            String pass = user.getStr(Cols.password);
            String enPass = Digests.sha1Str(password);
            if (pass.equals(enPass)) {
                return user;
            }
        }
        return null;
    }

    public List<Menu> getMenusByUser(User user) {
        List<Menu> menus = Menu.me.getMenusByUser(user);
        return menus;
    }
    
    public List<Map<String,Object>> getMenus() {
    	List<Menu> menus = Menu.me.getMenus();
    	List<Map<String,Object>> result = new ArrayList<Map<String,Object>>();
    	Map<String,Map<String,Object>> maps = new HashMap<String,Map<String,Object>>();
    	for (Menu menu : menus) {
			String id = menu.getStr(Cols.id);
			String pid = menu.getStr(Cols.parentId);
			String name = menu.getStr(Cols.name);
			String funCode = menu.getStr(Cols.permission);
			if (!"0".equals(pid)) {
				Map<String,Object> node = maps.get(pid);
				List<Map<String,Object>> children= (List<Map<String, Object>>) node.get("children");
				Map<String,Object> item = new HashMap<String, Object>();
				item.put("id", id);
				item.put("iconCls", "fun");
				item.put("text", name);
				item.put("funCode", funCode);
				item.put("leaf", Boolean.TRUE);
				item.put("checked", Boolean.FALSE);
				children.add(item);
			} else {
				Map<String,Object> node = new HashMap<String, Object>();
				node.put("id", id);
				node.put("iconCls", "option");
				node.put("text", name);
				node.put("funCode", funCode);
				node.put("children", new ArrayList<Map<String,Object>>());
				node.put("checked", Boolean.FALSE);
				maps.put(id, node);
				result.add(node);
			}
		}
    	
    	return result;
    	
    }

	public List<Menu> getMenusByRole(String rid) {
		return Menu.me.getMenusByRole(rid);
	}

	public boolean savePrivilege(String roleIdsStr, String privilegesStr) {
		String[] roleIds = roleIdsStr.split(",");
    	String[] privileges = privilegesStr.split(",");
    	return RoleMenu.me.savePrivilege(roleIds,privileges);
	}

}
