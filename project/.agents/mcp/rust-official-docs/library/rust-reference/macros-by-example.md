---
title: "Macros by example (part 1 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/macros-by-example.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[macro.decl]
# Macros by example

r[macro.decl.syntax]
```grammar
MacroRulesDefinition ->
    `macro_rules` `!` IDENTIFIER MacroRulesDef

MacroRulesDef ->
      `(` MacroRules `)` `;`
    | `[` MacroRules `]` `;`
    | `{` MacroRules `}`

MacroRules ->
    MacroRule ( `;` MacroRule )* `;`?

MacroRule ->
    MacroMatcher `=>` MacroTranscriber

MacroMatcher ->
      `(` MacroMatch* `)`
    | `[` MacroMatch* `]`
    | `{` MacroMatch* `}`

MacroMatch ->
      Token <example-value> `$` and [delimiters][lex.token.delim]_
    | MacroMatcher
    | `$` ( IDENTIFIER_OR_KEYWORD _except `crate`_ | RAW_IDENTIFIER ) `:` MacroFragSpec
    | `$` `(` MacroMatch+ `)` MacroRepSep? MacroRepOp

MacroFragSpec ->
      `block` | `expr` | `expr_2021` | `ident` | `item` | `lifetime` | `literal`
    | `meta` | `pat` | `pat_param` | `path` | `stmt` | `tt` | `ty` | `vis`

MacroRepSep -> Token <example-value> [delimiters][lex.token.delim] and [MacroRepOp]_

MacroRepOp -> `*` | `+` | `?`

MacroTranscriber -> DelimTokenTree
```

r[macro.decl.intro]
`macro_rules` allows users to define syntax extension in a declarative way.  We call such extensions "macros by example" or simply "macros".

Each macro by example has a name, and one or more _rules_. Each rule has two parts: a _matcher_, describing the syntax that it matches, and a _transcriber_, describing the syntax that will replace a successfully matched invocation. Both the matcher and the transcriber must be surrounded by delimiters. Macros can expand to expressions, statements, items (including traits, impls, and foreign items), types, or patterns.

r[macro.decl.transcription]
## Transcribing

r[macro.decl.transcription.intro]
When a macro is invoked, the macro expander looks up macro invocations by name, and tries each macro rule in turn. It transcribes the first successful match; if this results in an error, then future matches are not tried.

r[macro.decl.transcription.lookahead]
When matching, no lookahead is performed; if the compiler cannot unambiguously determine how to parse the macro invocation one token at a time, then it is an error. In the following example, the compiler does not look ahead past the identifier to see if the following token is a `)`, even though that would allow it to parse the invocation unambiguously:

```rust
macro_rules! ambiguity {
    ($($i:ident)* $j:ident) => { };
}

ambiguity!(error); // Error: local ambiguity
```

r[macro.decl.transcription.syntax]
In both the matcher and the transcriber, the `$` token is used to invoke special behaviours from the macro engine (described below in [Metavariables] and [Repetitions]). Tokens that aren't part of such an invocation are matched and transcribed literally, with one exception. The exception is that the outer delimiters for the matcher will match any pair of delimiters. Thus, for instance, the matcher `(())` will match `{()}` but not `{{}}`. The character `$` cannot be matched or transcribed literally.

r[macro.decl.transcription.fragment]
### Forwarding a matched fragment

When forwarding a matched fragment to another macro-by-example, matchers in the second macro will see an opaque AST of the fragment type. The second macro can't use literal tokens to match the fragments in the matcher, only a fragment specifier of the same type. The `ident`, `lifetime`, and `tt` fragment types are an exception, and *can* be matched by literal tokens. The following illustrates this restriction:

```rust
macro_rules! foo {
    ($l:expr) => { bar!($l); }
// ERROR:               ^^ no rules expected this token in macro call
}

macro_rules! bar {
    (3) => {}
}

foo!(3);
```

The following illustrates how tokens can be directly matched after matching a `tt` fragment:

```rust
// compiles OK
macro_rules! foo {
    ($l:tt) => { bar!($l); }
}

macro_rules! bar {
    (3) => {}
}

foo!(3);
```

r[macro.decl.meta]
## Metavariables

r[macro.decl.meta.intro]
In the matcher, `$` _name_ `:` _fragment-specifier_ matches a Rust syntax fragment of the kind specified and binds it to the metavariable `$`_name_.

r[macro.decl.meta.specifier]
Valid fragment specifiers are:

  * `block`: a [BlockExpressionNoInnerAttributes]
  * `expr`: an [Expression]
  * `expr_2021`: an [Expression] except [UnderscoreExpression] and [ConstBlockExpression] (see [macro.decl.meta.edition2024])
  * `ident`: an [IDENTIFIER_OR_KEYWORD] except `_`, [RAW_IDENTIFIER], or [`$crate`]
  * `item`: an [Item]
  * `lifetime`: a [LIFETIME_TOKEN]
  * `literal`: matches `-`?[LiteralExpression]
  * `meta`: an [Attr], the contents of an attribute
  * `pat`: a [Pattern] (see [macro.decl.meta.edition2021])
  * `pat_param`: a [PatternNoTopAlt]
  * `path`: a [TypePath]
  * `stmt`: a Statement without the trailing semicolon (except for item statements that require semicolons)
  * `tt`: a [TokenTree] (a single [token] or tokens in matching delimiters `()`, `[]`, or `{}`)
  * `ty`: a Type
  * `vis`: a possibly empty [Visibility] qualifier

r[macro.decl.meta.transcription]
In the transcriber, metavariables are referred to simply by `$`_name_, since the fragment kind is specified in the matcher. Metavariables are replaced with the syntax element that matched them. Metavariables can be transcribed more than once or not at all.

r[macro.decl.meta.dollar-crate]
The keyword metavariable [`$crate`] can be used to refer to the current crate.

r[macro.decl.meta.edition2021]
> [!EDITION-2021]
> Starting with the 2021 edition, `pat` fragment-specifiers match top-level or-patterns (that is, they accept [Pattern]).
>
> Before the 2021 edition, they match exactly the same fragments as `pat_param` (that is, they accept [PatternNoTopAlt]).
>
> The relevant edition is the one in effect for the `macro_rules!` definition.

r[macro.decl.meta.edition2024]
> [!EDITION-2024]
> Before the 2024 edition, `expr` fragment specifiers do not match [UnderscoreExpression] or [ConstBlockExpression] at the top level. They are allowed within subexpressions.
>
> The `expr_2021` fragment specifier exists to maintain backwards compatibility with editions before 2024.

r[macro.decl.repetition]
## Repetitions

r[macro.decl.repetition.intro]
In both the matcher and transcriber, repetitions are indicated by placing the tokens to be repeated inside `$(`…`)`, followed by a repetition operator, optionally with a separator token between.

r[macro.decl.repetition.separator]
The separator token can be any token other than a delimiter or one of the repetition operators, but `;` and `,` are the most common. For instance, `$( $i:ident ),*` represents any number of identifiers separated by commas. Nested repetitions are permitted.

r[macro.decl.repetition.operators]
The repetition operators are:

- `*` --- indicates any number of repetitions.
- `+` --- indicates any number but at least one.
- `?` --- indicates an optional fragment with zero or one occurrence.

r[macro.decl.repetition.optional-restriction]
Since `?` represents at most one occurrence, it cannot be used with a separator.

r[macro.decl.repetition.fragment]
The repeated fragment both matches and transcribes to the specified number of the fragment, separated by the separator token. Metavariables are matched to every repetition of their corresponding fragment. For instance, the `$( $i:ident ),*` example above matches `$i` to all of the identifiers in the list.

During transcription, additional restrictions apply to repetitions so that the compiler knows how to expand them properly:

1.  A metavariable must appear in exactly the same number, kind, and nesting order of repetitions in the transcriber as it did in the matcher. So for the matcher `$( $i:ident ),*`, the transcribers `=> { $i }`, `=> { $( $( $i )* )* }`, and `=> { $( $i )+ }` are all illegal, but `=> { $( $i );* }` is correct and replaces a comma-separated list of identifiers with a semicolon-separated list.
2.  Each repetition in the transcriber must contain at least one metavariable to decide how many times to expand it. If multiple metavariables appear in the same repetition, they must be bound to the same number of fragments. For instance, `( $( $i:ident ),* ; $( $j:ident ),* ) => (( $( ($i,$j) ),* ))` must bind the same number of `$i` fragments as `$j` fragments. This means that invoking the macro with `(a, b, c; d, e, f)` is legal and expands to `((a,d), (b,e), (c,f))`, but `(a, b, c; d, e)` is illegal because it does not have the same number. This requirement applies to every layer of nested repetitions.

r[macro.decl.scope]
