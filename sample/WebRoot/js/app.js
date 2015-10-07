var myDesktopApp;
var tabHeight  = 508;
var delayTime = 558;
var windowHight;
var windowWidth;//较大窗口宽度
var midwindowWidth;//中大窗口宽度
var miderwindowWidth;//中大窗口宽度
var minwindowWidth;//中大窗口宽度

var modelDatas = [];//系统用到的模块
var c_baseDataMix;//系统基础数据缓存
var c_privileges={};//用户的权限
var c_pathConfig = {'Ext.ux.desktop' : 'js/core','Ext.ux' : 'js/ux',MyDesktop : 'modules/desktop','Ext.easy' : 'modules/common'};
var c_appRequires = ['Ext.ux.desktop.ShortcutModel','Ext.ux.Util','MyDesktop.Settings','Ext.easy.CommonData','Ext.easy.BaseModule'];

//module can config the attributes ：name,className,winWidth,winHeight
var c_modules = [
                	{ name: '用户管理', className:'Ext.user.Main'},
                	{ name: '角色管理', className:'Ext.role.Main'}
               	];


(function(){
	Ext.each(c_modules,function(module){
		var type = module.className.split('.')[1].toLowerCase();
		module.type = type;
		c_appRequires.push(module.className);
		c_pathConfig[module.className.substring(0,module.className.lastIndexOf('.'))] = 'modules/' + type;
	});
})();

Ext.Loader.setConfig({enabled:true});
Ext.Loader.setPath(c_pathConfig);
Ext.require(['MyDesktop.App']);

Ext.onReady(function() {
    
    windowWidth = Ext.getBody().getWidth() - 100;//较大窗口宽度
    midwindowWidth = Ext.getBody().getWidth()*2/3;//中大窗口宽度
    miderwindowWidth = Ext.getBody().getWidth()*4/5;//中大窗口宽度
    minwindowWidth = Ext.getBody().getWidth()*3/5;//中大窗口宽度
   
    modelDatas = [];
    
	Ext.Ajax.request({
		url : 'user/defaultright',
		async : false,
		success : function(response, opts) {
	    	c_privileges = Ext.decode(response.responseText);
	    	Ext.each(c_modules,function(module){
	    		if(c_privileges[module.type]){
	    			modelDatas.push(module);
	    		}
	    	});
		}
	});
	
    myDesktopApp = new MyDesktop.App();
    /*加各个模块的配置项*/
    new Ext.util.DelayedTask(function(){
			initElementsConfigs();
            c_baseDataMix = new Ext.util.MixedCollection();
            //对全局的ajax请求设定
		    Ext.Ajax.on('requestcomplete',function(conn, response, options){
			   	var obj = Ext.decode(response.responseText);
			   	if(obj.forwardToLogin){
			   		Ext.Msg.alert('提示信息','登陆已过期，请重新登陆!');
			   		new Ext.util.DelayedTask(function(){
						window.location = 'login';
					}).delay(2000);
		   		}
		   });
     },this).delay(1000);
});

var roleConfigs,userConfigs;
/*初始化各个模块的配置*/
function initElementsConfigs(){
	roleConfigs = new Ext.role.Configs();
	userConfigs = new Ext.user.Configs();
	//privilegeElementsConfigs.init();
}