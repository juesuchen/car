package com.minisoft.controller;

import java.util.List;
import java.util.Map;

import com.minisoft.service.RoleService;

/**
 * RoleController
 */
public class RoleController extends BaseController {

    private RoleService roleService = new RoleService();

    public void main() {
        render("main.jsp");
    }
    
    public void getMenus() {
    	List<Map<String, Object>> menus = roleService.getMenus();
    	renderJson(menus);
    }
}
