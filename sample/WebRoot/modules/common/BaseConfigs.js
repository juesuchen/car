/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.easy.BaseConfigs', {
    extend: 'Ext.util.MixedCollection',
    
    constructor : function(config){
    	alert(2)
		this.callParent();
		this.initCommonCfg();
		this.init();
		/*加载基础数据，如果有的话*/
		if(Ext.isFunction(this.loadBaseData)){
			this.loadBaseData();
		}
		alert(this.model)
    },
    /*一些公用的配置项*/
    initCommonCfg : function(){
    	this.addCfg(EasyUtil.getBaseConfig('id','id',{xtype:'hidden'}));
    	this.addCfg(EasyUtil.getBaseConfig('创建人','creator',{readOnly:true}));
    	this.addCfg(EasyUtil.getBaseConfig('创建时间','createTime',{readOnly:true,columnWidth : 150}));
    	this.addCfg(EasyUtil.getBaseConfig('修改人','updator',{disabled:true}));
    	this.addCfg(EasyUtil.getBaseConfig('修改时间','updateTime',{disabled:true,columnWidth : 150}));
    },
    addCfg : function(cfg,key){
    	if (!key) {
    		var names = cfg.name.split('.');
    		key = names[names.length - 1];
    	}
    	this.add(key,cfg);
    },
    /*根据配置名称获取配置项，会根据标签加上必须的验证*/
    getByName : function(name,colspan){
        var cfg = this.getRawByName(name);
        return this.getMarkCfg(cfg);
    },
    /*根据配置名称获取配置项，但不会根据标签加上必须的验证*/
    getRawByName : function(name){
        return Ext.apply({},this.get(name));
    },
    getMarkCfg : function (cfg) {
    	if(cfg.required){
            Ext.apply(cfg,{allowBlank:false,blankText:'此字段不能为空',labelSeparator : '<font color="red">*</font>'});
        }
        if(colspan){
            cfg = Ext.apply(cfg,{colspan:colspan,width : 650,grow : false});
        }
        return cfg;
    },
    /*根据配置名称获取配置项，会根据标签加上必须的验证*/
    getModelByName : function(name,colspan){
        var cfg = this.getRawModelByName(name)
        return this.getMarkCfg(cfg);;
    },
    /*根据配置名称获取配置项，但不会根据标签加上必须的验证*/
    getRawModelByName : function(name){
    	var rawCfg = this.get(name);
        var cfg = Ext.applyIf({name:this.model + '.' + rawCfg.name},rawCfg);
        return cfg;
    }
    
});
