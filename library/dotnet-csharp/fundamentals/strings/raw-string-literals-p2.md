---
title: "Raw string literals in C# (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/strings/raw-string-literals.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Raw string literals in C# (part 2 of 2)

## Indentation: the closing delimiter sets the margin

The column of the closing `"""` defines a left margin. The compiler strips whitespace up to that column from every content line. This rule lets you indent the literal to match the surrounding code without polluting the value:

```csharp
namespace RawStringLiteralsSample;

public static class Program
{
    public static void Main()
    {
        ShowSingleLine();
        ShowEscapeContrast();
        ShowMultiline();
        ShowIndentation();
        ShowMoreQuotes();
        ShowRawInterpolated();
        ShowDoubleDollarInterpolation();
    }

    private static void ShowSingleLine()
    {
        // A raw string literal starts and ends with at least three quotes.
        // Inside, " and \ are literal — no escaping required.
        string message = """She said "hi" and left.""";
        string regex   = """\d{3}-\d{4}""";

        Console.WriteLine(message);   // She said "hi" and left.
        Console.WriteLine(regex);     // \d{3}-\d{4}
    }

    private static void ShowEscapeContrast()
    {
        // Same JSON value, three ways:
        string regular  = "{ \"name\": \"Ada\", \"path\": \"C:\\\\src\" }";
        string verbatim = @"{ ""name"": ""Ada"", ""path"": ""C:\\src"" }";
        string raw      = """{ "name": "Ada", "path": "C:\\src" }""";

        Console.WriteLine(regular  == raw);   // True
        Console.WriteLine(verbatim == raw);   // True
    }

    private static void ShowMultiline()
    {
        // The opening """ and closing """ each sit on their own line.
        // The content between them is the value, exactly as written.
        string sql = """
            SELECT id, name
            FROM customers
            WHERE active = 1
            """;

        Console.WriteLine(sql);
    }

    private static void ShowIndentation()
    {
        // The column of the closing """ sets a left margin.
        // Whitespace up to that column is stripped from every content line.
        string xml = """
                <order id="42">
                    <item>book</item>
                </order>
                """;

        // First content line begins at column 0 of the value:
        Console.WriteLine(xml);
        /* Output:
           <order id="42">
               <item>book</item>
           </order>
         */
    }

    private static void ShowMoreQuotes()
    {
        // When the content itself contains """, use four (or more) quotes
        // for the delimiters. The delimiter count just has to exceed any
        // run of quotes in the content.
        string sample = """"
            The token """ marks a raw string literal.
            """";

        Console.WriteLine(sample);
    }

    private static void ShowRawInterpolated()
    {
        // A single $ before """ enables interpolation: single { and } mark a hole.
        // Inside a single-$ raw string, literal braces aren't allowed — use $$ when
        // the content also contains literal { or }.
        string name = "Ada";
        int    score = 95;

        string report = $"""
            Player:  {name}
            Score:   {score}
            Updated: {DateTime.UtcNow:yyyy-MM-dd}
            """;

        Console.WriteLine(report);
    }

    private static void ShowDoubleDollarInterpolation()
    {
        // Each $ raises the brace count for an interpolation hole.
        // With $$, single { and } are literal; only {{ and }} mark a hole.
        // Useful when the content has lots of literal braces (JSON, CSS, code).
        string user = "alice";

        string template = $$"""
            {
                "filter": { "user": "{{user}}" },
                "limit":  10
            }
            """;

        Console.WriteLine(template);
    }
}
```
If a content line has fewer leading whitespace characters than the closing delimiter's column, the compiler reports an error. Keep all content lines indented at least as much as the closing `"""`.

## Raw interpolated strings

Add a `$` prefix to a raw string to enable interpolation. The expressions in `{}` holes are evaluated, and their results are inserted into the value:

```csharp
namespace RawStringLiteralsSample;

public static class Program
{
    public static void Main()
    {
        ShowSingleLine();
        ShowEscapeContrast();
        ShowMultiline();
        ShowIndentation();
        ShowMoreQuotes();
        ShowRawInterpolated();
        ShowDoubleDollarInterpolation();
    }

    private static void ShowSingleLine()
    {
        // A raw string literal starts and ends with at least three quotes.
        // Inside, " and \ are literal — no escaping required.
        string message = """She said "hi" and left.""";
        string regex   = """\d{3}-\d{4}""";

        Console.WriteLine(message);   // She said "hi" and left.
        Console.WriteLine(regex);     // \d{3}-\d{4}
    }

    private static void ShowEscapeContrast()
    {
        // Same JSON value, three ways:
        string regular  = "{ \"name\": \"Ada\", \"path\": \"C:\\\\src\" }";
        string verbatim = @"{ ""name"": ""Ada"", ""path"": ""C:\\src"" }";
        string raw      = """{ "name": "Ada", "path": "C:\\src" }""";

        Console.WriteLine(regular  == raw);   // True
        Console.WriteLine(verbatim == raw);   // True
    }

    private static void ShowMultiline()
    {
        // The opening """ and closing """ each sit on their own line.
        // The content between them is the value, exactly as written.
        string sql = """
            SELECT id, name
            FROM customers
            WHERE active = 1
            """;

        Console.WriteLine(sql);
    }

    private static void ShowIndentation()
    {
        // The column of the closing """ sets a left margin.
        // Whitespace up to that column is stripped from every content line.
        string xml = """
                <order id="42">
                    <item>book</item>
                </order>
                """;

        // First content line begins at column 0 of the value:
        Console.WriteLine(xml);
        /* Output:
           <order id="42">
               <item>book</item>
           </order>
         */
    }

    private static void ShowMoreQuotes()
    {
        // When the content itself contains """, use four (or more) quotes
        // for the delimiters. The delimiter count just has to exceed any
        // run of quotes in the content.
        string sample = """"
            The token """ marks a raw string literal.
            """";

        Console.WriteLine(sample);
    }

    private static void ShowRawInterpolated()
    {
        // A single $ before """ enables interpolation: single { and } mark a hole.
        // Inside a single-$ raw string, literal braces aren't allowed — use $$ when
        // the content also contains literal { or }.
        string name = "Ada";
        int    score = 95;

        string report = $"""
            Player:  {name}
            Score:   {score}
            Updated: {DateTime.UtcNow:yyyy-MM-dd}
            """;

        Console.WriteLine(report);
    }

    private static void ShowDoubleDollarInterpolation()
    {
        // Each $ raises the brace count for an interpolation hole.
        // With $$, single { and } are literal; only {{ and }} mark a hole.
        // Useful when the content has lots of literal braces (JSON, CSS, code).
        string user = "alice";

        string template = $$"""
            {
                "filter": { "user": "{{user}}" },
                "limit":  10
            }
            """;

        Console.WriteLine(template);
    }
}
```
If your interpolated content also needs literal `{` or `}` characters, see Raw string literals (language reference).

## When to choose which literal

Use a **raw string literal** whenever the content contains quotes, backslashes, or multiple lines. The result is shorter to read, easier to paste in or out of, and free of escape-sequence bugs.

Use a **regular string literal** for short, single-line values without quotes or backslashes such as names, messages, format placeholders.

Use a **verbatim string literal** (`@"..."`) only when working with existing code that uses them. For new code, raw strings cover every case that verbatim strings cover, with cleaner syntax for embedded quotes.

## See also

- Strings overview
- `nameof` operator
- Raw string literals (language reference)
- `System.String`
