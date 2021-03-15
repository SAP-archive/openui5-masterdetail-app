/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/m/Button","sap/m/Toolbar","sap/ui/core/Core","sap/ui/core/date/UniversalDate","sap/ui/core/format/DateFormat","sap/ui/core/IconPool","sap/ui/core/InvisibleText","sap/ui/dom/containsOrEquals","sap/ui/unified/Calendar","sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","./CalendarInCardRenderer"],function(t,e,i,a,o,r,s,n,h,c,_,d){"use strict";var g=h.extend("sap.f.CalendarInCard",{metadata:{library:"sap.f"}});g.prototype.onBeforeRendering=function(){var t=this.getAggregation("month"),e=this._getFocusedDate().toLocalJSDate();t[0].displayDate(e);this._iSize=0;switch(this._iMode){case 0:this._oPickerBtn.setText(this._formatPickerText(e));break;case 1:this._oPickerBtn.setText(this._formatMonthPickerText());break;case 2:case 3:this._oPickerBtn.setText(this._formatYearPickerText());break}this._updateTodayButtonState()};g.prototype.onAfterRendering=function(t){};g.prototype.onsaptabnext=function(t){if(n(this.getDomRef("content"),t.target)){if(this._oTodayBtn.getEnabled()){this._oTodayBtn.focus()}else{this._oPickerBtn.focus()}t.preventDefault()}else if(t.target.id===this._oTodayBtn.getId()){if(this._oPickerBtn.getVisible()){this._oPickerBtn.focus();t.preventDefault()}else{this._clearTabindex0()}}else if(t.target.id===this._oPickerBtn.getId()){this._clearTabindex0()}};g.prototype.onsaptabprevious=function(t){if(n(this.getDomRef("content"),t.target)){this._clearTabindex0()}else if(t.target.id===this._oTodayBtn.getId()){this._moveFocusToCalContent();t.preventDefault()}else if(t.target.id===this._oPickerBtn.getId()){if(this._oTodayBtn.getEnabled()){this._oTodayBtn.focus()}else{this._moveFocusToCalContent()}t.preventDefault()}};g.prototype._initializeHeader=function(){var a=this.getId()+"--Head",o=i.getLibraryResourceBundle("sap.f"),n=new t(a+"-PrevBtn",{icon:r.getIconURI("slim-arrow-left"),tooltip:o.getText("CALENDAR_BTN_PREV"),type:"Transparent",press:function(){this._handlePrevious()}.bind(this)}),h=new t({icon:r.getIconURI("slim-arrow-right"),tooltip:o.getText("CALENDAR_BTN_NEXT"),type:"Transparent",press:function(){this._handleNext()}.bind(this)}),c=new e(a,{ariaLabelledBy:s.getStaticId("sap.f","CALENDAR_NAVIGATION")});this._oTodayBtn=new t({text:o.getText("CALENDAR_TODAY"),ariaLabelledBy:s.getStaticId("sap.f","CALENDAR_NAVIGATE_TO_TODAY"),type:"Transparent",press:function(){this._handleTodayPress()}.bind(this)});this._oPickerBtn=new t({type:"Transparent",ariaLabelledBy:s.getStaticId("sap.f","CALENDAR_SELECT_RANGE"),press:function(){this._handlePickerButtonPress()}.bind(this)});c.addContent(n).addContent(this._oTodayBtn).addContent(h).addContent(this._oPickerBtn);this.setAggregation("header",c)};g.prototype._handlePickerButtonPress=function(){switch(this._iMode){case 0:this._showMonthPicker();this._oPickerBtn.getDomRef().focus();break;case 1:this._showYearPicker();this._oPickerBtn.getDomRef().focus();break;case 2:this._showYearRangePicker();break}};g.prototype._handleTodayPress=function(){var t=new Date,e=c.fromLocalJSDate(t);this.getAggregation("month")[0].setDate(t);this.getSelectedDates()[0].setStartDate(t);this._setFocusedDate(e);if(this._iMode===3){t.setFullYear(t.getFullYear()-this._getYearRangePicker().getRangeSize()/2);this._getYearRangePicker().setDate(t);this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===2){this._getYearPicker().setDate(t);this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===1){this.displayDate(t);this._getMonthPicker()._iYear=t.getFullYear();this._getMonthPicker().setMonth(t.getMonth());this._oPickerBtn.setText(this._formatMonthPickerText())}else{this._oPickerBtn.setText(this._formatPickerText())}this._updateTodayButtonState();this.fireSelect()};g.prototype._formatPickerText=function(t){var e=t?t:this.getSelectedDates()[0].getStartDate(),a=i.getConfiguration().getRTL(),r=o.getDateInstance({format:"yMMMM"}),s=r.format(e),n,h;if(!a){n=s;if(h){n+=" - "+h}}else{if(h){n=h+" - "+s}else{n=s}}return n};g.prototype._formatYearPickerText=function(){var t=this._getYearPicker().getDate().getFullYear(),e=this._getYearPicker().getYears(),i=t-Math.floor(e/2),a=t+e/2-1;return""+i+" - "+a};g.prototype._formatMonthPickerText=function(){return o.getDateInstance({format:"y"}).format(this.getStartDate())};g.prototype._showMonthPicker=function(t){var e=this._getFocusedDate(),i=this._getMonthPicker();this._iMode===2&&this._hideYearPicker(true);i.setVisible(true);this._renderPicker(i);i._setYear(e.getYear());this._showOverlay();if(!t){i.setMonth(e.getMonth());this._setDisabledMonths(e.getYear(),i)}this._iMode=1;this._togglePrevNext(e,false);this._oPickerBtn.setText(this._formatMonthPickerText())};g.prototype._showYearPicker=function(){var t=this._getFocusedDate(),e=this._getYearPicker(),i,a;this._iMode===1&&this._hideMonthPicker(true);e.getDomRef()?e.$().css("display",""):this._renderPicker(e);this._showOverlay();if(l.call(this)==1){i=this.getAggregation("month")[0];a=i.$("days").find(".sapUiCalItem");if(a.length==28){e.$().addClass("sapUiCalYearNoTop")}else{e.$().removeClass("sapUiCalYearNoTop")}}this._togglePrevNexYearPicker();this._iMode=2;e.setDate(t.toLocalJSDate());this._oPickerBtn.setText(this._formatYearPickerText())};g.prototype._showYearRangePicker=function(){this._hideYearPicker();h.prototype._showYearRangePicker.apply(this,arguments);this._oPickerBtn.setVisible(false)};g.prototype._selectMonth=function(){h.prototype._selectMonth.apply(this,arguments);this.getSelectedDates()[0].setStartDate(this._getFocusedDate().toLocalJSDate());this._oPickerBtn.setText(this._formatPickerText());this._updateTodayButtonState()};g.prototype._selectYear=function(){h.prototype._selectYear.apply(this,arguments);this.getSelectedDates()[0].setStartDate(this._getFocusedDate().toLocalJSDate());this._oPickerBtn.setText(this._formatMonthPickerText());this._showMonthPicker();this._updateTodayButtonState()};g.prototype._selectYearRange=function(){var t=this.getAggregation("yearRangePicker"),e=t.getRangeSize(),i=this.getPrimaryCalendarType(),a=c.fromLocalJSDate(t.getDate(),i),o=this._getFocusedDate();a.setMonth(o.getMonth(),o.getDate());a.setYear(a.getYear()+Math.floor(e/2));this.getSelectedDates()[0].setStartDate(a.toLocalJSDate());o.setYear(a.getYear());this._setFocusedDate(o);this._hideYearRangePicker();this._showYearPicker();this._oPickerBtn.setVisible(true).setText(this._formatYearPickerText());this._updateTodayButtonState()};g.prototype._hideYearRangePicker=function(){h.prototype._hideYearRangePicker.apply(this,arguments);this._renderMonth()};g.prototype._handlePrevious=function(){h.prototype._handlePrevious.apply(this,arguments);this._handleArrowNavigation(1)};g.prototype._handleNext=function(){h.prototype._handleNext.apply(this,arguments);this._handleArrowNavigation(-1)};g.prototype._handleArrowNavigation=function(t){var e,i,a;if(this._iMode===3){a=this._getYearRangePicker();a.getDate().setFullYear(a.getDate().getFullYear()+t*a.getYears());this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===2){i=this._getYearPicker();i.getDate().setFullYear(i.getDate().getFullYear()+t*i.getYears());this._oPickerBtn.setText(this._formatYearPickerText())}else if(this._iMode===1){e=this._getMonthPicker();this._getFocusedDate().setYear(e._iYear);this.getAggregation("month")[0].getDate().setYear(e._iYear);this._oPickerBtn.setText(this._formatMonthPickerText())}else{this._oPickerBtn.setText(this._formatPickerText(this._getFocusedDate().toLocalJSDate()))}this._updateTodayButtonState()};g.prototype._dateMatchesVisibleRange=function(){var t=c.fromLocalJSDate(new Date),e,i,a,o,r;switch(this._iMode){case 0:e=this.getSelectedDates().length?this.getSelectedDates()[0].getStartDate():this.getStartDate();i=e.getDate()===t.getDate();return i&&_._isSameMonthAndYear(c.fromLocalJSDate(this.getStartDate()),t);case 1:return _._isSameMonthAndYear(c.fromLocalJSDate(this.getStartDate()),t);case 2:return _._isSameMonthAndYear(c.fromLocalJSDate(this._getYearPicker().getDate()),t);case 3:a=this._getYearRangePicker();o=a.getDate();r=new Date(o.getFullYear()+a.getRangeSize()/2,o.getMonth(),o.getDate());return _._isSameMonthAndYear(c.fromLocalJSDate(r),t)}};g.prototype._updateTodayButtonState=function(){if(this._oTodayBtn){this._oTodayBtn.setEnabled(!this._dateMatchesVisibleRange())}};g.prototype._updateHeader=function(){};g.prototype.onsapescape=function(){this.fireCancel();this._closedPickers();this._oPickerBtn.setVisible(true);this._oPickerBtn.setText(this._formatPickerText())};g.prototype._updateHeadersButtons=function(){};g.prototype._togglePrevNext=function(){};g.prototype._togglePrevNexYearPicker=function(){};g.prototype._initializeSecondMonthHeader=function(){};g.prototype._updateHeadersYearPrimaryText=function(){};g.prototype._updateHeadersYearAdditionalText=function(){};g.prototype._updateActiveHeaderYearButtonVisibility=function(){};g.prototype._setHeaderText=function(){};function l(){return 1}return g});