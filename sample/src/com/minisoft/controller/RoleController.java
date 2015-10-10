package com.minisoft.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.kit.HashKit;
import com.minisoft.common.Cols;
import com.minisoft.model.Menu;
import com.minisoft.model.Role;
import com.minisoft.model.RoleMenu;
import com.minisoft.model.User;
import com.minisoft.service.RoleService;
import com.minisoft.utils.BeanUtil;
import com.minisoft.utils.IdGen;

/**
 * RoleController
 */
public class RoleController extends BaseController {

    private RoleService roleService = new RoleService();

    public void main() {
        render("main.jsp");
    }
    
    public void getPrivilege() {
    	String rid = getPara();
    	List<Menu> menus = roleService.getMenusByRole(rid);
        Map<String, String> map = new HashMap<String, String>();
        for (Menu menu : menus) {
            map.put(menu.getStr(Cols.permission), "1");
        }
        renderJson(map);
    }
    
    public void savePrivilege () {
    	boolean result = roleService.savePrivilege(getPara("roleIds"),getPara("privileges"));
    	renderJson(SUCCESS,result);
    }
    
    public void getMenus() {
    	List<Map<String, Object>> menus = roleService.getMenus();
    	renderJson(menus);
    }
    
    public void add() throws Exception {
    	Role model = BeanUtil.getModel(Role.class, getParaMap());
    	User loginUser = getLoginUser();
    	model.set(Cols.id, IdGen.uuid()).set(Cols.creator, loginUser.getStr(Cols.name))
    		 .set(Cols.createTime, new Date());
    	boolean result = model.save();
    	renderJson(SUCCESS,result);
    }
    
    public void update() throws Exception {
    	Role model = BeanUtil.getModel(Role.class, getParaMap());
    	User loginUser = getLoginUser();
    	model.set(Cols.updator, loginUser.getStr(Cols.name)).set(Cols.updateTime,  new Date());
    	boolean result = model.update();
    	renderJson(SUCCESS,result);
    }
    public void delete() {
    	String id = getPara();
    	boolean result = Role.me.deleteRoleById(id);
    	renderJson(SUCCESS,result);
    }
}
