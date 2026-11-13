---
title: ".NET cryptography model"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/cryptography-model.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET cryptography model

.NET provides implementations of many standard cryptographic algorithms.

## Object inheritance

The .NET cryptography system implements an extensible pattern of derived class inheritance. The hierarchy is as follows:

- Algorithm type class, such as `System.Security.Cryptography.SymmetricAlgorithm`, `System.Security.Cryptography.AsymmetricAlgorithm`, or `System.Security.Cryptography.HashAlgorithm`. This level is abstract.

- Algorithm class that inherits from an algorithm type class, for example, `System.Security.Cryptography.Aes`, `System.Security.Cryptography.RSA`, or `System.Security.Cryptography.ECDiffieHellman`. This level is abstract.

- Implementation of an algorithm class that inherits from an algorithm class, for example, `System.Security.Cryptography.AesManaged`, `System.Security.Cryptography.RC2CryptoServiceProvider`, or `System.Security.Cryptography.ECDiffieHellmanCng`. This level is fully implemented.

This pattern of derived classes lets you add a new algorithm or a new implementation of an existing algorithm. For example, to create a new public-key algorithm, you would inherit from the `System.Security.Cryptography.AsymmetricAlgorithm` class. To create a new implementation of a specific algorithm, you would create a non-abstract derived class of that algorithm.

Going forward, this model of inheritance is not used for new kinds of primitives like `System.Security.Cryptography.AesGcm` or `System.Security.Cryptography.Shake128`. These algorithms are `sealed`. If you need an extensibility pattern or abstraction over these types, the implementation of the abstraction is the responsibility of the developer.

## One-shot APIs

Starting in .NET 5, simpler APIs were introduced for hashing and HMAC. While slightly less flexible, these *one-shot* APIs:

- Are easier to use (and less prone to misuse)
- Reduce allocations or are allocation-free
- Are thread safe
- Use the best available implementation for the platform

The hashing and HMAC primitives expose a one-shot API through a static `HashData` method on the type, such as `System.Security.Cryptography.SHA256.HashData*`. The static APIs offer no built-in extensibility mechanism. If you're implementing your own algorithms, it's recommended to also offer similar static APIs of the algorithm.

The `System.Security.Cryptography.RandomNumberGenerator` class also offers static methods for creating or filling buffers with cryptographic random data. These methods always use the platform's cryptographically secure pseudorandom number generator (CSPRNG).

On browser WebAssembly, the static `System.Security.Cryptography.RandomNumberGenerator` methods and the default implementation returned by `System.Security.Cryptography.RandomNumberGenerator.Create` obtain random bytes through the browser's Web Crypto API `crypto.getRandomValues()` method. The security of the generated values depends on the browser implementing this API correctly.

## How algorithms are implemented in .NET

As an example of the different implementations available for an algorithm, consider symmetric algorithms. The base for all symmetric algorithms is `System.Security.Cryptography.SymmetricAlgorithm`, which is inherited by `System.Security.Cryptography.Aes`, `System.Security.Cryptography.TripleDES`, and others that are no longer recommended.

`System.Security.Cryptography.Aes` is inherited by `System.Security.Cryptography.AesCryptoServiceProvider`, `System.Security.Cryptography.AesCng`, and `System.Security.Cryptography.AesManaged`.

In .NET Framework on Windows:

* `*CryptoServiceProvider` algorithm classes, such as `System.Security.Cryptography.AesCryptoServiceProvider`, are wrappers around the Windows Cryptography API (CAPI) implementation of an algorithm.
* `*Cng` algorithm classes, such as `System.Security.Cryptography.ECDiffieHellmanCng`, are wrappers around the Windows Cryptography Next Generation (CNG) implementation.
* `*Managed` classes, such as `System.Security.Cryptography.AesManaged`, are written entirely in managed code. `*Managed` implementations are not certified by the Federal Information Processing Standards (FIPS), and may be slower than the `*CryptoServiceProvider` and `*Cng` wrapper classes.

In .NET Core and .NET 5 and later versions, all implementation classes (`*CryptoServiceProvider`, `*Managed`, and `*Cng`) are wrappers for the operating system (OS) algorithms. If the OS algorithms are FIPS-certified, then .NET uses FIPS-certified algorithms. For more information, see Cross-Platform Cryptography.

In most cases, you don't need to directly reference an algorithm implementation class, such as `AesCryptoServiceProvider`. The methods and properties you typically need are on the base algorithm class, such as `Aes`. Create an instance of a default implementation class by using a factory method on the base algorithm class, and refer to the base algorithm class. For example, see the highlighted line of code in the following example:

```csharp
﻿using System.Security.Cryptography;

try
{
    using (FileStream fileStream = new("TestData.txt", FileMode.OpenOrCreate))
    {
        using (Aes aes = Aes.Create())
        {
            byte[] key =
            {
                0x01, 0x02, 0x03, 0x04, 0x05, 0x06, 0x07, 0x08,
                0x09, 0x10, 0x11, 0x12, 0x13, 0x14, 0x15, 0x16
            };
            aes.Key = key;

            byte[] iv = aes.IV;
            fileStream.Write(iv, 0, iv.Length);

            using (CryptoStream cryptoStream = new(
                fileStream,
                aes.CreateEncryptor(),
                CryptoStreamMode.Write))
            {
                // By default, the StreamWriter uses UTF-8 encoding.
                // To change the text encoding, pass the desired encoding as the second parameter.
                // For example, new StreamWriter(cryptoStream, Encoding.Unicode).
                using (StreamWriter encryptWriter = new(cryptoStream))
                {
                    encryptWriter.WriteLine("Hello World!");
                }
            }
        }
    }

    Console.WriteLine("The file was encrypted.");
}
catch (Exception ex)
{
    Console.WriteLine($"The encryption failed. {ex}");
}
```
```vb
﻿Imports System
Imports System.IO
Imports System.Security.Cryptography

Module Module1
    Sub Main()
        Try
            ' Create a file stream
            Using fileStream As New FileStream("TestData.txt", FileMode.OpenOrCreate)

                ' Create a new instance of the default Aes implementation class  
                ' and configure encryption key.
                Using aes As Aes = Aes.Create()
                    'Encryption key used to encrypt the stream.
                    'The same value must be used to encrypt and decrypt the stream.
                    Dim key As Byte() = {
                        &H1, &H2, &H3, &H4, &H5, &H6, &H7, &H8,
                        &H9, &H10, &H11, &H12, &H13, &H14, &H15, &H16
                    }

                    aes.Key = key

                    ' Stores IV at the beginning of the file.
                    ' This information will be used for decryption.
                    Dim iv As Byte() = aes.IV
                    fileStream.Write(iv, 0, iv.Length)

                    ' Create a CryptoStream, pass it the FileStream, and encrypt
                    ' it with the Aes class.
                    Using cryptoStream As New CryptoStream(fileStream, aes.CreateEncryptor(), CryptoStreamMode.Write)

                        ' By default, the StreamWriter uses UTF-8 encoding.
                        ' To change the text encoding, pass the desired encoding as the second parameter.
                        ' For example, New StreamWriter(cryptoStream, Encoding.Unicode).
                        Using sWriter As New StreamWriter(cryptoStream)

                            'Write to the stream.
                            sWriter.WriteLine("Hello World!")
                        End Using
                    End Using
                End Using
            End Using

            'Inform the user that the message was written  
            'to the stream.  
            Console.WriteLine("The text was encrypted.")
        Catch
            'Inform the user that an exception was raised.  
            Console.WriteLine("The encryption failed.")
            Throw
        End Try
    End Sub
End Module
```
## Choose an algorithm

You can select an algorithm for different reasons: for example, for data integrity, for data privacy, or to generate a key. Symmetric and hash algorithms are intended for protecting data for either integrity reasons (protect from change) or privacy reasons (protect from viewing). Hash algorithms are used primarily for data integrity.

Here is a list of recommended algorithms by application:

- Data privacy:
  - `System.Security.Cryptography.Aes`
- Data integrity:
  - `System.Security.Cryptography.HMACSHA256`
  - `System.Security.Cryptography.HMACSHA512`
- Digital signature:
  - `System.Security.Cryptography.ECDsa`
  - `System.Security.Cryptography.RSA`
- Key exchange:
  - `System.Security.Cryptography.ECDiffieHellman`
  - `System.Security.Cryptography.RSA`
- Random number generation:
  - `System.Security.Cryptography.RandomNumberGenerator.GetBytes*`
  - `System.Security.Cryptography.RandomNumberGenerator.Fill*`
- Generating a key from a password:
  - `System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*`

## See also

- Cryptographic Services
- Cross-Platform Cryptography
- ASP.NET Core Data Protection
