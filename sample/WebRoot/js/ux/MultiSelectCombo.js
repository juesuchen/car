Ext.define('Ext.ux.MultiSelectCombo', {
			extend : 'Ext.form.field.ComboBox',
			alias : ['widget.multicombo'],
			checkField : 'checked',
			separator : ',',
			escape : function(s) {
				if ('string' !== typeof s) {
					return s;
				}
				return s.replace(/([.*+?\^=!:${}()|\[\]\/\\])/g, '\\$1');
			},
			constructor : function(config) {
				config = config || {};
				Ext.applyIf(config, {
							displayField : 'text',
							editable : true,
							valueField : 'value',
							hiddenName : config.hiddenName || config.name,
							triggerAction : 'all',
							mode : 'local',
							hideOnSelect : false,
							emptyText : '请选择',
							store : new Ext.data.ArrayStore({
										fields : ['value', 'text'],
										data : config.data
									})
						});
				config.listeners = config.listeners || {};
				Ext.applyIf(config.listeners, {
							scope : this,
							beforequery : this.onBeforeQuery,
							blur : this.onRealBlur
						});
				Ext.apply(this, config);
				this.callParent();
			},

			initComponent : function() {
				if (!this.tpl) {
					this.tpl = 
							 '<tpl for=".">'
							+'<div class="x-combo-list-item">'
							+'<img src="' + Ext.BLANK_IMAGE_URL + '" '
							+'class="ux-lovcombo-icon ux-lovcombo-icon-'
							+'{[values.' + this.checkField + '?"checked":"unchecked"' + ']}">'
							+'<div class="ux-lovcombo-item-text">{' + (this.displayField || 'text' )+ ':htmlEncode}</div>'
							+'</div>'
							+'</tpl>'
						;
				}

				// call parent
				this.callParent();

			},
			onBeforeQuery : function(qe) {
				qe.query = qe.query.replace(new RegExp(this.escape(this
								.getCheckedDisplay())
								+ '[ ' + this.separator + ']*'), '');
			},
			onRealBlur : function() {
				this.list.hide();
				var rv = this.getRawValue();
				var rva = rv.split(new RegExp(this.escape(this.separator)
						+ ' *'));
				var va = [];
				var snapshot = this.store.snapshot || this.store.data;

				// iterate through raw values and records and check/uncheck
				// items
				Ext.each(rva, function(v) {
							snapshot.each(function(r) {
										if (v === r.get(this.displayField)) {
											va.push(r.get(this.valueField));
										}
									}, this);
						}, this);
				this.setValue(va.join(this.separator));
				this.store.clearFilter();
			},
			onSelect : function(record, index) {
				if (this.fireEvent('beforeselect', this, record, index) !== false) {

					// toggle checked field
					record.set(this.checkField, !record.get(this.checkField));

					// display full list
					if (this.store.isFiltered()) {
						this.doQuery(this.allQuery);
					}

					// set (update) value and fire event
					this.setValue(this.getCheckedValue());
					this.fireEvent('select', this, record, index);
				}
			},
			getCheckedValue : function(field) {
				field = field || this.valueField;
				var c = [];

				// store may be filtered so get all records
				var snapshot = this.store.snapshot || this.store.data;

				snapshot.each(function(r) {
							if (r.get(this.checkField)) {
								c.push(r.get(field));
							}
						}, this);

				return c.join(this.separator);
			},
			getCheckedDisplay : function() {
				var re = new RegExp(this.separator, "g");
				return this.getCheckedValue(this.displayField).replace(re,
						this.separator + ' ');
			},
			setValue : function(v) {
				if (v) {
					v = '' + v;
					if (this.valueField) {
						this.store.clearFilter();
						this.store.each(function(r) {
									var checked = !(!v.match('(^|'
											+ this.separator
											+ ')'
											+ this.escape(r
													.get(this.valueField))
											+ '(' + this.separator + '|$)'));

									r.set(this.checkField, checked);
								}, this);
						this.value = this.getCheckedValue();
						this.setRawValue(this.getCheckedDisplay());
						if (this.hiddenField) {
							this.hiddenField.value = this.value;
						}
					} else {
						this.value = v;
						this.setRawValue(v);
						if (this.hiddenField) {
							this.hiddenField.value = v;
						}
					}
					if (this.el) {
						this.el.removeClass(this.emptyClass);
					}
				} else {
					this.clearValue();
				}
			}
		});