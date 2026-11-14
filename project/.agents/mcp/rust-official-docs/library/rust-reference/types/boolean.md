---
title: "Boolean type"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types/boolean.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[type.bool]
# Boolean type

r[type.bool.intro]
```rust
let b: bool = true;
```

The *boolean type* or *bool* is a primitive data type that can take on one of two values, called *true* and *false*.

r[type.bool.literal]
Values of this type may be created using a [literal expression] using the keywords `true` and `false` corresponding to the value of the same name.

r[type.bool.namespace]
This type is a part of the [language prelude] with the [name] `bool`.

r[type.bool.layout]
An object with the boolean type has a [size and alignment] of 1 each.

r[type.bool.repr]
The value false has the bit pattern `0x00` and the value true has the bit pattern `0x01`. It is [undefined behavior] for an object with the boolean type to have any other bit pattern.

r[type.bool.use]
The boolean type is the type of many operands in various [expressions]:

r[type.bool.use-in-condition]
* The condition operand in [if expressions] and [while expressions]

r[type.bool.use-in-lazy-operator]
* The operands in lazy boolean operator expressions

> **Note:**
> The boolean type acts similarly to but is not an [enumerated type]. In practice, this mostly means that constructors are not associated to the type (e.g. `bool::true`).

r[type.bool.traits]
Like all primitives, the boolean type implements the traits `Clone`, `Copy`, `Sized`, `Send`, and `Sync`.

> **Note:**
> See the standard library docs for library operations.

r[type.bool.expr]
## Operations on boolean values

r[type.bool.expr.intro]
When using certain operator expressions with a boolean type for its operands, they evaluate using the rules of [boolean logic].

r[type.bool.expr.not]
### Logical not

| `b` | `!b` |
|- | - |
| `true` | `false` |
| `false` | `true` |

r[type.bool.expr.or]
### Logical or

| `a` | `b` | `a \| b` |
|- | - | - |
| `true` | `true` | `true` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

r[type.bool.expr.and]
### Logical and

| `a` | `b` | `a & b` |
|- | - | - |
| `true` | `true` | `true` |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

r[type.bool.expr.xor]
### Logical xor

| `a` | `b` | `a ^ b` |
|- | - | - |
| `true` | `true` | `false` |
| `true` | `false` | `true` |
| `false` | `true` | `true` |
| `false` | `false` | `false` |

r[type.bool.expr.cmp]
### Comparisons

r[type.bool.expr.cmp.eq]
| `a` | `b` | `a == b` |
|- | - | - |
| `true` | `true` | `true` |
| `true` | `false` | `false` |
| `false` | `true` | `false` |
| `false` | `false` | `true` |

r[type.bool.expr.cmp.greater]
| `a` | `b` | `a > b` |
|- | - | - |
| `true` | `true` | `false` |
| `true` | `false` | `true` |
| `false` | `true` | `false` |
| `false` | `false` | `false` |

r[type.bool.expr.cmp.not-eq]
* `a != b` is the same as `!(a == b)`

r[type.bool.expr.cmp.greater-eq]
* `a >= b` is the same as `a == b | a > b`

r[type.bool.expr.cmp.less]
* `a < b` is the same as `!(a >= b)`

r[type.bool.expr.cmp.less-eq]
* `a <= b` is the same as `a == b | a < b`

r[type.bool.validity]
## Bit validity

The single byte of a `bool` is guaranteed to be initialized (in other words, `transmute::<bool, u8>(...)` is always sound -- but since some bit patterns are invalid `bool`s, the inverse is not always sound).
