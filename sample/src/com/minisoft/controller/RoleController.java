package com.minisoft.controller;

import com.minisoft.service.RoleService;

/**
 * RoleController
 */
public class RoleController extends BaseController {

    private RoleService roleService = new RoleService();

    public void main() {
        render("main.jsp");
    }
}
