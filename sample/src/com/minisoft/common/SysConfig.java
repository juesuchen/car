package com.minisoft.common;

import com.jfinal.config.Constants;
import com.jfinal.config.Handlers;
import com.jfinal.config.Interceptors;
import com.jfinal.config.JFinalConfig;
import com.jfinal.config.Plugins;
import com.jfinal.config.Routes;
import com.jfinal.kit.PropKit;
import com.jfinal.plugin.activerecord.ActiveRecordPlugin;
import com.jfinal.plugin.c3p0.C3p0Plugin;
import com.jfinal.render.ViewType;
import com.minisoft.controller.IndexController;
import com.minisoft.controller.LoginController;
import com.minisoft.controller.RoleController;
import com.minisoft.controller.UserController;
import com.minisoft.inter.GlobalActionInterceptor;
import com.minisoft.model.Menu;
import com.minisoft.model.Role;
import com.minisoft.model.User;

public class SysConfig extends JFinalConfig {
    /**
     * 配置常量
     */
    public void configConstant(Constants me) {
        PropKit.use("config.properties"); // 加载少量必要配置，随后可用PropKit.get(...)获取值
        me.setDevMode(PropKit.getBoolean("devMode", false));
        me.setViewType(ViewType.JSP); // 设置视图类型为Jsp，否则默认为FreeMarker
    }

    /**
     * 配置路由
     */
    public void configRoute(Routes me) {
        me.add("/", IndexController.class, "/pages"); // 第三个参数为该Controller的视图存放路径
        me.add("/user", UserController.class); // 第三个参数省略时默认与第一个参数值相同
        me.add("/login", LoginController.class, "/pages");
        me.add("/role", RoleController.class, "/pages");

    }

    /**
     * 配置插件
     */
    public void configPlugin(Plugins me) {
        // 配置C3p0数据库连接池插件
        C3p0Plugin c3p0Plugin = new C3p0Plugin(PropKit.get("jdbcUrl"), PropKit.get("user"), PropKit.get("password")
                .trim());
        me.add(c3p0Plugin);

        // 配置ActiveRecord插件
        ActiveRecordPlugin arp = new ActiveRecordPlugin(c3p0Plugin);
        me.add(arp);
        arp.addMapping("sys_user", User.class);
        arp.addMapping("sys_role", Role.class);
        arp.addMapping("sys_menu", Menu.class);
    }

    /**
     * 配置全局拦截器
     */
    public void configInterceptor(Interceptors me) {
        // 添加控制层全局拦截器
        me.addGlobalActionInterceptor(new GlobalActionInterceptor());
    }

    /**
     * 配置处理器
     */
    public void configHandler(Handlers me) {

    }
}
