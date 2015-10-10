package com.minisoft.controller;

import com.jfinal.aop.Clear;
import com.minisoft.model.User;
import com.minisoft.service.LoginService;

/**
 * BlogController 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller
 * 中，养成好习惯，有利于大型项目的开发与维护
 */

public class LoginController extends BaseController {

    private LoginService loginService = new LoginService();

    public void index() {
        render("login.jsp");
    }

    @Clear
    public void login() {
        String userid = getPara("userid");
        String password = getPara("password");
        User user = loginService.login(userid, password);
        if (user != null) {
            setLoginUser(user);
            redirect("/main");
        } else {
            setAttr("message", "用户名或密码错误。");
        }
    }
}
