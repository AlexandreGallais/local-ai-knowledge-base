---
title: "Breaking change: NuGet audit sources no longer allow insecure HTTP by default"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/nuget-audit-source-http-disallowed.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NuGet audit sources no longer allow insecure HTTP by default

Starting in .NET 10.0.400 SDK, NuGet raises error NU1302 when an `auditSource` defined in *nuget.config* uses an insecure `http://` URL and doesn't have `allowInsecureConnections="true"` set.

## Version introduced

.NET 10.0.400 SDK

## Previous behavior

Previously, if an `auditSource` used an insecure `http://` URL, NuGetAudit continued without warnings.

## New behavior

Starting in .NET 10.0.400 SDK, NuGet raises error NU1302 when an `auditSource` uses an insecure `http://` URL. The error message instructs you to update the URL to use HTTPS or set `allowInsecureConnections="true"` in your *nuget.config* file.

## Type of breaking change

This change is a behavioral change.

## Reason for change

This change aligns audit sources with the behavior of package sources, which already require HTTPS by default.

## Recommended action

Use audit sources that support HTTPS. For example, update your *nuget.config* to use `https://api.nuget.org/v3/index.json`:

```xml
<auditSources>
  <add key="nuget.org" value="https://api.nuget.org/v3/index.json" />
</auditSources>
```

If you can't migrate to HTTPS immediately, set `allowInsecureConnections="true"` on the audit source in your *nuget.config*:

```xml
<auditSources>
  <add key="my-audit-source" value="http://my-source/index.json" allowInsecureConnections="true" />
</auditSources>
```

## Affected APIs

None.
