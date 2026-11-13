---
title: "Transform data by composing streams (part 2 of 2)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/io/composing-streams.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Transform data by composing streams (part 2 of 2)

## Example: Encrypt and decrypt stream data

The following example reads data from a file, encrypts it, and then writes the encrypted data to another file. Stream composition is used to transform the data using a basic <example-value> cipher. Each byte that passes through the stream has its value changed by **80**.

> **Warning:**
> The encryption used in this example is basic and unsecure. It's not meant to actually encrypt data for use, but is provided to demonstrate altering data through stream composition.

### Read the source data for encryption

The following code reads the text from one file, transforms it, then writes it to another file.

> **Tip:**
> Before reviewing this code, know that the `CipherStream` is a user-defined type. The code for this class is provided in the CipherStream class section.

```csharp
void WriteShiftedFile()
{
    // Create the base streams for the input and output files
    using FileStream inputBaseStream = File.OpenRead("data.txt");
    using CipherStream encryptStream = CipherStream.CreateForRead(inputBaseStream);
    using FileStream outputBaseStream = File.Open("shifted.txt", FileMode.Create, FileAccess.Write);

    int intValue;

    // Read byte from inputBaseStream through the encryptStream (normal bytes into shifted bytes)
    while ((intValue = encryptStream.ReadByte()) != -1)
    {
        outputBaseStream.WriteByte((byte)intValue);
    }

    // Process is:
    //  (inputBaseStream -> encryptStream) -> outputBaseStream
}
```
```vb
Sub WriteShiftedFile()

    'Create the base streams for the input and output files
    Using inputBaseStream As FileStream = File.OpenRead("data.txt")
        Using encryptStream As CipherStream = CipherStream.CreateForRead(inputBaseStream)
            Using outputBaseStream As FileStream = File.Open("shifted.txt", FileMode.Create, FileAccess.Write)

                'Read byte from inputBaseStream through the encryptStream (normal bytes into shifted bytes)
                Dim intValue As Integer = encryptStream.ReadByte()
                While intValue <> -1

                    outputBaseStream.WriteByte(Convert.ToByte(intValue))

                    intValue = encryptStream.ReadByte()

                End While

            End Using
        End Using
    End Using

    'Process is:
    '  (inputBaseStream -> encryptStream) -> outputBaseStream
End Sub
```
Consider the following aspects about the previous code:

- There are two `System.IO.FileStream` objects:
  - The first `FileStream` (`inputBaseStream` variable) object reads the contents of the _data.txt_ file. This is the **input** data stream.
  - The second `FileStream` (`outputBaseStream` variable) object writes incoming data to the _shifted.txt_ file. This is the **output** data stream.
- The `CipherStream` (`encryptStream` variable) object wraps the `inputBaseStream`, making `inputBaseStream` the base stream for `encryptStream`.

The input stream could be read from directly, writing the data to the output stream, but that wouldn't transform the data. Instead, the `encryptStream` input stream wrapper is used to read the data. As the data is read from `encryptStream`, it pulls from the `inputBaseStream` base stream, transforms it, and returns it. The returned data is written to `outputBaseStream`, which writes the data to the _shifted.txt_ file.

### Read the transformed data for decryption

This code reverses the encryption performed by the previous code:

```csharp
void ReadShiftedFile()
{
    int intValue;

    // Create the base streams for the input and output files
    using FileStream inputBaseStream = File.OpenRead("shifted.txt");
    using FileStream outputBaseStream = File.Open("unshifted.txt", FileMode.Create, FileAccess.Write);
    using CipherStream unencryptStream = CipherStream.CreateForWrite(outputBaseStream);

    // Read byte from inputBaseStream through the encryptStream (shifted bytes into normal bytes)
    while ((intValue = inputBaseStream.ReadByte()) != -1)
    {
        unencryptStream.WriteByte((byte)intValue);
    }

    // Process is:
    //  inputBaseStream -> (encryptStream -> outputBaseStream)
}
```
```vb
Sub ReadShiftedFile()

    'Create the base streams for the input and output files
    Using inputBaseStream As FileStream = File.OpenRead("shifted.txt")
        Using outputBaseStream As FileStream = File.Open("unshifted.txt", FileMode.Create, FileAccess.Write)
            Using unencryptStream As CipherStream = CipherStream.CreateForWrite(outputBaseStream)

                'Read byte from inputBaseStream through the encryptStream (shifted bytes into normal bytes)
                Dim intValue As Integer = inputBaseStream.ReadByte()
                While intValue <> -1

                    unencryptStream.WriteByte(Convert.ToByte(intValue))

                    intValue = inputBaseStream.ReadByte()

                End While

            End Using
        End Using
    End Using

End Sub
```
Consider the following aspects about the previous code:

- There are two `System.IO.FileStream` objects:
  - The first `FileStream` (`inputBaseStream` variable) object reads the contents of the _shifted.txt_ file. This is the **input** data stream.
  - The second `FileStream` (`outputBaseStream` variable) object writes incoming data to the _unshifted.txt_ file. This is the **output** data stream.
- The `CipherStream` (`unencryptStream` variable) object wraps the `outputBaseStream`, making `outputBaseStream` the base stream for `unencryptStream`.

Here, the code is slightly different from the previous example. Instead of wrapping the input stream, `unencryptStream` wraps the output stream. As the data is read from `inputBaseStream` input stream, it's sent to the `unencryptStream` output stream wrapper. When `unencryptStream` receives data, it transforms it and then writes the data to the `outputBaseStream` base stream. The `outputBaseStream` output stream writes the data to the _unshifted.txt_ file.

### Validate the transformed data

The two previous examples performed two operations on the data. First, the contents of the _data.txt_ file was encrypted and saved to the _shifted.txt_ file. And second, the encrypted contents of the _shifted.txt_ file were decrypted and saved to the _unshifted.txt_ file. Therefore, the _data.txt_ file and _unshifted.txt_ file should be exactly the same. The following code compares those files for equality:

```csharp
bool IsShiftedFileValid()
{
    // Read the shifted file
    string originalText = File.ReadAllText("data.txt");

    // Read the shifted file
    string shiftedText = File.ReadAllText("unshifted.txt");

    // Check if the decrypted file is valid
    return shiftedText == originalText;
}
```
```vb
Function IsShiftedFileValid() As Boolean

    'Read the shifted file
    Dim originalText As String = File.ReadAllText("data.txt")

    'Read the shifted file
    Dim shiftedText As String = File.ReadAllText("unshifted.txt")

    'Check if the decrypted file is valid
    Return shiftedText = originalText

End Function
```
The following code runs this entire encrypt-decrypt process:

```csharp
// Read the contents of data.txt, encrypt it, and write it to shifted.txt
WriteShiftedFile();

// Read the contents of shifted.txt, decrypt it, and write it to unshifted.txt
ReadShiftedFile();

// Check if the decrypted file is valid
Console.WriteLine(IsShiftedFileValid()
                    ? "Decrypted file is valid"     // True
                    : "Decrypted file is invalid"   // False
                 );

// Output:
//   Decrypted file is valid
```
```vb
Sub Main(args As String())
    'Read the contents of data.txt, encrypt it, And write it to shifted.txt
    WriteShiftedFile()

    'Read the contents of shifted.txt, decrypt it, And write it to unshifted.txt
    ReadShiftedFile()

    'Check if the decrypted file Is valid
    Console.WriteLine(IIf(IsShiftedFileValid(),
                            "Decrypted file is valid",  ' True
                            "Decrypted file is invalid" ' False
                     ))
End Sub
```
### CipherStream class

The following snippet provides the `CipherStream` class, which uses a basic <example-value> cipher to encrypt and decrypt bytes. This class inherits from `System.IO.Stream` and supports either reading or writing data.

> **Warning:**
> The encryption used in this example is basic and unsecure. It's not meant to actually encrypt data for use, but is provided to demonstrate altering data through stream composition.

```csharp
﻿using System.IO;

public class CipherStream : Stream
{
    // WARNING: This is a simple encoding algorithm and should not be used in production code

    const byte ENCODING_OFFSET = 80;

    private bool _readable;
    private bool _writable;

    private Stream _wrappedBaseStream;

    public override bool CanRead => _readable;
    public override bool CanSeek => false;
    public override bool CanWrite => _writable;
    public override long Length => _wrappedBaseStream.Length;
    public override long Position
    {
        get => _wrappedBaseStream.Position;
        set => _wrappedBaseStream.Position = value;
    }

    public static CipherStream CreateForRead(Stream baseStream)
    {
        return new CipherStream(baseStream)
        {
            _readable = true,
            _writable = false
        };
    }

    public static CipherStream CreateForWrite(Stream baseStream)
    {
        return new CipherStream(baseStream)
        {
            _readable = false,
            _writable = true
        };
    }

    private CipherStream(Stream baseStream) =>
        _wrappedBaseStream = baseStream;

    public override int Read(byte[] buffer, int offset, int count)
    {
        if (!_readable) throw new NotSupportedException();
        if (count == 0) return 0;

        int returnCounter = 0;

        for (int i = 0; i < count; i++)
        {
            int value = _wrappedBaseStream.ReadByte();

            if (value == -1)
                return returnCounter;

            value += ENCODING_OFFSET;
            if (value > byte.MaxValue)
                value -= byte.MaxValue;

            buffer[i + offset] = Convert.ToByte(value);
            returnCounter++;
        }

        return returnCounter;
    }

    public override void Write(byte[] buffer, int offset, int count)
    {
        if (!_writable) throw new NotSupportedException();

        byte[] newBuffer = new byte[count];
        buffer.CopyTo(newBuffer, offset);

        for (int i = 0; i < count; i++)
        {
            int value = newBuffer[i];

            value -= ENCODING_OFFSET;

            if (value < 0)
                value = byte.MaxValue - value;

            newBuffer[i] = Convert.ToByte(value);
        }

        _wrappedBaseStream.Write(newBuffer, 0, count);
    }

    public override void Flush() => _wrappedBaseStream.Flush();
    public override long Seek(long offset, SeekOrigin origin) => throw new NotSupportedException();
    public override void SetLength(long value) => throw new NotSupportedException();
}
```
```vb
﻿Imports System.IO

Public Class CipherStream
    Inherits Stream

    Const ENCODING_OFFSET As Byte = 80

    Private _readable As Boolean = False
    Private _writable As Boolean = False

    Private _wrappedBaseStream As Stream

    Public Overrides ReadOnly Property CanRead As Boolean
        Get
            Return _readable
        End Get
    End Property

    Public Overrides ReadOnly Property CanSeek As Boolean
        Get
            Return False
        End Get
    End Property

    Public Overrides ReadOnly Property CanWrite As Boolean
        Get
            Return _writable
        End Get
    End Property

    Public Overrides ReadOnly Property Length As Long
        Get
            Return _wrappedBaseStream.Length
        End Get
    End Property

    Public Overrides Property Position As Long
        Get
            Return _wrappedBaseStream.Position
        End Get
        Set(value As Long)
            _wrappedBaseStream.Position = value
        End Set
    End Property

    Public Shared Function CreateForRead(baseStream As Stream) As CipherStream
        Return New CipherStream(baseStream) With
        {
            ._readable = True,
            ._writable = False
        }
    End Function

    Public Shared Function CreateForWrite(baseStream As Stream) As CipherStream
        Return New CipherStream(baseStream) With
        {
            ._readable = False,
            ._writable = True
        }
    End Function

    Private Sub New(baseStream As Stream)
        _wrappedBaseStream = baseStream
    End Sub

    Public Overrides Function Read(buffer() As Byte, offset As Integer, count As Integer) As Integer

        If Not _readable Then Throw New NotSupportedException()
        If count = 0 Then Return 0

        Dim returnCounter As Integer = 0

        For i = 0 To count - 1

            Dim value As Integer = _wrappedBaseStream.ReadByte()

            If (value = -1) Then Return returnCounter

            value += ENCODING_OFFSET
            If value > Byte.MaxValue Then
                value -= Byte.MaxValue
            End If

            buffer(i + offset) = Convert.ToByte(value)
            returnCounter += 1

        Next

        Return returnCounter

    End Function

    Public Overrides Sub Write(buffer() As Byte, offset As Integer, count As Integer)
        If Not _writable Then Throw New NotSupportedException()

        Dim newBuffer(count) As Byte
        buffer.CopyTo(newBuffer, offset)

        For i = 0 To count - 1

            Dim value As Integer = newBuffer(i)

            value -= ENCODING_OFFSET

            If value < 0 Then
                value = Byte.MaxValue - value
            End If

            newBuffer(i) = Convert.ToByte(value)

        Next

        _wrappedBaseStream.Write(newBuffer, 0, count)

    End Sub

    Public Overrides Sub Flush()
        _wrappedBaseStream.Flush()
    End Sub

    Public Overrides Function Seek(offset As Long, origin As SeekOrigin) As Long
        Throw New NotSupportedException()
    End Function

    Public Overrides Sub SetLength(value As Long)
        Throw New NotSupportedException()
    End Sub

End Class
```
## See also

- `System.IO.StreamReader`
- `System.IO.StreamReader.ReadLine*`
- `System.IO.StreamReader.Peek*`
- `System.IO.FileStream`
- `System.IO.BinaryReader`
- `System.IO.BinaryReader.ReadByte*`
- `System.IO.BinaryReader.PeekChar*`
