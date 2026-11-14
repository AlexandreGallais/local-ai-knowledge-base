---
title: "Exception class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Exception.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Exception class (part 3 of 4)

## Exception.Data property

```csharp
public virtual System.Collections.IDictionary Data { get; }
```

Gets a collection of key/value pairs that provide additional user-defined information about the exception.

Returns: An object that implements the `IDictionary` interface and contains a collection of user-defined key/value pairs. The default is an empty collection.

Use the `IDictionary` object returned by the `Data` property to store and retrieve supplementary information relevant to the exception. The information is in the form of an arbitrary number of user-defined key/value pairs. The key <example-value> of each key/value pair is typically an identifying string, whereas the value component of the pair can be any type of object.

#### Key/value pair security

The key/value pairs stored in the collection returned by the `Data` property are not secure. If your application calls a nested series of routines, and each routine contains exception handlers, the resulting call stack contains a hierarchy of those exception handlers. If a lower-level routine throws an exception, any upper-level exception handler in the call stack hierarchy can read and/or modify the key/value pairs stored in the collection by any other exception handler. This means you must guarantee that the information in the key/value pairs is not confidential and that your application will operate correctly if the information in the key/value pairs is corrupted.

#### Key <example-value>

A key <example-value> occurs when different exception handlers specify the same key to access a key/value pair. Use caution when developing your application because the consequence of a key <example-value> is that lower-level exception handlers can inadvertently communicate with higher-level exception handlers, and this communication might cause subtle program errors. However, if you are cautious you can use key <example-value> to enhance your application.

#### Avoid key <example-value>

Avoid key <example-value> by adopting a naming convention to generate unique keys for key/value pairs. For example, a naming convention might yield a key that consists of the period-delimited name of your application, the method that provides supplementary information for the pair, and a unique identifier.

Suppose two applications, named Products and Suppliers, each has a method named Sales. The Sales method in the Products application provides the identification number (the stock keeping unit or SKU) of a product. The Sales method in the Suppliers application provides the identification number, or SID, of a supplier. Consequently, the naming convention for this example yields the keys, "Products.Sales.SKU" and "Suppliers.Sales.SID".

#### Exploit key <example-value>

Exploit key <example-value> by using the presence of one or more special, prearranged keys to control processing. Suppose, in one scenario, the highest level exception handler in the call stack hierarchy catches all exceptions thrown by lower-level exception handlers. If a key/value pair with a special key <example-value>, the high-level exception handler formats the remaining key/value pairs in the `IDictionary` object in some nonstandard way; otherwise, the remaining key/value pairs are formatted in some normal manner.

Now suppose, in another scenario, the exception handler at each level of the call stack hierarchy catches the exception thrown by the next lower-level exception handler. In addition, each exception handler knows the collection returned by the `Data` property contains a set of key/value pairs that can be accessed with a prearranged set of keys.

Each exception handler uses the prearranged set of keys to update the value component of the corresponding key/value pair with information unique to that exception handler. After the update process is complete, the exception handler throws the exception to the next higher-level exception handler. Finally, the highest level exception handler accesses the key/value pairs and displays the consolidated update information from all the lower-level exception handlers.

The following example demonstrates how to add and retrieve information using the `Data` property.

_Code sample not included: ~/snippets/csharp/System/Exception/Data/data.cs._

## Exception.HelpLink property

```csharp
public virtual string? HelpLink { get; set; }
```

Gets or sets a link to the help file associated with this exception.

Returns: The Uniform Resource Name (URN) or Uniform Resource Locator (URL).

#### Remarks
The return value, which represents a help file, is a URN or URL. For example, the `HelpLink` value could be:

"file:///C:/Applications/Bazzal/help.html#ErrorNum42"

#### Examples
The following code example throws an `Exception` that sets the `HelpLink` property in its constructor and then catches the exception and displays `HelpLink`.

_Code sample not included: ~/snippets/csharp/System/Exception/HelpLink/properties.cs._

## Exception.HResult property

```csharp
public int HResult { get; set; }
```

Gets or sets HRESULT, a coded numerical value that is assigned to a specific exception.

Returns: The HRESULT value.

#### Remarks
HRESULT is a 32-bit value, divided into three different fields: a severity code, a facility code, and an error code. The severity code indicates whether the return value represents information, warning, or error. The facility code identifies the area of the system responsible for the error. The error code is a unique number that is assigned to represent the exception. Each exception is mapped to a distinct HRESULT. When managed code throws an exception, the runtime passes the HRESULT to the COM client. When unmanaged code returns an error, the HRESULT is converted to an exception, which is then thrown by the runtime. For information about HRESULT values and their corresponding .NET exceptions, see How to: Map HRESULTs and Exceptions. See Common HRESULT Values in the Windows documentation for a list of the values you are most likely to encounter.

#### Examples
The following code example defines a derived `Exception` class that sets the `HResult` property to a custom value in its constructor.

_Code sample not included: ~/snippets/csharp/System/Exception/HResult/hresult.cs._

## Exception.InnerException property

```csharp
public Exception? InnerException { get; }
```

Gets the `Exception` instance that caused the current exception.

Returns: An object that describes the error that caused the current exception. The `Exception.InnerException` property returns the same value as was passed into the `Exception.#ctor` constructor, or `null` if the inner exception value was not supplied to the constructor. This property is read-only.

#### Remarks
When an exception `X` is thrown as a direct result of a previous exception `Y`, the `InnerException` property of `X` should contain a reference to `Y`.

Use the `InnerException` property to obtain the set of exceptions that led to the current exception.

You can create a new exception that catches an earlier exception. The code that handles the second exception can make use of the additional information from the earlier exception to handle the error more appropriately.

Suppose that there is a function that reads a file and formats the data from that file. In this example, as the code tries to read the file, an `IOException` is thrown. The function catches the `IOException` and throws a `FileNotFoundException`. The `IOException` could be saved in the `InnerException` property of the `FileNotFoundException`, enabling the code that catches the `FileNotFoundException` to examine the cause of the initial error.

The `InnerException` property, which holds a reference to the inner exception, is set upon initialization of the exception object.

#### Examples
The following example demonstrates throwing and catching an exception that references an inner exception.

_Code sample not included: ~/snippets/csharp/System/Exception/InnerException/innerex.cs._

## Exception.Message property

```csharp
public virtual string Message { get; }
```

Gets a message that describes the current exception.

Returns: The error message that explains the reason for the exception, or an empty string ("").

Error messages target the developer who is handling the exception. The text of the `Message` property should completely describe the error and, when possible, should also explain how to correct the error. Top-level exception handlers may display the message to end-users, so you should ensure that it is grammatically correct and that each sentence of the message ends with a period. Do not use question marks or exclamation points. If your application uses localized exception messages, you should ensure that they are accurately translated.

> **Important:**
> Do not disclose sensitive information in exception messages without checking for the appropriate permissions.

The value of the `Message` property is included in the information returned by `Exception.ToString`. The `Message` property is set only when creating an `Exception`. If no message was supplied to the constructor for the current instance, the system supplies a default message that is formatted using the current system culture.

#### Examples

The following code example throws and then catches an `Exception` exception and displays the exception's text message using the `Message` property.

_Code sample not included: ~/snippets/csharp/System/Exception/HelpLink/properties.cs._

## Exception.Source property

```csharp
public virtual string? Source { get; set; }
```

Gets or sets the name of the application or the object that causes the error.

Returns: The name of the application or the object that causes the error.

Exceptions:

- `ArgumentException`: The object must be a runtime `Reflection` object.

#### Remarks
If the `Source` property is not set explicitly, the runtime automatically sets it to the name of the assembly in which the exception originated.

#### Examples
The following example throws an `Exception` that sets the `Source` property in its constructor and then catches the exception and displays `Source`.

_Code sample not included: ~/snippets/csharp/System/Exception/HelpLink/properties.cs._

## Exception.StackTrace property

```csharp
public virtual string? StackTrace { get; }
```

Gets a string representation of the immediate frames on the call stack.

Returns: A string that describes the immediate frames of the call stack. If no stack trace is available (such as prior to stack unwinding from a `throw` statement), the value is `null`.

#### Remarks
The execution stack keeps track of all the methods that are in execution at a given instant. A trace of the method calls is called a stack trace. The stack trace listing provides a way to follow the call stack to the line number in the method where the exception occurs.

The `StackTrace` property returns the frames of the call stack that originate at the location where the exception was thrown. You can obtain information about additional frames in the call stack by creating a new instance of the `StackTrace` class and using its `StackTrace.ToString` method.

The common language runtime (CLR) updates the stack trace whenever an exception is thrown in application code (by using the `throw` keyword). If the exception was rethrown in a method that is different than the method where it was originally thrown, the stack trace contains both the location in the method where the exception was originally thrown, and the location in the method where the exception was rethrown. If the exception is thrown, and later rethrown, in the same method, the stack trace only contains the location where the exception was rethrown and does not include the location where the exception was originally thrown.

The `StackTrace` property may not report as many method calls as expected because of code transformations, such as inlining, that occur during optimization.

#### Examples
The following code example throws an `Exception` and then catches it and displays a stack trace using the `StackTrace` property.

_Code sample not included: ~/snippets/csharp/System/Exception/HelpLink/properties.cs._

## Exception.TargetSite property

```csharp
public System.Reflection.MethodBase? TargetSite { get; }
```

Gets the method that throws the current exception.

Returns: The `MethodBase` that threw the current exception.

#### Remarks
If the method that throws this exception is not available and the stack trace is not a null reference (`Nothing` in Visual Basic), `Exception.TargetSite` obtains the method from the stack trace. If the stack trace is a null reference, `Exception.TargetSite` also returns a null reference.

#### Examples
The following code example throws an `Exception` and then catches it and displays the originating method using the `TargetSite` property.

_Code sample not included: ~/snippets/csharp/System/Exception/HelpLink/properties.cs._

## Exception.GetBaseException() method

```csharp
public virtual Exception GetBaseException ();
```

When overridden in a derived class, returns the `Exception` that is the root cause of one or more subsequent exceptions.

Returns: The first exception thrown in a chain of exceptions. If the `Exception.InnerException` property of the current exception is a null reference (`Nothing` in Visual Basic), this property returns the current exception.

#### Remarks
A chain of exceptions consists of a set of exceptions such that each exception in the chain was thrown as a direct result of the exception referenced in its `InnerException` property. For a given chain, there can be exactly one exception that is the root cause of all other exceptions in the chain. This exception is called the base exception and its `InnerException` property always contains a null reference.

For all exceptions in a chain of exceptions, the `GetBaseException` method must return the same object (the base exception).

Use the `GetBaseException` method when you want to find the root cause of an exception but do not need information about exceptions that may have occurred between the current exception and the first exception.

#### Examples
The following code example defines two derived `Exception` classes. It forces an exception and then throws it again with each of the derived classes. The code shows the use of the `GetBaseException` method to retrieve the original exception.

_Code sample not included: ~/snippets/csharp/System/Exception/GetBaseException/getbaseexc.cs._
