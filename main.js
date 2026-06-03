import Tree from "./TreeClass.js";

let test = new Tree([1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324]);

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null || node === undefined) {
    return;
  }

  prettyPrint(
    node.rightChildren,
    `${prefix}${isLeft ? "│   " : "    "}`,
    false,
  );
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  prettyPrint(node.leftChildren, `${prefix}${isLeft ? "    " : "│   "}`, true);
};

// prettyPrint(test.root);
test.insert(70);
test.insert(71);
test.insert(72);
test.insert(8.5);
// console.log(`\n`);
prettyPrint(test.root);
// console.log(`\n`);
// test.levelOrderForEachIterative((el) => console.log(el));
// console.log(`\n`);
// test.levelOrderForEachRecursive((el) => console.log(el));
// console.log(`\n`);
// test.inOrderForEach((el) => console.log(el));
// console.log(`\n`);
// test.preOrderForEach((el) => console.log(el));
// console.log(`\n`);
// test.postOrderForEach((el) => console.log(el));

console.log(`\n`);
console.log(`height: ${test.height(4)}`);
console.log(`\n`);
console.log(`depth: ${test.depth(4)}`);
console.log(`\n`);
console.log(test.isBalanced());
console.log(test.rebalance());
console.log(`\n`);
prettyPrint(test.root);
console.log(`\n`);
console.log(test.isBalanced());
console.log(test.includes(97460743));
// let newTree = test.rebalance();
// console.log(`\n`);
// prettyPrint(newTree.root);
// console.log(newTree.isBalanced());

// test.deleteItem(7);
// prettyPrint(test.root);
// console.log(`\n`);
// test.deleteItem(1);
// prettyPrint(test.root);
// console.log(`\n`);
// test.deleteItem(67);
// prettyPrint(test.root);
// console.log(test.includes(69));
// console.log(test.includes(67));
