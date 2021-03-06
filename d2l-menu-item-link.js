/*
`d2l-menu-item-link`
Polymer-based web component for link menu items.
*/
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
import '@polymer/polymer/polymer-legacy.js';

import './d2l-menu-item-styles.js';
import './d2l-menu-item-behavior.js';
import { Polymer } from '@polymer/polymer/lib/legacy/polymer-fn.js';
import { afterNextRender } from '@polymer/polymer/lib/utils/render-status.js';
const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="d2l-menu-item-link">

	<template strip-whitespace="">
		<style include="d2l-menu-item-styles">

			:host {
				display: block;
				padding: 0;
			}

			:host > a {
				color: inherit;
				display: block;
				line-height: 1rem;
				outline: none;
				overflow-x: hidden;
				padding: 0.75rem 1rem;
				text-decoration: none;
				text-overflow: ellipsis;
				white-space: nowrap;
			}

		</style>
		<a href$="[[href]]" target$="[[target]]" tabindex="-1">[[text]]</a>
	</template>

	

</dom-module>`;

document.head.appendChild($_documentContainer.content);
Polymer({
	is: 'd2l-menu-item-link',

	behaviors: [
		D2L.PolymerBehaviors.MenuItemBehavior
	],

	properties: {

		/**
		 * Standard HTML href applied to link.
		 */
		href: String,

		/**
		 * Whether to prevent the default behavior.
		 */
		preventDefault: {
			type: Boolean,
			reflectToAttribute: true
		},

		/**
		 * Standard HTML target applied to link.
		 */
		target: String

	},

	attached: function() {
		afterNextRender(this, function() {
			this.listen(this, 'keydown', '_onKeyDown');
			this.listen(this.$$('a'), 'click', '_onClick');
		}.bind(this));
	},

	detached: function() {
		this.unlisten(this, 'keydown', '_onKeyDown');
		this.unlisten(this.$$('a'), 'click', '_onClick');
	},

	_getTarget: function() {
		if (this.target && this.target !== '') {
			return this.target;
		}
		var base = document.getElementsByTagName('base');
		if (base && base.length > 0) {
			base = base[0];
			return base.getAttribute('target');
		}
		return null;
	},

	_onClick: function(e) {
		if (this.preventDefault) {
			e.preventDefault();
		}
	},

	_onKeyDown: function(e) {
		if (this.preventDefault) {
			e.preventDefault();
			return;
		}
		if (e.keyCode === this.__keyCodes.ENTER || e.keyCode === this.__keyCodes.SPACE) {
			var target = this._getTarget();
			if (target === '_parent') {
				window.parent.location.assign(this.href);
			} else if (target === '_top') {
				window.top.location.assign(this.href);
			} else {
				window.location.assign(this.href);
			}
		}
	}

});
