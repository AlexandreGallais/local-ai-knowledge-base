---
title: "ComponentResourceManager class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ComponentResourceManager.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ComponentResourceManager class

Namespace: `System.ComponentModel`

```csharp
public class ComponentResourceManager : System.Resources.ResourceManager
```

Provides simple functionality for enumerating resources for a component or object. The `ComponentResourceManager` class is a `ResourceManager`.

#### Examples
The following code example demonstrates how to use `ComponentResourceManager` to assign image resources to the `Image` property of `ToolStripButton` controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ComponentResourceManager/Overview/form1.cs._

## ComponentResourceManager.ComponentResourceManager() constructor

```csharp
public ComponentResourceManager ();
```

Initializes a new instance of the `ComponentResourceManager` class with default values.

To be added.

## ComponentResourceManager.ComponentResourceManager(Type) constructor

```csharp
public ComponentResourceManager (Type t);
```

Creates a `ComponentResourceManager` that looks up resources in satellite assemblies based on information from the specified `Type`.

Parameters:

- `t`: A `Type` from which the `ComponentResourceManager` derives all information for finding resource files.

#### Examples
The following code example demonstrates how to use `ComponentResourceManager` to assign image resources to the `Image` property of `ToolStripButton` controls.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ComponentResourceManager/Overview/form1.cs._

## ComponentResourceManager.ApplyResources(Object, String) method

```csharp
public void ApplyResources (object value, string objectName);
```

Applies a resource's value to the corresponding property of the object.

Parameters:

- `value`: An `Object` that contains the property value to be applied.
- `objectName`: A `String` that contains the name of the object to look up in the resources.

Exceptions:

- `ArgumentNullException`: `value` or `objectName` is `null`.

#### Remarks
This method examines all the resources for the current culture used in the development environment. It attempts to find a resource with a key in the format of `objectName.propertyName`, where `objectName` is passed in as a parameter and `propertyName` is the name of a property. It will then apply that resource's `value` to the corresponding property of the object. If there is no matching property, the resource will be ignored.

## ComponentResourceManager.ApplyResources(Object, String, CultureInfo) method

```csharp
public virtual void ApplyResources (object value, string objectName, System.Globalization.CultureInfo? culture);
```

Applies a resource's value to the corresponding property of the object.

Parameters:

- `value`: An `Object` that contains the property value to be applied.
- `objectName`: A `String` that contains the name of the object to look up in the resources.
- `culture`: The culture for which to apply resources.

Exceptions:

- `ArgumentNullException`: `value` or `objectName` is `null`.

#### Remarks
This method examines all the resources for the provided culture. If `culture` is `null`, the current culture is assumed.

The `ComponentResourceManager.ApplyResources` method attempts to find a resource with a key in the format of `objectName.propertyName`, where `objectName` is passed in as a parameter and `propertyName` is the name of a property. It will then apply that resource's `value` to the corresponding property of the object. If there is no matching property, the resource will be ignored.

## ComponentResourceManager.ApplyResourcesToRegisteredType(Object, String, CultureInfo) method

```csharp
public virtual void ApplyResourcesToRegisteredType (object value, string objectName, System.Globalization.CultureInfo? culture);
```

Examines all the resources for the provided culture.

When it finds a resource with a key in the format of

"[objectName].[property name]" or "[objectName]-[property name]" it will apply that resource's value

to the corresponding property on the object. If there is no matching

property the resource will be ignored.

Parameters:

- `value`: An `Object` that contains the property value to be applied.
- `objectName`: A `String` that contains the name of the object to look up in the resources.
- `culture`: The culture for which to apply resources.

To be added.
