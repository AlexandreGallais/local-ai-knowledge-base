---
title: "CngUIProtectionLevels enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngUIProtectionLevels.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngUIProtectionLevels enum

Namespace: `System.Security.Cryptography`

```csharp
public enum CngUIProtectionLevels
```

Specifies the protection level for the key in user interface (UI) prompting scenarios.

To be added.

## CngUIProtectionLevels.ForceHighProtection field

```csharp
ForceHighProtection
```

A UI prompt is displayed every time the key is accessed.

## CngUIProtectionLevels.None field

```csharp
None
```

No UI prompt is displayed when the key is accessed.

## CngUIProtectionLevels.ProtectKey field

```csharp
ProtectKey
```

A UI prompt is displayed the first time the key is accessed in a process.
