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

prettyPrint(test.root);
console.log(test);
