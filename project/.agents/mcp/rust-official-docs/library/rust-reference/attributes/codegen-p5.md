---
title: "Code generation attributes (part 5 of 5)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/attributes/codegen.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# Code generation attributes (part 5 of 5)

## The `instruction_set` attribute

r[attributes.codegen.instruction_set.intro]
The *`instruction_set` [attribute]* specifies the instruction set that a function will use during code generation. This allows mixing more than one instruction set in a single program.

> [!EXAMPLE]
>
> ```rust,ignore
> #[instruction_set(arm::a32)]
> fn arm_code() {}
>
> #[instruction_set(arm::t32)]
> fn thumb_code() {}
> ```

r[attributes.codegen.instruction_set.syntax]
The `instruction_set` attribute uses the [MetaListPaths] syntax to specify a single path consisting of the architecture family name and instruction set name.

r[attributes.codegen.instruction_set.allowed-positions]
The `instruction_set` attribute may only be applied to functions with [bodies] --- [closures], [async blocks], [free functions], [associated functions] in an [inherent impl] or [trait impl], and associated functions in a [trait definition] when those functions have a [default definition] .

> **Note:**
> `rustc` ignores use in other positions but lints against it. This may become an error in the future.

> **Note:**
> Though the attribute can be applied to [closures] and [async blocks], the usefulness of this is limited as we do not yet support attributes on expressions.

r[attributes.codegen.instruction_set.duplicates]
The `instruction_set` attribute may be used only once on a function.

r[attributes.codegen.instruction_set.target-limits]
The `instruction_set` attribute may only be used with a target that supports the given value.

r[attributes.codegen.instruction_set.inline-asm]
When the `instruction_set` attribute is used, any inline assembly in the function must use the specified instruction set instead of the target default.

r[attributes.codegen.instruction_set.arm]
### `instruction_set` on ARM

When targeting the `ARMv4T` and `ARMv5te` architectures, the supported values for `instruction_set` are:

- `arm::a32` --- Generate the function as A32 "ARM" code.
- `arm::t32` --- Generate the function as T32 "Thumb" code.

If the address of the function is taken as a function pointer, the low bit of the address will depend on the selected instruction set:

- For `arm::a32` ("ARM"), it will be 0.
- For `arm::t32` ("Thumb"), it will be 1.
