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
        
    },
    getFuntionNodes : function(){
    	return this.funtionNodes;
    },
    getQueryFormItems : function(){
    	return [
    	];
    },
    getQueryFields : function(){
    	var fields = new Ext.util.MixedCollection();
    	return fields;
    }
});
