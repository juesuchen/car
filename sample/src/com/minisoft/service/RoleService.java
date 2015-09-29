package com.minisoft.service;

import java.util.List;

import com.minisoft.common.Cols;
import com.minisoft.model.Menu;
import com.minisoft.model.User;
import com.minisoft.utils.Digests;

public class RoleService {

    public User login(String userid, String password) {
        User user = User.me.findByUserid(userid);
        if (user != null) {
            String pass = user.getStr(Cols.password);
            String enPass = Digests.sha1Str(password);
            if (pass.equals(enPass)) {
                return user;
            }
        }
        return null;
    }

    public List<Menu> getMenusByUser(User user) {
        List<Menu> menus = Menu.me.getMenusByUser(user);
        return menus;
    }

}
