---
title: "MSBuild properties for Microsoft.NET.Sdk (part 5 of 9)"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/project-sdk/msbuild-props.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# MSBuild properties for Microsoft.NET.Sdk (part 5 of 9)

## Default item inclusion properties

The following MSBuild properties are documented in this section:

- DefaultItemExcludesInProjectFolder
- DefaultItemExcludes
- EnableDefaultCompileItems
- EnableDefaultEmbeddedResourceItems
- EnableDefaultItems
- EnableDefaultNoneItems

For more information, see Default includes and excludes.

### DefaultItemExcludes

Use the `DefaultItemExcludes` property to define glob patterns for files and folders that should be excluded from the include, exclude, and remove globs. By default, the *./bin* and *./obj* folders are excluded from the glob patterns.

```xml
<PropertyGroup>
  <DefaultItemExcludes>$(DefaultItemExcludes);**/*.myextension</DefaultItemExcludes>
</PropertyGroup>
```

> **Note:**
> The `DefaultItemExcludes` property excludes files and folders from being watched by `dotnet watch`. For more information, see Ignore specified folders and files from `dotnet watch`.

### DefaultItemExcludesInProjectFolder

Use the `DefaultItemExcludesInProjectFolder` property to define glob patterns for files and folders in the project folder that should be excluded from the include, exclude, and remove globs. By default, folders that start with a period (`.`), such as *.git* and *.vs*, are excluded from the glob patterns.

This property is very similar to the `DefaultItemExcludes` property, except that it only considers files and folders in the project folder. When a glob pattern would unintentionally match items outside the project folder with a relative path, use the `DefaultItemExcludesInProjectFolder` property instead of the `DefaultItemExcludes` property.

```xml
<PropertyGroup>
  <DefaultItemExcludesInProjectFolder>$(DefaultItemExcludesInProjectFolder);**/myprefix*/**</DefaultItemExcludesInProjectFolder>
</PropertyGroup>
```

### EnableDefaultItems

The `EnableDefaultItems` property controls whether compile items, embedded resource items, and `None` items are implicitly included in the project. The default value is `true`. Set the `EnableDefaultItems` property to `false` to disable all implicit file inclusion.

```xml
<PropertyGroup>
  <EnableDefaultItems>false</EnableDefaultItems>
</PropertyGroup>
```

### EnableDefaultCompileItems

The `EnableDefaultCompileItems` property controls whether compile items are implicitly included in the project. The default value is `true`. Set the `EnableDefaultCompileItems` property to `false` to disable implicit inclusion of *.cs and other language-extension files.

```xml
<PropertyGroup>
  <EnableDefaultCompileItems>false</EnableDefaultCompileItems>
</PropertyGroup>
```

### EnableDefaultEmbeddedResourceItems

The `EnableDefaultEmbeddedResourceItems` property controls whether embedded resource items are implicitly included in the project. The default value is `true`. Set the `EnableDefaultEmbeddedResourceItems` property to `false` to disable implicit inclusion of embedded resource files.

```xml
<PropertyGroup>
  <EnableDefaultEmbeddedResourceItems>false</EnableDefaultEmbeddedResourceItems>
</PropertyGroup>
```

### EnableDefaultNoneItems

The `EnableDefaultNoneItems` property controls whether `None` items (files that have no role in the build process) are implicitly included in the project. The default value is `true`. Set the `EnableDefaultNoneItems` property to `false` to disable implicit inclusion of `None` items.

```xml
<PropertyGroup>
  <EnableDefaultNoneItems>false</EnableDefaultNoneItems>
</PropertyGroup>
```
