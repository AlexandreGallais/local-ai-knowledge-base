---
title: "Diagnostic attributes (part 1 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/attributes/diagnostics.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[attributes.diagnostics]
# Diagnostic attributes

r[attributes.diagnostics.intro]
The following [attributes] are used for controlling or generating diagnostic
messages during compilation.

r[attributes.diagnostics.lint]
## Lint check attributes

r[attributes.diagnostics.lint.intro]
A lint check names a potentially undesirable coding pattern, such as
unreachable code or omitted documentation.

r[attributes.diagnostics.lint.level]
The lint attributes `allow`,
`expect`, `warn`, `deny`, and `forbid` use the [MetaListPaths] syntax
to specify a list of lint names to change the lint level for the entity
to which the attribute applies.

For any lint check `C`:

r[attributes.diagnostics.lint.allow]
* `#[allow(C)]` overrides the check for `C` so that violations will go
   unreported.

r[attributes.diagnostics.lint.expect]
* `#[expect(C)]` indicates that lint `C` is expected to be emitted. The
  attribute will suppress the emission of `C` or issue a warning, if the
  expectation is unfulfilled.

r[attributes.diagnostics.lint.warn]
* `#[warn(C)]` warns about violations of `C` but continues compilation.

r[attributes.diagnostics.lint.deny]
* `#[deny(C)]` signals an error after encountering a violation of `C`,

r[attributes.diagnostics.lint.forbid]
* `#[forbid(C)]` is the same as `deny(C)`, but also forbids changing the lint
   level afterwards,

> **Note:**
> The lint checks supported by `rustc` can be found via `rustc -W help`, along with their default settings and are documented in the [rustc book].

```rust
pub mod m1 {
    // Missing documentation is ignored here
    #[allow(missing_docs)]
    pub fn undocumented_one() -> i32 { 1 }

    // Missing documentation signals a warning here
    #[warn(missing_docs)]
    pub fn undocumented_too() -> i32 { 2 }

    // Missing documentation signals an error here
    #[deny(missing_docs)]
    pub fn undocumented_end() -> i32 { 3 }
}
```

r[attributes.diagnostics.lint.override]
Lint attributes can override the level specified from a previous attribute, as
long as the level does not attempt to change a forbidden lint
(except for `deny`, which is allowed inside a `forbid` context, but ignored).
Previous attributes are those from a higher level in the syntax tree, or from a
previous attribute on the same entity as listed in left-to-right source order.

This example shows how one can use `allow` and `warn` to toggle a particular
check on and off:

```rust
#[warn(missing_docs)]
pub mod m2 {
    #[allow(missing_docs)]
    pub mod nested {
        // Missing documentation is ignored here
        pub fn undocumented_one() -> i32 { 1 }

        // Missing documentation signals a warning here,
        // despite the allow above.
        #[warn(missing_docs)]
        pub fn undocumented_two() -> i32 { 2 }
    }

    // Missing documentation signals a warning here
    pub fn undocumented_too() -> i32 { 3 }
}
```

This example shows how one can use `forbid` to disallow uses of `allow` or
`expect` for that lint check:

```rust
#[forbid(missing_docs)]
pub mod m3 {
    // Attempting to toggle warning signals an error here
    #[allow(missing_docs)]
    /// Returns 2.
    pub fn undocumented_too() -> i32 { 2 }
}
```

> **Note:**
> `rustc` allows setting lint levels on the command-line, and also supports setting caps on the lints that are reported.

r[attributes.diagnostics.lint.reason]
### Lint reasons

All lint attributes support an additional `reason` parameter, to give context why
a certain attribute was added. This reason will be displayed as part of the lint
message if the lint is emitted at the defined level.

```rust
// `keyword_idents` is allowed by default. Here we deny it to
// avoid migration of identifiers when we update the edition.
#![deny(
    keyword_idents,
    reason = "we want to avoid these idents to be future compatible"
)]

// This name was allowed in Rust's 2015 edition. We still aim to avoid
// this to be future compatible and not confuse end users.
fn dyn() {}
```

Here is another example, where the lint is allowed with a reason:

```rust
use std::path::PathBuf;

pub fn get_path() -> PathBuf {
    // The `reason` parameter on `allow` attributes acts as documentation for the reader.
    #[allow(unused_mut, reason = "this is only modified on some platforms")]
    let mut file_name = PathBuf::from("git");

    #[cfg(target_os = "windows")]
    file_name.set_extension("exe");

    file_name
}
```

r[attributes.diagnostics.expect]
### The `#[expect]` attribute

r[attributes.diagnostics.expect.intro]
The `#[expect(C)]` attribute creates a lint expectation for lint `C`. The
expectation will be fulfilled, if a `#[warn(C)]` attribute at the same location
would result in a lint emission. If the expectation is unfulfilled, because
lint `C` would not be emitted, the `unfulfilled_lint_expectations` lint will
be emitted at the attribute.

```rust
fn main() {
    // This `#[expect]` attribute creates a lint expectation, that the `unused_variables`
    // lint would be emitted by the following statement. This expectation is
    // unfulfilled, since the `question` variable is used by the `println!` macro.
    // Therefore, the `unfulfilled_lint_expectations` lint will be emitted at the
    // attribute.
    #[expect(unused_variables)]
    let question = "who lives in a pineapple under the sea?";
    println!("{question}");

    // This `#[expect]` attribute creates a lint expectation that will be fulfilled, since
    // the `answer` variable is never used. The `unused_variables` lint, that would usually
    // be emitted, is suppressed. No warning will be issued for the statement or attribute.
    #[expect(unused_variables)]
    let answer = "SpongeBob SquarePants!";
}
```

r[attributes.diagnostics.expect.fulfillment]
The lint expectation is only fulfilled by lint emissions which have been suppressed by
the `expect` attribute. If the lint level is modified in the scope with other level
attributes like `allow` or `warn`, the lint emission will be handled accordingly and the
expectation will remain unfulfilled.

```rust
#[expect(unused_variables)]
fn select_song() {
    // This will emit the `unused_variables` lint at the warn level
    // as defined by the `warn` attribute. This will not fulfill the
    // expectation above the function.
    #[warn(unused_variables)]
    let song_name = "Crab Rave";

    // The `allow` attribute suppresses the lint emission. This will not
    // fulfill the expectation as it has been suppressed by the `allow`
    // attribute and not the `expect` attribute above the function.
    #[allow(unused_variables)]
    let song_creator = "Noisestorm";

    // This `expect` attribute will suppress the `unused_variables` lint emission
    // at the variable. The `expect` attribute above the function will still not
    // be fulfilled, since this lint emission has been suppressed by the local
    // expect attribute.
    #[expect(unused_variables)]
    let song_version = "Monstercat Release";
}
```

r[attributes.diagnostics.expect.independent]
If the `expect` attribute contains several lints, each one is expected separately. For a
lint group it's enough if one lint inside the group has been emitted:

```rust
// This expectation will be fulfilled by the unused value inside the function
// since the emitted `unused_variables` lint is inside the `unused` lint group.
#[expect(unused)]
pub fn thoughts() {
    let unused = "I'm running out of examples";
}

pub fn another_example() {
    // This attribute creates two lint expectations. The `unused_mut` lint will be
    // suppressed and with that fulfill the first expectation. The `unused_variables`
    // wouldn't be emitted, since the variable is used. That expectation will therefore
    // be unsatisfied, and a warning will be emitted.
    #[expect(unused_mut, unused_variables)]
    let mut link = "https://www.rust-lang.org/";

    println!("Welcome to our community: {link}");
}
```

> **Note:**
> The behavior of `#[expect(unfulfilled_lint_expectations)]` is currently defined to always generate the `unfulfilled_lint_expectations` lint.

r[attributes.diagnostics.lint.group]
### Lint groups

r[attributes.diagnostics.lint.group.intro]
Lints may be organized into named groups so that the level of related lints can be adjusted together.

r[attributes.diagnostics.lint.group.equivalence]
Using a named group is equivalent to listing out the lints within that group.

```rust
// This allows all lints in the "unused" group.
#[allow(unused)]
// This overrides the "unused_must_use" lint from the "unused"
// group to deny.
#[deny(unused_must_use)]
fn example() {
    // This does not generate a warning because the "unused_variables"
    // lint is in the "unused" group.
    let x = 1;
    // This generates an error because the result is unused and
    // "unused_must_use" is marked as "deny".
    std::fs::remove_file("some_file"); // ERROR: unused `Result` that must be used
}
```

r[attributes.diagnostics.lint.group.warnings]
There is a special group named "warnings" which includes all lints at the
"warn" level. The "warnings" group ignores attribute order and applies to all
lints that would otherwise warn within the entity.

```rust
# unsafe fn an_unsafe_fn() {}
// The order of these two attributes does not matter.
#[deny(warnings)]
// The unsafe_code lint is normally "allow" by default.
#[warn(unsafe_code)]
fn example_err() {
    // This is an error because the `unsafe_code` warning has
    // been lifted to "deny".
    unsafe { an_unsafe_fn() } // ERROR: use of `unsafe` block
}
```

r[attributes.diagnostics.lint.tool]
### Tool lint attributes

r[attributes.diagnostics.lint.tool.intro]
Tool lints allows using scoped lints, to `allow`, `warn`, `deny` or `forbid`
lints of certain tools.

r[attributes.diagnostics.lint.tool.activation]
Tool lints only get checked when the associated tool is active. If a lint
attribute, such as `allow`, references a nonexistent tool lint, the compiler
will not warn about the nonexistent lint until you use the tool.

Otherwise, they work just like regular lint attributes:

```rust
// set the entire `pedantic` clippy lint group to warn
#![warn(clippy::pedantic)]
// silence warnings from the `filter_map` clippy lint
#![allow(clippy::filter_map)]

fn main() {
    // ...
}

// silence the `cmp_nan` clippy lint just for this function
#[allow(clippy::cmp_nan)]
fn foo() {
    // ...
}
```

> **Note:**
> `rustc` currently recognizes the tool lints for "[clippy]" and "[rustdoc]".

r[attributes.diagnostics.deprecated]
## The `deprecated` attribute

r[attributes.diagnostics.deprecated.intro]
The *`deprecated` attribute* marks an item as deprecated. `rustc` will issue
warnings on use of `#[deprecated]` items. `rustdoc` will show item
deprecation, including the `since` version and `note`, if available.

r[attributes.diagnostics.deprecated.syntax]
The `deprecated` attribute has several forms:

- `deprecated` --- Issues a generic message.
- `deprecated = "message"` --- Includes the given string in the deprecation
  message.
- [MetaListNameValueStr] syntax with two optional fields:
  - `since` --- Specifies a version number when the item was deprecated. `rustc`
    does not currently interpret the string, but external tools like [Clippy]
    may check the validity of the value.
  - `note` --- Specifies a string that should be included in the deprecation
    message. This is typically used to provide an explanation about the
    deprecation and preferred alternatives.

r[attributes.diagnostics.deprecated.allowed-positions]
The `deprecated` attribute may be applied to any [item], [trait item], [enum
variant], [struct field], [external block item], or [macro definition]. It
cannot be applied to trait implementation items. When applied to an item
containing other items, such as a [module] or [implementation], all child
items inherit the deprecation attribute.

Here is an example:

```rust
#[deprecated(since = "5.2.0", note = "foo was rarely used. Users should instead use bar")]
pub fn foo() {}

pub fn bar() {}
```

The RFC contains motivations and more details.

r[attributes.diagnostics.must_use]
