/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define(["sap/ui/core/Control","sap/ui/core/Configuration","sap/f/shellBar/CoPilotRenderer"],function(e,t,n){"use strict";var o=e.extend("sap.f.shellBar.CoPilot",{metadata:{library:"sap.f",events:{press:{}}},renderer:n});o.prototype.ontap=function(e){e.setMarked();this.firePress({})};o.prototype.getAnimation=function(){return sap.ui.getCore().getConfiguration().getAnimationMode()!==t.AnimationMode.none};return o});