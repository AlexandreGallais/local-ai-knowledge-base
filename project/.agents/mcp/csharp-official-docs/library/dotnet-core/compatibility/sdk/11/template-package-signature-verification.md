---
title: "Breaking change: Template package installation verifies NuGet signatures"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/11/template-package-signature-verification.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Template package installation verifies NuGet signatures

Template package installation now verifies signed packages downloaded from NuGet sources when signature verification is enabled. Packages that fail verification aren't installed.

## Version introduced

- .NET 8 SDK 8.0.134 and 8.0.428
- .NET 9 SDK 9.0.124 and 9.0.321
- .NET 10 SDK 10.0.115 and 10.0.404
- .NET 11 SDK 11.0.100

## Previous behavior

Previously, `dotnet new install` didn't verify NuGet package signatures when downloading template packages. Packages could be installed even if their signatures were invalid or they were unsigned despite a client or repository policy requiring signatures.

## New behavior

When signature verification is enabled, signed template packages downloaded from NuGet sources are verified using `dotnet nuget verify --all` before installation. If verification fails, installation fails. The `--force` option doesn't bypass verification.

Unsigned packages are accepted only if the applicable NuGet configuration's `signatureValidationMode` is `accept` (the default) and the source doesn't declare `allRepositorySigned=true`. A client policy of `require` or a repository signing requirement causes unsigned packages to be rejected.

Verification is always enabled on Windows. On Linux, it's enabled by default and can be disabled by setting `DOTNET_NUGET_SIGNATURE_VERIFICATION=false`. On macOS, it's disabled by default and can be enabled by setting `DOTNET_NUGET_SIGNATURE_VERIFICATION=true`. See NuGet signed-package verification for certificate-store requirements and platform limitations.

This verification applies to packages downloaded from configured or additional NuGet sources. It doesn't apply when you install a template package directly from a local `.nupkg` file or folder.

## Type of breaking change

This change is a behavioral change.

## Reason for change

Signature verification helps validate the authenticity and integrity of downloaded template packages and rejects unsigned packages when client or repository policy requires signing. A valid signature doesn't guarantee that template code is safe to run.

## Recommended action

If your template packages pass <example-value>, no action is required.

If installation fails, run `dotnet new install` with `--diagnostics` to see verification details. You can also use `dotnet nuget verify` to verify a downloaded package explicitly.

For signature or integrity failures, obtain a valid package from a trusted source or contact the package publisher. For certificate-trust failures, review the certificate-store requirements in NuGet signed-package verification.

If an unsigned package is rejected, check the applicable signatureValidationMode and the source's repository-signing requirements. Use a signed package that meets those requirements rather than bypassing verification.

For command behavior and configuration, see `dotnet new install`.

## Affected APIs

None.
