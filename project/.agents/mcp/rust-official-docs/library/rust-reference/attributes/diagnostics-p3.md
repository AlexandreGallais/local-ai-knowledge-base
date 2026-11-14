---
title: "Diagnostic attributes (part 3 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/attributes/diagnostics.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Diagnostic attributes (part 3 of 3)

## The `diagnostic` tool attribute namespace

r[attributes.diagnostic.namespace.intro]
The `#[diagnostic]` attribute namespace is a home for attributes to influence compile-time error messages.
The hints provided by these attributes are not guaranteed to be used.

r[attributes.diagnostic.namespace.unknown-invalid-syntax]
Unknown attributes in this namespace are accepted, though they may emit warnings for unused attributes.
Additionally, invalid inputs to known attributes will typically be a warning (see the attribute definitions for details).
This is meant to allow adding or discarding attributes and changing inputs in the future to allow changes without the need to keep the non-meaningful attributes or options working.

r[attributes.diagnostic.on_unimplemented]
### The `diagnostic::on_unimplemented` attribute

r[attributes.diagnostic.on_unimplemented.intro]
The `#[diagnostic::on_unimplemented]` attribute is a hint to the compiler to supplement the error message that would normally be generated in scenarios where a trait is required but not implemented on a type.

r[attributes.diagnostic.on_unimplemented.allowed-positions]
The attribute should be placed on a [trait declaration], though it is not an error to be located in other positions.

r[attributes.diagnostic.on_unimplemented.syntax]
The attribute uses the [MetaListNameValueStr] syntax to specify its inputs, though any malformed input to the attribute is not considered as an error to provide both forwards and backwards compatibility.

r[attributes.diagnostic.on_unimplemented.keys]
The following keys have the given meaning:
* `message` --- The text for the top level error message.
* `label` --- The text for the label shown inline in the broken code in the error message.
* `note` --- Provides additional notes.

r[attributes.diagnostic.on_unimplemented.note-repetition]
The `note` option can appear several times, which results in several note messages being emitted.

r[attributes.diagnostic.on_unimplemented.repetition]
If any of the other options appears several times the first occurrence of the relevant option specifies the actually used value. Subsequent occurrences generates a warning.

r[attributes.diagnostic.on_unimplemented.unknown-keys]
A warning is generated for any unknown keys.

r[attributes.diagnostic.on_unimplemented.format-string]
All three options accept a string as an argument, interpreted using the same formatting as a [`std::fmt`] string.

r[attributes.diagnostic.on_unimplemented.format-parameters]
Format parameters with the given named parameter will be replaced with the following text:
* `{Self}` --- The name of the type implementing the trait.
* `{` *GenericParameterName* `}` --- The name of the generic argument's type for the given generic parameter.

r[attributes.diagnostic.on_unimplemented.invalid-formats]
Any other format parameter will generate a warning, but will otherwise be included in the string as-is.

r[attributes.diagnostic.on_unimplemented.invalid-string]
Invalid format strings may generate a warning, but are otherwise allowed, but may not display as intended.
Format specifiers may generate a warning, but are otherwise ignored.

In this example:

```rust
#[diagnostic::on_unimplemented(
    message = "My Message for `ImportantTrait<{A}>` implemented for `{Self}`",
    label = "My Label",
    note = "Note 1",
    note = "Note 2"
)]
trait ImportantTrait<A> {}

fn use_my_trait(_: impl ImportantTrait<i32>) {}

fn main() {
    use_my_trait(String::new());
}
```

the compiler may generate an error message which looks like this:

```text
error[E0277]: My Message for `ImportantTrait<i32>` implemented for `String`
  --> src/main.rs:14:18
   |
14 |     use_my_trait(String::new());
   |     ------------ ^^^^^^^^^^^^^ My Label
   |     |
   |     required by a bound introduced by this call
   |
   = help: the trait `ImportantTrait<i32>` is not implemented for `String`
   = note: Note 1
   = note: Note 2
```

r[attributes.diagnostic.do_not_recommend]
### The `diagnostic::do_not_recommend` attribute

r[attributes.diagnostic.do_not_recommend.intro]
The `#[diagnostic::do_not_recommend]` attribute is a hint to the compiler to not show the annotated trait implementation as part of a diagnostic message.

> **Note:**
> Suppressing the recommendation can be useful if you know that the recommendation would normally not be useful to the programmer. This often occurs with broad, blanket impls. The recommendation may send the programmer down the wrong path, or the trait implementation may be an internal detail that you don't want to expose, or the bounds may not be able to be satisfied by the programmer.
>
> For example, in an error message about a type not implementing a required trait, the compiler may find a trait implementation that would satisfy the requirements if it weren't for specific bounds in the trait implementation. The compiler may tell the user that there is an impl, but the problem is the bounds in the trait implementation. The `#[diagnostic::do_not_recommend]` attribute can be used to tell the compiler to *not* tell the user about the trait implementation, and instead simply tell the user the type doesn't implement the required trait.

r[attributes.diagnostic.do_not_recommend.allowed-positions]
The attribute should be placed on a trait implementation item, though it is not an error to be located in other positions.

r[attributes.diagnostic.do_not_recommend.syntax]
The attribute does not accept any arguments, though unexpected arguments are not considered as an error.

In the following example, there is a trait called `AsExpression` which is used for casting arbitrary types to the `Expression` type used in an SQL library. There is a method called `check` which takes an `AsExpression`.

```rust
# pub trait Expression {
#     type SqlType;
# }
#
# pub trait AsExpression<ST> {
#     type Expression: Expression<SqlType = ST>;
# }
#
# pub struct Text;
# pub struct Integer;
#
# pub struct Bound<T>(T);
# pub struct SelectInt;
#
# impl Expression for SelectInt {
#     type SqlType = Integer;
# }
#
# impl<T> Expression for Bound<T> {
#     type SqlType = T;
# }
#
# impl AsExpression<Integer> for i32 {
#     type Expression = Bound<Integer>;
# }
#
# impl AsExpression<Text> for &'_ str {
#     type Expression = Bound<Text>;
# }
#
# impl<T> Foo for T where T: Expression {}

// Uncomment this line to change the recommendation.
// #[diagnostic::do_not_recommend]
impl<T, ST> AsExpression<ST> for T
where
    T: Expression<SqlType = ST>,
{
    type Expression = T;
}

trait Foo: Expression + Sized {
    fn check<T>(&self, _: T) -> <T as AsExpression<<Self as Expression>::SqlType>>::Expression
    where
        T: AsExpression<Self::SqlType>,
    {
        todo!()
    }
}

fn main() {
    SelectInt.check("bar");
}
```

The `SelectInt` type's `check` method is expecting an `Integer` type. Calling it with an i32 type works, as it gets converted to an `Integer` by the `AsExpression` trait. However, calling it with a string does not, and generates a an error that may look like this:

```text
error[E0277]: the trait bound `&str: Expression` is not satisfied
  --> src/main.rs:53:15
   |
53 |     SelectInt.check("bar");
   |               ^^^^^ the trait `Expression` is not implemented for `&str`
   |
   = help: the following other types implement trait `Expression`:
             Bound<T>
             SelectInt
note: required for `&str` to implement `AsExpression<Integer>`
  --> src/main.rs:45:13
   |
45 | impl<T, ST> AsExpression<ST> for T
   |             ^^^^^^^^^^^^^^^^     ^
46 | where
47 |     T: Expression<SqlType = ST>,
   |        ------------------------ unsatisfied trait bound introduced here
```

By adding the `#[diagnostic::do_not_recommend]` attribute to the blanket `impl` for `AsExpression`, the message changes to:

```text
error[E0277]: the trait bound `&str: AsExpression<Integer>` is not satisfied
  --> src/main.rs:53:15
   |
53 |     SelectInt.check("bar");
   |               ^^^^^ the trait `AsExpression<Integer>` is not implemented for `&str`
   |
   = help: the trait `AsExpression<Integer>` is not implemented for `&str`
           but trait `AsExpression<Text>` is implemented for it
   = help: for that trait implementation, expected `Text`, found `Integer`
```

The first error message includes a somewhat confusing error message about the relationship of `&str` and `Expression`, as well as the unsatisfied trait bound in the blanket impl. After adding `#[diagnostic::do_not_recommend]`, it no longer considers the blanket impl for the recommendation. The message should be a little clearer, with an indication that a string cannot be converted to an `Integer`.
