---
title: "Built-in types and literals (part 4 of 5)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/fundamentals/types/built-in-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Built-in types and literals (part 4 of 5)

## `default` expressions

The `default` expression produces the default value for a type: `0` for numeric types, `false` for `bool`, and `null` for reference types:

```csharp
int population = 67_000_000;
long distance = 384_400_000L;
short temperature = -40;
byte red = 255;

double pi = 3.141592653589793;
float gravity = 9.81f;
decimal price = 19.99m;

uint fileSize = 4_294_967_295;
ulong totalBytes = 18_446_744_073_709_551_615;
ushort port = 443;

nint bufferSize = 1024;
nuint elementCount = 256;

bool isValid = true;
char grade = 'A';
string greeting = "Hello, world!";

int dec = 42;
int hex = 0x2A;
int bin = 0b_0010_1010;
long big = 1_000_000_000L;

double d = 3.14;
float f = 3.14f;
decimal m = 3.14m;
double scientific = 1.5e6; // 1,500,000

char newline = '\n';
char unicode = '\u0041'; // 'A'

string message = $"Found {dec} items";            // interpolated string
string path = @"C:\Users\docs\file.txt";        // verbatim string
string json = """
    { "name": "Alice", "age": 30 }
    """;                                           // raw string literal
string raw = $"""
    Found {dec} items in "{greeting}"
    """;                                           // raw + interpolated

int defaultInt = default;          // 0
bool defaultBool = default;        // false
string? defaultString = default;   // null

// Use default in a conditional:
var limit = (args.Length > 0) ? int.Parse(args[0]) : default(int);

var count = 10;              // compiler infers int
var name = "C#";             // compiler infers string
var items = new List<int>(); // compiler infers List<int>

// var requires an initializer — the compiler needs a value to infer the type.
// The following line wouldn't compile:
// var unknown;

List<string> names = new() { "Alice", "Bob", "Charlie" };
Dictionary<string, int> scores = new()
{
    ["Alice"] = 95,
    ["Bob"] = 87
};

dynamic value = 42;
Console.WriteLine(value.GetType()); // System.Int32

value = "Now I'm a string";
Console.WriteLine(value.GetType()); // System.String

// The compiler doesn't check operations on dynamic at compile time.
// Errors surface at run time instead.

Console.WriteLine($"population: {population}");
Console.WriteLine($"distance: {distance}");
Console.WriteLine($"temperature: {temperature}");
Console.WriteLine($"red: {red}");
Console.WriteLine($"pi: {pi}");
Console.WriteLine($"gravity: {gravity}");
Console.WriteLine($"price: {price}");
Console.WriteLine($"fileSize: {fileSize}");
Console.WriteLine($"totalBytes: {totalBytes}");
Console.WriteLine($"port: {port}");
Console.WriteLine($"bufferSize: {bufferSize}");
Console.WriteLine($"elementCount: {elementCount}");
Console.WriteLine($"isValid: {isValid}");
Console.WriteLine($"grade: {grade}");
Console.WriteLine($"greeting: {greeting}");
Console.WriteLine($"dec: {dec}, hex: {hex}, bin: {bin}, big: {big}");
Console.WriteLine($"d: {d}, f: {f}, m: {m}, scientific: {scientific}");
Console.WriteLine($"newline char: [{newline}], unicode: {unicode}");
Console.WriteLine($"path: {path}");
Console.WriteLine($"message: {message}");
Console.WriteLine($"json: {json}");
Console.WriteLine($"raw: {raw}");
Console.WriteLine($"defaultInt: {defaultInt}, defaultBool: {defaultBool}, defaultString: {defaultString}");
Console.WriteLine($"limit: {limit}");
Console.WriteLine($"count: {count}, name: {name}, items: {items.Count}");
Console.WriteLine($"names: {string.Join(", ", names)}");
Console.WriteLine($"scores: {string.Join(", ", scores.Select(kv => $"{kv.Key}={kv.Value}"))}");
```
The `default` expression is most useful in generic code, where you don't know the concrete type and can't hard-code a specific value like `0` or `null`. Write `default` (without a type argument) when the compiler can infer the type from context, or `default(T)` when the type isn't obvious. For the complete list of default values by type, see Default values of C# types.

## Implicitly typed variables with `var`

The `var` keyword tells the compiler to infer a local variable's type from its initializer:

```csharp
int population = 67_000_000;
long distance = 384_400_000L;
short temperature = -40;
byte red = 255;

double pi = 3.141592653589793;
float gravity = 9.81f;
decimal price = 19.99m;

uint fileSize = 4_294_967_295;
ulong totalBytes = 18_446_744_073_709_551_615;
ushort port = 443;

nint bufferSize = 1024;
nuint elementCount = 256;

bool isValid = true;
char grade = 'A';
string greeting = "Hello, world!";

int dec = 42;
int hex = 0x2A;
int bin = 0b_0010_1010;
long big = 1_000_000_000L;

double d = 3.14;
float f = 3.14f;
decimal m = 3.14m;
double scientific = 1.5e6; // 1,500,000

char newline = '\n';
char unicode = '\u0041'; // 'A'

string message = $"Found {dec} items";            // interpolated string
string path = @"C:\Users\docs\file.txt";        // verbatim string
string json = """
    { "name": "Alice", "age": 30 }
    """;                                           // raw string literal
string raw = $"""
    Found {dec} items in "{greeting}"
    """;                                           // raw + interpolated

int defaultInt = default;          // 0
bool defaultBool = default;        // false
string? defaultString = default;   // null

// Use default in a conditional:
var limit = (args.Length > 0) ? int.Parse(args[0]) : default(int);

var count = 10;              // compiler infers int
var name = "C#";             // compiler infers string
var items = new List<int>(); // compiler infers List<int>

// var requires an initializer — the compiler needs a value to infer the type.
// The following line wouldn't compile:
// var unknown;

List<string> names = new() { "Alice", "Bob", "Charlie" };
Dictionary<string, int> scores = new()
{
    ["Alice"] = 95,
    ["Bob"] = 87
};

dynamic value = 42;
Console.WriteLine(value.GetType()); // System.Int32

value = "Now I'm a string";
Console.WriteLine(value.GetType()); // System.String

// The compiler doesn't check operations on dynamic at compile time.
// Errors surface at run time instead.

Console.WriteLine($"population: {population}");
Console.WriteLine($"distance: {distance}");
Console.WriteLine($"temperature: {temperature}");
Console.WriteLine($"red: {red}");
Console.WriteLine($"pi: {pi}");
Console.WriteLine($"gravity: {gravity}");
Console.WriteLine($"price: {price}");
Console.WriteLine($"fileSize: {fileSize}");
Console.WriteLine($"totalBytes: {totalBytes}");
Console.WriteLine($"port: {port}");
Console.WriteLine($"bufferSize: {bufferSize}");
Console.WriteLine($"elementCount: {elementCount}");
Console.WriteLine($"isValid: {isValid}");
Console.WriteLine($"grade: {grade}");
Console.WriteLine($"greeting: {greeting}");
Console.WriteLine($"dec: {dec}, hex: {hex}, bin: {bin}, big: {big}");
Console.WriteLine($"d: {d}, f: {f}, m: {m}, scientific: {scientific}");
Console.WriteLine($"newline char: [{newline}], unicode: {unicode}");
Console.WriteLine($"path: {path}");
Console.WriteLine($"message: {message}");
Console.WriteLine($"json: {json}");
Console.WriteLine($"raw: {raw}");
Console.WriteLine($"defaultInt: {defaultInt}, defaultBool: {defaultBool}, defaultString: {defaultString}");
Console.WriteLine($"limit: {limit}");
Console.WriteLine($"count: {count}, name: {name}, items: {items.Count}");
Console.WriteLine($"names: {string.Join(", ", names)}");
Console.WriteLine($"scores: {string.Join(", ", scores.Select(kv => $"{kv.Key}={kv.Value}"))}");
```
The variable is still strongly typed; `var` doesn't make it dynamic. The compiler determines the type at compile time and enforces type safety as usual. Use `var` when the type is obvious from the right-hand side to reduce visual noise. Spell out the type when it makes the code clearer. For more information, see Implicitly typed local variables.

## Target-typed `new` expressions

When you already know the target type from context, such as a variable declaration or a method parameter, you can omit the type name from the `new` expression:

```csharp
int population = 67_000_000;
long distance = 384_400_000L;
short temperature = -40;
byte red = 255;

double pi = 3.141592653589793;
float gravity = 9.81f;
decimal price = 19.99m;

uint fileSize = 4_294_967_295;
ulong totalBytes = 18_446_744_073_709_551_615;
ushort port = 443;

nint bufferSize = 1024;
nuint elementCount = 256;

bool isValid = true;
char grade = 'A';
string greeting = "Hello, world!";

int dec = 42;
int hex = 0x2A;
int bin = 0b_0010_1010;
long big = 1_000_000_000L;

double d = 3.14;
float f = 3.14f;
decimal m = 3.14m;
double scientific = 1.5e6; // 1,500,000

char newline = '\n';
char unicode = '\u0041'; // 'A'

string message = $"Found {dec} items";            // interpolated string
string path = @"C:\Users\docs\file.txt";        // verbatim string
string json = """
    { "name": "Alice", "age": 30 }
    """;                                           // raw string literal
string raw = $"""
    Found {dec} items in "{greeting}"
    """;                                           // raw + interpolated

int defaultInt = default;          // 0
bool defaultBool = default;        // false
string? defaultString = default;   // null

// Use default in a conditional:
var limit = (args.Length > 0) ? int.Parse(args[0]) : default(int);

var count = 10;              // compiler infers int
var name = "C#";             // compiler infers string
var items = new List<int>(); // compiler infers List<int>

// var requires an initializer — the compiler needs a value to infer the type.
// The following line wouldn't compile:
// var unknown;

List<string> names = new() { "Alice", "Bob", "Charlie" };
Dictionary<string, int> scores = new()
{
    ["Alice"] = 95,
    ["Bob"] = 87
};

dynamic value = 42;
Console.WriteLine(value.GetType()); // System.Int32

value = "Now I'm a string";
Console.WriteLine(value.GetType()); // System.String

// The compiler doesn't check operations on dynamic at compile time.
// Errors surface at run time instead.

Console.WriteLine($"population: {population}");
Console.WriteLine($"distance: {distance}");
Console.WriteLine($"temperature: {temperature}");
Console.WriteLine($"red: {red}");
Console.WriteLine($"pi: {pi}");
Console.WriteLine($"gravity: {gravity}");
Console.WriteLine($"price: {price}");
Console.WriteLine($"fileSize: {fileSize}");
Console.WriteLine($"totalBytes: {totalBytes}");
Console.WriteLine($"port: {port}");
Console.WriteLine($"bufferSize: {bufferSize}");
Console.WriteLine($"elementCount: {elementCount}");
Console.WriteLine($"isValid: {isValid}");
Console.WriteLine($"grade: {grade}");
Console.WriteLine($"greeting: {greeting}");
Console.WriteLine($"dec: {dec}, hex: {hex}, bin: {bin}, big: {big}");
Console.WriteLine($"d: {d}, f: {f}, m: {m}, scientific: {scientific}");
Console.WriteLine($"newline char: [{newline}], unicode: {unicode}");
Console.WriteLine($"path: {path}");
Console.WriteLine($"message: {message}");
Console.WriteLine($"json: {json}");
Console.WriteLine($"raw: {raw}");
Console.WriteLine($"defaultInt: {defaultInt}, defaultBool: {defaultBool}, defaultString: {defaultString}");
Console.WriteLine($"limit: {limit}");
Console.WriteLine($"count: {count}, name: {name}, items: {items.Count}");
Console.WriteLine($"names: {string.Join(", ", names)}");
Console.WriteLine($"scores: {string.Join(", ", scores.Select(kv => $"{kv.Key}={kv.Value}"))}");
```
Target-typed `new` reduces repetition when the type name is long or appears on the left-hand side of the assignment. It works anywhere the compiler can determine the target type, including method arguments and return statements. For more information, see `new` operator — target-typed `new`.
