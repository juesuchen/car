package com.minisoft.model;

import com.jfinal.plugin.activerecord.Model;

public class User extends Model<User> {

    public static final User me = new User();

    public User findByUserid(String userid) {
        return me.findFirst("select * from sys_user where login_name = ? and del_flag = 0", userid);
    }

}
