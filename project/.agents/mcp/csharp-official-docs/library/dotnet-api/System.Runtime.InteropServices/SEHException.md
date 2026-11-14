---
title: "SEHException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/SEHException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SEHException class

Namespace: `System.Runtime.InteropServices`

```csharp
public class SEHException : System.Runtime.InteropServices.ExternalException
```

Represents structured exception handling (SEH) errors.

#### Remarks

The `SEHException` class handles SEH errors that are thrown from unmanaged code, but that have not been mapped to another .NET exception. The `SEHException` class also corresponds to the `HRESULT` `E_FAIL` (0x80004005).

.NET often encounters unmanaged SEH exceptions that are automatically mapped to managed equivalents. There are two common unmanaged SEH exceptions:

- `STATUS_NO_MEMORY` exceptions are automatically mapped to the `OutOfMemoryException` class.
- `STATUS_ACCESS_VIOLATION` exceptions are automatically mapped as follows:

- If `legacyNullReferencePolicy` is applied, all access violations are mapped to the `NullReferenceException` class.
- If the address at which the read/write was attempted is not in JIT-compiled code, the exception is mapped to the `AccessViolationException` class.
- If the address at which the read/write was attempted is in JIT-compiled code, but it is not in the OS Null partition area, the exception is mapped to the `AccessViolationException` class.
- If there is no `legacyNullReferencePolicy`, and the address at which the read/write was attempted is in JIT-compiled code and in the OS Null partition area, the exception is mapped to the `NullReferenceException` class.

Any SEH exception that is not automatically mapped to a specific exception is mapped to the `SEHException` class by default.

Note that the `SEHException` class does not cause unmanaged C++ exception destructors to be called. To ensure that unmanaged C++ exception destructors are called, use the following syntax in the `catch` block.

```vb
Catch
     ' Handle catch here.
End Try
```

```csharp
catch
{
     // Handle catch here.
}
```

```cpp
catch(…)
{
     // Handle catch here.
}
```

## SEHException.SEHException() constructor

```csharp
public SEHException ();
```

Initializes a new instance of the `SEHException` class.

#### Remarks
The `SEHException` class inherits from the `ExternalException` class. This constructor sets the properties of the `Exception` object to the values in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|A localized error message string.|

## SEHException.SEHException(String) constructor

```csharp
public SEHException (string? message);
```

Initializes a new instance of the `SEHException` class with a specified message.

Parameters:

- `message`: The message that indicates the reason for the exception.

#### Remarks
`SEHException` inherits from `ExternalException`. This constructor sets the properties of the `Exception` object as shown in the following table.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|`message`.|

## SEHException.SEHException(SerializationInfo, StreamingContext) constructor

```csharp
protected SEHException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `SEHException` class from serialization data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.

To be added.

## SEHException.SEHException(String, Exception) constructor

```csharp
public SEHException (string? message, Exception? inner);
```

Initializes a new instance of the `SEHException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `inner`: The exception that is the cause of the current exception. If the `inner` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `SEHException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

## SEHException.CanResume() method

```csharp
public virtual bool CanResume ();
```

Indicates whether the exception can be recovered from, and whether the code can continue from the point at which the exception was thrown.

Returns: Always `false`, because resumable exceptions are not implemented.

#### Remarks
If `SEHException.CanResume` returns `true`, then a filtered exception handler can correct the problem that caused the exception, and the code will continue from the point at which the exception was thrown.
