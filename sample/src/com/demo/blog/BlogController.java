package com.demo.blog;

import java.util.Date;
import java.util.List;

import com.jfinal.aop.Before;
import com.jfinal.core.Controller;
import com.jfinal.plugin.activerecord.Page;

/**
 * BlogController 所有 sql 与业务逻辑写在 Model 或 Service 中，不要写在 Controller
 * 中，养成好习惯，有利于大型项目的开发与维护
 */
@Before(BlogInterceptor.class)
public class BlogController extends Controller {

    public void index() {
        setAttr("blogPage", Blog.me.paginate(getParaToInt(0, 1), 10));
        render("blog.jsp");
    }

    public void getJson() {
        Page<Blog> page = Blog.me.paginate(getParaToInt(0, 1), 10);
        List<Blog> list = page.getList();
        for (Blog blog : list) {
            blog.removeNullValueAttrs();
        }
        renderJson(page);
    }

    public void add() {
    }

    @Before(BlogValidator.class)
    public void save() {
        getModel(Blog.class).save();
        redirect("/blog");
    }

    public void edit() {
        setAttr("blog", Blog.me.findById(getParaToInt()));
    }

    @Before(BlogValidator.class)
    public void update() {
        Blog model = getModel(Blog.class);
        model.set("upTime", new Date());
        model.set("update", new Date());
        model.update();
        redirect("/blog");
    }

    public void delete() {
        Blog.me.deleteById(getParaToInt());
        redirect("/blog");
    }
}
