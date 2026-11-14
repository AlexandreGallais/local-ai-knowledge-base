---
title: "Exception class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/Exception.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Exception class

Namespace: `System`

```csharp
public class Exception : System.Runtime.Serialization.ISerializable
```

Represents errors that occur during application execution.

The `Exception` class is the base class for all exceptions. When an error occurs, either the system or the currently executing application reports it by throwing an exception that contains information about the error. After an exception is thrown, it is handled by the application or by the default exception handler.

#### Errors and exceptions

Runtime errors can occur for a variety of reasons. However, not all errors should be handled as exceptions in your code. Here are some categories of errors that can occur at runtime and the appropriate ways to respond to them.

- **Usage errors.** A usage error represents an error in program logic that can result in an exception. However, the error should be addressed not through exception handling but by modifying the faulty code. For example, the override of the `Equals` method in the following example assumes that the `obj` argument must always be non-null.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/usageerrors1.cs._

The `NullReferenceException` exception that results when `obj` is `null` can be eliminated by modifying the source code to explicitly test for null before calling the `Object.Equals` override and then re-compiling. The following example contains the corrected source code that handles a `null` argument.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/usageerrors2.cs._

Instead of using exception handling for usage errors, you can use the `Debug.Assert` method to identify usage errors in debug builds, and the `Trace.Assert` method to identify usage errors in both debug and release builds. For more information, see Assertions in Managed Code.

- **Program errors.** A program error is a runtime error that cannot necessarily be avoided by writing bug-free code.

In some cases, a program error may reflect an expected or routine error condition. In this case, you may want to avoid using exception handling to deal with the program error and instead retry the operation. For example, if the user is expected to input a date in a particular format, you can parse the date string by calling the `DateTime.TryParseExact` method, which returns a `Boolean` value that indicates whether the parse operation succeeded, instead of using the `DateTime.ParseExact` method, which throws a `FormatException` exception if the date string cannot be converted to a `DateTime` value. Similarly, if a user tries to open a file that does not exist, you can first call the `File.Exists` method to check whether the file exists and, if it does not, prompt the user whether they want to create it.

In other cases, a program error reflects an unexpected error condition that can be handled in your code. For example, even if you've checked to ensure that a file exists, it may be deleted before you can open it, or it may be corrupted. In that case, trying to open the file by instantiating a `StreamReader` object or calling the `File.Open` method may throw a `FileNotFoundException` exception. In these cases, you should use exception handling to recover from the error.

- **System failures.** A system failure is a runtime error that cannot be handled programmatically in a meaningful way. For example, any method can throw an `OutOfMemoryException` exception if the common language runtime is unable to allocate additional memory. Ordinarily, system failures are not handled by using exception handling. Instead, you may be able to use an event such as `UnhandledException` and call the `Environment.FailFast` method to log exception information and notify the user of the failure before the application terminates.

#### Try/catch blocks

The common language runtime provides an exception handling model that is based on the representation of exceptions as objects, and the separation of program code and exception handling code into `try` blocks and `catch` blocks. There can be one or more `catch` blocks, each designed to handle a particular type of exception, or one block designed to catch a more specific exception than another block.

If an application handles exceptions that occur during the execution of a block of application code, the code must be placed within a `try` statement and is called a `try` block. Application code that handles exceptions thrown by a `try` block is placed within a `catch` statement and is called a `catch` block. Zero or more `catch` blocks are associated with a `try` block, and each `catch` block includes a type filter that determines the types of exceptions it handles.

When an exception occurs in a `try` block, the system searches the associated `catch` blocks in the order they appear in application code, until it locates a `catch` block that handles the exception. A `catch` block handles an exception of type `T` if the type filter of the catch block specifies `T` or any type that `T` derives from. The system stops searching after it finds the first `catch` block that handles the exception. For this reason, in application code, a `catch` block that handles a type must be specified before a `catch` block that handles its base types, as demonstrated in the example that follows this section. A catch block that handles `System.Exception` is specified last.

If none of the `catch` blocks associated with the current `try` block handle the exception, and the current `try` block is nested within other `try` blocks in the current call, the `catch` blocks associated with the next enclosing `try` block are searched. If no `catch` block for the exception is found, the system searches previous nesting levels in the current call. If no `catch` block for the exception is found in the current call, the exception is passed up the call stack, and the previous stack frame is searched for a `catch` block that handles the exception. The search of the call stack continues until the exception is handled or until no more frames exist on the call stack. If the top of the call stack is reached without finding a `catch` block that handles the exception, the default exception handler handles it and the application terminates.

#### F# try..with expression

F# does not use `catch` blocks. Instead, a raised exception is pattern matched using a single `with` block. As this is an expression, rather than a statement, all paths must return the same type. To learn more, see The try...with Expression.

#### Exception type features

Exception types support the following features:

- Human-readable text that describes the error. When an exception occurs, the runtime makes a text message available to inform the user of the nature of the error and to suggest action to resolve the problem. This text message is held in the `Message` property of the exception object. During the creation of the exception object, you can pass a text string to the constructor to describe the details of that particular exception. If no error message argument is supplied to the constructor, the default error message is used. For more information, see the `Message` property.

- The state of the call stack when the exception was thrown. The `StackTrace` property carries a stack trace that can be used to determine where the error occurs in the code. The stack trace lists all the called methods and the line numbers in the source file where the calls are made.

#### Exception class properties

The `Exception` class includes a number of properties that help identify the code location, the type, the help file, and the reason for the exception: `StackTrace`, `InnerException`, `Message`, `HelpLink`, `HResult`, `Source`, `TargetSite`, and `Data`.

When a causal relationship exists between two or more exceptions, the `InnerException` property maintains this information. The outer exception is thrown in response to this inner exception. The code that handles the outer exception can use the information from the earlier inner exception to handle the error more appropriately. Supplementary information about the exception can be stored as a collection of key/value pairs in the `Data` property.

The error message string that is passed to the constructor during the creation of the exception object should be localized and can be supplied from a resource file by using the `ResourceManager` class. For more information about localized resources, see the Creating Satellite Assemblies and Packaging and Deploying Resources topics.

To provide the user with extensive information about why the exception occurred, the `HelpLink` property can hold a URL (or URN) to a help file.

The `Exception` class uses the HRESULT `COR_E_EXCEPTION`, which has the value 0x80131500.

For a list of initial property values for an instance of the `Exception` class, see the `Exception.%23ctor` constructors.

#### Performance considerations

Throwing or handling an exception consumes a significant amount of system resources and execution time. Throw exceptions only to handle truly extraordinary conditions, not to handle predictable events or flow control. For example, in some cases, such as when you're developing a class library, it's reasonable to throw an exception if a method argument is invalid, because you expect your method to be called with valid parameters. An invalid method argument, if it is not the result of a usage error, means that something extraordinary has occurred. Conversely, do not throw an exception if user input is invalid, because you can expect users to occasionally enter invalid data. Instead, provide a retry mechanism so users can enter valid input. Nor should you use exceptions to handle usage errors. Instead, use assertions to identify and correct usage errors.

In addition, do not throw an exception when a return code is sufficient; do not convert a return code to an exception; and do not routinely catch an exception, ignore it, and then continue processing.

#### Re-throw an exception

In many cases, an exception handler simply wants to pass the exception on to the caller. This most often occurs in:

- A class library that in turn wraps calls to methods in the .NET class library or other class libraries.
- An application or library that encounters a fatal exception. The exception handler can log the exception and then re-throw the exception.

The recommended way to re-throw an exception is to simply use the throw statement in C#, the reraise function in F#, and the Throw statement in Visual Basic <example-value> including an expression. This ensures that all call stack information is preserved when the exception is propagated to the caller. The following example illustrates this. A string extension method, `FindOccurrences`, wraps one or more calls to `IndexOf` without validating its arguments beforehand.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/rethrow1.cs._

A caller then calls `FindOccurrences` twice. In the second call to `FindOccurrences`, the caller passes a `null` as the search string, which causes the `IndexOf` method to throw an `ArgumentNullException` exception. This exception is handled by the `FindOccurrences` method and passed back to the caller. Because the throw statement is used with no expression, the output from the example shows that the call stack is preserved.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/rethrow1.cs._

In contrast, if the exception is re-thrown by using this statement:

```csharp
throw e;
```

```vb
Throw e
```

```fsharp
raise e
```

...then the full call stack is not preserved, and the example would generate the following output:

```output
'a' occurs at the following character positions: 4, 7, 15

An exception (ArgumentNullException) occurred.
Message:
   Value cannot be null.
Parameter name: value

Stack Trace:
      at Library.FindOccurrences(String s, String f)
   at Example.Main()
```

A slightly more cumbersome alternative is to throw a new exception, and to preserve the original exception's call stack information in an inner exception. The caller can then use the new exception's `InnerException` property to retrieve stack frame and other information about the original exception. In this case, the throw statement is:

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/rethrow3.cs._

The user code that handles the exception has to know that the `InnerException` property contains information about the original exception, as the following exception handler illustrates.

_Code sample not included: ~/snippets/csharp/System/Exception/Overview/rethrow3.cs._

#### Choose standard exceptions

When you have to throw an exception, you can often use an existing exception type in .NET instead of implementing a custom exception. You should use a standard exception type under these two conditions:

- You're throwing an exception that is caused by a usage error (that is, by an error in program logic made by the developer who is calling your method). Typically, you would throw an exception such as `ArgumentException`, `ArgumentNullException`, `InvalidOperationException`, or `NotSupportedException`. The string you supply to the exception object's constructor when instantiating the exception object should describe the error so that the developer can fix it. For more information, see the `Message` property.

- You're handling an error that can be communicated to the caller with an existing .NET exception. You should throw the most derived exception possible. For example, if a method requires an argument to be a valid member of an enumeration type, you should throw an `InvalidEnumArgumentException` (the most derived class) rather than an `ArgumentException`.

The following table lists common exception types and the conditions under which you would throw them.
