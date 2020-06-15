/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/support/library"],function(t){"use strict";var e=t.Categories,n=t.Severity,o=t.Audiences;var i=["sap.ui.comp.smartvariants.SmartVariantManagement","sap.m.SplitButton"];function r(t){if(t){for(var e=0;e<i.length;e++){if(t.isA(i[e])){return true}}}return false}function s(t){if(!t){return false}if(r(t.getParent())){return true}if(t.getParent()&&r(t.getParent().getParent())){return true}return false}var a={id:"onlyIconButtonNeedsTooltip",audiences:[o.Control],categories:[e.Accessibility],enabled:true,minversion:"1.28",title:"Button: Consists of only an icon, needs a tooltip",description:"A button without text needs a tooltip, so that the user knows what the button does",resolution:"Add a value to the tooltip property of the button",resolutionurls:[{text:"SAP Fiori Design Guidelines: Button",href:"https://experience.sap.com/fiori-design-web/button/#guidelines"}],check:function(t,e,o){o.getElementsByClassName("sap.m.Button").forEach(function(e){if(e.getProperty("icon")&&!e.getProperty("text")&&!e.getAggregation("tooltip")){var o=e.getId(),i=e.getMetadata().getElementName();if(!s(e)){t.addIssue({severity:n.Medium,details:"Button '"+i+"' ("+o+") consists of only an icon but has no tooltip",context:{id:o}})}}})}};return[a]},true);