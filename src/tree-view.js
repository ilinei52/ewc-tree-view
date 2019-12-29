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

    // Generate getters and setters from observed attributes
    const oAttrs = TreeView.observedAttributes;
    if (oAttrs && Array.isArray(oAttrs)) {
      oAttrs.forEach((attr) => {
        Object.defineProperty(_this, attr, {
          get: function() {
            console.log('Get observed item');
            try {
              return JSON.parse(_this.getAttribute(attr));
            } catch (ex) {
              return _this.getAttribute(attr);
            }
          },
          set: function(val) {
            console.log(`Set observed item ${val}`);
            const _val = JSON.stringify(val);
            _this.setAttribute(attr, _val);
          },
        });
      });
    }
  }

  /**
   * Fires when a user element is first added to the DOM.
   */
  connectedCallback() {
    console.log('connectedCallback');
    // console.log(JSON.stringify(this.getAttribute('items')));
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
    // this.render();
  }

  /**
   * Assign listeners
   */
  // _assignListeners() {

  // }

  /**
   * Component render function
   * @param{HTMLElement} el HTML element to render
   */
  renderTo(el) {
    if (el && el instanceof HTMLElement) {
      el.appendChild(this);
    } else {
      throw new Error('Can render only in HTMLElement');
    }
  }

  // /**
  //  * @param  {Array<object>} items
  //  */
  // set items(items) {
  //   this.setAttribute('items', items);
  //   // this._items = items;
  //   // this._render('data', data);
  // }

  // get items() {
  //   return this.getAttribute('items');
  // }

  // _render_data() {
  // }

  // _render(attr, value) {
  //   if (attr) {

  //   } else {

  //   }
  // }

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

export default TreeView;
