---
title: "NativeOverlapped struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Threading/NativeOverlapped.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NativeOverlapped struct

Namespace: `System.Threading`

```csharp
public struct NativeOverlapped
```

Provides an explicit layout that is visible from unmanaged code and that will have the same layout as the Win32 OVERLAPPED structure with additional reserved fields at the end.

#### Remarks
The `NativeOverlapped` value type represents an unmanaged version of the Win32 OVERLAPPED structure. The layout of this structure must be identical to OVERLAPPED. Four additional DWORDs are reserved at the end.

## NativeOverlapped.EventHandle field

```csharp
public IntPtr EventHandle;
```

Specifies the handle to an event set to the signaled state when the operation is complete. The calling process must set this member either to zero or to a valid event handle before calling any overlapped functions.

To be added.

## NativeOverlapped.InternalHigh field

```csharp
public IntPtr InternalHigh;
```

Specifies the length of the data transferred. Reserved for operating system use.

To be added.

## NativeOverlapped.InternalLow field

```csharp
public IntPtr InternalLow;
```

Specifies a system-dependent status. Reserved for operating system use.

To be added.

## NativeOverlapped.OffsetHigh field

```csharp
public int OffsetHigh;
```

Specifies the high word of the byte offset at which to start the transfer.

#### Remarks
This member is ignored when reading from or writing to named pipes and communications devices and in those cases its value should be zero.

## NativeOverlapped.OffsetLow field

```csharp
public int OffsetLow;
```

Specifies a file position at which to start the transfer.

#### Remarks
The file position is a byte offset from the start of the file. The calling process sets this member before calling the OR function. This member is ignored when reading from or writing to named pipes and communications devices, and in those cases its value should be zero.
