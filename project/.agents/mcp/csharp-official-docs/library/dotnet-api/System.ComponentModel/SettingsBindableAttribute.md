---
title: "SettingsBindableAttribute class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/SettingsBindableAttribute.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# SettingsBindableAttribute class

Namespace: `System.ComponentModel`

```csharp
public sealed class SettingsBindableAttribute : Attribute
```

Specifies when a component property can be bound to an application setting.

To be added.

## SettingsBindableAttribute.SettingsBindableAttribute(Boolean) constructor

```csharp
public SettingsBindableAttribute (bool bindable);
```

Initializes a new instance of the `SettingsBindableAttribute` class.

Parameters:

- `bindable`: `true` to specify that a property is appropriate to bind settings to; otherwise, `false`.

To be added.

## SettingsBindableAttribute.Bindable property

```csharp
public bool Bindable { get; }
```

Gets a value indicating whether a property is appropriate to bind settings to.

Returns: `true` if the property is appropriate to bind settings to; otherwise, `false`.

To be added.

## SettingsBindableAttribute.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Returns a value that indicates whether this instance is equal to a specified object.

Parameters:

- `obj`: An `Object` to compare with this instance or a null reference (`Nothing` in Visual Basic).

Returns: `true` if `obj` equals the type and value of this instance; otherwise, `false`.

To be added.

## SettingsBindableAttribute.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this instance.

Returns: A 32-bit signed integer hash code.

To be added.

## SettingsBindableAttribute.No field

```csharp
public static readonly System.ComponentModel.SettingsBindableAttribute No;
```

Specifies that a property is not appropriate to bind settings to.

To be added.

## SettingsBindableAttribute.Yes field

```csharp
public static readonly System.ComponentModel.SettingsBindableAttribute Yes;
```

Specifies that a property is appropriate to bind settings to.

To be added.
