---
title: "NullabilityInfo class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/NullabilityInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NullabilityInfo class

Namespace: `System.Reflection`

```csharp
public sealed class NullabilityInfo
```

Represents nullability information.

To be added.

## NullabilityInfo.ElementType property

```csharp
public System.Reflection.NullabilityInfo? ElementType { get; }
```

Gets the nullability information for the element type of the array.

Returns: If the member type is an array, the `NullabilityInfo` of the elements of the array; otherwise, `null`.

To be added.

## NullabilityInfo.GenericTypeArguments property

```csharp
public System.Reflection.NullabilityInfo[] GenericTypeArguments { get; }
```

Gets the nullability information for each type parameter.

Returns: If the member type is a generic type, the nullability information for each type parameter.

To be added.

## NullabilityInfo.ReadState property

```csharp
public System.Reflection.NullabilityState ReadState { get; }
```

Gets the nullability read state of the member.

Returns: To be added.

To be added.

## NullabilityInfo.Type property

```csharp
public Type Type { get; }
```

Gets the type of the member or generic parameter to which this instance belongs.

Returns: To be added.

To be added.

## NullabilityInfo.WriteState property

```csharp
public System.Reflection.NullabilityState WriteState { get; }
```

Gets the nullability write state of the member.

Returns: To be added.

To be added.
