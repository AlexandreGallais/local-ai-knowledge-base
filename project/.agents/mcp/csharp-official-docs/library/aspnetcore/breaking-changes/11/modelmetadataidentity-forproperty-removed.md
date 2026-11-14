---
title: "Breaking change: Obsolete ModelMetadataIdentity.ForProperty overload removed"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/11/modelmetadataidentity-forproperty-removed.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# Obsolete `ModelMetadataIdentity.ForProperty` overload removed

The `ModelMetadataIdentity.ForProperty(Type modelType, string name, Type containerType)` overload, which has been obsolete since ASP.NET Core 3.1, is removed in ASP.NET Core 11.

## Version introduced

.NET 11 Preview 7

## Previous behavior

Previously, the API existed and produced an obsoletion warning when you called it:

```csharp
var identity = ModelMetadataIdentity.ForProperty(
    typeof(string), "Name", typeof(Person));
```

## New behavior

Starting in ASP.NET Core 11, the API no longer exists. Code that calls it fails to compile, and existing binaries that call it fail at runtime with a `System.MissingMethodException`.

## Type of breaking change

This change can affect binary compatibility and source compatibility.

## Reason for change

The API was marked obsolete in ASP.NET Core 3.1 in dotnet/aspnetcore#15134 because a better overload that accepts a `System.Reflection.PropertyInfo` is available. The obsolete overload was removed in dotnet/aspnetcore#67077.

## Recommended action

Use the `ModelMetadataIdentity.ForProperty(PropertyInfo propertyInfo, Type modelType, Type containerType)` overload instead:

```csharp
var propertyInfo = typeof(Person).GetProperty("Name");
var identity = ModelMetadataIdentity.ForProperty(
    propertyInfo, typeof(string), typeof(Person));
```

Recompile any binaries that call the removed overload.

## Affected APIs

- `Microsoft.AspNetCore.Mvc.ModelBinding.Metadata.ModelMetadataIdentity.ForProperty(System.Type, System.String, System.Type)`
