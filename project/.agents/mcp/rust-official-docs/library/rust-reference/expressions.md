---
title: "Expressions"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/expressions.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[expr]
# Expressions

r[expr.syntax]
```grammar
Expression ->
      ExpressionWithoutBlock
    | ExpressionWithBlock

ExpressionWithoutBlock ->
    OuterAttribute* ExpressionWithoutBlockNoAttrs

ExpressionWithoutBlockNoAttrs ->
      LiteralExpression
    | PathExpression
    | OperatorExpression
    | GroupedExpression
    | ArrayExpression
    | AwaitExpression
    | IndexExpression
    | TupleExpression
    | TupleIndexingExpression
    | StructExpression
    | CallExpression
    | MethodCallExpression
    | FieldExpression
    | ClosureExpression
    | AsyncBlockExpression
    | ContinueExpression
    | BreakExpression
    | RangeExpression
    | ReturnExpression
    | UnderscoreExpression
    | MacroInvocation

ExpressionWithBlock ->
    OuterAttribute* ExpressionWithBlockNoAttrs

ExpressionWithBlockNoAttrs ->
      BlockExpression
    | ConstBlockExpression
    | UnsafeBlockExpression
    | LoopExpression
    | IfExpression
    | MatchExpression
```

r[expr.intro]
An expression may have two roles: it always produces a *value*, and it may have *effects* (otherwise known as "side effects").

r[expr.evaluation]
An expression *evaluates to* a value, and has effects during *evaluation*.

r[expr.operands]
Many expressions contain sub-expressions, called the *operands* of the expression.

r[expr.behavior]
The meaning of each kind of expression dictates several things:

* Whether or not to evaluate the operands when evaluating the expression
* The order in which to evaluate the operands
* How to combine the operands' values to obtain the value of the expression

r[expr.structure]
In this way, the structure of expressions dictates the structure of execution. Blocks are just another kind of expression, so blocks, statements, expressions, and blocks again can recursively nest inside each other to an arbitrary depth.

> **Note:**
> We give names to the operands of expressions so that we may discuss them, but these names are not stable and may be changed.

r[expr.precedence]
## Expression precedence

The precedence of Rust operators and expressions is ordered as follows, going from strong to weak. Binary Operators at the same precedence level are grouped in the order given by their associativity.

| Operator/Expression         | Associativity       |
|-----------------------------|---------------------|
| Paths          |                     |
| Method calls |                     |
| Field expressions | left to right   |
| Function calls, array indexing | |
| `?`             |                     |
| Unary `-` `!` `*` borrow | |
| `as`             | left to right       |
| `*` `/` `%` | left to right       |
| `+` `-` | left to right       |
| `<<` `>>` | left to right     |
| `&`     | left to right       |
| `^`     | left to right       |
| `&#124;` | left to right       |
| `==` `!=` `<` `>` `<=` `>=` | Require parentheses |
| `&&`     | left to right       |
| `&#124;&#124;` | left to right       |
| `..` `..=` | Require parentheses |
| `=` `+=` `-=` `*=` `/=` `%=`  `&=` `&#124;=` `^=` `<<=` `>>=` | right to left |
| `return` `break` closures  | |

r[expr.operand-order]
## Evaluation order of operands

r[expr.operand-order.default]
The following list of expressions all evaluate their operands the same way, as described after the list. Other expressions either don't take operands or evaluate them conditionally as described on their respective pages.

* Dereference expression
* Error propagation expression
* Negation expression
* Arithmetic and logical binary operators
* Comparison operators
* Type cast expression
* Grouped expression
* Array expression
* Await expression
* Index expression
* Tuple expression
* Tuple index expression
* Struct expression
* Call expression
* Method call expression
* Field expression
* Break expression
* Range expression
* Return expression

r[expr.operand-order.operands-before-primary]
The operands of these expressions are evaluated prior to applying the effects of the expression. Expressions taking multiple operands are evaluated left to right as written in the source code.

> **Note:**
> Which subexpressions are the operands of an expression is determined by expression precedence as per the previous section.

For example, the two `next` method calls will always be called in the same order:

```rust
# // Using vec instead of array to avoid references
# // since there is no stable owned array iterator
# // at the time this example was written.
let mut one_two = vec![1, 2].into_iter();
assert_eq!(
    (1, 2),
    (one_two.next().unwrap(), one_two.next().unwrap())
);
```

> **Note:**
> Since this is applied recursively, these expressions are also evaluated from innermost to outermost, ignoring siblings until there are no inner subexpressions.

r[expr.place-value]
## Place expressions and value expressions

r[expr.place-value.intro]
Expressions are divided into two main categories: place expressions and value expressions; there is also a third, minor category of expressions called assignee expressions. Within each expression, operands may likewise occur in either place context or value context. The evaluation of an expression depends both on its own category and the context it occurs within.

r[expr.place-value.place-memory-location]
A *place expression* is an expression that represents a memory location.

r[expr.place-value.place-expr-kinds]
These expressions are [paths] which refer to local variables, [static variables], dereferences (`*expr`), [array indexing] expressions (`expr[expr]`), [field] references (`expr.f`) and parenthesized place expressions.

r[expr.place-value.value-expr-kinds]
All other expressions are value expressions.

r[expr.place-value.value-result]
A *value expression* is an expression that represents an actual value.

r[expr.place-value.place-context]
The following contexts are *place expression* contexts:

* The left operand of a [compound assignment] expression.
* The operand of a unary [borrow], [raw borrow] or dereference operator.
* The operand of a [field expression].
* The indexed operand of an [array indexing expression].
* The tuple operand of a [tuple indexing expression].
* The operand of any [implicit borrow].
* The initializer of a [let statement].
* The [scrutinee] of an [`if let`], `match`, or [`while let`] expression.
* The base of a [functional update] struct expression.

> **Note:**
> Historically, place expressions were called *lvalues* and value expressions were called *rvalues*.

r[expr.place-value.assignee]
An *assignee expression* is an expression that appears in the left operand of an assignment expression. Explicitly, the assignee expressions are:

- Place expressions.
- [Underscores].
- [Tuples] of assignee expressions.
- Slices of assignee expressions.
- [Tuple structs] of assignee expressions.
- [Structs] of assignee expressions (with optionally named fields).
- [Unit structs]

r[expr.place-value.parenthesis]
Arbitrary parenthesisation is permitted inside assignee expressions.

r[expr.move]
### Moved and copied types

r[expr.move.intro]
When a place expression is evaluated in a value expression context, or is bound by value in a pattern, it denotes the value held _in_ that memory location.

r[expr.move.copy]
If the type of that value implements [`Copy`], then the value will be copied.

r[expr.move.requires-sized]
In the remaining situations, if that type is [`Sized`], then it may be possible to move the value.

r[expr.move.movable-place]
Only the following place expressions may be moved out of:

* [Variables] which are not currently borrowed.
* Temporary values.
* Fields of a place expression which can be moved out of and don't implement [`Drop`].
* The result of dereferencing an expression with type [`Box<T>`] and that can also be moved out of.

r[expr.move.deinitialization]
After moving out of a place expression that evaluates to a local variable, the location is deinitialized and cannot be read from again until it is reinitialized.

r[expr.move.place-invalid]
In all other cases, trying to use a place expression in a value expression context is an error.

r[expr.mut]
### Mutability

r[expr.mut.intro]
For a place expression to be assigned to, mutably borrowed, [implicitly mutably borrowed], or bound to a pattern containing `ref mut`, it must be _mutable_. We call these *mutable place expressions*. In contrast, other place expressions are called *immutable place expressions*.

r[expr.mut.valid-places]
The following expressions can be mutable place expression contexts:

* Mutable [variables] which are not currently borrowed.
* [Mutable `static` items].
* [Temporary values].
* Fields: this evaluates the subexpression in a mutable place expression context.
* Dereferences of a `*mut T` pointer.
* Dereference of a variable, or field of a variable, with type `&mut T`. Note: This is an exception to the requirement of the next rule.
* Dereferences of a type that implements `DerefMut`: this then requires that the value being dereferenced is evaluated in a mutable place expression context.
* [Array indexing] of a type that implements `IndexMut`: this then evaluates the value being indexed, but not the index, in mutable place expression context.

r[expr.temporary]
### Temporaries

When using a value expression in most place expression contexts, a temporary unnamed memory location is created and initialized to that value. The expression evaluates to that location instead, except if [promoted] to a `static`. The [drop scope] of the temporary is usually the end of the enclosing statement.

r[expr.super-macros]
### Super macros

r[expr.super-macros.intro]
Certain built-in macros may create [temporaries] whose scopes may be [extended]. These temporaries are *super temporaries* and these macros are *super macros*. Invocations of these macros are *super macro call expressions*. Arguments to these macros may be *super operands*.

> **Note:**
> When a super macro call expression is an [extending expression], its super operands are [extending expressions] and the scopes of the super temporaries are [extended]. See [destructors.scope.lifetime-extension.exprs].

r[expr.super-macros.format_args]
#### `format_args!`

r[expr.super-macros.format_args.super-operands]
Except for the format string argument, all arguments passed to [`format_args!`] are *super operands*.

```rust
# fn temp() -> String { String::from("") }
// Due to the call being an extending expression and the argument
// being a super operand, the inner block is an extending expression,
// so the scope of the temporary created in its trailing expression
// is extended.
let _ = format_args!("{}", { &temp() }); // OK
```

r[expr.super-macros.format_args.super-temporaries]
The super operands of [`format_args!`] are [implicitly borrowed] and are therefore [place expression contexts]. When a [value expression] is passed as an argument, it creates a *super temporary*.

```rust
# fn temp() -> String { String::from("") }
let x = format_args!("{}", temp());
x; // <-- The temporary is extended, allowing use here.
```

The expansion of a call to [`format_args!`] sometimes creates other internal *super temporaries*.

```rust
let x = {
    // This call creates an internal temporary.
    let x = format_args!("{:?}", 0);
    x // <-- The temporary is extended, allowing its use here.
}; // <-- The temporary is dropped here.
x; // ERROR
```

```rust
// This call doesn't create an internal temporary.
let x = { let x = format_args!("{}", 0); x };
x; // OK
```

> **Note:**
> The details of when [`format_args!`] does or does not create internal temporaries are currently unspecified.

r[expr.super-macros.pin]
#### `pin!`

r[expr.super-macros.pin.super-operands]
The argument to [`pin!`] is a *super operand*.

```rust
# use core::pin::pin;
# fn temp() {}
// As above for `format_args!`.
let _ = pin!({ &temp() }); // OK
```

r[expr.super-macros.pin.super-temporaries]
The argument to [`pin!`] is a [value expression context] and creates a *super temporary*.

```rust
# use core::pin::pin;
# fn temp() {}
// The argument is evaluated into a super temporary.
let x = pin!(temp());
// The temporary is extended, allowing its use here.
x; // OK
```

r[expr.implicit-borrow]
### Implicit borrows

r[expr.implicit-borrow-intro]
Certain expressions will treat an expression as a place expression by implicitly borrowing it. For example, it is possible to compare two unsized slices for equality directly, because the `==` operator implicitly borrows its operands:

```rust
# let c = [1, 2, 3];
# let d = vec![1, 2, 3];
let a: &[i32];
let b: &[i32];
# a = &c;
# b = &d;
// ...
*a == *b;
// Equivalent form:
::std::cmp::PartialEq::eq(&*a, &*b);
```

r[expr.implicit-borrow.application]
Implicit borrows may be taken in the following expressions:

* Left operand in [method-call] expressions.
* Left operand in [field] expressions.
* Left operand in [call expressions].
* Left operand in [array indexing] expressions.
* Operand of the dereference operator (`*`).
* Operands of [comparison].
* Left operands of the [compound assignment].
* Arguments to [`format_args!`] except the format string.

r[expr.overload]
## Overloading traits

Many of the following operators and expressions can also be overloaded for other types using traits in `std::ops` or `std::cmp`. These traits also exist in `core::ops` and `core::cmp` with the same names.

r[expr.attr]
## Expression attributes

r[expr.attr.restriction]
[Outer attributes] before an expression are allowed only in a few specific cases:

* Before an expression used as a [statement].
* Elements of [array expressions], [tuple expressions], [call expressions], and tuple-style [struct] expressions.
* The tail expression of [block expressions].

r[expr.attr.never-before]
They are never allowed before:
* [Range] expressions.
* Binary operator expressions ([ArithmeticOrLogicalExpression], [ComparisonExpression], [LazyBooleanExpression], [TypeCastExpression], [AssignmentExpression], [CompoundAssignmentExpression]).
