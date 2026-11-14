---
title: "UnhandledExceptionEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/UnhandledExceptionEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UnhandledExceptionEventArgs class

Namespace: `System`

```csharp
public class UnhandledExceptionEventArgs : EventArgs
```

Provides data for the event that is raised when there is an exception that is not handled in any application domain.

#### Remarks
`UnhandledExceptionEventArgs` provides access to the exception object and a flag indicating whether the common language runtime is terminating. The `UnhandledExceptionEventArgs` is one of the parameters passed into `UnhandledExceptionEventHandler` for the `UnhandledException` event.

For more information about event handler delegates, see Handling and Raising Events.

## UnhandledExceptionEventArgs.UnhandledExceptionEventArgs(Object, Boolean) constructor

```csharp
public UnhandledExceptionEventArgs (object exception, bool isTerminating);
```

Initializes a new instance of the `UnhandledExceptionEventArgs` class with the exception object and a common language runtime termination flag.

Parameters:

- `exception`: The exception that is not handled.
- `isTerminating`: `true` if the runtime is terminating; otherwise, `false`.

To be added.

## UnhandledExceptionEventArgs.ExceptionObject property

```csharp
public object ExceptionObject { get; }
```

Gets the unhandled exception object.

Returns: The unhandled exception object.

#### Remarks
This property returns an object of type `Object` rather than one derived from `Exception`. Although the Common Language Specification requires that all exception types derive from `Exception`, it is possible for methods to throw exceptions with objects not derived from `Exception`. You can do the following to work with this exception:

- Apply the  `RuntimeCompatibilityAttribute` attribute with a `RuntimeCompatibilityAttribute.WrapNonExceptionThrows` value of `true` to the assembly that contains the event handler. This wraps all exceptions not derived from the `Exception` class in a `RuntimeWrappedException` object. You can then safely cast (in C#) or convert (in Visual Basic) the object returned by this property to an `Exception` object, and retrieve the original exception object from the `WrappedException` property. Note that some compilers, such as the C# and Visual Basic <example-value>, automatically apply this attribute.

- Cast the object returned by this property to an `Exception` object.

#### Examples
The following example demonstrates the `UnhandledException` event. It defines an event handler, `MyHandler`, that is invoked whenever an unhandled exception is thrown in the default application domain. It then throws two exceptions. The first is handled by a **try/catch** block. The second is unhandled and invokes the `MyHandle` routine before the application terminates.

_Code sample not included: ~/snippets/csharp/System/AppDomain/UnhandledException/unhandledexception.cs._

## UnhandledExceptionEventArgs.IsTerminating property

```csharp
public bool IsTerminating { get; }
```

Gets a value that indicates whether the common language runtime is terminating.

Returns: `true` if the runtime is terminating; otherwise, `false`.

This property returns `true` for most unhandled exceptions. The reason is that most unhandled exceptions in threads, including thread pool threads, are allowed to proceed naturally, which normally results in termination of the application. For more information, including a list of cases in which the runtime does not terminate, see Exceptions in Managed Threads.
