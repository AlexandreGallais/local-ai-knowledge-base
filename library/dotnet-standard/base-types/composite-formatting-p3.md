---
title: "Composite formatting (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/base-types/composite-formatting.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Composite formatting (part 3 of 3)

## Code examples

The following example shows one string created using composite formatting and another created using an object's `ToString` method. Both types of formatting produce equivalent results.

```csharp
string formatString1 = string.Format("{0:dddd MMMM}", DateTime.Now);
string formatString2 = DateTime.Now.ToString("dddd MMMM");
```
```vb
Dim formatString1 As String = String.Format("{0:dddd MMMM}", DateTime.Now)
Dim formatString2 As String = DateTime.Now.ToString("dddd MMMM")
```
Assuming that the current day is a Thursday in May, the value of both strings in the preceding example is `Thursday May` in the U.S. English culture.

`System.Console.WriteLine*` exposes the same functionality as `System.String.Format*`. The only difference between the two methods is that `System.String.Format*` returns its result as a string, while `System.Console.WriteLine*` writes the result to the output stream associated with the `System.Console` object. The following example uses the `System.Console.WriteLine*` method to format the value of `myNumber` to a currency value:

```csharp
int myNumber = 100;
Console.WriteLine($"{myNumber:C}");

// The example displays the following output
// if en-US is the current culture:
//        $100.00
```
```vb
Dim myNumber As Integer = 100
Console.WriteLine("{0:C}", myNumber)

'The example displays the following output
'if en-US Is the current culture:
'       $100.00
```
The following example demonstrates formatting multiple objects, including formatting one object in two different ways:

```csharp
string myName = "Fred";
Console.WriteLine(string.Format("Name = {0}, hours = {1:hh}, minutes = {1:mm}",
                                myName, DateTime.Now));

// Depending on the current time, the example displays output like the following:
//        Name = Fred, hours = 11, minutes = 30
```
```vb
Dim myName As String = "Fred"
Console.WriteLine(String.Format("Name = {0}, hours = {1:hh}, minutes = {1:mm}",
                                myName, DateTime.Now))
'Depending on the current time, the example displays output Like the following:
'       Name = Fred, hours = 11, minutes = 30
```
The following example demonstrates the use of width in formatting. The arguments that are formatted are placed between vertical bar characters (`|`) to highlight the resulting alignment.

```csharp
string firstName = "Fred";
string lastName = "Opals";
int myNumber = 100;

string formatFirstName = string.Format("First Name = |{0,10}|", firstName);
string formatLastName = string.Format("Last Name =  |{0,10}|", lastName);
string formatPrice = string.Format("Price =      |{0,10:C}|", myNumber);
Console.WriteLine(formatFirstName);
Console.WriteLine(formatLastName);
Console.WriteLine(formatPrice);
Console.WriteLine();

formatFirstName = string.Format("First Name = |{0,-10}|", firstName);
formatLastName = string.Format("Last Name =  |{0,-10}|", lastName);
formatPrice = string.Format("Price =      |{0,-10:C}|", myNumber);
Console.WriteLine(formatFirstName);
Console.WriteLine(formatLastName);
Console.WriteLine(formatPrice);

// The example displays the following output on a system whose current
// culture is en-US:
//     First Name = |      Fred|
//     Last Name =  |     Opals|
//     Price =      |   $100.00|
//
//     First Name = |Fred      |
//     Last Name =  |Opals     |
//     Price =      |$100.00   |
```
```vb
Dim firstName As String = "Fred"
Dim lastName As String = "Opals"
Dim myNumber As Integer = 100

Dim formatFirstName As String = String.Format("First Name = |{0,10}|", firstName)
Dim formatLastName As String = String.Format("Last Name =  |{0,10}|", lastName)
Dim formatPrice As String = String.Format("Price =      |{0,10:C}|", myNumber)
Console.WriteLine(formatFirstName)
Console.WriteLine(formatLastName)
Console.WriteLine(formatPrice)
Console.WriteLine()

formatFirstName = String.Format("First Name = |{0,-10}|", firstName)
formatLastName = String.Format("Last Name =  |{0,-10}|", lastName)
formatPrice = String.Format("Price =      |{0,-10:C}|", myNumber)
Console.WriteLine(formatFirstName)
Console.WriteLine(formatLastName)
Console.WriteLine(formatPrice)

'The example displays the following output on a system whose current
'culture Is en-US:
'    First Name = |      Fred|
'    Last Name =  |     Opals|
'    Price =      |   $100.00|
'
'    First Name = |Fred      |
'    Last Name =  |Opals     |
'    Price =      |$100.00   |
```
## Improve performance with CompositeFormat

Starting with .NET 8, use the `System.Text.CompositeFormat` class to improve the performance of composite string formatting when the same format string is used repeatedly. Parsing a composite format string at runtime is expensive, and `System.Text.CompositeFormat` pre-parses it once when you create the instance, so the formatting code in your performance-critical code path can run much faster.

To use `CompositeFormat`:

1. Call `System.Text.CompositeFormat.Parse(System.String)` to create a `CompositeFormat` instance. For best results, cache this instance—typically as a `static readonly` field in C# or a `Shared ReadOnly` field in Visual Basic—so the format string is parsed only once.
1. Pass the cached instance to `System.String.Format*` or `System.Text.StringBuilder.AppendFormat*` instead of the original format string.

```csharp
// Typically stored as a static readonly field so it's parsed only once.
CompositeFormat format = CompositeFormat.Parse("Name = {0}, hours = {1:hh}");

// Pass null for IFormatProvider to use the current culture.
// Use the pre-parsed format to avoid reparsing on every call.
string result = string.Format(null, format, "Fred", DateTime.Now);
Console.WriteLine(result);
// Output: Name = Fred, hours = 06
```
```vb
' Typically stored as a Shared ReadOnly field so it's parsed only once.
Dim format As CompositeFormat = CompositeFormat.Parse("Name = {0}, hours = {1:hh}")

' Pass Nothing for IFormatProvider to use the current culture.
' Use the pre-parsed format to avoid reparsing on every call.
Dim result As String = String.Format(Nothing, format, "Fred", DateTime.Now)
Console.WriteLine(result)
' Output: Name = Fred, hours = 06
```
The CA1863 code analyzer rule detects places in your code where you can use `CompositeFormat` to improve performance.

## See also

- `System.Console.WriteLine*`
- `System.String.Format*`
- `System.Text.CompositeFormat`
- String interpolation (C#)
- String interpolation (Visual Basic)
- Formatting types
- Standard numeric format strings
- Custom numeric format strings
- Standard date and time format strings
- Custom date and time format strings
- Standard TimeSpan format strings
- Custom TimeSpan format strings
- Enumeration format strings
