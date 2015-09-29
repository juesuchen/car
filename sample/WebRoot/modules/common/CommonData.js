Ext.define('Ext.easy.CommonData', {
			singleton : true,
			alternateClassName : 'CDM',
            pageSize : [[15,15],[30,30],[50,50],[100,100],[300,300],[500,500],[1000,1000]],
            currency : [['RMB', '人民币-RMB'], ['HKD', '港币-HKD'], ['NTD', '台币-NTD'],['USD', '美元-USD']]
		});
/*加载基础数据失败调用*/
function loadBaseDataFailureFun(){
	Ext.Msg.alert('操作提示', "服务不可用,读取基础数据失败!");
};

