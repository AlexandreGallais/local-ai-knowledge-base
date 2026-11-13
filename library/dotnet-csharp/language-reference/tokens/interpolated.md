---
title: "$ - string interpolation - format string output"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/tokens/interpolated.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# String interpolation using `$`

Use the `$` character to identify a string literal as an _interpolated string_. An interpolated string is a string literal that might contain _interpolation expressions_. When you resolve an interpolated string to a result string, the compiler replaces items with interpolation expressions by the string representations of the expression results.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

String interpolation provides a more readable, convenient syntax to format strings. It's easier to read than string composite formatting. The following example uses both features to produce the same output:

```csharp
var name = "Mark";
var date = DateTime.Now;

// Composite formatting:
Console.WriteLine("Hello, {0}! Today is {1}, it's {2:HH:mm} now.", name, date.DayOfWeek, date);
// String interpolation:
Console.WriteLine($"Hello, {name}! Today is {date.DayOfWeek}, it's {date:HH:mm} now.");
// Both calls produce the same output that is similar to:
// Hello, Mark! Today is Wednesday, it's 19:40 now.
```
You can use an interpolated string to initialize a constant string. You can do that only if all interpolation expressions within the interpolated string are constant strings as well.

## Structure of an interpolated string

To make a string literal an interpolated string, add the `$` symbol at the beginning. Don't include any white space between the `$` and the `"` that starts a string literal.

The structure of an item with an interpolation expression is as follows:

```csharp
{<interpolationExpression>[,<width>][:<formatString>]}
```

Elements in square brackets are optional. The following table describes each element:

| Element                   | Description |
|---------------------------|-------------|
| `interpolationExpression` | The expression that produces a result to be formatted. When the expression is `null`, the output is the empty string (`System.String.Empty`). |
| `width`               | The constant expression whose value defines the minimum number of characters in the string representation of the expression result. If positive, the string representation is right-aligned; if negative, left-aligned. For more information, see the Width component section of the Composite formatting article. |
| `formatString`            | A format string supported by the type of the expression result. For more information, see the Format string component section of the Composite formatting article. |

The following example uses optional formatting components described in the preceding table:

```csharp
Console.WriteLine($"|{"Left",-7}|{"Right",7}|");

const int FieldWidthRightAligned = 20;
Console.WriteLine($"{Math.PI,FieldWidthRightAligned} - default formatting of the pi number");
Console.WriteLine($"{Math.PI,FieldWidthRightAligned:F3} - display only three decimal digits of the pi number");
// Output is:
// |Left   |  Right|
//     3.14159265358979 - default formatting of the pi number
//                3.142 - display only three decimal digits of the pi number
```
To make the code more readable, use new lines within an interpolation expression. The following example shows how new lines can improve the readability of an expression involving pattern matching:

```csharp
string message = $"The usage policy for {safetyScore} is {
    safetyScore switch
    {
        > 90 => "Unlimited usage",
        > 80 => "General usage, with daily safety check",
        > 70 => "Issues must be addressed within 1 week",
        > 50 => "Issues must be addressed within 1 day",
        _ => "Issues must be addressed before continued use",
    }
    }";
```
## Interpolated raw string literals

You can use an interpolated raw string literal, as the following example shows:

```csharp
int X = 2;
int Y = 3;

var pointMessage = $"""The point "{X}, {Y}" is {Math.Sqrt(X * X + Y * Y):F3} from the origin""";

Console.WriteLine(pointMessage);
// Output is:
// The point "2, 3" is 3.606 from the origin
```
To embed `{` and `}` characters in the result string, start an interpolated raw string literal with multiple `$` characters. When you do that, any sequence of `{` or `}` characters shorter than the number of `$` characters is embedded in the result string. To enclose any interpolation expression within that string, you need to use the same number of braces as the number of `$` characters, as the following example shows:

```csharp
int X = 2;
int Y = 3;

var pointMessage = $$"""{The point {{{X}}, {{Y}}} is {{Math.Sqrt(X * X + Y * Y):F3}} from the origin}""";
Console.WriteLine(pointMessage);
// Output is:
// {The point {2, 3} is 3.606 from the origin}
```
In the preceding example, an interpolated raw string literal starts with two `$` characters. You need to put every interpolation expression between double braces (`{{` and `}}`). A single brace is embedded into a result string. If you need to embed repeated `{` or `}` characters into a result string, use an appropriately greater number of `$` characters to designate an interpolated raw string literal. If the string literal has more repeated braces than the number of `$` characters, the `{` and `}` characters are grouped from inside to outside. In the preceding example, the literal `The point {{{X}}, {{Y}}}` interprets `{{X}}` and `{{Y}}` as interpolated expressions. The outer `{` and `}` are included verbatim in the output string.

> **Tip:**
> Visual Studio and the C# Dev Kit provide some validation and syntax highlighting when raw string literals contain JSON data or regular expressions.
>
> The tools parse the text. If the tools have confidence that the text represents JSON or a regular expression, the editor provides syntax coloring.
>
> You can improve that experience by adding a comment above the declaration indicating the format:
>
> - `// lang=json` indicates the raw string literal represents JSON data.
> - `// lang=regex` indicates the raw string literal represents a regular expression.
>
> When a raw string literal is used as an argument where the parameter uses the `System.Diagnostics.CodeAnalysis.StringSyntaxAttribute` to indicate a format, these tools validate the raw string literal for some of the format types. Both JSON and regex are supported.
>
> For some formats, the comment or the attribute enables code suggestions offer fixes for string literals based on the format.

## Special characters

To include a brace, "{" or "}", in the text produced by an interpolated string, use two braces, "{{" or "}}". For more information, see the Escaping braces section of the Composite formatting article.

The colon (":") has special meaning in an interpolation expression item. To use a conditional operator in an interpolation expression, enclose that expression in parentheses.

The following example shows how to include a brace in a result string. It also shows how to use a conditional operator:

```csharp
string name = "Horace";
int age = 34;
Console.WriteLine($"He asked, \"Is your name {name}?\", but didn't wait for a reply :-{{");
Console.WriteLine($"{name} is {age} year{(age == 1 ? "" : "s")} old.");
// Output is:
// He asked, "Is your name Horace?", but didn't wait for a reply :-{
// Horace is 34 years old.
```
An interpolated verbatim string starts with both the `$` and `@` characters. You can use `$` and `@` in any order: both `$@"..."` and `@$"..."` are valid interpolated verbatim strings. For more information about verbatim strings, see the string and verbatim identifier articles.

## Culture-specific formatting

By default, an interpolated string uses the current culture defined by the `System.Globalization.CultureInfo.CurrentCulture` property for all formatting operations.

To resolve an interpolated string to a culture-specific result string, use the `System.String.Create(System.IFormatProvider,System.Runtime.CompilerServices.DefaultInterpolatedStringHandler@)` method, which is available beginning with .NET 6. The following example shows how to do that:

```csharp
double speedOfLight = 299792.458;

System.Globalization.CultureInfo.CurrentCulture = System.Globalization.CultureInfo.GetCultureInfo("nl-NL");
string messageInCurrentCulture = $"The speed of light is {speedOfLight:N3} km/s.";

var specificCulture = System.Globalization.CultureInfo.GetCultureInfo("en-IN");
string messageInSpecificCulture = string.Create(
    specificCulture, $"The speed of light is {speedOfLight:N3} km/s.");

string messageInInvariantCulture = string.Create(
    System.Globalization.CultureInfo.InvariantCulture, $"The speed of light is {speedOfLight:N3} km/s.");

Console.WriteLine($"{System.Globalization.CultureInfo.CurrentCulture,-10} {messageInCurrentCulture}");
Console.WriteLine($"{specificCulture,-10} {messageInSpecificCulture}");
Console.WriteLine($"{"Invariant",-10} {messageInInvariantCulture}");
// Output is:
// nl-NL      The speed of light is 299.792,458 km/s.
// en-IN      The speed of light is 2,99,792.458 km/s.
// Invariant  The speed of light is 299,792.458 km/s.
```
In .NET 5 and earlier versions of .NET, use implicit conversion of an interpolated string to a `System.FormattableString` instance. Then, you can use an instance `System.FormattableString.ToString(System.IFormatProvider)` method or a static `System.FormattableString.Invariant*` method to produce a culture-specific result string. The following example shows how to do that:

```csharp
double speedOfLight = 299792.458;
FormattableString message = $"The speed of light is {speedOfLight:N3} km/s.";

var specificCulture = System.Globalization.CultureInfo.GetCultureInfo("en-IN");
string messageInSpecificCulture = message.ToString(specificCulture);
Console.WriteLine(messageInSpecificCulture);
// Output:
// The speed of light is 2,99,792.458 km/s.

string messageInInvariantCulture = FormattableString.Invariant(message);
Console.WriteLine(messageInInvariantCulture);
// Output is:
// The speed of light is 299,792.458 km/s.
```
For more information about custom formatting, see the Custom formatting with ICustomFormatter section of the Formatting types in .NET article.

## Other resources

If you're new to string interpolation, see the String interpolation in C# tutorial. That tutorial demonstrates how to use interpolated strings to produce formatted strings.

## Compilation of interpolated strings

The compiler checks if an interpolated string is assigned to a type that satisfies the _interpolated string handler pattern_. An _interpolated string handler_ is a type that converts the interpolated string into a result string. When an interpolated string has the type `string`, the `System.Runtime.CompilerServices.DefaultInterpolatedStringHandler` processes it. For the example of a custom interpolated string handler, see the Write a custom string interpolation handler tutorial. Use of an interpolated string handler is an advanced scenario, typically required for performance reasons.

> **Note:**
> One side effect of interpolated string handlers is that a custom handler, including `System.Runtime.CompilerServices.DefaultInterpolatedStringHandler`, might not evaluate all the interpolation expressions within the interpolated string under all conditions. That behavior means side effects of those expressions might not occur.

If an interpolated string has the type `string`, the compiler typically transforms it into a `System.String.Format*` method call. The compiler can replace `System.String.Format*` with `System.String.Concat*` if the analyzed behavior would be equivalent to concatenation.

If an interpolated string has the type `System.IFormattable` or `System.FormattableString`, the compiler generates a call to the `System.Runtime.CompilerServices.FormattableStringFactory.Create*` method.

## C# language specification

For more information, see the Interpolated string expressions and custom interpolated string expression handlers sections of the C# language specification. See also String literals for raw string literals.

## See also

- C# special characters
- Strings
- Standard numeric format strings
- Composite formatting
- `System.String.Format*`
- Simplify interpolation (style rule IDE0071)
- String interpolation in C# 10 and .NET 6 (.NET blog)
