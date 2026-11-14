---
title: "EncoderFallbackException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/EncoderFallbackException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EncoderFallbackException class

Namespace: `System.Text`

```csharp
public sealed class EncoderFallbackException : ArgumentException
```

The exception that is thrown when an encoder fallback operation fails. This class cannot be inherited.

#### Examples
The following code example demonstrates the `EncoderExceptionFallback` and `EncoderFallbackException` classes.

_Code sample not included: ~/snippets/csharp/System.Text/EncoderExceptionFallback/Overview/fallEncExc.cs._

## EncoderFallbackException.EncoderFallbackException() constructor

```csharp
public EncoderFallbackException ();
```

Initializes a new instance of the `EncoderFallbackException` class.

#### Remarks
The `HResult` property for this exception is set to COR_E_ARGUMENT (0x80070057).

## EncoderFallbackException.EncoderFallbackException(String) constructor

```csharp
public EncoderFallbackException (string? message);
```

Initializes a new instance of the `EncoderFallbackException` class. A parameter specifies the error message.

Parameters:

- `message`: An error message.

#### Remarks
The `HResult` property for this exception is set to COR_E_ARGUMENT (0x80070057).

## EncoderFallbackException.EncoderFallbackException(String, Exception) constructor

```csharp
public EncoderFallbackException (string? message, Exception? innerException);
```

Initializes a new instance of the `EncoderFallbackException` class. Parameters specify the error message and the inner exception that is the cause of this exception.

Parameters:

- `message`: An error message.
- `innerException`: The exception that caused this exception.

#### Remarks
The `HResult` property for this exception is set to COR_E_ARGUMENT (0x80070057).

## EncoderFallbackException.CharUnknown property

```csharp
public char CharUnknown { get; }
```

Gets the input character that caused the exception.

Returns: The character that cannot be encoded.

To be added.

## EncoderFallbackException.CharUnknownHigh property

```csharp
public char CharUnknownHigh { get; }
```

Gets the high component character of the surrogate pair that caused the exception.

Returns: The high component character of the surrogate pair that cannot be encoded.

To be added.

## EncoderFallbackException.CharUnknownLow property

```csharp
public char CharUnknownLow { get; }
```

Gets the low component character of the surrogate pair that caused the exception.

Returns: The low component character of the surrogate pair that cannot be encoded.

To be added.

## EncoderFallbackException.Index property

```csharp
public int Index { get; }
```

Gets the index position in the input buffer of the character that caused the exception.

Returns: The index position in the input buffer of the character that cannot be encoded.

#### Remarks
The index is zero-based.

## EncoderFallbackException.IsUnknownSurrogate() method

```csharp
public bool IsUnknownSurrogate ();
```

Indicates whether the input that caused the exception is a surrogate pair.

Returns: `true` if the input was a surrogate pair; otherwise, `false`.

To be added.
