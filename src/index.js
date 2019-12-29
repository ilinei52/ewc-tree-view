import TreeView from './tree-view';
import TreeViewItem from './tree-view-item';

// export as web component
window.customElements.define('tree-view', TreeView);
window.customElements.define('tree-view-item', TreeViewItem);

// export as objects to window
window['TreeView'] = TreeView;
window['TreeViewItem'] = TreeViewItem;

// export module
export default {
  TreeView,
  TreeViewItem,
};
