---
title: "ContentDisposition class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Mime/ContentDisposition.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ContentDisposition class

Namespace: `System.Net.Mime`

```csharp
public class ContentDisposition
```

Represents a MIME protocol Content-Disposition header.

#### Remarks
The information in the `ContentDisposition` class accompanies an email message that contains attachments when the email message is sent to its destination. The information in `ContentDisposition` can be used by software that displays email to present the email attachments in the manner intended by the sender.

Email messages are created using instances of the `MailMessage` class. Instances of the `Attachment` class are used to add attachments to email messages. To modify the `ContentDisposition` for an attachment, get the instance from the `ContentDisposition` property.

Content to be displayed as part of the message body has the disposition type of `ContentDisposition.Inline`. Content that is not displayed but is attached in a separate file has the disposition type of `Attachment`. Use the `Inline` property to control the disposition type for the attachment associated with an instance of `ContentDisposition`.

For file attachments, you can use the properties of the `ContentDisposition` to set the file size, as well as the date the file was created, last read, and last modified. For all attachments, you can set a recommended file name in the event that the attachment is stored on the receiving computer.

The `ContentDisposition.ToString` method returns the Content-Disposition header. The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example creates an email message with an attachment to be displayed inline.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.ContentDisposition() constructor

```csharp
public ContentDisposition ();
```

Initializes a new instance of the `ContentDisposition` class with a `ContentDisposition.DispositionType` of `DispositionTypeNames.Attachment`.

#### Remarks
The instance returned by this constructor has the `DispositionType` property set to `Attachment`.

#### Examples
The following code example demonstrates how to call this constructor.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.ContentDisposition(String) constructor

```csharp
public ContentDisposition (string disposition);
```

Initializes a new instance of the `ContentDisposition` class with the specified disposition information.

Parameters:

- `disposition`: A `DispositionTypeNames` value that contains the disposition.

Exceptions:

- `FormatException`: `disposition` is `null` or equal to `String.Empty` ("").

#### Examples
The following code example demonstrates how to call this constructor.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.CreationDate property

```csharp
public DateTime CreationDate { get; set; }
```

Gets or sets the creation date for a file attachment.

Returns: A `DateTime` value that indicates the file creation date; otherwise, <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if no date was specified.

#### Remarks
The `CreationDate` property is used to send time stamp information with a file being sent in an email message. This value sets the Creation-Date parameter in the Content-Disposition header sent with the email.

The `MailMessage` class is used to compose an email message. The `Attachment` class is used to attach a file to an email message. To set `CreationDate`, get the `ContentDisposition` for the attachment from the `ContentDisposition` property.

The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example demonstrates how to set this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.DispositionType property

```csharp
public string DispositionType { get; set; }
```

Gets or sets the disposition type for an email attachment.

Returns: A `String` that contains the disposition type. The value is not restricted but is typically one of the `ContentDisposition.DispositionType` values.

Exceptions:

- `ArgumentNullException`: The value specified for a set operation is `null`.
- `ArgumentException`: The value specified for a set operation is equal to `String.Empty` ("").

#### Remarks
The `DispositionType` property value can be used by software that displays email to determine the correct way to present the email attachments. `Inline` attachments are usually displayed when the user opens the email. `Attachment` attachments are usually not opened until the user performs some action, such as clicking an icon that represents the attachment.

The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example demonstrates how to set the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.FileName property

```csharp
public string? FileName { get; set; }
```

Gets or sets the suggested file name for an email attachment.

Returns: A `String` that contains the file name.

#### Remarks
The `FileName` property allows the sender to suggest the name to be used to store an email attachment on the recipient's computer. This name is a suggestion only; the receiving system can ignore it. The name must not include path information; any such information is ignored by the receiving computer.

To remove file name information, you can set this property to `null` or the empty string ("").

The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example demonstrates how to set the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.Inline property

```csharp
public bool Inline { get; set; }
```

Gets or sets a `Boolean` value that determines the disposition type (Inline or Attachment) for an email attachment.

Returns: `true` if content in the attachment is presented inline as part of the email body; otherwise, `false`.

#### Remarks
The `Inline` property sets the disposition type in the Content-Disposition header sent with the email message. The disposition type can be used by software that displays email to determine the correct way to present the email attachments. Attachments with a disposition type of `Inline` are usually displayed when the user opens the email. Attachments with a disposition type of `Attachment` are usually not opened until the user performs some additional action, such as clicking an icon that represents the attachment.

The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example demonstrates how to set the value of this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.ModificationDate property

```csharp
public DateTime ModificationDate { get; set; }
```

Gets or sets the modification date for a file attachment.

Returns: A `DateTime` value that indicates the file modification date; otherwise, <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if no date was specified.

#### Remarks
The `ModificationDate` property is used to send time stamp information with a file being sent in an email message. This value sets the Modification-Date parameter in the Content-Disposition header sent with the email message.

The `MailMessage` class is used to compose an email message. The `Attachment` class is used to attach a file to an email message. To set the `ModificationDate` property, get the `ContentDisposition` for the attachment using the `ContentDisposition` property.

The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example demonstrates how to set this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.Parameters property

```csharp
public System.Collections.Specialized.StringDictionary Parameters { get; }
```

Gets the parameters included in the Content-Disposition header represented by this instance.

Returns: A writable `StringDictionary` that contains parameter name/value pairs.

#### Remarks
Typically, the parameters are determined by the property values so you do not need to access them. If you need to add or change parameter information, modify the dictionary returned by the `Parameters` property.

The Content-Disposition header is described in RFC 2183, available at https://www.ietf.org.

#### Examples
The following code example displays the parameters that are sent to the Content-Disposition header.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.ReadDate property

```csharp
public DateTime ReadDate { get; set; }
```

Gets or sets the read date for a file attachment.

Returns: A `DateTime` value that indicates the file read date; otherwise, <see cref="F:System.DateTime.MinValue">DateTime.MinValue</see> if no date was specified.

#### Remarks
The `ReadDate` property is used to send time stamp information with a file being sent in an email message. This value sets the Read-Date parameter in the Content-Disposition header sent with the email message.

The `MailMessage` class is used to compose an email message. The `Attachment` class is used to attach a file to an email message. To set `ContentDisposition.ReadDate`, get the `ContentDisposition` for the attachment by using the `ContentDisposition` property.

The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example demonstrates how to set this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.Size property

```csharp
public long Size { get; set; }
```

Gets or sets the size of a file attachment.

Returns: A `Int32` that specifies the number of bytes in the file attachment. The default value is -1, which indicates that the file size is unknown.

#### Remarks
The `Size` property is used to send time stamp information with a file being sent in an email message. The `MailMessage` class is used to compose the message. The `Attachment` class is used to attach a file to an email message.

The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example demonstrates how to get this property.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## ContentDisposition.Equals(Object) method

```csharp
public override bool Equals (object? rparam);
```

Determines whether the content-disposition header of the specified `ContentDisposition` object is equal to the content-disposition header of this object.

Parameters:

- `rparam`: The `ContentDisposition` object to compare with this object.

Returns: `true` if the content-disposition headers are the same; otherwise `false`.

To be added.

## ContentDisposition.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Determines the hash code of the specified `ContentDisposition` object.

Returns: An integer hash value.

To be added.

## ContentDisposition.ToString() method

```csharp
public override string ToString ();
```

Returns a `String` representation of this instance.

Returns: A `String` that contains the property values for this instance.

#### Remarks
The string returned by the `ContentDisposition.ToString` method is the Content-Disposition header.

The Content-Disposition header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example demonstrates calling this method.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
