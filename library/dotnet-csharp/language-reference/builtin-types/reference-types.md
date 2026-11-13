---
title: "Built-in reference types (part 1 of 2)"
tool: "dotnet-csharp"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/csharp/language-reference/builtin-types/reference-types.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Built-in reference types (C# reference)

C# has many built-in reference types. These types include keywords or operators that are synonyms for a type in the .NET library.

The C# language reference documents the most recently released version of the C# language. It also contains initial documentation for features in public previews for the upcoming language release.

The documentation identifies any feature first introduced in the last three versions of the language or in current public previews.

> **Tip:**
> To find when a feature was first introduced in C#, consult the article on the C# language version history.

## The object type

The `object` type is an alias for `System.Object` in .NET. In the unified type system of C#, all types, predefined and user-defined, reference types and value types, inherit directly or indirectly from `System.Object`. Assign values of any type (except `ref struct`, see ref struct) to variables of type `object`. You can assign the literal `null` to any `object` variable as its default value. When you convert a value type variable to `object`, the value is *boxed*. When you convert a variable of type `object` to a value type, the value is *unboxed*. For more information, see Boxing and Unboxing.

## The string type

The `string` type represents a sequence of zero or more Unicode characters. In .NET, `string` is an alias for `System.String`.

Although `string` is a reference type, the equality operators `==` and `!=` compare the values of `string` objects, not references. Value-based equality makes testing for string equality more intuitive. For example:

```csharp
string a = "hello";
string b = "h";
// Append to contents of 'b'.
b += "ello";
Console.WriteLine(a == b);
Console.WriteLine(object.ReferenceEquals(a, b));
```

The preceding example displays "True" and then "False" because the content of the strings is equivalent, but `a` and `b` don't refer to the same string instance.

The + operator concatenates strings:

```csharp
string a = "good " + "morning";
```

The preceding code creates a string object that contains "good morning".

Strings are *immutable* - you can't change the contents of a string object after you create it. For example, when you write this code, the compiler actually creates a new string object to hold the new sequence of characters, and assigns that new object to `b`. The memory allocated for `b` (when it contained the string "h") is then eligible for garbage collection.

```csharp
string b = "h";
b += "ello";
```

You can use the `[]` operator for readonly access to individual characters of a string. Valid index values start at `0` and must be less than the length of the string:

```csharp
string str = "test";
char x = str[2];  // x = 's';
```

In similar fashion, you can use the `[]` operator for iterating over each character in a string:

```csharp
string str = "test";

for (int i = 0; i < str.Length; i++)
{
  Console.Write(str[i] + " ");
}
// Output: t e s t
```

### String literals

String literals are of type `string` and come in three forms: raw, quoted, and verbatim.

*Raw string literals* contain arbitrary text without requiring escape sequences. Raw string literals can include whitespace and new lines, embedded quotes, and other special characters. Raw string literals are enclosed in a minimum of three double quotation marks ("""):

```csharp
"""
This is a multi-line
    string literal with the second line indented.
"""
```

You can even include a sequence of three (or more) double quote characters. If your text requires an embedded sequence of quotes, you start and end the raw string literal with more quote marks, as needed:

```csharp
"""""
This raw string literal has four """", count them: """" four!
embedded quote characters in a sequence. That's why it starts and ends
with five double quotes.

You could extend this example with as many embedded quotes as needed for your text.
"""""
```

Raw string literals typically have the starting and ending quote sequences on separate lines from the embedded text. Multiline raw string literals support strings that are themselves quoted strings:

```csharp
var message = """
"This is a very important message."
""";
Console.WriteLine(message);
// output: "This is a very important message."
```

When the starting and ending quotes are on separate lines, the newlines following the opening quote and preceding the ending quote aren't included in the final content. The closing quote sequence dictates the leftmost column for the string literal. You can indent a raw string literal to match the overall code format:

```csharp
var message = """
    "This is a very important message."
    """;
Console.WriteLine(message);
// output: "This is a very important message."
// The leftmost whitespace is not part of the raw string literal
```

Columns to the right of the ending quote sequence are preserved. This behavior enables raw strings for data formats such as JSON, YAML, or XML, as shown in the following example:

```csharp
var json= """
    {
        "prop": 0
    }
    """;
```

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

The compiler returns an error if any of the text lines extend to the left of the closing quote sequence. The opening and closing quote sequences can be on the same line, providing the string literal neither starts nor ends with a quote character:

```csharp
var shortText = """He said "hello!" this morning.""";
```

You can combine raw string literals with string interpolation to include quote characters and braces in the output string.

Quoted string literals are enclosed in double quotation marks ("):

```csharp
"good morning"  // a string literal
```

String literals can contain any character literal. Escape sequences are included. The following example uses escape sequence `\\` for backslash, `\u0066` for the letter f, and `\n` for newline.

```csharp
string a = "\\\u0066\n F";
Console.WriteLine(a);
// Output:
// \f
//  F
```

> **Note:**
> The escape code `\udddd` (where `dddd` is a four-digit number) represents the Unicode character U+`dddd`. Eight-digit Unicode escape codes are also recognized: `\Udddddddd`.

Verbatim string literals start with `@` and are also enclosed in double quotation marks. For example:

```csharp
@"good morning"  // a string literal
```

The advantage of verbatim strings is that escape sequences *aren't* processed, which makes them easy to write. For example, the following text matches a fully qualified Windows file name:

```csharp
@"c:\Docs\Source\a.txt"  // rather than "c:\\Docs\\Source\\a.txt"
```

To include a double quotation mark in an @-quoted string, double it:

```csharp
@"""Ahoy!"" cried the captain." // "Ahoy!" cried the captain.
```

### UTF-8 string literals

.NET stores strings using UTF-16 encoding. UTF-8 is the standard for Web protocols and other important libraries. You can add the `u8` suffix to a string literal to specify UTF-8 encoding. The compiler stores UTF-8 literals as `ReadOnlySpan<byte>` objects. Using a UTF-8 string literal creates a more clear declaration than declaring the equivalent `System.ReadOnlySpan`1`, as shown in the following code:

```csharp
ReadOnlySpan<byte> AuthWithTrailingSpace = new byte[] { 0x41, 0x55, 0x54, 0x48, 0x20 };
ReadOnlySpan<byte> AuthStringLiteral = "AUTH "u8;
```

To store a UTF-8 string literal as an array, use `System.ReadOnlySpan`1.ToArray` to copy the bytes containing the literal to the mutable array:

```csharp
byte[] AuthStringLiteral = "AUTH "u8.ToArray();
```

UTF-8 string literals aren'<example-value>'re runtime constants. Therefore, they can'<example-value>'t combine UTF-8 string literals with string interpolation. You can't use the `$` token and the `u8` suffix on the same string expression.

## The delegate type

The declaration of a delegate type is similar to a method signature. It has a return value and any number of parameters of any type:

```csharp
public delegate void MessageDelegate(string message);
public delegate int AnotherDelegate(MyType m, long num);
```

In .NET, `System.Action` and `System.Func` types provide generic definitions for many common delegates. You likely don't need to define new custom delegate types. Instead, you can create instantiations of the provided generic types.

A `delegate` is a built-in reference type that you can use to encapsulate a named or an anonymous method. Delegates are similar to function pointers in C++; however, delegates are type-safe and secure. For applications of delegates, see Delegates and Generic Delegates. Delegates are the basis for Events. You instantiate a delegate by associating it with either a named or anonymous method.

You must instantiate the delegate with a method or lambda expression that has a compatible return type and input parameters. For more information on the degree of variance that is allowed in the method signature, see Variance in Delegates. For use with anonymous methods, declare the delegate and the code to be associated with it together.

Delegate combination or removal fails with a runtime exception when the delegate types involved at run time are different due to variant conversion. The following example demonstrates a situation that fails:

```csharp
Action<string> stringAction = str => {};
Action<object> objectAction = obj => {};

// Valid due to implicit reference conversion of
// objectAction to Action<string>, but might fail
// at run time.
Action<string> combination = stringAction + objectAction;
```

You can create a delegate with the correct runtime type by creating a new delegate object. The following example demonstrates how this workaround might be applied to the preceding example.

```csharp
Action<string> stringAction = str => {};
Action<object> objectAction = obj => {};

// Creates a new delegate instance with a runtime type of Action<string>.
Action<string> wrappedObjectAction = new Action<string>(objectAction);

// The two Action<string> delegate instances can now be combined.
Action<string> combination = stringAction + wrappedObjectAction;
```

You can declare *function pointers*, which use similar syntax. A function pointer uses the `calli` instruction instead of instantiating a delegate type and calling the virtual `Invoke` method.
