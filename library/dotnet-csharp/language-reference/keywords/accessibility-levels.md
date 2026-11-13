---
title: "Accessibility Levels"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/accessibility-levels.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Accessibility levels (C# reference)

Use the access modifiers `public`, `protected`, `internal`, or `private` to specify one of the following declared accessibility levels for members.

- `public`: Access isn't restricted.
- `protected`: Access is limited to the containing class or types derived from the containing class.
- `internal`: Access is limited to the current assembly.
- `protected internal`: Access is limited to the current assembly or types derived from the containing class.
- `private`: Access is limited to the containing type.
- `private protected`: Access is limited to the containing class or types derived from the containing class within the current assembly.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Top-level (non-nested) types can use the file modifier. The `file` modifier restricts access to code in the same source file. You can't combine the `file` modifier with any access modifier.

Use only one access modifier for a member or type, except when you use the `protected internal` or `private protected` combinations.

Don't use access modifiers on namespaces. Namespaces have no access restrictions.

Depending on the context in which a member declaration occurs, only certain declared accessibilities are permitted. If you don't specify an access modifier in a member declaration, a default accessibility is used.

Top-level types, which aren't nested in other types, can only have `internal` or `public` accessibility. The default accessibility for these types is `internal`.

Nested types, which are members of other types, can have declared accessibilities as indicated in the following table.

| Members of  | Default member accessibility | Allowed declared accessibility of the member                                                                     |
|-------------|------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------|
| `enum`      | `public`                     | None |
| `class`     | `private`                    | `public` `protected` `internal` `private` `protected internal` `private protected` |
| `interface` | `public`                     | `public` `protected` `internal` `private`\* `protected internal` `private protected` |
| `struct`    | `private`                    | `public` `internal` `private` |

\* An `interface` member with `private` accessibility must have a default implementation.

> **Note:**
> If you modify a class or struct with the `record` keyword modifier, use the same access modifiers.
> Also, with the `record` modifier, the default member accessibility is still `private` for both class and struct.

The accessibility of a nested type depends on its accessibility domain, which the declared accessibility of the member and the accessibility domain of the immediately containing type determine. However, the accessibility domain of a nested type can't exceed that of the containing type.

## C# Language Specification

For more information, see the C# Language Specification. The language specification is the definitive source for C# syntax and usage.

## See also

- C# Keywords
- Access Modifiers
- Accessibility Domain
- Restrictions on Using Accessibility Levels
- Access Modifiers
- public
- private
- protected
- internal
