package com.minisoft.model;

import java.sql.SQLException;

import com.jfinal.plugin.activerecord.Db;
import com.jfinal.plugin.activerecord.IAtom;
import com.jfinal.plugin.activerecord.Model;

/**
 * User model.

将表结构放在此，消除记忆负担
mysql> desc sys_user;
+-------------+--------------+------+-----+---------+-------+
| Field       | Type         | Null | Key | Default | Extra |
+-------------+--------------+------+-----+---------+-------+
| id          | varchar(64)  | NO   | PRI | NULL    |       |
| company_id  | varchar(64)  | NO   | MUL | NULL    |       |
| office_id   | varchar(64)  | NO   | MUL | NULL    |       |
| login_name  | varchar(100) | NO   | MUL | NULL    |       |
| password    | varchar(100) | NO   |     | NULL    |       |
| no          | varchar(100) | YES  |     | NULL    |       |
| name        | varchar(100) | NO   |     | NULL    |       |
| email       | varchar(200) | YES  |     | NULL    |       |
| phone       | varchar(200) | YES  |     | NULL    |       |
| mobile      | varchar(200) | YES  |     | NULL    |       |
| user_type   | char(1)      | YES  |     | NULL    |       |
| login_ip    | varchar(100) | YES  |     | NULL    |       |
| login_date  | datetime     | YES  |     | NULL    |       |
| create_by   | varchar(64)  | YES  |     | NULL    |       |
| create_date | datetime     | YES  |     | NULL    |       |
| update_by   | varchar(64)  | YES  |     | NULL    |       |
| update_date | datetime     | YES  | MUL | NULL    |       |
| remarks     | varchar(255) | YES  |     | NULL    |       |
| del_flag    | char(1)      | NO   | MUL | 0       |       |
+-------------+--------------+------+-----+---------+-------+

数据库字段名建议使用驼峰命名规则，便于与 java 代码保持一致，如字段名： userId
 */
public class User extends Model<User> {

    public static final User me = new User();

    public User findByUserid(String userid) {
        return me.findFirst("select * from sys_user where login_name = ? and del_flag = 0", userid);
    }

	public boolean deleteUserById(final String id) {
		return Db.tx(new IAtom() {
			public boolean run() throws SQLException {
				me.deleteById(id);
				Db.update("delete from sys_user_role where user_id = ?",id);
				return true;
			}
		});
	}

}
