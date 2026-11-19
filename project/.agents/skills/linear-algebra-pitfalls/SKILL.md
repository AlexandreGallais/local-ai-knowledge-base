---
name: linear-algebra-pitfalls
description: "Avoids the classic numerical linear algebra mistakes - inverting matrices, ignoring conditioning, comparing results exactly. Use when solving linear systems, using matrix inverses, least squares, decompositions or rotations, or when results are unstable or slightly wrong."
metadata:
  id: SCI-11
  stars: "1"
  nature: reference
  mode: A
  wave: V4
  load: auto
---

# Linear algebra pitfalls

**Core rule:** solve, do not invert; check the condition number before trusting a solution.

## Procedure

1. Solve `A x = b` with a solver (`numpy.linalg.solve`, `scipy.linalg.lu_solve`, `Eigen` decompositions), never `inv(A) @ b`.
   - Check: no explicit inverse in the code.
2. Check conditioning: `numpy.linalg.cond(A)`; above about 1e12 for float64, results lose most digits.
   - Check: the value is logged or tested.
3. For least squares, use `lstsq` or QR, not the normal equations `inv(A.T A) A.T b`.
   - Check: the method is a stable one.
4. Compare results with tolerances (`numeric-precision`).
   - Check: tests use approximate assertions.

| Pitfall | Better |
| --- | --- |
| `inv(A) @ b` | `solve(A, b)` |
| Normal equations | QR or `lstsq` |
| Re-orthonormalising rotations ignored | renormalise periodically, or use quaternions |
| Exact equality on results | tolerance relative to the condition number |

## Stop and ask the human if

- The matrix is ill-conditioned and the model cannot be changed.

## Common mistakes

| If you think... | Reality |
| --- | --- |
| "The inverse is simpler." | It is slower and less accurate. |
| "Small residual means accurate x." | Not when the matrix is ill-conditioned. |

## Definition of done

- [ ] Solvers, not inverses; conditioning checked; tolerant comparisons.
