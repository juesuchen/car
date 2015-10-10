package com.minisoft.model;

import java.sql.SQLException;
import java.util.List;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Model;
import com.minisoft.common.Cols;

/**
 * User model.

将表结构放在此，消除记忆负担
mysql> desc sys_role_menu;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| role_id | varchar(64) | NO   | PRI | NULL    |       |
| menu_id | varchar(64) | NO   | PRI | NULL    |       |
+---------+-------------+------+-----+---------+-------+

数据库字段名建议使用驼峰命名规则，便于与 java 代码保持一致，如字段名： userId
 */
public class RoleMenu extends Model<RoleMenu> {

    public static final RoleMenu me = new RoleMenu();
	
	public boolean savePrivilege(final String[] roleIds, final String[] privileges) {
		return Db.tx(new IAtom() {
			public boolean run() throws SQLException {
				for (String rid : roleIds) {
					//delete first
					Db.update("delete from sys_role_menu where role_id = ?",rid);
					for (String menuId : privileges) {
						RoleMenu roleMenu = new RoleMenu();
						roleMenu.set(Cols.roleId, rid).set(Cols.menuId, menuId).save();
					}
				}
				return true;
			}
		});
	}

}
