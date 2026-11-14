---
title: "SafeSocketHandle class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Sockets/SafeSocketHandle.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SafeSocketHandle class

Namespace: `System.Net.Sockets`

```csharp
public sealed class SafeSocketHandle : Microsoft.Win32.SafeHandles.SafeHandleMinusOneIsInvalid
```

Represents a wrapper class for a socket handle.

#### Remarks

This class is derived from `SafeHandleZeroOrMinusOneIsInvalid`. A value of 0 or -1 is an invalid socket handle.

## SafeSocketHandle.SafeSocketHandle() constructor

```csharp
public SafeSocketHandle ();
```

Creates a `SafeSocketHandle`.

To be added.

## SafeSocketHandle.SafeSocketHandle(IntPtr, Boolean) constructor

```csharp
public SafeSocketHandle (IntPtr preexistingHandle, bool ownsHandle);
```

Initializes a new instance of the `SafeSocketHandle` class.

Parameters:

- `preexistingHandle`: The pre-existing handle to use.
- `ownsHandle`: `true` to reliably release the handle during the finalization phase; `false` to prevent reliable release (not recommended).

To be added.

## SafeSocketHandle.IsInvalid property

```csharp
public override bool IsInvalid { get; }
```

Gets a value indicating whether the handle value is invalid.

Returns: `true` if the handle value is invalid; otherwise, `false`.

To be added.

## SafeSocketHandle.ReleaseHandle() method

```csharp
protected override bool ReleaseHandle ();
```

To be added.

Returns: To be added.

To be added.
