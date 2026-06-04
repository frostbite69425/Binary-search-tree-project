import Tree from "./TreeClass.js";

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

const createRandomArr = (n = 10) => {
  const returnArr = [];
  for (let i = 0; i < n; i++) {
    let randomNum = Math.floor(Math.random() * 100);
    returnArr.push(randomNum);
  }
  return returnArr;
};

const driver = () => {
  const arr = createRandomArr();
  const tree = new Tree(arr);
  prettyPrint(tree.root);
  console.log(`\n`);
  console.log(tree.isBalanced());
  console.log(`\n`);
  console.log("preorder");
  tree.preOrderForEach((val) => console.log(val));
  console.log(`\n`);
  console.log("inorder");
  tree.inOrderForEach((val) => console.log(val));
  console.log(`\n`);
  console.log("postorder");
  tree.postOrderForEach((val) => console.log(val));
  console.log(`\n`);
  tree.insert(101);
  tree.insert(103);
  tree.insert(145);
  tree.insert(190);
  prettyPrint(tree.root);
  console.log(`\n`);
  console.log(tree.isBalanced());
  tree.rebalance();
  console.log(`\n`);
  prettyPrint(tree.root);
  console.log(`\n`);
  console.log(tree.isBalanced());
  console.log(`\n`);
  console.log("preorder");
  tree.preOrderForEach((val) => console.log(val));
  console.log(`\n`);
  console.log("inorder");
  tree.inOrderForEach((val) => console.log(val));
  console.log(`\n`);
  console.log("postorder");
  tree.postOrderForEach((val) => console.log(val));
};

driver();
