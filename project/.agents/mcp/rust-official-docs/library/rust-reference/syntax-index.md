---
title: "Syntax index"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/syntax-index.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Syntax index

This appendix provides an index of tokens and common forms with links to where those elements are defined.

## Keywords

| Keyword       | Use |
|---------------|-----|
| `_`           | [wildcard pattern], [inferred const], [inferred type], [placeholder lifetime], [constant items], [extern crate], [use declarations], [destructuring assignment] |
| `abstract`    | [reserved keyword] |
| `as`          | extern crate, use declarations, [type cast expressions], [qualified paths] |
| `async`       | [async functions], [async blocks], [async closures] |
| `await`       | [await expressions] |
| `become`      | [reserved keyword] |
| `box`         | [reserved keyword] |
| `break`       | [break expressions] |
| `const`       | [const functions], [const items], [const generics], [const blocks], [raw borrow operator], [raw pointer type], [const assembly operands] |
| `continue`    | [continue expressions] |
| `crate`       | [extern crate], [visibility], [paths] |
| `do`          | [reserved keyword] |
| `dyn`         | [trait objects] |
| `else`        | [let statements], [if expressions] |
| `enum`        | [enumerations] |
| `extern`      | [extern crate], [extern function qualifier], [external blocks], [extern function pointer types] |
| `false`       | [boolean type], [boolean expressions], [configuration predicates] |
| `final`       | [reserved keyword] |
| `fn`          | [functions], [function pointer types] |
| `for`         | [trait implementations], [iterator loops], [higher-ranked trait bounds] |
| `gen`         | [reserved keyword] |
| `if`          | [if expressions], [match guards] |
| `impl`        | [inherent impls], [trait impls], [impl trait types], [anonymous type parameters] |
| `in`          | [visibility], [iterator loops], [assembly operands] |
| `let`         | [let statements], [`if let` patterns] |
| `loop`        | [infinite loops] |
| `macro_rules` | [macros by example] |
| `macro`       | [reserved keyword] |
| `match`       | [match expressions] |
| `mod`         | [modules] |
| `move`        | [closure expressions], [async blocks] |
| `mut`         | [borrow expressions], [identifier patterns], [reference patterns], [struct patterns], [reference types], [raw pointer types], [self parameters], [static items] |
| `override`    | [reserved keyword] |
| `priv`        | [reserved keyword] |
| `pub`         | [visibility] |
| `raw`         | [borrow expressions], [raw assembly] |
| `ref`         | [identifier patterns], [struct patterns] |
| `return`      | [return expressions] |
| `safe`        | [external block functions], [external block statics] |
| `self`        | extern crate, [self parameters], [visibility], [`self` paths] |
| `Self`        | [`Self` type paths], [use bounds] |
| `static`      | [static items], [`'static` lifetimes] |
| `struct`      | [structs] |
| `super`       | [super paths], [visibility] |
| `trait`       | [trait items] |
| `true`        | [boolean type], [boolean expressions], [configuration predicates] |
| `try`         | [reserved keyword] |
| `type`        | [type aliases] |
| `typeof`      | [reserved keyword] |
| `union`       | [union items] |
| `unsafe`      | [unsafe blocks], [unsafe attributes], [unsafe modules], [unsafe functions], [unsafe external blocks], [unsafe external functions], [unsafe external statics], [unsafe traits], [unsafe trait implementations] |
| `unsized`     | [reserved keyword] |
| `use`         | [use items], [use bounds] |
| `virtual`     | [reserved keyword] |
| `where`       | [where clauses] |
| `while`       | [predicate loops] |
| `yield`       | [reserved keyword] |

## Operators and punctuation

| Symbol | Name        | Use |
|--------|-------------|-----|
| `+`    | Plus        | addition, [trait bounds], [macro Kleene matcher] |
| `-`    | Minus       | subtraction, [negation] |
| `*`    | Star        | multiplication, [dereference], [raw pointers], [macro Kleene matcher], [glob imports] |
| `/`    | Slash       | division |
| `%`    | Percent     | remainder |
| `^`    | Caret       | bitwise and logical XOR |
| `!`    | Not         | bitwise and logical NOT, [macro calls], inner attributes, [never type], [negative impls] |
| `&`    | And         | bitwise and logical AND, [borrow], [references], [reference patterns] |
| `\|`   | Or | bitwise and logical OR, [closures], [or patterns], [if let], [while let] |
| `&&`   | AndAnd      | lazy AND, [borrow], [references], [reference patterns] |
| `\|\|` | OrOr | lazy OR, [closures] |
| `<<`   | Shl         | shift left, nested generics |
| `>>`   | Shr         | shift right, nested generics |
| `+=`   | PlusEq      | addition assignment |
| `-=`   | MinusEq     | subtraction assignment |
| `*=`   | StarEq      | multiplication assignment |
| `/=`   | SlashEq     | division assignment |
| `%=`   | PercentEq   | remainder assignment |
| `^=`   | CaretEq     | bitwise XOR assignment |
| `&=`   | AndEq       | bitwise AND assignment |
| `\|=`  | OrEq | bitwise OR assignment |
| `<<=`  | ShlEq       | shift left assignment |
| `>>=`  | ShrEq       | shift right assignment, nested generics |
| `=`    | Eq          | [assignment], [let statements], [attributes], various type definitions |
| `==`   | EqEq        | equal |
| `!=`   | Ne          | not equal |
| `>`    | Gt          | greater than, [generics], [paths], [use bounds] |
| `<`    | Lt          | less than, [generics], [paths], [use bounds] |
| `>=`   | Ge          | greater than or equal to, [generics] |
| `<=`   | Le          | less than or equal to |
| `@`    | At          | [subpattern binding] |
| `.`    | Dot         | field access, [tuple index], [method calls], [await expressions] |
| `..`   | DotDot      | range expressions, [struct expressions], [rest pattern], [range patterns], [struct patterns] |
| `...`  | DotDotDot   | [variadic functions], [range patterns] |
| `..=`  | DotDotEq    | inclusive range expressions, [range patterns] |
| `,`    | Comma       | various separators |
| `;`    | Semi        | terminator for various items and statements, [array expressions], [array types] |
| `:`    | Colon       | various separators |
| `::`   | PathSep     | path separator |
| `->`   | RArrow      | [functions], [closures], [function pointer type] |
| `=>`   | FatArrow    | match arms, [macros] |
| `<-`   | LArrow      | The left arrow symbol has been unused since before Rust 1.0, but it is still treated as a single token. |
| `#`    | Pound       | [attributes], [raw string literals], [raw byte string literals], [raw C string literals] |
| `$`    | Dollar      | [macros] |
| `?`    | Question    | try propagation expressions, [relaxed trait bounds], [macro Kleene matcher] |
| `~`    | Tilde       | The tilde operator has been unused since before Rust 1.0, but its token may still be used. |

## Comments

| Comment  | Use |
|----------|-----|
| `//`     | line comment |
| `//!`    | inner line comment |
| `///`    | outer line doc comment |
| `/*…*/`  | block comment |
| `/*!…*/` | inner block doc comment |
| `/**…*/` | outer block doc comment |

## Other tokens

| Token        | Use |
|--------------|-----|
| `ident`      | [identifiers] |
| `r#ident`    | [raw identifiers] |
| `'ident`     | [lifetimes and loop labels] |
| `'r#ident`   | [raw lifetimes and loop labels] |
| `…u8`, `…i32`, `…f64`, `…usize`, … | [number literals] |
| `"…"`        | [string literals] |
| `r"…"`, `r#"…"#`, `r##"…"##`, … | [raw string literals] |
| `b"…"`       | [byte string literals] |
| `br"…"`, `br#"…"#`, `br##"…"##`, … | [raw byte string literals] |
| `'…'`        | [character literals] |
| `b'…'`       | [byte literals] |
| `c"…"`       | [C string literals] |
| `cr"…"`, `cr#"…"#`, `cr##"…"##`, … | [raw C string literals] |

## Macros

| Syntax                                     | Use |
|--------------------------------------------|-----|
| `ident!(…)``ident! {…}``ident![…]` | [macro invocations] |
| `$ident`                                   | [macro metavariable] |
| `$ident:kind`                              | [macro matcher fragment specifier] |
| `$(…)…`                                    | [macro repetition] |

## Attributes

| Syntax     | Use |
|------------|-----|
| `#[meta]`  | [outer attribute] |
| `#![meta]` | [inner attribute] |

## Expressions

| Expression                | Use |
|---------------------------|-----|
| `\|…\| expr``\|…\| -> Type { … }` | [closures] |
| `ident::…`                | [paths] |
| `::crate_name::…`         | [explicit crate paths] |
| `crate::…`                | [crate-relative paths] |
| `self::…`                 | [module-relative paths] |
| `super::…`                | [parent module paths] |
| `Type::…``<Type as Trait>::ident` | [associated items] |
| `<Type>::…`               | [qualified paths] which can be used for types without names such as `<&T>::…`, `<[T]>::…`, etc. |
| `Trait::method(…)``Type::method(…)``<Type as Trait>::method(…)` | [disambiguated method calls] |
| `method::<…>(…)``path::<…>` | [generic arguments], aka turbofish |
| `()`                      | [unit] |
| `(expr)`                  | [parenthesized expressions] |
| `(expr,)`                 | [single-element tuple expressions] |
| `(expr, …)`               | [tuple expressions] |
| `expr(expr, …)`           | [call expressions] |
| `expr.0`, `expr.1`, …     | [tuple indexing expressions] |
| `expr.ident`              | [field access expressions] |
| `{…}`                     | [block expressions] |
| `Type {…}`                | [struct expressions] |
| `Type(…)`                 | [tuple struct constructors] |
| `[…]`                     | [array expressions] |
| `[expr; len]`             | [repeat array expressions] |
| `expr[..]`, `expr[a..]`, `expr[..b]`, `expr[a..b]`, `expr[a..=b]`, `expr[..=b]` | [array and slice indexing expressions] |
| `if expr {…} else {…}`    | [if expressions] |
| `match expr { pattern => {…} }` | [match expressions] |
| `loop {…}`                | [infinite loop expressions] |
| `while expr {…}`          | [predicate loop expressions] |
| `for pattern in expr {…}` | [iterator loops] |
| `&expr``&mut expr`    | [borrow expressions] |
| `&raw const expr``&raw mut expr` | [raw borrow expressions] |
| `*expr`                   | [dereference expressions] |
| `expr?`                   | [try propagation expressions] |
| `-expr`                   | [negation expressions] |
| `!expr`                   | [bitwise and logical NOT expressions] |
| `expr as Type`            | [type cast expressions] |

## Items

[Items] are the components of a crate.

| Item                          | Use |
|-------------------------------|-----|
| `mod ident;``mod ident {…}` | [modules] |
| `use path;`                   | [use declarations] |
| `fn ident(…) {…}`             | [functions] |
| `type Type = Type;`           | [type aliases] |
| `struct ident {…}`            | [structs] |
| `enum ident {…}`              | [enumerations] |
| `union ident {…}`             | [unions] |
| `trait ident {…}`             | [traits] |
| `impl Type {…}``impl Type for Trait {…}` | [implementations] |
| `const ident = expr;`         | [constant items] |
| `static ident = expr;`        | [static items] |
| `extern "C" {…}`              | [external blocks] |
| `fn ident<…>(…) …``struct ident<…> {…}``enum ident<…> {…}``impl<…> Type<…> {…}` | [generic definitions] |

## Type expressions

[Type expressions] are used to refer to types.

| Type                                  | Use |
|---------------------------------------|-----|
| `bool`, `u8`, `f64`, `str`, …         | [primitive types] |
| `for<…>`                              | [higher-ranked trait bounds] |
| `T: TraitA + TraitB`                  | [trait bounds] |
| `T: 'a + 'b`                          | [lifetime bounds] |
| `T: TraitA + 'a`                      | [trait and lifetime bounds] |
| `T: ?Sized`                           | [relaxed trait bounds] |
| `[Type; len]`                         | [array types] |
| `(Type, …)`                           | [tuple types] |
| `[Type]`                              | [slice types] |
| `(Type)`                              | [parenthesized types] |
| `impl Trait`                          | [impl trait types], [anonymous type parameters] |
| `dyn Trait`                           | [trait object types] |
| `ident``ident::…`                 | [type paths] (can refer to [structs], [enumerations], [unions], [type aliases], [traits], [generics], etc.) |
| `Type<…>``Trait<…>`               | [generic arguments] (e.g. `Vec<u8>`) |
| `Trait<ident = Type>`                 | [associated type bindings] (e.g. `Iterator<Item = T>`) |
| `Trait<ident: …>`                     | [associated type bounds] (e.g. `Iterator<Item: Send>`) |
| `&Type``&mut Type`                | [reference types] |
| `*mut Type``*const Type`          | [raw pointer types] |
| `fn(…) -> Type`                       | [function pointer types] |
| `_`                                   | [inferred type], [inferred const] |
| `'_`                                  | [placeholder lifetime] |
| `!`                                   | [never type] |

## Patterns

[Patterns] are used to match values.

| Pattern                           | Use |
|-----------------------------------|-----|
| `"foo"`, `'a'`, `123`, `2.4`, …   | [literal patterns] |
| `ident`                           | [identifier patterns] |
| `_`                               | [wildcard pattern] |
| `..`                              | [rest pattern] |
| `a..`, `..b`, `a..b`, `a..=b`, `..=b` | [range patterns] |
| `&pattern``&mut pattern`      | [reference patterns] |
| `path {…}`                        | [struct patterns] |
| `path(…)`                         | [tuple struct patterns] |
| `(pattern, …)`                    | [tuple patterns] |
| `(pattern)`                       | [grouped patterns] |
| `[pattern, …]`                    | [slice patterns] |
| `CONST`, `Enum::Variant`, …       | [path patterns] |
