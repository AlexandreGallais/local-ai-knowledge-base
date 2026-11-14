---
title: "String class (part 1 of 26)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/String.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# String class

Namespace: `System`

```csharp
public sealed class String : ICloneable, IComparable, IComparable<string>, IConvertible, IEquatable<string>, IParsable<string>, ISpanParsable<string>, System.Collections.Generic.IEnumerable<char>
```

Represents text as a sequence of UTF-16 code units.

A string is a sequential collection of characters that's used to represent text. A `String` object is a sequential collection of `Char` objects that represent a string; a `Char` object corresponds to a UTF-16 code unit. The value of the `String` object is the content of the sequential collection of `Char` objects, and that value is immutable (that is, it is read-only). For more information about the immutability of strings, see the Immutability and the StringBuilder class section. The maximum size of a `String` object in memory is 2-GB, or about 1 billion characters.

For more information about Unicode, UTF-16, code units, code points, and the `Char` and `Rune` types, see Introduction to character encoding in .NET.

#### Instantiate a String object

You can instantiate a `String` object in the following ways:

- By assigning a string literal to a `String` variable. This is the most commonly used method for creating a string. The following example uses assignment to create several strings. Note that in C# and F#, because the backslash (\\) is an escape character, literal backslashes in a string must be escaped or the entire string must be @-quoted.

_Code sample not included: ~/snippets/csharp/System/String/Overview/program.cs._

- By calling a `String` class constructor. The following example instantiates strings by calling several class constructors. Note that some of the constructors include pointers to character arrays or signed byte arrays as parameters. Visual Basic does not support calls to these constructors. For detailed information about `String` constructors, see the `String.%23ctor` constructor summary.

_Code sample not included: ~/snippets/csharp/System/String/Overview/program.cs._

- By using the string concatenation operator (+ in C# and F#, and & or + in Visual Basic) to create a single string from any combination of `String` instances and string literals. The following example illustrates the use of the string concatenation operator.

_Code sample not included: ~/snippets/csharp/System/String/Overview/program.cs._

- By retrieving a property or calling a method that returns a string. The following example uses the methods of the `String` class to extract a substring from a larger string.

_Code sample not included: ~/snippets/csharp/System/String/Overview/program.cs._

- By calling a formatting method to convert a value or object to its string representation. The following example uses the composite formatting feature to embed the string representation of two objects into a string.

_Code sample not included: ~/snippets/csharp/System/String/Overview/program.cs._

#### Char objects and Unicode characters

Each character in a string is defined by a Unicode scalar value, also called a Unicode code point or the ordinal (numeric) value of the Unicode character. Each code point is encoded by using UTF-16 encoding, and the numeric value of each element of the encoding is represented by a `Char` object.

> **Note:**
> Note that, because a `String` instance consists of a sequential collection of UTF-16 code units, it is possible to create a `String` object that is not a well-formed Unicode string. For example, it is possible to create a string that has a low surrogate without a corresponding high surrogate. Although some methods, such as the methods of encoding and decoding objects in the `Text` namespace, may performs checks to ensure that strings are well-formed, `String` class members don't ensure that a string is well-formed.

A single `Char` object usually represents a single code point; that is, the numeric value of the `Char` equals the code point. For example, the code point for the character "a" is U+0061. However, a code point might require more than one encoded element (more than one `Char` object). The Unicode standard defines two types of characters that correspond to multiple `Char` objects: graphemes, and Unicode supplementary code points that correspond to characters in the Unicode supplementary planes.

- A grapheme is represented by a base character followed by one or more combining characters. For example, the character ä is represented by a `Char` object whose code point is U+0061 followed by a `Char` object whose code point is U+0308. This character can also be defined by a single `Char` object that has a code point of U+00E4. As the following example shows, a culture-sensitive comparison for equality indicates that these two representations are equal, although an ordinary ordinal comparison does not. However, if the two strings are normalized, an ordinal comparison also indicates that they are equal. (For more information on normalizing strings, see the Normalization section.)

_Code sample not included: ~/snippets/csharp/System/String/Overview/grapheme1.cs._

- A Unicode supplementary code point (a surrogate pair) is represented by a `Char` object whose code point is a high surrogate followed by a `Char` object whose code point is a low surrogate. The code units of high surrogates range from U+D800 to U+DBFF. The code units of low surrogates range from U+DC00 to U+DFFF. Surrogate pairs are used to represent characters in the 16 Unicode supplementary planes. The following example creates a surrogate character and passes it to the `IsSurrogatePair` method to determine whether it is a surrogate pair.

_Code sample not included: ~/snippets/csharp/System/String/Overview/surrogate1.cs._

#### The Unicode standard

Characters in a string are represented by UTF-16 encoded code units, which correspond to `Char` values.

Each character in a string has an associated Unicode character category, which is represented in .NET by the `UnicodeCategory` enumeration. The category of a character or a surrogate pair can be determined by calling the `CharUnicodeInfo.GetUnicodeCategory` method.

.NET maintains its own table of characters and their corresponding categories, which ensures that a specific version of a .NET implementation running on different platforms returns identical character category information. On all .NET versions and across all OS platforms, character category information is provided by the Unicode Character Database.

In addition, .NET supports string comparison and sorting based on the Unicode standard. String comparison and sorting information is provided by International Components for Unicode libraries (except on Windows versions prior to Windows 10 May 2019 Update).

#### Embedded null characters

In .NET, a `String` object can include embedded null characters, which count as a part of the string's length. However, in some languages such as C and C++, a null character indicates the end of a string; it is not considered a part of the string and is not counted as part of the string's length. This means that the following common assumptions that C and C++ programmers or libraries written in C or C++ might make about strings are not necessarily valid when applied to `String` objects:

- The value returned by the `strlen` or `wcslen` functions does not necessarily equal `Length`.
- The string created by the `strcpy_s` or `wcscpy_s` functions is not necessarily identical to the string being copied.

You should ensure that native C and C++ code that instantiates `String` objects, and code that is passed `String` objects through platform invoke, don't assume that an embedded null character marks the end of the string.

Embedded null characters in a string are also treated differently when a string is sorted (or compared) and when a string is searched. Null characters are ignored when performing culture-sensitive comparisons between two strings, including comparisons using the invariant culture. They are considered only for ordinal or case-insensitive ordinal comparisons. On the other hand, embedded null characters are always considered when searching a string with methods such as `String.Contains`, `String.StartsWith`, and `String.IndexOf`.

#### Strings and indexes

An index is the position of a `Char` object (not a Unicode character) in a `String`. An index is a zero-based, nonnegative number that starts from the first position in the string, which is index position zero. A number of search methods, such as `String.IndexOf` and `String.LastIndexOf`, return the index of a character or substring in the string instance.

The `Chars` property lets you access individual `Char` objects by their index position in the string. Because the `Chars` property is the default property (in Visual Basic) or the indexer (in C# and F#), you can access the individual `Char` objects in a string by using code such as the following. This code looks for white space or punctuation characters in a string to determine how many words the string contains.

_Code sample not included: ~/snippets/csharp/System/String/Overview/index11.cs._

Because the `String` class implements the `IEnumerable` interface, you can also iterate through the `Char` objects in a string by using a `foreach` construct, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/String/Overview/index2.cs._

Consecutive index values might not correspond to consecutive Unicode characters, because a Unicode character might be encoded as more than one `Char` object. In particular, a string may contain multi-character units of text that are formed by a base character followed by one or more combining characters or by surrogate pairs. To work with Unicode characters instead of `Char` objects, use the `StringInfo` and `TextElementEnumerator` classes, or the `String.EnumerateRunes` method and the `Rune` struct. The following example illustrates the difference between code that works with `Char` objects and code that works with Unicode characters. It compares the number of characters or text elements in each word of a sentence. The string includes two sequences of a base character followed by a combining character.

_Code sample not included: ~/snippets/csharp/System/String/Overview/index3.cs._

This example works with text elements by using the `StringInfo.GetTextElementEnumerator` method and the `TextElementEnumerator` class to enumerate all the text elements in a string. You can also retrieve an array that contains the starting index of each text element by calling the `StringInfo.ParseCombiningCharacters` method.

For more information about working with units of text rather than individual `Char` values, see Introduction to character encoding in .NET.

#### Null strings and empty strings

A string that has been declared but has not been assigned a value is `null`. Attempting to call methods on that string throws a `NullReferenceException`. A null string is different from an empty string, which is a string whose value is "" or `Empty`. In some cases, passing either a null string or an empty string as an argument in a method call throws an exception. For example, passing a null string to the `Int32.Parse` method throws an `ArgumentNullException`, and passing an empty string throws a `FormatException`. In other cases, a method argument can be either a null string or an empty string. For example, if you are providing an `IFormattable` implementation for a class, you want to equate both a null string and an empty string with the general ("G") format specifier.

The `String` class includes the following two convenience methods that enable you to test whether a string is `null` or empty:

- `String.IsNullOrEmpty`, which indicates whether a string is either `null` or is equal to  `Empty`. This method eliminates the need to use code such as the following:

_Code sample not included: ~/snippets/csharp/System/String/Overview/nullorempty1.cs._

- `String.IsNullOrWhiteSpace`, which indicates whether a string is `null`, equals `Empty`, or consists exclusively of white-space characters. This method eliminates the need to use code such as the following:

_Code sample not included: ~/snippets/csharp/System/String/Overview/nullorempty1.cs._

The following example uses the `String.IsNullOrEmpty` method in the `IFormattable.ToString` implementation of a custom `Temperature` class. The method supports the "G", "C", "F", and "K" format strings. If an empty format string or a format string whose value is `null` is passed to the method, its value is changed to the "G" format string.

_Code sample not included: ~/snippets/csharp/System/String/Overview/nullorempty1.cs._

#### Immutability and the StringBuilder class

A `String` object is called immutable (read-only), because its value cannot be modified after it has been created. Methods that appear to modify a `String` object actually return a new `String` object that contains the modification.

Because strings are immutable, string manipulation routines that perform repeated additions or deletions to what appears to be a single string can exact a significant performance penalty. For example, the following code uses a random number generator to create a string with 1000 characters in the range 0x0001 to 0x052F. Although the code appears to use string concatenation to append a new character to the existing string named `str`, it actually creates a new `String` object for each concatenation operation.

_Code sample not included: ~/snippets/csharp/System/String/Overview/immutable.cs._

You can use the `StringBuilder` class instead of the `String` class for operations that make multiple changes to the value of a string. Unlike instances of the `String` class, `StringBuilder` objects are mutable; when you concatenate, append, or delete substrings from a string, the operations are performed on a single string. When you have finished modifying the value of a `StringBuilder` object, you can call its `StringBuilder.ToString` method to convert it to a string. The following example replaces the `String` used in the previous example to concatenate 1000 random characters in the range to  0x0001 to 0x052F with a `StringBuilder` object.

_Code sample not included: ~/snippets/csharp/System/String/Overview/immutable1.cs._

#### Ordinal vs. culture-sensitive operations

Members of the `String` class perform either ordinal or culture-sensitive (linguistic) operations on a `String` object. An ordinal operation acts on the numeric value of each `Char` object. A culture-sensitive operation acts on the value of the `String` object, and takes culture-specific casing, sorting, formatting, and parsing rules into account. Culture-sensitive operations execute in the context of an explicitly declared culture or the implicit current culture. The two kinds of operations can produce very different results when they are performed on the same string.
