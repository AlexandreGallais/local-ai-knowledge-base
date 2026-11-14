---
title: "OverflowException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/OverflowException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OverflowException class

Namespace: `System`

```csharp
public class OverflowException : ArithmeticException
```

The exception that is thrown when an arithmetic, casting, or conversion operation in a checked context results in an overflow.

#### Remarks
An `OverflowException` is thrown at run time under the following conditions:

- An arithmetic operation produces a result that is outside the range of the data type returned by the operation. The following example illustrates the `OverflowException` that is thrown by a multiplication operation that overflows the bounds of the `Int32` type.

_Code sample not included: ~/snippets/csharp/System/OverflowException/Overview/arithmetic1.cs._

- A casting or conversion operation attempts to perform a narrowing conversion, and the value of the source data type is outside the range of the target data type. The following example illustrates the `OverflowException` that is thrown by the attempt to convert a large unsigned byte value to a signed byte value.

_Code sample not included: ~/snippets/csharp/System/OverflowException/Overview/arithmetic1.cs._

In each case, the result of the operation is a value that is less than the `MinValue` property or greater than the `MaxValue` property of the data type that results from the operation.

For the arithmetic, casting, or conversion operation to throw an `OverflowException`, the operation must occur in a checked context. By default, arithmetic operations and overflows in Visual Basic are checked; in C# and F#, they are not. If the operation occurs in an unchecked context, the result is truncated by discarding any high-order bits that do not fit into the destination type. The following example illustrates such an unchecked conversion in C# or F#. It repeats the previous example in an unchecked context.

_Code sample not included: ~/snippets/csharp/System/OverflowException/Overview/arithmetic1.cs._

The following Microsoft intermediate language (MSIL) instructions throw an `OverflowException`:

-   `add.ovf.` *\<signed>*

-   `conv.ovf.` *\<to type>*

-   `conv.ovf.` *\<to type>* `.un`

-   `mul.ovf.` *\<type>*

-   `sub.ovf.` *\<type>*

-   `newarr`

`OverflowException` uses the HRESULT COR_E_OVERFLOW, which has the value 0x80131516.

For a list of initial property values for an instance of `OverflowException`, see the `OverflowException.%23ctor` constructors.

## OverflowException.OverflowException() constructor

```csharp
public OverflowException ();
```

Initializes a new instance of the `OverflowException` class.

#### Remarks
The following table shows the initial property values for an instance of `OverflowException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The localized error message string.|

## OverflowException.OverflowException(String) constructor

```csharp
public OverflowException (string? message);
```

Initializes a new instance of the `OverflowException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` should be understandable to the user. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `OverflowException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## OverflowException.OverflowException(SerializationInfo, StreamingContext) constructor

```csharp
protected OverflowException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `OverflowException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## OverflowException.OverflowException(String, Exception) constructor

```csharp
public OverflowException (string? message, Exception? innerException);
```

Initializes a new instance of the `OverflowException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `OverflowException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
