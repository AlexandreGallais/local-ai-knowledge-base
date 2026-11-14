---
title: "CryptographicException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptographicException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptographicException class

Namespace: `System.Security.Cryptography`

```csharp
public class CryptographicException : SystemException
```

The exception that is thrown when an error occurs during a cryptographic operation.

#### Remarks
`CryptographicException` uses the HRESULT CORSEC_E_CRYPTO, unless an alternate error code is specified.

For a list of initial property values for an instance of `CryptographicException`, see the constructor.

#### Examples
The following code example demonstrates how to use members of the `CryptographicException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicException/Overview/cryptographicexceptionmembers.cs._

## CryptographicException.CryptographicException() constructor

```csharp
public CryptographicException ();
```

Initializes a new instance of the `CryptographicException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `CryptographicException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicException` with no parameters. This code example is part of a larger example provided for the `CryptographicException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicException/Overview/cryptographicexceptionmembers.cs._

## CryptographicException.CryptographicException(Int32) constructor

```csharp
public CryptographicException (int hr);
```

Initializes a new instance of the `CryptographicException` class with the specified `HRESULT` error code.

Parameters:

- `hr`: The `HRESULT` error code.

#### Remarks
The `CryptographicException.%23ctor` constructor accepts a system `HRESULT` error code and sets the `Message` property to a localized message that corresponds to the `HRESULT`.

The following table shows the initial property values for an instance of `CryptographicException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicException` using an error code for an `CryptographicUnexpectedOperationException`. This code example is part of a larger example provided for the `CryptographicException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicException/Overview/cryptographicexceptionmembers.cs._

## CryptographicException.CryptographicException(String) constructor

```csharp
public CryptographicException (string? message);
```

Initializes a new instance of the `CryptographicException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `CryptographicException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicException` using a custom error message. This code example is part of a larger example provided for the `CryptographicException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicException/Overview/cryptographicexceptionmembers.cs._

## CryptographicException.CryptographicException(SerializationInfo, StreamingContext) constructor

```csharp
protected CryptographicException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `CryptographicException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## CryptographicException.CryptographicException(String, Exception) constructor

```csharp
public CryptographicException (string? message, Exception? inner);
```

Initializes a new instance of the `CryptographicException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `CryptographicException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicException` using a custom error message and an inner exception. This code example is part of a larger example provided for the `CryptographicException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicException/Overview/cryptographicexceptionmembers.cs._

## CryptographicException.CryptographicException(String, String) constructor

```csharp
public CryptographicException (string format, string? insert);
```

Initializes a new instance of the `CryptographicException` class with a specified error message in the specified format.

Parameters:

- `format`: The format used to output the error message.
- `insert`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `CryptographicException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicException` using a time format and the current date. This code example is part of a larger example provided for the `CryptographicException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicException/Overview/cryptographicexceptionmembers.cs._
