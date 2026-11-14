---
title: "Patterns - Pattern matching using the is and switch expressions. (part 1 of 3)"
tool: "csharp"
version: "15"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/csharp/language-reference/operators/patterns.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Pattern matching - the `is` and `switch` expressions, and operators `and`, `or`, and `not` in patterns

Use the `is` expression, the switch statement, and the switch expression to match an input expression against any number of characteristics. C# supports multiple patterns, including declaration, type, constant, relational, property, list, var, and discard. You can combine patterns by using the Boolean logic keywords `and`, `or`, and `not`.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

The following C# expressions and statements support pattern matching:

- `is` expression
- switch statement
- switch expression

In those constructs, you can match an input expression against any of the following patterns:

- Declaration pattern: check the run-time type of an expression and, if a match succeeds, assign an expression result to a declared variable.
- Type pattern: check the run-time type of an expression.
- Constant pattern: test that an expression result equals a specified constant.
- Relational patterns: compare an expression result with a specified constant.
- Logical patterns: test that an expression matches a logical combination of patterns.
- Property pattern: test that an expression's properties or fields match nested patterns.
- Positional pattern: deconstruct an expression result and test if the resulting values match nested patterns.
- `var` pattern: match any expression and assign its result to a declared variable.
- Discard pattern: match any expression.
- List patterns: test that a sequence of elements matches corresponding nested patterns.

Logical, property, positional, and list patterns are *recursive* patterns. That is, they can contain *nested* patterns.

For an example of how to use those patterns to build a data-driven algorithm, see Tutorial: Build algorithms using pattern matching.

## Declaration and type patterns

Use declaration and type patterns to check if the run-time type of an expression is compatible with a given type. By using a declaration pattern, you can also declare a new local variable. When a declaration pattern matches an expression, it assigns the variable to the converted expression result, as the following example shows:

```csharp
object greeting = "Hello, World!";
if (greeting is string message)
{
    Console.WriteLine(message.ToLower());  // output: hello, world!
}
```
A *declaration pattern* with type `T` matches an expression when an expression result is non-null and any of the following conditions are true:

- The run-time type of an expression result has an identity conversion to `T`.
- The type `T` is a `ref struct` type and there's an identity conversion from the expression to `T`.
- The run-time type of an expression result derives from type `T`, implements interface `T`, or another implicit reference conversion exists from it to `T`. This condition covers inheritance relationships and interface implementations. The following example demonstrates two cases when this condition is true:
```csharp
var numbers = new int[] { 10, 20, 30 };
Console.WriteLine(GetSourceLabel(numbers));  // output: 1

var letters = new List<char> { 'a', 'b', 'c', 'd' };
Console.WriteLine(GetSourceLabel(letters));  // output: 2

static int GetSourceLabel<T>(IEnumerable<T> source) => source switch
{
    Array array => 1,
    ICollection<T> collection => 2,
    _ => 3,
};
```
  In the preceding example, at the first call to the `GetSourceLabel` method, the first pattern matches an argument value because the argument's run-time type `int[]` derives from the `System.Array` type. At the second call to the `GetSourceLabel` method, the argument's run-time type `System.Collections.Generic.List`1` doesn't derive from the `System.Array` type but implements the `System.Collections.Generic.ICollection`1` interface.
- The run-time type of an expression result is a nullable value type with the underlying type `T` and the `System.Nullable`1.HasValue` is `true`.
- A boxing or unboxing conversion exists from the run-time type of an expression result to type `T` when the expression isn't an instance of a `ref struct`.

Declaration patterns don't consider user-defined conversions or implicit span conversions.

The following example demonstrates the last two conditions:

```csharp
int? xNullable = 7;
int y = 23;
object yBoxed = y;
if (xNullable is int a && yBoxed is int b)
{
    Console.WriteLine(a + b);  // output: 30
}
```
To check only the type of an expression, use a discard `_` in place of a variable's name, as the following example shows:

```csharp
public abstract class Vehicle {}
public class Car : Vehicle {}
public class Truck : Vehicle {}

public static class TollCalculator
{
    public static decimal CalculateToll(this Vehicle vehicle) => vehicle switch
    {
        Car _ => 2.00m,
        Truck _ => 7.50m,
        null => throw new ArgumentNullException(nameof(vehicle)),
        _ => throw new ArgumentException("Unknown type of a vehicle", nameof(vehicle)),
    };
}
```
For that purpose, use a *type pattern*, as the following example shows:

```csharp
public static decimal CalculateToll(this Vehicle vehicle) => vehicle switch
{
    Car => 2.00m,
    Truck => 7.50m,
    null => throw new ArgumentNullException(nameof(vehicle)),
    _ => throw new ArgumentException("Unknown type of a vehicle", nameof(vehicle)),
};
```
Like a declaration pattern, a type pattern matches an expression when an expression result is non-null and its run-time type satisfies any of the preceding conditions.

To check for non-null, use a negated `null` constant pattern, as the following example shows:

```csharp
if (input is not null)
{
    // ...
}
```
For more information, see the Declaration pattern and Type pattern sections of the C# language specification.

## Constant pattern

The *constant pattern* is an alternative syntax for `==` when the right operand is a constant. Use a *constant pattern* to test if an expression result equals a specified constant, as the following example shows:

```csharp
public static decimal GetGroupTicketPrice(int visitorCount) => visitorCount switch
{
    1 => 12.0m,
    2 => 20.0m,
    3 => 27.0m,
    4 => 32.0m,
    0 => 0.0m,
    _ => throw new ArgumentException($"Not supported number of visitors: {visitorCount}", nameof(visitorCount)),
};
```
In a constant pattern, you can use any constant expression, such as:

- an integer or floating-point numerical literal
- a char
- a string literal
- a Boolean value `true` or `false`
- an enum value
- the name of a declared const field or local
- `null`

The expression must be a type that's convertible to the constant type, with one exception: An expression whose type is `Span<char>` or `ReadOnlySpan<char>` can be matched against constant strings.

Use a constant pattern to check for `null`, as the following example shows:

```csharp
if (input is null)
{
    return;
}
```
The compiler guarantees that it doesn't invoke a user-overloaded equality operator `==` when it evaluates expression `x is null`.

You can use a negated `null` constant pattern to check for non-null, as the following example shows:

```csharp
if (input is not null)
{
    // ...
}
```
For more information, see the Constant pattern section of the feature proposal note.

## Relational patterns

Use a *relational pattern* to compare an expression result with a constant, as the following example shows:

```csharp
Console.WriteLine(Classify(13));  // output: Too high
Console.WriteLine(Classify(double.NaN));  // output: Unknown
Console.WriteLine(Classify(2.4));  // output: Acceptable

static string Classify(double measurement) => measurement switch
{
    < -4.0 => "Too low",
    > 10.0 => "Too high",
    double.NaN => "Unknown",
    _ => "Acceptable",
};
```
In a relational pattern, use any of the relational operators `<`, `>`, `<=`, or `>=`. The right-hand part of a relational pattern must be a constant expression. The constant expression can be of an integer, floating-point, char, or enum type.

To check if an expression result is in a certain range, match it against a conjunctive `and` pattern, as the following example shows:

```csharp
Console.WriteLine(GetCalendarSeason(new DateTime(2021, 3, 14)));  // output: spring
Console.WriteLine(GetCalendarSeason(new DateTime(2021, 7, 19)));  // output: summer
Console.WriteLine(GetCalendarSeason(new DateTime(2021, 2, 17)));  // output: winter

static string GetCalendarSeason(DateTime date) => date.Month switch
{
    >= 3 and < 6 => "spring",
    >= 6 and < 9 => "summer",
    >= 9 and < 12 => "autumn",
    12 or (>= 1 and < 3) => "winter",
    _ => throw new ArgumentOutOfRangeException(nameof(date), $"Date with unexpected month: {date.Month}."),
};
```
If an expression result is `null` or fails to convert to the type of a constant by using a nullable or unboxing conversion, a relational pattern doesn't match the expression.

For more information, see the Relational patterns section of the C# language specification.

## Logical patterns

Use the `not`, `and`, and `or` pattern combinators to create the following *logical patterns*:

- *Negation* `not` pattern that matches an expression when the negated pattern doesn't match the expression. The following example shows how you can negate a constant `null` pattern to check if an expression is non-null:

```csharp
if (input is not null)
{
    // ...
}
```
- *Conjunctive* `and` pattern that matches an expression when both patterns match the expression. The following example shows how you can combine relational patterns to check if a value is in a certain range:

```csharp
Console.WriteLine(Classify(13));  // output: High
Console.WriteLine(Classify(-100));  // output: Too low
Console.WriteLine(Classify(5.7));  // output: Acceptable

static string Classify(double measurement) => measurement switch
{
    < -40.0 => "Too low",
    >= -40.0 and < 0 => "Low",
    >= 0 and < 10.0 => "Acceptable",
    >= 10.0 and < 20.0 => "High",
    >= 20.0 => "Too high",
    double.NaN => "Unknown",
};
```
- *Disjunctive* `or` pattern that matches an expression when either pattern matches the expression, as the following example shows:

```csharp
Console.WriteLine(GetCalendarSeason(new DateTime(2021, 1, 19)));  // output: winter
Console.WriteLine(GetCalendarSeason(new DateTime(2021, 10, 9)));  // output: autumn
Console.WriteLine(GetCalendarSeason(new DateTime(2021, 5, 11)));  // output: spring

static string GetCalendarSeason(DateTime date) => date.Month switch
{
    3 or 4 or 5 => "spring",
    6 or 7 or 8 => "summer",
    9 or 10 or 11 => "autumn",
    12 or 1 or 2 => "winter",
    _ => throw new ArgumentOutOfRangeException(nameof(date), $"Date with unexpected month: {date.Month}."),
};
```
As the preceding example shows, you can use the pattern combinators repeatedly in a pattern.

### Precedence and order of checking

The pattern combinators check expressions in this order, based on the binding order of expressions:

- `not`
- `and`
- `or`

The `not` pattern binds to its operand first. The `and` pattern binds after any `not` pattern expression binding. The `or` pattern binds after all `not` and `and` patterns bind to operands. The following example tries to match all characters that aren't lowercase letters, `a` through `z`. It has an error, because the `not` pattern binds before the `and` pattern:

```csharp
// Incorrect pattern. `not` binds before `and`
static bool IsNotLowerCaseLetter(char c) => c is not >= 'a' and <= 'z';
```
The default binding means the previous example is parsed as the following example:

```csharp
// The default binding without parentheses is shows in this method. `not` binds before `and`
static bool IsNotLowerCaseLetterDefaultBinding(char c) => c is ((not >= 'a') and <= 'z');
```
To fix the error, specify that you want the `not` pattern to bind to the `>= 'a' and <= 'z'` expression:

```csharp
// Correct pattern. Force `and` before `not`
static bool IsNotLowerCaseLetterParentheses(char c) => c is not (>= 'a' and <= 'z');
```
Adding parentheses becomes more important as your patterns become more complicated. In general, use parentheses to clarify your patterns for other developers, as the following example shows:

```csharp
static bool IsLetter(char c) => c is (>= 'a' and <= 'z') or (>= 'A' and <= 'Z');
```
> **Note:**
> The order in which the compiler checks patterns that have the same binding order is undefined. At run time, the compiler can check the right-hand nested patterns of multiple `or` patterns and multiple `and` patterns first.

For more information, see the Pattern combinators section of the C# language specification.
