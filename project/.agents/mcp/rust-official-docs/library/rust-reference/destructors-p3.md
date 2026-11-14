---
title: "Destructors (part 3 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/destructors.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Destructors (part 3 of 3)

### Temporary lifetime extension

r[destructors.scope.lifetime-extension.intro]
> **Note:**
> The exact rules for temporary lifetime extension are subject to change. This is describing the current behavior only.

r[destructors.scope.lifetime-extension.let]
The temporary scopes for expressions in `let` statements are sometimes *extended* to the scope of the block containing the `let` statement. This is done when the usual temporary scope would be too small, based on certain syntactic rules. For example:

```rust
let x = &mut 0;
// Usually a temporary would be dropped by now, but the temporary for `0` lives
// to the end of the block.
println!("{}", x);
```

r[destructors.scope.lifetime-extension.static]
Lifetime extension also applies to `static` and `const` items, where it makes temporaries live until the end of the program. For example:

```rust
const C: &Vec<i32> = &Vec::new();
// Usually this would be a dangling reference as the `Vec` would only
// exist inside the initializer expression of `C`, but instead the
// borrow gets lifetime-extended so it effectively has `'static` lifetime.
println!("{:?}", C);
```

r[destructors.scope.lifetime-extension.sub-expressions]
If a [borrow], dereference, field, or [tuple indexing expression] has an extended temporary scope, then so does its operand. If an [indexing expression] has an extended temporary scope, then the indexed expression also has an extended temporary scope.

r[destructors.scope.lifetime-extension.patterns]
#### Extending based on patterns

r[destructors.scope.lifetime-extension.patterns.extending]
An *extending pattern* is either:

* An [identifier pattern] that binds by reference or mutable reference.

  ```rust
  # fn temp() {}
  let ref x = temp(); // Binds by reference.
  # x;
  let ref mut x = temp(); // Binds by mutable reference.
  # x;
  ```

* A struct, tuple, tuple struct, slice, or or-pattern where at least one of the direct subpatterns is an extending pattern.

  ```rust
  # use core::sync::atomic::{AtomicU64, Ordering::Relaxed};
  # static X: AtomicU64 = AtomicU64::new(0);
  struct W<T>(T);
  # impl<T> Drop for W<T> { fn drop(&mut self) { X.fetch_add(1, Relaxed); } }
  let W { 0: ref x } = W(()); // Struct pattern.
  # x;
  let W(ref x) = W(()); // Tuple struct pattern.
  # x;
  let (W(ref x),) = (W(()),); // Tuple pattern.
  # x;
  let [W(ref x), ..] = [W(())]; // Slice pattern.
  # x;
  let (Ok(W(ref x)) | Err(&ref x)) = Ok(W(())); // Or pattern.
  # x;
  //
  // All of the temporaries above are still live here.
  # assert_eq!(0, X.load(Relaxed));
  ```

So `ref x`, `V(ref x)` and `[ref x, y]` are all extending patterns, but `x`, `&ref x` and `&(ref x,)` are not.

r[destructors.scope.lifetime-extension.patterns.let]
If the pattern in a `let` statement is an extending pattern then the temporary scope of the initializer expression is extended.

```rust
# fn temp() {}
// This is an extending pattern, so the temporary scope is extended.
let ref x = *&temp(); // OK
# x;
```

```rust
# fn temp() {}
// This is neither an extending pattern nor an extending expression,
// so the temporary is dropped at the semicolon.
let &ref x = *&&temp(); // ERROR
# x;
```

```rust
# fn temp() {}
// This is not an extending pattern but it is an extending expression,
// so the temporary lives beyond the `let` statement.
let &ref x = &*&temp(); // OK
# x;
```

r[destructors.scope.lifetime-extension.exprs]
#### Extending based on expressions

r[destructors.scope.lifetime-extension.exprs.extending]
For a let statement with an initializer, an *extending expression* is an expression which is one of the following:

* The initializer expression.
* The operand of an extending [borrow] expression.
* The [super operands] of an extending [super macro call] expression.
* The operand(s) of an extending array, cast, braced struct, or tuple expression.
* The arguments to an extending [tuple struct] or [tuple enum variant] constructor expression.
* The final expression of an extending [block expression] except for an [async block expression].
* The final expression of an extending [`if`] expression's consequent, `else if`, or `else` block.
* An arm expression of an extending [`match`] expression.

> **Note:**
> The desugaring of a [destructuring assignment] makes its assigned value operand (the RHS) an extending expression within a newly-introduced block. For details, see [expr.assign.destructure.tmp-ext].

So the borrow expressions in `&mut 0`, `(&1, &mut 2)`, and `Some(&mut 3)` are all extending expressions. The borrows in `&0 + &1` and `f(&mut 0)` are not.

r[destructors.scope.lifetime-extension.exprs.borrows]
The operand of an extending [borrow] expression has its [temporary scope] [extended].

r[destructors.scope.lifetime-extension.exprs.super-macros]
The [super temporaries] of an extending [super macro call] expression have their scopes [extended].

> **Note:**
> `rustc` does not treat [array repeat operands] of extending [array] expressions as extending expressions. Whether it should is an open question.
>
> For details, see Rust issue #146092.

#### Examples

Here are some examples where expressions have extended temporary scopes:

```rust
# use core::pin::pin;
# use core::sync::atomic::{AtomicU64, Ordering::Relaxed};
# static X: AtomicU64 = AtomicU64::new(0);
# #[derive(Debug)] struct S;
# impl Drop for S { fn drop(&mut self) { X.fetch_add(1, Relaxed); } }
# const fn temp() -> S { S }
let x = &temp(); // Operand of borrow.
# x;
let x = &raw const *&temp(); // Operand of raw borrow.
# assert_eq!(X.load(Relaxed), 0);
let x = &temp() as &dyn Send; // Operand of cast.
# x;
let x = (&*&temp(),); // Operand of tuple constructor.
# x;
struct W<T>(T);
let x = W(&temp()); // Argument to tuple struct constructor.
# x;
let x = Some(&temp()); // Argument to tuple enum variant constructor.
# x;
let x = { [Some(&temp())] }; // Final expr of block.
# x;
let x = const { &temp() }; // Final expr of `const` block.
# x;
let x = unsafe { &temp() }; // Final expr of `unsafe` block.
# x;
let x = if true { &temp() } else { &temp() };
//              ^^^^^^^^^^^^^^^^^^^^^^^^^^^^
//           Final exprs of `if`/`else` blocks.
# x;
let x = match () { _ => &temp() }; // `match` arm expression.
# x;
let x = pin!(temp()); // Super operand of super macro call expression.
# x;
let x = pin!({ &mut temp() }); // As above.
# x;
let x = format_args!("{:?}", temp()); // As above.
# x;
//
// All of the temporaries above are still live here.
# assert_eq!(0, X.load(Relaxed));
```

Here are some examples where expressions don't have extended temporary scopes:

```rust
# fn temp() {}
// Arguments to function calls are not extending expressions. The
// temporary is dropped at the semicolon.
let x = core::convert::identity(&temp()); // ERROR
# x;
```

```rust
# fn temp() {}
# trait Use { fn use_temp(&self) -> &Self { self } }
# impl Use for () {}
// Receivers of method calls are not extending expressions.
let x = (&temp()).use_temp(); // ERROR
# x;
```

```rust
# fn temp() {}
// Scrutinees of match expressions are not extending expressions.
let x = match &temp() { x => x }; // ERROR
# x;
```

```rust
# fn temp() {}
// Final expressions of `async` blocks are not extending expressions.
let x = async { &temp() }; // ERROR
# x;
```

```rust
# fn temp() {}
// Final expressions of closures are not extending expressions.
let x = || &temp(); // ERROR
# x;
```

```rust
# fn temp() {}
// Operands of loop breaks are not extending expressions.
let x = loop { break &temp() }; // ERROR
# x;
```

```rust
# fn temp() {}
// Operands of breaks to labels are not extending expressions.
let x = 'a: { break 'a &temp() }; // ERROR
# x;
```

```rust
# use core::pin::pin;
# fn temp() {}
// The argument to `pin!` is only an extending expression if the call
// is an extending expression. Since it's not, the inner block is not
// an extending expression, so the temporaries in its trailing
// expression are dropped immediately.
pin!({ &temp() }); // ERROR
```

```rust
# fn temp() {}
// As above.
format_args!("{:?}", { &temp() }); // ERROR
```

r[destructors.forget]
## Not running destructors

r[destructors.manually-suppressing]
### Manually suppressing destructors

[`core::mem::forget`] can be used to prevent the destructor of a variable from being run, and [`core::mem::ManuallyDrop`] provides a wrapper to prevent a variable or field from being dropped automatically.

> **Note:**
> Preventing a destructor from being run via [`core::mem::forget`] or other means is safe even if it has a type that isn't `'static`. Besides the places where destructors are guaranteed to run as defined by this document, types may *not* safely rely on a destructor being run for soundness.

r[destructors.process-termination]
### Process termination without unwinding

There are some ways to terminate the process without [unwinding], in which case destructors will not be run.

The standard library provides [`std::process::exit`] and [`std::process::abort`] to do this explicitly. Additionally, if the panic handler is set to `abort`, panicking will always terminate the process without destructors being run.

There is one additional case to be aware of: when a panic reaches a [non-unwinding ABI boundary], either no destructors will run, or all destructors up until the ABI boundary will run.
