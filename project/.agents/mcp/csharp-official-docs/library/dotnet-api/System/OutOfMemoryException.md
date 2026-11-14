---
title: "OutOfMemoryException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/OutOfMemoryException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# OutOfMemoryException class

Namespace: `System`

```csharp
public class OutOfMemoryException : SystemException
```

The exception that is thrown when there is not enough memory to continue the execution of a program.

#### Remarks

`OutOfMemoryException` uses the HRESULT `COR_E_OUTOFMEMORY`, which has the value 0x8007000E.

For a list of initial property values for an instance of `OutOfMemoryException`, see the `OutOfMemoryException.%23ctor` constructors.

> **Note:**
>  The value of the inherited `Data` property is always `null`.

An `OutOfMemoryException` exception has two major causes:

- You are attempting to expand a `StringBuilder` object beyond the length defined by its `MaxCapacity` property.

- The common language runtime cannot allocate enough contiguous memory to successfully perform an operation. This exception can be thrown by any property assignment or method call that requires a memory allocation. For more information on the cause of the `OutOfMemoryException` exception, see the blog post "Out of Memory" Does Not Refer to Physical Memory.

This type of `OutOfMemoryException` exception represents a catastrophic failure. If you choose to handle the exception, you should include a `catch` block that calls the `Environment.FailFast` method to terminate your app and add an entry to the system event log, as the following example does.

_Code sample not included: ~/snippets/csharp/System/OutOfMemoryException/Overview/failfast1.cs._

Some of the conditions under which the exception is thrown and the actions you can take to eliminate it include the following:

**You are calling the `StringBuilder.Insert` method.**

You are attempting to increase the length of a `StringBuilder` object beyond the size specified by its `MaxCapacity` property. The following example illustrates the `OutOfMemoryException` exception thrown by a call to the `Insert` method when the example tries to insert a string that would cause the object's `Length` property to exceed its maximum capacity.

_Code sample not included: ~/snippets/csharp/System/OutOfMemoryException/Overview/sb_example1.cs._

You can do either of the following to address the error:

- Replace the call to the `%23ctor` constructor with a call any other `StringBuilder` constructor overload. The maximum capacity of your `StringBuilder` object will be set to its default value, which is `MaxValue`.
- Call the `%23ctor` constructor with a `maxCapacity` value that is large enough to accommodate any expansions to the `StringBuilder` object.

**Your app runs as a 32-bit process.**

32-bit processes can allocate a maximum of 2GB of virtual user-mode memory on 32-bit systems, and 4GB of virtual user-mode memory on 64-bit systems. This can make it more difficult for the common language runtime to allocate sufficient contiguous memory when a large allocation is needed. In contrast, 64-bit processes can allocate up to 8TB of virtual memory. To address this exception, recompile your app to target a 64-bit platform. For information on targeting specific platforms in Visual Studio, see How to: Configure Projects to Target Platforms.

**Your app is leaking unmanaged resources**

Although the garbage collector is able to free memory allocated to managed types, it does not manage memory allocated to unmanaged resources such as operating system handles (including handles to files, memory-mapped files, pipes, registry keys, and wait handles) and memory blocks allocated directly by Windows API calls or by calls to memory allocation functions such as `malloc`. Types that consume unmanaged resources implement the `IDisposable` interface.

If you are consuming a type that uses unmanaged resources, you should be sure to call its `IDisposable.Dispose` method when you have finished using it. (Some types also implement a `Close` method that is identical in function to a `Dispose` method.) For more information, see the Using Objects That Implement IDisposable topic.

If you have created a type that uses unmanaged resources, make sure that you have implemented the Dispose pattern and, if necessary, supplied a finalizer. For more information, see  Implementing a Dispose method and `Object.Finalize`.

**You are attempting to create a large array in a 64-bit process**

Support for arrays of greater than 2 GB is enabled by default.

**You are working with very large sets of data (such as arrays, collections, or database data sets) in memory.**

When data structures or data sets that reside in memory become so large that the common language runtime is unable to allocate enough contiguous memory for them, an `OutOfMemoryException` exception results.

To prevent the `OutOfMemoryException` exceptions, you must modify your application so that less data is resident in memory, or the data is divided into segments that require smaller memory allocations. For example:

- If you are retrieving all of the data from a database and then filtering it in your app to minimize trips to the server, you should modify your queries to return only the subset of data that your app needs. When working with large tables, multiple queries are almost always more efficient than retrieving all of the data in a single table and then manipulating it.
- If you are executing queries that users create dynamically, you should ensure that the number of records returned by the query is limited.
- If you are using large arrays or other collection objects whose size results in an `OutOfMemoryException` exception, you should modify your application to work the data in subsets rather than to work with it all at once.

The following example gets a array that consists of 200 million floating-point values and then calculates their mean. The output from the example shows that, because the example stores the entire array in memory before it calculates the mean, an `OutOfMemoryException` is thrown.

_Code sample not included: ~/snippets/csharp/System/OutOfMemoryException/Overview/data1.cs._

The following example eliminates the `OutOfMemoryException` exception by processing the incoming data without storing the entire data set in memory, serializing the data to a file if necessary to permit further processing (these lines are commented out in the example, since in this case they produce a file whose size is greater than 1GB), and returning the calculated mean and the number of cases to the calling routine.

_Code sample not included: ~/snippets/csharp/System/OutOfMemoryException/Overview/data2.cs._

**You are repeatedly concatenating large strings.**

Because strings are immutable, each string concatenation operation creates a new string. The impact for small strings, or for a small number of concatenation operations, is negligible. But for large strings or a very large number of concatenation operations, string concatenation can lead to a large number of memory allocations and memory fragmentation, poor performance, and possibly `OutOfMemoryException` exceptions.

When concatenating large strings or performing a large number of concatenation operations, you should use the `StringBuilder` class instead of the `String` class. When you have finished manipulating the string, convert the `StringBuilder` instance to a string by calling the `StringBuilder.ToString` method.

**You pin a large number of objects in memory.**

Pinning a large number of objects in memory for long periods can make it difficult for the garbage collector to allocate contiguous blocks of memory. If you've pinned a large number of objects in memory, for example by using the `fixed` statement in C# or by calling the `Alloc` method with a handle type of `Pinned`, you can do the following to address the `OutOfMemoryException` exception.

- Evaluate whether each object really needs to be pinned,

- Ensure that each object is unpinned as soon as possible.

- Make sure that each call to the `Alloc` method to pin memory has a corresponding call to the `GCHandle.Free` method to unpin that memory.

The following Microsoft intermediate (MSIL) instructions throw an `OutOfMemoryException` exception:

-   box
-   newarr
-   newobj

## OutOfMemoryException.OutOfMemoryException() constructor

```csharp
public OutOfMemoryException ();
```

Initializes a new instance of the `OutOfMemoryException` class.

#### Remarks
This constructor initializes the `Message` property of the new instance to a system-supplied message that describes the error, such as "There was not enough memory to continue the execution of the program." This message takes into account the current system culture.

The following table shows the initial property values for an instance of `OutOfMemoryException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|`null`.|
|`Exception.Message`|The localized error message string.|

## OutOfMemoryException.OutOfMemoryException(String) constructor

```csharp
public OutOfMemoryException (string? message);
```

Initializes a new instance of the `OutOfMemoryException` class with a specified error message.

Parameters:

- `message`: The message that describes the error.

#### Remarks
The content of the `message` parameter is intended to be understood by humans. The caller of this constructor is required to ensure that this string has been localized for the current system culture.

The following table shows the initial property values for an instance of `OutOfMemoryException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|A null reference (`Nothing` in Visual Basic).|
|`Exception.Message`|The error message string.|

## OutOfMemoryException.OutOfMemoryException(SerializationInfo, StreamingContext) constructor

```csharp
protected OutOfMemoryException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new instance of the `OutOfMemoryException` class with serialized data.

Parameters:

- `info`: The object that holds the serialized object data.
- `context`: The contextual information about the source or destination.

To be added.

## OutOfMemoryException.OutOfMemoryException(String, Exception) constructor

```csharp
public OutOfMemoryException (string? message, Exception? innerException);
```

Initializes a new instance of the `OutOfMemoryException` class with a specified error message and a reference to the inner exception that is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception. If the `innerException` parameter is not a null reference (`Nothing` in Visual Basic), the current exception is raised in a `catch` block that handles the inner exception.

#### Remarks
An exception that is thrown as a direct result of a previous exception can include a reference to the previous exception in the `InnerException` property. The `InnerException` property returns the same value that is passed into the constructor, or a null reference (`Nothing` in Visual Basic) if the `InnerException` property does not supply the inner exception value to the constructor.

The following table shows the initial property values for an instance of `OutOfMemoryException`.

|Property|Value|
|--------------|-----------|
|`Exception.InnerException`|The inner exception reference.|
|`Exception.Message`|The error message string.|
