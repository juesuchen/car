package com.minisoft.model;

import java.sql.SQLException;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Model;
import com.minisoft.common.Cols;
/**
 * User model.

将表结构放在此，消除记忆负担
mysql> desc sys_role;
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| id          | varchar(64)  | NO   | PRI | NULL    |       |
| office_id   | varchar(64)  | YES  |     | NULL    |       |
| name        | varchar(100) | NO   |     | NULL    |       |
| data_scope  | char(1)      | YES  |     | NULL    |       |
| create_by   | varchar(64)  | YES  |     | NULL    |       |
| create_date | datetime     | YES  |     | NULL    |       |
| update_by   | varchar(64)  | YES  |     | NULL    |       |
| update_date | datetime     | YES  |     | NULL    |       |
| remarks     | varchar(255) | YES  |     | NULL    |       |
| del_flag    | char(1)      | NO   | MUL | 0       |       |
+-------------+--------------+------+-----+---------+-------+

数据库字段名建议使用驼峰命名规则，便于与 java 代码保持一致，如字段名： userId
 */
public class Role extends Model<Role> {

    public static final Role me = new Role();

	public boolean deleteRoleById(final String id) {
		return Db.tx(new IAtom() {
			public boolean run() throws SQLException {
				me.deleteById(id);
				Db.update("delete from sys_role_menu where role_id = ?",id);
				return true;
			}
		});
	}

}
