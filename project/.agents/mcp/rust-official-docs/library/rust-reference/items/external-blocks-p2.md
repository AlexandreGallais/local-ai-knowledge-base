---
title: "External blocks (part 2 of 2)"
tool: "rust-reference"
version: "2026-11"
source: "https://github.com/rust-lang/reference/blob/bcd62f35e8bf480ec5b0fa569b6d12ea5924030c/src/items/external-blocks.md"
commit: "bcd62f35e8bf480ec5b0fa569b6d12ea5924030c"
license: "MIT OR Apache-2.0"
---

# External blocks (part 2 of 2)

## Attributes on extern blocks

r[items.extern.attributes.intro]
The following [attributes] control the behavior of external blocks.

r[items.extern.attributes.link]
### The `link` attribute

r[items.extern.attributes.link.intro]
The *`link` attribute* specifies the name of a native library that the compiler should link with for the items within an `extern` block.

r[items.extern.attributes.link.syntax]
It uses the [MetaListNameValueStr] syntax to specify its inputs. The `name` key is the name of the native library to link. The `kind` key is an optional value which specifies the kind of library with the following possible values:

r[items.extern.attributes.link.dylib]
- `dylib` --- Indicates a dynamic library. This is the default if `kind` is not specified.

r[items.extern.attributes.link.static]
- `static` --- Indicates a static library.

r[items.extern.attributes.link.framework]
- `framework` --- Indicates a macOS framework. This is only valid for macOS targets.

r[items.extern.attributes.link.raw-dylib]
- `raw-dylib` --- Indicates a dynamic library where the compiler will generate an import library to link against (see [`dylib` versus `raw-dylib`] below for details). This is only valid for Windows targets.

r[items.extern.attributes.link.name-requirement]
The `name` key must be included if `kind` is specified.

r[items.extern.attributes.link.modifiers]
The optional `modifiers` argument is a way to specify linking modifiers for the library to link.

r[items.extern.attributes.link.modifiers-syntax]
Modifiers are specified as a comma-delimited string with each modifier prefixed with either a `+` or `-` to indicate that the modifier is enabled or disabled, respectively.

r[items.extern.attributes.link.modifiers-multiple]
Specifying multiple `modifiers` arguments in a single `link` attribute, or multiple identical modifiers in the same `modifiers` argument is not currently supported. Example: `#[link(name = "mylib", kind = "static", modifiers = "+whole-archive")]`.

r[items.extern.attributes.link.wasm_import_module]
The `wasm_import_module` key may be used to specify the [WebAssembly module] name for the items within an `extern` block when importing symbols from the host environment. The default module name is `env` if `wasm_import_module` is not specified.

```rust
#[link(name = "crypto")]
unsafe extern {
    // …
}

#[link(name = "CoreFoundation", kind = "framework")]
unsafe extern {
    // …
}

#[link(wasm_import_module = "foo")]
unsafe extern {
    // …
}
```

r[items.extern.attributes.link.empty-block]
It is valid to add the `link` attribute on an empty extern block. You can use this to satisfy the linking requirements of extern blocks elsewhere in your code (including upstream crates) instead of adding the attribute to each extern block.

r[items.extern.attributes.link.modifiers-bundle]
#### Linking modifiers: `bundle`

r[items.extern.attributes.link.modifiers-bundle.allowed-kinds]
This modifier is only compatible with the `static` linking kind. Using any other kind will result in a compiler error.

r[items.extern.attributes.link.modifiers-bundle.behavior]
When building a rlib or staticlib `+bundle` means that the native static library will be packed into the rlib or staticlib archive, and then retrieved from there during linking of the final binary.

r[items.extern.attributes.link.modifiers-bundle.behavior-negative]
When building a rlib `-bundle` means that the native static library is registered as a dependency of that rlib "by name", and object files from it are included only during linking of the final binary, the file search by that name is also performed during final linking. When building a staticlib `-bundle` means that the native static library is simply not included into the archive and some higher level build system will need to add it later during linking of the final binary.

r[items.extern.attributes.link.modifiers-bundle.no-effect]
This modifier has no effect when building other targets like executables or dynamic libraries.

r[items.extern.attributes.link.modifiers-bundle.default]
The default for this modifier is `+bundle`.

More implementation details about this modifier can be found in [`bundle` documentation for rustc].

r[items.extern.attributes.link.modifiers-whole-archive]
#### Linking modifiers: `whole-archive`

r[items.extern.attributes.link.modifiers-whole-archive.allowed-kinds]
This modifier is only compatible with the `static` linking kind. Using any other kind will result in a compiler error.

r[items.extern.attributes.link.modifiers-whole-archive.behavior]
`+whole-archive` means that the static library is linked as a whole archive without throwing any object files away.

r[items.extern.attributes.link.modifiers-whole-archive.default]
The default for this modifier is `-whole-archive`.

More implementation details about this modifier can be found in [`whole-archive` documentation for rustc].

r[items.extern.attributes.link.modifiers-verbatim]
#### Linking modifiers: `verbatim`

r[items.extern.attributes.link.modifiers-verbatim.allowed-kinds]
This modifier is compatible with all linking kinds.

r[items.extern.attributes.link.modifiers-verbatim.behavior]
`+verbatim` means that rustc itself won't add any target-specified library prefixes or suffixes (like `lib` or `.a`) to the library name, and will try its best to ask for the same thing from the linker.

r[items.extern.attributes.link.modifiers-verbatim.behavior-negative]
`-verbatim` means that rustc will either add a target-specific prefix and suffix to the library name before passing it to linker, or won't prevent linker from implicitly adding it.

r[items.extern.attributes.link.modifiers-verbatim.default]
The default for this modifier is `-verbatim`.

More implementation details about this modifier can be found in [`verbatim` documentation for rustc].

r[items.extern.attributes.link.kind-raw-dylib]
#### `dylib` versus `raw-dylib`

r[items.extern.attributes.link.kind-raw-dylib.intro]
On Windows, linking against a dynamic library requires that an import library is provided to the linker: this is a special static library that declares all of the symbols exported by the dynamic library in such a way that the linker knows that they have to be dynamically loaded at runtime.

r[items.extern.attributes.link.kind-raw-dylib.import]
Specifying `kind = "dylib"` instructs the Rust compiler to link an import library based on the `name` key. The linker will then use its normal library resolution logic to find that import library. Alternatively, specifying `kind = "raw-dylib"` instructs the compiler to generate an import library during compilation and provide that to the linker instead.

r[items.extern.attributes.link.kind-raw-dylib.platform-specific]
`raw-dylib` is only supported on Windows. Using it when targeting other platforms will result in a compiler error.

r[items.extern.attributes.link.import_name_type]
#### The `import_name_type` key

r[items.extern.attributes.link.import_name_type.intro]
On x86 Windows, names of functions are "decorated" (i.e., have a specific prefix and/or suffix added) to indicate their calling convention. For example, a `stdcall` calling convention function with the name `fn1` that has no arguments would be decorated as `_fn1@0`. However, the [PE Format] does also permit names to have no prefix or be undecorated. Additionally, the MSVC and GNU toolchains use different decorations for the same calling conventions which means, by default, some Win32 functions cannot be called using the `raw-dylib` link kind via the GNU toolchain.

r[items.extern.attributes.link.import_name_type.values]
To allow for these differences, when using the `raw-dylib` link kind you may also specify the `import_name_type` key with one of the following values to change how functions are named in the generated import library:

* `decorated`: The function name will be fully-decorated using the MSVC toolchain format.
* `noprefix`: The function name will be decorated using the MSVC toolchain format, but skipping the leading `?`, `@`, or optionally `_`.
* `undecorated`: The function name will not be decorated.

r[items.extern.attributes.link.import_name_type.default]
If the `import_name_type` key is not specified, then the function name will be fully-decorated using the target toolchain's format.

r[items.extern.attributes.link.import_name_type.variables]
Variables are never decorated and so the `import_name_type` key has no effect on how they are named in the generated import library.

r[items.extern.attributes.link.import_name_type.platform-specific]
The `import_name_type` key is only supported on x86 Windows. Using it when targeting other platforms will result in a compiler error.

r[items.extern.attributes.link_name]
### The `link_name` attribute

r[items.extern.attributes.link_name.intro]
The *`link_name` attribute* may be applied to declarations inside an `extern` block to specify the symbol to import for the given function or static.

> [!EXAMPLE]
> ```rust
> unsafe extern "C" {
>     #[link_name = "actual_symbol_name"]
>     safe fn name_in_rust();
> }
> ```

r[items.extern.attributes.link_name.syntax]
The `link_name` attribute uses the [MetaNameValueStr] syntax.

r[items.extern.attributes.link_name.invalid-names]
The symbol name must not be the empty string or contain any `U+0000` (NUL) bytes.

r[items.extern.attributes.link_name.allowed-positions]
The `link_name` attribute may only be applied to a function or static item in an `extern` block.

> **Note:**
> `rustc` ignores use in other positions but lints against it. This may become an error in the future.

r[items.extern.attributes.link_name.duplicates]
Only the first use of `link_name` on an item has effect.

> **Note:**
> `rustc` lints against any use following the first with a future-compatibility warning. This may become an error in the future.

r[items.extern.attributes.link_name.link_ordinal]
The `link_name` attribute may not be used with the [`link_ordinal`] attribute.

r[items.extern.attributes.link_ordinal]
### The `link_ordinal` attribute

r[items.extern.attributes.link_ordinal.intro]
The *`link_ordinal` attribute* can be applied on declarations inside an `extern` block to indicate the numeric ordinal to use when generating the import library to link against. An ordinal is a unique number per symbol exported by a dynamic library on Windows and can be used when the library is being loaded to find that symbol rather than having to look it up by name.

> **Warning:**
> `link_ordinal` should only be used in cases where the ordinal of the symbol is known to be stable: if the ordinal of a symbol is not explicitly set when its containing binary is built then one will be automatically assigned to it, and that assigned ordinal may change between builds of the binary.

```rust
# #[cfg(all(windows, target_arch = "x86"))]
#[link(name = "exporter", kind = "raw-dylib")]
unsafe extern "stdcall" {
    #[link_ordinal(15)]
    safe fn imported_function_stdcall(i: i32);
}
```

r[items.extern.attributes.link_ordinal.allowed-kinds]
This attribute is only used with the `raw-dylib` linking kind. Using any other kind will result in a compiler error.

r[items.extern.attributes.link_ordinal.exclusive]
Using this attribute with the `link_name` attribute will result in a compiler error.

r[items.extern.attributes.fn-parameters]
### Attributes on function parameters

Attributes on extern function parameters follow the same rules and restrictions as [regular function parameters].
