---
id: matrices
title: "SVG geometry: transforms and matrices"
topic: geometry
summary: "The SVG matrix [a, b, c, d, e, f], translate, scale, rotate, skew, order of composition, inverse, decomposition."
tool: svg
version: "2"
checked: 2026-11-13
sources: [S6, S7, S8, S13]
license: MIT, written for this base; facts from the sources below
---

# SVG geometry: transforms and matrices

Contents: identityMatrix · translationMatrix · scaleMatrix · rotationMatrix · skewXMatrix · skewYMatrix · multiplyMatrices · composeMatrices · rotationAroundMatrix · matrixDeterminant · invertMatrix · applyMatrixToPoint · matrixToString · decomposeMatrix · Sources

A matrix is the tuple `[a, b, c, d, e, f]` of `matrix(a b c d e f)`: x' = a*x + c*y + e, y' = b*x + d*y + f. The kit does not use `DOMMatrix`: it does not exist in Node.

Conventions: user units, y axis down, angles in degrees from the +x axis, clockwise on screen. Compare results with a tolerance.

## identityMatrix

Formula: [1, 0, 0, 1, 0, 0]

Example: `identityMatrix()` gives `[1,0,0,1,0,0]`.

Pitfall: none special; compare the result with a tolerance, never with ===.

Kit: `identityMatrix(): Matrix` in `kit/geometry/identity-matrix.ts`.

Sources: [S6]

## translationMatrix

Formula: [1, 0, 0, 1, tx, ty]

Example: `translationMatrix(30, 40)` gives `[1,0,0,1,30,40]`.

Pitfall: none special; compare the result with a tolerance, never with ===.

Kit: `translationMatrix(tx: number, ty: number): Matrix` in `kit/geometry/translation-matrix.ts`.

Sources: [S7]

## scaleMatrix

Formula: [sx, 0, 0, sy, 0, 0]

Example: `scaleMatrix(2, 3)` gives `[2,0,0,3,0,0]`.

Pitfall: A scale of 0 gives a matrix with no inverse. A negative scale mirrors.

Kit: `scaleMatrix(sx: number, sy: number): Matrix` in `kit/geometry/scale-matrix.ts`.

Sources: [S7]

## rotationMatrix

Formula: [cos, sin, -sin, cos, 0, 0]

Example: `rotationMatrix(90)` gives `[0,1,-1,0,0,0]`.

Pitfall: Rotation about the origin of the current system, not about the element.

Kit: `rotationMatrix(angleDegrees: number): Matrix` in `kit/geometry/rotation-matrix.ts`.

Sources: [S7]

## skewXMatrix

Formula: [1, 0, tan(a), 1, 0, 0]

Example: `skewXMatrix(45)` gives `[1,0,1,1,0,0]`.

Pitfall: a = 90: tan is huge, the result is unusable.

Kit: `skewXMatrix(angleDegrees: number): Matrix` in `kit/geometry/skew-x-matrix.ts`.

Sources: [S7]

## skewYMatrix

Formula: [1, tan(a), 0, 1, 0, 0]

Example: `skewYMatrix(45)` gives `[1,1,0,1,0,0]`.

Pitfall: Same as skewXMatrix.

Kit: `skewYMatrix(angleDegrees: number): Matrix` in `kit/geometry/skew-y-matrix.ts`.

Sources: [S7]

## multiplyMatrices

Formula: m * n = [m.a*n.a + m.c*n.b, m.b*n.a + m.d*n.b, m.a*n.c + m.c*n.d, m.b*n.c + m.d*n.d, m.a*n.e + m.c*n.f + m.e, m.b*n.e + m.d*n.f + m.f]

Example: `multiplyMatrices(translationMatrix(100,0), rotationMatrix(90))` gives `[0,1,-1,0,100,0]`.

Pitfall: Not commutative. In m * n, n acts on the point first. Same result as `m.multiply(n)` of `DOMMatrix`.

Kit: `multiplyMatrices(m: Matrix, n: Matrix): Matrix` in `kit/geometry/multiply-matrices.ts`.

Sources: [S6] [S13]

## composeMatrices

Formula: A * B * C for [A, B, C]: the order of an SVG transform list

Example: `composeMatrices([translationMatrix(80,80), scaleMatrix(1.5,1.5), rotationMatrix(45)])` gives `[1.060660172,1.060660172,-1.060660172,1.060660172,80,80]`.

Pitfall: An empty list gives the identity. The last matrix acts on the point first.

Kit: `composeMatrices(matrices: readonly Matrix[]): Matrix` in `kit/geometry/compose-matrices.ts`.

Sources: [S7]

## rotationAroundMatrix

Formula: translate(cx, cy) * rotate(a) * translate(-cx, -cy): the SVG `rotate(a cx cy)`

Example: `rotationAroundMatrix(90, 50, 50)` gives `[0,1,-1,0,100,0]`.

Pitfall: The centre is in the current user system.

Kit: `rotationAroundMatrix(angleDegrees: number, cx: number, cy: number): Matrix` in `kit/geometry/rotation-around-matrix.ts`.

Sources: [S7]

## matrixDeterminant

Formula: a*d - b*c

Example: `matrixDeterminant([3,1,-1,3,30,40])` gives `10`.

Pitfall: 0: no inverse. Negative: the matrix mirrors. Its absolute value is the area factor.

Kit: `matrixDeterminant(m: Matrix): number` in `kit/geometry/matrix-determinant.ts`.

Sources: [E]

## invertMatrix

Formula: det = a*d - b*c; [d/det, -b/det, -c/det, a/det, (c*f - d*e)/det, (b*e - a*f)/det]

Example: `invertMatrix([2,0,0,2,0,50])` gives `[0.5,0,0,0.5,0,-25]`.

Pitfall: det = 0: throws `RangeError`. `DOMMatrix.inverse()` does not throw: it returns NaN in every field.

Kit: `invertMatrix(m: Matrix): Matrix` in `kit/geometry/invert-matrix.ts`.

Sources: [S6]

## applyMatrixToPoint

Formula: (a*x + c*y + e, b*x + d*y + f)

Example: `applyMatrixToPoint([3,1,-1,3,30,40], {x:10,y:10})` gives `{'x':50,'y':80}`.

Pitfall: For a vector (a direction), drop e and f.

Kit: `applyMatrixToPoint(m: Matrix, p: Point): Point` in `kit/geometry/apply-matrix-to-point.ts`.

Sources: [S6] [S8]

## matrixToString

Formula: `matrix(a b c d e f)`, six decimals

Example: `matrixToString(rotationMatrix(90))` gives `'matrix(0 1 -1 0 0 0)'`.

Pitfall: Never write NaN in an attribute: the formatter throws.

Kit: `matrixToString(m: Matrix): string` in `kit/geometry/matrix-to-string.ts`.

Sources: [S8]

## decomposeMatrix

Formula: sx = hypot(a, b); r = atan2(b, a); sy = det / sx; shear = (a*c + b*d) / sx; skewX = atan(shear / sy). m = translate * rotate(r) * skewX * scale(sx, sy)

Example: `decomposeMatrix(composeMatrices([translationMatrix(10,20), rotationMatrix(30), scaleMatrix(2,3)]))` gives `{'translateX':10,'translateY':20,'rotationDegrees':30,'skewXDegrees':0,'scaleX':2,'scaleY':3}`.

Pitfall: First column zero: throws `RangeError`. A mirror gives a negative sy. The parts are not unique: other orders give other values.

Kit: `decomposeMatrix(m: Matrix): MatrixParts` in `kit/geometry/decompose-matrix.ts`.

Sources: [E]

## Sources

- [S6] W3C, 2025, "Geometry Interfaces Module Level 1", <https://www.w3.org/TR/geometry-1/>.
- [S7] W3C, 2019, "CSS Transforms Module Level 1", <https://www.w3.org/TR/css-transforms-1/>.
- [S8] MDN (Mozilla), page modifiée le 19 juin 2026, "transform", <https://developer.mozilla.org/en-US/docs/Web/SVG/Reference/Attribute/transform>.
- [S13] MDN, page modifiée le 2 février 2025, "DOMMatrixReadOnly: multiply() method", <https://developer.mozilla.org/docs/Web/API/DOMMatrixReadOnly/multiply>.
- [E] Run on Node 22 by the research of this base, 2026-11-13: the values shown were produced by running the code.
