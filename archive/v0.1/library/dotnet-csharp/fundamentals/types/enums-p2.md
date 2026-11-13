---
title: "C# Enumerations (part 2 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/types/enums.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# C# Enumerations (part 2 of 2)

## Convert between enums and integers

Explicit cast expressions convert between an enum and its underlying integer type. An explicit cast uses the `(Type)value` syntax to tell the compiler you intend the conversion:

```csharp
static string DescribeSeason(Season season) => season switch
{
    Season.Spring => "Flowers bloom and temperatures rise.",
    Season.Summer => "Long days and warm weather.",
    Season.Autumn => "Leaves change color and fall.",
    Season.Winter => "Short days and cold temperatures.",
    _ => throw new ArgumentOutOfRangeException(nameof(season))
};

var permissions = FileAccess.Read | FileAccess.Write;

Console.WriteLine(permissions);                          // ReadWrite
Console.WriteLine(permissions.HasFlag(FileAccess.Read)); // True
Console.WriteLine(permissions.HasFlag(FileAccess.Execute)); // False

var status = HttpStatus.NotFound;
ushort code = (ushort)status;
Console.WriteLine($"Status: {status} ({code})"); // Status: NotFound (404)

var fromCode = (HttpStatus)200;
Console.WriteLine(fromCode); // OK

// Parse a string to an enum value:
var parsed = Enum.Parse<Season>("Winter");
Console.WriteLine(parsed); // Winter

// Try to parse safely. It returns false only when the input can't be parsed. Call Enum.IsDefined to validate named members:
if (Enum.TryParse<Season>("Monsoon", out var unknown))
{
    Console.WriteLine(unknown);
}
else
{
    Console.WriteLine("'Monsoon' is not a valid Season"); // 'Monsoon' is not a valid Season
}

// Iterate over all values in an enum:
foreach (var season in Enum.GetValues<Season>())
{
    Console.WriteLine($"{season} = {(int)season}");
}
// Spring = 0
// Summer = 1
// Autumn = 2
// Winter = 3

var today = Season.Autumn;
Console.WriteLine(DescribeSeason(today));

enum Season
{
    Spring,
    Summer,
    Autumn,
    Winter
}

enum HttpStatus : ushort
{
    OK = 200,
    NotFound = 404,
    InternalServerError = 500
}

[Flags]
enum FileAccess
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4,
    ReadWrite = Read | Write,
    All = Read | Write | Execute
}
```
Be aware that casting an integer to an enum doesn't validate whether the value matches a defined member. Use `System.Enum.IsDefined*` to check validity when you accept numeric input from external sources.

## Parse strings and iterate values

The `System.Enum` base class provides methods for parsing strings and iterating over all defined values:

```csharp
static string DescribeSeason(Season season) => season switch
{
    Season.Spring => "Flowers bloom and temperatures rise.",
    Season.Summer => "Long days and warm weather.",
    Season.Autumn => "Leaves change color and fall.",
    Season.Winter => "Short days and cold temperatures.",
    _ => throw new ArgumentOutOfRangeException(nameof(season))
};

var permissions = FileAccess.Read | FileAccess.Write;

Console.WriteLine(permissions);                          // ReadWrite
Console.WriteLine(permissions.HasFlag(FileAccess.Read)); // True
Console.WriteLine(permissions.HasFlag(FileAccess.Execute)); // False

var status = HttpStatus.NotFound;
ushort code = (ushort)status;
Console.WriteLine($"Status: {status} ({code})"); // Status: NotFound (404)

var fromCode = (HttpStatus)200;
Console.WriteLine(fromCode); // OK

// Parse a string to an enum value:
var parsed = Enum.Parse<Season>("Winter");
Console.WriteLine(parsed); // Winter

// Try to parse safely. It returns false only when the input can't be parsed. Call Enum.IsDefined to validate named members:
if (Enum.TryParse<Season>("Monsoon", out var unknown))
{
    Console.WriteLine(unknown);
}
else
{
    Console.WriteLine("'Monsoon' is not a valid Season"); // 'Monsoon' is not a valid Season
}

// Iterate over all values in an enum:
foreach (var season in Enum.GetValues<Season>())
{
    Console.WriteLine($"{season} = {(int)season}");
}
// Spring = 0
// Summer = 1
// Autumn = 2
// Winter = 3

var today = Season.Autumn;
Console.WriteLine(DescribeSeason(today));

enum Season
{
    Spring,
    Summer,
    Autumn,
    Winter
}

enum HttpStatus : ushort
{
    OK = 200,
    NotFound = 404,
    InternalServerError = 500
}

[Flags]
enum FileAccess
{
    None = 0,
    Read = 1,
    Write = 2,
    Execute = 4,
    ReadWrite = Read | Write,
    All = Read | Write | Execute
}
```
Use `System.Enum.TryParse``1(System.String,System.Boolean,``0@)` instead of `System.Enum.Parse``1(System.String)` when the input might be invalid. It returns `false` instead of throwing an exception.

## See also

- Type system overview
- Enumeration types (C# reference)
- Pattern matching
- Enum design guidelines
