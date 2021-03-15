/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.getCore().loadLibrary("sap.ui.unified");sap.ui.define(["sap/ui/unified/calendar/CalendarDate","sap/ui/unified/calendar/CalendarUtils","sap/ui/unified/calendar/Month","sap/ui/core/date/UniversalDate","./PlanningCalendarLegend","sap/ui/core/InvisibleText","sap/ui/core/Core","sap/ui/unified/library"],function(e,a,t,n,l,i,s,r){"use strict";var o=r.CalendarDayType;var p={apiVersion:2};p.render=function(e,a){var t=a._getCoreLocaleData();var n=a._getDensitySizes();e.openStart("div",a);e.class("sapMSinglePCGrid");e.class("sapMSPCMonthGrid");e.openEnd();this.renderDayNames(e,a,t);e.openStart("div");e.class("sapMSinglePCGridContent");e.openEnd();this.renderCells(e,a,t,n);e.close("div");e.close("div")};p.renderCells=function(e,a,t,n){var l=a._getCells(),i=a._getVerticalLabels(),s=a._getColumns(),r=[],o=[],p,d,c,g,u=[],v,f,C,S;for(C=0;C<a._getRows();C++){f=0;e.openStart("div");e.attr("role","grid");e.class("sapMSPCMonthWeek");e.openEnd();e.openStart("div");e.class("sapMSPCMonthWeekNumber");e.openEnd();e.text(i[C]);e.close("div");for(S=0;S<s;S++){p=C*s+S;d=l[p];c=a._getAppointmetsForADay(d);g=a._getPreviousAppointmetsForADay(d);u.push(g);v=a._getMoreCountPerCell(p);r.push(v);o.push(c);f=Math.max(f,a._aAppsLevelsPerDay[p].length)}e.openStart("div");e.class("sapMSPCMonthDays");e.class("sapMSPCMonthDaysMax"+f);e.attr("role","row");e.openEnd();for(S=0;S<s;S++){p=C*s+S;d=l[p];this.renderDay(e,a,d,t,r[p],p)}e.openStart("div");e.class("sapMSinglePCBlockers");e.class("sapUiCalendarRowVisFilled");e.attr("role","list");e.openEnd();for(S=0;S<s;S++){p=C*s+S;d=l[p];if(S===0){this.renderAppointments(e,a,u[p],S,r[p],n)}this.renderAppointments(e,a,o[p],S,r[p],n)}e.close("div");e.close("div");e.close("div")}};p.renderDay=function(e,n,i,r,o,p){var d=n._getSpecialDates(),c=t.prototype._getDateTypes.call(n,i),g=n._getDateFormatter(),u,v;e.openStart("div");e.class("sapMSPCMonthDay");e.attr("role","gridcell");if(a._isWeekend(i,r)){e.class("nonWorkingTimeframe")}if(d){if(c&&c[0]){u=c[0];e.class("sapUiCalendarSpecialDay"+u.type);v=l.findLegendItemForItem(s.byId(n._sLegendId),u)}}e.attr("sap-ui-date",i.valueOf().toString());e.attr("tabindex",-1);e.attr("aria-labelledby",g.format(i.toLocalJSDate())+"-Descr");e.openEnd();this.renderDndPlaceholder(e,n.getAggregation("_appsPlaceholders")[p]);e.openStart("div");e.class("specialDateIndicator");e.openEnd();e.close("div");e.openStart("div");e.class("sapMSPCMonthDayNumber");e.openEnd();e.text(i.getDate());e.close("div");if(o){e.openStart("div");e.class("sapMSPCMonthLnkMore");e.openEnd();e.renderControl(n._getMoreLink(o,i,p));e.close("div")}e.openStart("span",g.format(i.toLocalJSDate())+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(n._getCellStartInfo(i.toLocalJSDate()));if(n._sLegendId&&v){e.text(v)}e.close("span");e.close("div")};p.renderAppointments=function(e,a,t,n,l,i){var s=a._getMaxAppointments(),r=l?s-2:s-1;for(var o=0;o<t.length;o++){if(t[o].level<=r){this.renderAppointment(e,a,t[o],n,i)}}};p.renderAppointment=function(e,a,t,n,l){var r=t.data,p=t.width,d=t.level,c=a._getColumns(),g=r.getTooltip_AsString(),u=r.getType(),v=r.getColor(),f=r.getTitle(),C=r.getText(),S=r.getIcon(),y=r.getId(),b={role:"listitem",labelledby:{value:i.getStaticId("sap.ui.unified","APPOINTMENT"),append:true},selected:null},h=c-n-p,A=s.getConfiguration().getRTL(),D,M=s.getConfiguration().getTheme().indexOf("_hc")?2:1;h=h<0?0:h;if(f){b["labelledby"].value=b["labelledby"].value+" "+y+"-Title"}b["labelledby"].value=b["labelledby"].value+" "+y+"-Descr";if(C){b["labelledby"].value=b["labelledby"].value+" "+y+"-Text"}if(r.getTentative()){b["labelledby"].value=b["labelledby"].value+" "+i.getStaticId("sap.ui.unified","APPOINTMENT_TENTATIVE")}if(r.getSelected()){b["labelledby"].value=b["labelledby"].value+" "+i.getStaticId("sap.ui.unified","APPOINTMENT_SELECTED")}e.openStart("div",r);e.attr("data-sap-level",d);e.attr("data-sap-width",p);e.attr("tabindex",0);if(g){e.attr("title",g)}e.accessibilityState(r,b);e.class("sapMSinglePCAppointmentWrap");e.class("sapUiCalendarRowApps");if(!v&&u!==o.None){e.class("sapUiCalendarApp"+u)}if(v){if(s.getConfiguration().getRTL()){e.style("border-right-color",v)}else{e.style("border-left-color",v)}}e.style(A?"right":"left","calc("+n*100/c+"% + "+M+"px)");e.style(A?"left":"right","calc("+h*100/c+"% + "+M+"px)");e.style("top",d*l.appHeight+l.cellHeaderHeight+"rem");e.openEnd();e.openStart("div");e.class("sapUiCalendarApp");if(r.getSelected()){e.class("sapUiCalendarAppSel")}if(r.getTentative()){e.class("sapUiCalendarAppTent")}if(S){e.class("sapUiCalendarAppWithIcon")}e.openEnd();e.openStart("div");e.class("sapUiCalendarAppCont");if(v){e.style("background-color",r._getCSSColorForBackground(v))}e.openEnd();if(t.hasPrevious<0){D=["sapUiCalendarAppArrowIconLeft","sapUiCalendarAppArrowIcon"];e.icon("sap-icon://arrow-left",D,{title:null})}if(S){D=["sapUiCalendarAppIcon"];var m={};m["id"]=y+"-Icon";m["title"]=null;e.icon(S,D,m)}if(f){e.openStart("span",y+"-Title");e.class("sapUiCalendarAppTitle");e.openEnd();e.text(f,true);e.close("span")}if(t.hasNext<0){D=["sapUiCalendarAppArrowIconRight","sapUiCalendarAppArrowIcon"];e.icon("sap-icon://arrow-right",D,{title:null})}e.openStart("span",y+"-Descr");e.class("sapUiInvisibleText");e.openEnd();e.text(a._getAppointmentAnnouncementInfo(r));e.close("span");e.close("div");e.close("div");e.close("div")};p.renderDayNames=function(e,a,t){var n=t.getFirstDayOfWeek(),l=a.getId(),i,r=s.getConfiguration().getCalendarType(),o=t.getDaysStandAlone("abbreviated",r),p=t.getDaysStandAlone("wide",r),d;e.openStart("div",l+"-Names");e.class("sapMSPCMonthDayNames");e.openEnd();for(var c=0;c<7;c++){d=(c+n)%7;i=l+"-WH"+d;e.openStart("div",i);e.class("sapUiCalWH");if(c===0){e.class("sapUiCalFirstWDay")}e.accessibilityState(null,{role:"columnheader",label:p[d]});e.openEnd();e.text(o[d%7]);e.close("div")}e.close("div")};p.renderDndPlaceholder=function(e,a){e.openStart("div");e.class("sapMSinglePCOverlay");e.openEnd();e.renderControl(a);e.close("div")};return p},true);