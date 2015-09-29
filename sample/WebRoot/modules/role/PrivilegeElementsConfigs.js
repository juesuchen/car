/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.role.PrivilegeElementsConfigs', {
    extend: 'Ext.easy.BaseElementsConfigs',
    
    constructor : function(config){
      config = config || {};
      Ext.apply(this, config);
      this.callParent();
      this.init();
    },
    init : function(){
        //人员配置
        this.addCfg(EasyUtil.getBaseConfig('用户名','userName',{required : true}));
        this.addCfg(EasyUtil.getBaseConfig('登陆名','loginName',{required : true}));
        this.addCfg(EasyUtil.getBaseConfig('密码','password',{required : true,inputType:'password',hiddenColumn:true}));
        this.addCfg(EasyUtil.getBaseConfig('电话','phone',{hiddenColumn:true}));
        this.addCfg(EasyUtil.getBaseConfig('手机','mobile'));
        this.addCfg(EasyUtil.getBaseConfig('邮箱','email',{vtype: 'email',hiddenColumn:true}));
        
    },
    getQueryFormItems : function(){
    	return [
    		this.getBaseConfigByName('userName'),
        	this.getBaseConfigByName('loginName'),
        	this.getBaseConfigByName('mobile')
    	];
    },
    getQueryStaffFields : function(){
    	var fields = new Ext.util.MixedCollection();
    	fields.add(this.getConfigByName('loginName'));
    	fields.add(this.getConfigByName('userName'));
    	fields.add(this.getConfigByName('password'));
    	fields.add(this.getConfigByName('phone'));
    	fields.add(this.getConfigByName('mobile'));
    	fields.add(this.getConfigByName('email'));
    	fields.add(this.getConfigByName('updator'));
    	fields.add(this.getConfigByName('updateTime'));
    	fields.add(this.getConfigByName('id'));
    	return fields;
    }
});
