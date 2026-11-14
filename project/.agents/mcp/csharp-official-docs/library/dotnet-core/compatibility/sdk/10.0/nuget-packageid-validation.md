---
title: "Breaking change: NuGet logs an error for invalid package IDs"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/nuget-packageid-validation.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NuGet logs an error for invalid package IDs

NuGet now validates package IDs when they're used to create URLs in .NET 10. If a package ID isn't in the correct format, NuGet shows an error instead of continuing. This ensures only valid package IDs are used when constructing URLs.

## Version introduced

.NET 10

## Previous behavior

Previously, NuGet resources that constructed URLs from package IDs did not validate the package ID format. Invalid or malformed package IDs could be used without triggering validation errors.

## New behavior

Starting with the .NET 10 SDK, any package ID used to construct a URL via NuGet resources is now validated. If the package ID doesn't conform to NuGet's expected format, an exception is thrown, and the URL is not constructed.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change introduces validation to ensure that only properly formatted package IDs are used when constructing URLs. The validation strengthens the code's security posture by reducing the risk of unsafe or unintended inputs being processed.

## Recommended action

To disable the package ID validation logic and restore the previous behavior, you can set the environment variable `NUGET_DISABLE_PACKAGEID_VALIDATION` to `true`.

## Affected APIs

None.
