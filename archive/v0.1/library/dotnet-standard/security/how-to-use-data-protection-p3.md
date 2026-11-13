---
title: "How to use data protection (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-use-data-protection.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use data protection (part 3 of 3)

### .NET Framework

This sample compiles and runs when you target .NET Framework on Windows. To compile the sample, add reference to the `System.Security.dll` library.

```csharp
﻿using System;
using System.IO;
using System.Text;
using System.Security.Cryptography;

public class MemoryProtectionSample
{
    public static void Main()
    {
        try
        {
            ///////////////////////////////
            //
            // Memory Encryption - ProtectedMemory
            //
            ///////////////////////////////

            // Create the original data to be encrypted (The data length should be a multiple of 16).
            byte[] toEncrypt = Encoding.ASCII.GetBytes("ThisIsSomeData16");

            Console.WriteLine(value: $"Original data: {Encoding.ASCII.GetString(toEncrypt)}");
            Console.WriteLine("Encrypting...");

            // Encrypt the data in memory.
            EncryptInMemoryData(toEncrypt, MemoryProtectionScope.SameLogon);

            Console.WriteLine($"Encrypted data: {Encoding.ASCII.GetString(toEncrypt)}");
            Console.WriteLine("Decrypting...");

            // Decrypt the data in memory.
            DecryptInMemoryData(toEncrypt, MemoryProtectionScope.SameLogon);

            Console.WriteLine($"Decrypted data: {Encoding.ASCII.GetString(toEncrypt)}");

            ///////////////////////////////
            //
            // Data Encryption - ProtectedData
            //
            ///////////////////////////////

            // Create the original data to be encrypted
            toEncrypt = Encoding.ASCII.GetBytes("This is some data of any length.");

            // Create a file.
            FileStream fStream = new FileStream("Data.dat", FileMode.OpenOrCreate);

            // Create some random entropy.
            byte[] entropy = CreateRandomEntropy();

            Console.WriteLine();
            Console.WriteLine($"Original data: {Encoding.ASCII.GetString(toEncrypt)}");
            Console.WriteLine("Encrypting and writing to disk...");

            // Encrypt a copy of the data to the stream.
            int bytesWritten = EncryptDataToStream(toEncrypt, entropy, DataProtectionScope.CurrentUser, fStream);

            fStream.Close();

            Console.WriteLine("Reading data from disk and decrypting...");

            // Open the file.
            fStream = new FileStream("Data.dat", FileMode.Open);

            // Read from the stream and decrypt the data.
            byte[] decryptData = DecryptDataFromStream(entropy, DataProtectionScope.CurrentUser, fStream, bytesWritten);

            fStream.Close();

            Console.WriteLine($"Decrypted data: {Encoding.ASCII.GetString(decryptData)}");
        }
        catch (Exception e)
        {
            Console.WriteLine($"ERROR: {e.Message}");
        }
    }

    public static void EncryptInMemoryData(byte[] Buffer, MemoryProtectionScope Scope )
    {
        if (Buffer == null)
            throw new ArgumentNullException(nameof(Buffer));
        if (Buffer.Length <= 0)
            throw new ArgumentException("The buffer length was 0.", nameof(Buffer));

        // Encrypt the data in memory. The result is stored in the same array as the original data.
        ProtectedMemory.Protect(Buffer, Scope);
    }

    public static void DecryptInMemoryData(byte[] Buffer, MemoryProtectionScope Scope)
    {
        if (Buffer == null)
            throw new ArgumentNullException(nameof(Buffer));
        if (Buffer.Length <= 0)
            throw new ArgumentException("The buffer length was 0.", nameof(Buffer));

        // Decrypt the data in memory. The result is stored in the same array as the original data.
        ProtectedMemory.Unprotect(Buffer, Scope);
    }

    public static byte[] CreateRandomEntropy()
    {
        // Create a byte array to hold the random value.
        byte[] entropy = new byte[16];

        // Create a new instance of the RNGCryptoServiceProvider.
        // Fill the array with a random value.
        new RNGCryptoServiceProvider().GetBytes(entropy);

        // Return the array.
        return entropy;
    }

    public static int EncryptDataToStream(byte[] Buffer, byte[] Entropy, DataProtectionScope Scope, Stream S)
    {
        if (Buffer == null)
            throw new ArgumentNullException(nameof(Buffer));
        if (Buffer.Length <= 0)
            throw new ArgumentException("The buffer length was 0.", nameof(Buffer));
        if (Entropy == null)
            throw new ArgumentNullException(nameof(Entropy));
        if (Entropy.Length <= 0)
            throw new ArgumentException("The entropy length was 0.", nameof(Entropy));
        if (S == null)
            throw new ArgumentNullException(nameof(S));

        int length = 0;

        // Encrypt the data and store the result in a new byte array. The original data remains unchanged.
        byte[] encryptedData = ProtectedData.Protect(Buffer, Entropy, Scope);

        // Write the encrypted data to a stream.
        if (S.CanWrite && encryptedData != null)
        {
            S.Write(encryptedData, 0, encryptedData.Length);

            length = encryptedData.Length;
        }

        // Return the length that was written to the stream.
        return length;
    }

    public static byte[] DecryptDataFromStream(byte[] Entropy, DataProtectionScope Scope, Stream S, int Length)
    {
        if (S == null)
            throw new ArgumentNullException(nameof(S));
        if (Length <= 0 )
            throw new ArgumentException("The given length was 0.", nameof(Length));
        if (Entropy == null)
            throw new ArgumentNullException(nameof(Entropy));
        if (Entropy.Length <= 0)
            throw new ArgumentException("The entropy length was 0.", nameof(Entropy));

        byte[] inBuffer = new byte[Length];
        byte[] outBuffer;

        // Read the encrypted data from a stream.
        if (S.CanRead)
        {
            S.Read(inBuffer, 0, Length);

            outBuffer = ProtectedData.Unprotect(inBuffer, Entropy, Scope);
        }
        else
        {
            throw new IOException("Could not read the stream.");
        }

        // Return the decrypted data
        return outBuffer;
    }
}
```
```vb
﻿Imports System.IO
Imports System.Text
Imports System.Security.Cryptography

Public Module MemoryProtectionSample
    Sub Main()
        Try
            ''''''''''''''''''''''''''''''''''''
            '
            ' Memory Encryption - ProtectedMemory
            '
            ''''''''''''''''''''''''''''''''''''
            ' Create the original data to be encrypted (The data length should be a multiple of 16).
            Dim toEncrypt As Byte() = Encoding.ASCII.GetBytes("ThisIsSomeData16")

            Console.WriteLine("Original data: " + Encoding.ASCII.GetString(toEncrypt))
            Console.WriteLine("Encrypting...")

            ' Encrypt the data in memory.
            EncryptInMemoryData(toEncrypt, MemoryProtectionScope.SameLogon)

            Console.WriteLine("Encrypted data: " + Encoding.ASCII.GetString(toEncrypt))
            Console.WriteLine("Decrypting...")

            ' Decrypt the data in memory.
            DecryptInMemoryData(toEncrypt, MemoryProtectionScope.SameLogon)

            Console.WriteLine("Decrypted data: " + Encoding.ASCII.GetString(toEncrypt))

            ''''''''''''''''''''''''''''''''''''
            '
            ' Data Encryption - ProtectedData
            '
            ''''''''''''''''''''''''''''''''''''
            ' Create the original data to be encrypted
            toEncrypt = Encoding.ASCII.GetBytes("This is some data of any length.")

            ' Create a file.
            Dim fStream As New FileStream("Data.dat", FileMode.OpenOrCreate)

            ' Create some random entropy.
            Dim entropy As Byte() = CreateRandomEntropy()

            Console.WriteLine()
            Console.WriteLine("Original data: " + Encoding.ASCII.GetString(toEncrypt))
            Console.WriteLine("Encrypting and writing to disk...")

            ' Encrypt a copy of the data to the stream.
            Dim bytesWritten As Integer = EncryptDataToStream(toEncrypt, entropy, DataProtectionScope.CurrentUser, fStream)

            fStream.Close()

            Console.WriteLine("Reading data from disk and decrypting...")

            ' Open the file.
            fStream = New FileStream("Data.dat", FileMode.Open)

            ' Read from the stream and decrypt the data.
            Dim decryptData As Byte() = DecryptDataFromStream(entropy, DataProtectionScope.CurrentUser, fStream, bytesWritten)

            fStream.Close()

            Console.WriteLine("Decrypted data: " + Encoding.ASCII.GetString(decryptData))

        Catch e As Exception
            Console.WriteLine("ERROR: " + e.Message)
        End Try

    End Sub

    Sub EncryptInMemoryData(Buffer() As Byte, Scope As MemoryProtectionScope)
        If Buffer Is Nothing Then
            Throw New ArgumentNullException("Buffer")
        End If
        If Buffer.Length <= 0 Then
            Throw New ArgumentException("Buffer")
        End If

        ' Encrypt the data in memory. The result is stored in the same array as the original data.
        ProtectedMemory.Protect(Buffer, Scope)

    End Sub

    Sub DecryptInMemoryData(Buffer() As Byte, Scope As MemoryProtectionScope)
        If Buffer Is Nothing Then
            Throw New ArgumentNullException("Buffer")
        End If
        If Buffer.Length <= 0 Then
            Throw New ArgumentException("Buffer")
        End If

        ' Decrypt the data in memory. The result is stored in the same array as the original data.
        ProtectedMemory.Unprotect(Buffer, Scope)

    End Sub

    Function CreateRandomEntropy() As Byte()
        ' Create a byte array to hold the random value.
        Dim entropy(15) As Byte

        ' Create a new instance of the RNGCryptoServiceProvider.
        ' Fill the array with a random value.
        Dim RNG As New RNGCryptoServiceProvider()

        RNG.GetBytes(entropy)

        ' Return the array.
        Return entropy

    End Function 'CreateRandomEntropy

    Function EncryptDataToStream(Buffer() As Byte, Entropy() As Byte, Scope As DataProtectionScope, S As Stream) As Integer
        If Buffer Is Nothing Then
            Throw New ArgumentNullException("Buffer")
        End If
        If Buffer.Length <= 0 Then
            Throw New ArgumentException("Buffer")
        End If
        If Entropy Is Nothing Then
            Throw New ArgumentNullException("Entropy")
        End If
        If Entropy.Length <= 0 Then
            Throw New ArgumentException("Entropy")
        End If
        If S Is Nothing Then
            Throw New ArgumentNullException("S")
        End If
        Dim length As Integer = 0

        ' Encrypt the data and store the result in a new byte array. The original data remains unchanged.
        Dim encryptedData As Byte() = ProtectedData.Protect(Buffer, Entropy, Scope)

        ' Write the encrypted data to a stream.
        If S.CanWrite AndAlso Not (encryptedData Is Nothing) Then
            S.Write(encryptedData, 0, encryptedData.Length)

            length = encryptedData.Length
        End If

        ' Return the length that was written to the stream. 
        Return length

    End Function 'EncryptDataToStream

    Function DecryptDataFromStream(Entropy() As Byte, Scope As DataProtectionScope, S As Stream, Length As Integer) As Byte()
        If S Is Nothing Then
            Throw New ArgumentNullException("S")
        End If
        If Length <= 0 Then
            Throw New ArgumentException("Length")
        End If
        If Entropy Is Nothing Then
            Throw New ArgumentNullException("Entropy")
        End If
        If Entropy.Length <= 0 Then
            Throw New ArgumentException("Entropy")
        End If

        Dim inBuffer(Length - 1) As Byte
        Dim outBuffer() As Byte

        ' Read the encrypted data from a stream.
        If S.CanRead Then
            S.Read(inBuffer, 0, Length)

            outBuffer = ProtectedData.Unprotect(inBuffer, Entropy, Scope)
        Else
            Throw New IOException("Could not read the stream.")
        End If

        ' Return the unencrypted data as byte array. 
        Return outBuffer

    End Function 'DecryptDataFromStream 
End Module 'MemoryProtectionSample
```
---

## See also

- Cryptography model
- Cryptographic services
- Cross-platform cryptography
- `System.Security.Cryptography.ProtectedMemory`
- `System.Security.Cryptography.ProtectedData`
- ASP.NET Core Data Protection
