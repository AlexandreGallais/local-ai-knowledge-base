---
title: "CodePagesEncodingProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/CodePagesEncodingProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CodePagesEncodingProvider class

Namespace: `System.Text`

```csharp
public sealed class CodePagesEncodingProvider : System.Text.EncodingProvider
```

Provides access to an encoding provider for code pages that otherwise are available only in .NET Framework.

#### Remarks

Modern .NET supports only the following encodings:

- ASCII (code page 20127), which is returned by the `ASCII` property.
- ISO-8859-1 (code page 28591).
- UTF-7 (code page 65000), which is returned by the `UTF7` property.
- UTF-8 (code page 65001), which is returned by the `UTF8` property.
- UTF-16 and UTF-16LE (code page 1200), which is returned by the `Unicode` property.
- UTF-16BE (code page 1201), which is instantiated by calling the `%23ctor` or `%23ctor` constructor with a `bigEndian` value of `true`.
- UTF-32 and UTF-32LE (code page 12000), which is returned by the `UTF32` property.
- UTF-32BE (code page 12001), which is instantiated by calling an `UTF32Encoding` constructor that has a `bigEndian` parameter and providing a value of `true` in the method call.

Other than code page 20127, code-page encodings are not supported. The `CodePagesEncodingProvider` class extends `EncodingProvider` to make these code pages available. To use these additional code pages, follow these steps:

1. Retrieve a `CodePagesEncodingProvider` object from the static `Instance` property.
1. Pass the `CodePagesEncodingProvider` object to the `Encoding.RegisterProvider` method.

After an `EncodingProvider` object is registered, the encodings that it supports are available by calling the overloads of `Encoding.GetEncoding`; you should not call the `EncodingProvider.GetEncoding` overloads.

#### Impact on default encoding behavior

Registering `CodePagesEncodingProvider` also affects the behavior of `GetEncoding` when called with a `codepage` argument of `0`:

- On Windows, `GetEncoding(0)` returns the encoding that matches the system's active code page.
- On non-Windows platforms, `GetEncoding(0)` returns UTF-8, maintaining cross-platform consistency.

When no encoding provider is registered, `GetEncoding(0)` returns UTF-8 on all platforms.

## CodePagesEncodingProvider.Instance property

```csharp
public static System.Text.EncodingProvider Instance { get; }
```

Gets an encoding provider for code pages supported in .NET Framework but not in modern .NET.

Returns: An encoding provider that allows access to encodings not supported on the current .NET Framework platform.

#### Remarks

.NET supports only the following encodings by default:

- ASCII (code page 20127), which is returned by the `ASCII` property.
- ISO-8859-1 (code page 28591).
- UTF-7 (code page 65000), which is returned by the `UTF7` property.
- UTF-8 (code page 65001), which is returned by the `UTF8` property.
- UTF-16 and UTF-16LE (code page 1200), which is returned by the `Unicode` property.
- UTF-16BE (code page 1201), which is instantiated by calling the `UnicodeEncoding.%23ctor` or `UnicodeEncoding.%23ctor` constructor with a `bigEndian` value of `true`.
- UTF-32 and UTF-32LE (code page 12000), which is returned by the `UTF32` property.
- UTF-32BE (code page 12001), which is instantiated by calling an `UTF32Encoding` constructor that has a `bigEndian` parameter and providing a value of `true` in the method call.

To retrieve an encoding that is present in .NET Framework but not in modern .NET, you do the following:

1. Get the `EncodingProvider` object from the static `Instance` property.
1. Pass the `EncodingProvider` object to the `Encoding.RegisterProvider` method to make the encodings supplied by the `EncodingProvider` object available to the common language runtime.
1. Call an `Encoding.GetEncoding` overload to retrieve the encoding. The `Encoding.GetEncoding` method will call the corresponding `EncodingProvider.GetEncoding` method to determine whether it can supply the requested encoding.

## CodePagesEncodingProvider.GetEncoding(Int32) method

```csharp
public override System.Text.Encoding? GetEncoding (int codepage);
```

Returns the encoding associated with the specified code page identifier.

Parameters:

- `codepage`: The code page identifier of the preferred encoding that the encoding provider might support.

Returns: The encoding associated with the specified code page identifier, or `null` if the provider does not support the requested codepage encoding.

#### Remarks

This method provides access to code page encodings that are available in .NET Framework but not natively supported in modern .NET.

When `codepage` is `0`, this method has special behavior that affects the default encoding returned by `GetEncoding`:

- **On Windows**: Returns the encoding that matches the system's active code page.
- **On non-Windows platforms**: Returns `null`, allowing `GetEncoding` to fall back to its default UTF-8 behavior.

For all other supported code page identifiers, this method returns the corresponding encoding if it's available from the code pages encoding provider, or `null` if the code page is not supported.

## CodePagesEncodingProvider.GetEncoding(String) method

```csharp
public override System.Text.Encoding? GetEncoding (string name);
```

Returns the encoding associated with the specified code page name.

Parameters:

- `name`: The code page name of the preferred encoding that the encoding provider might support.

Returns: The encoding associated with the specified code page, or `null` if the provider does not support the requested encoding.

To be added.

## CodePagesEncodingProvider.GetEncodings() method

```csharp
public override System.Collections.Generic.IEnumerable<System.Text.EncodingInfo> GetEncodings ();
```

Returns an array that contains all the encodings that are supported by the `CodePagesEncodingProvider`.

Returns: An array that contains all the supported encodings.

To be added.
