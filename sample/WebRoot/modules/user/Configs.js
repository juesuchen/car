/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.user.Configs', {
    extend: 'Ext.easy.BaseConfigs',
    
    init : function(){
    	this.model = 'user';
        //人员配置
        this.addCfg(EasyUtil.getBaseConfig('用户名','name',{required : true}));
        this.addCfg(EasyUtil.getBaseConfig('登陆名','login_name',{required : true}));
        this.addCfg(EasyUtil.getBaseConfig('密码','password',{required : true,inputType:'password',hiddenColumn:true}));
        this.addCfg(EasyUtil.getBaseConfig('电话','phone',{hiddenColumn:true}));
        this.addCfg(EasyUtil.getBaseConfig('手机','mobile'));
        this.addCfg(EasyUtil.getBaseConfig('邮箱','email',{vtype: 'email',hiddenColumn:true}));
    },
    getQueryFormItems : function(){
    	return [
    		this.getRawModelByName('name'),
        	this.getRawModelByName('login_name'),
        	this.getRawModelByName('mobile')
    	];
    },
    getQueryFields : function(){
    	var fields = new Ext.util.MixedCollection();
    	fields.add(this.getRawByName('login_name'));
    	fields.add(this.getRawByName('name'));
    	fields.add(this.getRawByName('password'));
    	fields.add(this.getRawByName('phone'));
    	fields.add(this.getRawByName('mobile'));
    	fields.add(this.getRawByName('email'));
    	fields.add(this.getRawByName('update_by'));
    	fields.add(this.getRawByName('update_date'));
    	fields.add(this.getRawByName('id'));
    	return fields;
    }
});
