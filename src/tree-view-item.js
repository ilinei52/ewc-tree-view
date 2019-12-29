const template = document.createElement('template');

template.innerHTML = `
<li>
  TreeViewItem
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

export default TreeViewItem;
