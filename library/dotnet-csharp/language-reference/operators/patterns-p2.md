---
title: "Patterns - Pattern matching using the is and switch expressions. (part 2 of 3)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/operators/patterns.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Patterns - Pattern matching using the is and switch expressions. (part 2 of 3)

## Property pattern

Use a *property pattern* to match an expression's properties or fields against nested patterns, as the following example shows:

```csharp
static bool IsConferenceDay(DateTime date) => date is { Year: 2020, Month: 5, Day: 19 or 20 or 21 };
```
A property pattern matches an expression when the expression result is non-null and every nested pattern matches the corresponding property or field of the expression result.

You can add a run-time type check and a variable declaration to a property pattern, as the following example shows:

```csharp
Console.WriteLine(TakeFive("Hello, world!"));  // output: Hello
Console.WriteLine(TakeFive("Hi!"));  // output: Hi!
Console.WriteLine(TakeFive(new[] { '1', '2', '3', '4', '5', '6', '7' }));  // output: 12345
Console.WriteLine(TakeFive(new[] { 'a', 'b', 'c' }));  // output: abc

static string TakeFive(object input) => input switch
{
    string { Length: >= 5 } s => s.Substring(0, 5),
    string s => s,

    ICollection<char> { Count: >= 5 } symbols => new string(symbols.Take(5).ToArray()),
    ICollection<char> symbols => new string(symbols.ToArray()),

    null => throw new ArgumentNullException(nameof(input)),
    _ => throw new ArgumentException("Not supported input type."),
};
```
This construct specifically means that the *empty* property pattern `is { }` matches everything non-null, and you can use it instead of `is not null` to create a variable: `somethingPossiblyNull is { } somethingDefinitelyNotNull`.

```csharp
if (GetSomeNullableStringValue() is { } nonNullValue) // Empty property pattern with variable creation
{
    Console.WriteLine("NotNull:" + nonNullValue);
}
else
{
    nonNullValue = "NullFallback"; // we can access the variable here.
    Console.WriteLine("it was null, here's the fallback: " + nonNullValue);
}
```
A property pattern is a recursive pattern. You can use any pattern as a nested pattern. Use a property pattern to match parts of data against nested patterns, as the following example shows:

```csharp
public record Point(int X, int Y);
public record Segment(Point Start, Point End);

static bool IsAnyEndOnXAxis(Segment segment) =>
    segment is { Start: { Y: 0 } } or { End: { Y: 0 } };
```
The preceding example uses the `or` pattern combinator and record types.

You can reference nested properties or fields within a property pattern. This capability is known as an *extended property pattern*. For example, you can refactor the method from the preceding example into the following equivalent code:

```csharp
static bool IsAnyEndOnXAxis(Segment segment) =>
    segment is { Start.Y: 0 } or { End.Y: 0 };
```
For more information, see the Property pattern section of the C# standard.

> **Tip:**
> To improve code readability, use the Simplify property pattern (IDE0170) style rule. It suggests places to use extended property patterns.

## Positional pattern

Use a *positional pattern* to deconstruct an expression and match the resulting values against the corresponding nested patterns, as the following example shows:

```csharp
public readonly struct Point
{
    public int X { get; }
    public int Y { get; }

    public Point(int x, int y) => (X, Y) = (x, y);

    public void Deconstruct(out int x, out int y) => (x, y) = (X, Y);
}

static string Classify(Point point) => point switch
{
    (0, 0) => "Origin",
    (1, 0) => "positive X basis end",
    (0, 1) => "positive Y basis end",
    _ => "Just a point",
};
```
In the preceding example, the type of an expression contains the Deconstruct method, which the pattern uses to deconstruct an expression result.

>**Important:**
> The order of members in a positional pattern must match the order of parameters in the `Deconstruct` method. The code generated for the positional pattern calls the `Deconstruct` method.

You can also match expressions of tuple types against positional patterns. By using this approach, you can match multiple inputs against various patterns, as the following example shows:

```csharp
static decimal GetGroupTicketPriceDiscount(int groupSize, DateTime visitDate)
    => (groupSize, visitDate.DayOfWeek) switch
    {
        (<= 0, _) => throw new ArgumentException("Group size must be positive."),
        (_, DayOfWeek.Saturday or DayOfWeek.Sunday) => 0.0m,
        (>= 5 and < 10, DayOfWeek.Monday) => 20.0m,
        (>= 10, DayOfWeek.Monday) => 30.0m,
        (>= 5 and < 10, _) => 12.0m,
        (>= 10, _) => 15.0m,
        _ => 0.0m,
    };
```
The preceding example uses relational and logical patterns.

You can use the names of tuple elements and `Deconstruct` parameters in a positional pattern, as the following example shows:

```csharp
var numbers = new List<int> { 1, 2, 3 };
if (SumAndCount(numbers) is (Sum: var sum, Count: > 0))
{
    Console.WriteLine($"Sum of [{string.Join(" ", numbers)}] is {sum}");  // output: Sum of [1 2 3] is 6
}

static (double Sum, int Count) SumAndCount(IEnumerable<int> numbers)
{
    int sum = 0;
    int count = 0;
    foreach (int number in numbers)
    {
        sum += number;
        count++;
    }
    return (sum, count);
}
```
You can also extend a positional pattern in any of the following ways:

- Add a run-time type check and a variable declaration, as the following example shows:

```csharp
public record Point2D(int X, int Y);
public record Point3D(int X, int Y, int Z);

static string PrintIfAllCoordinatesArePositive(object point) => point switch
{
    Point2D (> 0, > 0) p => p.ToString(),
    Point3D (> 0, > 0, > 0) p => p.ToString(),
    _ => string.Empty,
};
```
  The preceding example uses positional records that implicitly provide the `Deconstruct` method.

- Use a property pattern within a positional pattern, as the following example shows:

```csharp
public record WeightedPoint(int X, int Y)
{
    public double Weight { get; set; }
}

static bool IsInDomain(WeightedPoint point) => point is (>= 0, >= 0) { Weight: >= 0.0 };
```
- Combine the two preceding usages, as the following example shows:

```csharp
if (input is WeightedPoint (> 0, > 0) { Weight: > 0.0 } p)
{
    // ..
}
```
A positional pattern is a recursive pattern. That is, you can use any pattern as a nested pattern.

For more information, see the Positional pattern section of the feature proposal note.

## `var` pattern

Use a *`var` pattern* to match any expression, including `null`, and assign its result to a new local variable, as the following example shows:

```csharp
static bool IsAcceptable(int id, int absLimit) =>
    SimulateDataFetch(id) is var results 
    && results.Min() >= -absLimit 
    && results.Max() <= absLimit;

static int[] SimulateDataFetch(int id)
{
    var rand = new Random();
    return Enumerable
               .Range(start: 0, count: 5)
               .Select(s => rand.Next(minValue: -10, maxValue: 11))
               .ToArray();
} 
```
A `var` pattern is useful when you need a temporary variable within a Boolean expression to hold the result of intermediate calculations. You can also use a `var` pattern when you need to perform more checks in `when` case guards of a `switch` expression or statement, as the following example shows:

```csharp
public record Point(int X, int Y);

static Point Transform(Point point) => point switch
{
    var (x, y) when x < y => new Point(-x, y),
    var (x, y) when x > y => new Point(x, -y),
    var (x, y) => new Point(x, y),
};

static void TestTransform()
{
    Console.WriteLine(Transform(new Point(1, 2)));  // output: Point { X = -1, Y = 2 }
    Console.WriteLine(Transform(new Point(5, 2)));  // output: Point { X = 5, Y = -2 }
}
```
In the preceding example, pattern `var (x, y)` is equivalent to a positional pattern `(var x, var y)`.

In a `var` pattern, the type of a declared variable is the compile-time type of the expression that the pattern matches.

For more information, see the Var pattern section of the feature proposal note.

## Discard pattern

Use a *discard pattern* `_` to match any expression, including `null`, as the following example shows:

```csharp
Console.WriteLine(GetDiscountInPercent(DayOfWeek.Friday));  // output: 5.0
Console.WriteLine(GetDiscountInPercent(null));  // output: 0.0
Console.WriteLine(GetDiscountInPercent((DayOfWeek)10));  // output: 0.0

static decimal GetDiscountInPercent(DayOfWeek? dayOfWeek) => dayOfWeek switch
{
    DayOfWeek.Monday => 0.5m,
    DayOfWeek.Tuesday => 12.5m,
    DayOfWeek.Wednesday => 7.5m,
    DayOfWeek.Thursday => 12.5m,
    DayOfWeek.Friday => 5.0m,
    DayOfWeek.Saturday => 2.5m,
    DayOfWeek.Sunday => 2.0m,
    _ => 0.0m,
};
```
In the preceding example, a discard pattern handles `null` and any integer value that doesn't have the corresponding member of the `System.DayOfWeek` enumeration. That guarantee ensures that a `switch` expression in the example handles all possible input values. If you don't use a discard pattern in a `switch` expression and none of the expression's patterns matches an input, the runtime throws an exception. The compiler generates a warning if a `switch` expression doesn't handle all possible input values.

A discard pattern can't be a pattern in an `is` expression or a `switch` statement. In those cases, to match any expression, use a `var` pattern with a discard: `var _`. A discard pattern can be a pattern in a `switch` expression.

For more information, see the Discard pattern section of the feature proposal note.

## Parenthesized pattern

You can put parentheses around any pattern. Typically, you use parentheses to emphasize or change the precedence in logical patterns, as the following example shows:

```csharp
if (input is not (float or double))
{
    return;
}
```
## List patterns

You can match an array or a list against a *sequence* of patterns, as the following example shows:

```csharp
int[] numbers = { 1, 2, 3 };

Console.WriteLine(numbers is [1, 2, 3]);  // True
Console.WriteLine(numbers is [1, 2, 4]);  // False
Console.WriteLine(numbers is [1, 2, 3, 4]);  // False
Console.WriteLine(numbers is [0 or 1, <= 2, >= 3]);  // True
```
As the preceding example shows, a list pattern matches when each nested pattern matches the corresponding element of an input sequence. You can use any pattern within a list pattern. To match any element, use the discard pattern or, if you also want to capture the element, use the var pattern, as the following example shows:

```csharp
List<int> numbers = new() { 1, 2, 3 };

if (numbers is [var first, _, _])
{
    Console.WriteLine($"The first element of a three-item list is {first}.");
}
// Output:
// The first element of a three-item list is 1.
```
The preceding examples match a whole input sequence against a list pattern. To match elements only at the start or end - or both - of an input sequence, use the *slice pattern* `..`, as the following example shows:

```csharp
Console.WriteLine(new[] { 1, 2, 3, 4, 5 } is [> 0, > 0, ..]);  // True
Console.WriteLine(new[] { 1, 1 } is [_, _, ..]);  // True
Console.WriteLine(new[] { 0, 1, 2, 3, 4 } is [> 0, > 0, ..]);  // False
Console.WriteLine(new[] { 1 } is [1, 2, ..]);  // False

Console.WriteLine(new[] { 1, 2, 3, 4 } is [.., > 0, > 0]);  // True
Console.WriteLine(new[] { 2, 4 } is [.., > 0, 2, 4]);  // False
Console.WriteLine(new[] { 2, 4 } is [.., 2, 4]);  // True

Console.WriteLine(new[] { 1, 2, 3, 4 } is [>= 0, .., 2 or 4]);  // True
Console.WriteLine(new[] { 1, 0, 0, 1 } is [1, 0, .., 0, 1]);  // True
Console.WriteLine(new[] { 1, 0, 1 } is [1, 0, .., 0, 1]);  // False
```
A slice pattern matches zero or more elements. You can use at most one slice pattern in a list pattern. The slice pattern can only appear in a list pattern.

You can also nest a subpattern within a slice pattern, as the following example shows:

```csharp
void MatchMessage(string message)
{
    var result = message is ['a' or 'A', .. var s, 'a' or 'A']
        ? $"Message {message} matches; inner part is {s}."
        : $"Message {message} doesn't match.";
    Console.WriteLine(result);
}

MatchMessage("aBBA");  // output: Message aBBA matches; inner part is BB.
MatchMessage("apron");  // output: Message apron doesn't match.

void Validate(int[] numbers)
{
    var result = numbers is [< 0, .. { Length: 2 or 4 }, > 0] ? "valid" : "not valid";
    Console.WriteLine(result);
}

Validate(new[] { -1, 0, 1 });  // output: not valid
Validate(new[] { -1, 0, 0, 1 });  // output: valid
```
For more information, see List pattern in the C# language specification.

Starting with C# 15, extension indexing members can also supply the count and element access needed by a list pattern. For an example, see Extension indexers.
