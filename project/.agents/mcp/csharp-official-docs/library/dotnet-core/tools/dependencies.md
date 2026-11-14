---
title: "Manage dependencies in .NET"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/dependencies.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Manage dependencies in .NET applications

This article explains how to add and remove package, project, and assembly dependencies.

## Add and remove package dependencies

You can add and remove dependencies by editing your project file or through .NET CLI commands.

### Use the CLI

To add a dependency, run the `dotnet package` command for your SDK version:

# .NET 10 and later

```dotnetcli
dotnet package add Microsoft.EntityFrameworkCore
```

# .NET 9 and previous

```dotnetcli
dotnet add package Microsoft.EntityFrameworkCore
```

---

To remove a dependency, run the `dotnet package` command for your SDK version:

# .NET 10 and later

```dotnetcli
dotnet package remove Microsoft.EntityFrameworkCore
```

# .NET 9 and previous

```dotnetcli
dotnet remove package Microsoft.EntityFrameworkCore
```

---

### Edit the project file

To add a dependency, add a `<PackageReference>` item inside an `<ItemGroup>` element. You can add to an existing `<ItemGroup>` or create a new one.

```xml
<Project Sdk="Microsoft.NET.Sdk.Web">

  <PropertyGroup>
    ...
  </PropertyGroup>

  <ItemGroup>
    <PackageReference Include="Microsoft.EntityFrameworkCore" Version="3.1.2" />
  </ItemGroup>

</Project>
```

The `Include` attribute specifies the ID of the package to add to the project. The `Version` attribute specifies the version to get. Versions are specified as per NuGet version rules.

Use conditions to add a dependency that's available only in a specific target, as shown in the following example:

```xml
<PackageReference Include="PACKAGE_ID" Version="PACKAGE_VERSION" Condition="'$(TargetFramework)' == 'netcoreapp2.1'" />
```

The dependency in the preceding example will only be valid if the build is happening for that given target. The `$(TargetFramework)` in the condition is an MSBuild property that's being set in the project. For most common .NET applications, you don't need to do this.

To remove a dependency, remove its `<PackageReference>` item from the project file.

For more information about the `PackageReference` item, see the MSBuild reference for .NET SDK projects.

## Add and remove project references

Use a project-to-project reference when your project depends on another project. To add and remove project references, either edit the project file or use the CLI.

### Use the CLI

To add a project reference, run the `dotnet reference` command for your SDK version.

# .NET 10 and later

```dotnetcli
dotnet reference add ../MyLibrary/MyLibrary.csproj
```

# .NET 9 and previous

```dotnetcli
dotnet add reference ../MyLibrary/MyLibrary.csproj
```

---

To remove a project reference, run the following command for your SDK version:

# .NET 10 and later

```dotnetcli
dotnet reference remove ../MyLibrary/MyLibrary.csproj
```

# .NET 9 and previous

```dotnetcli
dotnet remove reference ../MyLibrary/MyLibrary.csproj
```

---

### Edit the project file

 The `<ProjectReference>` project file element identifies the path to the referenced project. To add a project reference, add a `<ProjectReference>` item inside an `<ItemGroup>` element. You can add to an existing `<ItemGroup>` or create a new one.

```xml
<ItemGroup>
  <ProjectReference Include="../MyLibrary/MyLibrary.csproj" />
</ItemGroup>
```

To remove a project reference, remove the `<ProjectReference>` element from the project file.

For more information about the `ProjectReference` item, see the Common MSBuild project items.

## Add and remove assembly references

You can add and remove assembly references through the project file. The .NET CLI doesn't provide commands to add or remove assembly references.

To reference a .NET assembly that isn't part of a project or package, add a `<Reference>` element to the project file. Use the `<HintPath>` element to specify the relative or absolute path to the assembly:

```xml
<ItemGroup>
  <Reference Include="MyAssembly">
    <HintPath>lib/MyAssembly.dll</HintPath>
  </Reference>
</ItemGroup>
```

To remove an assembly reference, remove its `<Reference>` element from the project file.

For more information about the `Reference` item, see the Common MSBuild project items.

## Tips

- Don't include inputs to the restore operation in the *.targets* or *.props* file of a referenced package. These inputs can include `PackageReference` items, `ExcludeAssets` attributes, the NuGet feeds to use, or other NuGet configuration. The *.targets* and *.props* files from packages aren't used until after NuGet restore is complete. Anything needed for restore needs to be in the project file or *.targets* file of the project itself, not a package dependency.
- If you want to use ASP.NET APIs in a console application or class library, add a FrameworkReference item to your project file:

  `<FrameworkReference Include="Microsoft.AspNetCore.App" />`

  For more information, see Use the ASP.NET Core shared framework.

## See also

* Reference-related project items
* Common MSBuild project items
* dotnet package list command
* Dependencies (library guidance)
