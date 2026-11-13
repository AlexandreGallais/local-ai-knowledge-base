---
title: "The `is` operator - Match an expression against a type or constant pattern"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/is.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# The `is` operator (C# reference)

The `is` operator checks if the result of an expression is compatible with a given type. For information about the type-testing `is` operator, see the is operator section of the Type-testing and cast operators article. You can also use the `is` operator to match an expression against a pattern, as the following example shows:

```csharp
static bool IsFirstFridayOfOctober(DateTime date) =>
    date is { Month: 10, Day: <=7, DayOfWeek: DayOfWeek.Friday };
```
In the preceding example, the `is` operator matches an expression against a property pattern with nested constant and relational patterns.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The `is` operator can be useful in the following scenarios:

- To check the run-time type of an expression, as the following example shows:

```csharp
int i = 34;
object iBoxed = i;
int? jNullable = 42;
if (iBoxed is int a && jNullable is int b)
{
    Console.WriteLine(a + b);  // output 76
}
```
  The preceding example shows the use of a declaration pattern.

- To check for `null`, as the following example shows:

```csharp
if (input is null)
{
    return;
}
```
  When you match an expression against `null`, the compiler guarantees that no user-overloaded `==` or `!=` operator is invoked.

- To do a non-null check by using a negation pattern, as the following example shows:

```csharp
if (result is not null)
{
    Console.WriteLine(result.ToString());
}
```
- To match elements of a list or array by using list patterns. The following code checks arrays for integer values in expected positions:

```csharp
int[] empty = [];
int[] one = [1];
int[] odd = [1, 3, 5];
int[] even = [2, 4, 6];
int[] fib = [1, 1, 2, 3, 5];

Console.WriteLine(odd is [1, _, 2, ..]);   // false
Console.WriteLine(fib is [1, _, 2, ..]);   // true
Console.WriteLine(fib is [_, 1, 2, 3, ..]);     // true
Console.WriteLine(fib is [.., 1, 2, 3, _ ]);     // true
Console.WriteLine(even is [2, _, 6]);     // true
Console.WriteLine(even is [2, .., 6]);    // true
Console.WriteLine(odd is [.., 3, 5]); // true
Console.WriteLine(even is [.., 3, 5]); // false
Console.WriteLine(fib is [.., 3, 5]); // true
```
> **Note:**
> For the complete list of patterns supported by the `is` operator, see Patterns.

## C# language specification

For more information, see The is operator section of the C# language specification and Pattern matching.

## See also

- C# operators and expressions
- Patterns
- Tutorial: Build algorithms using pattern matching
- Type-testing and cast operators
