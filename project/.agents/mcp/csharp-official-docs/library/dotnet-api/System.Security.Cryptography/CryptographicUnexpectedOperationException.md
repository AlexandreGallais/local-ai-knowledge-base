---
title: "CryptographicUnexpectedOperationException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CryptographicUnexpectedOperationException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CryptographicUnexpectedOperationException class

Namespace: `System.Security.Cryptography`

```csharp
public class CryptographicUnexpectedOperationException : System.Security.Cryptography.CryptographicException
```

The exception that is thrown when an unexpected operation occurs during a cryptographic operation.

#### Remarks
`CryptographicUnexpectedOperationException` uses the HRESULT CORSEC_E_CRYPTO_UNEX_OPER, which has the value 0x80131431.

For a list of initial property values for an instance of `CryptographicUnexpectedOperationException`, see the constructor.

#### Examples
The following code example demonstrates how to use members of the `CryptographicUnexpectedOperationException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicUnexpectedOperationException/Overview/members.cs._

## CryptographicUnexpectedOperationException.CryptographicUnexpectedOperationException() constructor

```csharp
public CryptographicUnexpectedOperationException ();
```

Initializes a new instance of the `CryptographicUnexpectedOperationException` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `CryptographicUnexpectedOperationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicUnexpectedOperationException` with no parameters. This code example is part of a larger example provided for the `CryptographicUnexpectedOperationException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicUnexpectedOperationException/Overview/members.cs._

## CryptographicUnexpectedOperationException.CryptographicUnexpectedOperationException(String) constructor

```csharp
public CryptographicUnexpectedOperationException (string? message);
```

Initializes a new instance of the `CryptographicUnexpectedOperationException` class with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `CryptographicUnexpectedOperationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicUnexpectedOperationException` using a custom error message. This code example is part of a larger example provided for the `CryptographicUnexpectedOperationException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicUnexpectedOperationException/Overview/members.cs._

## CryptographicUnexpectedOperationException.CryptographicUnexpectedOperationException(SerializationInfo, StreamingContext) constructor

```csharp
protected CryptographicUnexpectedOperationException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `CryptographicUnexpectedOperationException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## CryptographicUnexpectedOperationException.CryptographicUnexpectedOperationException(String, Exception) constructor

```csharp
public CryptographicUnexpectedOperationException (string? message, Exception? inner);
```

Initializes a new instance of the `CryptographicUnexpectedOperationException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `CryptographicUnexpectedOperationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicUnexpectedOperationException` using a custom error message and an inner exception. This code example is part of a larger example provided for the `CryptographicUnexpectedOperationException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicUnexpectedOperationException/Overview/members.cs._

## CryptographicUnexpectedOperationException.CryptographicUnexpectedOperationException(String, String) constructor

```csharp
public CryptographicUnexpectedOperationException (string format, string? insert);
```

Initializes a new instance of the `CryptographicUnexpectedOperationException` class with a specified error message in the specified format.

Parameters:

- `format`: The format used to output the error message.
- `insert`: The error message that explains the reason for the exception.

#### Remarks
The following table shows the initial property values for an instance of `CryptographicUnexpectedOperationException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

#### Examples
The following code example demonstrates how to construct a `CryptographicUnexpectedOperationException` using a time format and the current date. This code example is part of a larger example provided for the `CryptographicUnexpectedOperationException` class.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/CryptographicUnexpectedOperationException/Overview/members.cs._
