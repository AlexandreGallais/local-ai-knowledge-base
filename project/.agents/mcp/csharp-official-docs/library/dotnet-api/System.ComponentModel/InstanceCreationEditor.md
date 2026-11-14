---
title: "InstanceCreationEditor class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/InstanceCreationEditor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# InstanceCreationEditor class

Namespace: `System.ComponentModel`

```csharp
public abstract class InstanceCreationEditor
```

Creates an instance of a particular type of property from a drop-down box within the `PropertyGrid`.

#### Remarks
Usually, the text specified by `InstanceCreationEditor.Text` is displayed on the drop-down box from the `PropertyGrid` as a link or button. When clicked, the `InstanceCreationEditor.CreateInstance` method is called with the `Type` of the object to create.

## InstanceCreationEditor.InstanceCreationEditor() constructor

```csharp
protected InstanceCreationEditor ();
```

Initializes a new instance of the `InstanceCreationEditor` class.

To be added.

## InstanceCreationEditor.Text property

```csharp
public virtual string Text { get; }
```

Gets the specified text.

Returns: The specified text.

To be added.

## InstanceCreationEditor.CreateInstance(ITypeDescriptorContext, Type) method

```csharp
public abstract object? CreateInstance (System.ComponentModel.ITypeDescriptorContext context, Type instanceType);
```

When overridden in a derived class, returns an instance of the specified type.

Parameters:

- `context`: The context information.
- `instanceType`: The specified type.

Returns: An instance of the specified type or `null`.

To be added.
