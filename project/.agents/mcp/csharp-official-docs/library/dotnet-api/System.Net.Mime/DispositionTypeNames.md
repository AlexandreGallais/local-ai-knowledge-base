---
title: "DispositionTypeNames class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Mime/DispositionTypeNames.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DispositionTypeNames class

Namespace: `System.Net.Mime`

```csharp
public static class DispositionTypeNames
```

Supplies the strings used to specify the disposition type for an email attachment.

#### Remarks
The values in this enumeration can be used to set the `DispositionType` property for an email attachment. The information in the `ContentDisposition` class represents the MIME Content-Disposition header. This header is described in RFC 2183 available at https://www.ietf.org.

#### Examples
The following code example sets the disposition type for an attachment.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## DispositionTypeNames.Attachment field

```csharp
public const string Attachment;
```

Specifies that the attachment is to be displayed as a file attached to the email message.

#### Examples
The following code example sets the disposition type for an attachment.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## DispositionTypeNames.Inline field

```csharp
public const string Inline;
```

Specifies that the attachment is to be displayed as part of the email message body.

#### Examples
The following code example sets the disposition type for an attachment.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
