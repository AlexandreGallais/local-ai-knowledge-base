---
title: "HtmlEncoder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Encodings.Web/HtmlEncoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# HtmlEncoder class

Namespace: `System.Text.Encodings.Web`

```csharp
public abstract class HtmlEncoder : System.Text.Encodings.Web.TextEncoder
```

Represents an HTML character encoding.

#### Remarks
The source code for this type is available in the System.Text.Encodings.Web project on GitHub. Unit tests that can also serve as code examples are found in the System.Text.Encodings.Web/tests folder on GitHub.

## HtmlEncoder.HtmlEncoder() constructor

```csharp
protected HtmlEncoder ();
```

Initializes a new instance of the `HtmlEncoder` class.

## HtmlEncoder.Default property

```csharp
public static System.Text.Encodings.Web.HtmlEncoder Default { get; }
```

Gets a built-in instance of the `HtmlEncoder` class.

Returns: A built-in instance of the `HtmlEncoder` class.

## HtmlEncoder.Create(TextEncoderSettings) method

```csharp
public static System.Text.Encodings.Web.HtmlEncoder Create (System.Text.Encodings.Web.TextEncoderSettings settings);
```

Creates a new instance of the HtmlEncoder class with the specified settings.

Parameters:

- `settings`: Settings that control how the `HtmlEncoder` instance encodes, primarily which characters to encode.

Returns: A new instance of the `HtmlEncoder` class.

Exceptions:

- `ArgumentNullException`: `settings` is `null`.

## HtmlEncoder.Create(UnicodeRange[]) method

```csharp
public static System.Text.Encodings.Web.HtmlEncoder Create (params System.Text.Unicode.UnicodeRange[] allowedRanges);
```

Creates a new instance of the HtmlEncoder class that specifies characters the encoder is allowed to not encode.

Parameters:

- `allowedRanges`: The set of characters that the encoder is allowed to not encode.

Returns: A new instance of the `HtmlEncoder` class.

Exceptions:

- `ArgumentNullException`: `allowedRanges` is `null`.

#### Remarks
Some characters in `allowedRanges` might still be encoded; that is, this parameter indicates what ranges the encoder is allowed to not encode, not what characters it must not encode.
