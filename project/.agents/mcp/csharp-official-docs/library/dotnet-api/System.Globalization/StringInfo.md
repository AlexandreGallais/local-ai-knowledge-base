---
title: "StringInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/StringInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringInfo class

Namespace: `System.Globalization`

```csharp
public class StringInfo
```

Provides functionality to split a string into text elements and to iterate through those text elements.

#### Remarks

.NET defines a text element as a unit of text that is displayed as a single character, that is, a grapheme. A text element can be a base character, a surrogate pair, or a combining character sequence. The Unicode Standard defines a surrogate pair as a coded character representation for a single abstract character that consists of a sequence of two code units, where the first unit of the pair is a high surrogate and the second is a low surrogate. The Unicode Standard defines a combining character sequence as a combination of a base character and one or more combining characters. A surrogate pair can represent a base character or a combining character.

The `StringInfo` class enables you to work with a string as a series of textual elements rather than individual `Char` objects.

To instantiate a `StringInfo` object that represents a specified string, you can do either of the following:

- Call the `%23ctor` constructor and pass it the string that the `StringInfo` object is to represent as an argument.

- Call the default `%23ctor` constructor, and assign the string that the `StringInfo` object is to represent to the `String` property.

You can work with the individual text elements in a string in two ways:

- By enumerating each text element. To do this, you call the `StringInfo.GetTextElementEnumerator` method, and then repeatedly call the `TextElementEnumerator.MoveNext` method on the returned `TextElementEnumerator` object until the method returns `false`.

- By calling the `StringInfo.ParseCombiningCharacters` method to retrieve an array that contains the starting index of each text element. You can then retrieve individual text elements by passing these indexes to the `StringInfo.SubstringByTextElements` method.

The following example illustrates both ways of working with the text elements in a string. It creates two strings:

- `strCombining`, which is a string of Arabic characters that includes three text elements with multiple `Char` objects. The first text element is the base character ARABIC LETTER ALEF (U+0627) followed by ARABIC HAMZA BELOW (U+0655) and ARABIC KASRA (U+0650). The second text element is ARABIC LETTER HEH (U+0647) followed by ARABIC FATHA (U+064E). The third text element is ARABIC LETTER BEH (U+0628) followed by ARABIC DAMMATAN (U+064C).

- `strSurrogates`, which is a string that includes three surrogate pairs: GREEK ACROPHONIC FIVE TALENTS (U+10148) from the Supplementary Multilingual Plane, U+20026 from the Supplementary Ideographic Plane, and U+F1001 from the private user area. The UTF-16 encoding of each character is a surrogate pair that consists of a high surrogate followed by a low surrogate.

Each string is parsed once by the `StringInfo.ParseCombiningCharacters` method and then by the `StringInfo.GetTextElementEnumerator` method. Both methods correctly parse the text elements in the two strings and display the results of the parsing operation.

_Code sample not included: ~/snippets/csharp/System.Globalization/StringInfo/Overview/indexing1.cs._

#### Examples

This example uses the `StringInfo.GetTextElementEnumerator` and `StringInfo.ParseCombiningCharacters` methods of the `StringInfo` class to manipulate a string that contains surrogate and combining characters.

_Code sample not included: ~/snippets/csharp/System.Globalization/StringInfo/Overview/StringInfo.cs._

## StringInfo.StringInfo() constructor

```csharp
public StringInfo ();
```

Initializes a new instance of the `StringInfo` class.

#### Remarks
The value of the new `StringInfo` object is initialized to the empty string (""). You can assign another string to it by using the `String` property.  You can also instantiate a `StringInfo` object that represents a specified string in a single step by calling the `%23ctor` constructor.

## StringInfo.StringInfo(String) constructor

```csharp
public StringInfo (string value);
```

Initializes a new instance of the `StringInfo` class to a specified string.

Parameters:

- `value`: A string to initialize this `StringInfo` object.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Remarks
This constructor assigns the value argument to the object's `String` property.

## StringInfo.LengthInTextElements property

```csharp
public int LengthInTextElements { get; }
```

Gets the number of text elements in the current `StringInfo` object.

Returns: The number of base characters, surrogate pairs, and combining character sequences in this `StringInfo` object.

To be added.

## StringInfo.String property

```csharp
public string String { get; set; }
```

Gets or sets the value of the current `StringInfo` object.

Returns: The string that is the value of the current `StringInfo` object.

Exceptions:

- `ArgumentNullException`: The value in a set operation is `null`.

#### Remarks
When a `StringInfo` object is instantiated, its `String` property is set to one of the following values:

-   `Empty` if the default  `%23ctor` is called. You should then use the `String` property to assign the string that this `StringInfo` object rperesents.

- The string supplied as the `value` argument to the `%23ctor` constructor.

## StringInfo.Equals(Object) method

```csharp
public override bool Equals (object? value);
```

Indicates whether the current `StringInfo` object is equal to a specified object.

Parameters:

- `value`: An object.

Returns: `true` if the `value` parameter is a `StringInfo` object and its `StringInfo.String` property equals the `StringInfo.String` property of this `StringInfo` object; otherwise, `false`.

To be added.

## StringInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Calculates a hash code for the value of the current `StringInfo` object.

Returns: A 32-bit signed integer hash code based on the string value of this `StringInfo` object.

#### Remarks
The behavior of `StringInfo.GetHashCode` is dependent on its implementation, which might change from one version of the common language runtime to another. This might happen to improve the performance of `StringInfo.GetHashCode`. To make the behavior of `StringInfo.GetHashCode` constant, the application should override the runtime implementation of `StringInfo.GetHashCode` with an implementation known to never change.

## StringInfo.GetNextTextElement(String) method

```csharp
public static string GetNextTextElement (string str);
```

Gets the first text element in a specified string.

Parameters:

- `str`: The string from which to get the text element.

Returns: A string containing the first text element in the specified string.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

#### Remarks

.NET defines a text element as a unit of text that is displayed as a single character, that is, a grapheme. A text element can be a base character, a surrogate pair, or a combining character sequence. The Unicode Standard defines a surrogate pair as a coded character representation for a single abstract character that consists of a sequence of two code units, where the first unit of the pair is a high surrogate and the second is a low surrogate. The Unicode Standard defines a combining character sequence as a combination of a base character and one or more combining characters. A surrogate pair can represent a base character or a combining character.

This method only returns the first text element. To iterate through the text elements of the string, the application should use the `TextElementEnumerator` object generated by the `StringInfo.GetTextElementEnumerator` method.

## StringInfo.GetNextTextElement(String, Int32) method

```csharp
public static string GetNextTextElement (string str, int index);
```

Gets the text element at the specified index of the specified string.

Parameters:

- `str`: The string from which to get the text element.
- `index`: The zero-based index at which the text element starts.

Returns: A string containing the text element at the specified index of the specified string.

Exceptions:

- `ArgumentNullException`: `str` is `null`.
- `ArgumentOutOfRangeException`: `index` is outside the range of valid indexes for `str`.

#### Remarks

.NET defines a text element as a unit of text that is displayed as a single character, that is, a grapheme. A text element can be a base character, a surrogate pair, or a combining character sequence. The Unicode Standard defines a surrogate pair as a coded character representation for a single abstract character that consists of a sequence of two code units, where the first unit of the pair is a high surrogate and the second is a low surrogate. The Unicode Standard defines a combining character sequence as a combination of a base character and one or more combining characters. A surrogate pair can represent a base character or a combining character.

This method only returns the first text element of the substring that starts at the specified index. To iterate through the text elements of the string, the application should use the `TextElementEnumerator` generated by the `StringInfo.GetTextElementEnumerator` method.

## StringInfo.GetNextTextElementLength(Char>) method

```csharp
public static int GetNextTextElementLength (ReadOnlySpan<char> str);
```

Returns the length of the first text element (extended grapheme cluster) that occurs in the input span.

Parameters:

- `str`: The input span to analyze.

Returns: The length (in chars) of the substring corresponding to the first text element within `str`, or 0 if `str` is empty.

#### Remarks

A grapheme cluster is a sequence of one or more Unicode code points that should be treated as a single unit.

## StringInfo.GetNextTextElementLength(String) method

```csharp
public static int GetNextTextElementLength (string str);
```

Returns the length of the first text element (extended grapheme cluster) that occurs in the input string.

Parameters:

- `str`: The input string to analyze.

Returns: The length (in chars) of the substring corresponding to the first text element within `str`, or 0 if `str` is empty.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

#### Remarks

A grapheme cluster is a sequence of one or more Unicode code points that should be treated as a single unit.

## StringInfo.GetNextTextElementLength(String, Int32) method

```csharp
public static int GetNextTextElementLength (string str, int index);
```

Returns the length of the first text element (extended grapheme cluster) that occurs in the input string starting at the specified index.

Parameters:

- `str`: The input string to analyze.
- `index`: The char offset in `str` at which to begin analysis.

Returns: The length (in chars) of the substring corresponding to the first text element within `str` starting at index `index`, or 0 if `index` corresponds to the end of `str`.

Exceptions:

- `ArgumentNullException`: `str` is `null`.
- `ArgumentOutOfRangeException`: `index` is negative or beyond the end of `str`.

#### Remarks

A grapheme cluster is a sequence of one or more Unicode code points that should be treated as a single unit.

## StringInfo.GetTextElementEnumerator(String) method

```csharp
public static System.Globalization.TextElementEnumerator GetTextElementEnumerator (string str);
```

Returns an enumerator that iterates through the text elements of the entire string.

Parameters:

- `str`: The string to iterate through.

Returns: A `TextElementEnumerator` for the entire string.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

#### Remarks
.NET defines a text element as a unit of text that is displayed as a single character, that is, a grapheme. A text element can be a base character, a surrogate pair, or a combining character sequence. The Unicode Standard defines a surrogate pair as a coded character representation for a single abstract character that consists of a sequence of two code units, where the first unit of the pair is a high surrogate and the second is a low surrogate. The Unicode Standard defines a combining character sequence as a combination of a base character and one or more combining characters. A surrogate pair can represent a base character or a combining character.

The text element enumerator is used only to read data in the string; it cannot modify the underlying string. The enumerator does not have exclusive access to the string.

The enumerator is in an invalid state if it is positioned before the first text element in the string or after the last text element in the string. When the enumerator is in an invalid state, calling `TextElementEnumerator.Current` throws an exception.

Initially, the enumerator is positioned before the first text element in the string. `TextElementEnumerator.Reset` also brings the enumerator back to this position. Therefore, after an enumerator is created or after `TextElementEnumerator.Reset` is called, `TextElementEnumerator.MoveNext` must be called to advance the enumerator to the first text element of the string before reading the value of `TextElementEnumerator.Current`.

`TextElementEnumerator.Current` returns the same object until either `TextElementEnumerator.MoveNext` or `TextElementEnumerator.Reset` is called.

After the end of the string is passed, the enumerator is again in an invalid state and calling `TextElementEnumerator.MoveNext` returns `false`. Calling `TextElementEnumerator.Current` throws an exception if the last call to `TextElementEnumerator.MoveNext` returned `false`.

#### Examples
The following example demonstrates calling the `StringInfo.GetTextElementEnumerator` method. This example is part of a larger example provided for the `StringInfo` class.

_Code sample not included: ~/snippets/csharp/System.Globalization/StringInfo/Overview/StringInfo.cs._
