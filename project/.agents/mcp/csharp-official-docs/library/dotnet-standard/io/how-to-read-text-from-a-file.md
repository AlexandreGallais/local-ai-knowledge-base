---
title: "Read text from a file"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-read-text-from-a-file.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Read text from a file

The following examples show how to read text synchronously and asynchronously from a text file using .NET for desktop apps. In both examples, when you create the instance of the `System.IO.StreamReader` class, you provide the relative or absolute path to the file.

> **Note:**
> These code examples don't apply to Universal Windows (UWP) apps because the Windows runtime provides different stream types for reading and writing to files. For more information, see UWP work with files. For examples that show how to convert between .NET Framework streams and Windows Runtime streams, see How to: Convert between .NET Framework streams and Windows Runtime streams.

## Prerequisites

- Create a text file named _TestFile.txt_ in the same folder as the app.

  Add some content to the text file. The examples in this article write the content of the text file to the console.

## Read a file

The following example shows a synchronous read operation within a console app. The file contents are read and stored in a string variable, which is then written to the console.

1. Create a `System.IO.StreamReader` instance.
1. Call the `System.IO.StreamReader.ReadToEnd` method and assign the result to a string.
1. Write the output to the console.

```csharp
try
{
    // Open the text file using a stream reader.
    using StreamReader reader = new("TestFile.txt");

    // Read the stream as a string.
    string text = reader.ReadToEnd();

    // Write the text to the console.
    Console.WriteLine(text);
}
catch (IOException e)
{
    Console.WriteLine("The file could not be read:");
    Console.WriteLine(e.Message);
}
```
```vb
Try
    ' Open the text file using a stream reader.
    Using reader As New StreamReader("TestFile.txt")

        ' Read the stream as a string.
        Dim text As String = reader.ReadToEnd()

        ' Write the text to the console.
        Console.WriteLine(text)

    End Using
Catch ex As IOException
    Console.WriteLine("The file could not be read:")
    Console.WriteLine(ex.Message)
End Try
```
## Read a file asynchronously

The following example shows an asynchronous read operation within a console app. The file contents are read and stored in a string variable, which is then written to the console.

1. Create a `System.IO.StreamReader` instance.
1. Await the `System.IO.StreamReader.ReadToEndAsync` method and assign the result to a string.
1. Write the output to the console.

```csharp
try
{
    // Open the text file using a stream reader.
    using StreamReader reader = new("TestFile.txt");

    // Read the stream as a string.
    string text = await reader.ReadToEndAsync();

    // Write the text to the console.
    Console.WriteLine(text);
}
catch (IOException e)
{
    Console.WriteLine("The file could not be read:");
    Console.WriteLine(e.Message);
}
```
```vb
Try
    ' Open the text file using a stream reader.
    Using reader As New StreamReader("TestFile.txt")

        ' Read the stream as a string.
        Dim text As String = Await reader.ReadToEndAsync()

        ' Write the text to the console.
        Console.WriteLine(text)

    End Using
Catch ex As IOException
    Console.WriteLine("The file could not be read:")
    Console.WriteLine(ex.Message)
End Try
```
## Related content

- Common I/O Tasks.
- Asynchronous file I/O.
- How to: Write text to a file.
- `System.IO.StreamReader`
- `System.IO.File.OpenText*`
- `System.IO.StreamReader.ReadLine*`
