---
title: "IFragmentCapableXmlDictionaryWriter interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IFragmentCapableXmlDictionaryWriter.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IFragmentCapableXmlDictionaryWriter interface

Namespace: `System.Xml`

```csharp
public interface IFragmentCapableXmlDictionaryWriter
```

Contains properties and methods that when implemented by a `XmlDictionaryWriter`, allows processing of XML fragments.

#### Remarks
This class defines the properties and methods related to the capability of an `XmlDictionaryWriter` to redirect part of its output (a 'fragment') to a different stream than the stream it was created with and to directly insert such a fragment captured by redirection back into the main stream of the same writer at a later point.

## IFragmentCapableXmlDictionaryWriter.CanFragment property

```csharp
public bool CanFragment { get; }
```

Gets a value that indicates whether this `XmlDictionaryWriter` can process XML fragments.

Returns: `true` if this `XmlDictionaryWriter` can process XML fragments; otherwise, `false`.

#### Remarks
Returns `true` if the writer that implements this interface can generate and accept XML fragments.

## IFragmentCapableXmlDictionaryWriter.EndFragment() method

```csharp
public void EndFragment ();
```

Ends the processing of an XML fragment.

#### Remarks
Stops redirecting output to the stream supplied by the matching `StartFragment` call. After this call, the XML writing output goes to the stream originally used by the writer before the `StartFragment` call.

## IFragmentCapableXmlDictionaryWriter.StartFragment(Stream, Boolean) method

```csharp
public void StartFragment (System.IO.Stream stream, bool generateSelfContainedTextFragment);
```

Starts the processing of an XML fragment.

Parameters:

- `stream`: The stream to write to.
- `generateSelfContainedTextFragment`: If `true`, any namespaces declared outside the fragment is declared again if used inside of it; if `false` the namespaces are not declared again.

#### Remarks
Temporarily starts redirecting the writing of the XML output to the supplied stream until `EndFragment` is called. If `generateSelfContainedTextFragment` is `true`, then the redirected XML output is always text XML and is self-contained in terms of its namespace context. `StartFragment`() calls cannot be nested.

## IFragmentCapableXmlDictionaryWriter.WriteFragment(Byte[], Int32, Int32) method

```csharp
public void WriteFragment (byte[] buffer, int offset, int count);
```

Writes an XML fragment to the underlying stream of the writer.

Parameters:

- `buffer`: The buffer to write to.
- `offset`: The starting position from which to write in `buffer`.
- `count`: The number of bytes to be written to the `buffer`.

#### Remarks
Writes a fragment captured between `StartFragment` and `EndFragment` and calls back into the XmlDictionaryWriter's main stream. The fragment written is `count` bytes starting at the index `offset` from the supplied `buffer`. The behavior is undefined if the supplied fragment was not captured using this writer instance.

#### Examples

```csharp
MemoryStream stream = new MemoryStream();  
MemoryStream fragmentStream = new MemoryStream();  
XmlDictionaryWriter writer = XmlDictionaryWriter.CreateTextWriter(stream);  
IXmlFragmentCapableXmlDictionaryWriter fragmentWriter = writer as IXmlFragmentCapableXmlDictionaryWriter;  
if (fragmentWriter == null || !fragmentWriter.CanFragment)  
{  
Console.WriteLine("This writer doesn't support fragments");  
return;  
}  
writer.WriteStartElement("Root");  
fragmentWriter.StartFragment(fragmentStream, false);  
writer.WriteStartElement("Body");  
writer.WriteString("This is my body");  
writer.WriteEndElement();  
fragmentWriter.EndFragment();  
writer.WriteStartElement("CharsInTheBody");  
writer.WriteValue(fragmentStream.Length);  
writer.WriteEndElement();  
fragmentWriter.WriteFragment(fragmentStream.GetBuffer(), 0, (int)fragmentStream.Length);  
writer.WriteEndElement(); // Root  
```
