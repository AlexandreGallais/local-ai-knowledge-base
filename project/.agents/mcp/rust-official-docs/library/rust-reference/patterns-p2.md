---
title: "Patterns (part 2 of 3)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/patterns.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Patterns (part 2 of 3)

## Rest pattern

r[patterns.rest.syntax]
```grammar
RestPattern -> `..`
```

r[patterns.rest.intro]
The _rest pattern_ (the `..` token) acts as a variable-length pattern which matches zero or more elements that haven't been matched already before and after.

r[patterns.rest.allowed-patterns]
It may only be used in tuple, tuple struct, and slice patterns, and may only appear once as one of the elements in those patterns. It is also allowed in an identifier pattern for slice patterns only.

r[patterns.rest.refutable]
The rest pattern is always irrefutable.

Examples:

```rust
# let words = vec!["a", "b", "c"];
# let slice = &words[..];
match slice {
    [] => println!("slice is empty"),
    [one] => println!("single element {}", one),
    [head, tail @ ..] => println!("head={} tail={:?}", head, tail),
}

match slice {
    // Ignore everything but the last element, which must be "!".
    [.., "!"] => println!("!!!"),

    // `start` is a slice of everything except the last element, which must be "z".
    [start @ .., "z"] => println!("starts with: {:?}", start),

    // `end` is a slice of everything but the first element, which must be "a".
    ["a", end @ ..] => println!("ends with: {:?}", end),

    // 'whole' is the entire slice and `last` is the final element
    whole @ [.., last] => println!("the last element of {:?} is {}", whole, last),

    rest => println!("{:?}", rest),
}

if let [.., penultimate, _] = slice {
    println!("next to last is {}", penultimate);
}

# let tuple = (1, 2, 3, 4, 5);
// The rest pattern may also be used in tuple and tuple
// struct patterns.
match tuple {
    (1, .., y, z) => println!("y={} z={}", y, z),
    (.., 5) => println!("tail must be 5"),
    (..) => println!("matches everything else"),
}
```

r[patterns.range]
## Range patterns

r[patterns.range.syntax]
```grammar
ModernRangePattern ->
      RangeExclusivePattern
    | RangeInclusivePattern
    | RangeFromPattern
    | RangeToExclusivePattern
    | RangeToInclusivePattern

RangeExclusivePattern ->
      RangePatternBound `..` RangePatternBound

RangeInclusivePattern ->
      RangePatternBound `..=` RangePatternBound

RangeFromPattern ->
      RangePatternBound `..`

RangeToExclusivePattern ->
      `..` RangePatternBound

RangeToInclusivePattern ->
      `..=` RangePatternBound

ObsoleteRangePattern ->
    RangePatternBound `...` RangePatternBound

RangePatternBound ->
      LiteralPattern
    | PathExpression
```

r[patterns.range.intro]
*Range patterns* match scalar values within the range defined by their bounds. They comprise a *sigil* (`..` or `..=`) and a bound on one or both sides.

A bound on the left of the sigil is called a *lower bound*. A bound on the right is called an *upper bound*.

r[patterns.range.exclusive]
The *exclusive range pattern* matches all values from the lower bound up to, but not including the upper bound. It is written as its lower bound, followed by `..`, followed by the upper bound.

For example, a pattern `'m'..'p'` will match only `'m'`, `'n'` and `'o'`, specifically **not** including `'p'`.

r[patterns.range.inclusive]
The *inclusive range pattern* matches all values from the lower bound up to and including the upper bound. It is written as its lower bound, followed by `..=`, followed by the upper bound.

For example, a pattern `'m'..='p'` will match only the values `'m'`, `'n'`, `'o'`, and `'p'`.

r[patterns.range.from]
The *from range pattern* matches all values greater than or equal to the lower bound. It is written as its lower bound followed by `..`.

For example, `1..` will match any integer greater than or equal to 1, such as 1, 9, or 9001, or <example-card-number> (if it is of an appropriate size), but not 0, and not negative numbers for signed integers.

r[patterns.range.to-exclusive]
The *to exclusive range pattern* matches all values less than the upper bound. It is written as `..` followed by the upper bound.

For example, `..10` will match any integer less than 10, such as 9, 1, 0, and for signed integer types, all negative values.

r[patterns.range.to-inclusive]
The *to inclusive range pattern* matches all values less than or equal to the upper bound. It is written as `..=` followed by the upper bound.

For example, `..=10` will match any integer less than or equal to 10, such as 10, 1, 0, and for signed integer types, all negative values.

r[patterns.range.constraint-nonempty]
A range pattern must be nonempty; it must span at least one value in the set of possible values for its type. In other words:

* In `a..=b`, a &le; b must be the case. For example, it is an error to have a range pattern `10..=0`, but `10..=10` is allowed.
* In `a..b`, a < b must be the case. For example, it is an error to have a range pattern `10..0` or `10..10`.
* In `..b`, b must not be the smallest value of its type. For example, it is an error to have a range pattern `..-128i8` or `..f64::NEG_INFINITY`.

r[patterns.range.bound]
A bound is written as one of:

* A character, byte, integer, or float literal.
* A `-` followed by an integer or float literal.
* A [path].

> **Note:**
>
> We syntactically accept more than this for a *[RangePatternBound]*. We later reject the other things semantically.

r[patterns.range.constraint-bound-path]
If a bound is written as a path, after macro resolution, the path must resolve to a constant item of the type `char`, an integer type, or a float type.

r[patterns.range.type]
The range pattern matches the type of its upper and lower bounds, which must be the same type.

r[patterns.range.path-value]
If a bound is a [path], the bound matches the type and has the value of the [constant] the path resolves to.

r[patterns.range.literal-value]
If a bound is a literal, the bound matches the type and has the value of the corresponding [literal expression].

r[patterns.range.negation]
If a bound is a literal preceded by a `-`, the bound matches the same type as the corresponding [literal expression] and has the value of [negating] the value of the corresponding literal expression.

r[patterns.range.float-restriction]
For float range patterns, the constant may not be a `NaN`.

Examples:

```rust
# let c = 'f';
let valid_variable = match c {
    'a'..='z' => true,
    'A'..='Z' => true,
    'α'..='ω' => true,
    _ => false,
};

# let ph = 10;
println!("{}", match ph {
    0..7 => "acid",
    7 => "neutral",
    8..=14 => "base",
    _ => unreachable!(),
});

# let uint: u32 = 5;
match uint {
    0 => "zero!",
    1.. => "positive number!",
};

// using paths to constants:
# const TROPOSPHERE_MIN : u8 = 6;
# const TROPOSPHERE_MAX : u8 = 20;
#
# const STRATOSPHERE_MIN : u8 = TROPOSPHERE_MAX + 1;
# const STRATOSPHERE_MAX : u8 = 50;
#
# const MESOSPHERE_MIN : u8 = STRATOSPHERE_MAX + 1;
# const MESOSPHERE_MAX : u8 = 85;
#
# let altitude = 70;
#
println!("{}", match altitude {
    TROPOSPHERE_MIN..=TROPOSPHERE_MAX => "troposphere",
    STRATOSPHERE_MIN..=STRATOSPHERE_MAX => "stratosphere",
    MESOSPHERE_MIN..=MESOSPHERE_MAX => "mesosphere",
    _ => "outer space, maybe",
});

# pub mod binary {
#     pub const MEGA : u64 = 1024*1024;
#     pub const GIGA : u64 = 1024*1024*1024;
# }
# let n_items = 20_832_425;
# let bytes_per_item = 12;
if let size @ binary::MEGA..=binary::GIGA = n_items * bytes_per_item {
    println!("It fits and occupies {} bytes", size);
}

# trait MaxValue {
#     const MAX: u64;
# }
# impl MaxValue for u8 {
#     const MAX: u64 = (1 << 8) - 1;
# }
# impl MaxValue for u16 {
#     const MAX: u64 = (1 << 16) - 1;
# }
# impl MaxValue for u32 {
#     const MAX: u64 = (1 << 32) - 1;
# }
// using qualified paths:
println!("{}", match 0xfacade {
    0 ..= <u8 as MaxValue>::MAX => "fits in a u8",
    0 ..= <u16 as MaxValue>::MAX => "fits in a u16",
    0 ..= <u32 as MaxValue>::MAX => "fits in a u32",
    _ => "too big",
});
```

r[patterns.range.refutable]
Range patterns for fix-width integer and `char` types are irrefutable when they span the entire set of possible values of a type. For example, `0u8..=255u8` is irrefutable.

r[patterns.range.refutable-integer]
The range of values for an integer type is the closed range from its minimum to maximum value.

r[patterns.range.refutable-char]
The range of values for a `char` type are precisely those ranges containing all Unicode Scalar Values: `'\u{0000}'..='\u{D7FF}'` and `'\u{E000}'..='\u{10FFFF}'`.

r[patterns.range.constraint-slice]
[RangeFromPattern] cannot be used as a top-level pattern for subpatterns in slice patterns. For example, the pattern `[1.., _]` is not a valid pattern.

r[patterns.range.edition2021]
> [!EDITION-2021]
> Before the 2021 edition, range patterns with both a lower and upper bound may also be written using `...` in place of `..=`, with the same meaning.

r[patterns.ref]
## Reference patterns

r[patterns.ref.syntax]
```grammar
ReferencePattern -> (`&`|`&&`) `mut`? PatternWithoutModernRange
```

r[patterns.ref.intro]
Reference patterns dereference the pointers that are being matched and, thus, borrow them.

For example, these two matches on `x: &i32` are equivalent:

```rust
let int_reference = &3;

let a = match *int_reference { 0 => "zero", _ => "some" };
let b = match int_reference { &0 => "zero", _ => "some" };

assert_eq!(a, b);
```

r[patterns.ref.ref-ref]
The grammar production for reference patterns has to match the token `&&` to match a reference to a reference because it is a token by itself, not two `&` tokens.

r[patterns.ref.mut]
Adding the `mut` keyword dereferences a mutable reference. The mutability must match the mutability of the reference.

r[patterns.ref.refutable]
Reference patterns are always irrefutable.

r[patterns.struct]
## Struct patterns

r[patterns.struct.syntax]
```grammar
StructPattern ->
    PathInExpression `{`
        StructPatternElements?
    `}`

StructPatternElements ->
      StructPatternFields (`,` | `,` StructPatternEtCetera)?
    | StructPatternEtCetera

StructPatternFields ->
    StructPatternField (`,` StructPatternField)*

StructPatternField ->
    OuterAttribute*
    (
        TUPLE_INDEX `:` Pattern
      | IDENTIFIER `:` Pattern
      | `ref`? `mut`? IDENTIFIER
    )

StructPatternEtCetera -> `..`
```

r[patterns.struct.intro]
Struct patterns match struct, enum, and union values that match all criteria defined by its subpatterns. They are also used to destructure a struct, enum, or union value.

r[patterns.struct.ignore-rest]
On a struct pattern, the fields are referenced by name, index (in the case of tuple structs) or ignored by use of `..`:

```rust
# struct Point {
#     x: u32,
#     y: u32,
# }
# let s = Point {x: 1, y: 1};
#
match s {
    Point {x: 10, y: 20} => (),
    Point {y: 10, x: 20} => (),    // order doesn't matter
    Point {x: 10, ..} => (),
    Point {..} => (),
}

# struct PointTuple (
#     u32,
#     u32,
# );
# let t = PointTuple(1, 2);
#
match t {
    PointTuple {0: 10, 1: 20} => (),
    PointTuple {1: 10, 0: 20} => (),   // order doesn't matter
    PointTuple {0: 10, ..} => (),
    PointTuple {..} => (),
}

# enum Message {
#     Quit,
#     Move { x: i32, y: i32 },
# }
# let m = Message::Quit;
#
match m {
    Message::Quit => (),
    Message::Move {x: 10, y: 20} => (),
    Message::Move {..} => (),
}
```

r[patterns.struct.constraint-struct]
If `..` is not used, a struct pattern used to match a struct is required to specify all fields:

```rust
# struct Struct {
#    a: i32,
#    b: char,
#    c: bool,
# }
# let mut struct_value = Struct{a: 10, b: 'X', c: false};
#
match struct_value {
    Struct{a: 10, b: 'X', c: false} => (),
    Struct{a: 10, b: 'X', ref c} => (),
    Struct{a: 10, b: 'X', ref mut c} => (),
    Struct{a: 10, b: 'X', c: _} => (),
    Struct{a: _, b: _, c: _} => (),
}
```

r[patterns.struct.constraint-union]
A struct pattern used to match a union must specify exactly one field (see [Pattern matching on unions]).

r[patterns.struct.binding-shorthand]
The [IDENTIFIER] syntax matches any value and binds it to a variable with the same name as the given field. It is a shorthand for `fieldname: fieldname`. The `ref` and `mut` qualifiers can be included with the behavior as described in [patterns.ident.ref].

```rust
# struct Struct {
#    a: i32,
#    b: char,
#    c: bool,
# }
# let struct_value = Struct{a: 10, b: 'X', c: false};
#
let Struct { a, b, c } = struct_value;
```

r[patterns.struct.refutable]
A struct pattern is refutable if the [PathInExpression] resolves to a constructor of an enum with more than one variant, or one of its subpatterns is refutable.

r[patterns.struct.namespace]
A struct pattern matches against the struct, union, or enum variant whose constructor is resolved from [PathInExpression] in the [type namespace]. See [patterns.tuple-struct.namespace] for more details.

r[patterns.tuple-struct]
## Tuple struct patterns

r[patterns.tuple-struct.syntax]
```grammar
TupleStructPattern -> PathInExpression `(` TupleStructItems? `)`

TupleStructItems -> Pattern ( `,` Pattern )* `,`?
```

r[patterns.tuple-struct.intro]
Tuple struct patterns match tuple struct and enum values that match all criteria defined by its subpatterns. They are also used to destructure a tuple struct or enum value.

r[patterns.tuple-struct.refutable]
A tuple struct pattern is refutable if the [PathInExpression] resolves to a constructor of an enum with more than one variant, or one of its subpatterns is refutable.

r[patterns.tuple-struct.namespace]
A tuple struct pattern matches against the tuple struct or [tuple-like enum variant] whose constructor is resolved from [PathInExpression] in the [value namespace].

> **Note:**
> Conversely, a struct pattern for a tuple struct or [tuple-like enum variant], e.g. `S { 0: _ }`, matches against the tuple struct or variant whose constructor is resolved in the [type namespace].
>
> ```rust,no_run
> enum E1 { V(u16) }
> enum E2 { V(u32) }
>
> // Import `E1::V` from the type namespace only.
> mod _0 {
>     const V: () = (); // For namespace masking.
>     pub(super) use super::E1::*;
> }
> use _0::*;
>
> // Import `E2::V` from the value namespace only.
> mod _1 {
>     struct V {} // For namespace masking.
>     pub(super) use super::E2::*;
> }
> use _1::*;
>
> fn f() {
>     // This struct pattern matches against the tuple-like
>     // enum variant whose constructor was found in the type
>     // namespace.
>     let V { 0: ..=u16::MAX } = (loop {}) else { loop {} };
>     // This tuple struct pattern matches against the tuple-like
>     // enum variant whose constructor was found in the value
>     // namespace.
>     let V(..=u32::MAX) = (loop {}) else { loop {} };
> }
> # // Required due to the odd behavior of `super` within functions.
> # fn main() {}
> ```
>
> The Lang team has made certain decisions, such as in [PR #138458], that raise questions about the desirability of using the value namespace in this way for patterns, as described in [PR #140593]. It might be prudent to not intentionally rely on this nuance in your code.

r[patterns.tuple]
