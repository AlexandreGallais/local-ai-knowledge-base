---
title: "DriveType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.IO/DriveType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DriveType enum

Namespace: `System.IO`

```csharp
public enum DriveType
```

Defines constants for drive types, including CDRom, Fixed, Network, NoRootDirectory, Ram, Removable, and Unknown.

#### Remarks
`DriveType` is used by the `DriveInfo` class to indicate drive type. It can be used with the `DriveType` property.

## DriveType.CDRom field

```csharp
CDRom
```

The drive is an optical disc device, such as a CD or DVD-ROM.

## DriveType.Fixed field

```csharp
Fixed
```

The drive is a fixed disk.

## DriveType.Network field

```csharp
Network
```

The drive is a network drive.

## DriveType.NoRootDirectory field

```csharp
NoRootDirectory
```

The drive does not have a root directory.

## DriveType.Ram field

```csharp
Ram
```

The drive is a RAM disk.

## DriveType.Removable field

```csharp
Removable
```

The drive is a removable storage device, such as a USB flash drive.

## DriveType.Unknown field

```csharp
Unknown
```

The type of drive is unknown.
