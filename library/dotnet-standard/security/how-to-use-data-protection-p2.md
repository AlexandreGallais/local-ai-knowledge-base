---
title: "How to use data protection (part 2 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-use-data-protection.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to use data protection (part 2 of 3)

## Example

The following code example shows two forms of encryption and decryption. First, the code encrypts and then decrypts an in-memory array of bytes. Next, the code encrypts a copy of a byte array, saves it to a file, loads the data back from the file, and then decrypts the data. The example displays the original data, the encrypted data, and the decrypted data.

> **Important:**
> `System.Security.Cryptography.ProtectedMemory` is only available for .NET Framework. `System.Security.Cryptography.ProtectedData` is available on .NET and .NET Framework.

### .NET

This sample compiles and runs when you target .NET on Windows. To compile the sample, add the `System.Security.Cryptography.ProtectedData` NuGet package.

```csharp
using System.Security.Cryptography;
using System.Text;

try
{
    // Data Encryption - ProtectedData

    // Create the original data to be encrypted.
    byte[] toEncrypt = Encoding.ASCII.GetBytes("This is some data of any length.");

    // Create some random entropy.
    byte[] entropy = CreateRandomEntropy();

    Console.WriteLine();
    Console.WriteLine($"Original data: {Encoding.ASCII.GetString(toEncrypt)}");
    Console.WriteLine("Encrypting and writing to disk...");

    int bytesWritten;

    // Encrypt a copy of the data to the stream.
    using (FileStream writeStream = new("Data.dat", FileMode.OpenOrCreate))
    {
        bytesWritten = EncryptDataToStream(toEncrypt, entropy, DataProtectionScope.CurrentUser, writeStream);
    }

    Console.WriteLine("Reading data from disk and decrypting...");

    // Read from the stream and decrypt the data.
    byte[] decryptData;
    using (FileStream readStream = new("Data.dat", FileMode.Open))
    {
        decryptData = DecryptDataFromStream(entropy, DataProtectionScope.CurrentUser, readStream, bytesWritten);
    }

    Console.WriteLine($"Decrypted data: {Encoding.ASCII.GetString(decryptData)}");
}
catch (Exception e)
{
    Console.WriteLine($"ERROR: {e.Message}");
}

static byte[] CreateRandomEntropy()
{
    // Create a byte array to hold the random value and fill it with a random value.
    byte[] entropy = new byte[16];
    RandomNumberGenerator.Fill(entropy);

    return entropy;
}

static int EncryptDataToStream(byte[] buffer, byte[] entropy, DataProtectionScope scope, Stream stream)
{
    ArgumentNullException.ThrowIfNull(buffer);
    ArgumentOutOfRangeException.ThrowIfZero(buffer.Length, nameof(buffer));
    ArgumentNullException.ThrowIfNull(entropy);
    ArgumentOutOfRangeException.ThrowIfZero(entropy.Length, nameof(entropy));
    ArgumentNullException.ThrowIfNull(stream);

    int length = 0;

    // Encrypt the data and store the result in a new byte array. The original data remains unchanged.
    byte[] encryptedData = ProtectedData.Protect(buffer, entropy, scope);

    // Write the encrypted data to a stream.
    if (stream.CanWrite)
    {
        stream.Write(encryptedData, 0, encryptedData.Length);
        length = encryptedData.Length;
    }

    // Return the length that was written to the stream.
    return length;
}

static byte[] DecryptDataFromStream(byte[] entropy, DataProtectionScope scope, Stream stream, int length)
{
    ArgumentNullException.ThrowIfNull(stream);
    ArgumentOutOfRangeException.ThrowIfZero(length, nameof(length));
    ArgumentNullException.ThrowIfNull(entropy);
    ArgumentOutOfRangeException.ThrowIfZero(entropy.Length, nameof(entropy));

    if (!stream.CanRead)
        throw new IOException("Could not read the stream.");

    byte[] inBuffer = new byte[length];
    stream.ReadExactly(inBuffer, 0, length);

    // Return the decrypted data.
    return ProtectedData.Unprotect(inBuffer, entropy, scope);
}
```
```vb
Imports System.IO
Imports System.Security.Cryptography
Imports System.Text

Public Module DataProtectionSample

    Sub Main()
        Try
            ' Data Encryption - ProtectedData

            ' Create the original data to be encrypted.
            Dim toEncrypt As Byte() = Encoding.ASCII.GetBytes("This is some data of any length.")

            ' Create some random entropy.
            Dim entropy As Byte() = CreateRandomEntropy()

            Console.WriteLine()
            Console.WriteLine($"Original data: {Encoding.ASCII.GetString(toEncrypt)}")
            Console.WriteLine("Encrypting and writing to disk...")

            Dim bytesWritten As Integer

            ' Encrypt a copy of the data to the stream.
            Using writeStream As New FileStream("Data.dat", FileMode.OpenOrCreate)
                bytesWritten = EncryptDataToStream(toEncrypt, entropy, DataProtectionScope.CurrentUser, writeStream)
            End Using

            Console.WriteLine("Reading data from disk and decrypting...")

            ' Read from the stream and decrypt the data.
            Dim decryptData As Byte()
            Using readStream As New FileStream("Data.dat", FileMode.Open)
                decryptData = DecryptDataFromStream(entropy, DataProtectionScope.CurrentUser, readStream, bytesWritten)
            End Using

            Console.WriteLine($"Decrypted data: {Encoding.ASCII.GetString(decryptData)}")

        Catch e As Exception
            Console.WriteLine($"ERROR: {e.Message}")
        End Try
    End Sub

    Function CreateRandomEntropy() As Byte()
        ' Create a byte array to hold the random value and fill it with a random value.
        Dim entropy(15) As Byte
        RandomNumberGenerator.Fill(entropy)

        Return entropy
    End Function

    Function EncryptDataToStream(buffer As Byte(), entropy As Byte(), scope As DataProtectionScope, stream As Stream) As Integer
        ArgumentNullException.ThrowIfNull(buffer)
        ArgumentOutOfRangeException.ThrowIfZero(buffer.Length, NameOf(buffer))
        ArgumentNullException.ThrowIfNull(entropy)
        ArgumentOutOfRangeException.ThrowIfZero(entropy.Length, NameOf(entropy))
        ArgumentNullException.ThrowIfNull(stream)

        Dim length As Integer = 0

        ' Encrypt the data and store the result in a new byte array. The original data remains unchanged.
        Dim encryptedData As Byte() = ProtectedData.Protect(buffer, entropy, scope)

        ' Write the encrypted data to a stream.
        If stream.CanWrite Then
            stream.Write(encryptedData, 0, encryptedData.Length)
            length = encryptedData.Length
        End If

        ' Return the length that was written to the stream.
        Return length
    End Function

    Function DecryptDataFromStream(entropy As Byte(), scope As DataProtectionScope, stream As Stream, length As Integer) As Byte()
        ArgumentNullException.ThrowIfNull(stream)
        ArgumentOutOfRangeException.ThrowIfZero(length, NameOf(length))
        ArgumentNullException.ThrowIfNull(entropy)
        ArgumentOutOfRangeException.ThrowIfZero(entropy.Length, NameOf(entropy))

        If Not stream.CanRead Then
            Throw New IOException("Could not read the stream.")
        End If

        Dim inBuffer(length - 1) As Byte
        stream.ReadExactly(inBuffer, 0, length)

        ' Return the decrypted data.
        Return ProtectedData.Unprotect(inBuffer, entropy, scope)
    End Function

End Module
```
