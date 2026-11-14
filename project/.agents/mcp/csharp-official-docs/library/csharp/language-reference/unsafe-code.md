---
title: "Unsafe code, pointers to data, and function pointers (part 1 of 5)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/unsafe-code.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Unsafe code, pointer types, and function pointers

Most of the C# code you write is verifiably safe code. *Verifiably safe code* means that .NET tools can verify that the code is safe. In general, safe code doesn't directly access memory by using pointers. It also doesn't allocate raw memory. It creates managed objects instead.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

C# also supports an `unsafe` context, in which you can write *unverifiable* code. Unsafe code isn't necessarily dangerous; it's just code whose safety can't be verified by .NET tools. Use unsafe code to call native functions that require pointers, and in some cases to improve performance through direct memory access that avoids array-bounds checks. Unsafe code also introduces security and stability risks. To compile code that contains an `unsafe` context, add the **AllowUnsafeBlocks** compiler option.

C# defines two models for what counts as unsafe code: the original model and an updated memory safety model that's in preview in C# 15 and .NET 11. For information about how the two models differ, see Two models for unsafe code.

For information about best practices for unsafe code in C#, see Unsafe code best practices.

## Two models for unsafe code

C# defines two models for unsafe code. The model in effect determines which operations require an `unsafe` context and how the `unsafe` modifier on a member affects callers.

- **Original unsafe model**: The `unsafe` context covers the existence of *pointer features*. You declare a pointer type, take the address of a variable, dereference a pointer, convert a `stackalloc` expression to a pointer, or apply `sizeof` to an arbitrary type only inside an `unsafe` context. (A `stackalloc` expression assigned to a `Span<T>` or `ReadOnlySpan<T>` is allowed in safe code.) The `unsafe` modifier on a type, a member, or a block establishes that context but places no obligation on callers. C# 1.0 introduced this model, and it remains the default.
- **Updated memory safety model**: The `unsafe` context covers the operations that *access memory the runtime doesn't manage*. The existence of a pointer isn't unsafe; the dereference of a pointer is. The `unsafe` modifier on a member becomes a contract that propagates the obligation to audit safety to the caller. This model is in preview in C# 15 and .NET 11.

The following table compares which operations require an `unsafe` context in each model.

| Operation                                                                      | Original model        | Updated model        |
|--------------------------------------------------------------------------------|-----------------------|----------------------|
| Declare a pointer type or take an address with `&`                             | Requires `unsafe`     | Allowed in safe code |
| The `fixed` statement                                   | Requires `unsafe`     | Allowed in safe code |
| Convert a `stackalloc` expression to a pointer      | Requires `unsafe`     | Allowed in safe code |
| The `sizeof` operator on any unmanaged type             | Requires `unsafe`     | Allowed in safe code |
| Pointer indirection (`*p`), member access (`p->m`), or element access (`p[i]`) | Requires `unsafe`     | Requires `unsafe`    |
| Function pointer invocation                                                    | Requires `unsafe`     | Requires `unsafe`    |
| Element access on a fixed-size buffer                                          | Requires `unsafe`     | Requires `unsafe`    |
| Call a member marked `unsafe`                                                  | No caller requirement | Requires `unsafe`    |

To enable the preview syntax and pointer relaxations, use the .NET 11 SDK and set the `LangVersion` compiler option to `preview`. To also enable the updated rules, including caller obligations, see Enable the updated memory safety rules.
