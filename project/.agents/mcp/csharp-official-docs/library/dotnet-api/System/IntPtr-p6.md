---
title: "IntPtr struct (part 6 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/IntPtr.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IntPtr struct (part 6 of 6)

## IntPtr.TryParse(String, NumberStyles, IFormatProvider, IntPtr) method

```csharp
public static bool TryParse (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out IntPtr result);
```

Converts the string representation of a number in a specified style and culture-specific format to its signed native integer equivalent. A return value indicates whether the conversion succeeded.

Parameters:

- `s`: A string containing a number to convert. The string is interpreted using the style specified by `style`.
- `style`: A bitwise combination of enumeration values that indicates the style elements that can be present in `s`.
- `provider`: An object that supplies culture-specific formatting information about `s`.
- `result`: When this method returns, contains the signed native integer value equivalent of the number contained in `s`, if the conversion succeeded, or zero if the conversion failed. The conversion fails if the `s` parameter is `null` or empty, is not of the correct format, or represents a number less than `IntPtr.MinValue` or greater than `IntPtr.MaxValue`. This parameter is passed uninitialized; any value originally supplied in result will be overwritten.

Returns: `true` if `s` was converted successfully; otherwise, `false`.

To be added.

## IntPtr.TryParsePartial(Byte>, NumberStyles, IFormatProvider, IntPtr, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<byte> utf8Text, System.Globalization.NumberStyles style, IFormatProvider? provider, out IntPtr result, out int bytesConsumed);
```

To be added.

Parameters:

- `utf8Text`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `bytesConsumed`: To be added.

Returns: To be added.

To be added.

## IntPtr.TryParsePartial(Char>, NumberStyles, IFormatProvider, IntPtr, Int32) method

```csharp
public static bool TryParsePartial (ReadOnlySpan<char> s, System.Globalization.NumberStyles style, IFormatProvider? provider, out IntPtr result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.

## IntPtr.TryParsePartial(String, NumberStyles, IFormatProvider, IntPtr, Int32) method

```csharp
public static bool TryParsePartial (string? s, System.Globalization.NumberStyles style, IFormatProvider? provider, out IntPtr result, out int charsConsumed);
```

To be added.

Parameters:

- `s`: To be added.
- `style`: To be added.
- `provider`: To be added.
- `result`: To be added.
- `charsConsumed`: To be added.

Returns: To be added.

To be added.

## IntPtr.Zero field

```csharp
public static readonly IntPtr Zero;
```

A read-only field that represents a signed integer that has been initialized to zero.

#### Remarks
The value of this field is not equivalent to `null`. Use this field to efficiently determine whether an instance of `IntPtr` has been set to a value other than zero.

For example, assume the variable, ip, is an instance of `IntPtr`. You can determine if it has been set by comparing it to the value returned by a constructor, for example: " `if ip != new IntPtr(0)...` ". However, invoking a constructor to get an uninitialized pointer is inefficient. It is better to code either " `if ip != IntPtr.Zero...` ", or " `if !IntPtr.Zero.Equals(ip)...` ".

When calling the Windows API from managed code, you can pass `Zero` instead of `null` if an argument is expected to be either a pointer or a `null`. For example, the following call to the Windows `CreateFile` function supplies `Zero` for the `pSecurityAttributes` and `hTemplateFile` argument values.

_Code sample not included: ~/snippets/csharp/System/IntPtr/Zero/zero4.cs._

> **Note:**
> Although `Zero` is equivalent to `null` for Windows API functions with parameters or return values that can be either pointers or `null`, `Zero` is not equivalent to `null`. Passing `null` to the `IntPtr.Zero.Equals` method always returns `false`.

You can also test for a `null` return value from Windows API function calls that return either a pointer or a `null` by comparing the returned value with `Zero`. For example, the call to the `GetWindow` function in the following example tries to retrieve the handle of a non-existent window. If it were called from unmanaged code, the function would return `null`, but when it is called from managed code, it returns `Zero`.

_Code sample not included: ~/snippets/csharp/System/IntPtr/Zero/zero2.cs._
