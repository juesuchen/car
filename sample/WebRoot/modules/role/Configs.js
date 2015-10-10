/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.role.Configs', {
    extend: 'Ext.easy.BaseConfigs',

    loadBaseData : function () {
    	EasyUtil.easyAjax('role/getMenus',{},function(response, opts) {
    		this.funtionNodes = Ext.decode(response.responseText);
        },this);
    },
    init : function(){
    	this.model = 'role';
    	this.addCfg(EasyUtil.getBaseConfig('角色名','name',{required : true}));
    	this.addCfg(EasyUtil.getBaseConfig('备注','remarks',{colspan:2,width:480}));
    },
    getFuntionNodes : function(){
    	return this.funtionNodes;
    },
    getQueryFormItems : function(){
    	return [
    	   this.getRawModelByName('name')
    	];
    },
    getQueryFields : function(){
    	var fields = new Ext.util.MixedCollection();
    	fields.add(this.getRawByName('name'));
    	fields.add(this.getRawByName('id'));
    	fields.add(this.getRawByName('remarks'));
    	fields.add(this.getRawByName('update_by'));
    	fields.add(this.getRawByName('update_date'));
    	return fields;
    }
});
