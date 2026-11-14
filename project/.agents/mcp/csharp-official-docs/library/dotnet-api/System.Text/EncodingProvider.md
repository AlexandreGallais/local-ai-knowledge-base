---
title: "EncodingProvider class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncodingProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncodingProvider class

Namespace: `System.Text`

```csharp
public abstract class EncodingProvider
```

Provides the base class for an encoding provider, which supplies encodings that are unavailable on a particular platform.

#### Remarks
An encoding provider supplies encodings that are not otherwise available on a particular target platform.

Modern .NET supports only the following encodings:

- ASCII (code page 20127), which is returned by the `ASCII` property.
- ISO-8859-1 (code page 28591).
- UTF-7 (code page 65000), which is returned by the `UTF7` property.
- UTF-8 (code page 65001), which is returned by the `UTF8` property.
- UTF-16 and UTF-16LE (code page 1200), which is returned by the `Unicode` property.
- UTF-16BE (code page 1201), which is instantiated by calling the `%23ctor` or `%23ctor` constructor with a `bigEndian` value of `true`.
- UTF-32 and UTF-32LE (code page 12000), which is returned by the `UTF32` property.
- UTF-32BE (code page 12001), which is instantiated by calling an `UTF32Encoding` constructor that has a `bigEndian` parameter and providing a value of `true` in the method call.

`EncodingProvider` is the base class that makes otherwise unavailable encodings available. This involves the following steps:

1. Define a subclass of `EncodingProvider` that overrides the two abstract `EncodingProvider.GetEncoding` overloads, `GetEncoding` and `GetEncoding`. These overloads return the otherwise unsupported encoding by code page identifier and by name. Note that you can also choose to return a default encoding if the `GetEncoding` method is called with an argument of 0.

2. Optionally, you can override the virtual `GetEncoding` and `GetEncoding` methods. In most cases, this is not necessary, since the base class provides a default implementation.

3. Pass the `EncodingProvider` instance to the `Encoding.RegisterProvider` method to make the encodings supplied by the `EncodingProvider` object available to the common language runtime.

4. Call an `Encoding.GetEncoding` overload to retrieve the encoding. The `Encoding.GetEncoding` method will call the corresponding `EncodingProvider.GetEncoding` to determine whether it can supply the requested encoding.

.NET provides one static property, `CodePagesEncodingProvider.Instance`, that returns an `EncodingProvider` object that makes the full set of encodings available. In addition, you can derive from the `EncodingProvider` class to make your own encodings available.

## EncodingProvider.EncodingProvider() constructor

```csharp
public EncodingProvider ();
```

Initializes a new instance of the `EncodingProvider` class.

To be added.

## EncodingProvider.GetEncoding(Int32) method

```csharp
public abstract System.Text.Encoding? GetEncoding (int codepage);
```

Returns the encoding associated with the specified code page identifier.

Parameters:

- `codepage`: The code page identifier of the requested encoding.

Returns: The encoding that is associated with the specified code page, or `null` if this `EncodingProvider` cannot return a valid encoding that corresponds to `codepage`.

#### Notes to callers

This method is called by the Encoding.GetEncoding(Int32) method. You should not call it directly from user code.

## EncodingProvider.GetEncoding(String) method

```csharp
public abstract System.Text.Encoding? GetEncoding (string name);
```

Returns the encoding with the specified name.

Parameters:

- `name`: The name of the requested encoding.

Returns: The encoding that is associated with the specified name, or `null` if this `EncodingProvider` cannot return a valid encoding that corresponds to `name`.

#### Notes to inheritors

You override the GetEncoding(String) method to return the encoding or encodings supported by your `EncodingProvider` subclass. When user code attempts to retrieve an encoding by calling the GetEncoding(String) method, the method passes the `name` argument to every registered encoding provider until one returns a valid encoding. If none returns a valid encoding, the GetEncoding(String) method attempts to retrieve a cached encoding whose name is `name`. Because of this, if `name` is not the name of an encoding that you support, the method should return `null`. The only case in which the method should throw an exception is if `name` is `null`.

#### Notes to callers

This method is called by the Encoding.GetEncoding(String) method. You should not call it directly from user code.

## EncodingProvider.GetEncoding(Int32, EncoderFallback, DecoderFallback) method

```csharp
public virtual System.Text.Encoding? GetEncoding (int codepage, System.Text.EncoderFallback encoderFallback, System.Text.DecoderFallback decoderFallback);
```

Returns the encoding associated with the specified code page identifier. Parameters specify an error handler for characters that cannot be encoded and byte sequences that cannot be decoded.

Parameters:

- `codepage`: The code page identifier of the requested encoding.
- `encoderFallback`: An object that provides an error-handling procedure when a character cannot be encoded with this encoding.
- `decoderFallback`: An object that provides an error-handling procedure when a byte sequence cannot be decoded with this encoding.

Returns: The encoding that is associated with the specified code page, or `null` if this `EncodingProvider` cannot return a valid encoding that corresponds to `codepage`.

#### Remarks
The `encoderFallback` and `decoderFallback` parameters are objects that define the fallback strategy used in the event that an encoder cannot convert a character to a sequence of bytes or a decoder cannot convert a sequence of bytes to a character. .NET provides the following fallback mechanisms:

- Exception fallback. If the `encoderFallback` argument is an instance of `EncoderExceptionFallback`, or the `decoderExceptionFallback` argument is an instance of `DecoderExceptionFallback`, the encoding method throws an exception if characters cannot be encoded, and the decoding method throws an exception if a byte sequence cannot be decoded.

- Replacement fallback. If the `encoderFallback` argument is an instance of `EncoderReplacementFallback`, or the `decoderExceptionFallback` argument is an instance of `DecoderReplacementFallback`, the encoding and decoding methods substitute a replacement string for characters that cannot be encoded and byte sequences cannot be decoded. If you instantiated the replacement fallback object by calling the parameterless constructor, the replacement character is a "?". If you call the `%23ctor` or `%23ctor` constructor, you can specify the replacement string.

- Best-fit fallback. You can derive from the `EncoderFallback` or `DecoderFallback` class to implement a best-fit replacement mechanism.

## EncodingProvider.GetEncoding(String, EncoderFallback, DecoderFallback) method

```csharp
public virtual System.Text.Encoding? GetEncoding (string name, System.Text.EncoderFallback encoderFallback, System.Text.DecoderFallback decoderFallback);
```

Returns the encoding associated with the specified name. Parameters specify an error handler for characters that cannot be encoded and byte sequences that cannot be decoded.

Parameters:

- `name`: The name of the preferred encoding.
- `encoderFallback`: An object that provides an error-handling procedure when a character cannot be encoded with this encoding.
- `decoderFallback`: An object that provides an error-handling procedure when a byte sequence cannot be decoded with the current encoding.

Returns: The encoding that is associated with the specified name, or `null` if this `EncodingProvider` cannot return a valid encoding that corresponds to `name`.

#### Remarks
The `encoderFallback` and `decoderFallback` parameters are objects that define the fallback strategy used in the event that an encoder cannot convert a character to a sequence of bytes or a decoder cannot convert a sequence of bytes to a character. .NET provides the following fallback mechanisms:

- Exception fallback. If the `encoderFallback` argument is an instance of `EncoderExceptionFallback`, or the `decoderExceptionFallback` argument is an instance of `DecoderExceptionFallback`, the encoding method throws an exception if characters cannot be encoded, and the decoding method throws an exception if a byte sequence cannot be decoded.

- Replacement fallback. If the `encoderFallback` argument is an instance of `EncoderReplacementFallback`, or the `decoderExceptionFallback` argument is an instance of `DecoderReplacementFallback`, the encoding and decoding methods substitute a replacement string for characters that cannot be encoded and byte sequences cannot be decoded. If you instantiated the replacement fallback object by calling the parameterless constructor, the replacement character is a "?". If you call the `%23ctor` or `%23ctor` constructor, you can specify the replacement string.

- Best-fit fallback. You can derive from the `EncoderFallback` or `DecoderFallback` class to implement a best-fit replacement mechanism.

## EncodingProvider.GetEncodings() method

```csharp
public virtual System.Collections.Generic.IEnumerable<System.Text.EncodingInfo> GetEncodings ();
```

Returns an array that contains all the encodings that are supported by the `EncodingProvider`.

Returns: An array that contains all the supported encodings.

This method returns a list of encodings that are supported by the `EncodingProvider`, uniquely distinguished by code page.

> **Note:**
> The list of supported encodings returned by `Encoding.GetEncodings` includes encodings made available by any `EncodingProvider` implementations that were registered by calls to the `Encoding.RegisterProvider` method.
