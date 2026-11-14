---
title: "NullReferenceException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/NullReferenceException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NullReferenceException class

Namespace: `System`

```csharp
public class NullReferenceException : SystemException
```

The exception that is thrown when there is an attempt to dereference a null object reference.

#### Remarks

A `NullReferenceException` exception is thrown when you try to access a member on a type whose value is `null`. A `NullReferenceException` exception typically reflects developer error and is thrown in the following scenarios:

> **Note:**
> You can avoid most `NullReferenceException` exceptions in C# by using the null-conditional operator (`?.`) or the null-coalescing operator (`??`). For more information, see Nullable reference types. The following C# examples assume the nullable context is disabled (not recommended).

- You forgot to instantiate a reference type. In the following example, `names` is declared but never instantiated (the affected line is commented out in the C# example since it doesn't compile):

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/example1.cs._

Some compilers issue a warning when they compile this code. Others issue an error, and the compilation fails. To address this problem, instantiate the object so that its value is no longer `null`. The following example does this by calling a type's class constructor.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/example1a.cs._

- You forgot to dimension an array before initializing it. In the following example, `values` is declared to be an integer array, but the number of elements that it contains is never specified. The attempt to initialize its values therefore throws a `NullReferenceException` exception.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/Array3.cs._

You can eliminate the exception by declaring the number of elements in the array before initializing it, as the following example does.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/Array4.cs._

For more information on declaring and initializing arrays, see Arrays and Arrays.

- You get a **null** return value from a method, and then call a method on the returned type. This sometimes is the result of a documentation error; the documentation fails to note that a method call can return `null`. In other cases, your code erroneously assumes that the method will always return a non-null value.

The code in the following example assumes that the `Array.Find` method always returns `Person` object whose `FirstName` field matches a search string. Because there is no match, the runtime throws a `NullReferenceException` exception.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/nullreturn2.cs._

To address this problem, test the method's return value to ensure that it's not `null` before calling any of its members, as the following example does.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/nullreturn2.cs._

- You're using an expression (for example, you chained a list of methods or properties together) to retrieve a value and, although you're checking whether the value is `null`, the runtime still throws a `NullReferenceException` exception. This occurs because one of the intermediate values in the expression returns `null`. As a result, your test for `null` is never evaluated.

The following example defines a `Pages` object that caches information about web pages, which are presented by `Page` objects. The `Example.Main` method checks whether the current web page has a non-null title and, if it does, displays the title. Despite this check, however, the method throws a `NullReferenceException` exception.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/Chain1.cs._

The exception is thrown because `pages.CurrentPage` returns `null` if no page information is stored in the cache. This exception can be corrected by testing the value of the `CurrentPage` property before retrieving the current `Page` object's `Title` property, as the following example does:

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/Chain2.cs._

- You're enumerating the elements of an array that contains reference types, and your attempt to process one of the elements throws a `NullReferenceException` exception.

The following example defines a string array. A `for` statement enumerates the elements in the array and calls each string's `String.Trim` method before displaying the string.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/Array1.cs._

This exception occurs if you assume that each element of the array must contain a non-null value, and the value of the array element is in fact `null`. The exception can be eliminated by testing whether the element is `null` before performing any operation on that element, as the following example shows.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/Array2.cs._

- A method when it accesses a member of one of its arguments, but that argument is `null`. The `PopulateNames` method in the following example throws the exception at the line `names.Add(arrName);`.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/example2.cs._

To address this issue, make sure that the argument passed to the method is not `null`, or handle the thrown exception in a `try…catch…finally` block. For more information, see Exceptions.

- A list is created without knowing the type, and the list was not initialized. The `GetList` method in the following example throws the exception at the line `emptyList.Add(value)`.

_Code sample not included: ~/snippets/csharp/System/NullReferenceException/Overview/example3.cs._
To address this issue, make sure that the list is initialized (one way to do this is to call `Activator.CreateInstance` instead of `FormatterServices.GetUninitializedObject`), or handle the thrown exception in a `try…catch…finally` block. For more information, see Exceptions.

The following Microsoft intermediate language (MSIL) instructions throw `NullReferenceException`: `callvirt`, `cpblk`, `cpobj`, `initblk`, `ldelem.<type>`, `ldelema`, `ldfld`, `ldflda`, `ldind.<type>`, `ldlen`, `stelem.<type>`, `stfld`, `stind.<type>`, `throw`, and `unbox`.

`NullReferenceException` uses the HRESULT `COR_E_NULLREFERENCE`, which has the value 0x80004003.

For a list of initial property values for an instance of `NullReferenceException`, see the `NullReferenceException.%23ctor` constructors.

#### When to handle NullReferenceException exceptions

It's usually better to avoid a NullReferenceException than to handle it after it occurs. Handling an exception can make your code harder to maintain and understand, and can sometimes introduce other bugs. A NullReferenceException is often a non-recoverable error. In these cases, letting the exception stop the app might be the best alternative.

However, there are many situations where handling the error can be useful:

- Your app can ignore objects that are null. For example, if your app retrieves and processes records in a database, you might be able to ignore some number of bad records that result in null objects. Recording the bad data in a log file or in the application UI might be all you have to do.

- You can recover from the exception. For example, a call to a web service that returns a reference type might return null if the connection is lost or the connection times out. You can attempt to reestablish the connection and try the call again.

- You can restore the state of your app to a valid state. For example, you might be performing a multi-step task that requires you to save information to a data store before you call a method that throws a NullReferenceException. If the uninitialized object would corrupt the data record, you can remove the previous data before you close the app.

- You want to report the exception. For example, if the error was caused by a mistake from the user of your app, you can generate a message to help them supply the correct information. You can also log information about the error to help you fix the problem. Some frameworks, like ASP.NET, have a high-level exception handler that captures all errors to that the app never crashes; in that case, logging the exception might be the only way you can know that it occurs.

## NullReferenceException.NullReferenceException() constructor

```csharp
public NullReferenceException ();
```

Initializes a new instance of the `NullReferenceException` class, setting the `Exception.Message` property of the new instance to a system-supplied message that describes the error, such as "The value 'null' was found where an instance of an object was required." This message takes into account the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `NullReferenceException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## NullReferenceException.NullReferenceException(String) constructor

```csharp
public NullReferenceException (string? message);
```

Initializes a new instance of the `NullReferenceException` class with a specified error message.

Parameters:

- `message`: A `String` that describes the error. The content of `message` is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

#### Remarks
The following table shows the initial property values for an instance of `NullReferenceException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The error message string.|

## NullReferenceException.NullReferenceException(SerializationInfo, StreamingContext) constructor

```csharp
protected NullReferenceException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `NullReferenceException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## NullReferenceException.NullReferenceException(String, Exception) constructor

```csharp
public NullReferenceException (string? message, Exception? innerException);
```

Initializes a new instance of the `NullReferenceException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not `null`, the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception should include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or `null` if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `NullReferenceException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
