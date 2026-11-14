---
title: "TextInfo class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/TextInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextInfo class

Namespace: `System.Globalization`

```csharp
public sealed class TextInfo : ICloneable, System.Runtime.Serialization.IDeserializationCallback
```

Defines text properties and behaviors, such as casing, that are specific to a writing system.

#### Remarks

A writing system is the collection of scripts and orthographic rules required to represent a language as text. The `TextInfo` class represents a writing system.

The application should use the `TextInfo` property to obtain the `TextInfo` object for a particular `CultureInfo` object. If a security decision depends on a string comparison or a case-change operation, the application should use the `TextInfo` property of the object returned by the `InvariantCulture` property to ensure that the behavior of the operation is consistent regardless of the operating system culture settings.

The user might use the regional and language options portion of Control Panel to override the values associated with the current culture of Windows. For example, the user might choose to display the date in a different format or to use a currency other than the default for the culture. If the `UseUserOverride` property is set to `true`, the property values of the objects returned by the `CultureInfo.DateTimeFormat`, `CultureInfo.NumberFormat`, and `CultureInfo.TextInfo` properties are also retrieved from the user settings. If the user settings are incompatible with the culture associated with the `CultureInfo`, for example, if the selected calendar is not one of the `CultureInfo.OptionalCalendars`, the results of the methods and the values of the properties are undefined.

## TextInfo.ANSICodePage property

```csharp
public int ANSICodePage { get; }
```

Gets the American National Standards Institute (ANSI) code page used by the writing system represented by the current `TextInfo`.

Returns: The ANSI code page used by the writing system represented by the current `TextInfo`.

To be added.

## TextInfo.CultureName property

```csharp
public string CultureName { get; }
```

Gets the name of the culture associated with the current `TextInfo` object.

Returns: The name of a culture.

#### Remarks
A `TextInfo` object is created from a specific culture, and the `CultureName` property returns the name of that culture.

The `CultureName` property always reflects a specific culture rather than a neutral culture. If `CultureInfo.Name` has a neutral culture as its value, then the corresponding `TextInfo.CultureName` has as its value an arbitrary specific culture that uses the same language. For example, the `Name` property returns "en" for the English neutral culture, but the corresponding `CultureName` property might return "en-US" for the English (United States) culture. If the `TextInfo` object is associated with a specific culture instead of a neutral culture, the value of its `CultureName` property is always identical to the `Name` property value of its associated `CultureInfo` object.

Similarly, the `CultureName` property never reflects a particular sort. It always corresponds to a default sort order. For example, the default sort order for Spanish (Spain) is the international sort order. If `CultureInfo.Name` is es-ES_tradnl (Spanish with the traditional sort order) then the corresponding `TextInfo.CultureName` is es-ES (Spanish with the default international sort order).

## TextInfo.EBCDICCodePage property

```csharp
public int EBCDICCodePage { get; }
```

Gets the Extended Binary Coded Decimal Interchange Code (EBCDIC) code page used by the writing system represented by the current `TextInfo`.

Returns: The EBCDIC code page used by the writing system represented by the current `TextInfo`.

To be added.

## TextInfo.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the current `TextInfo` object is read-only.

Returns: `true` if the current `TextInfo` object is read-only; otherwise, `false`.

#### Remarks
If the `IsReadOnly` property is `true`, the application cannot change any of the properties of the current `TextInfo` object.

## TextInfo.IsRightToLeft property

```csharp
public bool IsRightToLeft { get; }
```

Gets a value indicating whether the current `TextInfo` object represents a writing system where text flows from right to left.

Returns: `true` if text flows from right to left; otherwise, `false`.

#### Remarks
The `IsRightToLeft` property indicates the dominant direction of written text and the relative position of user interface elements such as buttons and scroll bars.

## TextInfo.LCID property

```csharp
public int LCID { get; }
```

Gets the culture identifier for the culture associated with the current `TextInfo` object.

Returns: A number that identifies the culture from which the current `TextInfo` object was created.

#### Remarks

Certain predefined culture names and identifiers are used by this and other classes in the `Globalization` namespace. For detailed culture information for Windows systems, see the **Language tag** column in the list of language/region names supported by Windows. Culture names follow the standard defined by BCP 47.

The `LCID` property always reflects a specific culture identifier instead of a neutral culture identifier. If `CultureInfo.LCID` is set to a neutral culture identifier, the corresponding `TextInfo.LCID` has as its value an arbitrary specific culture identifier that uses the same language. For example, the `LCID` property returns 0x0009 for the English neutral culture, named "en". However, the corresponding `LCID` property might return 0x0409 for the English (United States) culture, named en-US.

Similarly, the `LCID` property always corresponds to a default sort order, and never reflects a specific sort order. For example, the default sort order for Spanish (Spain) is the international sort order. If `CultureInfo.LCID` is set to "0x040A" (Spanish with the traditional sort order), the corresponding `TextInfo.LCID` value is "0x0C0A" (Spanish with the default international sort order).

## TextInfo.ListSeparator property

```csharp
public string ListSeparator { get; set; }
```

Gets or sets the string that separates items in a list.

Returns: The string that separates items in a list.

Exceptions:

- `ArgumentNullException`: The value in a set operation is null.
- `InvalidOperationException`: In a set operation, the current `TextInfo` object is read-only.

To be added.

## TextInfo.MacCodePage property

```csharp
public int MacCodePage { get; }
```

Gets the Macintosh code page used by the writing system represented by the current `TextInfo`.

Returns: The Macintosh code page used by the writing system represented by the current `TextInfo`.

To be added.

## TextInfo.OEMCodePage property

```csharp
public int OEMCodePage { get; }
```

Gets the original equipment manufacturer (OEM) code page used by the writing system represented by the current `TextInfo`.

Returns: The OEM code page used by the writing system represented by the current `TextInfo`.

To be added.

## TextInfo.Clone() method

```csharp
public object Clone ();
```

Creates a new object that is a copy of the current `TextInfo` object.

Returns: A new instance of `Object` that is the memberwise clone of the current `TextInfo` object.

#### Remarks
The new memberwise clone is not read-only.

#### Examples
The following code example demonstrates the `TextInfo.Clone` and `TextInfo.ReadOnly` methods.

_Code sample not included: ~/snippets/csharp/System.Globalization/TextInfo/Clone/ro.cs._

## TextInfo.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified object represents the same writing system as the current `TextInfo` object.

Parameters:

- `obj`: The object to compare with the current `TextInfo`.

Returns: `true` if `obj` represents the same writing system as the current `TextInfo`; otherwise, `false`.

#### Remarks
This method overrides `Object.Equals`.

## TextInfo.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for the current `TextInfo`, suitable for hashing algorithms and data structures, such as a hash table.

Returns: A hash code for the current `TextInfo`.

#### Remarks
This method overrides `Object.GetHashCode`.

This method generates the same hash code for two objects that are equal according to the `TextInfo.Equals` method.

## TextInfo.ReadOnly(TextInfo) method

```csharp
public static System.Globalization.TextInfo ReadOnly (System.Globalization.TextInfo textInfo);
```

Returns a read-only version of the specified `TextInfo` object.

Parameters:

- `textInfo`: A `TextInfo` object.

Returns: The `TextInfo` object specified by the `textInfo` parameter, if `textInfo` is read-only.

-or-

A read-only memberwise clone of the `TextInfo` object specified by `textInfo`, if `textInfo` is not read-only.

Exceptions:

- `ArgumentNullException`: `textInfo` is null.

#### Examples
The following code example demonstrates the `TextInfo.Clone` and `TextInfo.ReadOnly` methods.

_Code sample not included: ~/snippets/csharp/System.Globalization/TextInfo/Clone/ro.cs._

## TextInfo.System.Runtime.Serialization.IDeserializationCallback.OnDeserialization(Object) method

```csharp
void IDeserializationCallback.OnDeserialization (object sender);
```

Raises the deserialization event when deserialization is complete.

Parameters:

- `sender`: The source of the deserialization event.

To be added.

## TextInfo.ToLower(Char) method

```csharp
public char ToLower (char c);
```

Converts the specified character to lowercase.

Parameters:

- `c`: The character to convert to lowercase.

Returns: The specified character converted to lowercase.

#### Remarks
Casing semantics depend on the culture in use. For the invariant culture, the casing semantics are not culture-sensitive. For a specific culture, the casing semantics are sensitive to that culture.

If a security decision depends on a string comparison or a case-change operation, the application should use the `CultureInfo.InvariantCulture` to ensure that the behavior is consistent regardless of the culture settings of the system. However, the invariant culture must be used only by processes that require culture-independent results, such as system services. Otherwise, it produces results that might be linguistically incorrect or culturally inappropriate.

For more information on cultures, see `CultureInfo`.

## TextInfo.ToLower(String) method

```csharp
public string ToLower (string str);
```

Converts the specified string to lowercase.

Parameters:

- `str`: The string to convert to lowercase.

Returns: The specified string converted to lowercase.

Exceptions:

- `ArgumentNullException`: `str` is null.

#### Remarks
The returned string might differ in length from the input string. For more information on casing, refer to the Unicode Technical Report #21 "Case Mappings," published by the Unicode Consortium. The current implementation preserves the length of the string. However, this behavior is not guaranteed and could change in future implementations.

Casing semantics depend on the culture in use. For the invariant culture, the casing semantics are not culture-sensitive. For a specific culture, the casing semantics are sensitive to that culture.

If a security decision depends on a string comparison or a case-change operation, the application should use the `CultureInfo.InvariantCulture` to ensure that the behavior is consistent regardless of the culture settings of the system. However, the invariant culture must be used only by processes that require culture-independent results, such as system services. Otherwise, it produces results that might be linguistically incorrect or culturally inappropriate.

For more information on cultures, see `CultureInfo`.

## TextInfo.ToLower(Rune) method

```csharp
public System.Text.Rune ToLower (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.

## TextInfo.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `TextInfo`.

Returns: A string that represents the current `TextInfo`.

#### Remarks
This method overrides `Object.ToString`.

## TextInfo.ToTitleCase(String) method

```csharp
public string ToTitleCase (string str);
```

Converts the specified string to title case (except for words that are entirely in uppercase, which are considered to be acronyms).

Parameters:

- `str`: The string to convert to title case.

Returns: The specified string converted to title case.

Exceptions:

- `ArgumentNullException`: `str` is `null`.

#### Remarks
Generally, title casing converts the first character of a word to uppercase and the rest of the characters to lowercase. However, this method does not currently provide proper casing to convert a word that is entirely uppercase, such as an acronym. The following table shows the way the method renders several strings.

|Input|Language|Expected result|Actual result|
|-----------|--------------|---------------------|-------------------|
|war and peace|English|War and Peace|War And Peace|
|Per anhalter durch die Galaxis|German|Per Anhalter durch die Galaxis|Per Anhalter Durch Die Galaxis|
|les naufragés d'ythaq|French|Les Naufragés d'Ythaq|Les Naufragés D'ythaq|

As illustrated above, the `TextInfo.ToTitleCase` method provides an arbitrary casing behavior which is not necessarily linguistically correct. A linguistically correct solution would require additional rules, and the current algorithm is somewhat simpler and faster. We reserve the right to make this API slower in the future.

The current implementation of the `TextInfo.ToTitleCase` method yields an output string that is the same length as the input string. However, this behavior is not guaranteed and could change in a future implementation.

#### Examples
The following example changes the casing of a string based on the English (United States) culture, with the culture name en-US.

_Code sample not included: ~/snippets/csharp/System.Globalization/TextInfo/ToTitleCase/textinfo_casing.cs._

The following example passes each string in an array to the `TextInfo.ToTitleCase` method. The strings include proper title strings as well as acronyms. The strings are converted to title case by using the conventions of the en-US culture.

_Code sample not included: ~/snippets/csharp/System.Globalization/TextInfo/ToTitleCase/totitlecase2.cs._
