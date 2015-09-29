package com.minisoft.controller;

import com.jfinal.core.Controller;
import com.minisoft.model.User;

public class BaseController extends Controller {

    private static final String LOGININFO = "loginUser";

    protected void setLoginUser(User user) {
        setSessionAttr(LOGININFO, user);
    }

    public User getLoginUser() {
        return getSessionAttr(LOGININFO);
    }

}
