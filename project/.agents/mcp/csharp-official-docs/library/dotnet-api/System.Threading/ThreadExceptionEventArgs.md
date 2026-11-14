---
title: "ThreadExceptionEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/ThreadExceptionEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ThreadExceptionEventArgs class

Namespace: `System.Threading`

```csharp
public class ThreadExceptionEventArgs : EventArgs
```

Provides data for the `Application.ThreadException` event.

#### Remarks
A `ThreadExceptionEventArgs` is created by a thread when an unhandled exception occurs. `ThreadExceptionEventArgs` contains the `Exception` that occurred.

#### Examples
The following example allows you to raise a `ThreadException` event by clicking `button1` on a form. The example creates two classes. The `ErrorHandler` class creates the form and the button that raises the event. The `CustomExceptionHandler` class provides the methods to handle the exception.

In `Main` in the `ErrorHandler` class, the code creates a new instance of the exception handling class, that is, an instance of the `CustomExceptionHandler`. Then the instance is added to the event, and the application is run.

In the `OnThreadException` method in the `CustomExceptionHandler` class, the example uses a `try...catch...finally` statement to process the exception. The `ShowThreadExceptionDialog` method creates the message to display, and displays it in a message box.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadExceptionEventArgs/Overview/source.cs._

## ThreadExceptionEventArgs.ThreadExceptionEventArgs(Exception) constructor

```csharp
public ThreadExceptionEventArgs (Exception t);
```

Initializes a new instance of the `ThreadExceptionEventArgs` class.

Parameters:

- `t`: The `Exception` that occurred.

#### Examples
The following example allows you to raise a `ThreadException` event by clicking `button1` on a form. The example creates two classes. The `ErrorHandler` class creates the form and the button that raises the event. The `CustomExceptionHandler` class provides the methods to handle the exception.

In `Main` in the `ErrorHandler` class, the code creates a new instance of the exception handling class, that is, an instance of the `CustomExceptionHandler`. Then the instance is added to the event, and the application is run.

In the `OnThreadException` method in the `CustomExceptionHandler` class, the example uses a `try...catch...finally` statement to process the exception. The `ShowThreadExceptionDialog` method creates the message to display, and displays it in a message box.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadExceptionEventArgs/Overview/source.cs._

## ThreadExceptionEventArgs.Exception property

```csharp
public Exception Exception { get; }
```

Gets the `Exception` that occurred.

Returns: The `Exception` that occurred.

#### Examples
The following example allows you to raise a `ThreadException` event by clicking `button1` on a form. The example creates two classes. The `ErrorHandler` class creates the form and the button that raises the event. The `CustomExceptionHandler` class provides the methods to handle the exception.

In `Main` in the `ErrorHandler` class, the code creates a new instance of the exception handling class, that is, an instance of the `CustomExceptionHandler`. Then the instance is added to the event, and the application is run.

In the `OnThreadException` method in the `CustomExceptionHandler` class, the example uses a `try...catch...finally` statement to process the exception. The `ShowThreadExceptionDialog` method creates the message to display, and displays it in a message box.

_Code sample not included: ~/snippets/csharp/System.Threading/ThreadExceptionEventArgs/Overview/source.cs._
