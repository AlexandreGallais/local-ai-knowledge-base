---
title: "Associated items (part 2 of 2)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/items/associated-items.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Associated items (part 2 of 2)

## Associated constants

r[items.associated.const.intro]
*Associated constants* are [constants] associated with a type.

r[items.associated.const.decl]
An *associated constant declaration* declares a signature for associated constant definitions. It is written as `const`, then an identifier, then `:`, then a type, finished by a `;`.

r[items.associated.const.name]
The identifier is the name of the constant used in the path. The type is the type that the definition has to implement.

r[items.associated.const.def]
An *associated constant definition* defines a constant associated with a type. It is written the same as a [constant item].

r[items.associated.const.eval]
Associated constant definitions undergo [constant evaluation] only when referenced. Further, definitions that include [generic parameters] are evaluated after monomorphization.

```rust
struct Struct;
struct GenericStruct<const ID: i32>;

impl Struct {
    // Definition not immediately evaluated
    const PANIC: () = panic!("compile-time panic");
}

impl<const ID: i32> GenericStruct<ID> {
    // Definition not immediately evaluated
    const NON_ZERO: () = if ID == 0 {
        panic!("contradiction")
    };
}

fn main() {
    // Referencing Struct::PANIC causes compilation error
    let _ = Struct::PANIC;

    // Fine, ID is not 0
    let _ = GenericStruct::<1>::NON_ZERO;

    // Compilation error from evaluating NON_ZERO with ID=0
    let _ = GenericStruct::<0>::NON_ZERO;
}
```

### Associated constants examples

A basic <example-value>:

```rust
trait ConstantId {
    const ID: i32;
}

struct Struct;

impl ConstantId for Struct {
    const ID: i32 = 1;
}

fn main() {
    assert_eq!(1, Struct::ID);
}
```

Using default values:

```rust
trait ConstantIdDefault {
    const ID: i32 = 1;
}

struct Struct;
struct OtherStruct;

impl ConstantIdDefault for Struct {}

impl ConstantIdDefault for OtherStruct {
    const ID: i32 = 5;
}

fn main() {
    assert_eq!(1, Struct::ID);
    assert_eq!(5, OtherStruct::ID);
}
```
