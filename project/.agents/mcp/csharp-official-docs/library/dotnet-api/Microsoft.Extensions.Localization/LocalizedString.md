---
title: "LocalizedString class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.Localization/LocalizedString.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# LocalizedString class

Namespace: `Microsoft.Extensions.Localization`

```csharp
public class LocalizedString
```

A locale specific string.

To be added.

## LocalizedString.LocalizedString(String, String) constructor

```csharp
public LocalizedString (string name, string value);
```

Creates a new `LocalizedString`.

Parameters:

- `name`: The name of the string in the resource it was loaded from.
- `value`: The actual string.

To be added.

## LocalizedString.LocalizedString(String, String, Boolean) constructor

```csharp
public LocalizedString (string name, string value, bool resourceNotFound);
```

Creates a new `LocalizedString`.

Parameters:

- `name`: The name of the string in the resource it was loaded from.
- `value`: The actual string.
- `resourceNotFound`: Whether the string was not found in a resource. Set this to `true` to indicate an alternate string value was used.

To be added.

## LocalizedString.LocalizedString(String, String, Boolean, String) constructor

```csharp
public LocalizedString (string name, string value, bool resourceNotFound, string? searchedLocation);
```

Creates a new `LocalizedString`.

Parameters:

- `name`: The name of the string in the resource it was loaded from.
- `value`: The actual string.
- `resourceNotFound`: Whether the string was not found in a resource. Set this to `true` to indicate an alternate string value was used.
- `searchedLocation`: The location which was searched for a localization value.

To be added.

## LocalizedString.Name property

```csharp
public string Name { get; }
```

The name of the string in the resource it was loaded from.

Returns: To be added.

To be added.

## LocalizedString.ResourceNotFound property

```csharp
public bool ResourceNotFound { get; }
```

Whether the string was not found in a resource. If `true`, an alternate string value was used.

Returns: To be added.

To be added.

## LocalizedString.SearchedLocation property

```csharp
public string? SearchedLocation { get; }
```

The location which was searched for a localization value.

Returns: To be added.

To be added.

## LocalizedString.Value property

```csharp
public string Value { get; }
```

The actual string.

Returns: To be added.

To be added.

## LocalizedString.op_Implicit(LocalizedString) method

```csharp
public static implicit operator string? (Microsoft.Extensions.Localization.LocalizedString localizedString);
```

Implicitly converts the `LocalizedString` to a `String`.

Parameters:

- `localizedString`: The string to be implicitly converted.

Returns: To be added.

To be added.

## LocalizedString.ToString() method

```csharp
public override string ToString ();
```

Returns the actual string.

Returns: The actual string.

To be added.
