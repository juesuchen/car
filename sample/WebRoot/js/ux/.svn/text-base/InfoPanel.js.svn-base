/**
 * @class Ext.chooser.InfoPanel
 * @extends Ext.panel.Panel
 * @author Ed Spencer
 * 
 * This panel subclass just displays information about an image. We have a
 * simple template set via the tpl property, and a single function (loadRecord)
 * which updates the contents with information about another image.
 */
Ext.define('Ext.ux.InfoPanel', {
	extend : 'Ext.panel.Panel',
	alias : 'widget.infopanel',
	id : 'img-detail-panel',

	width : 150,
	minWidth : 150,
	layout : 'fit',
	requires : ['Ext.form.field.File', 'Ext.form.Panel'],
	tpl_bake : [
			'<div class="details">',
			'<tpl for=".">',
			(!Ext.isIE6
					? '<img src="icons/{thumb}" />'
					: '<div style="width:74px;height:74px;filter:progid:DXImageTransform.Microsoft.AlphaImageLoader(src=\'icons/{thumb}\')"></div>'),
			'<div class="details-info">',
			'<b>Example Name:</b>',
			'<span>{name}</span>',
			'<b>Example URL:</b>',
			'<span><a href="http://dev.sencha.com/deploy/touch/examples/{url}" target="_blank">{url}.html</a></span>',
			'<b>Type:</b>', '<span>{type}</span>', '</div>', '</tpl>', '</div>'],
	initComponent : function() {
		this.callParent();
		// 上传图片类型
		var img_reg = /\.([jJ][pP][gG]){1}$|\.([jJ][pP][eE][gG]){1}$|\.([gG][iI][fF]){1}$|\.([pP][nN][gG]){1}$|\.([bB][mM][pP]){1}$/
        var isImage = false;
		var fileForm = Ext.create('Ext.form.Panel', {
			fileUpload : true,
			id : "fileUploadForm",
			defaults : {
				labelAlign : 'top'
			},
			items : [{
						id : 'upload',
						name : 'upload',
						fieldLabel : '上传图片',
						xtype : 'filefield',
						msgTarget : 'side',
						// allowBlank : false,
						// blankText : '此字段不能为空',
						anchor : '98%',
						buttonText : '',
						buttonConfig : {
							iconCls : 'upload-icon'
						}
					}, {
						xtype : 'box',
						id : 'browseImage',
						autoEl : {
							width : '100%',
							height : 250,
							tag : 'img',
							src : Ext.BLANK_IMAGE_URL
						}

					}],

			// form事件
			listeners : {
				'render' : function(f) {
					this.form.findField('upload').on('render', function() {
						// 通過change事件,图片也动态跟踪选择的图片变化
						Ext.get('upload').on('change',
								function(field, newValue) {
                                    var fileName = newValue.value;
									if (img_reg.test(fileName)) {
                                        isImage = true;
										Ext.get('browseImage').dom.src = newValue.files[0]
												.getAsDataURL();
									}else
                                        isImage = false;
								}, this);
					}, this);
				}
			},
			buttons : [{
						text : "提交",
						handler: function(){
                            if(!isImage){
                                Ext.Msg.alert('操作提示', '请选择图片上传!');
                                return;
                            }
                            var form = this.up('form').getForm();
                            if(form.isValid()){
                                form.submit({
			                        url : "uploadAction.action",
                                    method : 'post',
			                        waitMsg: '上传图片中...',
			                        success: function(fp, o) {
			                            Ext.Msg.alert('成功', '上传成功!');
			                        },
                                    failure : function(form, action) {
                                        Ext.Msg.alert('失败', '上传失败，文件类型不对或文件太大，请重试!');
                                    }
			                    });
                            }
                        }
					}]
		});

		this.add(fileForm);
	},
	/**
	 * Loads a given image record into the panel. Animates the newly-updated
	 * panel in from the left over 250ms.
	 */
	loadRecord : function(image) {
		return;
		this.body.hide();
		this.tpl.overwrite(this.body, image.data);
		this.body.slideIn('l', {
					duration : 250
				});
	}
});