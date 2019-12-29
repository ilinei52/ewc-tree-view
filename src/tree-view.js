import TreeViewItem from './tree-view-item';

// import TreeViewItem from './tree-view-item';

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
  TreeView
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

    this._shadowRoot = this.attachShadow({mode: 'open'});
    this._shadowRoot.appendChild(template.content.cloneNode(true));

    // Get HTMLElements ---
    this._$defaultSlot = this._shadowRoot.querySelector('.default-slot');

    this._init();
  }

  /**
   * init object web component
   */
  _init() {
    const _this = this;

    // ---------------------------------------------------------------
    //  Generate getters and setters from observed attributes
    //  Description:
    //  _this[attr] equals _this.getAttribute(attr)
    //  _this[attr] = _val equals _this.setAttribute(attr, _val)
    const oAttrs = TreeView.observedAttributes;
    if (oAttrs && Array.isArray(oAttrs)) {
      oAttrs.forEach((attr) => {
        Object.defineProperty(_this, attr, {
          get: function() {
            try {
              return JSON.parse(_this.getAttribute(attr));
            } catch (ex) {
              return _this.getAttribute(attr);
            }
          },
          set: function(val) {
            const _val = JSON.stringify(val);
            _this.setAttribute(attr, _val);
          },
        });
      });
    }

    // ---------------------------------------------------------------
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
    console.log(`attributeChangedCallback ${newValue}`);
    if (name === 'items') {
      if (this.items && Array.isArray(this.items)) {
        const items = this.items;
        const _this = this;
        items.forEach((treeItem) => {
          const item = new TreeViewItem(treeItem);
          _this.appendChild(item);
        });
      }
    }
  }
}

export default TreeView;
