---
title: "Breaking change: 'dotnet restore' audits transitive packages"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/sdk/10.0/nugetaudit-transitive-packages.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# 'dotnet restore' audits transitive packages

The `dotnet restore` command, which restores the dependencies of a project, now produces security vulnerability warnings for transitive packages by default when the project targets .NET 10 or a later version.

## Previous behavior

NuGetAudit was introduced in .NET 8 to emit warnings for packages with known security vulnerabilities.
By default, only direct package references were audited, however, it was possible to change the `NuGetAuditMode` property to include all packages.

In a .NET 9 preview version, NuGetAuditMode's default was changed to `all` for all projects, and this change was reverted back to `direct` in the .NET 9.0.101 SDK.

## New behavior

When projects target .NET 10 or higher, then `NuGetAuditMode` defaults to `all` if it hasn't been explicitly set.
This setting means that *transitive packages* (dependencies of packages your project directly references) with known vulnerabilities now cause warnings to be reported.
If your project treats warnings as errors, this behavior can cause restore failures.

If your project targets .NET 9 or lower, the default for `NuGetAuditMode` remains `direct`.

## Version introduced

.NET 10 Preview 3

## Type of breaking change

This change is a behavioral change.

## Reason for change

Packages with known vulnerabilities might cause your app to be exploitable, even if your project does not directly reference or directly use the vulnerable package.

## Recommended action

- To prevent audit warnings being treated as errors, even when using `<TreatWarningsAsErrors>`, you can use `<WarningsNotAsErrors>NU1901;NU1902;NU1903;NU1904;$(WarningsNotAsErrors)</WarningsNotAsErrors>`.

- Use tools such as `dotnet nuget why` to find the top-level package that caused the transitive package with the known vulnerability to be included, and try to upgrade it to see if the transitive vulnerability goes away. If not, promote the transitive package to a top-level package by adding a `PackageReference` for it, and upgrade it to a newer version.

- If you want to suppress a specific advisory, you can add `<NuGetAuditSuppress Include="url" />` item to your project file, where `url` is the URL reported in NuGet's warning message.

  ```xml
  <ItemGroup>
      <NuGetAuditSuppress Include="url" />
  </ItemGroup>
  ```

- If you want to only be warned of direct package references with known vulnerabilities, you can set `<NuGetAuditMode>` to `direct` in your project file.

  ```xml
  <PropertyGroup>
    <NuGetAuditMode>direct</NuGetAuditMode>
  </PropertyGroup>
  ```

## See also

- Audit for security vulnerabilities (`dotnet restore`)
- Auditing package dependencies for security vulnerabilities
- NuGetAudit 2.0: Elevating Security and Trust in Package Management
