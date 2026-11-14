---
title: "ErrorEventArgs class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/ErrorEventArgs.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ErrorEventArgs class

Namespace: `System.IO`

```csharp
public class ErrorEventArgs : EventArgs
```

Provides data for the `FileSystemWatcher.Error` event.

#### Remarks
`ErrorEventArgs` contains the `Exception` that caused the `Error` event. This class provides the `ErrorEventArgs.GetException` method to retrieve the exception.

#### Examples
The following example creates a new instance of `ErrorEventArgs` and initializes it with an `Exception`. Then the example calls `ErrorEventArgs.GetException` to retrieve the `Exception` and display the error message. There is no form associated with this code.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/source.cs._

The following example shows how to create a FileSystemWatcher to monitor file changes (creates, deletes, renames, changes) occurring on a disk drive. The example also shows how to properly receive error notifications.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

## ErrorEventArgs.ErrorEventArgs(Exception) constructor

```csharp
public ErrorEventArgs (Exception exception);
```

Initializes a new instance of the `ErrorEventArgs` class.

Parameters:

- `exception`: An `Exception` that represents the error that occurred.

#### Examples
The following example creates a new instance of `ErrorEventArgs` and initializes it with an `Exception`. Then the example calls `ErrorEventArgs.GetException` to retrieve the `Exception` and display the error message. There is no form associated with this code.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/.ctor/source.cs._

## ErrorEventArgs.GetException() method

```csharp
public virtual Exception GetException ();
```

Gets the `Exception` that represents the error that occurred.

Returns: An `Exception` that represents the error that occurred.

#### Examples
The following example creates a new instance of `ErrorEventArgs` and initializes it with an `Exception`. Then the example calls `ErrorEventArgs.GetException` to retrieve the `Exception` and display the error message. There is no form associated with this code.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/.ctor/source.cs._
