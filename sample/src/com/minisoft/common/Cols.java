package com.minisoft.common;

/**
 * @ClassName: Cols
 * @Description: TODO(defined the all table columns )
 * @author juesu.chen
 * @date Sep 28, 2015 11:19:20 AM
 * @version 1.0
 */
public interface Cols {
    /*** common fields ***/
    String id = "id";

    String delflag_i = "del_flag";

    String creator = "create_by";

    String createTime = "create_date";

    String updator = "update_by";

    String updateTime = "update_date";

    /*** user fields ***/

    String loginName = "login_name";

    String name = "name";

    String password = "password";

    String permission = "permission";
    
    String parentId = "parent_id";
    

}
