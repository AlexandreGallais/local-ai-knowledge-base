---
title: "X500DistinguishedNameFlags enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography.X509Certificates/X500DistinguishedNameFlags.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# X500DistinguishedNameFlags enum

Namespace: `System.Security.Cryptography.X509Certificates`

```csharp
public enum X500DistinguishedNameFlags
```

Specifies characteristics of the X.500 distinguished name.

#### Remarks
This enumeration is used with the `X500DistinguishedName` class to indicate special characters contained in the distinguished name.

Several values are mutually exclusive in this enumeration; use only one of these values to define the special characteristics of an X.500 distinguished name. For example, specify only one of the `UseCommas`, `UseNewLines` , and `UseSemicolons` values. You would also specify either `UseT61Encoding` or `UseUTF8Encoding`.

#### Examples

The following code example shows how to use the `X500DistinguishedNameFlags` enumeration.

_Code sample not included: ~/snippets/csharp/System.Security.Cryptography.X509Certificates/X500DistinguishedName/Overview/x500.cs._

## X500DistinguishedNameFlags.DoNotUsePlusSign field

```csharp
DoNotUsePlusSign
```

The distinguished name does not use the plus sign.

## X500DistinguishedNameFlags.DoNotUseQuotes field

```csharp
DoNotUseQuotes
```

The distinguished name does not use quotation marks.

## X500DistinguishedNameFlags.ForceUTF8Encoding field

```csharp
ForceUTF8Encoding
```

Forces the distinguished name to encode specific X.500 keys as UTF-8 strings rather than printable Unicode strings. For more information and the list of X.500 keys affected, see the X500NameFlags enumeration.

## X500DistinguishedNameFlags.None field

```csharp
None
```

The distinguished name has no special characteristics.

## X500DistinguishedNameFlags.Reversed field

```csharp
Reversed
```

The distinguished name is reversed.

## X500DistinguishedNameFlags.UseCommas field

```csharp
UseCommas
```

The distinguished name uses commas.

## X500DistinguishedNameFlags.UseNewLines field

```csharp
UseNewLines
```

The distinguished name uses the new line character.

## X500DistinguishedNameFlags.UseSemicolons field

```csharp
UseSemicolons
```

The distinguished name uses semicolons.

## X500DistinguishedNameFlags.UseT61Encoding field

```csharp
UseT61Encoding
```

The distinguished name uses T61 encoding.

## X500DistinguishedNameFlags.UseUTF8Encoding field

```csharp
UseUTF8Encoding
```

The distinguished name uses UTF8 encoding instead of Unicode character encoding.
