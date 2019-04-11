/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["jquery.sap.global","./InputBase","./DatePicker","sap/ui/model/type/Date","sap/ui/unified/DateRange","./library","sap/ui/core/Control","sap/ui/Device","sap/ui/core/format/DateFormat","sap/ui/core/LocaleData","./DateTimePickerRenderer","./TimePickerSliders","sap/ui/events/KeyCodes","sap/ui/core/IconPool"],function(e,t,i,s,a,o,r,n,p,l,u,h,d,g){"use strict";var c=o.PlacementType;var _="Phone";var f=i.extend("sap.m.DateTimePicker",{metadata:{library:"sap.m",properties:{minutesStep:{type:"int",group:"Misc",defaultValue:1},secondsStep:{type:"int",group:"Misc",defaultValue:1}},aggregations:{_popup:{type:"sap.m.ResponsivePopover",multiple:false,visibility:"hidden"}},designtime:"sap/m/designtime/DateTimePicker.designtime",dnd:{draggable:false,droppable:true}}});var m=r.extend("sap.m.internal.DateTimePickerPopup",{metadata:{library:"sap.m",aggregations:{_switcher:{type:"sap.ui.core.Control",multiple:false,visibility:"hidden"},calendar:{type:"sap.ui.core.Control",multiple:false},timeSliders:{type:"sap.ui.core.Control",multiple:false}}},renderer:function(e,t){e.write("<div");e.writeControlData(t);e.addClass("sapMDateTimePopupCont");e.addClass("sapMTimePickerDropDown");e.writeClasses();e.write(">");var i=t.getAggregation("_switcher");if(i){e.write("<div");e.addClass("sapMTimePickerSwitch");e.writeClasses();e.write(">");e.renderControl(i);e.write("</div>")}var s=t.getCalendar();if(s){e.renderControl(s)}e.write("<div");e.addClass("sapMTimePickerSep");e.writeClasses();e.write(">");e.write("</div>");var a=t.getTimeSliders();if(a){e.renderControl(a)}e.write("</div>")},init:function(){},onBeforeRendering:function(){var t=this.getAggregation("_switcher");if(!t){var i=sap.ui.getCore().getLibraryResourceBundle("sap.m");var s=i.getText("DATETIMEPICKER_DATE");var a=i.getText("DATETIMEPICKER_TIME");t=new sap.m.SegmentedButton(this.getId()+"-Switch",{selectedKey:"Cal",items:[new sap.m.SegmentedButtonItem(this.getId()+"-Switch-Cal",{key:"Cal",text:s}),new sap.m.SegmentedButtonItem(this.getId()+"-Switch-Sli",{key:"Sli",text:a})]});t.attachSelect(this._handleSelect,this);this.setAggregation("_switcher",t,true)}if(n.system.phone||e("html").hasClass("sapUiMedia-Std-Phone")){t.setVisible(true);t.setSelectedKey("Cal")}else{t.setVisible(false)}},onAfterRendering:function(){if(n.system.phone||e("html").hasClass("sapUiMedia-Std-Phone")){var t=this.getAggregation("_switcher");var i=t.getSelectedKey();this._switchVisibility(i)}},_handleSelect:function(e){this._switchVisibility(e.getParameter("key"))},_switchVisibility:function(e){var t=this.getCalendar();var i=this.getTimeSliders();if(!t||!i){return}if(e=="Cal"){t.$().css("display","");i.$().css("display","none")}else{t.$().css("display","none");i.$().css("display","");i._updateSlidersValues();i._onOrientationChanged();i.openFirstSlider()}},switchToTime:function(){var e=this.getAggregation("_switcher");if(e&&e.getVisible()){e.setSelectedKey("Sli");this._switchVisibility("Sli")}},getSpecialDates:function(){return this._oDateTimePicker.getSpecialDates()}});f.prototype.init=function(){i.prototype.init.apply(this,arguments);this._bOnlyCalendar=false};f.prototype.getIconSrc=function(){return g.getIconURI("date-time")};f.prototype.exit=function(){i.prototype.exit.apply(this,arguments);if(this._oSliders){this._oSliders.destroy();delete this._oSliders}this._oPopupContent=undefined;n.media.detachHandler(this._handleWindowResize,this)};f.prototype.setDisplayFormat=function(e){i.prototype.setDisplayFormat.apply(this,arguments);if(this._oSliders){this._oSliders.setDisplayFormat(v.call(this))}return this};f.prototype.setMinutesStep=function(e){this.setProperty("minutesStep",e,true);if(this._oSliders){this._oSliders.setMinutesStep(e)}return this};f.prototype.setMinDate=function(e){i.prototype.setMinDate.call(this,e);if(e){this._oMinDate.setHours(e.getHours(),e.getMinutes(),e.getSeconds())}return this};f.prototype.setMaxDate=function(e){i.prototype.setMaxDate.call(this,e);if(e){this._oMaxDate.setHours(e.getHours(),e.getMinutes(),e.getSeconds())}return this};f.prototype.setSecondsStep=function(e){this.setProperty("secondsStep",e,true);if(this._oSliders){this._oSliders.setSecondsStep(e)}return this};f.prototype._getFormatInstance=function(t,i){var s=e.extend({},t);var a=-1;if(s.style){a=s.style.indexOf("/")}if(i){var o=e.extend({},s);if(a>0){o.style=o.style.substr(0,a)}this._oDisplayFormatDate=p.getInstance(o)}return p.getDateTimeInstance(s)};f.prototype._checkStyle=function(e){if(i.prototype._checkStyle.apply(this,arguments)){return true}else if(e.indexOf("/")>0){var t=["short","medium","long","full"];var s=false;for(var a=0;a<t.length;a++){var o=t[a];for(var r=0;r<t.length;r++){var n=t[r];if(e==o+"/"+n){s=true;break}}if(s){break}}return s}return false};f.prototype._parseValue=function(e,t){var s=i.prototype._parseValue.apply(this,arguments);if(t&&!s){s=this._oDisplayFormatDate.parse(e);if(s){var a=this.getDateValue();if(!a){a=new Date}s.setHours(a.getHours());s.setMinutes(a.getMinutes());s.setSeconds(a.getSeconds());s.setMilliseconds(a.getMilliseconds())}}return s};f.prototype._getLocaleBasedPattern=function(e){var t=l.getInstance(sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale()),i=e.indexOf("/");if(i>0){return t.getCombinedDateTimePattern(e.substr(0,i),e.substr(i+1))}else{return t.getCombinedDateTimePattern(e,e)}};f.prototype._createPopup=function(){if(!this._oPopup){var t=sap.ui.getCore().getLibraryResourceBundle("sap.m");var i=t.getText("TIMEPICKER_SET");var s=t.getText("TIMEPICKER_CANCEL");this._oPopupContent=new m(this.getId()+"-PC");this._oPopupContent._oDateTimePicker=this;this._oPopup=new sap.m.ResponsivePopover(this.getId()+"-RP",{showCloseButton:false,showHeader:false,placement:c.VerticalPreferedBottom,beginButton:new sap.m.Button(this.getId()+"-OK",{text:i,press:e.proxy(y,this)}),endButton:new sap.m.Button(this.getId()+"-Cancel",{text:s,press:e.proxy(S,this)}),content:this._oPopupContent});this._oPopup.addStyleClass("sapMDateTimePopup");var a=this._oPopup.getAggregation("_popup");if(a.setShowArrow){a.setShowArrow(false)}this._oPopup.attachAfterOpen(C,this);this._oPopup.attachAfterClose(D,this);if(n.system.desktop){this._oPopoverKeydownEventDelegate={onkeydown:function(e){var t=d,i=e.which||e.keyCode,s=e.altKey;if(s&&(i===t.ARROW_UP||i===t.ARROW_DOWN)||i===t.F4){y.call(this,e);this.focus();e.preventDefault()}}};this._oPopup.addEventDelegate(this._oPopoverKeydownEventDelegate,this)}this.setAggregation("_popup",this._oPopup,true)}};f.prototype._openPopup=function(){if(!this._oPopup){return}this.addStyleClass(t.ICON_PRESSED_CSS_CLASS);this._storeInputSelection(this._$input.get(0));var e=this._oPopup.getAggregation("_popup");e.oPopup.setAutoCloseAreas([this.getDomRef()]);this._oPopup.openBy(this);var i=this._oPopup.getContent()[0]&&this._oPopup.getContent()[0].getTimeSliders();if(i){setTimeout(i._updateSlidersValues.bind(i),0)}};f.prototype._createPopupContent=function(){var e=!this._oCalendar;i.prototype._createPopupContent.apply(this,arguments);if(e){this._oPopupContent.setCalendar(this._oCalendar);this._oCalendar.attachSelect(P,this);var t=this,s=this._oCalendar._hideMonthPicker,o=this._oCalendar._hideYearPicker;this._oCalendar._hideMonthPicker=function(e){s.apply(this,arguments);if(!e){t._selectFocusedDateValue((new a).setStartDate(this._getFocusedDate().toLocalJSDate()))}};this._oCalendar._hideYearPicker=function(e){o.apply(this,arguments);if(!e){t._selectFocusedDateValue((new a).setStartDate(this._getFocusedDate().toLocalJSDate()))}}}if(!this._oSliders){this._oSliders=new h(this.getId()+"-Sliders",{minutesStep:this.getMinutesStep(),secondsStep:this.getSecondsStep(),displayFormat:v.call(this),localeId:this.getLocaleId()})._setShouldOpenSliderAfterRendering(true);this._oPopupContent.setTimeSliders(this._oSliders)}};f.prototype._selectFocusedDateValue=function(e){var t=this._oCalendar;t.removeAllSelectedDates();t.addSelectedDate(e);return this};f.prototype._fillDateRange=function(){var e=this.getDateValue();if(e){e=new Date(e.getTime())}else{e=this._getInitialFocusedDateValue();var t=this._oMaxDate.getTime();if(e.getTime()<this._oMinDate.getTime()||e.getTime()>t){e=this._oMinDate}}this._oCalendar.focusDate(e);if(!this._oDateRange.getStartDate()||this._oDateRange.getStartDate().getTime()!=e.getTime()){this._oDateRange.setStartDate(e)}this._oSliders._setTimeValues(e)};f.prototype._getSelectedDate=function(){var e=i.prototype._getSelectedDate.apply(this,arguments);if(e){var t=this._oSliders.getTimeValues();var s=this._oSliders._getDisplayFormatPattern();if(s.search("h")>=0||s.search("H")>=0){e.setHours(t.getHours())}if(s.search("m")>=0){e.setMinutes(t.getMinutes())}if(s.search("s")>=0){e.setSeconds(t.getSeconds())}if(e.getTime()<this._oMinDate.getTime()){e=new Date(this._oMinDate.getTime())}else if(e.getTime()>this._oMaxDate.getTime()){e=new Date(this._oMaxDate.getTime())}}return e};f.prototype._getInitialFocusedDateValue=function(){return this.getInitialFocusedDateValue()||new Date};f.prototype.getLocaleId=function(){return sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()};f.prototype.getAccessibilityInfo=function(){var e=i.prototype.getAccessibilityInfo.apply(this,arguments);e.type=sap.ui.getCore().getLibraryResourceBundle("sap.m").getText("ACC_CTR_TYPE_DATETIMEINPUT");return e};function y(e){this._selectDate()}function S(e){this.onsaphide(e);this._oCalendar.removeAllSelectedDates();this._oCalendar.addSelectedDate((new a).setStartDate(this._getInitialFocusedDateValue()))}f.prototype._handleWindowResize=function(e){var t=this.getAggregation("_popup").getContent()[0].getAggregation("_switcher"),i=this.getAggregation("_popup").getContent()[0].getCalendar(),s=this.getAggregation("_popup").getContent()[0].getTimeSliders();if(e.name===_){t.setVisible(true);this.getAggregation("_popup").getContent()[0]._switchVisibility(t.getSelectedKey())}else{t.setVisible(false);s.$().css("display","");i.$().css("display","")}};function C(e){this.$("inner").attr("aria-expanded",true);this._oCalendar.focus();this._oSliders._onOrientationChanged();n.media.attachHandler(this._handleWindowResize,this)}function D(){this.removeStyleClass(t.ICON_PRESSED_CSS_CLASS);this.$("inner").attr("aria-expanded",false);this._restoreInputSelection(this._$input.get(0));n.media.detachHandler(this._handleWindowResize,this)}function v(){var e=this.getDisplayFormat();var t;var i=this.getBinding("value");if(i&&i.oType&&i.oType instanceof s){e=i.oType.getOutputPattern()}else if(i&&i.oType&&i.oType.oFormat){e=i.oType.oFormat.oFormatOptions.pattern}else{e=this.getDisplayFormat()}if(!e){e="medium"}var a=e.indexOf("/");if(a>0&&this._checkStyle(e)){e=e.substr(a+1)}if(e=="short"||e=="medium"||e=="long"||e=="full"){var o=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale();var r=l.getInstance(o);t=r.getTimePattern(e)}else{t=e}return t}function P(e){this._oPopupContent.switchToTime()}return f});