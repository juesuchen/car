/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.role.PrivilegeMainPanel', {
    extend: 'Ext.panel.Panel',
    requires: [
        'Ext.role.PrivilegeElementsConfigs'
    ],
    
    initComponent : function(){
        var me = this;
        this.border = false;
        this.frame = false;
        this.layout = 'border';
        me.callParent();
        
        this.addPrivilegePanel();
    },
    addPrivilegePanel : function(){
    	//定义查询表单
    	this.queryForm = EasyUtil.getEasyQueryForm(Ext.bind(this.doQuery,this),privilegeElementsConfigs.getQueryFormItems(), 3);
		//定义展示列表
		var viewGridConfig = {
		            xtype : 'easygrid',
		            noAutoLoad : true,
		            region : 'center',
		            showTbar : true,
		            showBbar : true,
		            parentPanel :this,
		            noNeddForceFit : false,
		            needCheckboxColumn : true,
		            subWindowTitle : '人员信息详情',
		            baseParams : {queryId : 'SysInfoMapper.queryUserInfo'},
		            fields : privilegeElementsConfigs.getQueryStaffFields()
		        };
		this.easyGrid = new Ext.ux.EasyGrid(viewGridConfig);
		//定义权限树
		var funtionNodes = [];
		Ext.each(c_modules,function(item){
			var childs = [];
			Ext.each(item.children,function(fun){
				childs.push({iconCls: 'fun', leaf: true, checked : false,text: fun.name, funCode : fun.type});
			});
			var cfg = {children:childs,iconCls: 'option', checked : false};
			
			funtionNodes.push(Ext.applyIf(cfg,{text: item.name, funCode : item.type}));
		});
		var toggle = false;
		var tree = Ext.create('Ext.tree.Panel', {
					region : 'east',
					width : 200,
					store : Ext.create('Ext.data.TreeStore', {
							root : {
								expanded : true,
								children : funtionNodes
							}
						}),
					rootVisible : false,
					listeners: {
			            'checkchange': function(node, checked){//debugger;
			                //如果不是叶结点，则把子结点也相应去掉或加上
			                if(node.isLeaf()){
			                	if(checked){
				                	this.parentcheckchange = false;
				                	node.parentNode.set('checked',true);
			                	}else{
			                		var isAllUncheck = true;
			                		node.parentNode.eachChild(function(subNode){
					                	if(subNode.get('checked')){
					                		isAllUncheck = false;
					                		return;
					                	}
					                });
					                if(isAllUncheck){
					                	this.parentcheckchange = false;
			                			node.parentNode.set('checked',false);
					                }
			                	}
			                }else if(this.parentcheckchange){
			                	node.eachChild(function(subNode){
				                	subNode.set('checked',checked);;
				                });
			                }
			                this.parentcheckchange = true;
			                tree.getStore().sort('checked','DESC');
			            }
			        },
					dockedItems: [{
						xtype: 'toolbar',
			            dock: 'bottom',
			            ui: 'footer',
			            items : [{
								text: '收起/展开全部',
					            iconCls : 'accept',
					            handler: function(){
					            	if(toggle)
					            		tree.expandAll();
					            	else
					            		tree.collapseAll();
					            	toggle = !toggle;
					            }
							}, {
								text : '保存更改',
								iconCls : 'save',
								handler : Ext.bind(this.save,this)
							}]
					}]
				});
		this.tree = tree;
		this.add([this.queryForm,this.easyGrid,this.tree]);
    },
    doQuery : function(){
    	this.tree.expandAll();
    	EasyUtil.doEasyQuery(this.easyGrid,this.queryForm);
    },
    save : function(){
    	var rs = this.easyGrid.getSelectionModel().getSelection();
		if(rs.length == 0){
			Ext.Msg.alert('操作提示', '请选择人员!');
			return;
		}
		var staffIds = '';
		Ext.each(rs,function(r){
			if(staffIds.length > 0){
                staffIds += ',';
            }
			staffIds += r.get('id');
		});
		//获取所选权限
		var privilege = '', selNodes = this.tree.getChecked();
        Ext.each(selNodes, function(node){
            if(privilege.length > 0){
                privilege += ',';
            }
            privilege += node.raw.funCode;
        });
        var url = 'sysinfo/savePrivilege.do';
    	EasyUtil.easyAjax(url,{userIds:staffIds,privileges:privilege},function(response, opts) {
            var obj = Ext.decode(response.responseText);
            this.doQuery();
            var records = this.tree.getView().getRecords(this.tree.getView().getNodes());
            Ext.each(records,function(node){
            	node.set('checked',false);
            },this);
            EasyUtil.alertMsg(obj.success);
        },this);
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
    	EasyUtil.submitForm(form,'extjsoncontrollersuport/save.do',this,{entity : 'base.UserInfo',isDoQuery:true});
    },
    updateRecord : function(store, r, values,form){
    	EasyUtil.submitForm(form,'extjsoncontrollersuport/update.do',this,{entity : 'base.UserInfo',isDoQuery:true});
    },
    afterWinShow : function(form){
    	form.findField('loginName').setDisabled(!form.baseParams.create);
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