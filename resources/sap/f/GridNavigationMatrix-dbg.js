/*!
 * OpenUI5
 * (c) Copyright 2009-2021 SAP SE or an SAP affiliate company.
 * Licensed under the Apache License, Version 2.0 - see LICENSE.txt.
 */
/*
 * IMPORTANT: This is a private module, its API must not be used and is subject to change.
 * Code other than the OpenUI5 libraries must not introduce dependencies to this module.
 */

sap.ui.define([], function () {
	"use strict";

	return {
		EMPTY_CELL: false,

		/**
		 * Creates a matrix (2D array) of dom refs representing the grid items ordered as rendered on the page
		 * @param {HTMLElement} oGridDomRef The grid
		 * @param {Array.<HTMLElement>} aItemsDomRefs The children
		 * @param {object} oLayoutSizes The sizes of the grid
		 * @param {Array.<string>} oLayoutSizes.rows Computed rows in pixels, i.e. : ["112px", "112px", "320px", "112px"]
		 * @param {Array.<string>} oLayoutSizes.columns Computed columns in pixels, i.e. : ["112px", "112px", "320px", "112px"]
		 * @param {number} oLayoutSizes.gap Gap in pixels
		 * @returns {Array.<Array.<HTMLElement>>} The matrix
		 */
		create: function (oGridDomRef, aItemsDomRefs, oLayoutSizes) {
			var aMatrix = Array.from(
				new Array(oLayoutSizes.rows.length),
				function () {
					return new Array(oLayoutSizes.columns.length).fill(this.EMPTY_CELL);
				}.bind(this)
			);

			aItemsDomRefs.forEach(function (oItemDomRef) {
				var oPos = this._getPosition(oGridDomRef, oItemDomRef, oLayoutSizes);

				this._addToMatrix(aMatrix, oPos, oItemDomRef);
			}.bind(this));

			return aMatrix;
		},

		_getPosition: function (oGridDomRef, oItemDomRef, oLayoutSizes) {
			var oGridRect = oGridDomRef.getBoundingClientRect(),
				oItemRect = oItemDomRef.getBoundingClientRect(),
				oGridRow = this._getGridRow(oGridRect, oItemRect, oLayoutSizes),
				oGridCol = this._getGridCol(oGridRect, oItemRect, oLayoutSizes);

			return {
				xFrom: oGridRow.start,
				xTo: oGridRow.end,
				yFrom: oGridCol.start,
				yTo: oGridCol.end
			};
		},

		_getGridRow: function (oGridRect, oItemRect, oLayoutSizes) {
			var iStartRow = -1,
				iEndRow = 0,
				fSumRows = 0,
				i,
				fTopOffsetInGrid = oItemRect.top - oGridRect.top,
				fBottomOffsetInGrid = fTopOffsetInGrid + oItemRect.height;

			for (i = 0; i < oLayoutSizes.rows.length; i++) {
				fSumRows += parseFloat(oLayoutSizes.rows[i]);

				if (iStartRow === -1 && fTopOffsetInGrid < fSumRows) {
					iStartRow = i;
				}

				fSumRows += oLayoutSizes.gap;

				if (fBottomOffsetInGrid < fSumRows) {
					iEndRow = i + 1;
					break;
				}
			}

			return {
				start: iStartRow,
				end: iEndRow
			};
		},

		_getGridCol: function (oGridRect, oItemRect, oLayoutSizes) {
			var iStartCol = -1,
				iEndCol = 0,
				fSumCols = 0,
				i,
				fLeftOffsetInGrid = oItemRect.left - oGridRect.left,
				fRightOffsetInGrid = fLeftOffsetInGrid + oItemRect.width;

			for (i = 0; i < oLayoutSizes.columns.length; i++) {
				fSumCols += parseFloat(oLayoutSizes.columns[i]);

				if (iStartCol === -1 && fLeftOffsetInGrid < fSumCols) {
					iStartCol = i;
				}

				fSumCols += oLayoutSizes.gap;

				if (fRightOffsetInGrid <= fSumCols) {
					iEndCol = i + 1;
					break;
				}
			}

			return {
				start: iStartCol,
				end: iEndCol
			};
		},

		_addToMatrix: function (aMatrix, oPosition, oDomRef) {
			var iRow, iCol;

			for (iRow = oPosition.xFrom; iRow < oPosition.xTo; iRow++) {
				for (iCol = oPosition.yFrom; iCol < oPosition.yTo; iCol++) {
					aMatrix[iRow][iCol] = oDomRef;
				}
			}
		}
	};

});