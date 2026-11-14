---
title: "Exception class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Exception.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Exception class (part 2 of 4)

|Exception|Condition|
|---------------|---------------|
|`ArgumentException`|A non-null argument that is passed to a method is invalid.|
|`ArgumentNullException`|An argument that is passed to a method is `null`.|
|`ArgumentOutOfRangeException`|An argument is outside the range of valid values.|
|`DirectoryNotFoundException`|Part of a directory path is not valid.|
|`DivideByZeroException`|The denominator in an integer or `Decimal` division operation is zero.|
|`DriveNotFoundException`|A drive is unavailable or does not exist.|
|`FileNotFoundException`|A file does not exist.|
|`FormatException`|A value is not in an appropriate format to be converted from a string by a conversion method such as `Parse`.|
|`IndexOutOfRangeException`|An index is outside the bounds of an array or collection.|
|`InvalidOperationException`|A method call is invalid in an object's current state.|
|`KeyNotFoundException`|The specified key for accessing a member in a collection cannot be found.|
|`NotImplementedException`|A method or operation is not implemented.|
|`NotSupportedException`|A method or operation is not supported.|
|`ObjectDisposedException`|An operation is performed on an object that has been disposed.|
|`OverflowException`|An arithmetic, casting, or conversion operation results in an overflow.|
|`PathTooLongException`|A path or file name exceeds the maximum system-defined length.|
|`PlatformNotSupportedException`|The operation is not supported on the current platform.|
|`RankException`|An array with the wrong number of dimensions is passed to a method.|
|`TimeoutException`|The time interval allotted to an operation has expired.|
|`UriFormatException`|An invalid Uniform Resource Identifier (URI) is used.|

#### Implement custom exceptions

In the following cases, using an existing .NET exception to handle an error condition is not adequate:

- When the exception reflects a unique program error that cannot be mapped to an existing .NET exception.

- When the exception requires handling that is different from the handling that is appropriate for an existing .NET exception, or the exception must be disambiguated from a similar exception. For example, if you throw an `ArgumentOutOfRangeException` exception when parsing the numeric representation of a string that is out of range of the target integral type, you would not want to use the same exception for an error that results from the caller not supplying the appropriate constrained values when calling the method.

The `Exception` class is the base class of all exceptions in .NET. Many derived classes rely on the inherited behavior of the members of the `Exception` class; they do not override the members of `Exception`, nor do they define any unique members.

To define your own exception class:

1. Define a class that inherits from `Exception`. If necessary, define any unique members needed by your class to provide additional information about the exception. For example, the `ArgumentException` class includes a `ParamName` property that specifies the name of the parameter whose argument caused the exception, and the `RegexMatchTimeoutException` property includes a `MatchTimeout` property that indicates the time-out interval.

2. If necessary, override any inherited members whose functionality you want to change or modify. Note that most existing derived classes of `Exception` do not override the behavior of inherited members.

3. Determine whether your custom exception object is serializable. Serialization enables you to save information about the exception and permits exception information to be shared by a server and a client proxy in a remoting context. To make the exception object serializable, mark it with the `SerializableAttribute` attribute.

4. Define the constructors of your exception class. Typically, exception classes have one or more of the following constructors:

- `%23ctor`, which uses default values to initialize the properties of a new exception object.

- `%23ctor`, which initializes a new exception object with a specified error message.

- `%23ctor`, which initializes a new exception object with a specified error message and inner exception.

- `%23ctor`, which is a `protected` constructor that initializes a new exception object from serialized data. You should implement this constructor if you've chosen to make your exception object serializable.

The following example illustrates the use of a custom exception class. It defines a `NotPrimeException` exception that is thrown when a client tries to retrieve a sequence of prime numbers by specifying a starting number that is not prime. The exception defines a new property, `NonPrime`, that returns the non-prime number that caused the exception. Besides implementing a protected parameterless constructor and a constructor with `SerializationInfo` and `StreamingContext` parameters for serialization, the `NotPrimeException` class defines three additional constructors to support the `NonPrime` property. Each constructor calls a base class constructor in addition to preserving the value of the non-prime number. The `NotPrimeException` class is also marked with the `SerializableAttribute` attribute.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/notprimeexception.cs._

The `PrimeNumberGenerator` class shown in the following example uses the Sieve of Eratosthenes to calculate the sequence of prime numbers from 2 to a limit specified by the client in the call to its class constructor. The `GetPrimesFrom` method returns all prime numbers that are greater than or equal to a specified lower limit, but throws a `NotPrimeException` if that lower limit is not a prime number.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/primenumbergenerator.cs._

The following example makes two calls to the `GetPrimesFrom` method with non-prime numbers, one of which crosses application domain boundaries. In both cases, the exception is thrown and successfully handled in client code.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/example.cs._

#### Examples

The following example demonstrates a `catch` (`with` in F#) block that is defined to handle `ArithmeticException` errors. This `catch` block also catches `DivideByZeroException` errors, because `DivideByZeroException` derives from `ArithmeticException` and there is no `catch` block explicitly defined for `DivideByZeroException` errors.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/catchexception.cs._

## Exception.Exception() constructor

```csharp
public Exception ();
```

Initializes a new instance of the `Exception` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error and takes into account the current system culture.

All the derived classes should provide this parameterless constructor. The following table shows the initial property values for an instance of `Exception`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|A system-supplied localized description.|

#### Examples
The following code example derives an `Exception` that uses a predefined message. The code demonstrates the use of the parameterless constructor for the derived class and the base `Exception` class.

_Code sample not included: ~/snippets/csharp/System/Exception/.ctor/new.cs._

## Exception.Exception(String) constructor

```csharp
public Exception (string? message);
```

Initializes a new instance of the `Exception` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
This constructor initializes the `Message` property of the new instance by using the `message` parameter. If the `message` parameter is `null`, this is the same as calling the `Exception.%23ctor` constructor.

The following table shows the initial property values for an instance of `Exception`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

#### Examples
The following code example derives an `Exception` for a specific condition. The code demonstrates the use of the constructor that takes a caller-specified message as a parameter, for both the derived class and the base `Exception` class.

_Code sample not included: ~/snippets/csharp/System/Exception/.ctor/news.cs._

## Exception.Exception(SerializationInfo, StreamingContext) constructor

```csharp
protected Exception (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `Exception` class with serialized data.

Parameters:

- `info`: The `SerializationInfo` that holds the serialized object data about the exception being thrown.
- `context`: The `StreamingContext` that contains contextual information about the source or destination.

Exceptions:

- `ArgumentNullException`: `info` is `null`.
- `SerializationException`: The class name is `null` or `Exception.HResult` is zero (0).

To be added.

## Exception.Exception(String, Exception) constructor

```csharp
public Exception (string? message, Exception? innerException);
```

Initializes a new instance of the `Exception` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception, or a null reference (`Nothing` in Visual Basic) if no inner exception is specified.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `Exception`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|

#### Examples
The following code example derives an `Exception` for a specific condition. The code demonstrates the use of the constructor that takes a message and an inner exception as parameters, for both the derived class and the base `Exception` class.

_Code sample not included: ~/snippets/csharp/System/Exception/.ctor/newsi.cs._
