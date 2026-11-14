---
title: "DecoderFallbackException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/DecoderFallbackException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DecoderFallbackException class

Namespace: `System.Text`

```csharp
public sealed class DecoderFallbackException : ArgumentException
```

The exception that is thrown when a decoder fallback operation fails. This class cannot be inherited.

#### Examples
The following code example demonstrates the `DecoderExceptionFallback` and `DecoderFallbackException` classes.

_Code sample not included: ~/snippets/csharp/System.Text/DecoderExceptionFallback/Overview/fallDecExc.cs._

## DecoderFallbackException.DecoderFallbackException() constructor

```csharp
public DecoderFallbackException ();
```

Initializes a new instance of the `DecoderFallbackException` class.

#### Remarks
The `HResult` property for this exception is set to COR_E_ARGUMENT (0x80070057).

## DecoderFallbackException.DecoderFallbackException(String) constructor

```csharp
public DecoderFallbackException (string? message);
```

Initializes a new instance of the `DecoderFallbackException` class. A parameter specifies the error message.

Parameters:

- `message`: An error message.

#### Remarks
The `HResult` property for this exception is set to COR_E_ARGUMENT (0x80070057).

## DecoderFallbackException.DecoderFallbackException(String, Exception) constructor

```csharp
public DecoderFallbackException (string? message, Exception? innerException);
```

Initializes a new instance of the `DecoderFallbackException` class. Parameters specify the error message and the inner exception that is the cause of this exception.

Parameters:

- `message`: An error message.
- `innerException`: The exception that caused this exception.

#### Remarks
The `HResult` property for this exception is set to COR_E_ARGUMENT (0x80070057).

## DecoderFallbackException.DecoderFallbackException(String, Byte[], Int32) constructor

```csharp
public DecoderFallbackException (string? message, byte[]? bytesUnknown, int index);
```

Initializes a new instance of the `DecoderFallbackException` class. Parameters specify the error message, the array of bytes being decoded, and the index of the byte that cannot be decoded.

Parameters:

- `message`: An error message.
- `bytesUnknown`: The input byte array.
- `index`: The index position in `bytesUnknown` of the byte that cannot be decoded.

#### Remarks
The `HResult` property for this exception is set to COR_E_ARGUMENT (0x80070057).

## DecoderFallbackException.BytesUnknown property

```csharp
public byte[]? BytesUnknown { get; }
```

Gets the input byte sequence that caused the exception.

Returns: The input byte array that cannot be decoded.

#### Remarks
The application uses the `Index` property to get the position in the input byte array of the byte that cannot be decoded.

## DecoderFallbackException.Index property

```csharp
public int Index { get; }
```

Gets the index position in the input byte sequence of the byte that caused the exception.

Returns: The index position in the input byte array of the byte that cannot be decoded. The index position is zero-based.

#### Remarks
The application uses the `BytesUnknown` property to retrieve the input byte array that contains the byte that cannot be decoded.
