---
title: "CngKeyOpenOptions enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngKeyOpenOptions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngKeyOpenOptions enum

Namespace: `System.Security.Cryptography`

```csharp
public enum CngKeyOpenOptions
```

Specifies options for opening a key.

#### Remarks
The Silent option suppresses any UI prompting. This option may not work with some key types, such as smart card keys and keys that are stored in the software key <example-value> provider (KSP). These key types are protected with mandatory UI prompting.

## CngKeyOpenOptions.MachineKey field

```csharp
MachineKey
```

A machine-wide key is opened.

## CngKeyOpenOptions.None field

```csharp
None
```

No key open options are specified.

## CngKeyOpenOptions.Silent field

```csharp
Silent
```

UI prompting is suppressed.

## CngKeyOpenOptions.UserKey field

```csharp
UserKey
```

If the `CngKeyOpenOptions.MachineKey` value is not specified, a user key is opened instead.
