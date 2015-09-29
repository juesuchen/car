package com.minisoft.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.minisoft.common.Cols;

public class Menu extends Model<Menu> {

    public static final Menu me = new Menu();

    public List<Menu> getMenusByUser(User user) {
        String sql = "select m.id,m.parent_id,m.name,m.permission from sys_role r,sys_role_menu rm,sys_menu m where r.del_flag = 0 and m.del_flag=0 and r.id=rm.role_id and m.id = rm.menu_id and r.id in (select ur.role_id from sys_user u ,sys_user_role ur where u.id = ur.user_id and u.id = ?)";
        Object paras = user.get(Cols.id);
        return Menu.me.find(sql, paras);
    }

}
