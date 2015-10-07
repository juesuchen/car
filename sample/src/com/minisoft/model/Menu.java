package com.minisoft.model;

import java.util.List;

import com.jfinal.plugin.activerecord.Model;
import com.minisoft.common.Cols;

/**
  mysql> desc sys_menu;
+-------------+---------------+------+-----+---------+-------+
| Field       | Type          | Null | Key | Default | Extra |
+-------------+---------------+------+-----+---------+-------+
| id          | varchar(64)   | NO   | PRI | NULL    |       |
| parent_id   | varchar(64)   | NO   | MUL | NULL    |       |
| parent_ids  | varchar(2000) | NO   |     | NULL    |       |
| name        | varchar(100)  | NO   |     | NULL    |       |
| href        | varchar(255)  | YES  |     | NULL    |       |
| target      | varchar(20)   | YES  |     | NULL    |       |
| icon        | varchar(100)  | YES  |     | NULL    |       |
| sort        | int(11)       | NO   |     | NULL    |       |
| is_show     | char(1)       | NO   |     | NULL    |       |
| is_activiti | char(1)       | YES  |     | NULL    |       |
| permission  | varchar(200)  | YES  |     | NULL    |       |
| create_by   | varchar(64)   | YES  |     | NULL    |       |
| create_date | datetime      | YES  |     | NULL    |       |
| update_by   | varchar(64)   | YES  |     | NULL    |       |
| update_date | datetime      | YES  |     | NULL    |       |
| remarks     | varchar(255)  | YES  |     | NULL    |       |
| del_flag    | char(1)       | NO   | MUL | 0       |       |
+-------------+---------------+------+-----+---------+-------+
 */
public class Menu extends Model<Menu> {

    public static final Menu me = new Menu();

    public List<Menu> getMenusByUser(User user) {
        String sql = "select m.id,m.parent_id,m.name,m.permission from sys_role r,sys_role_menu rm,sys_menu m where r.del_flag = 0 and m.del_flag=0 and r.id=rm.role_id and m.id = rm.menu_id and r.id in (select ur.role_id from sys_user u ,sys_user_role ur where u.id = ur.user_id and u.id = ?)";
        Object paras = user.get(Cols.id);
        return Menu.me.find(sql, paras);
    }
    
    public List<Menu> getMenus() {
        String sql = "SELECT * FROM sys_menu where del_flag = 0 order by sort";
        return Menu.me.find(sql);
    }

}
