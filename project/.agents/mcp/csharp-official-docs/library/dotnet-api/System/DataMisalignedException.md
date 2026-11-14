---
title: "DataMisalignedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/DataMisalignedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataMisalignedException class

Namespace: `System`

```csharp
public sealed class DataMisalignedException : SystemException
```

The exception that is thrown when a unit of data is read from or written to an address that is not a multiple of the data size. This class cannot be inherited.

#### Remarks
Some microprocessors, such as 64-bit processors, can issue hardware exceptions when data is read or written to a misaligned address (that is, when an address is not a multiple of the size of the data being accessed). `DataMisalignedException` is typically thrown when 16-bit, 32-bit, or 64-bit data is read from or written to an address that is not a multiple of two, four, or eight bytes.

The `DataMisalignedException` exposes the underlying hardware exception, which allows you to respond in an appropriate manner. For example, a routine in your application attempts to copy a sequence of bytes from one location to another in 64-bit units. However, the write operation starts at a misaligned address, which causes the common language runtime to throw a `DataMisalignedException`. Your routine responds to the exception by copying the data one byte at a time.

## DataMisalignedException.DataMisalignedException() constructor

```csharp
public DataMisalignedException ();
```

Initializes a new instance of the `DataMisalignedException` class.

To be added.

## DataMisalignedException.DataMisalignedException(String) constructor

```csharp
public DataMisalignedException (string? message);
```

Initializes a new instance of the `DataMisalignedException` class using the specified error message.

Parameters:

- `message`: A `String` object that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

To be added.

## DataMisalignedException.DataMisalignedException(String, Exception) constructor

```csharp
public DataMisalignedException (string? message, Exception? innerException);
```

Initializes a new instance of the `DataMisalignedException` class using the specified error message and underlying exception.

Parameters:

- `message`: A `String` object that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.
- `innerException`: The exception that is the cause of the current `DataMisalignedException`. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

To be added.
