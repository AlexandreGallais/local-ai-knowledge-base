---
title: "unsafe keyword (part 1 of 4)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/unsafe.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# unsafe (C# Reference)

The `unsafe` keyword denotes an unsafe context, which is required for any operation involving pointers. For more information, see Unsafe Code and Pointers.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Use the `unsafe` modifier in the declaration of a type or a member. The entire textual extent of the type or member is an unsafe context. For example, the following method is declared with the `unsafe` modifier:

```csharp
unsafe static void FastCopy(byte[] src, byte[] dst, int count)
{
    // Unsafe context: can use pointers here.
}
```

The scope of the unsafe context extends from the parameter list to the end of the method, so you can also use pointers in the parameter list:

```csharp
unsafe static void FastCopy ( byte* ps, byte* pd, int count ) {...}
```

You can also use an unsafe block to enable the use of unsafe code inside this block. For example:

```csharp
unsafe
{
    // Unsafe context: can use pointers here.
}
```

To compile unsafe code, you must specify the **AllowUnsafeBlocks** compiler option. The common language runtime can't verify unsafe code.

> **Note:**
> The memory safety preview feature available in C# 15 narrows the operations that require an `unsafe` context.
> An `unsafe` context is no longer required for creating a pointer, the `fixed` statement, converting a `stackalloc` expression to a pointer, and using `sizeof` on an unmanaged type.
> Only operations that access the pointed-to memory, such as pointer indirection, still require an `unsafe` context. The same preview also adds an `unsafe(expression)` form that establishes an unsafe context for a single expression, for positions where an `unsafe` block can't appear, such as a field initializer or a `catch` filter. For more information, see Unsafe expressions. The preview also gives the `unsafe` modifier on a member a new meaning: it marks the member *requires-unsafe*. Set `LangVersion` to `preview` for the new syntax and pointer relaxations. To also enforce requires-unsafe caller obligations, enable the `updated-memory-safety-rules` compiler feature. For activation details, see Enable the updated memory safety rules.
