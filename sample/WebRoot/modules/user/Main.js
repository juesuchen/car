/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.user.Main', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.user.Configs'
    ],
    
    initComponent : function(){
        var me = this;
        this.border = false;
        this.frame = false;
        this.layout = 'border';
        me.callParent();
        
        this.addPanel();
    },
    addPanel : function(){
    	//定义查询表单
    	this.queryForm = EasyUtil.getEasyQueryForm(Ext.bind(this.doQuery,this),userConfigs.getQueryFormItems(), 3);
		//定义展示列表
		var viewGridConfig = {
		            xtype : 'easygrid',
		            noAutoLoad : true,
		            region : 'center',
		            showTbar : true,
		            showBbar : true,
		            parentPanel :this,
		            noNeddForceFit : false,
		            subWindowTitle : '用户信息详情',
		            baseParams : {queryId : userConfigs.getModel()},
		            fields : userConfigs.getQueryFields()
		        };
		this.easyGrid = new Ext.ux.EasyGrid(viewGridConfig);
		this.add([this.queryForm,this.easyGrid]);
    },
    doQuery : function(){
    	EasyUtil.doEasyQuery(this.easyGrid,this.queryForm);
    },
    dbClickFun : function(r){
    	var url = 'sysinfo/getPrivilege.do';
    	EasyUtil.easyAjax(url,{userId:r.get('id')},function(response, opts) {
            var privilege = Ext.decode(response.responseText);
            var records = this.tree.getView().getRecords(this.tree.getView().getNodes());
            Ext.each(records,function(node){
            	node.set('checked',privilege[node.raw.funCode]);
            },this);
        },this);
    },
    addRecord : function(store, form){
    	EasyUtil.submitForm(form,'user/add',this,{isDoQuery:true});
    },
    updateRecord : function(store, r, values,form){
    	EasyUtil.submitForm(form,'extjsoncontrollersuport/update.do',this,{entity : 'base.UserInfo',isDoQuery:true});
    },
    afterWinShow : function(form){
    	form.findField('login_name').setDisabled(!form.baseParams.create);
    },
    removeRecord : function(store, r,gridName,grid){
    	var isSuc = false;
    	EasyUtil.easyAjax('extjsoncontrollersuport/remove.do',{id : r.get('id'),entity : 'base.UserInfo',isDoQuery:true},
                function(response, opts) {
    				 var resObj = Ext.decode(response.responseText);
    				 isSuc = resObj.success;
   		 		},this,true
    	);
    	return isSuc;
    }
});