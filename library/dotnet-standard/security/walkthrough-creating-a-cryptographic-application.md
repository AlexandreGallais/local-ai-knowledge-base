---
title: "Walkthrough: Create a Cryptographic Application (part 1 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/walkthrough-creating-a-cryptographic-application.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Walkthrough: Create a Cryptographic Application

> **Note:**
> This article applies to Windows.
>
> For information about ASP.NET Core, see ASP.NET Core Data Protection.

This walkthrough demonstrates how to encrypt and decrypt the contents of a file. The code examples are designed for a Windows Forms application. This application does not demonstrate real-world scenarios, such as using smart cards. Instead, it demonstrates the fundamentals of encryption and decryption.

This walkthrough uses the following guidelines for encryption:

- Use the `System.Security.Cryptography.Aes` class, a symmetric algorithm, to encrypt and decrypt data by using its automatically generated `System.Security.Cryptography.SymmetricAlgorithm.Key*` and `System.Security.Cryptography.SymmetricAlgorithm.IV*`.
- Use the `System.Security.Cryptography.RSA` asymmetric algorithm to encrypt and decrypt the key to the data encrypted by `System.Security.Cryptography.Aes`. Asymmetric algorithms are best used for smaller amounts of data, such as a key.

  > **Note:**
  > If you want to protect data on your computer instead of exchanging encrypted content with other people, consider using the `System.Security.Cryptography.ProtectedData` class.

The following table summarizes the cryptographic tasks in this topic.

| Task | Description |
|--|--|
| Create a Windows Forms application | Lists the controls that are required to run the application. |
| Declare global objects | Declares string path variables, the `System.Security.Cryptography.CspParameters`, and the `System.Security.Cryptography.RSACryptoServiceProvider` to have global context of the `System.Windows.Forms.Form` class. |
| Create an asymmetric key | Creates an asymmetric public and private key-value pair and assigns it a key container name. |
| Encrypt a file | Displays a dialog box to select a file for encryption and encrypts the file. |
| Decrypt a file | Displays a dialog box to select an encrypted file for decryption and decrypts the file. |
| Get a private key | Gets the full key pair using the key container name. |
| Export a public key | Saves the key to an XML file with only public parameters. |
| Import a public key | Loads the key from an XML file into the key container. |
| Test the application | Lists procedures for testing this application. |

## Prerequisites

You need the following components to complete this walkthrough:

- References to the `System.IO` and `System.Security.Cryptography` namespaces.

## Create a Windows Forms application

Most of the code examples in this walkthrough are designed to be event handlers for button controls. The following table lists the controls required for the sample application and their required names to match the code examples.

| Control                                    | Name                     | Text property (as needed) |
|--------------------------------------------|--------------------------|---------------------------|
| `System.Windows.Forms.Button`         | `buttonEncryptFile`      | Encrypt File              |
| `System.Windows.Forms.Button`         | `buttonDecryptFile`      | Decrypt File              |
| `System.Windows.Forms.Button`         | `buttonCreateAsmKeys`    | Create Keys               |
| `System.Windows.Forms.Button`         | `buttonExportPublicKey`  | Export Public Key         |
| `System.Windows.Forms.Button`         | `buttonImportPublicKey`  | Import Public Key         |
| `System.Windows.Forms.Button`         | `buttonGetPrivateKey`    | Get Private Key           |
| `System.Windows.Forms.Label`          | `label1`                 | Key not set               |
| `System.Windows.Forms.OpenFileDialog` | `_encryptOpenFileDialog` |                           |
| `System.Windows.Forms.OpenFileDialog` | `_decryptOpenFileDialog` |                           |

Double-click the buttons in the Visual Studio designer to create their event handlers.
