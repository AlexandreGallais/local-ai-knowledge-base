---
title: "RedactionStringBuilderExtensions class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text/RedactionStringBuilderExtensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# RedactionStringBuilderExtensions class

Namespace: `System.Text`

```csharp
public static class RedactionStringBuilderExtensions
```

Redaction utility methods.

To be added.

## RedactionStringBuilderExtensions.AppendRedacted(StringBuilder, Redactor, Char>) method

```csharp
public static System.Text.StringBuilder AppendRedacted (this System.Text.StringBuilder stringBuilder, Microsoft.Extensions.Compliance.Redaction.Redactor redactor, ReadOnlySpan<char> value);
```

Redacts potentially sensitive data and appends it to a `StringBuilder` instance.

Parameters:

- `stringBuilder`: Instance of `StringBuilder` to append the redacted value.
- `redactor`: The redactor that will redact the input value.
- `value`: Value to redact.

Returns: The value of `stringBuilder`.

Exceptions:

- `ArgumentNullException`: `redactor` is `null`.

To be added.

## RedactionStringBuilderExtensions.AppendRedacted(StringBuilder, Redactor, String) method

```csharp
public static System.Text.StringBuilder AppendRedacted (this System.Text.StringBuilder stringBuilder, Microsoft.Extensions.Compliance.Redaction.Redactor redactor, string? value);
```

Redacts potentially sensitive data and appends it to a `StringBuilder` instance.

Parameters:

- `stringBuilder`: Instance of `StringBuilder` to append the redacted value.
- `redactor`: The redactor that will redact the input value.
- `value`: Value to redact.

Returns: The value of `stringBuilder`.

Exceptions:

- `ArgumentNullException`: `redactor` is `null`.

When the `value` is `null` nothing will be appended to the string builder.
