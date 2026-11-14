---
title: "StringBuilder class (part 11 of 11)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/StringBuilder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringBuilder class (part 11 of 11)

## StringBuilder.Replace(String, String, Int32, Int32) method

```csharp
public System.Text.StringBuilder Replace (string oldValue, string? newValue, int startIndex, int count);
```

Replaces, within a substring of this instance, all occurrences of a specified string with another specified string.

Parameters:

- `oldValue`: The string to replace.
- `newValue`: The string that replaces `oldValue`, or `null`.
- `startIndex`: The position in this instance where the substring begins.
- `count`: The length of the substring.

Returns: A reference to this instance with all instances of `oldValue` replaced by `newValue` in the range from `startIndex` to `startIndex` + `count` - 1.

Exceptions:

- `ArgumentNullException`: `oldValue` is `null`.
- `ArgumentException`: The length of `oldValue` is zero.
- `ArgumentOutOfRangeException`: `startIndex` or `count` is less than zero.

-or-

`startIndex` plus `count` indicates a character position not within this instance.

-or-

Enlarging the value of this instance would exceed `StringBuilder.MaxCapacity`.

#### Remarks
This method performs an ordinal, case-sensitive comparison to identify occurrences of `oldValue` in the specified substring. If `newValue` is `null` or `Empty`, all occurrences of `oldValue` are removed.

## StringBuilder.Replace(Rune, Rune, Int32, Int32) method

```csharp
public System.Text.StringBuilder Replace (System.Text.Rune oldRune, System.Text.Rune newRune, int startIndex, int count);
```

To be added.

Parameters:

- `oldRune`: To be added.
- `newRune`: To be added.
- `startIndex`: To be added.
- `count`: To be added.

Returns: To be added.

To be added.

## StringBuilder.System.Runtime.Serialization.ISerializable.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
void ISerializable.GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Populates a `SerializationInfo` object with the data necessary to deserialize the current `StringBuilder` object.

Parameters:

- `info`: The object to populate with serialization information.
- `context`: The place to store and retrieve serialized data. Reserved for future use.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

#### Remarks
The `context` parameter is reserved for future use and does not participate in this operation.

For more information, see the `AddValue` method.

## StringBuilder.ToString() method

```csharp
public override string ToString ();
```

Converts the value of this instance to a `String`.

Returns: A string whose value is the same as this instance.

#### Remarks
You must call the `StringBuilder.ToString` method to convert the `StringBuilder` object to a `String` object before you can pass the string represented by the `StringBuilder` object to a method that has a `String` parameter or display it in the user interface.

#### Examples
The following example demonstrates calling the `StringBuilder.ToString` method. This example is part of a larger example provided for the `StringBuilder` class.

_Code sample not included: ~/snippets/csharp/System.Text/StringBuilder/Overview/StringBuilder.cs._

## StringBuilder.ToString(Int32, Int32) method

```csharp
public string ToString (int startIndex, int length);
```

Converts the value of a substring of this instance to a `String`.

Parameters:

- `startIndex`: The starting position of the substring in this instance.
- `length`: The length of the substring.

Returns: A string whose value is the same as the specified substring of this instance.

Exceptions:

- `ArgumentOutOfRangeException`: `startIndex` or `length` is less than zero.

-or-

The sum of `startIndex` and `length` is greater than the length of the current instance.

#### Remarks
You must call the `StringBuilder.ToString` method to convert the `StringBuilder` object to a `String` object before you can pass the string represented by the `StringBuilder` object to a method that has a `String` parameter or display it in the user interface.

## StringBuilder.TryGetRuneAt(Int32, Rune) method

```csharp
public bool TryGetRuneAt (int index, out System.Text.Rune value);
```

To be added.

Parameters:

- `index`: To be added.
- `value`: To be added.

Returns: To be added.

To be added.
