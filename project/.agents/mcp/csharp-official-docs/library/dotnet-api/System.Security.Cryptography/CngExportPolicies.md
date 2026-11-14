---
title: "CngExportPolicies enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/CngExportPolicies.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CngExportPolicies enum

Namespace: `System.Security.Cryptography`

```csharp
public enum CngExportPolicies
```

Specifies the key <example-value> policies for a key.

#### Remarks
This class is used by the `ExportPolicy` property and the `CngKeyCreationParameters` class.

## CngExportPolicies.AllowArchiving field

```csharp
AllowArchiving
```

The private key can be exported one time for archiving purposes.

## CngExportPolicies.AllowExport field

```csharp
AllowExport
```

The private key can be exported multiple times.

## CngExportPolicies.AllowPlaintextArchiving field

```csharp
AllowPlaintextArchiving
```

The private key can be exported one time as plaintext.

## CngExportPolicies.AllowPlaintextExport field

```csharp
AllowPlaintextExport
```

The private key can be exported multiple times as plaintext.

## CngExportPolicies.None field

```csharp
None
```

The key is not exportable.
