---
title: "TagProviderAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/TagProviderAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TagProviderAttribute class

Namespace: `Microsoft.Extensions.Logging`

```csharp
public sealed class TagProviderAttribute : Attribute
```

Defines a method to invoke to generate logging tags for a referenced object.

To be added.

## TagProviderAttribute.TagProviderAttribute(Type, String) constructor

```csharp
public TagProviderAttribute (Type providerType, string providerMethod);
```

Initializes a new instance of the `TagProviderAttribute` class with custom tags provider.

Parameters:

- `providerType`: A type containing a method that provides a custom set of tags to log.
- `providerMethod`: The name of a method on the provider type that generates a custom set of tags to log.

Exceptions:

- `ArgumentNullException`: `providerMethod` or `providerType` is `null`.
- `ArgumentException`: `providerMethod` is either an empty string or contains only whitespace.

You can create your own method that will generate the exact set of tags to log
for a given input object.

The method referenced by this constructor should be non-generic, `static`, and `public`, and it should have two parameters:

First parameter of type `ITagCollector`.

Second parameter of type `T?`, where `T` is the type of logging method parameter that you want to log.

```csharp

             [LoggerMessage(1, LogLevel.Warning, "Custom tags for {Param}.")]
             static partial void LogMethod(ILogger logger,
                 [TagProvider(typeof(CustomProvider), nameof(CustomProvider.GetTagsToLog))] ClassToLog o);
            
             public static class CustomProvider
             {
                 public static void GetTagsToLog(ITagCollector collector, ClassToLog? param)
                 {
                     collector.Add("Custom_tag_name", param?.MyProperty);
                     collector.Add(nameof(ClassToLog.AnotherProperty), param?.AnotherProperty);
                     // ...
                 }
             }
             
```

## TagProviderAttribute.OmitReferenceName property

```csharp
public bool OmitReferenceName { get; set; }
```

Gets or sets a value indicating whether to prefix the name of the parameter or property to the generated name of each tag being logged.

Returns: Defaults to `false`.

To be added.

## TagProviderAttribute.ProviderMethod property

```csharp
public string ProviderMethod { get; }
```

Gets the name of the method that provides tags to be logged.

Returns: To be added.

To be added.

## TagProviderAttribute.ProviderType property

```csharp
public Type ProviderType { get; }
```

Gets the `Type` containing the method that provides tags to be logged.

Returns: To be added.

To be added.
