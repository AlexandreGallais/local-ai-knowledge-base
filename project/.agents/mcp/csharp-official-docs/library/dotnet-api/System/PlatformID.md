---
title: "PlatformID enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/PlatformID.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PlatformID enum

Namespace: `System`

```csharp
public enum PlatformID
```

Identifies the operating system, or platform, supported by an assembly.

#### Remarks
Use the `Environment.OSVersion` and `OperatingSystem.Platform` properties to obtain the `PlatformID` enumeration for the currently executing operating system or development platform. Use the `PlatformID` enumeration to help determine whether the current operating system or development platform supports your application.

You can use the underlying integer value of each `PlatformID` enumeration member as the `PlatformId` argument for the SignTool.exe (Sign Tool) utility.

#### Examples
The following example demonstrates using the `PlatformID` class to identify the currently executing operating system:

_Code sample not included: ~/snippets/csharp/System/PlatformID/Overview/pid.cs._

## PlatformID.MacOSX field

```csharp
MacOSX
```

The operating system is Macintosh. This value was returned by Silverlight. Its replacement is `Unix`.

## PlatformID.Other field

```csharp
Other
```

Any other operating system. This includes Browser (WASM).

## PlatformID.Unix field

```csharp
Unix
```

The operating system is Unix.

## PlatformID.Win32NT field

```csharp
Win32NT
```

The operating system is Windows NT or later.

## PlatformID.Win32S field

```csharp
Win32S
```

The operating system is Win32s. This value is no longer in use.

## PlatformID.Win32Windows field

```csharp
Win32Windows
```

The operating system is Windows 95 or Windows 98. This value is no longer in use.

## PlatformID.WinCE field

```csharp
WinCE
```

The operating system is Windows CE. This value is no longer in use.

## PlatformID.Xbox field

```csharp
Xbox
```

The development platform is Xbox 360. This value is no longer in use.
