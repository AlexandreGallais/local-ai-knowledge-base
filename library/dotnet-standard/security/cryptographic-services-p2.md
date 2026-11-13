---
title: "Overview of encryption, signatures, and hash algorithms in .NET (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/cryptographic-services.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Overview of encryption, signatures, and hash algorithms in .NET (part 2 of 2)

## Hash Values

Hash algorithms map binary values of an arbitrary length to smaller binary values of a fixed length, known as hash values. A hash value is a numerical representation of a piece of data. If you hash a paragraph of plaintext and change even one letter of the paragraph, a subsequent hash will produce a different value. If the hash is cryptographically strong, its value will change significantly. For example, if a single bit of a message is changed, a strong hash function may produce an output that differs by 50 percent. Many input values may hash to the same output value. However, it is computationally infeasible to find two distinct inputs that hash to the same value.

Two parties (Alice and Bob) could use a hash function to ensure message integrity. They would select a hash algorithm to sign their messages. Alice would write a message, and then create a hash of that message by using the selected algorithm. They would then follow one of the following methods:

- Alice sends the plaintext message and the hashed message (digital signature) to Bob. Bob receives and hashes the message and compares his hash value to the hash value that he received from Alice. If the hash values are identical, the message was not altered. If the values are not identical, the message was altered after Alice wrote it.

  Unfortunately, this method does not establish the authenticity of the sender. Anyone can impersonate Alice and send a message to Bob. They can use the same hash algorithm to sign their message, and all Bob can determine is that the message matches its signature. This is one form of a man-in-the-middle attack. For more information, see Cryptography Next Generation (CNG) Secure Communication Example.

- Alice sends the plaintext message to Bob over a nonsecure public channel. She sends the hashed message to Bob over a secure private channel. Bob receives the plaintext message, hashes it, and compares the hash to the privately exchanged hash. If the hashes match, Bob knows two things:

  - The message was not altered.

  - The sender of the message (Alice) is authentic.

  For this system to work, Alice must hide her original hash value from all parties except Bob.

- Alice sends the plaintext message to Bob over a nonsecure public channel and places the hashed message on her publicly viewable Web site.

  This method prevents message tampering by preventing anyone from modifying the hash value. Although the message and its hash can be read by anyone, the hash value can be changed only by Alice. An attacker who wants to impersonate Alice would require access to Alice's Web site.

None of the previous methods will prevent someone from reading Alice's messages, because they are transmitted in plaintext. Full security typically requires digital signatures (message signing) and encryption.

.NET provides the following classes that implement hashing algorithms:

- `System.Security.Cryptography.SHA256`.

- `System.Security.Cryptography.SHA384`.

- `System.Security.Cryptography.SHA512`.

.NET also provides `System.Security.Cryptography.MD5` and `System.Security.Cryptography.SHA1`. But the MD5 and SHA-1 algorithms have been found to be insecure, and SHA-2 is now recommended instead. SHA-2 includes SHA256, SHA384, and SHA512.

## Random Number Generation

Random number generation is integral to many cryptographic operations. For example, cryptographic keys need to be as random as possible so that it is infeasible to reproduce them. Cryptographic random number generators must generate output that is computationally infeasible to predict with a probability that is better than one half. Therefore, any method of predicting the next output bit must not perform better than random guessing. The classes in .NET use random number generators to generate cryptographic keys.

The `System.Security.Cryptography.RandomNumberGenerator` class is an implementation of a random number generator algorithm.

On browser WebAssembly, the static `System.Security.Cryptography.RandomNumberGenerator` methods and the default implementation returned by `System.Security.Cryptography.RandomNumberGenerator.Create` obtain random bytes through the browser's Web Crypto API `crypto.getRandomValues()` method. The security of the generated values depends on the browser implementing this API correctly.

## ClickOnce Manifests

The following cryptography classes let you obtain and verify information about manifest signatures for applications that are deployed using ClickOnce technology:

- The `System.Security.Cryptography.ManifestSignatureInformation` class obtains information about a manifest signature when you use its `System.Security.Cryptography.ManifestSignatureInformation.VerifySignature*` method overloads.

- You can use the `System.Security.ManifestKinds` enumeration to specify which manifests to verify. The result of the verification is one of the `System.Security.Cryptography.SignatureVerificationResult` enumeration values.

- The `System.Security.Cryptography.ManifestSignatureInformationCollection` class provides a read-only collection of `System.Security.Cryptography.ManifestSignatureInformation` objects of the verified signatures.

In addition, the following classes provide specific signature information:

- `System.Security.Cryptography.StrongNameSignatureInformation` holds the strong name signature information for a manifest.

- `System.Security.Cryptography.X509Certificates.AuthenticodeSignatureInformation` represents the Authenticode signature information for a manifest.

- `System.Security.Cryptography.X509Certificates.TimestampInformation` contains information about the time stamp on an Authenticode signature.

- `System.Security.Cryptography.X509Certificates.TrustStatus` provides a simple way to check whether an Authenticode signature is trusted.

## Cryptography Next Generation (CNG) Classes

The Cryptography Next Generation (CNG) classes provide a managed wrapper around the native CNG functions. (CNG is the replacement for CryptoAPI.) These classes have "Cng" as part of their names. Central to the CNG wrapper classes is the `System.Security.Cryptography.CngKey` key container class, which abstracts the storage and use of CNG keys. This class lets you store a key pair or a public key securely and refer to it by using a simple string name. The elliptic curve-based `System.Security.Cryptography.ECDsaCng` signature class and the `System.Security.Cryptography.ECDiffieHellmanCng` encryption class can use `System.Security.Cryptography.CngKey` objects.

The `System.Security.Cryptography.CngKey` class is used for a variety of additional operations, including opening, creating, deleting, and exporting keys. It also provides access to the underlying key handle to use when calling native functions directly.

.NET also includes a variety of supporting CNG classes, such as the following:

- `System.Security.Cryptography.CngProvider` maintains a key storage provider.

- `System.Security.Cryptography.CngAlgorithm` maintains a CNG algorithm.

- `System.Security.Cryptography.CngProperty` maintains frequently used key properties.

## See also

- Cryptography Model - Describes how cryptography is implemented in the base class library.
- Cross-Platform Cryptography
- Timing vulnerabilities with CBC-mode symmetric decryption using padding
- ASP.NET Core Data Protection
