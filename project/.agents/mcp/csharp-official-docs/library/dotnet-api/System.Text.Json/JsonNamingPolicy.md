---
title: "JsonNamingPolicy class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.Json/JsonNamingPolicy.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# JsonNamingPolicy class

Namespace: `System.Text.Json`

```csharp
public abstract class JsonNamingPolicy
```

Determines the naming policy used to convert a string-based name to another format, such as a camel-casing format.

#### Remarks

For more information, see How to customize property names and values with System.Text.Json.

## JsonNamingPolicy.JsonNamingPolicy() constructor

```csharp
protected JsonNamingPolicy ();
```

Initializes a new instance of `JsonNamingPolicy`.

To be added.

## JsonNamingPolicy.CamelCase property

```csharp
public static System.Text.Json.JsonNamingPolicy CamelCase { get; }
```

Gets the naming policy for camel-casing.

Returns: The naming policy for camel-casing.

#### Remarks

For more information, see Use a built-in naming policy.

## JsonNamingPolicy.KebabCaseLower property

```csharp
public static System.Text.Json.JsonNamingPolicy KebabCaseLower { get; }
```

Gets the naming policy for lowercase kebab-casing.

Returns: To be added.

To be added.

## JsonNamingPolicy.KebabCaseUpper property

```csharp
public static System.Text.Json.JsonNamingPolicy KebabCaseUpper { get; }
```

Gets the naming policy for uppercase kebab-casing.

Returns: To be added.

To be added.

## JsonNamingPolicy.PascalCase property

```csharp
public static System.Text.Json.JsonNamingPolicy PascalCase { get; }
```

To be added.

Returns: To be added.

To be added.

## JsonNamingPolicy.SnakeCaseLower property

```csharp
public static System.Text.Json.JsonNamingPolicy SnakeCaseLower { get; }
```

Gets the naming policy for lowercase snake-casing.

Returns: To be added.

To be added.

## JsonNamingPolicy.SnakeCaseUpper property

```csharp
public static System.Text.Json.JsonNamingPolicy SnakeCaseUpper { get; }
```

Gets the naming policy for uppercase snake-casing.

Returns: To be added.

To be added.

## JsonNamingPolicy.ConvertName(String) method

```csharp
public abstract string ConvertName (string name);
```

When overridden in a derived class, converts the specified name according to the policy.

Parameters:

- `name`: The name to convert.

Returns: The converted name.

#### Remarks

For more information, see How to customize property names and values with System.Text.Json.
