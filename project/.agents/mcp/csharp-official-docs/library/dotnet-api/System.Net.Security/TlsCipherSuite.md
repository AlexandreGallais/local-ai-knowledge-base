---
title: "TlsCipherSuite enum (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Security/TlsCipherSuite.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TlsCipherSuite enum

Namespace: `System.Net.Security`

```csharp
public enum TlsCipherSuite
```

Represents cipher suite values for the TLS (formerly SSL) protocol.

#### Remarks
Both field names and values are based on the TLS Cipher Suites list from the Internet Assigned Numbers Authority (IANA).
This enumeration represents values that were known at the time a specific version of .NET was released. Unmapped values may be returned by properties or methods, and methods should generally not verify that a given input was defined within the enum, as the value may be transparently passed from or to the system's underlying TLS implementation.
Inclusion in this enumeration does not indicate that a .NET platform supports a particular cipher suite.

## TlsCipherSuite.TLS_AES_128_CCM_8_SHA256 field

```csharp
TLS_AES_128_CCM_8_SHA256
```

Represents the TLS_AES_128_CCM_8_SHA256 cipher suite.

## TlsCipherSuite.TLS_AES_128_CCM_SHA256 field

```csharp
TLS_AES_128_CCM_SHA256
```

Represents the TLS_AES_128_CCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_AES_128_GCM_SHA256 field

```csharp
TLS_AES_128_GCM_SHA256
```

Represents the TLS_AES_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_AES_256_GCM_SHA384 field

```csharp
TLS_AES_256_GCM_SHA384
```

Represents the TLS_AES_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_CHACHA20_POLY1305_SHA256 field

```csharp
TLS_CHACHA20_POLY1305_SHA256
```

Represents the TLS_CHACHA20_POLY1305_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_EXPORT_WITH_DES40_CBC_SHA field

```csharp
TLS_DH_anon_EXPORT_WITH_DES40_CBC_SHA
```

Represents the TLS_DH_anon_EXPORT_WITH_DES40_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_anon_EXPORT_WITH_RC4_40_MD5 field

```csharp
TLS_DH_anon_EXPORT_WITH_RC4_40_MD5
```

Represents the TLS_DH_anon_EXPORT_WITH_RC4_40_MD5 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_3DES_EDE_CBC_SHA field

```csharp
TLS_DH_anon_WITH_3DES_EDE_CBC_SHA
```

Represents the TLS_DH_anon_WITH_3DES_EDE_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_AES_128_CBC_SHA field

```csharp
TLS_DH_anon_WITH_AES_128_CBC_SHA
```

Represents the TLS_DH_anon_WITH_AES_128_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_AES_128_CBC_SHA256 field

```csharp
TLS_DH_anon_WITH_AES_128_CBC_SHA256
```

Represents the TLS_DH_anon_WITH_AES_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_AES_128_GCM_SHA256 field

```csharp
TLS_DH_anon_WITH_AES_128_GCM_SHA256
```

Represents the TLS_DH_anon_WITH_AES_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_AES_256_CBC_SHA field

```csharp
TLS_DH_anon_WITH_AES_256_CBC_SHA
```

Represents the TLS_DH_anon_WITH_AES_256_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_AES_256_CBC_SHA256 field

```csharp
TLS_DH_anon_WITH_AES_256_CBC_SHA256
```

Represents the TLS_DH_anon_WITH_AES_256_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_AES_256_GCM_SHA384 field

```csharp
TLS_DH_anon_WITH_AES_256_GCM_SHA384
```

Represents the TLS_DH_anon_WITH_AES_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_ARIA_128_CBC_SHA256 field

```csharp
TLS_DH_anon_WITH_ARIA_128_CBC_SHA256
```

Represents the TLS_DH_anon_WITH_ARIA_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_ARIA_128_GCM_SHA256 field

```csharp
TLS_DH_anon_WITH_ARIA_128_GCM_SHA256
```

Represents the TLS_DH_anon_WITH_ARIA_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_ARIA_256_CBC_SHA384 field

```csharp
TLS_DH_anon_WITH_ARIA_256_CBC_SHA384
```

Represents the TLS_DH_anon_WITH_ARIA_256_CBC_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_ARIA_256_GCM_SHA384 field

```csharp
TLS_DH_anon_WITH_ARIA_256_GCM_SHA384
```

Represents the TLS_DH_anon_WITH_ARIA_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_CAMELLIA_128_CBC_SHA field

```csharp
TLS_DH_anon_WITH_CAMELLIA_128_CBC_SHA
```

Represents the TLS_DH_anon_WITH_CAMELLIA_128_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_CAMELLIA_128_CBC_SHA256 field

```csharp
TLS_DH_anon_WITH_CAMELLIA_128_CBC_SHA256
```

Represents the TLS_DH_anon_WITH_CAMELLIA_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_CAMELLIA_128_GCM_SHA256 field

```csharp
TLS_DH_anon_WITH_CAMELLIA_128_GCM_SHA256
```

Represents the TLS_DH_anon_WITH_CAMELLIA_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_CAMELLIA_256_CBC_SHA field

```csharp
TLS_DH_anon_WITH_CAMELLIA_256_CBC_SHA
```

Represents the TLS_DH_anon_WITH_CAMELLIA_256_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_CAMELLIA_256_CBC_SHA256 field

```csharp
TLS_DH_anon_WITH_CAMELLIA_256_CBC_SHA256
```

Represents the TLS_DH_anon_WITH_CAMELLIA_256_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_CAMELLIA_256_GCM_SHA384 field

```csharp
TLS_DH_anon_WITH_CAMELLIA_256_GCM_SHA384
```

Represents the TLS_DH_anon_WITH_CAMELLIA_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_DES_CBC_SHA field

```csharp
TLS_DH_anon_WITH_DES_CBC_SHA
```

Represents the TLS_DH_anon_WITH_DES_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_RC4_128_MD5 field

```csharp
TLS_DH_anon_WITH_RC4_128_MD5
```

Represents the TLS_DH_anon_WITH_RC4_128_MD5 cipher suite.

## TlsCipherSuite.TLS_DH_anon_WITH_SEED_CBC_SHA field

```csharp
TLS_DH_anon_WITH_SEED_CBC_SHA
```

Represents the TLS_DH_anon_WITH_SEED_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_DSS_EXPORT_WITH_DES40_CBC_SHA field

```csharp
TLS_DH_DSS_EXPORT_WITH_DES40_CBC_SHA
```

Represents the TLS_DH_DSS_EXPORT_WITH_DES40_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_3DES_EDE_CBC_SHA field

```csharp
TLS_DH_DSS_WITH_3DES_EDE_CBC_SHA
```

Represents the TLS_DH_DSS_WITH_3DES_EDE_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_AES_128_CBC_SHA field

```csharp
TLS_DH_DSS_WITH_AES_128_CBC_SHA
```

Represents the TLS_DH_DSS_WITH_AES_128_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_AES_128_CBC_SHA256 field

```csharp
TLS_DH_DSS_WITH_AES_128_CBC_SHA256
```

Represents the TLS_DH_DSS_WITH_AES_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_AES_128_GCM_SHA256 field

```csharp
TLS_DH_DSS_WITH_AES_128_GCM_SHA256
```

Represents the TLS_DH_DSS_WITH_AES_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_AES_256_CBC_SHA field

```csharp
TLS_DH_DSS_WITH_AES_256_CBC_SHA
```

Represents the TLS_DH_DSS_WITH_AES_256_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_AES_256_CBC_SHA256 field

```csharp
TLS_DH_DSS_WITH_AES_256_CBC_SHA256
```

Represents the TLS_DH_DSS_WITH_AES_256_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_AES_256_GCM_SHA384 field

```csharp
TLS_DH_DSS_WITH_AES_256_GCM_SHA384
```

Represents the TLS_DH_DSS_WITH_AES_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_ARIA_128_CBC_SHA256 field

```csharp
TLS_DH_DSS_WITH_ARIA_128_CBC_SHA256
```

Represents the TLS_DH_DSS_WITH_ARIA_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_ARIA_128_GCM_SHA256 field

```csharp
TLS_DH_DSS_WITH_ARIA_128_GCM_SHA256
```

Represents the TLS_DH_DSS_WITH_ARIA_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_ARIA_256_CBC_SHA384 field

```csharp
TLS_DH_DSS_WITH_ARIA_256_CBC_SHA384
```

Represents the TLS_DH_DSS_WITH_ARIA_256_CBC_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_ARIA_256_GCM_SHA384 field

```csharp
TLS_DH_DSS_WITH_ARIA_256_GCM_SHA384
```

Represents the TLS_DH_DSS_WITH_ARIA_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_CAMELLIA_128_CBC_SHA field

```csharp
TLS_DH_DSS_WITH_CAMELLIA_128_CBC_SHA
```

Represents the TLS_DH_DSS_WITH_CAMELLIA_128_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_CAMELLIA_128_CBC_SHA256 field

```csharp
TLS_DH_DSS_WITH_CAMELLIA_128_CBC_SHA256
```

Represents the TLS_DH_DSS_WITH_CAMELLIA_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_CAMELLIA_128_GCM_SHA256 field

```csharp
TLS_DH_DSS_WITH_CAMELLIA_128_GCM_SHA256
```

Represents the TLS_DH_DSS_WITH_CAMELLIA_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_CAMELLIA_256_CBC_SHA field

```csharp
TLS_DH_DSS_WITH_CAMELLIA_256_CBC_SHA
```

Represents the TLS_DH_DSS_WITH_CAMELLIA_256_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_CAMELLIA_256_CBC_SHA256 field

```csharp
TLS_DH_DSS_WITH_CAMELLIA_256_CBC_SHA256
```

Represents the TLS_DH_DSS_WITH_CAMELLIA_256_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_CAMELLIA_256_GCM_SHA384 field

```csharp
TLS_DH_DSS_WITH_CAMELLIA_256_GCM_SHA384
```

Represents the TLS_DH_DSS_WITH_CAMELLIA_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_DES_CBC_SHA field

```csharp
TLS_DH_DSS_WITH_DES_CBC_SHA
```

Represents the TLS_DH_DSS_WITH_DES_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_DSS_WITH_SEED_CBC_SHA field

```csharp
TLS_DH_DSS_WITH_SEED_CBC_SHA
```

Represents the TLS_DH_DSS_WITH_SEED_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_RSA_EXPORT_WITH_DES40_CBC_SHA field

```csharp
TLS_DH_RSA_EXPORT_WITH_DES40_CBC_SHA
```

Represents the TLS_DH_RSA_EXPORT_WITH_DES40_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_3DES_EDE_CBC_SHA field

```csharp
TLS_DH_RSA_WITH_3DES_EDE_CBC_SHA
```

Represents the TLS_DH_RSA_WITH_3DES_EDE_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_AES_128_CBC_SHA field

```csharp
TLS_DH_RSA_WITH_AES_128_CBC_SHA
```

Represents the TLS_DH_RSA_WITH_AES_128_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_AES_128_CBC_SHA256 field

```csharp
TLS_DH_RSA_WITH_AES_128_CBC_SHA256
```

Represents the TLS_DH_RSA_WITH_AES_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_AES_128_GCM_SHA256 field

```csharp
TLS_DH_RSA_WITH_AES_128_GCM_SHA256
```

Represents the TLS_DH_RSA_WITH_AES_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_AES_256_CBC_SHA field

```csharp
TLS_DH_RSA_WITH_AES_256_CBC_SHA
```

Represents the TLS_DH_RSA_WITH_AES_256_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_AES_256_CBC_SHA256 field

```csharp
TLS_DH_RSA_WITH_AES_256_CBC_SHA256
```

Represents the TLS_DH_RSA_WITH_AES_256_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_AES_256_GCM_SHA384 field

```csharp
TLS_DH_RSA_WITH_AES_256_GCM_SHA384
```

Represents the TLS_DH_RSA_WITH_AES_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_ARIA_128_CBC_SHA256 field

```csharp
TLS_DH_RSA_WITH_ARIA_128_CBC_SHA256
```

Represents the TLS_DH_RSA_WITH_ARIA_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_ARIA_128_GCM_SHA256 field

```csharp
TLS_DH_RSA_WITH_ARIA_128_GCM_SHA256
```

Represents the TLS_DH_RSA_WITH_ARIA_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_ARIA_256_CBC_SHA384 field

```csharp
TLS_DH_RSA_WITH_ARIA_256_CBC_SHA384
```

Represents the TLS_DH_RSA_WITH_ARIA_256_CBC_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_ARIA_256_GCM_SHA384 field

```csharp
TLS_DH_RSA_WITH_ARIA_256_GCM_SHA384
```

Represents the TLS_DH_RSA_WITH_ARIA_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_CAMELLIA_128_CBC_SHA field

```csharp
TLS_DH_RSA_WITH_CAMELLIA_128_CBC_SHA
```

Represents the TLS_DH_RSA_WITH_CAMELLIA_128_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_CAMELLIA_128_CBC_SHA256 field

```csharp
TLS_DH_RSA_WITH_CAMELLIA_128_CBC_SHA256
```

Represents the TLS_DH_RSA_WITH_CAMELLIA_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_CAMELLIA_128_GCM_SHA256 field

```csharp
TLS_DH_RSA_WITH_CAMELLIA_128_GCM_SHA256
```

Represents the TLS_DH_RSA_WITH_CAMELLIA_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_CAMELLIA_256_CBC_SHA field

```csharp
TLS_DH_RSA_WITH_CAMELLIA_256_CBC_SHA
```

Represents the TLS_DH_RSA_WITH_CAMELLIA_256_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_CAMELLIA_256_CBC_SHA256 field

```csharp
TLS_DH_RSA_WITH_CAMELLIA_256_CBC_SHA256
```

Represents the TLS_DH_RSA_WITH_CAMELLIA_256_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_CAMELLIA_256_GCM_SHA384 field

```csharp
TLS_DH_RSA_WITH_CAMELLIA_256_GCM_SHA384
```

Represents the TLS_DH_RSA_WITH_CAMELLIA_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_DES_CBC_SHA field

```csharp
TLS_DH_RSA_WITH_DES_CBC_SHA
```

Represents the TLS_DH_RSA_WITH_DES_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DH_RSA_WITH_SEED_CBC_SHA field

```csharp
TLS_DH_RSA_WITH_SEED_CBC_SHA
```

Represents the TLS_DH_RSA_WITH_SEED_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_EXPORT_WITH_DES40_CBC_SHA field

```csharp
TLS_DHE_DSS_EXPORT_WITH_DES40_CBC_SHA
```

Represents the TLS_DHE_DSS_EXPORT_WITH_DES40_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA field

```csharp
TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA
```

Represents the TLS_DHE_DSS_WITH_3DES_EDE_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_AES_128_CBC_SHA field

```csharp
TLS_DHE_DSS_WITH_AES_128_CBC_SHA
```

Represents the TLS_DHE_DSS_WITH_AES_128_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_AES_128_CBC_SHA256 field

```csharp
TLS_DHE_DSS_WITH_AES_128_CBC_SHA256
```

Represents the TLS_DHE_DSS_WITH_AES_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_AES_128_GCM_SHA256 field

```csharp
TLS_DHE_DSS_WITH_AES_128_GCM_SHA256
```

Represents the TLS_DHE_DSS_WITH_AES_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_AES_256_CBC_SHA field

```csharp
TLS_DHE_DSS_WITH_AES_256_CBC_SHA
```

Represents the TLS_DHE_DSS_WITH_AES_256_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_AES_256_CBC_SHA256 field

```csharp
TLS_DHE_DSS_WITH_AES_256_CBC_SHA256
```

Represents the TLS_DHE_DSS_WITH_AES_256_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_AES_256_GCM_SHA384 field

```csharp
TLS_DHE_DSS_WITH_AES_256_GCM_SHA384
```

Represents the TLS_DHE_DSS_WITH_AES_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_ARIA_128_CBC_SHA256 field

```csharp
TLS_DHE_DSS_WITH_ARIA_128_CBC_SHA256
```

Represents the TLS_DHE_DSS_WITH_ARIA_128_CBC_SHA256 cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_ARIA_128_GCM_SHA256 field

```csharp
TLS_DHE_DSS_WITH_ARIA_128_GCM_SHA256
```

Represents the TLS_DHE_DSS_WITH_ARIA_128_GCM_SHA256 cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_ARIA_256_CBC_SHA384 field

```csharp
TLS_DHE_DSS_WITH_ARIA_256_CBC_SHA384
```

Represents the TLS_DHE_DSS_WITH_ARIA_256_CBC_SHA384 cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_ARIA_256_GCM_SHA384 field

```csharp
TLS_DHE_DSS_WITH_ARIA_256_GCM_SHA384
```

Represents the TLS_DHE_DSS_WITH_ARIA_256_GCM_SHA384 cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA field

```csharp
TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA
```

Represents the TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA cipher suite.

## TlsCipherSuite.TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA256 field

```csharp
TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA256
```

Represents the TLS_DHE_DSS_WITH_CAMELLIA_128_CBC_SHA256 cipher suite.
