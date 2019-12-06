import htmlTpl from './tree-view.tpl.html';
import styleTPl from './tree-view.tpl.css';

const template = document.createElement('template');

template.innerHTML = `
<style>${styleTPl}</style> 
${htmlTpl}
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

    // slots
    // this._slots = {
    //   default: this._shadowRoot.querySelector('default-slot'),
    // };


    this._toggler = this._shadowRoot.querySelectorAll('.caret');
  }

  /**
   * Assign listeners
   */
  _assignListeners() {
    const tgl = this._toggler;

    for (let i = 0; i < tgl.length; i++) {
      tgl[i].addEventListener('click', function() {
        console.log('click');
        tgl[i].parentElement.querySelector('.nested').classList.toggle('active');
        tgl[i].classList.toggle('caret-down');
      });
    }
  }

  /**
   * Fires when a user element is first added to the DOM.
   */
  connectedCallback() {
    this._assignListeners();
  }
}

export default TreeView;
