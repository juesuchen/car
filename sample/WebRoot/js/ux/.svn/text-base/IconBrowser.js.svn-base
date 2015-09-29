/**
 * @class Ext.chooser.IconBrowser
 * @extends Ext.view.View
 * @author Ed Spencer
 * 
 * This is a really basic subclass of Ext.view.View. All we're really doing here is providing the template that dataview
 * should use (the tpl property below), and a Store to get the data from. In this case we're loading data from a JSON
 * file over AJAX.
 */
Ext.define('Ext.ux.IconBrowser', {
    extend: 'Ext.view.View',
    alias: 'widget.iconbrowser',
    
    uses: 'Ext.data.Store',
    
	singleSelect: true,
    overItemCls: 'x-view-over',
    itemSelector: 'div.thumb-wrap',
    tpls : [[
        // '<div class="details">',
            '<tpl for=".">',
                '<div class="thumb-wrap">',
                    '<div class="thumb">',
                    (!Ext.isIE6? '<img width="100px" height="100px" src="{imagePath}" />' : 
                    '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'{imagePath}\')"></div>'),
                    '</div>',
                    '<span>{imageType}-{imageOrder}-{imageName}</span>',
                '</div>',
            '</tpl>'
        // '</div>'
    ]],
    
    initComponent: function() {
        var fields = [];
        this.fieldMixs.each(function(item) {
            fields.push({
                        name : item.name
                    });
            return true;
        });
        this.store = Ext.create('Ext.data.Store', {
        	fields : fields,
//            fields: ['name', 'thumb', 'url', 'type'],
//            autoLoad : true,
            proxy: {
                type: 'ajax',
                url : 'icons.json',
                reader: {
                    type: 'json',
                    root: ''
                }
            }
        });
        
        //应用指定的模板
        this.tpl = this.tpls[this.tplIdx || 0];
        
        this.callParent(arguments);
        this.store.sort();
    },
    getStore : function(){
        return this.store;
    }
});