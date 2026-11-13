---
title: "Compare strings in C#"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/strings/common-tasks/compare.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Compare strings in C\#

> **Tip:**
> This article is part of the **Fundamentals** section for developers who already know at least one programming language and are learning C#. If you're new to programming, start with the Get started tutorials first.
>
> **Coming from another language?** C# `==` on strings compares *values*, not references, much like Java's `equals` or JavaScript's `===`. The key <example-value> is that C# lets you choose between **ordinal** (binary) and **culture-aware** comparison through a `System.StringComparison` value.

You compare strings to answer one of two questions: *Are these two strings equal?* or *In what order do these strings sort?* C# lets you control two independent factors when you answer either question:

- **Case sensitivity** — whether `"Hello"` and `"hello"` are treated as equal.
- **Comparison kind** — *ordinal* (compare the binary value of each character) or *culture-aware* (apply the linguistic rules of a culture).

The `System.StringComparison` enumeration combines these factors into a single value you pass to comparison methods.

## Compare for equality

The `System.String.Equals*` method and the `==` operator both perform a **case-sensitive, ordinal** comparison by default. Ordinal comparison checks the binary value of each character, so it's fast and gives the same result on every machine. You can make your intent explicit by calling the overload that takes a `System.StringComparison` value:

```csharp
string root = @"C:\users";
string root2 = @"C:\Users";

// Equals and == both perform a case-sensitive, ordinal comparison.
Console.WriteLine(root.Equals(root2));
// => False
Console.WriteLine(root == root2);
// => False

// Pass a StringComparison value to state the intent explicitly.
Console.WriteLine(root.Equals(root2, StringComparison.Ordinal));
// => False
```
To ignore case while keeping ordinal semantics, pass `System.StringComparison.OrdinalIgnoreCase`:

```csharp
string root = @"C:\users";
string root2 = @"C:\Users";

// OrdinalIgnoreCase compares the binary values but ignores case.
bool equalIgnoringCase = string.Equals(root, root2, StringComparison.OrdinalIgnoreCase);
Console.WriteLine(equalIgnoringCase);
// => True
```
## Compare for sort order

To determine sort order rather than equality, use `System.String.Compare*`. It returns a negative number, zero, or a positive number to indicate whether the first string sorts before, at the same position as, or after the second:

```csharp
string first = "Avocado";
string second = "Banana";

// Compare returns a negative number, zero, or a positive number
// to indicate sort order. Specify the comparison type explicitly.
int order = string.Compare(first, second, StringComparison.Ordinal);
Console.WriteLine(order < 0
    ? $"'{first}' sorts before '{second}'."
    : $"'{first}' sorts at or after '{second}'.");
// => 'Avocado' sorts before 'Banana'.
```
> **Important:**
> `Compare` and `CompareTo` default to a *culture-aware* comparison, while `Equals` and `==` default to *ordinal*. To avoid surprises, pass an explicit `System.StringComparison` value so your code states which behavior it wants.

## Compare against constants with pattern matching `is` or `switch`

When the value you compare against is a constant, you can use the `is` operator with a constant pattern as a readable alternative to `==`:

```csharp
string status = "Ready";

// When the right operand is a constant, the is operator and a
// constant pattern read as an alternative to ==.
if (status is "Ready")
{
    Console.WriteLine("The system is ready.");
}
// => The system is ready.
```
To compare a string against several constants, use a `switch` expression. Each arm tests a constant pattern, and the discard pattern (`_`) handles every value that doesn't match. The next example maps a direction keyword to a travel instruction:

```csharp
foreach (string heading in new[] { "North", "South", "East", "West", "NE" })
{
    // A switch expression matches each constant pattern in turn and
    // returns the first match. The discard (_) handles every other value.
    string instruction = heading switch
    {
        "North" => "Travel due North for 10 km.",
        "South" => "Travel due South for 10 km.",
        "East" => "Travel due East for 10 km.",
        "West" => "Travel due West for 10 km.",
        _ => $"Unknown heading: {heading}.",
    };
    Console.WriteLine(instruction);
}
// => Travel due North for 10 km.
// => Travel due South for 10 km.
// => Travel due East for 10 km.
// => Travel due West for 10 km.
// => Unknown heading: NE.
```
A `switch` expression that tests string constants performs the same case-sensitive, ordinal comparison as `==`, so `"north"` doesn't match the `"North"` arm.

## Choose the right comparison

Pick the comparison kind based on the data, not out of habit:

- For identifiers, file paths, protocol tokens, and other machine-defined text, use `System.StringComparison.Ordinal` (or `System.StringComparison.OrdinalIgnoreCase` to ignore case). Ordinal comparison is fast and consistent across cultures.
- For text that users read and sort, such as names or product titles, use `System.StringComparison.CurrentCulture` so the order matches the user's expectations.

Culture-aware comparison applies linguistic rules that vary by culture and can produce surprising results. For example, some cultures treat `"ss"` and `"ß"` as equal, and the order of strings can change between machines. Because of that variability, reserve culture-aware comparison for genuine natural-language text, and use the same comparison kind whenever you both sort and search a collection.

For an in-depth treatment of culture-sensitive comparison, including globalization considerations and platform differences, see Best practices for comparing strings in .NET.

## See also

- Best practices for comparing strings in .NET
- Search strings in C#
- `System.StringComparison`
- `System.String.Compare*`
