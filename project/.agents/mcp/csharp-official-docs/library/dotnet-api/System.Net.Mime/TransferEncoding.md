---
title: "TransferEncoding enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Mime/TransferEncoding.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TransferEncoding enum

Namespace: `System.Net.Mime`

```csharp
public enum TransferEncoding
```

Specifies the Content-Transfer-Encoding header information for an email message attachment.

#### Remarks
The values in the `TransferEncoding` enumeration are used with the `TransferEncoding` property.

The Content-Transfer-Encoding header specifies the encoding of the associated message body so that it meets SMTP requirements. SMTP requires data for transport to be in 7-bit US-ASCII characters with lines no longer than 1000 characters.

Content-Transfer-Encoding values are described in detail in RFC 2045 Section 6, available at https://www.ietf.org.

#### Examples
The following code example displays `TransferEncoding` used by an attachment.

_Code sample not included: ~/snippets/csharp/System.Net.Mail/Attachment/Overview/mail.cs._
## TransferEncoding.Base64 field

```csharp
Base64
```

Encodes stream-based data. See RFC 2406 Section 6.8.

## TransferEncoding.EightBit field

```csharp
EightBit
```

The data is in 8-bit characters that may represent international characters with a total line length of no longer than 1000 8-bit characters. For more information about this 8-bit MIME transport extension, see IETF RFC 6152.

## TransferEncoding.QuotedPrintable field

```csharp
QuotedPrintable
```

Encodes data that consists of printable characters in the US-ASCII character set. See RFC 2406 Section 6.7.

## TransferEncoding.SevenBit field

```csharp
SevenBit
```

Used for data that is not encoded. The data is in 7-bit US-ASCII characters with a total line length of no longer than 1000 characters. See RFC2406 Section 2.7.

## TransferEncoding.Unknown field

```csharp
Unknown
```

Indicates that the transfer encoding is unknown.
