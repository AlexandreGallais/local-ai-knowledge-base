---
title: "Breaking change: .NET 10 obsoletions with custom IDs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/10.0/obsolete-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# API obsoletions with non-default diagnostic IDs (.NET 10)

Some APIs have been marked as obsolete, starting in .NET 10. This breaking change is specific to APIs that have been marked as obsolete *with a custom diagnostic ID*. Suppressing the default obsoletion diagnostic ID, which is CS0618 for the C# compiler, does not suppress the warnings that the compiler generates when these APIs are used.

## Change description

In previous .NET versions, these APIs can be used without any build warning. In .NET 10 and later versions, use of these APIs produces a compile-time warning or error with a custom diagnostic ID. The use of custom diagnostic IDs allows you to suppress the obsoletion warnings individually instead of blanket-suppressing all obsoletion warnings.

The following table lists the custom diagnostic IDs and their corresponding warning messages for obsoleted APIs.

| Diagnostic ID | Description | Severity |
|---------------|-------------|----------|
| SYSLIB0058 | The `KeyExchangeAlgorithm`, `KeyExchangeStrength`, `CipherAlgorithm`, `CipherAlgorithmStrength`, `HashAlgorithm`, and `HashStrength` properties of `System.Net.Security.SslStream` are obsolete. Use `System.Net.Security.SslStream.NegotiatedCipherSuite` instead. | Warning |
| SYSLIB0059 | `Microsoft.Win32.SystemEvents.EventsThreadShutdown` callbacks aren't run before the process exits. Use `System.AppDomain.ProcessExit` instead.  | Warning |
| SYSLIB0060 | `System.Security.Cryptography.Rfc2898DeriveBytes` constructors are obsolete. Use `System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*` instead. | Warning |
| SYSLIB0061 | `System.Linq.Queryable.MaxBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})` and `System.Linq.Queryable.MinBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})` taking an `IComparer<TSource>` are obsolete. Use the new ones that take an `IComparer<TKey>`. | Warning |
| SYSLIB0062 | `System.Xml.Xsl.XsltSettings.EnableScript` is obsolete. | Warning |

## Version introduced

.NET 10

## Type of breaking change

These obsoletions can affect source compatibility.

## Recommended action

- Follow the specific guidance provided for the each diagnostic ID using the URL link provided on the warning.

- Warnings or errors for these obsoletions can't be suppressed using the standard diagnostic ID for obsolete types or members; use the custom `SYSLIBxxxx` diagnostic ID value instead.

## Affected APIs

### SYSLIB0058

- `System.Net.Security.SslStream.KeyExchangeAlgorithm`
- `System.Net.Security.SslStream.KeyExchangeStrength`
- `System.Net.Security.SslStream.CipherAlgorithm`
- `System.Net.Security.SslStream.CipherStrength`
- `System.Net.Security.SslStream.HashAlgorithm`
- `System.Net.Security.SslStream.HashStrength`
- `System.Security.Authentication.ExchangeAlgorithmType`
- `System.Security.Authentication.CipherAlgorithmType`
- `System.Security.Authentication.HashAlgorithmType`

### SYSLIB0059

- `Microsoft.Win32.SystemEvents.EventsThreadShutdown`

### SYSLIB0060

- `System.Security.Cryptography.Rfc2898DeriveBytes`
- `System.Security.Cryptography.Rfc2898DeriveBytes.Pbkdf2*`

### SYSLIB0061

- `System.Linq.Queryable.MaxBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})`
- `System.Linq.Queryable.MinBy``2(System.Linq.IQueryable{``0},System.Linq.Expressions.Expression{System.Func{``0,``1}},System.Collections.Generic.IComparer{``0})`

### SYSLIB0062

- `System.Xml.Xsl.XsltSettings.EnableScript`

## See also

- API obsoletions with non-default diagnostic IDs (.NET 9)
- API obsoletions with non-default diagnostic IDs (.NET 8)
- Obsolete features in .NET 5+
