---
title: "JavaScriptEncoder class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Encodings.Web/JavaScriptEncoder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JavaScriptEncoder class

Namespace: `System.Text.Encodings.Web`

```csharp
public abstract class JavaScriptEncoder : System.Text.Encodings.Web.TextEncoder
```

Represents a JavaScript character encoding.

#### Remarks
The source code for this type is available in the System.Text.Encodings.Web project on GitHub. Unit tests that can also serve as code examples are found in the System.Text.Encodings.Web/tests folder on GitHub.

## JavaScriptEncoder.JavaScriptEncoder() constructor

```csharp
protected JavaScriptEncoder ();
```

Initializes a new instance of the `JavaScriptEncoder` class.

To be added.

## JavaScriptEncoder.Default property

```csharp
public static System.Text.Encodings.Web.JavaScriptEncoder Default { get; }
```

Gets a built-in instance of the `JavaScriptEncoder` class.

Returns: A built-in instance of the `JavaScriptEncoder` class.

To be added.

## JavaScriptEncoder.UnsafeRelaxedJsonEscaping property

```csharp
public static System.Text.Encodings.Web.JavaScriptEncoder UnsafeRelaxedJsonEscaping { get; }
```

Gets a built-in JavaScript encoder instance that is less strict about what is encoded.

Returns: A JavaScript encoder instance.

#### Remarks

Unlike the `Default` encoder, this encoder instance does not escape HTML-sensitive characters such as <, >, &. As a result, it must be used cautiously; for example, it can be used if the output data is within a response whose content-type is known with a charset set to UTF-8.

Unlike the `Default` encoding, the quotation mark is encoded as \\" rather than \u0022.

Unlike the `Default` encoding (which only allows `BasicLatin`), using this encoder instance allows `All` to go through unescaped.

Unlike the `Default` encoder, this encoder instance allows some other characters (such as '+') to go through unescaped and therefore must be used cautiously.

For more information about why this could be **unsafe**, see Serialize all characters.

## JavaScriptEncoder.Create(TextEncoderSettings) method

```csharp
public static System.Text.Encodings.Web.JavaScriptEncoder Create (System.Text.Encodings.Web.TextEncoderSettings settings);
```

Creates a new instance of JavaScriptEncoder class with the specified settings.

Parameters:

- `settings`: Settings that control how the `JavaScriptEncoder` instance encodes, primarily which characters to encode.

Returns: A new instance of the `JavaScriptEncoder` class.

Exceptions:

- `ArgumentNullException`: `settings` is `null`.

To be added.

## JavaScriptEncoder.Create(UnicodeRange[]) method

```csharp
public static System.Text.Encodings.Web.JavaScriptEncoder Create (params System.Text.Unicode.UnicodeRange[] allowedRanges);
```

Creates a new instance of the JavaScriptEncoder class that specifies characters the encoder is allowed to not encode.

Parameters:

- `allowedRanges`: The set of characters that the encoder is allowed to not encode.

Returns: A new instance of the `JavaScriptEncoder` class.

Exceptions:

- `ArgumentNullException`: `allowedRanges` is `null`.

#### Remarks
Some characters in `allowedRanges` might still be encoded; that is, this parameter indicates what ranges the encoder is allowed to not encode, not what characters it must not encode.
