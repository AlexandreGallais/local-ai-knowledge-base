---
title: "C# Keywords and contextual keywords"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/keywords/index.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# C# keywords

Keywords are predefined, reserved identifiers that have special meanings to the compiler. You can't use them as identifiers in your program unless you prefix them with `@`. For example, `@if` is a valid identifier, but `if` isn't because `if` is a keyword.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The first table in this article lists keywords that are reserved identifiers in any part of a C# program. The second table lists the contextual keywords in C#. Contextual keywords have special meaning only in a limited program context and can be used as identifiers outside that context. Generally, as new keywords are added to the C# language, they're added as contextual keywords to avoid breaking programs written in earlier versions.

        `abstract`
        `as`
        `base`
        `bool`
        `break`
        `byte`
        `case`
        `catch`
        `char`
        `checked`
        `class`
        `const`
        `continue`
        `decimal`
        `default`
        `delegate`
        `do`
        `double`
        `else`
        `enum`

        `event`
        `explicit`
        `extern`
        `false`
        `finally`
        `fixed`
        `float`
        `for`
        `foreach`
        `goto`
        `if`
        `implicit`
        `in`
        `int`
        `interface`
        `internal`
        `is`
        `lock`
        `long`

        `namespace`
        `new`
        `null`
        `object`
        `operator`
        `out`
        `override`
        `params`
        `private`
        `protected`
        `public`
        `readonly`
        `ref`
        `return`
        `sbyte`
        `sealed`
        `short`
        `sizeof`
        `stackalloc`

        `static`
        `string`
        `struct`
        `switch`
        `this`
        `throw`
        `true`
        `try`
        `typeof`
        `uint`
        `ulong`
        `unchecked`
        `unsafe`
        `ushort`
        `using`
        `virtual`
        `void`
        `volatile`
        `while`

## Contextual keywords

A contextual keyword provides a specific meaning in the code, but it isn't a reserved word in C#. Some contextual keywords, such as `partial` and `where`, have special meanings in two or more contexts.

        `add`
        `allows`
        `alias`
        `and`
        `ascending`
        `args`
        `async`
        `await`
        `by`
        `closed`
        `descending`
        `dynamic`
        `equals`

        `extension`
        `field`
        `file`
        `from`
        `get`
        `global`
        `group`
        `init`
        `into`
        `join`
        `let`
        `managed` (function pointer calling convention)
        `nameof`

        `nint`
        `not`
        `notnull`
        `nuint`
        `on`
        `or`
        `orderby`
        `partial` (type)
        `partial` (member)
        `record`
        `remove`
        `required`
        `safe`

        `scoped`
        `select`
        `set`
        `unmanaged` (function pointer calling convention)
        `unmanaged` (generic type constraint)
        `union`
        `value`
        `var`
        `when` (filter condition)
        `where` (generic type constraint)
        `where` (query clause)
        `with`
        `yield`
