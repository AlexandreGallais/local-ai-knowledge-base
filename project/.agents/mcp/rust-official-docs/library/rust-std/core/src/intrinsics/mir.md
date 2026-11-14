# core::intrinsics::mir

Rustc internal tooling for hand-writing MIR.

If for some reasons you are not writing rustc tests and have found yourself considering using
this feature, turn back. This is *exceptionally* unstable. There is no attempt at all to make
anything work besides those things which the rustc test suite happened to need. If you make a
typo you'll probably ICE. Really, this is not the solution to your problems. Consider instead
supporting the [rustc public project group](https://github.com/rust-lang/rustc_public).

The documentation for this module describes how to use this feature. If you are interested in
hacking on the implementation, most of that documentation lives at
`rustc_mir_build/src/build/custom/mod.rs`.

Typical usage will look like this:

```rust
#![feature(core_intrinsics, custom_mir)]
#![allow(internal_features)]

use core::intrinsics::mir::*;

#[custom_mir(dialect = "built")]
pub fn simple(x: i32) -> i32 {
    mir! {
        let temp2: i32;

        {
            let temp1 = x;
            Goto(my_second_block)
        }

        my_second_block = {
            temp2 = Move(temp1);
            RET = temp2;
            Return()
        }
    }
}
```

The `custom_mir` attribute tells the compiler to treat the function as being custom MIR. This
attribute only works on functions - there is no way to insert custom MIR into the middle of
another function. The `dialect` and `phase` parameters indicate which [version of MIR][dialect
docs] you are inserting here. Generally you'll want to use `#![custom_mir(dialect = "built")]`
if you want your MIR to be modified by the full MIR pipeline, or `#![custom_mir(dialect =
"runtime", phase = "optimized")]` if you don't.

[dialect docs]:
    https://doc.rust-lang.org/nightly/nightly-rustc/rustc_middle/mir/enum.MirPhase.html

The input to the [`mir!`] macro is:

 - An optional return type annotation in the form of `type RET = ...;`. This may be required
   if the compiler cannot infer the type of RET.
 - A possibly empty list of local declarations. Locals can also be declared inline on
   assignments via `let`. Type inference generally works. Shadowing does not.
 - A list of basic blocks. The first of these is the start block and is where execution begins.
   All blocks other than the start block need to be given a name, so that they can be referred
   to later.
    - Each block is a list of semicolon terminated statements, followed by a terminator. The
      syntax for the various statements and terminators is designed to be as similar as possible
      to the syntax for analogous concepts in native Rust. See below for a list.

# Examples

#![feature(core_intrinsics, custom_mir)]
#![allow(internal_features)]
#![allow(unused_assignments)]

use core::intrinsics::mir::*;

#[custom_mir(dialect = "built")]
pub fn choose_load(a: &i32, b: &i32, c: bool) -> i32 {
    mir! {
        {
            match c {
                true => t,
                _ => f,
            }
        }

        t = {
            let temp = a;
            Goto(load_and_exit)
        }

        f = {
            temp = b;
            Goto(load_and_exit)
        }

        load_and_exit = {
            RET = *temp;
            Return()
        }
    }
}

#[custom_mir(dialect = "built")]
fn unwrap_unchecked<T>(opt: Option<T>) -> T {
    mir! {
        {
            RET = Move(Field(Variant(opt, 1), 0));
            Return()
        }
    }
}

#[custom_mir(dialect = "runtime", phase = "optimized")]
fn push_and_pop<T>(v: &mut Vec<T>, value: T) {
    mir! {
        let _unused;
        let popped;

        {
            Call(_unused = Vec::push(v, value), ReturnTo(pop), UnwindContinue())
        }

        pop = {
            Call(popped = Vec::pop(v), ReturnTo(drop), UnwindContinue())
        }

        drop = {
            Drop(popped, ReturnTo(ret), UnwindContinue())
        }

        ret = {
            Return()
        }
    }
}

#[custom_mir(dialect = "runtime", phase = "optimized")]
fn annotated_return_type() -> (i32, bool) {
    mir! {
        type RET = (i32, bool);
        {
            RET.0 = 1;
            RET.1 = true;
            Return()
        }
    }
}
```

We can also set off compilation failures that happen in sufficiently late stages of the
compiler:

```rust,compile_fail
#![feature(core_intrinsics, custom_mir)]

extern crate core;
use core::intrinsics::mir::*;

#[custom_mir(dialect = "built")]
fn borrow_error(should_init: bool) -> i32 {
    mir! {
        let temp: i32;

        {
            match should_init {
                true => init,
                _ => use_temp,
            }
        }

        init = {
            temp = 0;
            Goto(use_temp)
        }

        use_temp = {
            RET = temp;
            Return()
        }
    }
}
```

```text
error[E0381]: used binding is possibly-uninitialized
  --> test.rs:24:13
   |
8  | /     mir! {
9  | |         let temp: i32;
10 | |
11 | |         {
...  |
19 | |             temp = 0;
   | |             -------- binding initialized here in some conditions
...  |
24 | |             RET = temp;
   | |             ^^^^^^^^^^ value used here but it is possibly-uninitialized
25 | |             Return()
26 | |         }
27 | |     }
   | |_____- binding declared here but left uninitialized

error: aborting due to 1 previous error

For more information about this error, try `rustc --explain E0381`.
```

# Syntax

The lists below are an exhaustive description of how various MIR constructs can be created.
Anything missing from the list should be assumed to not be supported, PRs welcome.

#### Locals

 - The `_0` return local can always be accessed via `RET`.
 - Arguments can be accessed via their regular name.
 - All other locals need to be declared with `let` somewhere and then can be accessed by name.

#### Places
 - Locals implicitly convert to places.
 - Field accesses, derefs, and indexing work normally.
 - Fields in variants can be accessed via the [`Variant`] and [`Field`] associated functions,
   see their documentation for details.

#### Operands
 - Places implicitly convert to `Copy` operands.
 - `Move` operands can be created via [`Move`].
 - Const blocks, literals, named constants, and const params all just work.
 - [`Static`] and [`StaticMut`] can be used to create `&T` and `*mut T`s to statics. These are
   constants in MIR and the only way to access statics.

#### Statements
 - Assign statements work via normal Rust assignment.
 - [`StorageLive`], [`StorageDead`] statements have an associated function.

#### Rvalues

 - Operands implicitly convert to `Use` rvalues.
 - `&`, `&mut`, `addr_of!`, and `addr_of_mut!` all work to create their associated rvalue.
 - [`CastTransmute`], [`CastPtrToPtr`], [`CastUnsize`], and [`Discriminant`]
   have associated functions.
 - Unary and binary operations use their normal Rust syntax - `a * b`, `!c`, etc.
 - The binary operation `Offset` can be created via [`Offset`].
 - Checked binary operations are represented by wrapping the associated binop in [`Checked`].
 - Array repetition syntax (`[foo; 10]`) creates the associated rvalue.

#### Terminators

 - [`Goto`], [`Return`], [`Unreachable`] and [`Drop`](Drop()) have associated functions.
 - `match some_int_operand` becomes a `SwitchInt`. Each arm should be `literal => basic_block`
    - The exception is the last arm, which must be `_ => basic_block` and corresponds to the
      otherwise branch.
 - [`Call`] has an associated function as well, with special syntax:
   `Call(ret_val = function(arg1, arg2, ...), ReturnTo(next_block), UnwindContinue())`.
 - [`TailCall`] does not have a return destination or next block, so its syntax is just
   `TailCall(function(arg1, arg2, ...))`.

#### Debuginfo

Debuginfo associates source code variable names (of variables that may not exist any more) with
MIR expressions that indicate where the value of that variable is stored. The syntax to do so
is:
```text
debug source_var_name => expression;
```
Both places and constants are supported in the `expression`.

```rust
#![allow(internal_features)]
#![feature(core_intrinsics, custom_mir)]

use core::intrinsics::mir::*;

#[custom_mir(dialect = "built")]
fn debuginfo(arg: Option<&i32>) {
    mir!(
        // Debuginfo for a source variable `plain_local` that just duplicates `arg`.
        debug plain_local => arg;
        // Debuginfo for a source variable `projection` that can be computed by dereferencing
        // a field of `arg`.
        debug projection => *Field::<&i32>(Variant(arg, 1), 0);
        // Debuginfo for a source variable `constant` that always holds the value `5`.
        debug constant => 5_usize;
        {
            Return()
        }
    )
}
```

## enum BasicBlock

```rust
pub enum BasicBlock
```

Type representing basic blocks.

All terminators will have this type as a return type. It helps achieve some type safety.

## enum UnwindTerminateReason

```rust
pub enum UnwindTerminateReason
```

The reason we are terminating the process during unwinding.