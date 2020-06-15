/*!
 * OpenUI5
 * (c) Copyright 2009-2020 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{_place:function(t){var n=this._super._place.apply(this,arguments),i=t&&t.routeConfig||{},a=this;return this._oTargetHandler._chainNavigation(function(){return n.then(function(n){a._oTargetHandler.addNavigation({navigationIdentifier:a._oOptions._name,transition:a._oOptions.transition,transitionParameters:a._oOptions.transitionParameters,eventData:t,targetControl:n.control,view:n.view,layout:i.layout});return n})})}}},true);