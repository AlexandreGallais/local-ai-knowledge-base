---
title: "Application binary interface (ABI)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/abi.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

r[abi]
# Application binary interface (ABI)

r[abi.intro]
This section documents features that affect the ABI of the compiled output of a crate.

See *[extern functions]* for information on specifying the ABI for exporting functions. See *[external blocks]* for information on specifying the ABI for linking external libraries.

r[abi.used]
## The `used` attribute

r[abi.used.intro]
The *`used` [attribute]* forces a [static] to be kept in the output object file (.o, .rlib, etc., excluding final binaries) even if it's never used or referenced by any other item in the crate. The linker, however, is still free to remove it.

> [!EXAMPLE]
> ```rust
> // lib.rs
>
> // This is kept because of `#[used]`.
> #[used]
> static S1: u8 = 0;
>
> // This is removable because it's unused.
> #[allow(dead_code)]
> static S2: u8 = 0;
>
> // This is kept because it's publicly reachable.
> pub static S3: u8 = 0;
>
> // This is kept because it's referenced by a publicly
> // reachable function.
> static S4: u8 = 0;
> #[unsafe(no_mangle)] pub fn f4() -> &'static u8 { &S4 }
>
> // This is removable because it's referenced only by a
> // private, unused (dead) function.
> static S5: u8 = 0;
> #[allow(dead_code)]
> fn f5() -> &'static u8 { &S5 }
> ```
>
> ```console
> $ rustc -O --emit=obj --crate-type=rlib lib.rs
> $ LC_ALL=C nm -C lib.o
> <example-card-number> R lib::S1
> <example-card-number> R lib::S3
> <example-card-number> r lib::S4
> <example-card-number> T f4
> ```

r[abi.used.syntax]
The `used` attribute uses the [MetaWord] syntax.

r[abi.used.allowed-positions]
The `used` attribute may only be applied to [`static` items].

r[abi.used.duplicates]
Only the first use of `used` on an item has effect.

> **Note:**
> `rustc` lints against any use following the first.

r[abi.no_mangle]
## The `no_mangle` attribute

r[abi.no_mangle.intro]
The *`no_mangle` [attribute]* disables the standard symbol name mangling on a [function] or [static]. The symbol for the item is the item's identifier.

> [!EXAMPLE]
> ```rust
> #[unsafe(no_mangle)]
> extern "C" fn foo() {}
> ```

r[abi.no_mangle.syntax]
The `no_mangle` attribute uses the [MetaWord] syntax.

r[abi.no_mangle.allowed-positions]
The `no_mangle` attribute may only be applied to:

- Static items
- Free functions
- Inherent associated functions
- Trait impl functions

> **Note:**
> `rustc` lints against use in other positions. This may become an error in the future.

r[abi.no_mangle.closures]
The `no_mangle` attribute may not be used with a [closure].

r[abi.no_mangle.generics]
The `no_mangle` attribute may not be used on an item with generic parameters.

r[abi.no_mangle.duplicates]
Only the first use of `no_mangle` on an item has effect.

> **Note:**
> `rustc` lints against any use following the first.

r[abi.no_mangle.export_name]
When the `no_mangle` and `export_name` attributes are both applied to the same item, the symbol name from `export_name` is used, and `no_mangle` has no effect.

> **Note:**
> `rustc` lints against this combination.

r[abi.no_mangle.unsafe]
The `no_mangle` attribute must be marked with `unsafe` because an unmangled symbol may collide with another symbol with the same name (or with a well-known symbol), leading to undefined behavior.

r[abi.no_mangle.edition2024]
> [!EDITION-2024]
> Before the 2024 edition, it is allowed to use the `no_mangle` attribute without `unsafe`.

r[abi.no_mangle.publicly-exported]
In addition to disabling name mangling, the `no_mangle` attribute causes the symbol to be publicly exported from the produced library or object file, similar to the `used` attribute.

r[abi.no_mangle.ascii-only]
The `no_mangle` attribute may only be used on items with a name that contains only ASCII characters.

r[abi.link_section]
## The `link_section` attribute

r[abi.link_section.intro]
The *`link_section` attribute* specifies the section of the object file that a [function] or [static]'s content will be placed into.

r[abi.link_section.syntax]
The `link_section` attribute uses the [MetaNameValueStr] syntax to specify the section name.

```rust
# #[cfg(target_os = "linux")] {
#[unsafe(no_mangle)]
#[unsafe(link_section = ".example_section")]
pub static VAR1: u32 = 1;
# }
```

r[abi.link_section.unsafe]
This attribute is unsafe as it allows users to place data and code into sections of memory not expecting them, such as mutable data into read-only areas.

r[abi.link_section.duplicates]
Only the first use of `link_section` on an item has effect.

> **Note:**
> `rustc` lints against any use following the first with a future-compatibility warning. This may become an error in the future.

r[abi.link_section.edition2024]
> [!EDITION-2024]
> Before the 2024 edition it is allowed to use the `link_section` attribute without the `unsafe` qualification.

r[abi.export_name]
## The `export_name` attribute

r[abi.export_name.intro]
The *`export_name` attribute* specifies the name of the symbol that will be exported on a [function] or [static].

r[abi.export_name.syntax]
The `export_name `attribute uses the [MetaNameValueStr] syntax to specify the symbol name.

```rust
#[unsafe(export_name = "exported_symbol_name")]
pub fn name_in_rust() { }
```

r[abi.export_name.unsafe]
This attribute is unsafe as a symbol with a custom name may collide with another symbol with the same name (or with a well-known symbol), leading to undefined behavior.

r[abi.export_name.duplicates]
Only the first use of `export_name` on an item has effect.

> **Note:**
> `rustc` lints against any use following the first with a future-compatibility warning. This may become an error in the future.

r[abi.export_name.edition2024]
> [!EDITION-2024]
> Before the 2024 edition it is allowed to use the `export_name` attribute without the `unsafe` qualification.
