---
title: "Destructors (part 2 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/destructors.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Destructors (part 2 of 3)

## Drop scopes

r[destructors.scope.intro]
Each variable or temporary is associated to a *drop scope*. When control flow leaves a drop scope all variables associated to that scope are dropped in reverse order of declaration (for variables) or creation (for temporaries).

r[destructors.scope.desugaring]
Drop scopes can be determined by replacing [`for`], [`if`], and [`while`] expressions with equivalent expressions using [`match`], [`loop`] and `break`.

r[destructors.scope.operators]
Overloaded operators are not distinguished from built-in operators and [binding modes] are not considered.

r[destructors.scope.list]
Given a function, or closure, there are drop scopes for:

r[destructors.scope.function]
* The entire function

r[destructors.scope.statement]
* Each [statement]

r[destructors.scope.expression]
* Each [expression]

r[destructors.scope.block]
* Each block, including the function body
    * In the case of a [block expression], the scope for the block and the expression are the same scope.

r[destructors.scope.match-arm]
* Each arm of a `match` expression

r[destructors.scope.nesting]
Drop scopes are nested within one another as follows:

r[destructors.scope.nesting-function]
* The entire function scope is the outer most scope.

r[destructors.scope.nesting-function-body]
* The function body block is contained within the scope of the entire function.

r[destructors.scope.nesting-expr-statement]
* The parent of the expression in an expression statement is the scope of the statement.

r[destructors.scope.nesting-let-initializer]
* The parent of the initializer of a [`let` statement] is the `let` statement's scope.

r[destructors.scope.nesting-statement]
* The parent of a statement scope is the scope of the block that contains the statement.

r[destructors.scope.nesting-match-guard]
* The parent of the expression for a `match` guard is the scope of the arm that the guard is for.

r[destructors.scope.nesting-match-arm]
* The parent of the expression after the `=>` in a `match` expression is the scope of the arm that it's in.

r[destructors.scope.nesting-match]
* The parent of the arm scope is the scope of the `match` expression that it belongs to.

r[destructors.scope.nesting-other]
* The parent of all other scopes is the scope of the immediately enclosing expression.

r[destructors.scope.nesting-drop-order]
When multiple scopes are left at once, such as when returning from a function, variables are dropped from the inside outwards.

r[destructors.scope.params]
### Scopes of function parameters

All function parameters are in the scope of the entire function body, so are dropped last when evaluating the function. Each actual function parameter is dropped after any bindings introduced in that parameter's pattern.

```rust
# struct PrintOnDrop(&'static str);
# impl Drop for PrintOnDrop {
#     fn drop(&mut self) {
#         println!("drop({})", self.0);
#     }
# }
// Drops `y`, then the second parameter, then `x`, then the first parameter
fn patterns_in_parameters(
    (x, _): (PrintOnDrop, PrintOnDrop),
    (_, y): (PrintOnDrop, PrintOnDrop),
) {}

// drop order is 3 2 0 1
patterns_in_parameters(
    (PrintOnDrop("0"), PrintOnDrop("1")),
    (PrintOnDrop("2"), PrintOnDrop("3")),
);
```

r[destructors.scope.bindings]
### Scopes of local variables

r[destructors.scope.bindings.let]
Local variables declared in a `let` statement are associated to the scope of the block that contains the `let` statement.

```rust
# struct PrintOnDrop(&'static str);
# impl Drop for PrintOnDrop {
#     fn drop(&mut self) {
#         println!("drop({})", self.0);
#     }
# }
let declared_first = PrintOnDrop("Dropped last in outer scope");
{
    let declared_in_block = PrintOnDrop("Dropped in inner scope");
}
let declared_last = PrintOnDrop("Dropped first in outer scope");
```

r[destructors.scope.bindings.match-arm]
Local variables declared in a `match` expression or pattern-matching `match` guard are associated to the arm scope of the `match` arm that they are declared in.

```rust
# #![allow(irrefutable_let_patterns)]
# struct PrintOnDrop(&'static str);
# impl Drop for PrintOnDrop {
#     fn drop(&mut self) {
#         println!("drop({})", self.0);
#     }
# }
match PrintOnDrop("Dropped last in the first arm's scope") {
    // When guard evaluation succeeds, control-flow stays in the arm and
    // values may be moved from the scrutinee into the arm's bindings,
    // causing them to be dropped in the arm's scope.
    x if let y = PrintOnDrop("Dropped second in the first arm's scope")
        && let z = PrintOnDrop("Dropped first in the first arm's scope") =>
    {
        let declared_in_block = PrintOnDrop("Dropped in inner scope");
        // Pattern-matching guards' bindings and temporaries are dropped in
        // reverse order, dropping each guard condition operand's bindings
        // before its temporaries. Lastly, variables bound by the arm's
        // pattern are dropped.
    }
    _ => unreachable!(),
}

match PrintOnDrop("Dropped in the enclosing temporary scope") {
    // When guard evaluation fails, control-flow leaves the arm scope,
    // causing bindings and temporaries from earlier pattern-matching
    // guard condition operands to be dropped. This occurs before evaluating
    // the next arm's guard or body.
    _ if let y = PrintOnDrop("Dropped in the first arm's scope")
        && false => unreachable!(),
    // When a guard is executed multiple times due to self-overlapping
    // or-patterns, control-flow leaves the arm scope when the guard fails
    // and re-enters the arm scope before executing the guard again.
    _ | _ if let y = PrintOnDrop("Dropped in the second arm's scope twice")
        && false => unreachable!(),
    _ => {},
}
```

r[destructors.scope.bindings.patterns]
Variables in patterns are dropped in reverse order of declaration within the pattern.

```rust
# struct PrintOnDrop(&'static str);
# impl Drop for PrintOnDrop {
#     fn drop(&mut self) {
#         println!("drop({})", self.0);
#     }
# }
let (declared_first, declared_last) = (
    PrintOnDrop("Dropped last"),
    PrintOnDrop("Dropped first"),
);
```

r[destructors.scope.bindings.or-patterns]
For the purpose of drop order, [or-patterns] declare bindings in the order given by the first subpattern.

```rust
# struct PrintOnDrop(&'static str);
# impl Drop for PrintOnDrop {
#     fn drop(&mut self) {
#         println!("drop({})", self.0);
#     }
# }
// Drops `x` before `y`.
fn or_pattern_drop_order<T>(
    (Ok([x, y]) | Err([y, x])): Result<[T; 2], [T; 2]>
//   ^^^^^^^^^^   ^^^^^^^^^^^ This is the second subpattern.
//   |
//   This is the first subpattern.
//
//   In the first subpattern, `x` is declared before `y`. Since it is
//   the first subpattern, that is the order used even if the second
//   subpattern, where the bindings are declared in the opposite
//   order, is matched.
) {}

// Here we match the first subpattern, and the drops happen according
// to the declaration order in the first subpattern.
or_pattern_drop_order(Ok([
    PrintOnDrop("Declared first, dropped last"),
    PrintOnDrop("Declared last, dropped first"),
]));

// Here we match the second subpattern, and the drops still happen
// according to the declaration order in the first subpattern.
or_pattern_drop_order(Err([
    PrintOnDrop("Declared last, dropped first"),
    PrintOnDrop("Declared first, dropped last"),
]));
```

r[destructors.scope.temporary]
### Temporary scopes

r[destructors.scope.temporary.intro]
The *temporary scope* of an expression is the scope that is used for the temporary variable that holds the result of that expression when used in a [place context], unless it is [promoted].

r[destructors.scope.temporary.enclosing]
Apart from lifetime extension, the temporary scope of an expression is the smallest scope that contains the expression and is one of the following:

* The entire function.
* A statement.
* The body of an [`if`], [`while`] or [`loop`] expression.
* The `else` block of an `if` expression.
* The non-pattern matching condition expression of an `if` or `while` expression or a non-pattern-matching `match` [guard condition operand].
* The pattern-matching guard, if present, and body expression for a `match` arm.
* Each operand of a [lazy boolean expression].
* The pattern-matching condition(s) and consequent body of [`if`] ([destructors.scope.temporary.edition2024]).
* The pattern-matching condition and loop body of [`while`].
* The entirety of the tail expression of a block ([destructors.scope.temporary.edition2024]).

> **Note:**
> The [scrutinee] of a `match` expression is not a temporary scope, so temporaries in the scrutinee can be dropped after the `match` expression. For example, the temporary for `1` in `match 1 { ref mut z => z };` lives until the end of the statement.

> **Note:**
> The desugaring of a [destructuring assignment] restricts the temporary scope of its assigned value operand (the RHS). For details, see [expr.assign.destructure.tmp-scopes].

r[destructors.scope.temporary.edition2024]
> [!EDITION-2024]
> The 2024 edition added two new temporary scope narrowing rules: `if let` temporaries are dropped before the `else` block, and temporaries of tail expressions of blocks are dropped immediately after the tail expression is evaluated.

Some examples:

```rust
# #![allow(irrefutable_let_patterns)]
# struct PrintOnDrop(&'static str);
# impl Drop for PrintOnDrop {
#     fn drop(&mut self) {
#         println!("drop({})", self.0);
#     }
# }
let local_var = PrintOnDrop("local var");

// Dropped once the condition has been evaluated
if PrintOnDrop("If condition").0 == "If condition" {
    // Dropped at the end of the block
    PrintOnDrop("If body").0
} else {
    unreachable!()
};

if let "if let scrutinee" = PrintOnDrop("if let scrutinee").0 {
    PrintOnDrop("if let consequent").0
    // `if let consequent` dropped here
}
// `if let scrutinee` is dropped here
else {
    PrintOnDrop("if let else").0
    // `if let else` dropped here
};

while let x = PrintOnDrop("while let scrutinee").0 {
    PrintOnDrop("while let loop body").0;
    break;
    // `while let loop body` dropped here.
    // `while let scrutinee` dropped here.
}

// Dropped before the first ||
(PrintOnDrop("first operand").0 == ""
// Dropped before the )
|| PrintOnDrop("second operand").0 == "")
// Dropped before the ;
|| PrintOnDrop("third operand").0 == "";

// Scrutinee is dropped at the end of the function, before local variables
// (because this is the tail expression of the function body block).
match PrintOnDrop("Matched value in final expression") {
    // Non-pattern-matching guards' temporaries are dropped once the
    // condition has been evaluated
    _ if PrintOnDrop("guard condition").0 == "" => (),
    // Pattern-matching guards' temporaries are dropped when leaving the
    // arm's scope
    _ if let "guard scrutinee" = PrintOnDrop("guard scrutinee").0 => {
        let _ = &PrintOnDrop("lifetime-extended temporary in inner scope");
        // `lifetime-extended temporary in inner scope` is dropped here
    }
    // `guard scrutinee` is dropped here
    _ => (),
}
```

r[destructors.scope.operands]
### Operands

Temporaries are also created to hold the result of operands to an expression while the other operands are evaluated. The temporaries are associated to the scope of the expression with that operand. Since the temporaries are moved from once the expression is evaluated, dropping them has no effect unless one of the operands to an expression breaks out of the expression, returns, or panics.

```rust
# struct PrintOnDrop(&'static str);
# impl Drop for PrintOnDrop {
#     fn drop(&mut self) {
#         println!("drop({})", self.0);
#     }
# }
loop {
    // Tuple expression doesn't finish evaluating so operands drop in reverse order
    (
        PrintOnDrop("Outer tuple first"),
        PrintOnDrop("Outer tuple second"),
        (
            PrintOnDrop("Inner tuple first"),
            PrintOnDrop("Inner tuple second"),
            break,
        ),
        PrintOnDrop("Never created"),
    );
}
```

r[destructors.scope.const-promotion]
### Constant promotion

Promotion of a value expression to a `'static` slot occurs when the expression could be written in a constant and borrowed, and that borrow could be dereferenced where the expression was originally written, without changing the runtime behavior. That is, the promoted expression can be evaluated at compile-time and the resulting value does not contain [interior mutability] or [destructors] (these properties are determined based on the value where possible, e.g. `&None` always has the type `&'static Option<_>`, as it contains nothing disallowed).

r[destructors.scope.lifetime-extension]
