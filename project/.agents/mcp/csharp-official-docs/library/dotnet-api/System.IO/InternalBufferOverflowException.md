---
title: "InternalBufferOverflowException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/InternalBufferOverflowException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InternalBufferOverflowException class

Namespace: `System.IO`

```csharp
public class InternalBufferOverflowException : SystemException
```

The exception thrown when the internal buffer overflows.

#### Remarks
In a `FileSystemWatcher`, when you are notified of file changes, the system stores those changes in a buffer the component creates and passes to the Application Programming Interfaces (APIs). If there are many changes in a short time, the buffer can easily overflow, resulting in an exception being thrown, which essentially loses all changes. To keep the buffer from overflowing, use the `FileSystemWatcher.NotifyFilter` and `FileSystemWatcher.IncludeSubdirectories` properties to filter out your unwanted change notifications. You can also increase the size of the internal buffer through the `InternalBufferSize` property. However, increasing the size of the buffer is expensive, so keep the buffer as small as possible.

#### Examples
The following example shows how to create a FileSystemWatcher to monitor file changes (creates, deletes, renames, changes) occurring on a disk drive. The example also shows how to properly receive error notifications.

_Code sample not included: ~/snippets/csharp/System.IO/ErrorEventArgs/Overview/filesystemwatcher.cs._

## InternalBufferOverflowException.InternalBufferOverflowException() constructor

```csharp
public InternalBufferOverflowException ();
```

Initializes a new default instance of the `InternalBufferOverflowException` class.

#### Remarks
These constructors are used by the component to signify an error. Only use them if you're extending the class. This exception indicates an internal buffer has overflowed and users should take appropriate steps in their code to ensure it recovers properly. The cause of the overflow is often too many changes in a short period of time, causing the internal notification buffer to overflow. To resolve this, use the `FileSystemWatcher.NotifyFilter` and `FileSystemWatcher.IncludeSubdirectories` properties to filter out unwanted change notifications. You can also increase the size of the internal buffer through the `InternalBufferSize` property. However, increasing the size of the buffer is expensive, so keep the buffer as small as possible.

## InternalBufferOverflowException.InternalBufferOverflowException(String) constructor

```csharp
public InternalBufferOverflowException (string? message);
```

Initializes a new instance of the `InternalBufferOverflowException` class with the error message to be displayed specified.

Parameters:

- `message`: The message to be given for the exception.

#### Remarks
These constructors are used by the component to signify an error. Only use them if you're extending the class. This exception indicates an internal buffer has overflowed and users should take appropriate steps in their code to ensure it recovers properly. The cause of the overflow is often too many changes in a short period of time, causing the internal notification buffer to overflow. To resolve this, use the `FileSystemWatcher.NotifyFilter` and `FileSystemWatcher.IncludeSubdirectories` properties to filter out unwanted change notifications. You can also increase the size of the internal buffer through the `InternalBufferSize` property. However, increasing the size of the buffer is expensive, so keep the buffer as small as possible.

## InternalBufferOverflowException.InternalBufferOverflowException(SerializationInfo, StreamingContext) constructor

```csharp
protected InternalBufferOverflowException (System.Runtime.Serialization.SerializationInfo info, System.Runtime.Serialization.StreamingContext context);
```

Initializes a new, empty instance of the `InternalBufferOverflowException` class that is serializable using the specified `SerializationInfo` and `StreamingContext` objects.

Parameters:

- `info`: The information required to serialize the `InternalBufferOverflowException` object.
- `context`: The source and destination of the serialized stream associated with the `InternalBufferOverflowException` object.

To be added.

## InternalBufferOverflowException.InternalBufferOverflowException(String, Exception) constructor

```csharp
public InternalBufferOverflowException (string? message, Exception? inner);
```

Initializes a new instance of the `InternalBufferOverflowException` class with the message to be displayed and the generated inner exception specified.

Parameters:

- `message`: The message to be given for the exception.
- `inner`: The inner exception.

#### Remarks
These constructors are used by the component to signify an error. Only use them if you're extending the class. This exception indicates an internal buffer has overflowed and users should take appropriate steps in their code to ensure it recovers properly. The cause of the overflow is often too many changes in a short period of time, causing the internal notification buffer to overflow. To resolve this, use the `FileSystemWatcher.NotifyFilter` and `FileSystemWatcher.IncludeSubdirectories` properties to filter out unwanted change notifications. You can also increase the size of the internal buffer through the `InternalBufferSize` property. However, increasing the size of the buffer is expensive, so keep the buffer as small as possible.
