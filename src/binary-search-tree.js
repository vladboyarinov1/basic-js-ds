const { NotImplementedError } = require('../extensions/index.js');
const { Node } = require('../extensions/list-tree.js');

class BinarySearchTree {
  constructor() {
    this.treeRoot = null;
  }

  root() {
    return this.treeRoot;
  }

  add(data) {
    function addNode(node, data) {
      if (node == null) {
        return new Node(data);
      }
      if (node.data == data) {
        return node;
      }
      if (node.data > data) {
        node.left = addNode(node.left, data);
      } else if (node.data < data) {
        node.right = addNode(node.right, data);
      }
      return node;
    }
    this.treeRoot = addNode(this.treeRoot, data);
  }

  has(data) {
    return !!this.find(data);
  }

  find(data) {
    return findNode(this.treeRoot, data);

    function findNode(node, data) {
      if (node === null) {
        return null;
      }
      if (node.data === data) {
        return node;
      }
      if (node.data > data) {
        return findNode(node.left, data);
      } else if (node.data < data) {
        return findNode(node.right, data);
      }
    }
  }

  remove(data) {
    this.treeRoot = deleteNode(this.treeRoot, data);

    function deleteNode(node, data) {
      if (node === null) {
        return;
      }
      if (node.data === data) {
        if (!node.left && !node.right) {
          return null;
        } else if (!node.left) {
          node = node.right;
          return node;
        } else if (!node.right) {
          node = node.left;
          return node;
        } else {
          let maxLeft = node.left;
          while (maxLeft.right) {
            maxLeft = maxLeft.right;
          }
          node.data = maxLeft.data;
          maxLeft = null;
          return node;
        }
      } else if (node.data > data) {
        node.left = deleteNode(node.left, data);
        return node;
      } else if (node.data < data) {
        node.right = deleteNode(node.right, data);
        return node;
      }
    }
  }

  min() {
    let current = this.treeRoot;
    if (!current) {
      return;
    }

    while (current.left) {
      current = current.left;
    }
    return current.data;
  }

  max() {
    let current = this.treeRoot;
    if (!current) {
      return;
    }

    while (current.right) {
      current = current.right;
    }
    return current.data;
  }
}
module.exports = {
  BinarySearchTree
};