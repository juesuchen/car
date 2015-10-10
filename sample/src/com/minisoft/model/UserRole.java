package com.minisoft.model;

import com.jfinal.plugin.activerecord.Model;

/**
 * User model.

将表结构放在此，消除记忆负担
mysql> desc sys_user_role;
+---------+-------------+------+-----+---------+-------+
| Field   | Type        | Null | Key | Default | Extra |
+---------+-------------+------+-----+---------+-------+
| user_id | varchar(64) | NO   | PRI | NULL    |       |
| role_id | varchar(64) | NO   | PRI | NULL    |       |
+---------+-------------+------+-----+---------+-------+

数据库字段名建议使用驼峰命名规则，便于与 java 代码保持一致，如字段名： userId
 */
public class UserRole extends Model<UserRole> {

    public static final UserRole me = new UserRole();

}
