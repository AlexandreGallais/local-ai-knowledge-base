---
title: "closed modifier"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/keywords/closed.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# closed (C# Reference)

Starting in C# 15, you can apply the `closed` modifier to a class to declare a *closed hierarchy*. You can only derive a direct subtype from a closed class within its declaring assembly. Because the set of direct descendants is fixed, a `switch` expression that handles each direct descendant exhausts the closed base type and doesn't need a default arm.

```csharp
// Assembly 1
public closed record class JobStatus;
public record class Queued : JobStatus;
public record class Running(int PercentComplete) : JobStatus;
public record class Completed(TimeSpan Elapsed) : JobStatus;
public record class Failed(string Error) : JobStatus;

// Assembly 2
public record class Paused : JobStatus; // Error: 'JobStatus' is a closed class
```

The same-assembly restriction applies only to *direct* descendants of the closed class. A class that derives from a closed class isn't itself closed unless you also mark it `closed`. Because `Failed` in the previous example is a plain record, another assembly can derive from it:

```csharp
// Assembly 2
public record class RetryableFailed(string Error, int Attempts) : Failed(Error); // OK: 'Failed' isn't sealed or closed
```

If you want to prevent derivation from `Failed` as well, declare it as `sealed` or `closed`.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

> **Note:**
> `closed` is a contextual keyword. It has special meaning only when it appears as a modifier on a class declaration. You can continue to use `closed` as an identifier in other contexts. If you need to use `closed` as an identifier in a position where the modifier would also be valid, prefix it with `@` (for example, `@closed`) to tell the compiler to treat it as an identifier rather than the modifier.

## Declaration rules

The `closed` modifier is a class modifier:

- A `closed` class is implicitly `abstract`. You can't combine `closed` with `sealed`, `static`, or an explicit `abstract` modifier.
- You must declare a direct subtype of a closed class in the same assembly and module as the closed base class.
- A class that derives from a closed class isn't itself closed. Apply the `closed` modifier again if you want a derived class to also be closed.

If a generic class directly derives from a `closed` class, every type parameter on the derived class must be used in the base class specification. A *closed constructed type* is a generic type whose type arguments are fully specified (such as `Tree<int>`), as opposed to an *open type* like `Tree<T>`. An open type can also have some type arguments specified, such as `Dictionary<string, TValue>`, where `TValue` is still a type parameter. For the definitions, see Open and closed types in the language specification. The restriction lets the compiler determine the possible constructed descendants for a given base construction. A particular base construction can have no corresponding construction of a particular descendant; the rule doesn't guarantee one.

```csharp
public closed record class Tree<T>;

public record class Leaf<T>(T Value) : Tree<T>;                       // OK: 'T' appears in the base class
public record class Branch<T>(Tree<T> Left, Tree<T> Right) : Tree<T>; // OK: 'T' appears in the base class
public record class Constant<U>(U Value) : Tree<int> { } // Error: 'U' isn't used in the base class
```

## Exhaustive switch expressions

When a `switch` expression handles every direct descendant of a closed class, the compiler considers the switch exhaustive and doesn't generate a non-exhaustiveness warning:

```csharp
public static string Describe(JobStatus status) => status switch
{
    Queued => "waiting to start",
    Running(var percent) => $"{percent}% complete",
    Completed(var elapsed) => $"finished in {elapsed.TotalSeconds:F1}s",
    Failed(var error) => $"failed: {error}",
    // No warning: every direct descendant of 'JobStatus' is handled.
};
```
When the switch governing expression is nullable, `null` becomes another possible value that the switch must handle. A switch over `JobStatus?` is exhaustive only when it also covers `null`:

```csharp
public static string DescribeOrUnknown(JobStatus? status) => status switch
{
    null => "unknown",
    Queued => "waiting to start",
    Running(var percent) => $"{percent}% complete",
    Completed(var elapsed) => $"finished in {elapsed.TotalSeconds:F1}s",
    Failed(var error) => $"failed: {error}",
    // No warning: every direct descendant of 'JobStatus' is handled, and null is handled.
};
```
If you omit the `null` arm, the compiler warns that the pattern `null` isn't handled. The `closed` modifier applies only to classes, including record classes.

For more information about how the compiler determines exhaustiveness, including how closed hierarchies interact with generic constraints and accessibility, see Closed hierarchy patterns.

## Type parameters constrained to a closed type

The closed hierarchies feature specification treats a type parameter constrained to a closed class the same as that closed class for exhaustiveness checks. A `switch` expression whose governing value has such a type parameter is exhaustive when it handles every direct descendant of the closed constraint, regardless of whether the type parameter appears on a method or on the containing type:

```csharp
public static string DescribeJob<X>(X status) where X : JobStatus => status switch
{
    Queued => "waiting to start",
    Running(var percent) => $"{percent}% complete",
    Completed(var elapsed) => $"finished in {elapsed.TotalSeconds:F1}s",
    Failed(var error) => $"failed: {error}",
    // No warning: 'X' is constrained to a closed type, so the compiler treats
    // this switch as exhaustive because every direct descendant is handled.
};
```
## C# language specification

For more information, see the Closed hierarchies feature specification.

## See also

- Inheritance
- sealed
- abstract
- Pattern matching
- Switch expression
