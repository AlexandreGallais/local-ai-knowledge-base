---
title: "Nullable reference types (part 2 of 2)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/builtin-types/nullable-reference-types.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Nullable reference types (part 2 of 2)

## Nullable context

The *nullable context* determines how the compiler handles nullable reference type annotations and what warnings it produces during static null state analysis. The nullable context contains two flags: the *annotation* setting and the *warning* setting.

Both the *annotation* and *warning* settings are disabled by default for existing projects. Starting in .NET 6 (C# 10), both flags are enabled by default for *new* projects. The reason for two distinct flags for the nullable context is to make it easier to migrate large projects that predate the introduction of nullable reference types.

For small projects, you can enable nullable reference types, fix warnings, and continue. However, for larger projects and multi-project solutions, that process might generate a large number of warnings. You can use pragmas to enable nullable reference types file-by-file as you begin using nullable reference types. The new features that protect against throwing a `System.NullReferenceException` can be disruptive when turned on in an existing codebase:

- All explicitly typed reference variables are interpreted as non-nullable reference types.
- The meaning of the `class` constraint in generics changed to mean a non-nullable reference type.
- New warnings are generated because of these new rules.

The **nullable annotation context** determines the compiler's behavior. There are four combinations for the **nullable context** settings:

- *both disabled*: The code is *nullable-oblivious*. *Disable* matches the behavior before nullable reference types were enabled, except the new syntax produces warnings instead of errors.
  - Nullable warnings are disabled.
  - All reference type variables are nullable reference types.
  - Use of the `?` suffix to declare a nullable reference type produces a warning.
  - You can use the null forgiving operator, `!`, but it has no effect.
- *both enabled*: The compiler enables all null reference analysis and all language features.
  - All new nullable warnings are enabled.
  - You can use the `?` suffix to declare a nullable reference type.
  - Reference type variables without the `?` suffix are non-nullable reference types.
  - The null forgiving operator suppresses warnings for a possible dereference of `null`.
- *warning enabled*: The compiler performs all null analysis and emits warnings when code might dereference `null`.
  - All new nullable warnings are enabled.
  - Use of the `?` suffix to declare a nullable reference type produces a warning.
  - All reference type variables are allowed to be null. However, members have the *null-state* of *not-null* at the opening brace of all methods unless declared with the `?` suffix.
  - You can use the null forgiving operator, `!`.
- *annotations enabled*: The compiler doesn't emit warnings when code might dereference `null`, or when you assign a maybe-null expression to a non-nullable variable.
  - All new nullable warnings are disabled.
  - You can use the `?` suffix to declare a nullable reference type.
  - Reference type variables without the `?` suffix are non-nullable reference types.
  - You can use the null forgiving operator, `!`, but it has no effect.

You can set the nullable annotation context and nullable warning context for a project by using the `<Nullable>` element in your *.csproj* file. This element configures how the compiler interprets the nullability of types and what warnings it emits. The following table shows the allowable values and summarizes the contexts they specify.

| Context | Dereference warnings | Assignment warnings | Reference types | `?` suffix | `!` operator |
| - | - | - | - | - |
| `disable` | Disabled | Disabled | All are nullable | Produces a warning | Has no effect |
| `enable` | Enabled | Enabled | Non-nullable unless declared with `?` | Declares nullable type | Suppresses warnings for possible `null` assignment |
| `warnings` | Enabled | Not applicable | All are nullable, but members are considered *not-null* at opening brace of methods | Produces a warning |  Suppresses warnings for possible `null` assignment |
| `annotations` | Disabled | Disabled | Non-nullable unless declared with `?` | Declares nullable type | Has no effect |

Reference type variables in code compiled in a *disabled* context are *nullable-oblivious*. You can assign a `null` literal or a *maybe-null* variable to a variable that is *nullable-oblivious*. However, the default state of a *nullable-oblivious* variable is *not-null*.

Choose the setting that best fits your project:

- Choose *disable* for legacy projects that you don't want to update based on diagnostics or new features.
- Choose *warnings* to determine where your code might throw `System.NullReferenceException`s. You can address those warnings before modifying code to enable non-nullable reference types.
- Choose *annotations* to express your design intent before enabling warnings.
- Choose *enable* for new projects and active projects where you want to protect against null reference exceptions.

**Example**:

```xml
<Nullable>enable</Nullable>
```

You can also use directives to set these same flags anywhere in your source code. These directives are most useful when you're migrating a large codebase.

- `#nullable enable`: Sets the annotation and warning flags to **enable**.
- `#nullable disable`: Sets the annotation and warning flags to **disable**.
- `#nullable restore`: Restores the annotation flag and warning flag to the project settings.
- `#nullable disable warnings`: Sets the warning flag to **disable**.
- `#nullable enable warnings`: Sets the warning flag to **enable**.
- `#nullable restore warnings`: Restores the warning flag to the project settings.
- `#nullable disable annotations`: Sets the annotation flag to **disable**.
- `#nullable enable annotations`: Sets the annotation flag to **enable**.
- `#nullable restore annotations`: Restores the annotation flag to the project settings.

For any line of code, you can set any of the following combinations:

| Warning flag    | Annotation flag    | Use                                    |
|:---------------:|:------------------:|----------------------------------------|
| project default | project default    | Default                                |
| enable          | disable            | Fix analysis warnings                  |
| enable          | project default    | Fix analysis warnings                  |
| project default | enable             | Add type annotations                   |
| enable          | enable             | Code already migrated                  |
| disable         | enable             | Annotate code before fixing warnings   |
| disable         | disable            | Adding legacy code to migrated project |
| project default | disable            | Rarely                                 |
| disable         | project default    | Rarely                                 |

These nine combinations give you fine-grained control over the diagnostics the compiler emits for your code. You can enable more features in any area you're updating, without seeing more warnings you aren't ready to address yet.

> **Important:**
> The global nullable context doesn't apply to generated code files. Under either strategy, the nullable context is *disabled* for any source file marked as generated. This condition means the compiler doesn't annotate any APIs in generated files. The compiler doesn't produce nullable warnings for generated files. A file is marked as generated in any of the following four ways:
>
> 1. In the .editorconfig, specify `generated_code = true` in a section that applies to that file.
> 1. Put `<auto-generated>` or `<auto-generated/>` in a comment at the top of the file. It can be on any line in that comment, but the comment block must be the first element in the file.
> 1. Start the file name with *TemporaryGeneratedFile_*
> 1. End the file name with *.designer.cs*, *.generated.cs*, *.g.cs*, or *.g.i.cs*.
>
> Generators can opt-in by using the `#nullable` preprocessor directive.

By default, nullable annotation and warning flags are **disabled**. That default means your existing code compiles without changes and without generating any new warnings. Beginning with .NET 6, new projects include the `<Nullable>enable</Nullable>` element in all project templates, setting these flags to **enabled**.

These options provide two distinct strategies to update an existing codebase to use nullable reference types.

## Setting the nullable context

You can control the nullable context in two ways. At the project level, add the `<Nullable>enable</Nullable>` project setting. In a single C# source file, add the `#nullable enable` pragma to enable the nullable context. For more information, see setting a nullable strategy. Before .NET 6, new projects use the default, `<Nullable>disable</Nullable>`. Beginning with .NET 6, new projects include the `<Nullable>enable</Nullable>` element in the project file.

## Generics

When you use a type parameter, `T`, as its nullable counterpart, `T?`, the actual type argument determines how the `?` is interpreted. Consider the following generic declaration:

```csharp
public class Box<T>
{
    public T Contents { get; set; }
}
```

Because a type parameter can stand for either a reference type or a value type, the meaning of `T?` depends on which type argument the caller supplies. The following rules describe what `T?` resolves to when `T` has no constraints:

- **The type argument is a non-nullable reference type.** For `Box<string>`, `T` is `string` and `T?` is `string?`—the corresponding nullable reference type.
- **The type argument is a value type.** For `Box<int>`, `T` is `int` and `T?` is also `int`—the same value type. The annotation has no effect on value types unless the type parameter has the `struct` constraint, in which case `T?` means `System.Nullable`1` (`int?`).
- **The type argument is already nullable.** For `Box<string?>`, `T` is `string?` and `T?` is still `string?`. You don't get a "doubly nullable" type.

*Constraints* restrict which type arguments are allowed. They also let the compiler reason about how `T` can be used:

- `where T : class` requires a non-nullable reference type. `Box<string>` is allowed; `Box<string?>` produces a warning.
- `where T : class?` allows either a nullable or a non-nullable reference type. Both `Box<string>` and `Box<string?>` are allowed.
- `where T : struct` requires a non-nullable value type. `Box<int>` is allowed; `Box<int?>` isn't. With this constraint, `T?` inside the generic means `System.Nullable`1`—for `Box<int>`, `T?` is `int?`.
- `where T : notnull` requires a non-nullable reference or value type. `Box<string>` and `Box<int>` are allowed; `Box<string?>` produces a warning.
- `where T : BaseType` requires a non-nullable reference type that derives from `BaseType`. Append `?` (`where T : BaseType?`) to allow nullable derived types as well.

The constraints help the compiler reason about how a generic type parameter is used:

```csharp
public static T? FirstOrDefault<T>(IEnumerable<T> source)
{
    foreach (T item in source)
    {
        return item;
    }
    return default;
}

public static void RequireNotNull<T>(T value) where T : notnull
{
    ArgumentNullException.ThrowIfNull(value);
}

public static void Generics()
{
    string? first = FirstOrDefault<string>([]);
    Console.WriteLine(first ?? "<empty>");

    RequireNotNull("not null");
}
```
## C# language specification

For more information, see the Nullable reference types section of the C# language specification.

## See also

- Nullable value types
