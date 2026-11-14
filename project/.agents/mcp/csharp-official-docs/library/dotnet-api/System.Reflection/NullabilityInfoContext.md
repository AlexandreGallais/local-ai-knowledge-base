---
title: "NullabilityInfoContext class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Reflection/NullabilityInfoContext.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# NullabilityInfoContext class

Namespace: `System.Reflection`

```csharp
public sealed class NullabilityInfoContext
```

Provides APIs for populating nullability information and context from reflection members: `ParameterInfo`, `FieldInfo`, `PropertyInfo`, and `EventInfo`.

To be added.

## NullabilityInfoContext.NullabilityInfoContext() constructor

```csharp
public NullabilityInfoContext ();
```

Initializes a new instance of the `NullabilityInfoContext` class.

To be added.

## NullabilityInfoContext.Create(EventInfo) method

```csharp
public System.Reflection.NullabilityInfo Create (System.Reflection.EventInfo eventInfo);
```

Populates a `NullabilityInfo` for the given `EventInfo`. If the `nullablePublicOnly` feature is set for an assembly, like it does in the .NET SDK, the private and/or internal member's nullability attributes are omitted, and the API will return the `NullabilityState.Unknown` state.

Parameters:

- `eventInfo`: The event for which to populate nullability information.

Returns: A `NullabilityInfo` instance.

Exceptions:

- `ArgumentNullException`: `eventInfo` is `null`.

To be added.

## NullabilityInfoContext.Create(FieldInfo) method

```csharp
public System.Reflection.NullabilityInfo Create (System.Reflection.FieldInfo fieldInfo);
```

Populates a `NullabilityInfo` for the given `FieldInfo`. If the `nullablePublicOnly` feature is set for an assembly, like it does in the .NET SDK, the private and/or internal member's nullability attributes are omitted, and the API will return the `NullabilityState.Unknown` state.

Parameters:

- `fieldInfo`: The field for which to populate the nullability information.

Returns: A `NullabilityInfo` instance.

Exceptions:

- `ArgumentNullException`: `fieldInfo` is `null`.

To be added.

## NullabilityInfoContext.Create(ParameterInfo) method

```csharp
public System.Reflection.NullabilityInfo Create (System.Reflection.ParameterInfo parameterInfo);
```

Populates a `NullabilityInfo` for the given `ParameterInfo`. If the `nullablePublicOnly` feature is set for an assembly, like it does in the .NET SDK, the private and/or internal member's nullability attributes are omitted, and the API will return the `NullabilityState.Unknown` state.

Parameters:

- `parameterInfo`: The parameter for which to populate the nullability information.

Returns: A `NullabilityInfo` instance.

Exceptions:

- `ArgumentNullException`: `parameterInfo` is `null`.

To be added.

## NullabilityInfoContext.Create(PropertyInfo) method

```csharp
public System.Reflection.NullabilityInfo Create (System.Reflection.PropertyInfo propertyInfo);
```

Populates a `NullabilityInfo` for the given `PropertyInfo`. If the `nullablePublicOnly` feature is set for an assembly, like it does in the .NET SDK, the private and/or internal member's nullability attributes are omitted, and the API will return the `NullabilityState.Unknown` state.

Parameters:

- `propertyInfo`: The property for which to populate the nullability information.

Returns: A `NullabilityInfo` instance.

Exceptions:

- `ArgumentNullException`: `propertyInfo` is `null`.

To be added.
