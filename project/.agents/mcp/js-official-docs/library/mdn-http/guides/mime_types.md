---
title: "Media types (MIME types) (part 1 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/mime_types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Media types (MIME types)

A **media type** (formerly known as a **Multipurpose Internet Mail Extensions or MIME type**) indicates the nature and format of a document, file, or assortment of bytes.
MIME types are defined and standardized in IETF's .

The Internet Assigned Numbers Authority (IANA) is responsible for all official MIME types, and you can find the most up-to-date and complete list at their Media Types page.

> **Warning:**
> Browsers use the MIME type, _not the file extension_, to determine how to process a URL,
> so it's important that web servers send the correct MIME type in the response's `Content-Type` header.
> If this is not correctly configured, browsers are likely to misinterpret the contents of files, sites will not work correctly, and downloaded files may be mishandled.

## Structure of a MIME type

A MIME type most commonly consists of just two parts: a _type_ and a _subtype_, separated by a slash (`/`) — with no whitespace between:

```plain
type/subtype
```

The **_type_** represents the general category into which the data type falls, such as `video` or `text`.

The **_subtype_** identifies the exact kind of data of the specified type the MIME type represents.
For example, for the MIME type `text`, the subtype might be `plain` (plain text), `html` (HTML source code), or `calendar` (for iCalendar/`.ics`) files.

Each type has its own set of possible subtypes. A MIME type always has both a type and a subtype, never just one or the other.

An optional **parameter** can be added to provide additional details:

```plain
type/subtype;parameter=value
```

For example, for any MIME type whose main type is `text`, you can add the optional `charset` parameter to specify the character set used for the
characters in the data.
If no `charset` is specified, the default is ASCII (`US-ASCII`) unless overridden by the user agent's settings.
To specify a UTF-8 text file, the MIME type `text/plain;charset=UTF-8` is used.

MIME types are case-insensitive but are traditionally written in lowercase. The parameter values can be case-sensitive.

### Types

There are two classes of type: **discrete** and **multipart**.
Discrete types are types which represent a single file or medium, such as a single text or music file, or a single video.
A multipart type represents a document that's comprised of multiple component parts, each of which may have its own individual MIME type; or, a multipart type may encapsulate multiple files being sent together in one transaction.
For example, multipart MIME types are used when attaching multiple files to an email.

#### Discrete types

The discrete types currently registered with the IANA are:

- `application`
    Any kind of binary data that doesn't fall explicitly into one of the other types;
    either data that will be executed or interpreted in some way or binary data that requires a specific application or category of application to use.
    Generic binary data (or binary data whose true type is unknown) is `application/octet-stream`.
    Other common examples include `application/pdf`, `application/pkcs8`, `application/wasm`, and `application/zip`.
    (See application type registry at IANA)
- `audio`
    Audio or music data. Examples include `audio/mpeg`,
    `audio/vorbis`.
    (See audio type registry at IANA)
- `example`
    Reserved for use as a placeholder in examples showing how to use MIME types.
    These should never be used outside of sample code listings and documentation.
    `example` can also be used as a subtype;
    for instance, in an example related to working with audio on the web, the MIME type `audio/example` can be used to indicate that the type is a placeholder and should be replaced with an appropriate one when using the code in the real world.
- `font`
    Font/typeface data. Common examples include `font/woff`, `font/ttf`, and `font/otf`.
    (See font type registry at IANA)
- `image`
    Image or graphical data including both bitmap and vector still images as well as
    animated versions of still image formats such as animated GIF or APNG.
    Common examples are `image/jpeg`, `image/png`, and `image/svg+xml`.
    (See image type registry at IANA)
- `model`
    Model data for a 3D object or scene. Examples include `model/3mf` and `model/vrml`.
    (See model type registry at IANA)
- `text`
    Text-only data including any human-readable content, source code, or textual data such as comma-separated value (CSV) formatted data.
    Examples include: `text/plain`, `text/csv`, and `text/html`.
    (See text type registry at IANA)
- `video`
    Video data or files, such as MP4 movies (`video/mp4`).
    (See video type registry at IANA)

For text documents without a specific subtype, `text/plain` should be used.
Similarly, for binary documents without a specific or known subtype, `application/octet-stream` should be used.

#### Multipart types

**Multipart** types indicate a category of document broken into
pieces, often with different MIME types; they can also be used — especially in email
scenarios — to represent multiple, separate files which are all part of the same
transaction. They represent a **composite document**.

Except for `multipart/form-data`, used in the `POST` method of HTML Forms, and `multipart/byteranges`, used with `206` `Partial Content` to send part of a document, HTTP doesn't handle multipart documents in a special way: the message is transmitted to the browser (which will likely
show a "Save As" window if it doesn't know how to display the document).

There are two multipart types:

- `message`
    A message that encapsulates other messages. This can be used, for instance, to represent an email that includes a forwarded message as part of its data,
    or to allow sending very large messages in chunks as if it were multiple messages.
    Examples include `message/rfc822` (for forwarded or replied-to message quoting) and `message/partial` to allow breaking a large message into smaller ones automatically to be reassembled by the recipient.
    (See message type registry at IANA)
- `multipart`
    Data that consists of multiple components which may individually have different MIME types.
    Examples include `multipart/form-data` (for data produced using the `FormData` API) and `multipart/byteranges` (defined in 5.4.1 and used with HTTP's ``
    "Partial Content" response returned when the fetched data is only part of the content, such as is delivered using the `Range` header).
    (See multipart type registry at IANA)
