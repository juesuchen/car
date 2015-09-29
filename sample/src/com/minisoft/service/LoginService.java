package com.minisoft.service;

import com.minisoft.common.Cols;
import com.minisoft.model.User;
import com.minisoft.utils.Digests;

public class LoginService {

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

}
