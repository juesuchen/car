package com.minisoft.controller;

import java.util.Map;

import com.jfinal.plugin.activerecord.Page;
import com.minisoft.service.PaginateService;

/**
 * IndexController
 */
public class PaginateController extends BaseController {
	
	private PaginateService service = new PaginateService();
	
    public void index() throws Exception {
        Map<String, String[]> paraMap = getParaMap();
        Page page = service.doPagin(paraMap);
        renderJson(page);
    }

}
