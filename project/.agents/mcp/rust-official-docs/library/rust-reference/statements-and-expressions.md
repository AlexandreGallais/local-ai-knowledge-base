---
title: "Statements and expressions"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/statements-and-expressions.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[stmt-expr]
# Statements and expressions

Rust is _primarily_ an expression language. This means that most forms of value-producing or effect-causing evaluation are directed by the uniform syntax category of _expressions_. Each kind of expression can typically _nest_ within each other kind of expression, and rules for evaluation of expressions involve specifying both the value produced by the expression and the order in which its sub-expressions are themselves evaluated.

In contrast, statements serve _mostly_ to contain and explicitly sequence expression evaluation.
