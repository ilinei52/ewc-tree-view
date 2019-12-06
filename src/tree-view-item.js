import htmlTpl from './tree-view-item.tpl.html';
import styleTPl from './tree-view-item.tpl.css';

const template = document.createElement('template');

template.innerHTML = `
<style>${styleTPl}</style> 
${htmlTpl}
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
  }

  /**
   * Assign listeners
   */
  _assignListeners() {

  }

  /**
   * Fires when a user element is first added to the DOM.
   */
  connectedCallback() {
    this._assignListeners();
  }
}

export default TreeViewItem;
