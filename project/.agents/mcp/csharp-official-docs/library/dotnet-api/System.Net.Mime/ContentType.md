---
title: "ContentType class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Mime/ContentType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContentType class

Namespace: `System.Net.Mime`

```csharp
public class ContentType
```

Represents a MIME protocol Content-Type header.

#### Remarks
The information in the `ContentType` class is used to describe the data contained in an email message in such a way that software that displays email can present the content in an appropriate manner. `ContentType` is used with the `Attachment` class to specify the type of content in the attachment.

The syntax of the Content-Type header is described in RFC 2045 Section 5.1. RFC 2046 provides detailed information about MIME media types and their parameters. These RFCs are available at https://www.ietf.org.

#### Examples
The following code example sends an email message with an attachment and displays the `Attachment.ContentDisposition` properties for the attachment.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentType.ContentType() constructor

```csharp
public ContentType ();
```

Initializes a new default instance of the `ContentType` class.

#### Remarks
This constructor initializes the `MediaType` property to `"application/octet-stream"`.

#### Examples
The following code example demonstrates how to call this constructor.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentType.ContentType(String) constructor

```csharp
public ContentType (string contentType);
```

Initializes a new instance of the `ContentType` class using the specified string.

Parameters:

- `contentType`: A `String`, for example, `"text/plain; charset=us-ascii"`, that contains the MIME media type, subtype, and optional parameters.

Exceptions:

- `ArgumentNullException`: `contentType` is `null`.
- `ArgumentException`: `contentType` is `String.Empty` ("").
- `FormatException`: `contentType` is in a form that cannot be parsed.

#### Remarks
The syntax of the `contentType` string is described in RFC 2045 Section 5.1 available at https://www.ietf.org.

#### Examples
The following code example demonstrates how to call this constructor.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentType.Boundary property

```csharp
public string? Boundary { get; set; }
```

Gets or sets the value of the boundary parameter included in the Content-Type header represented by this instance.

Returns: A `String` that contains the value associated with the boundary parameter.

#### Remarks
In the following example of a Content-Type header, the value of the `ContentType.Boundary` parameter is "`-----boundary---0`".

`content-type: multipart/mixed; boundary=-----boundary---0`

Set this property to `null` or `Empty` to remove the boundary information from the header.

The syntax of the Content-Type header is described in RFC 2045 Section 5.1. An in-depth discussion of the boundary parameter is contained in RFC 2046 Section 5.1.1. These RFCs are available at https://www.ietf.org.

#### Examples
The following code example displays the value of the `Boundary` property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentType.CharSet property

```csharp
public string? CharSet { get; set; }
```

Gets or sets the value of the charset parameter included in the Content-Type header represented by this instance.

Returns: A `String` that contains the value associated with the charset parameter.

#### Remarks
In the following example of a Content-Type header, the value of the `CharSet` property is "`us-ascii`".

`content-type: application/x-myType; charset=us-ascii`

Set this property to `null` or `Empty` to remove the charset information from the header.

A grammar that details the syntax of the Content-Type header is described in RFC 2045 Section 5.1. An in-depth discussion of the charset parameter is contained in RFC 2046 Section 4.1.2. These RFCs are available at https://www.ietf.org.

#### Examples
The following code example displays the value of the property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentType.MediaType property

```csharp
public string MediaType { get; set; }
```

Gets or sets the media type value included in the Content-Type header represented by this instance.

Returns: A `String` that contains the media type and subtype value. This value does not include the semicolon (;) separator that follows the subtype.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation is `null`.
- `ArgumentException`: The value specified for a set operation is `String.Empty` ("").
- `FormatException`: The value specified for a set operation is in a form that cannot be parsed.

#### Remarks
In the following example of a Content-Type header, the value of the `MediaType` property is `"application/x-myType"`.

`content-type: application/x-myType; name=data.xyz`

Set this property to `null` or `Empty` to remove the name information from the header.

The syntax of the Content-Type header is described in RFC 2045 Section 5.1. RFC 2046 provides detailed information on MIME media types. These RFCs are available at https://www.ietf.org.

#### Examples
The following code example sets the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentType.Name property

```csharp
public string Name { get; set; }
```

Gets or sets the value of the name parameter included in the Content-Type header represented by this instance.

Returns: A `String` that contains the value associated with the name parameter.

#### Remarks
In the following example of a Content-Type header, the value of the `Name` property is `"data.xyz"`.

`content-type: application/x-myType; name=data.xyz`

A grammar that details the syntax of the Content-Type header is described in RFC 2045 Section 5.1, available at https://www.ietf.org.

When specifying content for a `Attachment` as a `Stream` or `String`, you can use `ContentType.Name` to set the name of the file that stores the content on the recipient's system.

#### Examples
The following code example sets the value of the property to specify a name for a file being attached as a stream.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentType.Parameters property

```csharp
public System.Collections.Specialized.StringDictionary Parameters { get; }
```

Gets the dictionary that contains the parameters included in the Content-Type header represented by this instance.

Returns: A writable `StringDictionary` that contains name and value pairs.

#### Remarks
You can set the parameters by specifying the entire Content-Header value when constructing a `ContentType` object or you can add parameters to the `StringDictionary` returned by the `Parameters` property.

When adding a parameter entry to the dictionary, the name of the parameter is the entry's key and the value of the parameter is the entry's value.

A grammar that details the syntax of the Content-Type header is described in RFC 2045 Section 5.1. RFC 2046 provides detailed information on MIME media types and their associated parameters. These RFCs are available at https://www.ietf.org.

#### Examples
The following code example displays the values in the dictionary returned by this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentType.Equals(Object) method

```csharp
public override bool Equals (object? rparam);
```

Determines whether the content-type header of the specified `ContentType` object is equal to the content-type header of this object.

Parameters:

- `rparam`: The `ContentType` object to compare with this object.

Returns: `true` if the content-type headers are the same; otherwise `false`.

To be added.

## ContentType.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Determines the hash code of the specified `ContentType` object.

Returns: An integer hash value.

To be added.

## ContentType.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of this `ContentType` object.

Returns: A `String` that contains the current settings for this `ContentType`.

#### Remarks
The value of the `ContentType.ToString` method contains the string used to create this `ContentType`, if one was specified and no property values have been changed. If no string was specified, or one or more property values have changed since this `ContentType` was created, the value of `ContentType.ToString` is a string in the format of a Content-Type header that is composed using the current property values. The string does not include the `"Content-type:"` prefix.

The syntax of the Content-Type header is described in RFC 2045 Section 5.1, available at https://www.ietf.org.

#### Examples
The following code example displays the string representation of a `ContentType`.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
