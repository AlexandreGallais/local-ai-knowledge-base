---
title: "Matrix math for the web (part 2 of 2)"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/webgl_api/matrix_math_for_the_web/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Matrix math for the web (part 2 of 2)

## Matrix composition

The real power of matrices comes from **matrix composition**. When matrices of a certain class are multiplied together they preserve the history of the transformations and are reversible. This means that if a translation, rotation, and scale matrix are all combined together, when the order of the matrices is reversed and re-applied, then the original points are returned.

The order that matrices are multiplied in matters. When multiplying numbers, a \* b = c, and b \* a = c are both true. For example 3 \* 4 = 12, and 4 \* 3 = 12. In math, these numbers would be described as **commutative**. Matrices are _not_ guaranteed to be the same if the order is switched, so matrices are **non-commutative**.

Another mind-bender is that matrix multiplication in WebGL and CSS needs to happen in the reverse order that the operations intuitively happen. For instance, to scale something down by 80%, move it down 200 pixels, and then rotate about the origin 90 degrees would look something like the following in pseudocode.

```plain
transformation = rotate * translate * scale
```

### Composing multiple transformations

The function that we will be using to compose our matrices is `multiplyArrayOfMatrices()`, which is part of the set of utility functions introduced near the top of this article. It takes an array of matrices and multiplies them together, returning the result. In WebGL shader code, this is built into the language and the `*` operator can be used.

```js
const transformMatrix = multiplyArrayOfMatrices([
  rotateZ(Math.PI * 0.5), // Step 3: rotate around 90 degrees
  translate(0, 200, 0), // Step 2: move down 200 pixels
  scale(0.8, 0.8, 0.8), // Step 1: scale down
]);

setTransform(transformMatrix);
```

Finally, a fun step to show how matrices work is to reverse the steps to bring the matrix back to the original identity matrix.

```js
const transformMatrix = multiplyArrayOfMatrices([
  scale(1.25, 1.25, 1.25), // Step 6: scale back up
  translate(0, -200, 0), // Step 5: move back up
  rotateZ(-Math.PI * 0.5), // Step 4: rotate back
  rotateZ(Math.PI * 0.5), // Step 3: rotate around 90 degrees
  translate(0, 200, 0), // Step 2: move down 200 pixels
  scale(0.8, 0.8, 0.8), // Step 1: scale down
]);
```

## Why matrices are important

Matrices are important because they comprise a small set of numbers that can describe a wide range of transformations in space. They can easily be shared around in programs. Different coordinate spaces can be described with matrices, and some matrix multiplication will move one set of data from one coordinate space to another coordinate space. Matrices effectively remember every part of the previous transforms that were used to generate them.

For uses in WebGL, the graphics card is particularly good at multiplying a large number of points in space by matrices. Different operations like positioning points, calculating lighting, and posing animated characters all rely on this fundamental tool.
