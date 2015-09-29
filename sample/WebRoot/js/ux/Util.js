/**
 * 项目模块中的一些常用或可以单独抽离出来的方法
 */
Ext.define('Ext.ux.Util', {
	singleton : true,
	alternateClassName : 'EasyUtil',
	requires : ['Ext.ux.EasyCombo','Ext.ux.MultiSelectCombo','Ext.ux.EasyGrid'],
	/**
	 * 获取一个查询表单面板
	 * 
	 * @param {} doQuery
	 * @param {} items
	 * @param {} columnSize
	 */
	getEasyQueryForm : function(doQuery, items, columnSize) {
		if (!Ext.isArray(items) || items.length == 0)
			return;
		columnSize = columnSize || 2;
		var queryFormPanel = Ext.create('Ext.form.Panel', {
					border : false,
					region : 'north',
					autoScroll :true,
					bodyStyle : 'padding: 3px',
					defaultType : 'textfield',
					style : 'background-color: white;width:100%;',
					layout : {
						type : 'table',
						columns : columnSize
					},
					defaults : {
						labelAlign : 'right',
						labelWidth : 80
					},
					items : items,
					fbar : [{
								xtype : 'button',
								text : '重置',
								handler : function() {
									queryFormPanel.getForm().reset();
								},
								iconCls : 'edit'
							}, {
								xtype : 'button',
								text : '查询',
								iconCls : 'query',
								handler : doQuery
							}]
				});
		return queryFormPanel;
	},
	doEasyQuery : function(grid,formPanel,params){
		var queryStore = grid.getStore();
		queryStore.proxy.extraParams = {queryId : queryStore.proxy.extraParams.queryId};
		if(formPanel)
	        Ext.apply(queryStore.proxy.extraParams,formPanel.getForm().getValues());
		else if(params)
			Ext.apply(queryStore.proxy.extraParams,params);
        queryStore.loadPage(1);
	},
	/**
	 * 获取基本配置项
	 * @param {} fieldLabel
	 * @param {} name
	 * @param {} otherCfg
	 * @return {}
	 */
	getBaseConfig : function(fieldLabel,name,otherCfg){
		var cfg = {fieldLabel:fieldLabel,name:name};
		return Ext.apply(cfg,otherCfg || {});
	},
	getEasyForm : function(obj) {
		var cfg = {
			region : obj.region || 'center',
			bodyPadding : '10 20',
			defaultType : 'textfield',
			autoScroll : true,
			layout : {
				type : 'table',
				columns : obj.columnSize
			},
			defaults : {
				//labelWidth : 90,
				width : obj.width || 280,
				style : {
					margin : '2px 5px'
				}
			},
			items : obj.items
		};
		if (obj.fbar)
			cfg['fbar'] = obj.fbar;
		if (obj.height)
			cfg['height'] = obj.height;
		if (obj.readOnly)
			cfg.defaults.readOnly = true;
		if (obj.labelAlign)
			cfg.defaults.labelAlign = obj.labelAlign;
		var baseInfoForm = Ext.create('Ext.form.Panel', cfg);
		return baseInfoForm;
	},
	getEasyFieldSetForm : function(obj) {
		var cfg = {
			region : 'center',
        	bodyPadding : '10 10',
			defaultType : 'textfield',
			autoScroll : true,
        	items : obj.items
        }
		if (obj.fbar)
			cfg['fbar'] = obj.fbar;
		var baseInfoForm = Ext.create('Ext.form.Panel', cfg);
		return baseInfoForm;
	},
	getCloseWinBtnCfg : function(panel){
		return {
			text: '关闭',iconCls : 'back',handler: function(){
				panel.parentGrid.closeWindow();
			}
		};
	},
	submitForm : function(form,url,scope,params) {
    	if(EasyUtil.isFormValid(form)){
    		form.submit({
	            url : url,
	            params : params,
	            waitMsg : '数据提交中...',
	            waitTitle : '请稍候',
	            success: function(form, action) {
	                EasyUtil.alertMsg(true);
	                if(params.isDoQuery){
	                	if(Ext.isFunction(this.doQuery))
	                		this.doQuery();
	                	else
	                		this.parentPanel.doQuery();
	                }
	                if(params.isCloseWin){
	                	this.parentGrid.closeWindow();
	                }
	            },
	            failure: function(form, action) {
	                EasyUtil.alertMsg(false);
	            },
	            scope : scope
	        });
    	}
	},
	/**
	 * 获取一个日期的配置项，如：Easy.getEasyDateCfg('日期标签','date')
	 * 
	 * @param {}
	 *            fieldLabel
	 * @param {}
	 *            name
	 * @param {}
	 *            value
	 * @param {}
	 *            format
	 * @return {}
	 */
	getEasyDateCfg : function(fieldLabel, name, value, format) {
		var cfg = {
			xtype : 'datefield',
			fieldLabel : fieldLabel,
			editable : false,
			width : 218,
			name : name,
			format : format || 'Y-m-d'
		};
		if (value)
			cfg['value'] = value;
		return cfg;
	},
	getEasyFieldSetCfg : function(title, items,columnSize,collapsed,fieldsetId) {
		var cfg = {
			xtype:'fieldset',
			title: title,
			collapsible: true,
			collapsed: collapsed, // fieldset initially collapsed
			defaultType: 'textfield',
			autoScroll : true,
			layout : {
				type : 'table',
				columns : columnSize || 2
			},
			items : items || []
		};
		if(fieldsetId)
			cfg['id'] = fieldsetId;
		return cfg;
	},
	getTextAreaCfg : function(fieldLabel, name, width,value) {
		var cfg = {
			xtype : 'textareafield',
			fieldLabel : fieldLabel,
			name : name,
			colspan : 2,
			width : width || 600

		};
		if (value)
			cfg['value'] = value;
		return cfg;
	},
	/**
	 * 获取一个下拉框的配置项,Easy.getEasyComboCfg('下拉框','combo')
	 * @param {} fieldLabel 标签
	 * @param {} name　名称
	 * * @param {} data　名称
	 * @param {} obj　其它配置　{value,renderer,important,editable,comboxWidth}
	 * @return {}
	 */
	getEasyComboCfg : function(fieldLabel, name, data,obj) {
		data = data || [[1, '是'], [0, '否']];
		if(data.length > 0 && data[0][1] != '请选择')
			data = [['','请选择']].concat(data);//给下拉框加上'请选择'
		var cfg = {
			xtype : 'easycombo',
			fieldLabel : fieldLabel,
			name : name,
			width : obj.comboxWidth || 218,
			data : data,
			forceSelection : true,
			required : obj.required,
			editable : obj.editable,
			value : obj.value
		};
		if (obj.renderer) {
			cfg['renderer'] = function(value) {
				return EasyUtil.getComboDesc(data, value)
			};
		}
		if (obj.important)
			cfg['labelStyle'] = 'color:red';
		return cfg;
	},
	getFieldcontainer : function(fieldLabel, items, columnSize, notNeedText) {
		if (!notNeedText) {
			Ext.apply(items[0], {
				//displayField : 'value',
				listeners : {
					'change' : function(field, value) {
						var next = field.nextSibling('textfield');
						if(Ext.isEmpty(value)){
							next.setValue(null);
							return;
						}
						var text = EasyUtil.getComboDesc(field.data, value);
						if(text.indexOf('-') != -1)
							text = text.substring(0,text.indexOf('-'));/*去掉括号部分*/
						next.setValue(text);
					},
					'blur' : function(f){
						f.up('form').doLayout();
					},
					'select' : function(f){
						f.up('form').doLayout();
					}
				}
			});
			Ext.apply(items[1], {
						readOnly : true
					});
		}
		return {
			xtype : 'fieldcontainer',
			fieldLabel : fieldLabel,
			defaultType : 'textfield',
			layout : 'column',
			fieldDefaults : {
				hideLabel : true,
				columnWidth : 1 / columnSize
			},
			items : items
		};
	},
	/**
	 * 得到范围的
	 * @param {} fieldLabel
	 * @param {} type
	 * @param {} data
	 * @return {}
	 */
	getRandFields : function(cfg){
		var cfg1,cfg2;
		if(!cfg.type){//默认为日期
			var dateCfg = {
						xtype:'datefield',
						format : 'Y-m-d',
						width : 100,
						editable : true
					};
			cfg1 = Ext.apply({name : cfg.name1 || 'beginDate',value : cfg.value1},dateCfg);
			cfg2 = Ext.apply({name : cfg.name2 || 'endDate',value : cfg.value2},dateCfg);
		}else if(cfg.type == 'combo'){
			var temp = {
				xtype : 'easycombo',
				width : 100,
				data : cfg.data
			};
			cfg1 = Ext.apply({name : cfg.name1 || 'begin',value : cfg.value1},temp);
			cfg2 = Ext.apply({name : cfg.name2 || 'end',value : cfg.value2},temp);
		}else if(cfg.type == 'number'){
			var temp = {xtype:'numberfield',hideTrigger:true,width : 80};
			cfg1 = Ext.apply({name : cfg.name1 || 'minnum',value : cfg.value1},temp);
			cfg2 = Ext.apply({name : cfg.name2 || 'maxnum',value : cfg.value2},temp);
		}
		var items = [cfg1,{xtype: 'displayfield',value:'-'},cfg2];
		return {
			xtype : 'fieldcontainer',
			fieldLabel : cfg.fieldLabel,
			defaultType : 'textfield',
			layout : {
						type : 'table',
						columns : 3
					},
			items : items
		};
	},
	/**
	 * 日期天数
	 * @param {} count　需要增减的天数
	 * @param {} date 如果不传，默认为当前日期
	 */
	getNewDate : function(count,date){
		date = date || new Date();
		return new Date(date.getFullYear(),date.getMonth(),date.getDate()+count);
	},
	getEasyLabel : function(text, cls) {
		return {
			xtype : 'label',
			cls : cls || 'greenLabelTxtCls',
			text : text
		};
	},
	/**
	 * 验证表单是否通过
	 * 
	 * @param {}
	 *            form
	 * @return {Boolean}
	 */
	isFormValid : function(formPanel) {
		var form = formPanel;
		if(Ext.isFunction(formPanel.getForm))
			form = formPanel.getForm();
		if (!form.isValid()) {
			Ext.Msg.alert('错误提示', '有必输项未填写!');
			return false;
		}
		return true;
	},
	alertMsg : function(suc,extMsg) {
		Ext.Msg.alert('操作提示', (suc ? '操作成功!' : '操作失败!' + (extMsg || '')));
	},
	setFieldValue : function(scope, f, sf) {
		var modifyParams = scope.modifyParams;
		var modifyCount = scope.modifyCount;
		var fieldLabel = f.fieldLabel;
		var value = f.getValue();
		if (f.isXType('radiogroup')) {
			f = f.getChecked()[0];
			value = f.initialConfig.inputValue;
		}
		if (f.isXType('datefield'))
			value = f.rawValue;
		if (modifyCount == 0) {
			modifyParams['name'] = f.getName();
			modifyParams['fieldLabel'] = fieldLabel;
			modifyParams['newValue'] = value;
			if (f.isXType('radiofield')) {
				modifyParams['boxLabel'] = f.boxLabel;
			} else if (f.isXType('easycombo'))
				modifyParams['boxLabel'] = EasyUtil.getComboDesc(f.store, value);
			scope.modifyCount++;
		} else {
			var isExist = false;
			for (var i = 0; i < modifyCount; i++) {// 如果已经存在，就更新值
				if (i == 0) {
					if (modifyParams['name'] == f.getName()) {
						modifyParams['newValue'] = value;
						modifyParams['fieldLabel'] = fieldLabel;
						if (f.isXType('radiofield')) {
							modifyParams['boxLabel'] = f.boxLabel;
						} else if (f.isXType('easycombo'))
							modifyParams['boxLabel'] = EasyUtil.getComboDesc(
									f.store, value);
						isExist = true;
					}
				} else if (modifyParams['name_' + i] == f.getName()) {
					modifyParams['newValue_' + i] = value;
					modifyParams['fieldLabel_' + i] = fieldLabel;
					if (f.isXType('radiofield')) {
						modifyParams['boxLabel_' + i] = f.boxLabel;
					} else if (f.isXType('easycombo'))
						modifyParams['boxLabel_' + i] = EasyUtil.getComboDesc(
								f.store, value);
					isExist = true;
				}
			}
			if (!isExist) {
				modifyParams['name_' + modifyCount] = f.getName();
				modifyParams['fieldLabel_' + modifyCount] = fieldLabel;
				modifyParams['newValue_' + modifyCount] = value;
				if (f.isXType('radiofield')) {
					modifyParams['boxLabel_' + modifyCount] = f.boxLabel;
				} else if (f.isXType('easycombo'))
					modifyParams['boxLabel_' + modifyCount] = EasyUtil
							.getComboDesc(f.store, value);
				scope.modifyCount++;
			}
		}
	},
	initFormEvents : function(formPanel, scope,excludeNames) {
		scope.modifyCount = 0;
		scope.isListenable = false;
		scope.modifyParams = {};
		// 为每一个输入创建监听事件
		var formFields = formPanel.getForm().getFields();
		// 对于一般的输入框和下拉框，用blur事件
		var blurFn = function(f) {
			if (!this.isListenable)
				return;
			var v = f.startValue;
			var nowValue = f.getValue();
			if (v == nowValue)
				return;
			EasyUtil.setFieldValue(this, f);
		};
		var changeFn = function(radioGroup, newValue, oldValue) {
			if (!this.isListenable
					|| newValue[radioGroup.items.items[0].name].length > 1)
				return;
			EasyUtil.setFieldValue(this, radioGroup, newValue);
		}
		var eachFun = function(field) {
			if(excludeNames && excludeNames[field.getName()])
				return true;
			if (field.isXType('radiogroup')) {
				field.on('change', Ext.bind(changeFn, this));
			} else if (!field.isXType('radiofield')) {
				field.on('change', Ext.bind(blurFn, this));
			}
		};
		formFields.each(eachFun, scope);

	},
	suspendOrResumeEvents : function(isSuspend, scope) {
		if (isSuspend) {
			scope.modifyCount = 0;
			scope.modifyParams = {};
			var task = new Ext.util.DelayedTask(function(isSuspend) {
						this.isListenable = isSuspend;
					}, scope, [isSuspend]);
			task.delay(800);
		} else {
			scope.isListenable = isSuspend;
		}
	},
	/**
	 * 设置表单的属性为只读或不只读
	 * @param {} formPanel　表单
	 * @param {} readOnly　是否只读
	 * @param {} excludeFields　排除元素的名称
	 */
	setFormFieldsReaOnly : function(formPanel, readOnly, excludeFields) {
		var exclude = excludeFields || {};
		var formFields = formPanel.getForm().items;
		var eachFun = function(field) {
			if (!exclude[field.getName()]) {
				if (field.isXType('radiogroup')) {
					field.setDisabled(readOnly);
				} else if (field.isXType('compositefield')) {
					field.items.each(eachFun);
				} else
					field.setReadOnly(readOnly);
			}
		};
		formFields.each(eachFun);
	},
	/**
	 * 获取Grid的选择行
	 * 
	 * @param {}
	 *            grid
	 * @param {}
	 *            msg
	 * @return {Boolean}
	 */
	getSelectedRecord : function(grid, msg) {
		var sm = grid.getSelectionModel();
		if (sm.getCount() == 0) {
			Ext.Msg.alert('提示', msg || '请选择一行数据');
			return false;
		} else {
			return sm.getLastSelected();
		}
	},
	/**
	 * 获取列和字段的配置，通常用来构建Grid
	 * @param {} mixCollection
	 * @param {} cols
	 * @param {} fields
	 * @param {} noRowNum
	 * @param {} columnWidth
	 */
	getColumnsConfigAndFields : function(mixCollection, cols, fields, noRowNum,
			columnWidth) {
		if (!noRowNum)
			cols.push(Ext.create('Ext.grid.RowNumberer'));
		mixCollection.each(function(f) {
					if (cols) {
						var tempConfig = {
							header : f.fieldLabel,
							dataIndex : f.name,
							menuDisabled : true,
							align : 'center'
						};
						if (f.hidden || f.xtype == 'hidden')
							tempConfig['hidden'] = true;
						if (f.renderer) {
							Ext.apply(tempConfig, {
										renderer : f.renderer
									});
						}
						if (f.editor) {
							if (f.editor == 'date')
								tempConfig['editor'] = {
                                            xtype: 'datefield',
                                            allowBlank: false,
											editable : false,
                                            format : f.format
										};
							else if (f.editor == 'text')
								tempConfig['editor'] = {
                                    
                                };
                            else if(f.editor == 'combo'){
                                tempConfig['editor'] = Ext.apply({allowBlank: false},EasyUtil.getEasyComboCfg('',f.name,null,f.data,f.renderer,null,f.editable));
                            }else if (f.editor == 'number'){
                                tempConfig['editor'] = {
                                    xtype: 'numberfield',
                                    allowBlank: !f.required,
                                    hideTrigger : true,
                                    minValue : f.minValue,
                                    allowDecimals : f.allowDecimals
                                }
                            }
						}
						if (f.xtype == 'datefield') {
							Ext.apply(tempConfig, {
										xtype : 'datecolumn',
										format : f.format,
										width : columnWidth || 85
									});
						}
						if (f.columnWidth)
							tempConfig['width'] = f.columnWidth;
                        if (columnWidth)
                            tempConfig['width'] = columnWidth;
                        if (f.flex)
                        	tempConfig['flex'] = f.flex;
						cols.push(tempConfig);
					}
					if (fields) {
						fields.push({
									name : f.name
								});
					}
					return true;
				});
	},
	/**
	 * 通过getColumnsConfigAndFields方法获取配置后，创建一个简单的grid
	 * @param {} fields
	 * @param {} cols
	 * @param {} obj {url,region,forceFit,tbar,plugins}
	 * @return {}
	 */
	createMyGrid : function(fields, cols, obj) {
		var myStore = Ext.create('Ext.data.Store', {
					fields : fields,
					//autoLoad : true,
					//data : [{}, {}],
					proxy : {
						type : 'ajax',
						url : obj.url,
						reader : {
							type : 'json',
							root : 'result'
						}
					}
				});
		var cfg = {
				region : obj.region || 'center',
				store : myStore,
				columns : cols
		};
		if(obj.forceFit)
			cfg['forceFit'] = true;
		if(obj.tbar)
			cfg['tbar'] = obj.tbar;
		if(obj.plugins)
			cfg['plugins'] = obj.plugins;
		var myGrid = Ext.create('Ext.grid.Panel', cfg);
		return myGrid;
	},
	getRecordsToParams : function(grid,params,isGetChanged) {
		var recordId = grid.recordId || 'Id';
		var index = 0, idx = 0;
		grid.getStore().each(function(record) {
			// 如果是拿改变的数据
			var id = record.get(recordId);// id为空，则说明是新增的，就加入到改变中
			if (isGetChanged && !(Ext.isEmpty(id) || record.dirty))// 如果是要拿改变的数据，则是新增的或是更改过的,否则忽略
				return true;
			// 直接找到每个record的modified {purchaseprice:0,totalPurchasePrice:0}
			var keys = record.fields.keys;
			var modified = record.modified;
			var isNewRecord = true;
			Ext.each(keys, function(key) {
				var thisField = record.fields.get(key);
				var value = record.get(key);
				if (Ext.isDate(value)) {
					value = Ext.util.Format.date(value,'Y-m-d');
				}
				if (!Ext.isEmpty(id)) {// 说明是更新某些属性,
					var mk = modified[key];// undefined or 更改前的值 "" null
					if (Ext.isDefined(mk)) {// 说明是更新的值
						isNewRecord = false;
                        var f;
                        if(Ext.isFunction(grid.getForm))
						      f = grid.getForm().findField(key);// 得到此对应的Field
						if (idx == 0) {
							params['itemId'] = id;
							params['itemName'] = key;
                            params['itemNewValue'] = value;
                            if(f){
							     params['itemFieldLabel'] = f.fieldLabel;
							     if (f.isXType('easycombo'))
									params['itemBoxLabel'] = EasyUtil.getComboDesc(
	                                f.store, value);
                            }
						} else {
							params['itemId_' + idx] = id;
							params['itemName_' + idx] = key;
                            params['itemNewValue_' + idx] = value;
                            if(f){
                                params['itemFieldLabel_' + idx] = f.fieldLabel;
	                            if (f.isXType('easycombo'))
	                                params['itemBoxLabel_' + idx] = EasyUtil.getComboDesc(
	                                f.store, value);
	                        }
						}
						idx++;
					}
				} else {// 说明是新增的成份
					if (index == 0)
						params[key] = value;
					else
						params[key + '_' + index] = value;
				}
				return true;
			});
			if (isNewRecord)
				index++;
		});
		return [index, idx];
	},
	showOrHideMask : function(obj, beShow) {
		if (beShow) {
			if (!obj.myMask) {
				obj.myMask = new Ext.LoadMask(obj.getId(), {
							msg : "正在提交..."
						});
			}
			obj.myMask.show();
		} else {
			obj.myMask.hide();
		}
	},
	getComboDesc : function(datas, value, importantVal) {
		if (!datas)// 如果没有传入，则使用默认的
			datas = [[0, '否'], [1, '是']];
		var returnTxt = value;
		if(Ext.typeOf(datas) == 'object'){/*如果store对象，则遍历取得文本*/
			datas.each(function(r){
				var rv = r.get('value');
				if ((Ext.typeOf(rv) == Ext.typeOf(value)) && value == rv) {
					returnTxt = r.get('text');
					return false;
				}
				return true;
			});
		}else{
			Ext.each(datas, function(item) {
						//类型相同且值相同
						if ((Ext.typeOf(item[0]) == Ext.typeOf(value)) && value == item[0]) {
							returnTxt = item[1];
							return false;
						}
						return true;
					});
		}
		if (Ext.isDefined(importantVal) && importantVal == value)
			return '<font color="red">' + returnTxt + '</font>';
		return returnTxt == '请选择' ? '' : returnTxt;
	},
    /**
     * Ajax简易调用
     * @param {} url
     * @param {} params
     * @param {} sucFun
     * @param {} scope
     * @param {} sync 是否为同步
     */
    easyAjax : function(url,params,sucFun,scope,sync){
        Ext.Ajax.request({
            url : url,
            params : params,
            success: sucFun,
            async : !sync,
            failure: function(response, opts) {
                  Ext.Msg.alert('操作提示', "服务不可用,操作失败!");
             },
            scope : scope
        });
    },
    /**
     * 根据尺码的不同，去重新配置grid的列模型和store
     * @param {Object} grid
     * @param {Object} sizeGroups
     * @param {Object} preMix
     * @param {Object} tailfMix
     */
    reConfigGridBySizes : function(grid,sizeGroups,preMix,tailfMix){
    		var cols=[],fields=[],allFields;
    		if(preMix){
    			EasyUtil.getColumnsConfigAndFields(preMix,cols,fields,false,70);
    			allFields = preMix;
    		}else
    			allFields = new Ext.util.MixedCollection();
    	
	    	Ext.each(sizeGroups,function(size){
	    		cols.push({header:size.sizeName,dataIndex : size.sizeCode,align : 'center',menuDisabled : true,width : 60});
	    		fields.push({name : size.sizeCode});
	    		allFields.add(size.sizeCode,{fieldLabel:size.sizeName,name : size.sizeCode});
	    	});
	    	if(tailfMix){
	    		EasyUtil.getColumnsConfigAndFields(tailfMix,cols,fields,true,60);
	    		allFields.addAll(tailfMix.items);
	    	}
    		
    		var myStore = Ext.create('Ext.data.Store', {
					fields : fields,
					proxy : {
						type : 'ajax',
						reader : {
							type : 'json',
							root : 'result'
						}
					}
				});
    		
    		grid.reconfigure(myStore,cols);
    		return allFields;
    },
    /**
     * 给指定的下拉框加事件
     * @param {} comboNames 下拉框名字或下拉框对象或下拉框名字数据
     * @param {} formPanel 下拉框所在的Form
     */
    initComboLoadData : function(comboNames,formPanel){
    	if(Ext.typeOf(comboNames) == 'object'){
    		comboNames.on('afterrender',Ext.bind(EasyUtil.onMyTriggerClick,this));
    	}else{
    		if(Ext.typeOf(comboNames) == 'string')
    			comboNames = [comboNames];
	    	Ext.each(comboNames,function(name){
	        	formPanel.getForm().findField(name).on('afterrender',Ext.bind(EasyUtil.onMyTriggerClick,this));
	        },this);	
    	}
    },
    /**
     *远程加载指定的基础数据，定义在基础数据里，根据名称去查找
     * @param {} combo
     */
    onMyTriggerClick : function(combo,mixKey,params){
    	var datas = c_baseDataMix.get(mixKey);
    	if(!Ext.isEmpty(datas)){
    		combo.getStore().loadData(datas);
    		return;
    	}
    	Ext.apply(params,{doQuery : true});
    	params.textField = params.textField || params.valueField;
    	EasyUtil.easyAjax('extjsoncontrollersuport/findOrQuery.do',params,function(response, opts) {
	                var resObj = Ext.decode(response.responseText);
	                var data = [];
	                Ext.each(resObj.obj,function(item){data.push([item[params.valueField],item[params.textField]]);});
	                combo.getStore().loadData(data);
	                c_baseDataMix.add(mixKey,data);
	            },this,true);
    },
    redFontRenderer : function(val){
    	return '<font color="red">'+val+'</font>';
    },
    hideColumnsMix : function(mixedCollection,displayColumn){
		var fields = new Ext.util.MixedCollection();
		mixedCollection.each(function(r){
			var cfg = r;
			if(!displayColumn[r.name])
				cfg = Ext.apply({hiddenColumn : true},r);
			fields.add(cfg)
		});
    	return fields;
    },
    /**
     * 复制某些属性到新的配置中
     * @param {} values
     * @return {}
     */
    copySomePropertis : function(values,copyNames){
    	var params = {},values = values || {};
    	for(var key in values){
    		if(copyNames && copyNames[key])
    			params[key] = values[key];
    	}
    	return params;
    }
});