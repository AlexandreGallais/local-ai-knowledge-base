---
title: "ResourceManagerStringLocalizerFactory class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/ResourceManagerStringLocalizerFactory.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ResourceManagerStringLocalizerFactory class

Namespace: `Microsoft.Extensions.Localization`

```csharp
public class ResourceManagerStringLocalizerFactory : Microsoft.Extensions.Localization.IStringLocalizerFactory
```

An `IStringLocalizerFactory` that creates instances of `ResourceManagerStringLocalizer`.

`ResourceManagerStringLocalizerFactory` offers multiple ways to set the relative path of
resources to be used. They are, in order of precedence:
`ResourceLocationAttribute` -> `LocalizationOptions.ResourcesPath` -> the project root.

## ResourceManagerStringLocalizerFactory.ResourceManagerStringLocalizerFactory(LocalizationOptions>, ILoggerFactory) constructor

```csharp
public ResourceManagerStringLocalizerFactory (Microsoft.Extensions.Options.IOptions<Microsoft.Extensions.Localization.LocalizationOptions> localizationOptions, Microsoft.Extensions.Logging.ILoggerFactory loggerFactory);
```

Creates a new `ResourceManagerStringLocalizer`.

Parameters:

- `localizationOptions`: The `IOptions<T>`.
- `loggerFactory`: The `ILoggerFactory`.

To be added.

## ResourceManagerStringLocalizerFactory.Create(Type) method

```csharp
public Microsoft.Extensions.Localization.IStringLocalizer Create (Type resourceSource);
```

Creates a `ResourceManagerStringLocalizer` using the `Assembly` and
`Type.FullName` of the specified `Type`.

Parameters:

- `resourceSource`: The `Type`.

Returns: The `ResourceManagerStringLocalizer`.

To be added.

## ResourceManagerStringLocalizerFactory.Create(String, String) method

```csharp
public Microsoft.Extensions.Localization.IStringLocalizer Create (string baseName, string location);
```

Creates a `ResourceManagerStringLocalizer`.

Parameters:

- `baseName`: The base name of the resource to load strings from.
- `location`: The location to load resources from.

Returns: The `ResourceManagerStringLocalizer`.

To be added.

## ResourceManagerStringLocalizerFactory.CreateResourceManagerStringLocalizer(Assembly, String) method

```csharp
protected virtual Microsoft.Extensions.Localization.ResourceManagerStringLocalizer CreateResourceManagerStringLocalizer (System.Reflection.Assembly assembly, string baseName);
```

Creates a `ResourceManagerStringLocalizer` for the given input.

Parameters:

- `assembly`: The assembly to create a `ResourceManagerStringLocalizer` for.
- `baseName`: The base name of the resource to search for.

Returns: A `ResourceManagerStringLocalizer` for the given `assembly` and `baseName`.

This method is virtual for testing purposes only.

## ResourceManagerStringLocalizerFactory.GetResourceLocationAttribute(Assembly) method

```csharp
protected virtual Microsoft.Extensions.Localization.ResourceLocationAttribute? GetResourceLocationAttribute (System.Reflection.Assembly assembly);
```

Gets a `ResourceLocationAttribute` from the provided `Assembly`.

Parameters:

- `assembly`: The assembly to get a `ResourceLocationAttribute` from.

Returns: The `ResourceLocationAttribute` associated with the given `Assembly`.

This method is protected and virtual for testing purposes only.

## ResourceManagerStringLocalizerFactory.GetResourcePrefix(TypeInfo) method

```csharp
protected virtual string GetResourcePrefix (System.Reflection.TypeInfo typeInfo);
```

Gets the resource prefix used to look up the resource.

Parameters:

- `typeInfo`: The type of the resource to be looked up.

Returns: The prefix for resource lookup.

To be added.

## ResourceManagerStringLocalizerFactory.GetResourcePrefix(String, String) method

```csharp
protected virtual string GetResourcePrefix (string baseResourceName, string baseNamespace);
```

Gets the resource prefix used to look up the resource.

Parameters:

- `baseResourceName`: The name of the resource to be looked up
- `baseNamespace`: The base namespace of the application.

Returns: The prefix for resource lookup.

To be added.

## ResourceManagerStringLocalizerFactory.GetResourcePrefix(TypeInfo, String, String) method

```csharp
protected virtual string GetResourcePrefix (System.Reflection.TypeInfo typeInfo, string? baseNamespace, string? resourcesRelativePath);
```

Gets the resource prefix used to look up the resource.

Parameters:

- `typeInfo`: The type of the resource to be looked up.
- `baseNamespace`: The base namespace of the application.
- `resourcesRelativePath`: The folder containing all resources.

Returns: The prefix for resource lookup.

For the type "Sample.Controllers.Home" if there's a resourceRelativePath return
"Sample.Resourcepath.Controllers.Home" if there isn't one then it would return "Sample.Controllers.Home".

## ResourceManagerStringLocalizerFactory.GetResourcePrefix(String, String, String) method

```csharp
protected virtual string GetResourcePrefix (string location, string baseName, string resourceLocation);
```

Gets the resource prefix used to look up the resource.

Parameters:

- `location`: The general location of the resource.
- `baseName`: The base name of the resource.
- `resourceLocation`: The location of the resource within `location`.

Returns: The resource prefix used to look up the resource.

To be added.

## ResourceManagerStringLocalizerFactory.GetRootNamespaceAttribute(Assembly) method

```csharp
protected virtual Microsoft.Extensions.Localization.RootNamespaceAttribute? GetRootNamespaceAttribute (System.Reflection.Assembly assembly);
```

Gets a `RootNamespaceAttribute` from the provided `Assembly`.

Parameters:

- `assembly`: The assembly to get a `RootNamespaceAttribute` from.

Returns: The `RootNamespaceAttribute` associated with the given `Assembly`.

This method is protected and virtual for testing purposes only.
