---
title: "How to: Convert between .NET Framework and Windows Runtime streams (Windows only)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/io/how-to-convert-between-dotnet-streams-and-winrt-streams.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Convert between .NET Framework and Windows Runtime streams (Windows only)

.NET Framework for UWP apps is a subset of the full .NET Framework. Because of security and other requirements for UWP apps, you can't use the full set of .NET Framework APIs to open and read files. For more information, see .NET for UWP apps overview. However, you may want to use .NET Framework APIs for other stream manipulation operations. To manipulate these streams, you can convert between a .NET Framework stream type, such as `System.IO.MemoryStream` or `System.IO.FileStream`, and a Windows Runtime stream, such as `Windows.Storage.Streams.IInputStream`, `Windows.Storage.Streams.IOutputStream`, or `Windows.Storage.Streams.IRandomAccessStream`.

The `System.IO.WindowsRuntimeStreamExtensions` class contains methods that make these conversions easy. However, underlying differences between .NET Framework and Windows Runtime streams affect the results of using these methods, as described in the following sections:

## Convert from a Windows Runtime to a .NET Framework stream

To convert from a Windows Runtime stream to a .NET Framework stream, use one of the following `System.IO.WindowsRuntimeStreamExtensions` methods:

- `System.IO.WindowsRuntimeStreamExtensions.AsStream*` converts a random-access stream in the Windows Runtime to a managed stream in .NET for UWP apps.

- `System.IO.WindowsRuntimeStreamExtensions.AsStreamForWrite*` converts an output stream in the Windows Runtime to a managed stream in .NET for UWP apps.

- `System.IO.WindowsRuntimeStreamExtensions.AsStreamForRead*` converts an input stream in the Windows Runtime to a managed stream in .NET for UWP apps.

The Windows Runtime offers stream types that support reading only, writing only, or reading and writing. These capabilities are maintained when you convert a Windows Runtime stream to a .NET Framework stream. Furthermore, if you convert a Windows Runtime stream to a .NET Framework stream and back, you get the original Windows Runtime instance back.

It's best practice to use the conversion method that matches the capabilities of the Windows Runtime stream you want to convert. However, since `Windows.Storage.Streams.IRandomAccessStream` is readable and writeable (it implements both `Windows.Storage.Streams.IOutputStream` and `Windows.Storage.Streams.IInputStream`), the conversion methods maintain the capabilities of the original stream. For example, using `System.IO.WindowsRuntimeStreamExtensions.AsStreamForRead*` to convert an `Windows.Storage.Streams.IRandomAccessStream` doesn't limit the converted .NET Framework stream to being readable. It's also writable.

## Example: Convert Windows Runtime random-access to .NET Framework stream

To convert from a Windows Runtime random-access stream to a .NET Framework stream, use the `System.IO.WindowsRuntimeStreamExtensions.AsStream*` method.

The following code example prompts you to select a file, opens it with Windows Runtime APIs, and then converts it to a .NET Framework stream. It reads the stream and outputs it to a text block. You would typically manipulate the stream with .NET Framework APIs before outputting the results.

```csharp
// Create a file picker.
FileOpenPicker picker = new FileOpenPicker();
picker.SuggestedStartLocation = PickerLocationId.DocumentsLibrary;
picker.ViewMode = PickerViewMode.List;
picker.FileTypeFilter.Add(".txt");

// Show picker, enabling user to pick one file.
StorageFile result = await picker.PickSingleFileAsync();
if (result != null)
{
    try
    {
        // Retrieve the stream. This method returns a IRandomAccessStreamWithContentType.
        var stream = await result.OpenReadAsync();

        // Convert the stream to a .NET stream using AsStream, pass to a
        // StreamReader and read the stream.
        using (StreamReader sr = new StreamReader(stream.AsStream()))
        {
            TextBlock1.Text = sr.ReadToEnd();
        }
    }
    catch (Exception ex)
    {
        // ...
    }
}
```

## Convert from a .NET Framework to a Windows Runtime stream

To convert from a .NET Framework stream to a Windows Runtime stream, use one of the following `System.IO.WindowsRuntimeStreamExtensions` methods:

- `System.IO.WindowsRuntimeStreamExtensions.AsInputStream*` converts a managed stream in .NET for UWP apps to an input stream in the Windows Runtime.

- `System.IO.WindowsRuntimeStreamExtensions.AsOutputStream*` converts a managed stream in .NET for UWP apps to an output stream in the Windows Runtime.

- `System.IO.WindowsRuntimeStreamExtensions.AsRandomAccessStream*` converts a managed stream in .NET for UWP apps to a random-access stream that the Windows Runtime can use for reading or writing.

When you convert a .NET Framework stream to a Windows Runtime stream, the capabilities of the converted stream depend on the original stream. For example, if the original stream supports both reading and writing, and you call `System.IO.WindowsRuntimeStreamExtensions.AsInputStream*` to convert the stream, the returned type is an `IRandomAccessStream`. `IRandomAccessStream` implements `IInputStream` and `IOutputStream`, and supports reading and writing.

.NET Framework streams don't support cloning, even after conversion. If you convert a .NET Framework stream to a Windows Runtime stream and call `Windows.Storage.Streams.InMemoryRandomAccessStream.GetInputStreamAt*` or `Windows.Storage.Streams.IRandomAccessStream.GetOutputStreamAt*`, which call `Windows.Storage.Streams.RandomAccessStreamOverStream.CloneStream*`, or if you call `Windows.Storage.Streams.RandomAccessStreamOverStream.CloneStream*` directly, an exception occurs.

## Example: Convert .NET Framework to Windows Runtime random-access stream

To convert from a .NET Framework stream to a Windows Runtime random-access stream, use the `System.IO.WindowsRuntimeStreamExtensions.AsRandomAccessStream*` method, as shown in the following example:

> **Important:**
> Make sure that the .NET Framework stream you are using supports seeking, or copy it to a stream that does. You can use the `System.IO.Stream.CanSeek` property to determine this.

```csharp
// Create an HttpClient and access an image as a stream.
var client = new HttpClient();
Stream stream = await client.GetStreamAsync("https://learn.microsoft.com/en-us/dotnet/images/hub/featured-1.png");
// Create a .NET memory stream.
var memStream = new MemoryStream();
// Convert the stream to the memory stream, because a memory stream supports seeking.
await stream.CopyToAsync(memStream);
// Set the start position.
memStream.Position = 0;
// Create a new bitmap image.
var bitmap = new BitmapImage();
// Set the bitmap source to the stream, which is converted to a IRandomAccessStream.
bitmap.SetSource(memStream.AsRandomAccessStream());
// Set the image control source to the bitmap.
Image1.Source = bitmap;
```

## See also

- Quickstart: Read and write a file (Windows)
- .NET for Windows Store apps overview
- .NET for Windows Store apps APIs
