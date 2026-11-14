---
title: "IStreamProvider interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml/IStreamProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IStreamProvider interface

Namespace: `System.Xml`

```csharp
public interface IStreamProvider
```

Represents an interface that can be implemented by classes providing streams.

#### Remarks
When writing an outgoing message containing a streamed body to an XML writer, the `Message` will use a sequence of calls similar to the following in its `OnWriteBodyContents` implementation:

- Write any necessary information preceding the stream (For example, the opening XML tag).

- Write the stream.

- Write any information following the stream (For example, the closing XML tag).

This works well with encodings that are similar to the textual XML encoding. However, there are some encodings that do not place XML infoset information (For example, tags for starting and ending XML elements) together with the data contained within elements. For example, in the MTOM encoding, the message is split into multiple parts. One part contains the XML infoset, which may contain references to other parts for actual element contents. Since the XML infoset will normally be small compared to the streamed contents, it makes sense to buffer the infoset, write it out, and then write the contents in a streamed way. This means that by the time the closing element tag is written, we should not have written out the stream yet.

For this purpose, the `IStreamProvider` interface is used. The interface has a `GetStream` method that returns the stream to be written. The correct way to write out a streamed message body in `OnWriteBodyContents` is as follows:

- Write any necessary information preceding the stream (For example, the opening XML tag)

- Call the `WriteValue` overload on the `XmlDictionaryWriter` that takes an `IStreamProvider`, with an `IStreamProvider` implementation that returns the stream to be written.

- Write any information following the stream (For example, the closing XML tag)

With this approach, the XML writer has a choice of when to call `GetStream` and write out the streamed data. For example, the textual and binary XML writers will call it immediately and write out the streamed contents in between the start and end tags. The MTOM writer may decide to call `GetStream` later, when it is ready to write the appropriate part of the message.

## IStreamProvider.GetStream() method

```csharp
public System.IO.Stream GetStream ();
```

Gets a stream.

Returns: A `Stream` object.

#### Remarks
This method can be used to return the stream to be written.

## IStreamProvider.ReleaseStream(Stream) method

```csharp
public void ReleaseStream (System.IO.Stream stream);
```

Releases a stream to output.

Parameters:

- `stream`: The stream being released.

To be added.
