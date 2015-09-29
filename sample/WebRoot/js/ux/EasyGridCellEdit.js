/**
 * @class Ext.ux.EasyGridCellEdit
 * @extends Ext.grid.GridPanel
 */

Ext.define('Ext.ux.EasyGridCellEdit', {
			extend : 'Ext.grid.Panel',
			alias : ['widget.easygridcelledit'],
            requires : ['Ext.ux.ProgressBarPager','Ext.grid.RowNumberer','Ext.selection.CheckboxModel'],
		    selType: 'cellmodel',
		    plugins: [
		        Ext.create('Ext.grid.plugin.CellEditing', {
		            clicksToEdit: 1
		        })
		    ],
		            
			initComponent : function() {
				this.pageSize = 15;
				if (!this.noNeddForceFit) {
					this.forceFit = true;
				}
				this.loadMask = true;
				//this.columnLines = true;
				this.createStore();
				this.createColumns();
				this.createTbar();
				this.createBbar();

				if(this.needCheckboxColumn){
					this.selModel = Ext.create('Ext.selection.CheckboxModel',{injectCheckbox : 'last'})
				}
				
				this.callParent();
			},
		    
			initEvents : function() {
				this.callParent();
				if(!this.noNeedDbClick)
					this.on('itemdblclick', Ext.bind(this.dbClickFun, this));
                if(this.disabledBtn)        
                    this.setDisabledBtn(true);
			},
			getReaderFields : function() {
				var readerFields = [];
				this.fields.each(function(item) {
							readerFields.push({
										name : item.name
									});
							return true;
						});
				return readerFields;
			},

			createStore : function() {
				var cfg = {
					fields : this.getReaderFields(),
					autoLoad : true
				};
                if(this.noAutoLoad)
                    cfg['autoLoad'] = false;
				if (this.data) {
					cfg['data'] = this.data;
				} else {
                    cfg['pageSize'] = this.pageSize;
					cfg['proxy'] = {
                        actionMethods: {create: 'POST',destroy: 'POST',read: 'POST',update: 'POST'},
						type : 'ajax',
                        extraParams : this.baseParams,
						url : this.url || 'paginateAction.action',
						reader : {
							type : 'json',
							root : 'result'
						}
					};
				}
				this.store = Ext.create('Ext.data.Store', cfg);
			},

			createColumns : function() {
				var cols = [new Ext.grid.RowNumberer()];
				var items = this.fields.items;
				for (var i = 0; i < items.length; i++) {
					var f = items[i];

					var tempConfig = {
						header : f.fieldLabel,
						//flex: 1,
						dataIndex : f.name,
						align : 'center'
					};
					if (f.xtype == 'datefield') {
						Ext.apply(tempConfig, {
									xtype : 'datecolumn',
									format : f.format
								})
					}
					if (f.renderer) {
						tempConfig['renderer'] = f.renderer;
					}
					if(f.editor){
						tempConfig['field'] = f.editor;
					}
					if(f.flex)
						tempConfig['flex'] = f.flex;
					if (f.hiddenColumn || f.xtype == 'hidden')
						tempConfig['hidden'] = true;
					if (f.columnWidth)
						tempConfig['width'] = f.columnWidth;
					cols.push(tempConfig);
				}
				this.columns = cols;
			},

			createTbar : function() {
				if (this.showTbar) {
                    this.tbar = Ext.create('Ext.toolbar.Toolbar');
                    if (!this.noShowAddBtn) {
                        var addBtn = new Ext.button.Button({
                                text : '新增',
                                iconCls : 'add',
                                handler : Ext.bind(this.createRecord, this)
                            });
                        this.addBtn = addBtn;
                        this.tbar.add(addBtn);
                    }
                    if (this.showUpateBtn) {
                        var updateBtn = new Ext.button.Button({
                                text : '修改',
                                iconCls : 'edit',
                                handler : Ext.bind(this.viewRecord, this)
                            });
                        this.updateBtn = updateBtn;
                        this.tbar.add(updateBtn);
                    }
                    if (this.showRemoveBtn) {
		                var removeBtn = new Ext.button.Button({
		                            text : '删除',
                                    tooltip : '注意:确认删除后将不中恢复',
		                            iconCls : 'remove',
		                            handler : Ext.bind(this.removeRecord, this)
		                        });
		                this.removeBtn = removeBtn;
		                this.tbar.add(removeBtn);
		            }
                    if (this.showSaveBtn) {
                        var saveBtn = new Ext.button.Button({
                                    text : '保存',
                                    iconCls : 'save',
                                    handler : Ext.bind(this.save, this)
                                });
                        this.saveBtn = saveBtn;
                        this.tbar.add(saveBtn);
                    }
					if (this.showReportBtn) {
						var reportBtn = new Ext.button.Button({
									text : '导出Excel',
									iconCls : 'report',
									handler : Ext.bind(this.reportToExcel, this)
								});
						this.reportBtn = reportBtn;
						this.tbar.add(reportBtn);
					}
					if(this.otherBtn){
						for(var i=0;i<this.otherBtn.length;i++)
						{
							var newOtherBtn = new Ext.button.Button({
								text : this.otherBtn[i].btnValue,
								iconCls : 'x-group-by-icon',
								handler : Ext.bind(this.viewOtherRecord,this,[this.otherBtn[i].disPanel,this.otherBtn[i].subWinTitle])
							});
							this.tbar.add(newOtherBtn);
						}
					}
				}
			},
			
			createBbar : function() {
				if (this.showBbar) {
					this.bbar = Ext.create('Ext.PagingToolbar',{
								store : this.store,
								pageSize : this.pageSize,
					            displayInfo: true,
					            plugins: Ext.create('Ext.ux.ProgressBarPager', {})
							});
				}
			},
			createRecord : function() {
                this.showWindow();
                if (Ext.isFunction(this.viewPanel.createRecord))
                    this.viewPanel.createRecord();
			},
            removeRecord : function() {
		        var r = this.getSelectedRecord();
		        if (r != false) {
		            Ext.Msg.confirm('提示', '确定删除吗?', function(btn) {
		                        if (btn == 'yes') {//只有保存后的数据才去调用
		                            if (this.overrideRemove && !Ext.isEmpty(r.get(this.recordId || 'ID'))) {
		                                if (this.parentPanel
		                                        .removeRecord(this.store, r,this.gridName)) {// 如果能正确删除
		                                    this.getStore().remove(r);
		                                } else {
		                                    Ext.Msg.alert('提示', '服务不可用,无法删除!');
		                                }
		                                // this.store.reload();
		                            } else {
		                                this.getStore().remove(r);
		                            }
		                        }
		                    }, this);
		
		        }
		    },
		    dbClickFun : function(){
				if(this.parentPanel && Ext.isFunction(this.parentPanel.dbClickFun))
					this.parentPanel.dbClickFun(this.getSelectedRecord());
				else
					this.viewRecord();
			},
			viewRecord : function() {
				var r = this.getSelectedRecord();

				if (r != false) {
					// 如果重写了查看方法，则调用
					if (this.overrideView) {
						this.parentPanel.viewRecord(r);
					} else {
						this.showWindow();
						if (Ext.isFunction(this.viewPanel.setIsView))
							this.viewPanel.setIsView(true);
						var key = 'id';
						if (Ext.isFunction(this.viewPanel.getRecordKey))
							key = this.viewPanel.getRecordKey();
						if (Ext.isFunction(this.viewPanel.initialize))
							this.viewPanel.initialize();// 如果有定义初始化函数，则调用
						this.viewPanel.loadFormRecord(r.get(key), r);
					}
				}
			},
			/**
			 * 显示指定的内容面板
			 */
			viewOtherRecord : function(disPanel,subWinTitle) {
				var r = this.getSelectedRecord();
				if (r != false) {
					// 如果重写了查看方法，则调用
					if (this.overrideView) {
						this.parentPanel.viewRecord(r);
					} else {
						this.showOtherWindow(disPanel,subWinTitle);
						if (Ext.isFunction(this.viewPanel.setIsView))
							this.viewPanel.setIsView(true);
						var key = 'id';
						if (Ext.isFunction(this.viewPanel.getRecordKey))
							key = this.viewPanel.getRecordKey();
						if (Ext.isFunction(this.viewPanel.initialize))
							this.viewPanel.initialize();// 如果有定义初始化函数，则调用
						this.viewPanel.loadFormRecord(r.get(key), r);
					}
				}
			},
			getSelectedRecord : function() {
				var sm = this.getSelectionModel();
				if (!sm.hasSelection()) {
		            Ext.Msg.alert('提示', '请选择一行数据');
		            return false;
		        } else {
		            return sm.getLastSelected();
		        }
			},
			reportToExcel : function() {
				this.parentPanel.reportToExcel(this);
			},
			viewPanel : null,

			createViewPanel : function() {
				var viewPanleClass = eval(this.viewPanelClass);
				this.viewPanel = new viewPanleClass({
							desktop : this.desktop,
							parentPanel : this.parentPanel
						});
			},
			createOtherViewPanel : function(disPanel) {
				var viewPanleClass = eval(disPanel);
				this.viewPanel = new viewPanleClass({
							desktop : this.desktop,
							parentPanel : this.parentPanel
						});
			},
            save : function(){
                this.parentPanel.saveRecords(this.store,this.gridName);
            },
			showWindow : function() {
				this.getWindow().show();
                
			},
			showOtherWindow : function(disPanel,subWinTitle) {
				this.getOtherWindow(disPanel,subWinTitle).show();
			},
			getSelecteds : function(name){
				if(!this.selModel)
					return;
				var sel = [];
				Ext.each(this.selModel.getSelection(),function(re){
					sel.push(re.get(name));
				},this);
				return sel.join(',');
			},
			getWindow : function() {
				var win = this.desktop
						? this.desktop.getWindow(this.winId)
						: null;
				if (!win) {
					this.gridWindow = this.createWindow();
				}
				return this.gridWindow;
			},
			getOtherWindow : function(disPanel,subWinTitle) {
				var win = this.desktop
						? this.desktop.getWindow(this.winId)
						: null;
				if (!win) {
					this.gridWindow = this.createOtherWindow(disPanel,subWinTitle);
				}
				return this.gridWindow;
			},
			setDisabledBtn : function(disabled) {
                if(this.updateBtn)
				    this.updateBtn.setDisabled(disabled);
                if(this.addBtn)
				    this.addBtn.setDisabled(disabled);
                if(this.removeBtn)
                    this.removeBtn.setDisabled(disabled);
                if(this.saveBtn)
                    this.saveBtn.setDisabled(disabled);
			},
			createWindow : function() {
				this.createViewPanel();
				var winConfig = {
					title : this.subWindowTitle,
					// closeAction: 'hide',
					modal : true,
					iconCls : this.iconCls || 'order-icon',
					width : this.subWindowWidth,
					layout : 'fit',
					height : this.subWindowHeight,
					items : [this.viewPanel]
				};
				var win = this.desktop
						? this.desktop.createWindow(winConfig)
						: new Ext.window.Window(winConfig);
				this.winId = win.getId();
				if (Ext.isFunction(this.viewPanel.setParentWin)) {
					this.viewPanel.setParentWin(win);
				}
				return win;
			},
			createOtherWindow : function(disPanel,subWinTitle) {
				this.createOtherViewPanel(disPanel);
				var winConfig = {
					title : subWinTitle,
					// closeAction: 'hide',
					modal : true,
					iconCls : this.iconCls || 'order-icon',
					width : this.subWindowWidth,
					layout : 'fit',
					height : this.subWindowHeight,
					items : [this.viewPanel]
				};
				var win = this.desktop
						? this.desktop.createWindow(winConfig)
						: new Ext.window.Window(winConfig);
				this.winId = win.getId();
				if (Ext.isFunction(this.viewPanel.setParentWin)) {
					this.viewPanel.setParentWin(win);
				}
				return win;
			}
		});
