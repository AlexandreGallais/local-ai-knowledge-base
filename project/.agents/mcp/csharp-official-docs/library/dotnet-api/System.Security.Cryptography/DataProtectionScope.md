---
title: "DataProtectionScope enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/DataProtectionScope.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DataProtectionScope enum

Namespace: `System.Security.Cryptography`

```csharp
public enum DataProtectionScope
```

Specifies the scope of the data protection to be applied by the `ProtectedData.Protect` method.

#### Remarks
This enumeration is used with the `ProtectedData.Protect` and `ProtectedData.Unprotect` methods to protect data through encryption.

**Caution** The LocalMachine enumeration value allows multiple accounts to unprotect data.  Use this value only when you trust every account on a computer.  For most situations, you should use the CurrentUser value.

#### Examples
The following code example shows how to use data protection.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography/DataProtectionScope/Overview/dataprotectionsample.cs._

## DataProtectionScope.CurrentUser field

```csharp
CurrentUser
```

The protected data is associated with the current user. Only threads running under the current user context can unprotect the data.

## DataProtectionScope.LocalMachine field

```csharp
LocalMachine
```

The protected data is associated with the machine context. Any process running on the computer can unprotect data. This enumeration value is usually used in server-specific applications that run on a server where untrusted users are not allowed access.
