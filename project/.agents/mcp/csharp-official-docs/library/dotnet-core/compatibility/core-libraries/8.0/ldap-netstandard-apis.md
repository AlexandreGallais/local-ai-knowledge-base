---
title: "Breaking change: TrustedCertificatesDirectory and StartNewTlsSessionContext are not available on .NET Standard / .NET Framework"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/core-libraries/8.0/ldap-netstandard-apis.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TrustedCertificatesDirectory and StartNewTlsSessionContext are not available on .NET Standard / .NET Framework

The following APIs were accidentally exposed in the `netstandard2.0` version of the System.DirectoryServices.Protocols NuGet package version 8.0.1:

- `System.DirectoryServices.Protocols.LdapSessionOptions.TrustedCertificatesDirectory`
- `System.DirectoryServices.Protocols.LdapSessionOptions.StartNewTlsSessionContext`

These APIs aren't implemented on .NET Framework and weren't intended to be exposed when targeting `netstandard2.0`. Starting with version 8.0.2 of the System.DirectoryServices.Protocols NuGet package, these APIs are unavailable when targeting `netstandard2.0`.

## Previous behavior

In System.DirectoryServices.Protocols NuGet package version 8.0.1, the `System.DirectoryServices.Protocols.LdapSessionOptions.TrustedCertificatesDirectory` property and `System.DirectoryServices.Protocols.LdapSessionOptions.StartNewTlsSessionContext` method could be used from a `netstandard2.0` library.

## New behavior

Starting with System.DirectoryServices.Protocols NuGet package version 8.0.2, attempting to use these APIs from a `netstandard2.0` library results in a compilation error.

## Version introduced

System.DirectoryServices.Protocols NuGet package version 8.0.2

## Type of breaking change

This change can affect binary compatibility.

## Reason for change

The APIs didn't work on all compatible frameworks.

## Recommended action

If you need to use these APIs, target .NET instead of `netstandard2.0`.

## Affected APIs

- `System.DirectoryServices.Protocols.LdapSessionOptions.TrustedCertificatesDirectory`
- `System.DirectoryServices.Protocols.LdapSessionOptions.StartNewTlsSessionContext`
