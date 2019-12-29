/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/tree-view.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/tree-view-item.js":
/*!*******************************!*\
  !*** ./src/tree-view-item.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
const template = document.createElement('template');

template.innerHTML = `
<style
</style> 
<li>
  <div> 
    <span class="caption">
      <slot></slot>
      <slot name="caption"></slot>
    </span>
  </div>
  <ul class="children">
    <slot name="children"></slot>
  </ul>
</li>
`;

/**
 * Class tree view
 */
class TreeViewItem extends HTMLElement {
  /**
   * Constructor
   * @param {object} options Component options
   */
  constructor(options) {
    super();
    this._options = options ? options : {};

    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    // Get HTMLElements
    this._$caption = this._shadowRoot.querySelector('.caption');
    this._$children = this._shadowRoot.querySelector('.children');
  }

  /**
   * Get all observed attributes
   * @return {Array<string>}
   */
  static get observedAttributes() {
    return ['children', 'caption', 'tooltip', 'states', 'payload'];
  }

  /**
   * @param  {string} name
   * @param  {string} oldValue
   * @param  {string} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
      case 'caption':
        this._caption = newValue;
        this._renderAttributes('caption');
        break;
      case 'tooltip':
        this._tooltip = newValue;
        this._renderAttributes('tooltip');
        break;
      case 'payload':
        this._payload = newValue;
        this._renderAttributes('payload');
        break;
      case 'children':
        this._open = newValue;
        this._renderAttributes('children');
        break;
    }
  }

  /**
   * Fires when a user element is first added to the DOM.
   */
  connectedCallback() {
    console.log('connectedCallback');
  }

  /**
   * Fires when a user element was removed from DOM.
   */
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  /**
   * Assign listeners
   */
  _assignListeners() {
    console.log('_assignListeners');
  }

  /**
   * Render by attributes
   * @param {string} attr
   * @param {string} value
   */
  _renderAttributes(attr, value) {
    const attrName = attr.replace(/^\w/, (c) => c.toUpperCase());
    const renderMethodName = `renderAttribute${attrName}`;
    if (this[renderMethodName] && typeof this[renderMethodName] === 'function') {
      this[renderMethodName](value);
    }
  }

  /**
   * Render by attributes
   * @param {string} value
   */
  renderAttributeCaption(value) {
  }

  // /**
  //  * Get HTMLElement
  //  * @param  {string} selector
  //  * @return {HTMLElement}
  //  */
  // _get$(selector) {
  //   return this._shadowRoot.querySelector(selector);
  // }
}

/* harmony default export */ __webpack_exports__["default"] = (TreeViewItem);


/***/ }),

/***/ "./src/tree-view.js":
/*!**************************!*\
  !*** ./src/tree-view.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _tree_view_item__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./tree-view-item */ "./src/tree-view-item.js");


const template = document.createElement('template');

template.innerHTML = `
<style>
/* Remove default bullets */
ul, #myUL {
  list-style-type: none;
}

/* Remove margins and padding from the parent ul */
#myUL {
  margin: 0;
  padding: 0;
}

/* Style the caret/arrow */// new CopyPlugin([
  //   {from: './src/examples', to: 'examples'},
  //   {from: './src/', to: '../dist'},
  // ]),
.caret {
  cursor: pointer;
  user-select: none; /* Prevent text selection */
}

/* Create the caret/arrow with a unicode, and style it */
.caret::before {
  content: "\\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

/* Rotate the caret/arrow icon when clicked on (using JavaScript) */
.caret-down::before {
  transform: rotate(90deg);
}

/* Hide the nested list */
.nested {
  display: none;
}

/* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
.active {
  display: block;
}
</style> 
<div>
  treeview
  <slot class="default-slot"></slot>
</div>
`;


/**
 * Class tree view
 */
class TreeView extends HTMLElement {
  /**
   * Constructor
   * @param {object} options Component options
   */
  constructor(options) {
    super();
    this._options = options ? options : {};

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    // Get HTMLElements ---
    this._$defaultSlot = this._shadowRoot.querySelector('.default-slot');
  }

  /**
   * Fires when a user element is first added to the DOM.
   */
  connectedCallback() {
    console.log('connectedCallback');
  }

  /**
   * Fires when a user element was removed from DOM.
   */
  disconnectedCallback() {
    console.log('disconnectedCallback');
  }

  /**
   * Get all observed attributes
   * @return {Array<string>}
   */
  static get observedAttributes() {
    return ['items'];
  }

  /**
   * @param  {string} name
   * @param  {string} oldValue
   * @param  {string} newValue
   */
  attributeChangedCallback(name, oldValue, newValue) {
    // switch(name){
    //   case 'id':
    //     this._id = newValue;
    //     break;
    //   case 'title':
    //     this._title = newValue;
    //     break;
    //   case 'open':
    //     this._open = newValue == "true" ? true : false;
    //     break;
    //   case 'position':
    //     this._open = newValue;
    //     break;
    // }
    this.render();
  }

  /**
   * Assign listeners
   */
  _assignListeners() {

  }

  /**
   * Component render function
   */
  render() {
    // if (this.hasOwnProperty('items')) {
    // }
  }

  // /**
  //  * Render property items
  //  */
  // _renderItems () {
  //   // create all tree-view-items this.items
  // }

  // /**
  //  * Render property items
  //  */
  // _renderItem (item) {
  //   return new TreeViewItem (item);
  // }
}

/* harmony default export */ __webpack_exports__["default"] = (TreeView);


/***/ })

/******/ });
//# sourceMappingURL=tree-view.js.map