---
title: "Media types (MIME types) (part 2 of 2)"
tool: "mdn-http"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/http/guides/mime_types/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# Media types (MIME types) (part 2 of 2)

## Important MIME types for Web developers

### application/octet-stream

This is the default for binary files. As it means _unknown binary_ file, browsers usually don't execute it, or even ask if it should be executed. They treat it as if the `Content-Disposition` header was set to `attachment`, and propose a "Save As" dialog.

### text/plain

This is the default for textual files. Even if it really means "unknown textual file," browsers assume they can display it.

> **Note:**
> `text/plain` does not mean "any kind of textual data."
> If they expect a specific kind of textual data, they will likely not consider it a match.
> Specifically if they download a `text/plain` file from a `<link>` element declaring a CSS file, they will not recognize it as a valid CSS file if presented with `text/plain`.
> The CSS mime type `text/css` must be used.

### text/css

CSS files used to style a Web page **must** be sent with `text/css`.
If a server doesn't recognize the `.css` suffix for CSS files, it may send them with `text/plain` or `application/octet-stream` MIME types.
If so, they won't be recognized as CSS by most browsers and will be ignored.

### text/html

All HTML content should be served with this type. Alternative MIME types for XHTML (like `application/xhtml+xml`) are mostly useless nowadays.

> **Note:**
> Use `application/xml` or `application/xhtml+xml` if you want XML's strict parsing rules, [`<![CDATA[…]]>`](/en-US/docs/Web/API/CDATASection) sections, or elements that aren't from HTML/SVG/MathML namespaces.

### text/javascript

JavaScript content should always be served with the MIME type `text/javascript`.
For historic reasons, browsers may support some legacy JavaScript types listed below, but you should not assume scripts served with any MIME type other than `text/javascript` will always load or run.

Note that in HTML the `type` attribute for `<script>` elements may only contain the **JavaScript MIME type essence**: `text/javascript` or one of the keywords `module` (for ES modules) or `importmap`.
Including any parameter in the `type` attribute, such as `charset=utf-8`, is the same as setting the `type` to an unrecognized value: the script content is treated as a data block and is not executed as JavaScript.
Note that setting `type="text/javascript"` is no longer necessary; this is the default for `<script>` elements, so you may omit the `type` attribute entirely in this case.
In contrast, when using the HTTP `Content-Type` header you may optionally specify the `charset` parameter as usual.

For more information see: IANA Media Types registry, RFC 9239, and the HTML specification.

#### Legacy JavaScript MIME types

In addition to the `text/javascript` MIME type, for historical reasons, the MIME Sniffing Standard
(the definition of how browsers should interpret MIME types and figure
out what to do with content that doesn't have a valid one) also allows JavaScript to be served using any of the following legacy JavaScript MIME types:

- `application/javascript` (deprecated)
- `application/ecmascript` (deprecated)
- `application/x-ecmascript` (non-standard)
- `application/x-javascript` (non-standard)
- `text/ecmascript` (deprecated)
- `text/javascript1.0` (non-standard)
- `text/javascript1.1` (non-standard)
- `text/javascript1.2` (non-standard)
- `text/javascript1.3` (non-standard)
- `text/javascript1.4` (non-standard)
- `text/javascript1.5` (non-standard)
- `text/jscript` (non-standard)
- `text/livescript` (non-standard)
- `text/x-ecmascript` (non-standard)
- `text/x-javascript` (non-standard)

> **Note:**
> Even though any given user agent may support any or all of these, you should only use `text/javascript`.
> It's the only MIME type guaranteed to work now and into the future.

### application/json

JavaScript Object Notation (JSON) is a standard text-based format for representing structured data based on JavaScript object syntax.
It is commonly used for transmitting data in web applications.

### Image types

Files whose MIME type is `image` contain image data.
The subtype specifies which specific image file format the data represents.

The following image types are used commonly enough to be considered _safe_ for use on web pages:

- `image/apng`: Animated Portable Network Graphics (APNG)
- `image/avif` : AV1 Image File Format (AVIF)
- `image/gif`: Graphics Interchange Format (GIF)
- `image/jpeg`: Joint Photographic Expert Group image (JPEG)
- `image/png`: Portable Network Graphics (PNG)
- `image/svg+xml`: Scalable Vector Graphics (SVG)
- `image/webp`: Web Picture format (WEBP)

The Image file type and format guide provides information and recommendations about when to use the different image formats.

### Audio and video types

As is the case for images, HTML doesn't mandate that web browsers support any specific file and codec types for the `<audio>` and `` elements, so it's important to consider your target audience and the range of browsers (and versions of those browsers) they may be using when choosing the file type and codecs to use for media.

Our media container formats guide provides a list of the file types that are commonly supported by web browsers,
including information about what their special use cases may be, any drawbacks they have, and compatibility information, along with other details.

The audio codec and video codec guides list the various codecs that web browsers often support, providing compatibility details along with technical information such as how many audio channels they support, what sort of compression is used, and what bit rates and so forth they're useful at.
The codecs used by WebRTC guide expands upon this by specifically covering the codecs supported by the major web browsers, so you can choose the codecs that best cover the range of browsers you wish to support.

As for MIME types of audio or video files, they typically specify the container format (file type).
The optional codecs parameter can be added to the MIME type to further specify which codecs to use and what options were used to encode the media, such as codec profile, level, or other such information.

For more information on common media types, see the Common MIME types page.

### multipart/form-data

The `multipart/form-data` type can be used when sending the values of a completed HTML Form from browser to server.

As a multipart document format, it consists of different parts, delimited by a boundary (a string starting with a double dash `--`).
Each part is its own entity with its own HTTP headers, `Content-Disposition`, and `Content-Type` for file uploading fields.

```http
Content-Type: multipart/form-data; boundary=boundaryString
(other headers associated with the multipart document as a whole)

--boundaryString
Content-Disposition: form-data; name="myFile"; filename="img.jpg"
Content-Type: image/jpeg

(data)
--boundaryString
Content-Disposition: form-data; name="myField"

(data)
--boundaryString
(more subparts)
--boundaryString--
```

The following `<form>`:

```html
<form
  action="http://localhost:8000/"
  method="post"
  enctype="multipart/form-data">
  <label>Name: <input name="myTextField" value="Test" /></label>
  <label><input type="checkbox" name="myCheckBox" /> Check</label>
  <label> Upload file: <input type="file" name="myFile" /> </label>
  <button>Send the file</button>
</form>
```

will send this message:

```http
POST / HTTP/1.1
Host: localhost:8000
User-Agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10.9; rv:50.0) Gecko/20100101 Firefox/50.0
Accept: text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8
Accept-Language: en-US,en;q=0.5
Accept-Encoding: gzip, deflate
Connection: keep-alive
Upgrade-Insecure-Requests: 1
Content-Type: multipart/form-data; boundary=---------------------------8721656041911415653955004498
Content-Length: 465

-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myTextField"

Test
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myCheckBox"

on
-----------------------------8721656041911415653955004498
Content-Disposition: form-data; name="myFile"; filename="test.txt"
Content-Type: text/plain

Simple file.
-----------------------------8721656041911415653955004498--
```

### multipart/byteranges

The `multipart/byteranges` MIME type is used to send partial responses to the browser.

When the `206 Partial Content` status code is sent, this MIME type indicates that the document is composed of several parts, one for each of the
requested ranges. Like other multipart types, the `Content-Type` uses a `boundary` to separate the pieces.
Each piece has a `Content-Type` header with its actual type and a `Content-Range` of the range it represents.

```http
HTTP/1.1 206 Partial Content
Accept-Ranges: bytes
Content-Type: multipart/byteranges; boundary=3d6b6a416f9b5
Content-Length: 385

--3d6b6a416f9b5
Content-Type: text/html
Content-Range: bytes 100-200/1270

eta http-equiv="Content-type" content="text/html; charset=utf-8" />
    <meta name="viewport" content
--3d6b6a416f9b5
Content-Type: text/html
Content-Range: bytes 300-400/1270

-color: #f0f0f2;
        margin: 0;
        padding: 0;
        font-family: "Open Sans", "Helvetica
--3d6b6a416f9b5--
```

## Importance of setting the correct MIME type

Some server configurations may use the associated MIME type to perform optimizations, such as file concatenation, compression, or caching. See h5bp/server-configs-apache for an example of an Apache configuration that compresses files of certain MIME types.

Most web servers send unrecognized resources as the `application/octet-stream` MIME type.
For security reasons, most browsers do not allow setting a custom default action (like "Open in Word") for such resources, forcing the user to save it to disk to use it.

Some common incorrect server configurations:

- RAR-compressed files.
  In this case, the ideal would be the true type of the original files; this is often impossible as .RAR files can hold several resources of different types.
  In this case, configure the server to send `application/x-rar-compressed`.
- Audio and video.
  Only resources with the correct MIME Type will be played in `` or `<audio>` elements.
  Be sure to specify the correct media type for audio and video.
- Proprietary file types.
  A specific type like `application/vnd.mspowerpoint` lets users open such files automatically in the presentation software of their choice.

## MIME sniffing

In the absence of a MIME type, or in certain cases where browsers believe they are incorrect, browsers may perform _MIME sniffing_ — guessing the correct MIME type by looking at the bytes of the resource.

Each browser performs MIME sniffing differently and under different circumstances.
(For example, Safari will look at the file extension in the URL if the sent MIME type is unsuitable.)
There are security concerns as some MIME types represent executable content.
Servers can prevent MIME sniffing by sending the `X-Content-Type-Options` header.

## Other methods of conveying document type

MIME types are not the only way to convey document type information:

- Filename suffixes are sometimes used, especially on Microsoft Windows.
  Not all operating systems consider these suffixes meaningful (such as Linux and macOS), and there is no guarantee they are correct.
- Magic numbers. The syntax of different formats allows file-type inference by looking at their byte structure.
  For example, GIF files start with the `47 49 46 38 39` hexadecimal value (`GIF89`), and PNG files with `89 50 4E 47` (`.PNG`).
  Not all file types have magic numbers, so this is not 100% reliable either.

## See also

- Web media technologies
- Guide to media types used on the web
- Properly configuring server MIME types
