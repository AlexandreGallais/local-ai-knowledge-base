---
title: "ITagCollector interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Logging/ITagCollector.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ITagCollector interface

Namespace: `Microsoft.Extensions.Logging`

```csharp
public interface ITagCollector
```

Interface given to custom tag providers, enabling them to emit tags.

See `TagProviderAttribute` for details on how this interface is used.

## ITagCollector.Add(String, Object) method

```csharp
public void Add (string tagName, object? tagValue);
```

Adds a tag.

Parameters:

- `tagName`: The name of the tag to add.
- `tagValue`: The value of the tag to add.

Exceptions:

- `ArgumentNullException`: `tagName` is `null`.
- `ArgumentException`: `tagName` is empty or contains exclusively whitespace,
or when a tag of the same name has already been added.

To be added.

## ITagCollector.Add(String, Object, DataClassificationSet) method

```csharp
public void Add (string tagName, object? tagValue, Microsoft.Extensions.Compliance.Classification.DataClassificationSet classifications);
```

Adds a tag.

Parameters:

- `tagName`: The name of the tag to add.
- `tagValue`: The value of the tag to add.
- `classifications`: The data classifications of the tag value.

Exceptions:

- `ArgumentNullException`: `tagName` is `null`.
- `ArgumentException`: `tagName` is empty or contains exclusively whitespace,
or when a tag of the same name has already been added.

To be added.
