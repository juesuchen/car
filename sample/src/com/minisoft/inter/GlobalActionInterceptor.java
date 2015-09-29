package com.minisoft.inter;

import com.jfinal.aop.Interceptor;
import com.jfinal.aop.Invocation;
import com.jfinal.core.Controller;
import com.minisoft.controller.BaseController;

public class GlobalActionInterceptor implements Interceptor {

    @Override
    public void intercept(Invocation inv) {
        Controller controller = inv.getController();
        if (controller instanceof BaseController) {
            BaseController baseController = (BaseController) controller;
            if (baseController.getLoginUser() == null) {
                controller.redirect("/login");
            }

        }
        inv.invoke();
    }

}
