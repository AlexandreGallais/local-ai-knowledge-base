---
title: "PosixSignalContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Runtime.InteropServices/PosixSignalContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PosixSignalContext class

Namespace: `System.Runtime.InteropServices`

```csharp
public sealed class PosixSignalContext
```

Provides data for a `PosixSignalRegistration` event.

To be added.

## PosixSignalContext.PosixSignalContext(PosixSignal) constructor

```csharp
public PosixSignalContext (System.Runtime.InteropServices.PosixSignal signal);
```

Initializes a new instance of the `PosixSignalContext` class.

Parameters:

- `signal`: The signal that occurred.

To be added.

## PosixSignalContext.Cancel property

```csharp
public bool Cancel { get; set; }
```

Gets or sets a value that indicates whether to cancel the default handling of the signal. The default is `false`.

Returns: To be added.

To be added.

## PosixSignalContext.Signal property

```csharp
public System.Runtime.InteropServices.PosixSignal Signal { get; }
```

Gets the signal that occurred.

Returns: To be added.

To be added.
