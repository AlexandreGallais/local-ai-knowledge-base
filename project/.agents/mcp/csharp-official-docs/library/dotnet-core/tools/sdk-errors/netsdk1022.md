---
title: "NETSDK1022: Duplicate items were included"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/tools/sdk-errors/netsdk1022.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# NETSDK1022: Duplicate items were included

**This article applies to:** ✔️ .NET Core 2.1.100 SDK and later versions

Starting in Visual Studio 2017 / MSBuild version 15.3, the .NET SDK automatically includes items from the project directory by default.  These items include `Compile` and `Content` targets. This behavior simplifies project files.

However, if you explicitly define any of these items in your project file, you're likely to get a build error similar to the following:

> Duplicate 'Compile' items were included. The .NET SDK includes 'Compile' items from your project directory by default. You can either remove these items from your project file, or set the 'EnableDefaultCompileItems' property to 'false' if you want to explicitly include them in your project file.

> Duplicate 'EmbeddedResource' items were included. The .NET SDK includes 'EmbeddedResource' items from your project directory by default. You can either remove these items from your project file, or set the 'EnableDefaultEmbeddedResourceItems' property to 'false' if you want to explicitly include them in your project file.

To resolve the errors, do one of the following:

- Remove the explicit `Compile`, `EmbeddedResource`, or `None` items that match the implicit ones listed on the previous table.

- Set the EnableDefaultItems property to `false` to disable all implicit file inclusion:

  ```xml
  <PropertyGroup>
    <EnableDefaultItems>false</EnableDefaultItems>
  </PropertyGroup>
  ```

  If you want to specify files to be published with your app, you can still use the known MSBuild mechanisms for that, for example, the `Content` element.

- Selectively disable only `Compile`, `EmbeddedResource`, or `None` globs by setting the EnableDefaultCompileItems, EnableDefaultEmbeddedResourceItems, or EnableDefaultNoneItems property to `false`:

  ```xml
  <PropertyGroup>
    <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
    <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
    <EnableDefaultNoneItems>false</EnableDefaultNoneItems>
  </PropertyGroup>
  ```

  If you only disable `Compile` globs, Solution Explorer in Visual Studio still shows \*.cs items as part of the project, included as `None` items. To disable the implicit `None` glob, set `EnableDefaultNoneItems` to `false` too.

## WPF projects

You might hit this error in a WPF project due to duplicate `ApplicationDefinition` or `Page` items. To resolve the error, can you disable default items using an MSBuild property. For example, to disable default `Page` items in a WPF project, set `EnableDefaultPageItems` to `false`:

```xml
<PropertyGroup>
  <EnableDefaultPageItems>false</EnableDefaultPageItems>
</PropertyGroup>
```

For more information, see Errors related to duplicate items (WPF).
