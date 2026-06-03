import Node from "./NodeClass.js";

class Tree {
  constructor(array) {
    const sortedArr = this.#sortArr(array);
    this.root = this.#buildTree(sortedArr);
  }

  #sortArr(array) {
    const returnArr = [];
    const sortedArr = array.sort((a, b) => a - b);
    for (let i = 0; i < sortedArr.length; i++) {
      if (!returnArr.includes(sortedArr[i])) {
        returnArr.push(sortedArr[i]);
      }
    }
    return returnArr;
  }

  #buildTree(array) {
    const mid = Math.floor((array.length - 1) / 2);
    const root = new Node(array[mid]);

    if (array.length === 2) {
      if (array[0] > array[1]) {
        root.leftChildren = new Node(array[1]);
      } else {
        root.rightChildren = new Node(array[1]);
      }
    } else if (array.length > 2) {
      const leftArr = array.slice(0, mid);
      const rightArr = array.slice(mid + 1);
      root.leftChildren = this.#buildTree(leftArr);
      root.rightChildren = this.#buildTree(rightArr);
    }

    return root;
  }

  includes(value) {
    let nextNode;
    const root = this.root;
    if (root.data === value) {
      return true;
    } else if (value > root.data) {
      nextNode = root.rightChildren;
    } else if (value < root.data) {
      nextNode = root.leftChildren;
    }

    while (nextNode) {
      if (value == nextNode.data) {
        return true;
      } else if (value < nextNode.data) {
        nextNode = nextNode.leftChildren;
      } else {
        nextNode = nextNode.rightArr;
      }
    }

    return false;
  }

  insert(value, node = this.root) {
    if (node === null) {
      return new Node(value);
    }

    if (value > node.data) {
      node.rightChildren = this.insert(value, node.rightChildren);
    } else if (value < node.data) {
      node.leftChildren = this.insert(value, node.leftChildren);
    }
    return node;
  }

  #successorNode(node) {
    let nextNode = node.rightChildren;
    while (nextNode.leftChildren) {
      nextNode = nextNode.leftChildren;
    }
    return nextNode;
  }

  deleteItem(value, node = this.root) {
    if (node === null) {
      return node;
    }
    if (value > node.data) {
      node.rightChildren = this.deleteItem(value, node.rightChildren);
    } else if (value < node.data) {
      node.leftChildren = this.deleteItem(value, node.leftChildren);
    } else {
      if (node.leftChildren === null) {
        return node.rightChildren;
      } else if (node.rightChildren === null) {
        return node.leftChildren;
      }

      const successor = this.#successorNode(node);
      node.data = successor.data;
      node.right = this.deleteItem(node.data, node.rightChildren);
    }
    return node;
  }

  levelOrderForEachIterative(callback, queue = [this.root]) {
    if (!callback && typeof callback !== "function") {
      throw new Error("You need to provide a callback function!");
    }
    let currentNode;
    for (let i = 0; i < queue.length; i++) {
      currentNode = queue.shift();
      i--;
      callback(currentNode.data);
      if (currentNode.leftChildren !== null) {
        queue.push(currentNode.leftChildren);
      }
      if (currentNode.rightChildren !== null) {
        queue.push(currentNode.rightChildren);
      }
    }
    return;
  }

  levelOrderForEachRecursive(callback, queue = [this.root]) {
    if (!callback && typeof callback !== "function") {
      throw new Error("You need to provide a callback function!");
    }
    if (queue.length === 0) {
      return;
    }
    let currentNode = queue.shift();
    callback(currentNode.data);
    if (currentNode.leftChildren !== null) {
      queue.push(currentNode.leftChildren);
    }
    if (currentNode.rightChildren !== null) {
      queue.push(currentNode.rightChildren);
    }
    this.levelOrderForEachIterative(callback, queue);
  }

  inOrderForEach(callback, node = this.root) {
    if (!callback && typeof callback !== "function") {
      throw new Error("You need to provide a callback function!");
    }
    if (node === null) {
      return;
    }

    if (node.leftChildren) {
      this.inOrderForEach(callback, node.leftChildren);
    }
    callback(node.data);

    if (node.rightChildren) {
      this.inOrderForEach(callback, node.rightChildren);
    }
  }

  preOrderForEach(callback, node = this.root) {
    if (!callback && typeof callback !== "function") {
      throw new Error("You need to provide a callback function!");
    }
    if (node === null) {
      return;
    }

    callback(node.data);

    if (node.leftChildren) {
      this.preOrderForEach(callback, node.leftChildren);
    }

    if (node.rightChildren) {
      this.preOrderForEach(callback, node.rightChildren);
    }
  }

  postOrderForEach(callback, node = this.root) {
    if (!callback && typeof callback !== "function") {
      throw new Error("You need to provide a callback function!");
    }
    if (node === null) {
      return;
    }

    if (node.leftChildren) {
      this.postOrderForEach(callback, node.leftChildren);
    }

    if (node.rightChildren) {
      this.postOrderForEach(callback, node.rightChildren);
    }

    callback(node.data);
  }

  #nodeDepth(node = this.root) {
    if (node === null) {
      return -1;
    }

    let leftHeight = this.#nodeDepth(node.leftChildren);
    let rightHeight = this.#nodeDepth(node.rightChildren);

    return Math.max(leftHeight, rightHeight) + 1;
  }

  height(value) {
    let currentNode = this.root;
    while (currentNode !== null && currentNode.data !== value) {
      if (value > currentNode.data) {
        currentNode = currentNode.rightChildren;
      } else {
        currentNode = currentNode.leftChildren;
      }
    }

    if (currentNode === null) {
      return undefined;
    }

    return this.#nodeDepth(currentNode);
  }

  depth(value) {
    let depth = 0;
    let currentNode = this.root;
    while (currentNode.data !== value && currentNode !== null) {
      if (value > currentNode.data) {
        currentNode = currentNode.rightChildren;
        depth++;
      } else {
        currentNode = currentNode.leftChildren;
        depth++;
      }
    }

    if (currentNode === null) {
      return undefined;
    } else {
      return depth;
    }
  }

  isBalanced(node = this.root) {
    if (node === null) {
      return true;
    }

    let leftBalance = this.isBalanced(node.leftChildren);
    let rightBalance = this.isBalanced(node.rightChildren);

    let leftHeight = 0;
    let rightHeight = 0;

    if (node.leftChildren) {
      leftHeight = this.height(node.leftChildren.data);
    }
    if (node.rightChildren) {
      rightHeight = this.height(node.rightChildren.data);
    }

    if (
      Math.abs(leftHeight - rightHeight) <= 1 &&
      leftBalance &&
      rightBalance
    ) {
      return true;
    }
    return false;
  }
}

export default Tree;
