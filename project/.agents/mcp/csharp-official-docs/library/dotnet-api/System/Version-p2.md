---
title: "Version class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Version.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Version class (part 2 of 3)

## Version.CompareTo(Object) method

```csharp
public int CompareTo (object? version);
```

Compares the current `Version` object to a specified object and returns an indication of their relative values.

Parameters:

- `version`: An object to compare, or `null`.

Returns: A signed integer that indicates the relative values of the two objects, as shown in the following table.

-  Less than zero

:  The current `Version` object is a version before `version`.

-  Zero

:  The current `Version` object is the same version as `version`.

-  Greater than zero

:  The current `Version` object is a version subsequent to `version`, or `version` is `null`.

Exceptions:

- `ArgumentException`: `version` is not of type `Version`.

#### Remarks
The components of `Version` in decreasing order of importance are: major, minor, build, and revision. An unknown component is assumed to be older than any known component.

For example:

- Version 1.1 is older than version 1.1.0

- Version 1.1 is older than version 1.1.1

- Version 1.1 is older than version 1.1.2.3

- Version 1.1.2 is older than version 1.1.2.4

- Version 1.2.5 is newer than version 1.2.3.4

## Version.CompareTo(Version) method

```csharp
public int CompareTo (Version? value);
```

Compares the current `Version` object to a specified `Version` object and returns an indication of their relative values.

Parameters:

- `value`: A `Version` object to compare to the current `Version` object, or `null`.

Returns: A signed integer that indicates the relative values of the two objects, as shown in the following table.

-  Less than zero

:  The current `Version` object is a version before `value`.

-  Zero

:  The current `Version` object is the same version as `value`.

-  Greater than zero

:  The current `Version` object is a version subsequent to `value`, or `value` is `null`.

#### Remarks
This method implements the `IComparable<T>` interface, and performs slightly better than the `Version.CompareTo` method because it does not have to unbox the `value` parameter.

The components of `Version` in decreasing order of importance are: major, minor, build, and revision. An unknown component is assumed to be older than any known component. For example:

- Version 1.1 is older than version 1.1.0.

- Version 1.1 is older than version 1.1.1.

- Version 1.1 is older than version 1.1.2.3.

- Version 1.1.2 is older than version 1.1.2.4.

- Version 1.2.5 is newer than version 1.2.3.4.

#### Examples
The following code example demonstrates generic and nongeneric versions of the `CompareTo` method for several value and reference types.

_Code sample not included: ~/snippets/csharp/System/Boolean/CompareTo/cat.cs._

## Version.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value indicating whether the current `Version` object is equal to a specified object.

Parameters:

- `obj`: An object to compare with the current `Version` object, or `null`.

Returns: `true` if the current `Version` object and `obj` are both `Version` objects, and every component of the current `Version` object matches the corresponding component of `obj`; otherwise, `false`.

To be added.

## Version.Equals(Version) method

```csharp
public bool Equals (Version? obj);
```

Returns a value indicating whether the current `Version` object and a specified `Version` object represent the same value.

Parameters:

- `obj`: A `Version` object to compare to the current `Version` object, or `null`.

Returns: `true` if every component of the current `Version` object matches the corresponding component of the `obj` parameter; otherwise, `false`.

#### Remarks
This method implements the `IEquatable<T>` interface, and performs slightly better than the `Version.Equals` method because it does not have to unbox the `obj` parameter.

## Version.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns a hash code for the current `Version` object.

Returns: A 32-bit signed integer hash code.

#### Examples
The following code example demonstrates the `Version.%23ctor` constructor, and `Version.Major`, `Version.Minor`, `Version.Build`, `Version.Revision`, `Version.MajorRevision`, and `Version.MinorRevision` properties.

_Code sample not included: ~/snippets/csharp/System/Version/.ctor/rev.cs._

## Version.op_Equality(Version, Version) method

```csharp
public static bool operator == (Version? v1, Version? v2);
```

Determines whether two specified `Version` objects are equal.

Parameters:

- `v1`: The first `Version` object.
- `v2`: The second `Version` object.

Returns: `true` if `v1` equals `v2`; otherwise, `false`.

The equivalent method for this operator is `Equals`

## Version.op_GreaterThan(Version, Version) method

```csharp
public static bool operator > (Version? v1, Version? v2);
```

Determines whether the first specified `Version` object is greater than the second specified `Version` object.

Parameters:

- `v1`: The first `Version` object.
- `v2`: The second `Version` object.

Returns: `true` if `v1` is greater than `v2`; otherwise, `false`.

The equivalent method for this operator is `CompareTo`

## Version.op_GreaterThanOrEqual(Version, Version) method

```csharp
public static bool operator >= (Version? v1, Version? v2);
```

Determines whether the first specified `Version` object is greater than or equal to the second specified `Version` object.

Parameters:

- `v1`: The first `Version` object.
- `v2`: The second `Version` object.

Returns: `true` if `v1` is greater than or equal to `v2`; otherwise, `false`.

The equivalent method for this operator is `CompareTo`

## Version.op_Inequality(Version, Version) method

```csharp
public static bool operator != (Version? v1, Version? v2);
```

Determines whether two specified `Version` objects are not equal.

Parameters:

- `v1`: The first `Version` object.
- `v2`: The second `Version` object.

Returns: `true` if `v1` does not equal `v2`; otherwise, `false`.

The equivalent method for this operator is `Equals`

## Version.op_LessThan(Version, Version) method

```csharp
public static bool operator < (Version? v1, Version? v2);
```

Determines whether the first specified `Version` object is less than the second specified `Version` object.

Parameters:

- `v1`: The first `Version` object.
- `v2`: The second `Version` object.

Returns: `true` if `v1` is less than `v2`; otherwise, `false`.

The equivalent method for this operator is `CompareTo`

## Version.op_LessThanOrEqual(Version, Version) method

```csharp
public static bool operator <= (Version? v1, Version? v2);
```

Determines whether the first specified `Version` object is less than or equal to the second `Version` object.

Parameters:

- `v1`: The first `Version` object.
- `v2`: The second `Version` object.

Returns: `true` if `v1` is less than or equal to `v2`; otherwise, `false`.

The equivalent method for this operator is `CompareTo`

## Version.Parse(Byte>) method

```csharp
public static Version Parse (ReadOnlySpan<byte> utf8Text);
```

Converts the specified read-only span of UTF-8 characters that represents a version number to an equivalent Version object.

Parameters:

- `utf8Text`: A read-only span of UTF-8 characters that contains a version number to convert.

Returns: An object that is equivalent to the version number specified in the `utf8Text` parameter.

Exceptions:

- `ArgumentException`: `utf8Text` has fewer than two or more than four version components.
- `ArgumentOutOfRangeException`: At least one component in `utf8Text` is less than zero.
- `FormatException`: At least one component in `utf8Text` is not an integer.
- `OverflowException`: At least one component in `utf8Text` represents a number that is greater than `Int32.MaxValue`.

To be added.

## Version.Parse(Char>) method

```csharp
public static Version Parse (ReadOnlySpan<char> input);
```

Converts the specified read-only span of characters that represents a version number to an equivalent `Version` object.

Parameters:

- `input`: A read-only span of characters that contains a version number to convert.

Returns: An object that is equivalent to the version number specified in the `input` parameter.

Exceptions:

- `ArgumentException`: `input` has fewer than two or more than four version components.
- `ArgumentOutOfRangeException`: At least one component in `input` is less than zero.
- `FormatException`: At least one component in `input` is not an integer.
- `OverflowException`: At least one component in `input` represents a number that is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks

The `input` parameter must have the following format:

`major.minor[.build[.revision]]`

where `major`, `minor`, `build`, and `revision` are the string representations of the version number's four components: major version number, minor version number, build number, and revision number, respectively. Optional components are shown in square brackets ([ and ]). The components must appear in the specified order and must be separated by periods.

## Version.Parse(String) method

```csharp
public static Version Parse (string input);
```

Converts the string representation of a version number to an equivalent `Version` object.

Parameters:

- `input`: A string that contains a version number to convert.

Returns: An object that is equivalent to the version number specified in the `input` parameter.

Exceptions:

- `ArgumentNullException`: `input` is `null`.
- `ArgumentException`: `input` has fewer than two or more than four version components.
- `ArgumentOutOfRangeException`: At least one component in `input` is less than zero.
- `FormatException`: At least one component in `input` is not an integer.
- `OverflowException`: At least one component in `input` represents a number that is greater than <see cref="F:System.Int32.MaxValue">Int32.MaxValue</see>.

#### Remarks
The `input` parameter must have the following format:

`major.minor[.build[.revision]]`

where `major`, `minor`, `build`, and `revision` are the string representations of the version number's four components: major version number, minor version number, build number, and revision number, respectively. Optional components are shown in square brackets ([ and ]). The components must appear in the specified order and must be separated by periods.

> **Important:**
>  Because the string representation of a version number must conform to a recognized pattern, applications should always use exception handling when calling the `Version.Parse` method to parse user input. Alternatively, you can call the `Version.TryParse` method to parse the string representation of a version number and return a value that indicates whether the parse operation succeeded.

The `Version.Parse` method is a convenience method; it is equivalent to calling the `%23ctor` constructor.

#### Examples
The following example uses the `Version.Parse` method to parse a number of strings that contain version information.

_Code sample not included: ~/snippets/csharp/System/Version/Parse/parse1.cs._

## Version.System.IFormattable.ToString(String, IFormatProvider) method

```csharp
string IFormattable.ToString (string format, IFormatProvider formatProvider);
```

Formats the value of the current instance using the specified format.

Parameters:

- `format`: The format to use.
-or-
A `null` reference (`Nothing` in Visual Basic) to use the default format defined for the type of the `IFormattable` implementation.
- `formatProvider`: The provider to use to format the value.
-or-
A `null` reference (`Nothing` in Visual Basic) to obtain the numeric format information from the current locale setting of the operating system.

Returns: The value of the current instance in the specified format.

To be added.

## Version.System.ISpanFormattable.TryFormat(Char>, Int32, Char>, IFormatProvider) method

```csharp
bool ISpanFormattable.TryFormat (Span<char> destination, out int charsWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance into the provided span of characters.

Parameters:

- `destination`: The span in which to write this instance's value formatted as a span of characters.
- `charsWritten`: When this method returns, contains the number of characters that were written in `destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Version.System.IUtf8SpanFormattable.TryFormat(Byte>, Int32, Char>, IFormatProvider) method

```csharp
bool IUtf8SpanFormattable.TryFormat (Span<byte> utf8Destination, out int bytesWritten, ReadOnlySpan<char> format, IFormatProvider provider);
```

Tries to format the value of the current instance as UTF-8 into the provided span of bytes.

Parameters:

- `utf8Destination`: The span in which to write this instance's value formatted as a span of bytes.
- `bytesWritten`: When this method returns, contains the number of bytes that were written in `utf8Destination`.
- `format`: A span containing the characters that represent a standard or custom format string that defines the acceptable format for `utf8Destination`.
- `provider`: An optional object that supplies culture-specific formatting information for `utf8Destination`.

Returns: `true` if the formatting was successful; otherwise, `false`.

To be added.

## Version.System.IUtf8SpanParsable<System.Version>.Parse(Byte>, IFormatProvider) method

```csharp
static Version IUtf8SpanParsable<Version>.Parse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.

Returns: To be added.

To be added.

## Version.System.IUtf8SpanParsable<System.Version>.TryParse(Byte>, IFormatProvider, Version) method

```csharp
static bool IUtf8SpanParsable<Version>.TryParse (ReadOnlySpan<byte> utf8Text, IFormatProvider provider, out Version result);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `provider`: To be added.
- `result`: To be added.

Returns: To be added.

To be added.
