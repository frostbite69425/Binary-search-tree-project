import Node from "./NodeClass.js";

class Tree {
  constructor(array) {
    const sortedArr = this.#sortArr(array);
    this.root = this.#buildTree(sortedArr);
  }

  #sortArr(array) {
    const returnArr = [];
    const sortedArr = array.sort((a, b) => a - b);
    for (let i = 0; i < sortedArr.length - 1; i++) {
      if (!returnArr.includes(sortedArr[i])) {
        returnArr.push(sortedArr[i]);
      }
    }
    return returnArr;
  }

  #buildTree(array) {
    const mid = Math.floor((array.length - 1) / 2);
    const root = new Node(array[mid]);

    const leftArr = array.slice(0, mid + 1);
    const rightArr = array.slice(mid + 1);
    if (leftArr.length === 1) {
      root.leftChildren = null;
    } else {
      root.leftChildren = this.#buildTree(leftArr);
    }
    if (rightArr.length === 1) {
      root.rightChildren = null;
    } else {
      root.rightChildren = this.#buildTree(rightArr);
    }

    return root;
  }
}

export default Tree;
