package com.minisoft.controller;

/**
 * IndexController
 */
public class IndexController extends BaseController {
    public void index() {
        redirect("/login");
    }

    public void main() {
        render("main.jsp");
    }

    public void maind() {
        render("maind.jsp");
    }
}
