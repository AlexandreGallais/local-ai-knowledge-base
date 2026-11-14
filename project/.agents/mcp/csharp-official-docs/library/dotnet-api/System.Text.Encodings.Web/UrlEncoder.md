---
title: "UrlEncoder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Encodings.Web/UrlEncoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# UrlEncoder class

Namespace: `System.Text.Encodings.Web`

```csharp
public abstract class UrlEncoder : System.Text.Encodings.Web.TextEncoder
```

Represents a URL character encoding.

#### Remarks
The source code for this type is available in the System.Text.Encodings.Web project on GitHub. Unit tests that can also serve as code examples are found in the System.Text.Encodings.Web/tests folder on GitHub.

## UrlEncoder.UrlEncoder() constructor

```csharp
protected UrlEncoder ();
```

Initializes a new instance of the `UrlEncoder` class.

## UrlEncoder.Default property

```csharp
public static System.Text.Encodings.Web.UrlEncoder Default { get; }
```

Gets a built-in instance of the `UrlEncoder` class.

Returns: A built-in instance of the `UrlEncoder` class.

## UrlEncoder.Create(TextEncoderSettings) method

```csharp
public static System.Text.Encodings.Web.UrlEncoder Create (System.Text.Encodings.Web.TextEncoderSettings settings);
```

Creates a new instance of UrlEncoder class with the specified settings.

Parameters:

- `settings`: Settings that control how the `UrlEncoder` instance encodes, primarily which characters to encode.

Returns: A new instance of the `UrlEncoder` class.

Exceptions:

- `ArgumentNullException`: `settings` is `null`.

## UrlEncoder.Create(UnicodeRange[]) method

```csharp
public static System.Text.Encodings.Web.UrlEncoder Create (params System.Text.Unicode.UnicodeRange[] allowedRanges);
```

Creates a new instance of the UrlEncoder class that specifies characters the encoder is allowed to not encode.

Parameters:

- `allowedRanges`: The set of characters that the encoder is allowed to not encode.

Returns: A new instance of the `UrlEncoder` class.

Exceptions:

- `ArgumentNullException`: `allowedRanges` is `null`.

#### Remarks
Some characters in `allowedRanges` might still be encoded; that is, this parameter indicates what ranges the encoder is allowed to not encode, not what characters it must not encode.
