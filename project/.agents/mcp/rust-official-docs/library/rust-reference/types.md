---
title: "Types"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/types.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[type]
# Types

r[type.intro]
Every variable, item, and value in a Rust program has a type. The _type_ of a *value* defines the interpretation of the memory holding it and the operations that may be performed on the value.

r[type.builtin]
Built-in types are tightly integrated into the language, in nontrivial ways that are not possible to emulate in user-defined types.

r[type.user-defined]
User-defined types have limited capabilities.

r[type.kinds]
The list of types is:

* Primitive types:
    * [Boolean] --- `bool`
    * [Numeric] --- integer and float
    * [`char`]
    * [`str`]
    * [Never] --- `!` --- a type with no values
* Sequence types:
    * [Tuple]
    * [Array]
    * [Slice]
* User-defined types:
    * [Struct]
    * [Enum]
    * [Union]
* Function types:
    * [Functions]
    * [Closures]
* Pointer types:
    * [References]
    * [Raw pointers]
    * [Function pointers]
* Trait types:
    * [Trait objects]
    * [Impl trait]

r[type.name]
## Type expressions

r[type.name.syntax]
```grammar
Type ->
      TypeNoBounds
    | ImplTraitType
    | TraitObjectType

TypeNoBounds ->
      ParenthesizedType
    | ImplTraitTypeOneBound
    | TraitObjectTypeOneBound
    | TypePath
    | TupleType
    | NeverType
    | RawPointerType
    | ReferenceType
    | ArrayType
    | SliceType
    | InferredType
    | QualifiedPathInType
    | BareFunctionType
    | MacroInvocation
```

r[type.name.intro]
A _type expression_ as defined in the [Type] grammar rule above is the syntax for referring to a type. It may refer to:

r[type.name.sequence]
* Sequence types ([tuple], [array], [slice]).

r[type.name.path]
* [Type paths] which can reference:
    * Primitive types ([boolean], [numeric], [`char`], [`str`]).
    * Paths to an [item] ([struct], [enum], [union], [type alias], [trait]).
    * [`Self` path] where `Self` is the implementing type.
    * Generic [type parameters].

r[type.name.pointer]
* Pointer types ([reference], [raw pointer], [function pointer]).

r[type.name.inference]
* The [inferred type] which asks the compiler to determine the type.

r[type.name.grouped]
* [Parentheses] which are used for disambiguation.

r[type.name.trait]
* Trait types: [Trait objects] and [impl trait].

r[type.name.never]
* The [never] type.

r[type.name.macro-expansion]
* [Macros] which expand to a type expression.

r[type.name.parenthesized]
### Parenthesized types

r[type.name.parenthesized.syntax]
```grammar
ParenthesizedType -> `(` Type `)`
```

r[type.name.parenthesized.intro]
In some situations the combination of types may be ambiguous. Use parentheses around a type to avoid ambiguity. For example, the `+` operator for [type boundaries] within a [reference type] is unclear where the boundary applies, so the use of parentheses is required. Grammar rules that require this disambiguation use the [TypeNoBounds] rule instead of Type.

```rust
# use std::any::Any;
type T<'a> = &'a (dyn Any + Send);
```

r[type.recursive]
## Recursive types

r[type.recursive.intro]
Nominal types — [structs], [enumerations], and [unions] — may be recursive. That is, each `enum` variant or `struct` or `union` field may refer, directly or indirectly, to the enclosing `enum` or `struct` type itself.

r[type.recursive.constraint]
Such recursion has restrictions:

* Recursive types must include a nominal type in the recursion (not mere [type aliases], or other structural types such as [arrays] or [tuples]). So `type Rec = &'static [Rec]` is not allowed.
* The size of a recursive type must be finite; in other words the recursive fields of the type must be [pointer types].

An example of a *recursive* type and its use:

```rust
enum List<T> {
    Nil,
    Cons(T, Box<List<T>>)
}

let a: List<i32> = List::Cons(7, Box::new(List::Cons(13, Box::new(List::Nil))));
```
