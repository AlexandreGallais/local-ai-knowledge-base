---
title: "Strings (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/strings/index.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Strings (part 2 of 2)

## Format strings

A format string is a string whose contents are determined dynamically at run time. Format strings are created by embedding *interpolated expressions* or placeholders inside of braces within a string. Everything inside the braces (`{...}`) is resolved to a value and output as a formatted string at run time. There are two methods to create format strings: string interpolation and composite formatting.

### String interpolation

You declare *Interpolated strings* with the `$` special character. An interpolated string includes interpolated expressions in braces. If you're new to string interpolation, see the String interpolation - C# tutorial for several examples.

Use string interpolation to improve the readability and maintainability of your code. String interpolation achieves the same results as the `String.Format` method, but is easier to use and improves inline clarity.

```csharp
var jh = (firstName: "Jupiter", lastName: "Hammon", born: 1711, published: 1761);
Console.WriteLine($"{jh.firstName} {jh.lastName} was an African American poet born in {jh.born}.");
Console.WriteLine($"He was first published in {jh.published} at the age of {jh.published - jh.born}.");
Console.WriteLine($"He'd be over {Math.Round((2018d - jh.born) / 100d) * 100d} years old today.");

// Output:
// Jupiter Hammon was an African American poet born in 1711.
// He was first published in 1761 at the age of 50.
// He'd be over 300 years old today.
```
You can use string interpolation to initialize a constant string when all the expressions used for placeholders are also constant strings.

You can combine *raw string literals* with string interpolations. You start and end the format string with three or more successive double quotes. If your output string should contain the `{` or `}` character, you can use extra `$` characters to specify how many `{` and `}` characters start and end an interpolation. Any sequence of fewer `{` or `}` characters is included in the output. The following example shows how you can use that feature to display the distance of a point from the origin, and place the point inside braces:

```csharp
int X = 2;
int Y = 3;

var pointMessage = $$"""The point {{{X}}, {{Y}}} is {{Math.Sqrt(X * X + Y * Y)}} from the origin.""";

Console.WriteLine(pointMessage);
// Output:
// The point {2, 3} is 3.605551275463989 from the origin.
```
### Verbatim string interpolation

C# also allows verbatim string interpolation, for example across multiple lines, using the `$@` or `@$` syntax.

To interpret escape sequences literally, use a verbatim string literal. An interpolated verbatim string starts with the `$` character followed by the `@` character. You can use the `$` and `@` tokens in any order: both `$@"..."` and `@$"..."` are valid interpolated verbatim strings.

```csharp
var jh = (firstName: "Jupiter", lastName: "Hammon", born: 1711, published: 1761);
Console.WriteLine($@"{jh.firstName} {jh.lastName}
    was an African American poet born in {jh.born}.");
Console.WriteLine(@$"He was first published in {jh.published}
at the age of {jh.published - jh.born}.");

// Output:
// Jupiter Hammon
//     was an African American poet born in 1711.
// He was first published in 1761
// at the age of 50.
```
### Composite formatting

The `System.String.Format*` utilizes placeholders in braces to create a format string. This example results in similar output to the string interpolation method used in the preceding sample.

```csharp
var pw = (firstName: "Phillis", lastName: "Wheatley", born: 1753, published: 1773);
Console.WriteLine("{0} {1} was an African American poet born in {2}.", pw.firstName, pw.lastName, pw.born);
Console.WriteLine("She was first published in {0} at the age of {1}.", pw.published, pw.published - pw.born);
Console.WriteLine("She'd be over {0} years old today.", Math.Round((2018d - pw.born) / 100d) * 100d);

// Output:
// Phillis Wheatley was an African American poet born in 1753.
// She was first published in 1773 at the age of 20.
// She'd be over 300 years old today.
```
For more information, see Composite formatting in .NET.

## Substrings

A substring is any sequence of characters that is contained in a string. Use the `System.String.Substring*` method to create a new string from a part of the original string. You can search for one or more occurrences of a substring by using the `System.String.IndexOf*` method. Use the `System.String.Replace*` method to replace all occurrences of a specified substring with a new string. Like the `System.String.Substring*` method, `System.String.Replace*` actually returns a new string and doesn't modify the original string. For more information, see Search strings in C# and How to modify string contents.

```csharp
string s3 = "Visual C# Express";
System.Console.WriteLine(s3.Substring(7, 2));
// Output: "C#"

System.Console.WriteLine(s3.Replace("C#", "Basic"));
// Output: "Visual Basic Express"

// Index values are zero-based
int index = s3.IndexOf("C");
// index = 7
```
## Accessing individual characters

You can use array notation with an index value to acquire read-only access to individual characters, as in the following example:

```csharp
string s5 = "Printing backwards";

for (int i = 0; i < s5.Length; i++)
{
    System.Console.Write(s5[s5.Length - i - 1]);
}
// Output: "sdrawkcab gnitnirP"
```
For more extensive string manipulation, you can use a `System.Text.StringBuilder` object to modify the individual chars "in-place." Then create a new string to store the results by using the `System.Text.StringBuilder` methods. In the following example, assume that you must modify the original string in a particular way and then store the results for future use:

```csharp
string question = "hOW DOES mICROSOFT wORD DEAL WITH THE cAPS lOCK KEY?";
System.Text.StringBuilder sb = new System.Text.StringBuilder(question);

for (int j = 0; j < sb.Length; j++)
{
    if (System.Char.IsLower(sb[j]) == true)
        sb[j] = System.Char.ToUpper(sb[j]);
    else if (System.Char.IsUpper(sb[j]) == true)
        sb[j] = System.Char.ToLower(sb[j]);
}
// Store the new string.
string corrected = sb.ToString();
System.Console.WriteLine(corrected);
// Output: How does Microsoft Word deal with the Caps Lock key?
```
For more information about indices, see the Explore indexes and ranges article.

## Null strings and empty strings

An empty string is an instance of a `System.String` object that contains zero characters. Empty strings are used often in various programming scenarios to represent a blank text field. You can call methods on empty strings because they're valid `System.String` objects. Empty strings are initialized as follows:

```csharp
string s = String.Empty;
```

By contrast, a null string doesn't refer to an instance of a `System.String` object and any attempt to call a method on a null string causes a `System.NullReferenceException`. However, you can use null strings in concatenation and comparison operations with other strings. The following examples illustrate some cases in which a reference to a null string does and doesn't cause an exception to be thrown:

```csharp
string str = "hello";
string? nullStr = null;
string emptyStr = String.Empty;

string tempStr = str + nullStr;
// Output of the following line: hello
Console.WriteLine(tempStr);

bool b = (emptyStr == nullStr);
// Output of the following line: False
Console.WriteLine(b);

// The following line creates a new empty string.
string newStr = emptyStr + nullStr;

// Null strings and empty strings behave differently. The following
// two lines display 0.
Console.WriteLine(emptyStr.Length);
Console.WriteLine(newStr.Length);
// The following line raises a NullReferenceException.
//Console.WriteLine(nullStr.Length);

// The null character can be displayed and counted, like other chars.
string s1 = "\x0" + "abc";
string s2 = "abc" + "\x0";
// Output of the following line: * abc*
Console.WriteLine("*" + s1 + "*");
// Output of the following line: *abc *
Console.WriteLine("*" + s2 + "*");
// Output of the following line: 4
Console.WriteLine(s2.Length);
```
## Using StringBuilder for fast string creation

String operations in .NET are highly optimized and in most cases don't significantly impact performance. However, in some scenarios such as tight loops that are executing many hundreds or thousands of times, string operations can affect performance. The `System.Text.StringBuilder` class creates a string buffer that offers better performance if your program performs many string manipulations. The `System.Text.StringBuilder` string also enables you to reassign individual characters, something the built-in string data type doesn't support. This code, for example, changes the content of a string without creating a new string:

```csharp
System.Text.StringBuilder sb = new System.Text.StringBuilder("Rat: the ideal pet");
sb[0] = 'C';
System.Console.WriteLine(sb.ToString());
//Outputs Cat: the ideal pet
```
In this example, a `System.Text.StringBuilder` object is used to create a string from a set of numeric types:

```csharp
var sb = new StringBuilder();

// Create a string composed of numbers 0 - 9
for (int i = 0; i < 10; i++)
{
    sb.Append(i.ToString());
}
Console.WriteLine(sb);  // displays 0123456789

// Copy one character of the string (not possible with a System.String)
sb[0] = sb[9];

Console.WriteLine(sb);  // displays 9123456789
```
## Strings, extension methods, and LINQ

Because the `System.String` type implements `System.Collections.Generic.IEnumerable`1`, you can use the extension methods defined in the `System.Linq.Enumerable` class on strings. To avoid visual clutter, these methods are excluded from IntelliSense for the `System.String` type, but they're available nevertheless. You can also use LINQ query expressions on strings. For more information, see LINQ and Strings.

## Related articles

- How to modify string contents: Illustrates techniques to transform strings and modify the contents of strings.
- How to compare strings: Shows how to perform ordinal and culture specific comparisons of strings.
- How to concatenate multiple strings: Demonstrates various ways to join multiple strings into one.
- Split strings into substrings in C#: Contains code examples that illustrate how to use the `System.String.Split*` method to parse strings.
- Search strings in C#: Explains how to search for specific text or patterns in strings.
- How to determine whether a string represents a numeric value: Shows how to safely parse a string to see whether it has a valid numeric value.
- String interpolation: Describes the string interpolation feature that provides a convenient syntax to format strings.
- Using the StringBuilder class in .NET
- Parsing Strings: Describes how to convert string representations of .NET base types to instances of the corresponding types.
- Parsing Date and Time Strings in .NET: Shows how to convert a string such as "01/24/2008" to a `System.DateTime` object.
- Comparing Strings: Includes information about how to compare strings and provides examples in C# and Visual Basic.
- Using the StringBuilder Class: Describes how to create and modify dynamic string objects by using the `System.Text.StringBuilder` class.
- LINQ and Strings: Provides information about how to perform various string operations by using LINQ queries.
