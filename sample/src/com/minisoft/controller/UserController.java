package com.minisoft.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.jfinal.kit.HashKit;
import com.minisoft.common.Cols;
import com.minisoft.model.Menu;
import com.minisoft.model.User;
import com.minisoft.service.RoleService;
import com.minisoft.service.UserService;
import com.minisoft.utils.BeanUtil;
import com.minisoft.utils.Digests;
import com.minisoft.utils.IdGen;

/**
 * BlogController 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller
 * 中，养成好习惯，有利于大型项目的开发与维护
 */
public class UserController extends BaseController {
    private RoleService roleService = new RoleService();

    private UserService service = new UserService();
    
    public void defaultright() {
        User user = getLoginUser();
        List<Menu> menus = roleService.getMenusByUser(user);
        Map<String, String> map = new HashMap<String, String>();
        map.put("loginUser", user.getStr(Cols.name));
        for (Menu menu : menus) {
            map.put(menu.getStr(Cols.permission), "1");
        }
        renderJson(map);
    }
    
    public void get() {
    	String id = getPara();
    	User user = User.me.findById(id);
    	renderJson(user);
    }
    
    public void add() throws Exception {
    	User user = BeanUtil.getModel(User.class, getParaMap());
    	user.set(Cols.id, IdGen.uuid());
    	User loginUser = getLoginUser();
    	String pass = user.getStr(Cols.password);
    	user.set(Cols.password, HashKit.sha256(pass))
    		.set(Cols.creator, loginUser.getStr(Cols.name)).set(Cols.createTime, new Date());
    	boolean result = user.save();
    	renderJson(SUCCESS,result);
    }
    
    public void update() throws Exception {
    	User user = BeanUtil.getModel(User.class, getParaMap());
    	User loginUser = getLoginUser();
    	user.set(Cols.updator, loginUser.getStr(Cols.name)).set(Cols.updateTime,  new Date());
    	String pass = user.getStr(Cols.password);
    	if (pass.length() != 64) {
    		user.set(Cols.password, HashKit.sha256(pass));
    	}
    	boolean result = user.update();
    	renderJson(SUCCESS,result);
    }
    public void delete() {
    	String id = getPara();
    	boolean result = User.me.deleteUserById(id);
    	renderJson(SUCCESS,result);
    }
    
    public void logout() {
    	getSession().invalidate();
    	renderJson(SUCCESS,true);
    }
}
