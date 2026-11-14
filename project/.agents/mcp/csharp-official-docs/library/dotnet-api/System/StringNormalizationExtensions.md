---
title: "StringNormalizationExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/StringNormalizationExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# StringNormalizationExtensions class

Namespace: `System`

```csharp
public static class StringNormalizationExtensions
```

Provides extension methods to work with string normalization.

#### Remarks

The extension methods of the `StringNormalizationExtensions` class are designed to work with .NET implementations that do not support the `String.IsNormalized` and `String.Normalize` methods. However, these methods are included in the `String` class in .NET Standard 2.0 and are therefore available on all .NET implementations that support the .NET Standard 2.0. For more information, see .NET Standard.

## StringNormalizationExtensions.GetNormalizedLength(Char>, NormalizationForm) method

```csharp
public static int GetNormalizedLength (this ReadOnlySpan<char> source, System.Text.NormalizationForm normalizationForm = System.Text.NormalizationForm.FormC);
```

Gets the estimated length of the normalized form of the specified string in the `NormalizationForm.FormC`.

Parameters:

- `source`: The character span to get the estimated length of the normalized form.
- `normalizationForm`: The normalization form to use.

Returns: The estimated length of the normalized form of the specified string.

Exceptions:

- `ArgumentException`: The specified character span contains an invalid code point or the normalization form is invalid.

To be added.

## StringNormalizationExtensions.IsNormalized(String) method

```csharp
public static bool IsNormalized (this string strInput);
```

To be added.

Parameters:

- `strInput`: To be added.

Returns: To be added.

To be added.

## StringNormalizationExtensions.IsNormalized(Char>, NormalizationForm) method

```csharp
public static bool IsNormalized (this ReadOnlySpan<char> source, System.Text.NormalizationForm normalizationForm = System.Text.NormalizationForm.FormC);
```

Determines whether the specified span of characters is in a normalized form.

Parameters:

- `source`: The span of characters to check.
- `normalizationForm`: The normalization form to use.

Returns: `true` if the specified span of characters is in a normalized form; otherwise, `false`.

Exceptions:

- `ArgumentException`: The specified character span contains an invalid code point or the normalization form is invalid.

To be added.

## StringNormalizationExtensions.IsNormalized(String, NormalizationForm) method

```csharp
public static bool IsNormalized (this string strInput, System.Text.NormalizationForm normalizationForm);
```

To be added.

Parameters:

- `strInput`: To be added.
- `normalizationForm`: To be added.

Returns: To be added.

To be added.

## StringNormalizationExtensions.Normalize(String) method

```csharp
public static string Normalize (this string strInput);
```

To be added.

Parameters:

- `strInput`: To be added.

Returns: To be added.

To be added.

## StringNormalizationExtensions.Normalize(String, NormalizationForm) method

```csharp
public static string Normalize (this string strInput, System.Text.NormalizationForm normalizationForm);
```

To be added.

Parameters:

- `strInput`: To be added.
- `normalizationForm`: To be added.

Returns: To be added.

To be added.

## StringNormalizationExtensions.TryNormalize(Char>, Char>, Int32, NormalizationForm) method

```csharp
public static bool TryNormalize (this ReadOnlySpan<char> source, Span<char> destination, out int charsWritten, System.Text.NormalizationForm normalizationForm = System.Text.NormalizationForm.FormC);
```

Normalizes the specified span of characters to the specified normalization form.

Parameters:

- `source`: The span of characters to normalize.
- `destination`: The buffer to write the normalized characters to.
- `charsWritten`: When this method returns, contains the number of characters written to `destination`.
- `normalizationForm`: The normalization form to use.

Returns: `true` if the specified span of characters was successfully normalized; otherwise, `false`.

Exceptions:

- `ArgumentException`: The specified character span contains an invalid code point or the normalization form is invalid.

To be added.
