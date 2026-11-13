---
title: ".NET 7 breaking change: XmlSecureResolver is obsolete"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/xml/7.0/xmlsecureresolver-obsolete.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XmlSecureResolver is obsolete

The method `System.Xml.XmlSecureResolver.GetEntity(System.Uri,System.String,System.Type)` unconditionally throws an `System.Xml.XmlException` at runtime. If your application utilizes `System.Xml.XmlSecureResolver` and you attempt to resolve an XML resource through it, resolution will fail with an exception.

Additionally, the entire `System.Xml.XmlSecureResolver` type is obsolete. All references to this type will result in a SYSLIB0047 warning at build time. If you've enabled warnings as errors, this will cause a build break if your application references `System.Xml.XmlSecureResolver`.

```csharp
using System.Xml;

// Compiler warning SYSLIB0047: XmlSecureResolver type is obsolete.
XmlResolver resolver = new XmlSecureResolver(
    resolver: new XmlUrlResolver(),
    securityUrl: "https://www.example.com/");

// Call to XmlSecureResolver.GetEntity below throws XmlException at runtime.
object entity = resolver.GetEntity(
    absoluteUri: new Uri("https://www.example.com/some-entity"),
    role: null,
    ofObjectToReturn: null);
```

## Previous behavior

In .NET Framework, `System.Xml.XmlSecureResolver.GetEntity(System.Uri,System.String,System.Type)` constructs a Code Access Security (CAS) sandbox to restrict the external XML resource resolution process. If policy is violated, a `System.Security.SecurityException` is thrown.

In .NET Core 3.1, and .NET 6, `System.Xml.XmlSecureResolver.GetEntity(System.Uri,System.String,System.Type)` doesn't restrict external XML resource resolution at all. External resource resolution is allowed to proceed with no limitations.

## New behavior

Starting in .NET 7, `System.Xml.XmlSecureResolver.GetEntity(System.Uri,System.String,System.Type)` unconditionally throws an `System.Xml.XmlException`. It does not construct a CAS sandbox and does not attempt to resolve the external resource.

## Version introduced

.NET 7

## Type of breaking change

This change can affect source compatibility and binary compatibility.

## Reason for change

This change improves the security of the .NET ecosystem. This obsoletion moves the behavior of `System.Xml.XmlSecureResolver` from fail-dangerous (always perform resolution) to fail-safe (never perform resolution) when running on .NET 7 or later.

## Recommended action

Consider instead using the newly introduced static property `System.Xml.XmlResolver.ThrowingResolver`. This property provides an `System.Xml.XmlResolver` instance that forbids external resource resolution.

```csharp
using System.Xml;

// BAD: Do not use XmlSecureResolver.
// XmlResolver resolver = new XmlSecureResolver(
//     resolver: new XmlUrlResolver(),
//     securityUrl: "https://www.example.com/");

// GOOD: Use XmlResolver.ThrowingResolver instead.
XmlResolver resolver = XmlResolver.ThrowingResolver;
```

## Affected APIs

- `System.Xml.XmlSecureResolver`
- `System.Xml.XmlSecureResolver.GetEntity(System.Uri,System.String,System.Type)`
