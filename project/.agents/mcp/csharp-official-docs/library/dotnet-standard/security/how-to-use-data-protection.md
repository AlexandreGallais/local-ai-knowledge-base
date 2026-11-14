---
title: "How to use data protection (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/how-to-use-data-protection.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to use data protection

> **Note:**
> This article applies to Windows.
>
> For information about ASP.NET Core, see ASP.NET Core Data Protection.

.NET provides access to the data protection API (DPAPI), which lets you encrypt data using information from the current user account or computer. When you use the DPAPI, you avoid the difficult problem of explicitly generating and storing a cryptographic key.

Use the `System.Security.Cryptography.ProtectedData` class to encrypt a copy of an array of bytes. You can specify that only the same user account can decrypt the data, or that any account on the computer can decrypt it. For a detailed description of `System.Security.Cryptography.ProtectedData` options, see the `System.Security.Cryptography.DataProtectionScope` enumeration.

## Encrypt data to a file or stream using data protection

1. Create random entropy.

2. Call the static `System.Security.Cryptography.ProtectedData.Protect*` method while passing an array of bytes to encrypt, the entropy, and the data protection scope.

3. Write the encrypted data to a file or stream.

### To decrypt data from a file or stream using data protection

1. Read the encrypted data from a file or stream.

2. Call the static `System.Security.Cryptography.ProtectedData.Unprotect*` method while passing an array of bytes to decrypt and the data protection scope.
