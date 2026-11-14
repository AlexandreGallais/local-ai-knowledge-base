---
title: "Discard - _"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/tokens/discard.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Discard - A `_` acts as a placeholder for a variable

The `_` character serves as a *discard*, which is a placeholder for an unused variable.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

Use the *discard* token in two ways:

1. To declare an unused variable. You can't read or access a discard.
   - Unused `out` arguments: `var r = M(out int _, out var _, out _);`
   - Unused lambda expression parameters: `Action<int> _ => WriteMessage();`
   - Unused deconstruction arguments: `(int _, var answer) = M();`
1. To match any expression in a discard pattern. You can add a `_` pattern to satisfy exhaustiveness requirements.

The `_` token is a valid identifier in C#. The compiler interprets the `_` token as a discard only when it doesn't find a valid identifier named `_` in scope.

You can't read a discard as a variable. If your code reads a discard, the compiler reports an error. In some situations, the compiler can avoid allocating storage for a discard when it's safe to do so.

## See also

- Tuples
- Deconstruction
- Discard pattern
