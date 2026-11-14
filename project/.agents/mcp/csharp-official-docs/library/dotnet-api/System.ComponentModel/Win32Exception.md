---
title: "Win32Exception class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/Win32Exception.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Win32Exception class

Namespace: `System.ComponentModel`

```csharp
public class Win32Exception : System.Runtime.InteropServices.ExternalException
```

Throws an exception for a Win32 error code.

#### Remarks
Win32 error codes are translated from their numeric representations into a system message when they are displayed. Use `Win32Exception.NativeErrorCode` to access the numeric representation of the error code associated with this exception. For more information about the error codes, see Win32 Error Codes.

#### Examples
The following code example shows how to catch a Win32 exception and interpret its content. The example attempts to start a nonexistent executable, which results in a Win32 exception. Upon catching the exception, the example fetches the respective error message, code, and origin of the exception.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/Win32Exception/Overview/win32exception.cs._

## Win32Exception.Win32Exception() constructor

```csharp
public Win32Exception ();
```

Initializes a new instance of the `Win32Exception` class with the last Win32 error that occurred.

#### Remarks
The detailed description of the error will be determined by the Win32 error message associated with the error.

This constructor uses the `Marshal.GetLastWin32Error` method of `Marshal` to get its error code.

## Win32Exception.Win32Exception(Int32) constructor

```csharp
public Win32Exception (int error);
```

Initializes a new instance of the `Win32Exception` class with the specified error.

Parameters:

- `error`: The Win32 error code associated with this exception.

#### Remarks
The detailed description of the error is determined by the Win32 error message associated with the error.

## Win32Exception.Win32Exception(String) constructor

```csharp
public Win32Exception (string? message);
```

Initializes a new instance of the `Win32Exception` class with the specified detailed description.

Parameters:

- `message`: A detailed description of the error.

To be added.

## Win32Exception.Win32Exception(Int32, String) constructor

```csharp
public Win32Exception (int error, string? message);
```

Initializes a new instance of the `Win32Exception` class with the specified error and the specified detailed description.

Parameters:

- `error`: The Win32 error code associated with this exception.
- `message`: A detailed description of the error.

#### Remarks
The detailed description of the error is determined by the Win32 error message associated with the error.

## Win32Exception.Win32Exception(SerializationInfo, StreamingContext) constructor

```csharp
protected Win32Exception (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `Win32Exception` class with the specified context and the serialization information.

Parameters:

- `info`: The `SerializationInfo` associated with this exception.
- `context`: A `StreamingContext` that represents the context of this exception.

To be added.

## Win32Exception.Win32Exception(String, Exception) constructor

```csharp
public Win32Exception (string? message, Exception? innerException);
```

Initializes a new instance of the `Win32Exception` class with the specified detailed description and the specified exception.

Parameters:

- `message`: A detailed description of the error.
- `innerException`: A reference to the inner exception that is the cause of this exception.

To be added.

## Win32Exception.NativeErrorCode property

```csharp
public int NativeErrorCode { get; }
```

Gets the Win32 error code associated with this exception.

Returns: The Win32 error code associated with this exception.

To be added.

## Win32Exception.GetObjectData(SerializationInfo, StreamingContext) method

```csharp
public override void GetObjectData (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Sets the `SerializationInfo` object with the file name and line number at which this `Win32Exception` occurred.

Parameters:

- `info`: A `SerializationInfo`.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## Win32Exception.ToString() method

```csharp
public override string ToString ();
```

Returns a string that contains the `Win32Exception.NativeErrorCode`, or `Exception.HResult`, or both.

Returns: A string that represents the `Win32Exception.NativeErrorCode`, or `Exception.HResult`, or both.

To be added.
