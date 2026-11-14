---
title: "ObsoleteAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System/ObsoleteAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ObsoleteAttribute class

Namespace: `System`

```csharp
public sealed class ObsoleteAttribute : Attribute
```

Marks program elements that are no longer in use.

To be added.

The following example defines a class that contains a property and a method that are marked with the `ObsoleteAttribute` attribute. Accessing the value of the `OldProperty` property in code generates a compiler warning, but calling the `CallOldMethod` method generates a compiler error. The example also shows the output that results when you attempt to compile the source code.

_Code sample not included: ~/snippets/csharp/System/ObsoleteAttribute/Overview/obsoleteattributeex1.cs._

## ObsoleteAttribute.ObsoleteAttribute() constructor

```csharp
public ObsoleteAttribute ();
```

Initializes a new instance of the `ObsoleteAttribute` class with default properties.

#### Remarks
The following table shows the initial property values for an instance of `ObsoleteAttribute`.

|Property|Value|
|--------------|-----------|
|`ObsoleteAttribute.IsError`|`false`|
|`ObsoleteAttribute.Message`|`null`|
|`DiagnosticId`|`null`|
|`UrlFormat`|`null`|

## ObsoleteAttribute.ObsoleteAttribute(String) constructor

```csharp
public ObsoleteAttribute (string? message);
```

Initializes a new instance of the `ObsoleteAttribute` class with a specified workaround message.

Parameters:

- `message`: The text string that describes alternative workarounds.

#### Remarks
The following table shows the initial property values for an instance of `ObsoleteAttribute`.

|Property|Value|
|--------------|-----------|
|`ObsoleteAttribute.IsError`|`false`.|
|`ObsoleteAttribute.Message`|The workaround message.|
|`DiagnosticId`|`null`.|
|`UrlFormat`|`null`.|

## ObsoleteAttribute.ObsoleteAttribute(String, Boolean) constructor

```csharp
public ObsoleteAttribute (string? message, bool error);
```

Initializes a new instance of the `ObsoleteAttribute` class with a workaround message and a Boolean value indicating whether the obsolete element usage is considered an error.

Parameters:

- `message`: The text string that describes alternative workarounds.
- `error`: `true` if the obsolete element usage generates a compiler error; `false` if it generates a compiler warning.

#### Remarks
The following table shows the initial property values for an instance of `ObsoleteAttribute`.

|Property|Value|
|--------------|-----------|
|`ObsoleteAttribute.IsError`|The `error` value.|
|`ObsoleteAttribute.Message`|The `message` value.|
|`DiagnosticId`|`null`.|
|`UrlFormat`|`null`.|

## ObsoleteAttribute.DiagnosticId property

```csharp
public string? DiagnosticId { get; set; }
```

Gets or sets the ID that the compiler will use when reporting a use of the API.

Returns: The unique diagnostic ID.

#### Remarks

The diagnostic ID is shown in build output for warnings and errors.

This property represents the unique ID that can be used to suppress the warnings or errors, if needed.

Choose an appropriate diagnostic ID such that it is unique.

## ObsoleteAttribute.IsError property

```csharp
public bool IsError { get; }
```

Gets a value that indicates whether the compiler will treat usage of the obsolete program element as an error.

Returns: `true` if the obsolete element usage is considered an error; otherwise, `false`. The default is `false`.

#### Examples
The following example defines a class that contains two members marked as obsolete. The first, a property named `OldProperty`, produces a compiler warning if it is called. The second, a method named `CallOldMethod`, produces a compiler error. The example uses reflection to get information about the `ObsoleteAttribute` attributes applied to members of the type and displays the values of their `ObsoleteAttribute.Message` and `ObsoleteAttribute.IsError` properties.

_Code sample not included: ~/snippets/csharp/System/ObsoleteAttribute/IsError/obsoleteattribute_message.cs._

## ObsoleteAttribute.Message property

```csharp
public string? Message { get; }
```

Gets the workaround message.

Returns: The workaround text string.

#### Examples
The following example defines a class that contains two members marked as obsolete. The first, a property named `OldProperty`, produces a compiler warning if it is called. The second, a method named `CallOldMethod`, produces a compiler error. The example uses reflection to get information about the `ObsoleteAttribute` attributes applied to members of the type and displays the values of their `ObsoleteAttribute.Message` and `ObsoleteAttribute.IsError` properties.

_Code sample not included: ~/snippets/csharp/System/ObsoleteAttribute/IsError/obsoleteattribute_message.cs._

## ObsoleteAttribute.UrlFormat property

```csharp
public string? UrlFormat { get; set; }
```

Gets or sets the URL for corresponding documentation. The API accepts a format string instead of an actual URL, creating a generic URL that includes the diagnostic ID.

Returns: The format string that represents a URL to corresponding documentation.

#### Remarks

An example format string is `https://contoso.com/obsoletion-warnings/{0}`.
