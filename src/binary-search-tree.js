const { NotImplementedError } = require("../extensions/index.js");

const { Node } = require("../extensions/list-tree.js");

/**
 * Implement simple binary search tree according to task description
 * using Node from extensions
 */
module.exports = class BinarySearchTree {
  root() {
    return this._root || null;
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data);
      return;
    }

    const searchPlace = (node) => {
      if (data < node.data) {
        if (node.left === null) {
          node.left = new Node(data);
          return;
        }
        searchPlace(node.left);
      } else if (data > node.data) {
        if (node.right === null) {
          node.right = new Node(data);
          return;
        }
        searchPlace(node.right);
      }
    };

    searchPlace(this._root);
  }

  has(data) {
    let current = this._root;
    while (current) {
      if (data === current.data) {
        return true;
      }
      if (data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }

  find(data) {
    let current = this._root;
    while (current.data !== data) {
      if (current.left && data < current.data) {
        current = current.left;
      } else {
        current = current.right;
      }
      if (current === null) {
        return null;
      }
    }
    return current;
  }

  remove(data) {
    const removeNode = (node, data) => {
      if (node === null) {
        return null;
      }
      if (data === node.data) {
        if (node.left === null || node.right === null) {
          return node.left || node.right;
        }
        let tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.data = tempNode.data;
        node.right = removeNode(node.right, tempNode.data);
        return node;
      }

      if (data < node.data) {
        node.left = removeNode(node.left, data);
        return node;
      }
      node.right = removeNode(node.right, data);
      return node;
    };

    this._root = removeNode(this._root, data);
  }

  min() {
    let current = this._root;
    while (current.left !== null) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this._root;
    while (current.right !== null) {
      current = current.right;
    }
    return current.data;
  }
};
