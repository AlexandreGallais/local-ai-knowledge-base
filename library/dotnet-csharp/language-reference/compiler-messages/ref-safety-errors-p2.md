---
title: "Errors and warnings related to ref safety (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/compiler-messages/ref-safety-errors.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Errors and warnings related to ref safety (part 2 of 2)

## Struct member and field restrictions

The compiler enforces special rules for struct members and fields to prevent dangling references. These errors occur when struct members return references to instance state or when fields have types that require special handling.

Errors:

- **CS8345**: *Field or auto-implemented property cannot be of type unless it is an instance member of a `ref struct`.*

Warnings:

- **CS9082**: *Local is returned by reference but was initialized to a value that cannot be returned by reference*
- **CS9083**: *A member is returned by reference but was initialized to a value that cannot be returned by reference*
- **CS9084**: *Struct member returns 'this' or other instance members by reference*

To resolve these errors:

- Ensure that fields and auto-implemented properties with ref-like types (such as `Span<T>` or `ref struct` types) are only declared as instance members within a ref struct rather than in regular structs or classes, because ref-like types can only safely exist on the stack and ref structs provide the necessary lifetime guarantees (**CS8345**).
- When returning a local variable by reference from a method, verify that the local was initialized from a source that has a sufficient escape scope such as a ref parameter or ref-returning method call, rather than from a value-typed expression or local-scoped variable that would create a reference to short-lived storage (**CS9082**, **CS9083**).
- In struct instance methods or properties, avoid returning `this` or any instance fields by reference, because structs are value types that are often copied, and returning a reference to an instance member could create a reference to a temporary copy destroyed after the method returns (**CS9084**).

For more information, see the article on ref struct types and the C# standard section on ref safe contexts.
