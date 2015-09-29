/*!
 * Ext JS Library 4.0
 * Copyright(c) 2006-2011 Sencha Inc.
 * licensing@sencha.com
 * http://www.sencha.com/license
 */

Ext.define('Ext.easy.BaseModule', {
    extend: 'Ext.ux.desktop.Module',
    init : function(){
        this.launcher = {
            text: this.name,
            iconCls:this.type,
            handler : this.createWindow,
            scope: this
        }
    },

    createWindow : function(){
        var desktop = this.app.getDesktop();
        var win = desktop.getWindow(this.type);
        if(!win){
        	var width = this.winWidth || midwindowWidth, height = this.winHeight || windowHight;
        	var mainPanel = eval(this.className);
        	var panel = new mainPanel({parentWinWidth : width,desktop : desktop});
            win = desktop.createWindow({
                id: this.type,
                title:this.launcher.text,
                width:eval(width),
                height:eval(height),
                iconCls: this.launcher.iconCls,
                animCollapse:false,
                border: false,
                hideMode: 'offsets',
                layout: 'fit',
                items: panel
            });
            panel.parentWin = win;
            win.on('beforeclose',function(win,eOpts){win.minimize();});
        }
        win.show();
        return win;
    }
});
