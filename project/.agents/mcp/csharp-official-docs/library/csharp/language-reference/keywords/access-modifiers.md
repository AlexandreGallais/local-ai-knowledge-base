---
title: "Access Modifiers"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/access-modifiers.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Access modifiers (C# reference)

Use access modifiers to specify the declared accessibility of a member or a type. This section introduces the four access modifiers:

- `public`
- `protected`
- `internal`
- `private`

By using these access modifiers, you can specify the following six accessibility levels:

- `public`: No access restrictions.
- `protected`: Access is limited to the containing class or types derived from the containing class.
- `internal`: Access is limited to the current assembly.
- `protected internal`: Access is limited to the current assembly or types derived from the containing class.
- `private`: Access is limited to the containing type.
- `private protected`: Access is limited to the containing class or types derived from the containing class within the current assembly.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

In addition, a top-level (non-nested) type can use the `file` modifier. The declared type is only visible in the current source file. File scoped types are generally used for source generators. You can't combine the `file` modifier with any access modifier.

 This section also introduces the following concepts:

- Accessibility Levels: Using the access modifiers to declare levels of accessibility.
- Accessibility Domain: Specifies where, in the program sections, a member can be referenced.
- Restrictions on Using Accessibility Levels: A summary of the restrictions on using declared accessibility levels.

## See also

- Add accessibility modifiers (style rule IDE0040)
- C# Keywords
- Access Modifiers
- Access Keywords
- Modifiers
