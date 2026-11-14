---
title: "Breaking change: Assemblies removed from Microsoft.AspNetCore.App shared framework"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/6/assemblies-removed-from-shared-framework.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Assemblies removed from Microsoft.AspNetCore.App shared framework

The following two assemblies were removed from the ASP.NET Core targeting pack:

- System.Security.Permissions
- System.Windows.Extensions

In addition, the following assemblies were removed from the ASP.NET Core runtime pack:

- Microsoft.Win32.SystemEvents
- System.Drawing.Common
- System.Security.Permissions
- System.Windows.Extensions

## Version introduced

ASP.NET Core 6.0

## Old behavior

Applications could use APIs provided by these libraries by referencing the Microsoft.AspNetCore.App shared framework.

## New behavior

If you use APIs from the affected assemblies without having a PackageReference in your project file, you might see runtime errors. For example, an application that uses reflection to access APIs from one of these assemblies without adding an explicit reference to the package will have runtime errors. The `PackageReference` ensures that the assemblies are present as part of the application output.

For discussion, see <https://github.com/dotnet/aspnetcore/issues/31007>.

## Reason for change

This change was introduced to reduce the size of the ASP.NET Core shared framework.

## Recommended action

To continue using these APIs in your project, add a PackageReference. For example:

```xml
<PackageReference Include="System.Security.Permissions" Version="6.0.0" />
```

## Affected APIs

- `System.Security.Permissions`
- `System.Media`
- `System.Security.Cryptography.X509Certificates.X509Certificate2UI`
- `System.Xaml.Permissions.XamlAccessLevel`
