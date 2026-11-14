---
title: "PropertyDescriptor class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/PropertyDescriptor.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# PropertyDescriptor class (part 2 of 2)

## PropertyDescriptor.GetChildProperties(Object, Attribute[]) method

```csharp
public virtual System.ComponentModel.PropertyDescriptorCollection GetChildProperties (object? instance, Attribute[]? filter);
```

Returns a `PropertyDescriptorCollection` for a given object using a specified array of attributes as a filter.

Parameters:

- `instance`: A component to get the properties for.
- `filter`: An array of type `Attribute` to use as a filter.

Returns: A `PropertyDescriptorCollection` with the properties that match the specified attributes for the specified component.

#### Remarks
The properties for the `instance` parameter can differ from the properties of a class, because the site can add or remove properties if the `instance` parameter is sited.

The `filter` parameter can mix `Type` and `Attribute` objects. Filtering is defined by the following rules:

- A `Type` object is treated as a wildcard; it matches any property that has the `Type` in its set of attributes.

- If a property does not have an `Attribute` of the same class, the property will not be included in the returned array.

- If the attribute is an instance of `Attribute`, the property must be an exact match to be included in the returned array.

- If you specify an `Attribute` instance and it is the default property, it will be included in the returned array even if there is no instance of the `Attribute` in the property.

Generally, child properties should be returned by implementing the `TypeConverter.GetProperties` member of the `TypeConverter` returned from this property.

## PropertyDescriptor.GetEditor(Type) method

```csharp
public virtual object? GetEditor (Type editorBaseType);
```

Gets an editor of the specified type.

Parameters:

- `editorBaseType`: The base type of editor, which is used to differentiate between multiple editors that a property supports.

Returns: An instance of the requested editor type, or `null` if an editor cannot be found.

To be added.

## PropertyDescriptor.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Returns the hash code for this object.

Returns: The hash code for this object.

To be added.

## PropertyDescriptor.GetInvocationTarget(Type, Object) method

```csharp
protected override object? GetInvocationTarget (Type type, object instance);
```

This method returns the object that should be used during invocation of members.

Parameters:

- `type`: The `Type` of the invocation target.
- `instance`: The potential invocation target.

Returns: The `Object` that should be used during invocation of members.

#### Remarks
Typically, the return value will be the same as the `instance` passed in. If someone associated another object with this instance, or if the instance is a custom type descriptor, the `PropertyDescriptor.GetInvocationTarget` method may return a different value.

## PropertyDescriptor.GetTypeFromName(String) method

```csharp
protected Type? GetTypeFromName (string? typeName);
```

Returns a type using its name.

Parameters:

- `typeName`: The assembly-qualified name of the type to retrieve.

Returns: A `Type` that matches the given type name, or `null` if a match cannot be found.

#### Remarks
To find the appropriate type, this method first checks the assembly of the type that this `PropertyDescriptor` references. If it does not find the type in the assembly, it calls `Type.GetType`.

## PropertyDescriptor.GetValue(Object) method

```csharp
public abstract object? GetValue (object? component);
```

When overridden in a derived class, gets the current value of the property on a component.

Parameters:

- `component`: The component with the property for which to retrieve the value.

Returns: The value of a property for a given component.

#### Remarks
Typically, this method is implemented through reflection.

This method automatically calls the pre-change method, `IComponentChangeService.OnComponentChanging`, and post-change method, `IComponentChangeService.OnComponentChanged`, of the `IComponentChangeService`.

## PropertyDescriptor.GetValueChangedHandler(Object) method

```csharp
protected internal EventHandler? GetValueChangedHandler (object component);
```

Retrieves the current set of `ValueChanged` event handlers for a specific component.

Parameters:

- `component`: The component for which to retrieve event handlers.

Returns: A combined multicast event handler, or `null` if no event handlers are currently assigned to `component`.

To be added.

## PropertyDescriptor.OnValueChanged(Object, EventArgs) method

```csharp
protected virtual void OnValueChanged (object? component, EventArgs e);
```

Raises the `ValueChanged` event that you implemented.

Parameters:

- `component`: The object that raises the event.
- `e`: An `EventArgs` that contains the event data.

#### Remarks
This method should be called by your property descriptor implementation when the property value has changed.

## PropertyDescriptor.RemoveValueChanged(Object, EventHandler) method

```csharp
public virtual void RemoveValueChanged (object component, EventHandler handler);
```

Enables other objects to be notified when this property changes.

Parameters:

- `component`: The component to remove the handler for.
- `handler`: The delegate to remove as a listener.

Exceptions:

- `ArgumentNullException`: `component` or `handler` is `null`.

To be added.

## PropertyDescriptor.ResetValue(Object) method

```csharp
public abstract void ResetValue (object component);
```

When overridden in a derived class, resets the value for this property of the component to the default value.

Parameters:

- `component`: The component with the property value that is to be reset to the default value.

#### Remarks
Typically, this method is implemented through reflection.

This method determines the value to reset the property to in the following order of precedence:

1.  There is a shadowed property for this property.

2.  There is a `DefaultValueAttribute` for this property.

3.  There is a "ResetMyProperty" method that you have implemented, where "MyProperty" is the name of the property you pass to it.

This method creates a `DesignerTransaction` automatically in the following order:

1.  The method calls the `IDesignerHost.CreateTransaction` method to create a new `DesignerTransaction` to represent the changes.

2.  The method calls the `IComponentChangeService.OnComponentChanging` method to indicate that the transaction has begun and the changes are about to occur.

3.  The method resets the property to the value determined by this method's checking order.

4.  The method calls the `IComponentChangeService.OnComponentChanged` method to indicate that the changes have occurred.

5.  The method calls `DesignerTransaction.Commit` to indicate that the transaction is completed.

The purpose of the transaction is to support `Undo` and `Redo` functionality.

## PropertyDescriptor.SetValue(Object, Object) method

```csharp
public abstract void SetValue (object? component, object? value);
```

When overridden in a derived class, sets the value of the component to a different value.

Parameters:

- `component`: The component with the property value that is to be set.
- `value`: The new value.

#### Remarks
Typically, this method is implemented through reflection.

This method creates a `DesignerTransaction` automatically in the following order:

1.  The method calls the `IDesignerHost.CreateTransaction` method to create a new `DesignerTransaction` to represent the changes.

2.  The method calls the `IComponentChangeService.OnComponentChanging` method to indicate that the transaction has begun and the changes are about to occur.

3.  The method resets the property to the value determined by this method's checking order.

4.  The method calls the `IComponentChangeService.OnComponentChanged` method to indicate that the changes have occurred.

5.  The method calls `DesignerTransaction.Commit` to indicate that the transaction is complete.

The purpose of the transaction is to support `Undo` and `Redo` functionality.

## PropertyDescriptor.ShouldSerializeValue(Object) method

```csharp
public abstract bool ShouldSerializeValue (object component);
```

When overridden in a derived class, determines a value indicating whether the value of this property needs to be persisted.

Parameters:

- `component`: The component with the property to be examined for persistence.

Returns: `true` if the property should be persisted; otherwise, `false`.

#### Remarks
Typically, this method is implemented through reflection.
