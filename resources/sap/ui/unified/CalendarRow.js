/*!
 * OpenUI5
 * (c) Copyright 2009-2019 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/Device","sap/ui/core/LocaleData","sap/ui/unified/calendar/CalendarUtils","sap/ui/core/date/UniversalDate","./library","sap/ui/core/InvisibleText","sap/ui/core/format/DateFormat","sap/ui/core/ResizeHandler","sap/ui/core/Locale","./CalendarRowRenderer","sap/ui/dom/containsOrEquals","sap/ui/thirdparty/jquery"],function(e,t,i,a,n,s,r,o,p,l,u,g,h){"use strict";var d=s.CalendarDayType;var f=s.CalendarAppointmentVisualization;var c=s.GroupAppointmentsMode;var m=s.CalendarIntervalType;var v=e.extend("sap.ui.unified.CalendarRow",{metadata:{library:"sap.ui.unified",properties:{startDate:{type:"object",group:"Data"},intervals:{type:"int",group:"Appearance",defaultValue:12},intervalType:{type:"sap.ui.unified.CalendarIntervalType",group:"Appearance",defaultValue:m.Hour},showSubIntervals:{type:"boolean",group:"Appearance",defaultValue:false},showIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},showEmptyIntervalHeaders:{type:"boolean",group:"Appearance",defaultValue:true},nonWorkingDays:{type:"int[]",group:"Misc",defaultValue:null},nonWorkingHours:{type:"int[]",group:"Misc",defaultValue:null},width:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},height:{type:"sap.ui.core.CSSSize",group:"Dimension",defaultValue:null},checkResize:{type:"boolean",group:"Behavior",defaultValue:true},updateCurrentTime:{type:"boolean",group:"Behavior",defaultValue:true},groupAppointmentsMode:{type:"sap.ui.unified.GroupAppointmentsMode",group:"Appearance",defaultValue:c.Collapsed},appointmentsReducedHeight:{type:"boolean",group:"Appearance",defaultValue:false},appointmentsVisualization:{type:"sap.ui.unified.CalendarAppointmentVisualization",group:"Appearance",defaultValue:f.Standard}},aggregations:{appointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"appointment"},intervalHeaders:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"intervalHeader"},groupAppointments:{type:"sap.ui.unified.CalendarAppointment",multiple:true,singularName:"groupAppointment",visibility:"hidden"}},associations:{ariaLabelledBy:{type:"sap.ui.core.Control",multiple:true,singularName:"ariaLabelledBy"},legend:{type:"sap.ui.unified.CalendarLegend",multiple:false}},events:{select:{parameters:{appointment:{type:"sap.ui.unified.CalendarAppointment"},appointments:{type:"sap.ui.unified.CalendarAppointment[]"},multiSelect:{type:"boolean"},domRefId:{type:"string"}}},startDateChange:{},leaveRow:{parameters:{type:{type:"string"}}},intervalSelect:{parameters:{startDate:{type:"object"},endDate:{type:"object"},subInterval:{type:"boolean"}}}}}});v.prototype.init=function(){this._bRTL=sap.ui.getCore().getConfiguration().getRTL();this._oRb=sap.ui.getCore().getLibraryResourceBundle("sap.ui.unified");this._oFormatAria=o.getDateTimeInstance({pattern:"EEEE dd/MM/YYYY 'at' HH:mm:ss a"});this._iHoursMinDelta=1;this._iDaysMinDelta=30;this._iMonthsMinDelta=720;this._aVisibleAppointments=[];this._aVisibleIntervalHeaders=[];this.setStartDate(new Date);this._resizeProxy=h.proxy(this.handleResize,this);this.aSelectedAppointments=[];this._fnCustomSortedAppointments=undefined};v.prototype.exit=function(){if(this._sResizeListener){p.deregister(this._sResizeListener);this._sResizeListener=undefined}if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}this._fnCustomSortedAppointments=undefined};v.prototype.onBeforeRendering=function(){_.call(this);y.call(this);I.call(this);if(this._sUpdateCurrentTime){clearTimeout(this._sUpdateCurrentTime);this._sUpdateCurrentTime=undefined}};v.prototype.onAfterRendering=function(){w.call(this);this.updateCurrentTimeVisualization();if(this.getCheckResize()&&!this._sResizeListener){this._sResizeListener=p.register(this,this._resizeProxy)}};v.prototype.onThemeChanged=function(e){if(this.getDomRef()){for(var t=0;t<this._aVisibleAppointments.length;t++){var i=this._aVisibleAppointments[t];i.level=-1}this.handleResize(e)}};v.prototype.invalidate=function(t){if(t&&t instanceof sap.ui.unified.CalendarAppointment){var i=false;for(var a=0;a<this._aVisibleAppointments.length;a++){if(this._aVisibleAppointments[a].appointment==t){i=true;break}}if(i){this._aVisibleAppointments=[]}this._updateSelectedAppointmentsArray(t)}e.prototype.invalidate.apply(this,arguments)};v.prototype.setStartDate=function(e){if(!e){e=new Date}a._checkJSDateObject(e);var t=e.getFullYear();a._checkYearInValidRange(t);this.setProperty("startDate",e);return this};v.prototype._getStartDate=function(){if(!this._oUTCStartDate){this._oUTCStartDate=a._createUniversalUTCDate(this.getStartDate(),undefined,true)}return this._oUTCStartDate};v.prototype.setIntervalType=function(e){this.setProperty("intervalType",e);this._aVisibleAppointments=[];return this};v.prototype.setGroupAppointmentsMode=function(e){this.setProperty("groupAppointmentsMode",e);this._aVisibleAppointments=[];return this};v.prototype.setAppointmentsReducedHeight=function(e){this.setProperty("appointmentsReducedHeight",e);this._aVisibleAppointments=[];return this};v.prototype._getAppointmentReducedHeight=function(e){var i=false;if(!t.system.phone&&this.getAppointmentsReducedHeight()&&!e.getText()){i=true}return i};v.prototype.onfocusin=function(e){if(h(e.target).hasClass("sapUiCalendarApp")){E.call(this,e.target.id)}else{var t=this._getVisibleAppointments();var i=false;var a;for(var n=0;n<t.length;n++){a=t[n].appointment;if(g(a.getDomRef(),e.target)){i=true;a.focus();break}}if(!i){a=this.getFocusedAppointment();if(a){a.focus()}}}};v.prototype.applyFocusInfo=function(e){if(this._sFocusedAppointmentId){this.getFocusedAppointment().focus()}return this};v.prototype.onsapleft=function(e){if(h(e.target).hasClass("sapUiCalendarApp")){F.call(this,this._bRTL,1)}e.preventDefault();e.stopPropagation()};v.prototype.onsapright=function(e){if(h(e.target).hasClass("sapUiCalendarApp")){F.call(this,!this._bRTL,1)}e.preventDefault();e.stopPropagation()};v.prototype.onsapup=function(e){this.fireLeaveRow({type:e.type})};v.prototype.onsapdown=function(e){this.fireLeaveRow({type:e.type})};v.prototype.onsaphome=function(e){L.call(this,e);e.preventDefault();e.stopPropagation()};v.prototype.onsapend=function(e){L.call(this,e);e.preventDefault();e.stopPropagation()};v.prototype.onsapselect=function(e){var t=this._getVisibleAppointments();for(var i=0;i<t.length;i++){var a=t[i].appointment;if(g(a.getDomRef(),e.target)){H.call(this,a,!(e.ctrlKey||e.metaKey));break}}e.stopPropagation();e.preventDefault()};v.prototype.ontap=function(e){var t=this.$("Apps").children(".sapUiCalendarRowAppsInt");var i=0;var a=false;for(i=0;i<t.length;i++){var n=t[i];if(!this._isOneMonthIntervalOnSmallSizes()&&g(n,e.target)){a=true;break}}if(a){z.call(this,i,e.target)}else{this.onsapselect(e)}};v.prototype.onsapselectmodifiers=function(e){this.onsapselect(e)};v.prototype.handleResize=function(e){if(e&&e.size&&e.size.width<=0){return this}var t=this.$("DummyApp");t.css("display","");w.call(this);return this};v.prototype.updateCurrentTimeVisualization=function(){var e=this.$("Now");var t=a._createUniversalUTCDate(new Date,undefined,true);var i=this.getIntervals();var n=this.getIntervalType();var s=this._getStartDate();var r=s.getTime();var o=this._oUTCEndDate;var p=o.getTime();this._sUpdateCurrentTime=undefined;if(t.getTime()<=p&&t.getTime()>=r){var l=M.call(this,n,i,s,o,r,t);var u=0;if(this._bRTL){e.css("right",l+"%")}else{e.css("left",l+"%")}e.css("display","");if(this.getUpdateCurrentTime()){switch(n){case m.Hour:u=6e4;break;case m.Day:case m.Week:case m.OneMonth:u=18e5;break;default:u=-1;break}if(u>0){this._sUpdateCurrentTime=setTimeout(this.updateCurrentTimeVisualization.bind(this),u)}}}else{e.css("display","none")}return this};v.prototype.getFocusedAppointment=function(){var e=this._getAppointmentsSorted();var t=this.getAggregation("groupAppointments",[]);var i;var a=0;for(a=0;a<t.length;a++){if(t[a].getId()==this._sFocusedAppointmentId){i=t[a];break}}if(!i){for(a=0;a<e.length;a++){if(e[a].getId()==this._sFocusedAppointmentId){i=e[a];break}}}return i};v.prototype.focusAppointment=function(e){if(!e||!(e instanceof sap.ui.unified.CalendarAppointment)){throw new Error("Appointment must be a CalendarAppointment; "+this)}var t=e.getId();if(this._sFocusedAppointmentId!=t){E.call(this,t)}else{e.focus()}return this};v.prototype.focusNearestAppointment=function(e){a._checkJSDateObject(e);var t=this._getAppointmentsSorted();var i;var n;var s;for(var r=0;r<t.length;r++){i=t[r];if(i.getStartDate()>e){if(r>0){n=t[r-1]}else{n=i}break}}if(i){if(n&&Math.abs(i.getStartDate()-e)>=Math.abs(n.getStartDate()-e)){s=n}else{s=i}this.focusAppointment(s)}return this};v.prototype._getVisibleAppointments=function(){return this._aVisibleAppointments};v.prototype._getVisibleIntervalHeaders=function(){return this._aVisibleIntervalHeaders};v.prototype._getNonWorkingDays=function(){var e=this.getNonWorkingDays();if(!e){var t=U.call(this);var i=t.getWeekendStart();var a=t.getWeekendEnd();e=[];for(var n=0;n<=6;n++){if(i<=a&&n>=i&&n<=a||i>a&&(n>=i||n<=a)){e.push(n)}}}else if(!Array.isArray(e)){e=[]}return e};v.prototype._isOneMonthIntervalOnSmallSizes=function(){return this.getIntervalType()===m.OneMonth&&this.getIntervals()===1};v.prototype._getAppointmentsSorted=function(){var e=this.getAppointments(),t=P;e.sort(this._fnCustomSortedAppointments?this._fnCustomSortedAppointments:t);return e};v.prototype._setCustomAppointmentsSorterCallback=function(e){this._fnCustomSortedAppointments=e;this.invalidate()};v.prototype._calculateAppoitnmentVisualCue=function(e){if(T(this,e)){return{appTimeUnitsDifRowStart:0,appTimeUnitsDifRowEnd:0}}var t=e.getStartDate(),i=e.getEndDate(),a=new n(t.getFullYear(),t.getMonth(),t.getDate(),t.getHours(),t.getMinutes()),s=new n(i.getFullYear(),i.getMonth(),i.getDate(),i.getHours(),i.getMinutes()),r=this.getIntervalType(),o=this.getStartDate(),p=r==="Hour"?new n(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()):new n(o.getFullYear(),o.getMonth(),o.getDate()),l=this.getIntervals(),u;switch(r){case"Hour":u=new n(o.getFullYear(),o.getMonth(),o.getDate(),o.getHours()+l);break;case"Day":case"Week":case"One Month":u=new n(o.getFullYear(),o.getMonth(),o.getDate()+l);break;case"Month":u=new n(o.getFullYear(),o.getMonth()+l,o.getDate());break;default:break}return{appTimeUnitsDifRowStart:p.getTime()-a.getTime(),appTimeUnitsDifRowEnd:s.getTime()-u.getTime()}};v.prototype._updateSelectedAppointmentsArray=function(e){if(e.getSelected()){if(this.aSelectedAppointments.indexOf(e.getId())===-1){this.aSelectedAppointments.push(e.getId())}}else{this.aSelectedAppointments=this.aSelectedAppointments.filter(function(t){return t!==e.getId()})}};function T(e,t){var i=e.getAggregation("groupAppointments",[]);var a;for(a=0;a<i.length;++a){if(t===i[a]){return true}}return false}function C(){if(!this._sLocale){this._sLocale=sap.ui.getCore().getConfiguration().getFormatSettings().getFormatLocale().toString()}return this._sLocale}function U(){if(!this._oLocaleData){var e=C.call(this);var t=new l(e);this._oLocaleData=i.getInstance(t)}return this._oLocaleData}function _(){var e=this.getStartDate();var t;var i=this.getIntervals();var a=this.getIntervalType();this._oUTCStartDate=A.call(this,e);switch(a){case m.Hour:t=new n(this._oUTCStartDate.getTime());t.setUTCHours(t.getUTCHours()+i);this._iMinDelta=this._iHoursMinDelta;break;case m.Day:case m.Week:case m.OneMonth:t=new n(this._oUTCStartDate.getTime());t.setUTCDate(t.getUTCDate()+i);this._iMinDelta=this._iDaysMinDelta;break;case m.Month:t=new n(this._oUTCStartDate.getTime());t.setUTCMonth(t.getUTCMonth()+i);this._iMinDelta=this._iMonthsMinDelta;break;default:throw new Error("Unknown IntervalType: "+a+"; "+this)}t.setUTCMilliseconds(-1);this._iRowSize=t.getTime()-this._oUTCStartDate.getTime();this._iIntervalSize=Math.floor(this._iRowSize/i);this._oUTCEndDate=t}function A(e){var t=this.getIntervalType();var i=a._createUniversalUTCDate(e,undefined,true);switch(t){case m.Hour:i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case m.Day:case m.Week:case m.OneMonth:i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;case m.Month:i.setUTCDate(1);i.setUTCHours(0);i.setUTCMinutes(0);i.setUTCSeconds(0);i.setUTCMilliseconds(0);break;default:throw new Error("Unknown IntervalType: "+t+"; "+this)}return i}function D(){return t.system.phone||this.getGroupAppointmentsMode()===c.Collapsed}function y(){var e=this._getAppointmentsSorted();var t;var i;var s;var r=this.getIntervals();var o=this.getIntervalType();var p=this._getStartDate();var l=p.getTime();var u=this._oUTCEndDate;var g=u.getTime();var h=[];var d=false;var f=0;var c=0;var v=D.call(this);this.destroyAggregation("groupAppointments",true);for(f=0;f<e.length;f++){t=e[f];var T=a._createUniversalUTCDate(t.getStartDate(),undefined,true);T.setUTCSeconds(0);T.setUTCMilliseconds(0);var C=t.getEndDate()?a._createUniversalUTCDate(t.getEndDate(),undefined,true):a._createUniversalUTCDate(new Date(864e12),undefined,true);C.setUTCSeconds(0);C.setUTCMilliseconds(0);var U=false;if(T.getTime()<l&&C.getTime()>=l){T=new n(l);U=true}if(C.getTime()>g&&T.getTime()<=g){C=new n(g);U=true}var _=T.getUTCHours()*60+T.getUTCMinutes();T.setUTCMinutes(T.getUTCMinutes()-_%this._iMinDelta);var A=(C.getTime()-T.getTime())/6e4;if(U&&A==0){continue}var y=0;var I=0;var w=-1;i=undefined;s=undefined;if(T&&T.getTime()<=g&&C&&C.getTime()>=l){if(v&&o==m.Month&&C.getTime()-T.getTime()<6048e5){i=b.call(this,T,t,o,r,p,u,l,h);var H=a._createUniversalUTCDate(i.getEndDate(),undefined,true);if(C.getTime()>H.getTime()){s=b.call(this,C,t,o,r,p,u,l,h)}}y=M.call(this,o,r,p,u,l,T);I=S.call(this,o,r,p,u,l,C);if(i){i._iBegin=y;i._iEnd=I;i._iLevel=w;if(s){s._iBegin=y;s._iEnd=I;s._iLevel=w}continue}h.push({appointment:t,begin:y,end:I,calculatedEnd:I,level:w});if(this._sFocusedAppointmentId&&this._sFocusedAppointmentId==t.getId()){d=true}}}var k=this.getAggregation("groupAppointments",[]);if(k.length>0){for(f=0;f<h.length;f++){t=h[f];if(t.appointment._aAppointments&&t.appointment._aAppointments.length<=1){i=t.appointment;var R=false;if(i._aAppointments.length==0){R=true}else{for(c=0;c<h.length;c++){if(h[c].appointment==i._aAppointments[0]){R=true;break}}}if(!R){for(c=0;c<k.length;c++){s=k[c];if(i!=s){for(var V=0;V<s._aAppointments.length;V++){if(i._aAppointments[0]==s._aAppointments[V]){s._aAppointments.splice(V,1);if(s._aAppointments.length==1){this.removeAggregation("groupAppointments",s);s.destroy();k=this.getAggregation("groupAppointments",[])}else{s.setProperty("title",s._aAppointments.length,true)}break}}}}t.begin=i._iBegin;t.end=i._iEnd;t.calculatedEnd=i._iEnd;t.level=i._iLevel;t.appointment=i._aAppointments[0]}else{h.splice(f,1);f--}this.removeAggregation("groupAppointments",i);i.destroy();k=this.getAggregation("groupAppointments",[])}}}if(!d){if(h.length>0){this._sFocusedAppointmentId=h[0].appointment.getId()}else{this._sFocusedAppointmentId=undefined}}this._aVisibleAppointments=h;return this._aVisibleAppointments}function b(e,t,i,s,r,o,p,l){var u=this.getAggregation("groupAppointments",[]);var g;var h=U.call(this);var f=h.getFirstDayOfWeek();var c=e.getUTCDay();var m=new n(e.getTime());m.setUTCHours(0);m.setUTCMinutes(0);m.setUTCSeconds(0);m.setUTCMilliseconds(0);if(f<=c){m.setDate(m.getDate()-(c-f))}else{m.setDate(m.getDate()-(7-c-f))}for(var v=0;v<u.length;v++){g=u[v];var T=a._createUniversalUTCDate(g.getStartDate(),undefined,true);if(T.getTime()==m.getTime()){break}g=undefined}if(!g){var C=new n(m.getTime());C.setDate(C.getDate()+7);C.setMilliseconds(-1);g=new sap.ui.unified.CalendarAppointment(this.getId()+"-Group"+u.length,{type:t.getType(),startDate:a._createLocalDate(new Date(m.getTime()),true),endDate:a._createLocalDate(new Date(C.getTime()),true)});g._aAppointments=[];this.addAggregation("groupAppointments",g,true);var _=M.call(this,i,s,r,o,p,m);var A=S.call(this,i,s,r,o,p,C);l.push({appointment:g,begin:_,end:A,calculatedEnd:A,level:-1})}g._aAppointments.push(t);if(g.getType()!=d.None&&g.getType()!=t.getType()){g.setType(d.None)}g.setProperty("title",g._aAppointments.length,true);return g}function M(e,t,i,a,s,r){var o=0;if(e!=m.Month){o=100*(r.getTime()-s)/this._iRowSize}else{var p=new n(r.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new n(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100*g/t+100*(r.getTime()-p.getTime())/u/t}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function S(e,t,i,a,s,r){var o=0;if(e!=m.Month){o=100-100*(r.getTime()-s)/this._iRowSize}else{var p=new n(r.getTime());p.setUTCDate(1);p.setUTCHours(0);p.setUTCMinutes(0);p.setUTCSeconds(0);p.setUTCMilliseconds(0);var l=new n(p.getTime());l.setUTCMonth(l.getUTCMonth()+1);l.setMilliseconds(-1);var u=l.getTime()-p.getTime();var g=(p.getUTCFullYear()-i.getUTCFullYear())*12+p.getUTCMonth()-i.getUTCMonth();o=100-(100*g/t+100*(r.getTime()-p.getTime())/u/t)}if(o<0){o=0}o=Math.round(o*1e5)/1e5;return o}function I(){var e=[];if(this.getShowIntervalHeaders()){var t=this.getIntervalHeaders();var i;var s=this.getIntervals();var r=this.getIntervalType();var o=this._getStartDate();var p=o.getTime();var l=this._oUTCEndDate;var u=l.getTime();var g=0;var h=0;for(g=0;g<t.length;g++){i=t[g];var d=a._createUniversalUTCDate(i.getStartDate(),undefined,true);d.setUTCSeconds(0);d.setUTCMilliseconds(0);var f=i.getEndDate()?a._createUniversalUTCDate(i.getEndDate(),undefined,true):a._createUniversalUTCDate(new Date(864e12),undefined,true);f.setUTCSeconds(0);f.setUTCMilliseconds(0);if(d&&d.getTime()<=u&&f&&f.getTime()>=p){var c=new n(o.getTime());var v=new n(o.getTime());v.setUTCMinutes(v.getUTCMinutes()-1);var T=-1;var C=-1;for(h=0;h<s;h++){switch(r){case m.Hour:v.setUTCHours(v.getUTCHours()+1);if(h>0){c.setUTCHours(c.getUTCHours()+1)}break;case m.Day:case m.Week:case m.OneMonth:v.setUTCDate(v.getUTCDate()+1);if(h>0){c.setUTCDate(c.getUTCDate()+1)}break;case m.Month:v.setUTCDate(1);v.setUTCMonth(v.getUTCMonth()+2);v.setUTCDate(0);if(h>0){c.setUTCMonth(c.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+r+"; "+this)}if(d&&d.getTime()<=c.getTime()&&f&&f.getTime()>=v.getTime()){if(T<0){T=h}C=h}}if(T>=0){e.push({interval:T,appointment:i,last:C})}}}}this._aVisibleIntervalHeaders=e;return this._aVisibleIntervalHeaders}function w(){if(this._isOneMonthIntervalOnSmallSizes()){return}var e=this.$("Apps");var i=e.innerWidth();if(i<=0){return}var a=this.$("DummyApp");var n=a.outerHeight(true);if(n<=0){return}var s=a.outerWidth();var r=s/i*100;var o=Math.ceil(1e3*r)/1e3;var p;var l;var u=0;var g=0;var d=0;var f=!t.system.phone&&this.getAppointmentsReducedHeight();if(this.getShowIntervalHeaders()&&(this.getShowEmptyIntervalHeaders()||this._getVisibleIntervalHeaders().length>0)){u=h(this.$("AppsInt0").children(".sapUiCalendarRowAppsIntHead")[0]).outerHeight(true)}for(d=0;d<this._aVisibleAppointments.length;d++){p=this._aVisibleAppointments[d];l=p.appointment.$();var c=Math.floor(1e3*(100-p.calculatedEnd-p.begin))/1e3;var m=false;if(c<o){p.end=100-p.begin-r;if(p.end<0){p.end=0}p.level=-1;m=true;l.addClass("sapUiCalendarAppSmall")}else if(l.hasClass("sapUiCalendarAppSmall")){p.end=p.calculatedEnd;m=true;l.removeClass("sapUiCalendarAppSmall")}if(m){if(this._bRTL){l.css("left",p.end+"%")}else{l.css("right",p.end+"%")}}}for(d=0;d<this._aVisibleAppointments.length;d++){p=this._aVisibleAppointments[d];l=p.appointment.$();var v={};var T=f&&!this._getAppointmentReducedHeight(p.appointment);if(p.level<0){for(var C=0;C<this._aVisibleAppointments.length;C++){var U=this._aVisibleAppointments[C];if(p!=U&&p.begin<Math.floor(1e3*(100-U.end))/1e3&&Math.floor(1e3*(100-p.end))/1e3>U.begin&&U.level>=0){if(v[U.level]){v[U.level]++}else{v[U.level]=1}if(f&&!this._getAppointmentReducedHeight(U.appointment)){if(v[U.level+1]){v[U.level+1]++}else{v[U.level+1]=1}}}}p.level=0;while(v[p.level]||T&&v[p.level+1]){p.level++}l.attr("data-sap-level",p.level)}l.css("top",n*p.level+u+"px");var _=p.level;if(T){_++}if(g<_){g=_}}g++;n=n*g+u;if(!this.getHeight()){e.outerHeight(n)}else{var A=this.$("Apps").children(".sapUiCalendarRowAppsInt");for(d=0;d<A.length;d++){var D=h(A[d]);D.outerHeight(n)}}a.css("display","none")}function H(e,t){var i=0;var a;var n;var s;var o;var p=r.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED");if(t){var l=this.getAppointments();var u=this.getAggregation("groupAppointments",[]);h.merge(l,u);for(i=0;i<l.length;i++){a=l[i];if(a.getId()!==e.getId()&&a.getSelected()){a.setProperty("selected",false,true);a.$().removeClass("sapUiCalendarAppSel");for(var i=0;i<this.aSelectedAppointments.length;i++){if(this.aSelectedAppointments[i]!==a.getId()){this.aSelectedAppointments.splice(i)}}n=a.$().attr("aria-labelledby");s=n?n.replace(p,""):"";a.$().attr("aria-labelledby",s)}}}if(e.getSelected()){e.setProperty("selected",false,true);e.$().removeClass("sapUiCalendarAppSel");R(this,t)}else{e.setProperty("selected",true,true);e.$().addClass("sapUiCalendarAppSel");R(this,t)}this._updateSelectedAppointmentsArray(e);o=e.$().attr("aria-labelledby")+" "+p;e.$().attr("aria-labelledby",o);if(e._aAppointments){for(i=0;i<e._aAppointments.length;i++){a=e._aAppointments[i];a.setProperty("selected",true,true);o=a.$().attr("aria-labelledby")+" "+p;a.$().attr("aria-labelledby",o)}this.fireSelect({appointments:e._aAppointments,multiSelect:!t,domRefId:e.getId()})}else{this.fireSelect({appointment:e,multiSelect:!t,domRefId:e.getId()})}}function k(e){var t=this._getPlanningCalendar();if(t){t["_onRow"+e]()}}v.prototype._getPlanningCalendar=function(){var e=this;while(e.getParent()!==null){if(e.getMetadata().getName()==="sap.m.PlanningCalendar"){return e}e=e.getParent()}};function R(e,t){if(t){k.call(e,"DeselectAppointment")}}function V(e){var t=this.getAggregation("groupAppointments",[]);var i;var a=false;for(var n=0;n<t.length;n++){var s=t[n]._aAppointments;for(var r=0;r<s.length;r++){if(s[r].getId()==e){i=t[n];a=true;break}}if(a){break}}return i}function E(e){if(this._sFocusedAppointmentId!=e){var t=this._getAppointmentsSorted();var i=this._aVisibleAppointments;var n;var s=0;n=V.call(this,e);if(n){e=n.getId();n=undefined}for(s=0;s<i.length;s++){if(i[s].appointment.getId()==e){n=i[s].appointment;break}}if(n){var r=this.getFocusedAppointment().$();var o=n.$();this._sFocusedAppointmentId=n.getId();r.attr("tabindex","-1");o.attr("tabindex","0");o.focus()}else{for(s=0;s<t.length;s++){if(t[s].getId()==e){n=t[s];break}}if(n){this._sFocusedAppointmentId=n.getId();var p=A.call(this,n.getStartDate());this.setStartDate(a._createLocalDate(p,true));if(!g(this.getDomRef(),document.activeElement)){setTimeout(function(){this.getFocusedAppointment().focus()}.bind(this),0)}this.fireStartDateChange()}}}}function F(e,t){var i=this._sFocusedAppointmentId;var a=this._getAppointmentsSorted();var n=this.getAggregation("groupAppointments",[]);var s;var r=0;var o=0;for(o=0;o<n.length;o++){if(n[o].getId()==i){var p=n[o]._aAppointments;if(e){i=p[p.length-1].getId()}else{i=p[0].getId()}break}}for(o=0;o<a.length;o++){if(a[o].getId()==i){r=o;break}}if(e){r=r+t}else{r=r-t}if(r<0){r=0}else if(r>=a.length){r=a.length-1}s=a[r];E.call(this,s.getId())}function L(e){var t=this._getAppointmentsSorted();var i;var s=new n(this._getStartDate());var r=new n(this._oUTCEndDate);var o=this.getIntervalType();var p;var l;s.setUTCHours(0);r.setUTCHours(0);r.setUTCMinutes(0);r.setUTCSeconds(0);switch(o){case m.Hour:r.setUTCDate(r.getUTCDate()+1);r.setUTCMilliseconds(-1);break;case m.Day:case m.Week:case m.OneMonth:s.setUTCDate(1);r.setUTCMonth(r.getUTCMonth()+1);r.setUTCDate(1);r.setUTCMilliseconds(-1);break;case m.Month:s.setUTCMonth(0);s.setUTCDate(1);r.setUTCFullYear(r.getUTCFullYear()+1);r.setUTCMonth(1);r.setUTCDate(1);r.setUTCMilliseconds(-1);break;default:throw new Error("Unknown IntervalType: "+o+"; "+this)}var u=a._createLocalDate(s,true);var g=a._createLocalDate(r,true);for(var h=0;h<t.length;h++){if(t[h].getStartDate()>=u&&t[h].getStartDate()<=g){i=t[h];p=i.getId();if(e.type=="saphome"){break}}else if(t[h].getStartDate()>g){break}}l=V.call(this,p);if(l){i=l;p=i.getId()}if(p&&p!=this._sFocusedAppointmentId){E.call(this,p)}else if(e._bPlanningCalendar&&i){i.focus()}else{this.fireLeaveRow({type:e.type})}}function z(e,t){var i=this.getIntervalType();var s=this._getStartDate();var r=new n(s.getTime());var o;var p=false;var l=0;var u=0;if(h(t).hasClass("sapUiCalendarRowAppsSubInt")){p=true;var g=h(h(t).parent()).children(".sapUiCalendarRowAppsSubInt");u=g.length;for(l=0;l<u;l++){var d=g[l];if(d==t){break}}}switch(i){case m.Hour:r.setUTCHours(r.getUTCHours()+e);if(p){r.setUTCMinutes(r.getUTCMinutes()+l*60/u);o=new n(r.getTime());o.setUTCMinutes(o.getUTCMinutes()+60/u)}else{o=new n(r.getTime());o.setUTCHours(o.getUTCHours()+1)}break;case m.Day:case m.Week:case m.OneMonth:r.setUTCDate(r.getUTCDate()+e);if(p){r.setUTCHours(r.getUTCHours()+l*24/u);o=new n(r.getTime());o.setUTCHours(o.getUTCHours()+24/u)}else{o=new n(r.getTime());o.setUTCDate(o.getUTCDate()+1)}break;case m.Month:r.setUTCMonth(r.getUTCMonth()+e);if(p){r.setUTCDate(r.getUTCDate()+l);o=new n(r.getTime());o.setUTCDate(o.getUTCDate()+1)}else{o=new n(r.getTime());o.setUTCMonth(o.getUTCMonth()+1)}break;default:throw new Error("Unknown IntervalType: "+i+"; "+this)}o.setUTCMilliseconds(o.getUTCMilliseconds()-1);r=a._createLocalDate(r,true);o=a._createLocalDate(o,true);this.fireIntervalSelect({startDate:r,endDate:o,subInterval:p})}function P(e,t){var i=e.getStartDate()-t.getStartDate();if(i==0){i=t.getEndDate()-e.getEndDate()}return i}return v});