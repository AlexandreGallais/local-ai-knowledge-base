---
title: "Breaking change: .NET 10 requires OpenSSL 1.1.1 or later on Unix"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/cryptography/10.0/openssl-version-requirement.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# .NET 10 requires OpenSSL 1.1.1 or later on Unix

Starting in .NET 10, OpenSSL 1.1.1 or later is required on Unix platforms where .NET uses OpenSSL for cryptography, such as Linux. If OpenSSL 1.1.1 isn't available on a platform that requires it, the application will fail to start. .NET 10 on macOS doesn't use OpenSSL and isn't impacted by this change.

## Version introduced

.NET 10

## Previous behavior

.NET applications supported OpenSSL versions prior to 1.1.1, such as 1.0.2 and 1.1.0.

## New behavior

Starting in .NET 10, .NET applications require OpenSSL 1.1.1 or later. If OpenSSL 1.1.1 isn't available on a platform that requires it, the application will fail to start.

## Type of breaking change

This change is a behavioral change.

## Reason for change

OpenSSL prior to OpenSSL 1.1.1 is outdated and isn't supported by mainstream Linux or Unix distributions. Supporting these out-of-date OpenSSL versions increases complexity of maintenance, and that effort is better spent on supporting modern versions of OpenSSL.

## Recommended action

Use a distribution of Linux or Unix that includes OpenSSL 1.1.1 or later.

## Affected APIs

None.
