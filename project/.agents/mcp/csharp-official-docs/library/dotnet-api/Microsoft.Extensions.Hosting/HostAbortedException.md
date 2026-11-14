---
title: "HostAbortedException class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Hosting/HostAbortedException.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HostAbortedException class

Namespace: `Microsoft.Extensions.Hosting`

```csharp
public sealed class HostAbortedException : Exception
```

The exception that is thrown when an `IHost` is stopped to indicate the Host is stopping gracefully.  This exception should not be thrown or handled by user code.

To be added.

## HostAbortedException.HostAbortedException() constructor

```csharp
public HostAbortedException ();
```

Initializes a new instance of the `HostAbortedException` class
with a system-supplied error message.

To be added.

## HostAbortedException.HostAbortedException(String) constructor

```csharp
public HostAbortedException (string? message);
```

Initializes a new instance of the `HostAbortedException` class
with a specified error message.

Parameters:

- `message`: The error message that explains the reason for the exception.

The content of `message` is intended to be understood by humans.
The caller of this constructor is required to ensure that this string has been localized for the
current system culture.

## HostAbortedException.HostAbortedException(String, Exception) constructor

```csharp
public HostAbortedException (string? message, Exception? innerException);
```

Initializes a new instance of the `HostAbortedException` class
with a specified error message and a reference to the inner exception that
is the cause of this exception.

Parameters:

- `message`: The error message that explains the reason for the exception.
- `innerException`: The exception that is the cause of the current exception.

The content of `message` is intended to be understood by humans.
The caller of this constructor is required to ensure that this string has been localized for the
current system culture.
