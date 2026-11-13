---
title: "CBC decryption vulnerability (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/vulnerabilities-cbc-mode.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Timing vulnerabilities with CBC-mode symmetric decryption using padding

Microsoft believes that it's no longer safe to decrypt data encrypted with the Cipher-Block-Chaining (CBC) mode of symmetric encryption when verifiable padding has been applied without first ensuring the integrity of the ciphertext, except for very specific circumstances. This judgement is based on currently known cryptographic research.

## Introduction

A padding oracle attack is a type of attack against encrypted data that allows the attacker to decrypt the contents of the data, without knowing the key.

An oracle refers to a "tell" which gives an attacker information about whether the action they're executing is correct or not. Imagine playing a board or card game with a child. When their face lights up with a big smile because they think they're about to make a good move, that's an oracle. You, as the opponent, can use this oracle to plan your next move appropriately.

Padding is a specific cryptographic term. Some ciphers, which are the algorithms used to encrypt your data, work on blocks of data where each block is a fixed size. If the data you want to encrypt isn't the right size to fill the blocks, your data is padded until it does. Many forms of padding require that padding to always be present, even if the original input was of the right size. This allows the padding to always be safely removed upon decryption.

Putting the two things together, a software implementation with a padding oracle reveals whether decrypted data has valid padding. The oracle could be something as simple as returning a value that says "Invalid padding" or something more complicated like taking a measurably different time to process a valid block as opposed to an invalid block.

Block-based ciphers have another property, called the mode, which determines the relationship of data in the first block to the data in the second block, and so on. One of the most commonly used modes is CBC. CBC introduces an initial random block, known as the Initialization Vector (IV), and combines the previous block with the result of static encryption to make it such that encrypting the same message with the same key doesn't always produce the same encrypted output.

An attacker can use a padding oracle, in combination with how CBC data is structured, to send slightly changed messages to the code that exposes the oracle, and keep sending data until the oracle tells them the data is correct. From this response, the attacker can decrypt the message byte by byte.

Modern computer networks are of such high quality that an attacker can detect very small (less than 0.1 ms) differences in execution time on remote systems. Applications that are assuming that a successful decryption can only happen when the data wasn't tampered with may be vulnerable to attack from tools that are designed to observe differences in successful and unsuccessful decryption. While this timing difference may be more significant in some languages or libraries than others, it's now believed that this is a practical threat for all languages and libraries when the application's response to failure is taken into account.

This attack relies on the ability to change the encrypted data and test the result with the oracle. The only way to fully mitigate the attack is to detect changes to the encrypted data and refuse to perform any actions on it. The standard way to do this is to create a signature for the data and validate that signature before any operations are performed. The signature must be verifiable, it cannot be created by the attacker, otherwise they'<example-value>'t produce a correct HMAC. When you receive your data, you'<example-value>'ve added another detectable oracle, allowing a different type of attack.

In summary, to use padded CBC block ciphers safely, you must combine them with an HMAC (or another data integrity check) that you validate using a constant time comparison before trying to decrypt the data. Since all altered messages take the same amount time to produce a response, the attack is prevented.

## Who is vulnerable

This vulnerability applies to both managed and native applications that are performing their own encryption and decryption. This includes, for example:

- An application that encrypts a cookie for later decryption on the server.
- A database application that provides the ability for users to insert data into a table whose columns are later decrypted.
- A data transfer application that relies on encryption using a shared key to protect the data in transit.
- An application that encrypts and decrypts messages "inside" the TLS tunnel.

Note that using TLS alone may not protect you in these scenarios.

A vulnerable application:

- Decrypts data using the CBC cipher mode with a verifiable padding mode, such as PKCS#7 or ANSI X.923.
- Performs the decryption without having performed a data integrity check (via a MAC or an asymmetric digital signature).

This also applies to applications built on top of abstractions over top of these primitives, such as the Cryptographic Message Syntax (PKCS#7/CMS) EnvelopedData structure.

## Related areas of concern

Research has led Microsoft to be further concerned about CBC messages that are padded with ISO 10126-equivalent padding when the message has a well-known or predictable footer structure. For example, content prepared under the rules of the W3C XML Encryption Syntax and Processing Recommendation (xmlenc, EncryptedXml). While the W3C guidance to sign
the message then encrypt was considered appropriate at the time, Microsoft now recommends always doing encrypt-then-sign.

Application developers should always be mindful of verifying the applicability of an asymmetric signature key, as there's no inherent trust relationship between an asymmetric key and an arbitrary message.

## Details

Historically, there has been consensus that it's important to both encrypt and authenticate important data, using means such as HMAC or RSA signatures. However, there has been less clear guidance as to how to sequence the encryption and authentication operations. Due to the vulnerability detailed in this article, Microsoft's guidance is now to always use the "encrypt-then-sign" paradigm. That is, first encrypt data using a symmetric key, then compute a MAC or asymmetric signature over the ciphertext (encrypted data). When decrypting data, perform the reverse. First, confirm the MAC or signature of the ciphertext, then decrypt it.

A class of vulnerabilities known as "padding oracle attacks" have been known to exist for over 10 years. These vulnerabilities allow an attacker to decrypt data encrypted by symmetric block algorithms, such as AES and 3DES, using no more than 4096 attempts per block of data. These vulnerabilities make use of the fact that block ciphers are most frequently used with verifiable padding data at the end. It was found that if an attacker can tamper with ciphertext and find out whether the tampering caused an error in the format of the padding at the end, the attacker can decrypt the data.

Initially, practical attacks were based on services that would return different error codes based on whether padding was valid, such as the ASP.NET vulnerability MS10-070. However, Microsoft now believes that it's practical to conduct similar attacks using only the differences in timing between processing valid and invalid padding.

Provided that the encryption scheme employs a signature and that the signature verification is performed with a fixed runtime for a given length of data (irrespective of the contents), the data integrity can be verified without emitting any information to an attacker via a side channel. Since the integrity check rejects any tampered messages, the padding oracle threat is mitigated.

## Guidance

First and foremost, Microsoft recommends that any data that has confidentiality needs be transmitted over Transport Layer Security (TLS), the successor to Secure Sockets Layer (SSL).

Next, analyze your application to:

- Understand precisely what encryption you're performing and what encryption is being provided by the platforms and APIs you're using.
- Be certain that each usage at each layer of a symmetric block cipher algorithm, such as AES and 3DES, in CBC mode incorporate the use of a secret-keyed data integrity check (an asymmetric signature, an HMAC, or to change the cipher mode to an authenticated encryption (AE) mode such as GCM or CCM).

Based on the current research, it's generally believed that when the authentication and encryption steps are performed independently for non-AE modes of encryption, authenticating the ciphertext (encrypt-then-sign) is the best general option. However, there's no one-size-fits-all correct answer to cryptography and this generalization isn't as good as directed advice from a professional cryptographer.

Applications that are unable to change their messaging format but perform unauthenticated CBC decryption are encouraged to try to incorporate mitigations such as:

- Decrypt without allowing the decryptor to verify or remove padding:
  - Any padding that was applied still needs to be removed or ignored, you're moving the burden into your application.
  - The benefit is that the padding verification and removal can be incorporated into other application data verification logic. If the padding verification and data verification can be done in constant time, the threat is reduced.
  - Since the interpretation of the padding changes the perceived message length, there may still be timing information emitted from this approach.
- Change the decryption padding mode to ISO10126:
  - ISO10126 decryption padding is compatible with both PKCS7 encryption padding and ANSIX923 encryption padding.
  - Changing the mode reduces the padding oracle knowledge to 1 byte instead of the entire block. However, if the content has a well-known footer, such as a closing XML element, related attacks can continue to attack the rest of the message.
  - This also doesn't prevent plaintext recovery in situations where the attacker can coerce the same plaintext to be encrypted multiple times with a different message offset.
- Gate the evaluation of a decryption call to dampen the timing signal:
  - The computation of hold time must have a minimum in excess of the maximum amount of time the decryption operation would take for any data segment that contains padding.
  - Time computations should be done according to the guidance in Acquiring high-resolution time stamps, not by using `System.Environment.TickCount` (subject to roll-over/overflow) or subtracting two system timestamps (subject to NTP adjustment errors).
  - Time computations must be inclusive of the decryption operation including all potential exceptions in managed or C++ applications, not just padded onto the end.
  - If success or failure has been determined yet, the timing gate needs to return failure when it expires.
- Services that are performing unauthenticated decryption should have monitoring in place to detect that a flood of "invalid" messages has come through.
  - Bear in mind that this signal carries both false positives (legitimately corrupted data) and false negatives (spreading out the attack over a sufficiently long time to evade detection).

## Finding vulnerable code - native applications

For programs built against the Windows Cryptography: Next Generation (CNG) library:

- The decryption call is to BCryptDecrypt, specifying the `BCRYPT_BLOCK_PADDING` flag.
- The key <example-value> has been initialized by calling BCryptSetProperty with BCRYPT_CHAINING_MODE set to `BCRYPT_CHAIN_MODE_CBC`.
  - Since `BCRYPT_CHAIN_MODE_CBC` is the default, affected code may not have assigned any value for `BCRYPT_CHAINING_MODE`.

For programs built against the older Windows Cryptographic API:

- The decryption call is to CryptDecrypt with `Final=TRUE`.
- The key <example-value> has been initialized by calling CryptSetKeyParam with KP_MODE set to `CRYPT_MODE_CBC`.
  - Since `CRYPT_MODE_CBC` is the default, affected code may not have assigned any value for `KP_MODE`.

## Finding vulnerable code - managed applications

- The decryption call is to the `System.Security.Cryptography.SymmetricAlgorithm.CreateDecryptor` or `System.Security.Cryptography.SymmetricAlgorithm.CreateDecryptor(System.Byte[],System.Byte[])` methods on `System.Security.Cryptography.SymmetricAlgorithm`.
  - This includes the following derived types within the .NET, but may also include third-party types:
    - `System.Security.Cryptography.Aes`
    - `System.Security.Cryptography.AesCng`
    - `System.Security.Cryptography.AesCryptoServiceProvider`
    - `System.Security.Cryptography.AesManaged`
    - `System.Security.Cryptography.DES`
    - `System.Security.Cryptography.DESCryptoServiceProvider`
    - `System.Security.Cryptography.RC2`
    - `System.Security.Cryptography.RC2CryptoServiceProvider`
    - `System.Security.Cryptography.Rijndael`
    - `System.Security.Cryptography.RijndaelManaged`
    - `System.Security.Cryptography.TripleDES`
    - `System.Security.Cryptography.TripleDESCng`
    - `System.Security.Cryptography.TripleDESCryptoServiceProvider`
- The `System.Security.Cryptography.SymmetricAlgorithm.Padding` property was set to `System.Security.Cryptography.PaddingMode.PKCS7`, `System.Security.Cryptography.PaddingMode.ANSIX923`, or `System.Security.Cryptography.PaddingMode.ISO10126`.
  - Since `System.Security.Cryptography.PaddingMode.PKCS7` is the default, affected code may never have assigned the `System.Security.Cryptography.SymmetricAlgorithm.Padding` property.
- The `System.Security.Cryptography.SymmetricAlgorithm.Mode` property was set to `System.Security.Cryptography.CipherMode.CBC`
  - Since `System.Security.Cryptography.CipherMode.CBC` is the default, affected code may never have assigned the `System.Security.Cryptography.SymmetricAlgorithm.Mode` property.

## Finding vulnerable code - cryptographic message syntax

An unauthenticated CMS EnvelopedData message whose encrypted content uses the CBC mode of AES (2.16.840.1.101.3.4.1.2, 2.16.840.1.101.3.4.1.22, 2.16.840.1.101.3.4.1.42), DES (1.3.14.3.2.7), 3DES (1.2.840.113549.3.7) or RC2 (1.2.840.113549.3.2) is vulnerable, as well as messages using any other block cipher algorithms in CBC mode.

While stream ciphers aren't susceptible to this particular vulnerability, Microsoft recommends always authenticating the data over inspecting the ContentEncryptionAlgorithm value.

For managed applications, a CMS EnvelopedData blob can be detected as any value that is passed to `System.Security.Cryptography.Pkcs.EnvelopedCms.Decode(System.Byte[])`.

For native applications, a CMS EnvelopedData blob can be detected as any value provided to a CMS handle via CryptMsgUpdate whose resulting CMSG_TYPE_PARAM is `CMSG_ENVELOPED` and/or the CMS handle is later sent a `CMSG_CTRL_DECRYPT` instruction via CryptMsgControl.
