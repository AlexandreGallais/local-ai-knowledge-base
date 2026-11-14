---
title: "TextElementEnumerator class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/TextElementEnumerator.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextElementEnumerator class

Namespace: `System.Globalization`

```csharp
public class TextElementEnumerator : System.Collections.IEnumerator
```

Enumerates the text elements of a string.

#### Remarks

.NET defines a text element as a unit of text that's displayed as a single character, that is, a grapheme. A text element can be any of the following:

- A base character, which is represented as a single `Char` value. For example, LATIN CAPITAL LETTER A (U+0041) and LATIN SMALL LETTER AE (U+00E6) are base characters.
- A combining character sequence, which consists of a base character and one or more combining characters. For example, LATIN CAPITAL LETTER A (U+0041) followed by COMBINING MACRON (U+0304) is a combining character sequence.
- Surrogate pairs, which the Unicode Standard defines as a coded character representation for a single abstract character that consists of a sequence of two code units: a high surrogate, and a low surrogate. Surrogate pairs are used to represent characters outside of the Unicode Basic <example-value> Plane as UTF-16 encoded characters. For example, GOTHIC LETTER SAUIL (U+10343) is represented in UTF-16 encoding as a high surrogate whose value is 0xD800 and a low surrogate whose value is 0xDF43. A surrogate pair can represent a base character or a combining character.

The `TextElementEnumerator` class allows you to work with the text elements in a string rather than with single `Char` objects.

You instantiate a `TextElementEnumerator` object that represents a particular string by passing the string to the `StringInfo.GetTextElementEnumerator` method. This returns an enumerator that is positioned before the first text element in the string. Calling the `TextElementEnumerator.Reset` method also brings the enumerator back to this position. Because this represents an invalid state, you must call `TextElementEnumerator.MoveNext` to advance the enumerator to the first text element of the string before reading the value of the `Current` property to return the current text element.

When working with a `TextElementEnumerator` object, you are responsible for positioning the enumerator. The `Current` property returns the same text element until you call either `TextElementEnumerator.MoveNext` or `TextElementEnumerator.Reset`. The enumerator is in an invalid state if it is positioned before the first text element or after the last text element in the string. When the enumerator is in an invalid state, attempting to retrieve the value of the `Current` property throws an exception. You can determine whether the enumerator is in an invalid state by testing whether the return value of the `MoveNext` property is `false`.

The `TextElementEnumerator` object represents a snapshot of the current state of a string variable or string literal at the moment that the `TextElementEnumerator` object is instantiated. Note that:

- Text element enumerators can only be used to read data in a string. They cannot modify the underlying string.
- An enumerator does not have exclusive access to the string that it represents. A string variable can be modified after the enumerator is created.
- A `TextElementEnumerator` object enumerates the text elements present in the string at the time that the `TextElementEnumerator` object was instantiated. It does not reflect any subsequent changes to the string variable if that variable is modified afterward.
- Because the `TextElementEnumerator` class does not override `Object.Equals`, two `TextElementEnumerator` objects that represent the same string will be considered unequal.

#### Examples
The following example uses the `TextElementEnumerator` class to enumerate the text elements of a string.

_Code sample not included: ~/snippets/csharp/System.Globalization/TextElementEnumerator/Overview/tee_summary.cs._

## TextElementEnumerator.Current property

```csharp
public object Current { get; }
```

Gets the current text element in the string.

Returns: An object containing the current text element in the string.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first text element of the string or after the last text element.

#### Remarks
After an enumerator is created or after a `TextElementEnumerator.Reset` is called, `TextElementEnumerator.MoveNext` must be called to advance the enumerator to the first text element of the string before reading the value of `TextElementEnumerator.Current`. Otherwise, `TextElementEnumerator.Current` is undefined.

`TextElementEnumerator.Current` also throws an exception if the last call to `TextElementEnumerator.MoveNext` returned `false`, which indicates the end of the string.

`TextElementEnumerator.Current` does not move the position of the enumerator, and consecutive calls to `TextElementEnumerator.Current` return the same object until either `TextElementEnumerator.MoveNext` or `TextElementEnumerator.Reset` is called.

## TextElementEnumerator.ElementIndex property

```csharp
public int ElementIndex { get; }
```

Gets the index of the text element that the enumerator is currently positioned over.

Returns: The index of the text element that the enumerator is currently positioned over.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first text element of the string or after the last text element.

To be added.

## TextElementEnumerator.GetTextElement() method

```csharp
public string GetTextElement ();
```

Gets the current text element in the string.

Returns: A new string containing the current text element in the string being read.

Exceptions:

- `InvalidOperationException`: The enumerator is positioned before the first text element of the string or after the last text element.

#### Remarks
This method returns the same text element as the `Current` property.

## TextElementEnumerator.MoveNext() method

```csharp
public bool MoveNext ();
```

Advances the enumerator to the next text element of the string.

Returns: `true` if the enumerator was successfully advanced to the next text element; `false` if the enumerator has passed the end of the string.

#### Remarks
After an enumerator is created or after a `TextElementEnumerator.Reset` is called, the enumerator is positioned before the first text element of the string, and the first call to `TextElementEnumerator.MoveNext` moves the enumerator over the first text element of the string.

If the string is modified after this enumerator was created, `TextElementEnumerator.MoveNext` throws an exception.

After the end of the string is passed, subsequent calls to `TextElementEnumerator.MoveNext` return `false` until `TextElementEnumerator.Reset` is called.

## TextElementEnumerator.Reset() method

```csharp
public void Reset ();
```

Sets the enumerator to its initial position, which is before the first text element in the string.

#### Remarks
The `TextElementEnumerator.Reset` method moves the enumerator to the beginning of the string, before the first text element. After calling `TextElementEnumerator.Reset`, you must call `TextElementEnumerator.MoveNext` to advance the enumerator to the first text element of the string before calling `TextElementEnumerator.Current` to read the value of the first text element.
