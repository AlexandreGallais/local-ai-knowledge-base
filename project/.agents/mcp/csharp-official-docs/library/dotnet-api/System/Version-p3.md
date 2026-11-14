---
title: "Version class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Version.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Version class (part 3 of 3)

## Version.ToString() method

```csharp
public override string ToString ();
```

Converts the value of the current `Version` object to its equivalent `String` representation.

Returns: The `String` representation of the values of the major, minor, build, and revision components of the current `Version` object, as depicted in the following format. Each component is separated by a period character ('.'). Square brackets ('[' and ']') indicate a component that will not appear in the return value if the component is not defined:

major.minor[.build[.revision]]

For example, if you create a `Version` object using the constructor `Version(1,1)`, the returned string is "1.1". If you create a `Version` object using the constructor `Version(1,3,4,2)`, the returned string is "1.3.4.2".

To be added.

## Version.ToString(Int32) method

```csharp
public string ToString (int fieldCount);
```

Converts the value of the current `Version` object to its equivalent `String` representation. A specified count indicates the number of components to return.

Parameters:

- `fieldCount`: The number of components to return. The `fieldCount` ranges from 0 to 4.

Returns: The `String` representation of the values of the major, minor, build, and revision components of the current `Version` object, each separated by a period character ('.'). The `fieldCount` parameter determines how many components are returned.

-  0

:  An empty string ("").

-  1

:  major

-  2

:  major.minor

-  3

:  major.minor.build

-  4

:  major.minor.build.revision

For example, if you create `Version` object using the constructor `Version(1,3,5)`, `ToString(2)` returns "1.3" and `ToString(4)` throws an exception.

Exceptions:

- `ArgumentException`: `fieldCount` is less than 0, or more than 4.

-or-

`fieldCount` is more than the number of components defined in the current `Version` object.

To be added.

## Version.TryFormat(Byte>, Int32) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, out int bytesWritten);
```

Tries to format this version instance into a span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of UTF-8 bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Version.TryFormat(Char>, Int32) method

```csharp
public bool TryFormat (Span<char> destination, out int charsWritten);
```

Tries to format this version instance into a span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Version.TryFormat(Byte>, Int32, Int32) method

```csharp
public bool TryFormat (Span<byte> utf8Destination, int fieldCount, out int bytesWritten);
```

Tries to format this version instance into a span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of UTF-8 bytes.
- `fieldCount`: The number of components to return. This value ranges from 0 to 4.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Version.TryFormat(Char>, Int32, Int32) method

```csharp
public bool TryFormat (Span<char> destination, int fieldCount, out int charsWritten);
```

Tries to format this version instance into a span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `fieldCount`: The number of components to return. This value ranges from 0 to 4.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Version.TryParse(Byte>, Version) method

```csharp
public static bool TryParse (ReadOnlySpan<byte> utf8Text, out Version? result);
```

Tries to convert the UTF-8 representation of a version number to an equivalent Version object, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `utf8Text`: The span of UTF-8 characters to parse.
- `result`: When this method returns, contains the Version equivalent of the number that is contained in `utf8Text`, if the conversion succeeded.

If `utf8Text` is empty, or if the conversion fails, result is `null` when the method returns.

Returns: `true` if the `utf8Text` parameter was converted successfully; otherwise, `false`.

To be added.

## Version.TryParse(Char>, Version) method

```csharp
public static bool TryParse (ReadOnlySpan<char> input, out Version? result);
```

Tries to convert the specified read-only span of characters representing a version number to an equivalent `Version` object, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `input`: A read-only span of characters that contains a version number to convert.
- `result`: When this method returns, contains the `Version` equivalent of the number that is contained in `input`, if the conversion succeeded. If `input` is `null`, `String.Empty`, or if the conversion fails, `result` is `null` when the method returns.

Returns: `true` if the `input` parameter was converted successfully; otherwise, `false`.

#### Remarks

The `TryParse` method is similar to the `Version.Parse` method, except that it doesn't throw an exception if the conversion fails. Instead, it returns `false` if `input` is `null`, has fewer than two or more than four components, has at least one component that is not an integer, has at least one component that is less than zero, or has at least one component that is greater than `MaxValue`.

For the parse operation to succeed, the `input` parameter must be in the following format:

`major.minor[.build[.revision]]`

where `major`, `minor`, `build`, and `revision` are the string representations of the version number's four components: major version number, minor version number, build number, and revision number, respectively. Optional components are shown in square brackets ([ and ]). The components must appear in order and must be separated by periods.

## Version.TryParse(String, Version) method

```csharp
public static bool TryParse (string? input, out Version? result);
```

Tries to convert the string representation of a version number to an equivalent `Version` object, and returns a value that indicates whether the conversion succeeded.

Parameters:

- `input`: A string that contains a version number to convert.
- `result`: When this method returns, contains the `Version` equivalent of the number that is contained in `input`, if the conversion succeeded. If `input` is `null`, `String.Empty`, or if the conversion fails, `result` is `null` when the method returns.

Returns: `true` if the `input` parameter was converted successfully; otherwise, `false`.

#### Remarks
The `TryParse` method is similar to the `Version.Parse` method, except that it doesn't throw an exception if the conversion fails. Instead, it returns `false` if `input` is `null`, has fewer than two or more than four components, has at least one component that is not an integer, has at least one component that is less than zero, or has at least one component that is greater than `MaxValue`.

For the parse operation to succeed, the `input` parameter must be in the following format:

`major.minor[.build[.revision]]`

where `major`, `minor`, `build`, and `revision` are the string representations of the version number's four components: major version number, minor version number, build number, and revision number, respectively. Optional components are shown in square brackets ([ and ]). The components must appear in order and must be separated by periods.

#### Examples
The following example uses the `Version.TryParse` method to parse a number of strings that contain version information.

_Code sample not included: ~/snippets/csharp/System/Version/TryParse/tryparse1.cs._
