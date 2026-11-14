---
title: "DependencyPropertyDescriptor class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/DependencyPropertyDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# DependencyPropertyDescriptor class (part 2 of 2)

## DependencyPropertyDescriptor.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this `DependencyPropertyDescriptor`.

Returns: A 32-bit signed integer hash code.

#### Remarks
The hash code for `DependencyPropertyDescriptor` is based both on the identifier for a dependency property and on the type on which it is set. This implementation assures that a `DependencyPropertyDescriptor` does not improperly return the same hash code for properties that are inherited by the many possible derived classes, or for properties that are otherwise re-assigned through the property system.

## DependencyPropertyDescriptor.GetValue(Object) method

```csharp
public override object GetValue (object component);
```

Returns the current value of the property on a component.

Parameters:

- `component`: The component instance.

Returns: The requested value.

#### Remarks
This method relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.RemoveValueChanged(Object, EventHandler) method

```csharp
public override void RemoveValueChanged (object component, EventHandler handler);
```

Enables other objects to be notified when this property changes.

Parameters:

- `component`: The component to add the handler for.
- `handler`: The delegate to add as a listener.

#### Remarks
This method relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.ResetValue(Object) method

```csharp
public override void ResetValue (object component);
```

Resets the value for this property of the component to the default value.

Parameters:

- `component`: The component with the property value that is to be reset to the default value.

#### Remarks
This method relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.SetValue(Object, Object) method

```csharp
public override void SetValue (object component, object value);
```

Sets the value of the component to a different value.

Parameters:

- `component`: The component with the property value that is to be set.
- `value`: The new value.

#### Remarks
This method relies on the underlying `PropertyDescriptor`.

## DependencyPropertyDescriptor.ShouldSerializeValue(Object) method

```csharp
public override bool ShouldSerializeValue (object component);
```

Indicates whether the value of this property needs to be persisted by serialization processes.

Parameters:

- `component`: The component with the property to be examined for persistence.

Returns: `true` if the property should be persisted; otherwise, `false`.

To be added.

## DependencyPropertyDescriptor.ToString() method

```csharp
public override string ToString ();
```

Converts the value of this instance to its equivalent string representation.

Returns: Returns the `MemberDescriptor.Name` value.

To be added.
