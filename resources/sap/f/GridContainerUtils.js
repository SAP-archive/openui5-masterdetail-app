/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
sap.ui.define([],function(){"use strict";return{isAbove:function(t,e){var n=t.getDomRef().getBoundingClientRect().top,i=e.getBoundingClientRect().top;return i-n<0},isBelow:function(t,e){var n=t.getDomRef().getBoundingClientRect().top,i=e.getBoundingClientRect().top;return i-n>0},findClosest:function(t,e){var n=null,i=Number.POSITIVE_INFINITY,o=t.getDomRef().getBoundingClientRect().left,u=t.getDomRef().getBoundingClientRect().top;e.forEach(function(t){var e=t.getBoundingClientRect().left,g=t.getBoundingClientRect().top;var r=(e-o)*(e-o)+(g-u)*(g-u);if(r<i){n=t;i=r}});return n},findClosestGridContainer:function(t,e){var n=null,i=Number.POSITIVE_INFINITY,o=t.getDomRef().getBoundingClientRect().top;e.forEach(function(t){var e=t.getBoundingClientRect().top;var u=(e-o)*(e-o);if(u<i){n=t;i=u}});return n}}});