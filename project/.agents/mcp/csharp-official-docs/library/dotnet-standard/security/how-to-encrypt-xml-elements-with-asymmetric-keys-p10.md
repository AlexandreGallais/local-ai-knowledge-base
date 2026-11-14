---
title: "Encrypt XML elements with asymmetric keys (part 10 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/how-to-encrypt-xml-elements-with-asymmetric-keys.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Encrypt XML elements with asymmetric keys (part 10 of 10)

## .NET security

Never store a symmetric cryptographic key in plaintext or transfer a symmetric key <example-value> machines in plaintext.  Additionally, never store or transfer the private key of an asymmetric key pair in plaintext.  For more information about symmetric and asymmetric cryptographic keys, see Generating Keys for Encryption and Decryption.

> **Tip:**
> For development, use Secret <example-value> for secure secret storage. In production, consider a product like Azure Key Vault.

Never embed a key <example-value> into your source code.  Embedded keys can be easily read from an assembly using the Ildasm.exe (IL Disassembler) or by opening the assembly in a text editor such as Notepad.

When you are done using a cryptographic key, clear it from memory by setting each byte to zero or by calling the `System.Security.Cryptography.SymmetricAlgorithm.Clear*` method of the managed cryptography class.  Cryptographic keys can sometimes be read from memory by a debugger or read from a hard drive if the memory location is paged to disk.

## See also

- Cryptography Model
- Cryptographic Services
- Cross-Platform Cryptography- `System.Security.Cryptography.Xml`
- How to: Decrypt XML Elements with Asymmetric Keys
- ASP.NET Core Data Protection
