---
id: dotnet-csharp-changes
title: C# 10 to 15, what changed
topic: dotnet
summary: Find the project's C# version from its target framework, then pick old or new syntax. C# 10 to 15.
tool: C#
version: "15"
checked: 2026-11-13
sources: [S1, S2, S3, S4, S5, S6, S7]
license: CC BY 4.0, adapted from the .NET documentation; code examples written for this base (MIT)
variant: files
---

# C# 10 to 15, what changed

Contents: 1. Find the C# version · 2. Rules · 3. Syntax C# 10 to 12 · 4. Syntax C# 13 to 15 · 5. Examples · 6. Pitfalls · Old patterns · Sources

## 1. Find the C# version of the project (.NET TargetFramework)

Read `TargetFramework` in the `*.csproj` file, or in `Directory.Build.props`. The target framework sets the C# version. [S1]

| `TargetFramework` | C# version |
| --- | --- |
| `net6.0` | 10 |
| `net7.0` | 11 |
| `net8.0` | 12 |
| `net9.0` | 13 |
| `net10.0` | 14 |
| `net11.0` | 15 |
| `netstandard2.1` | 8 |
| `netstandard2.0`, .NET Framework | 7.3 |

- If the project file sets `LangVersion`, use that version. Never add `LangVersion`, never raise it: a C# version newer than the default of the target framework is not supported. [S1]
- The SDK version in `global.json` does not change the C# version. A `net8.0` project built with a newer SDK still uses C# 12. [S1]
- If `TargetFrameworks` lists several targets, write code for the lowest one. [S1]

## 2. Rules for choosing C# syntax (C# 10 to 15)

1. Use a syntax of sections 3 and 4 only when its "Since" value is lower than or equal to the C# version of the project.
2. In a new file, use the newest syntax the project allows.
3. In a file that exists, keep its style. Change old syntax only when the task asks for it.
4. Never use a preview feature.
5. The compiler is the check: `dotnet build` must end with zero errors.

## 3. Old and new syntax, C# 10 to 12 (.NET 6 to 8)

| Since | Old | New | Feature |
| --- | --- | --- | --- |
| 10 | `namespace App { ... }` | `namespace App;` | File-scoped namespace |
| 10 | `using System.Linq;` in every file | `global using System.Linq;` in one file | Global using directive |
| 10 | `struct` with hand-written equality | `public readonly record struct Point(int X, int Y);` | Record struct |
| 11 | String with escaped quotes | `"""` raw text `"""` | Raw string literal |
| 11 | Constructor that forces every value | `public required string Name { get; init; }` | Required member |
| 11 | `a.Length > 0 && a[0] == 1` | `a is [1, ..]` | List pattern |
| 12 | Private field and constructor that copies the parameter | `public class OrderService(IOrderRepository repository)` | Primary constructor |
| 12 | `new List<int> { 1, 2 }`, `Array.Empty<int>()` | `List<int> a = [1, 2];`, `int[] b = [];` | Collection expression |
| 12 | `a.Concat(b).ToArray()` | `int[] all = [.. a, .. b];` | Spread element |

[S2] [S3]

## 4. Old and new syntax, C# 13 to 15 (.NET 9 to 11)

| Since | Old | New | Feature |
| --- | --- | --- | --- |
| 13 | `params string[] parts` | `params ReadOnlySpan<string> parts` | `params` collection |
| 13 | `private readonly object gate = new();` | `private readonly Lock gate = new();` | `System.Threading.Lock` |
| 13 | Partial methods only | `public partial string Name { get; set; }` | Partial property |
| 14 | Private field and property that validates | `set => field = Math.Clamp(value, 0, 100);` | `field` keyword |
| 14 | `if (c != null) c.Order = o;` | `c?.Order = o;` | Null-conditional assignment |
| 14 | Static method `IsBlank(this string text)` | `extension(string text) { ... }` | Extension members |
| 15 | Base class and `switch` with a default arm | `public union Pet(Cat, Dog, Bird);` | Union type |
| 15 | `new List<string>(6)` then `AddRange(values)` | `List<string> names = [with(capacity: 6), .. values];` | Collection expression arguments |
| 15 | Flag or `goto` to leave two loops | `outer: for (...) { ... break outer; }` | Labeled `break` and `continue` |

[S2] [S4] [S5] [S6]

## 5. Examples of new C# syntax (C# 12 and 14)

Primary constructor, C# 12. The parameter is in scope in the whole class body. [S3]

Wrong, in a new file of a C# 12 project:

```csharp
public class OrderService
{
    private readonly IOrderRepository repository;

    public OrderService(IOrderRepository repository)
    {
        this.repository = repository;
    }
}
```

Right:

```csharp
public class OrderService(IOrderRepository repository)
{
    public Task<Order?> FindAsync(int id) => repository.FindAsync(id);
}
```

`field` keyword, C# 14: the compiler creates the backing field. [S5]

```csharp
public int Volume
{
    get;
    set => field = Math.Clamp(value, 0, 100);
}
```

## 6. Pitfalls (C# 14 and 15 keywords)

- Error CS9272 or warning CS9258: in a C# 14 property accessor, `field` means the backing field. A local named `field` conflicts. Rename it, or write `@field`. [S5] [S7]
- A type named `extension` does not compile in C# 14. Rename it, or write `@extension`. [S7]
- `x.Reverse()` on an array, in a C# 14 project whose target is older than `net10.0`: it reverses in place and returns `void`. Write `Enumerable.Reverse(x)`. [S7]
- A collection expression needs a target type: an array, a span, or a type such as `List<T>`. [S3]
- Interceptors (C# 12) and the memory safety syntax of C# 15 are previews. Do not use them. [S3] [S6]

## Old patterns

- Block-scoped namespace (before C# 10). Do not use it in a new file.
- Constructor that only copies its parameters into fields (before C# 12); `new List<T> { ... }` (before C# 12). Do not use them in a new file of a C# 12 project or later.
- Lock on a private `object` (before C# 13). Do not use it in a new file of a C# 13 project or later.

## Sources

- [S1] Microsoft, "C# language versioning", <https://learn.microsoft.com/en-us/dotnet/csharp/language-reference/language-versioning>, read 2026-11-12, CC BY 4.0, adapted.
- [S2] Microsoft, "The history of C#", <https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-version-history>, read 2026-11-12, CC BY 4.0, summarized.
- [S3] Microsoft, "What's new in C# 12", <https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-12>, read 2026-11-12, CC BY 4.0, summarized.
- [S4] Microsoft, "What's new in C# 13", <https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-13>, read 2026-11-12, CC BY 4.0, summarized.
- [S5] Microsoft, "What's new in C# 14", <https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-14>, read 2026-11-12, CC BY 4.0, summarized.
- [S6] Microsoft, "What's new in C# 15", 2026-11-10, <https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/csharp-15>, read 2026-11-12, CC BY 4.0, summarized.
- [S7] Microsoft, "C# compiler breaking changes in .NET 10", <https://learn.microsoft.com/en-us/dotnet/csharp/whats-new/breaking-changes/compiler%20breaking%20changes%20-%20dotnet%2010>, read 2026-11-12, CC BY 4.0, summarized.
