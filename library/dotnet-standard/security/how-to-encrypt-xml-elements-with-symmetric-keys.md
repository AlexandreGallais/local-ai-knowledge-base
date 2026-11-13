---
title: "How to: Encrypt XML Elements with Symmetric Keys (part 1 of 6)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-encrypt-xml-elements-with-symmetric-keys.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Encrypt XML Elements with Symmetric Keys

You can use the classes in the `System.Security.Cryptography.Xml` namespace to encrypt an element within an XML document.  XML Encryption allows you to store or transport sensitive XML, without worrying about the data being easily read.  This procedure encrypts an XML element using the Advanced Encryption Standard (AES) algorithm.

 For information about how to decrypt an XML element that was encrypted using this procedure, see How to: Decrypt XML Elements with Symmetric Keys.

 When you use a symmetric algorithm like AES to encrypt XML data, you must use the same key to encrypt and decrypt the XML data.  The example in this procedure assumes that the encrypted XML will be decrypted using the same key, and that the encrypting and decrypting parties agree on the algorithm and key to use.  This example does not store or encrypt the AES key within the encrypted XML.

 This example is appropriate for situations where a single application needs to encrypt data based on a session key stored in memory, or based on a cryptographically strong key derived from a password.  For situations where two or more applications need to share encrypted XML data, consider using an encryption scheme based on an asymmetric algorithm or an X.509 certificate.
