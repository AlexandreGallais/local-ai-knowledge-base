---
title: "How to determine whether a string represents a numeric value"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/programming-guide/strings/how-to-determine-whether-a-string-represents-a-numeric-value.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to determine whether a string represents a numeric value (C# Programming Guide)

To determine whether a string is a valid representation of a specified numeric type, use the static `TryParse` method that is implemented by all primitive numeric types and also by types such as `System.DateTime` and `System.Net.IPAddress`. The following example shows how to determine whether "108" is a valid int.

```csharp
int i = 0;
string s = "108";  
bool result = int.TryParse(s, out i); //i now = 108  
```  

 If the string contains nonnumeric characters or the numeric value is too large or too small for the particular type you have specified, `TryParse` returns false and sets the out parameter to zero. Otherwise, it returns true and sets the out parameter to the numeric value of the string.

> **Note:**
> A string may contain only numeric characters and still not be valid for the type whose `TryParse` method that you use. For example, "256" is not a valid value for `byte` but it is valid for `int`. "98.6" is not a valid value for `int` but it is a valid `decimal`.

## Example

 The following examples show how to use `TryParse` with string representations of `long`, `byte`, and `decimal` values.

```csharp

string numString = "1287543"; //"1287543.0" will return false for a long
long number1 = 0;
bool canConvert = long.TryParse(numString, out number1);
if (canConvert == true)
Console.WriteLine($"number1 now = {number1}");
else
Console.WriteLine("numString is not a valid long");

byte number2 = 0;
numString = "255"; // A value of 256 will return false
canConvert = byte.TryParse(numString, out number2);
if (canConvert == true)
Console.WriteLine($"number2 now = {number2}");
else
Console.WriteLine("numString is not a valid byte");

decimal number3 = 0;
numString = "27.3"; //"27" is also a valid decimal
canConvert = decimal.TryParse(numString, out number3);
if (canConvert == true)
Console.WriteLine($"number3 now = {number3}");
else
Console.WriteLine("number3 is not a valid decimal");
```
## Robust Programming

 Primitive numeric types also implement the `Parse` static method, which throws an exception if the string is not a valid number. `TryParse` is generally more efficient because it just returns false if the number is not valid.

## .NET Security

 Always use the `TryParse` or `Parse` methods to validate user input from controls such as text boxes and combo boxes.

## See also

- How to convert a byte array to an int
- How to convert a string to a number
- How to convert between hexadecimal strings and numeric types
- Parsing Numeric Strings
- Formatting Types
