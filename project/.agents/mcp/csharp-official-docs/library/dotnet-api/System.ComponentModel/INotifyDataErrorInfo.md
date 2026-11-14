---
title: "INotifyDataErrorInfo interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/INotifyDataErrorInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# INotifyDataErrorInfo interface

Namespace: `System.ComponentModel`

```csharp
public interface INotifyDataErrorInfo
```

Defines members that data entity classes can implement to provide custom synchronous and asynchronous validation support.

#### Remarks
This interface enables data entity classes to implement custom validation rules and expose validation results asynchronously. This interface also supports custom error objects, multiple errors per property, cross-property errors, and entity-level errors. Cross-property errors are errors that affect multiple properties. You can associate these errors with one or all of the affected properties, or you can treat them as entity-level errors. Entity-level errors are errors that either affect multiple properties or affect the entire entity without affecting a particular property.

## INotifyDataErrorInfo.HasErrors property

```csharp
public bool HasErrors { get; }
```

Gets a value that indicates whether the entity has validation errors.

Returns: `true` if the entity currently has validation errors; otherwise, `false`.

#### Remarks
This property returns `false` if there are no known entity-level or property-level validation errors for the entity at the time it is accessed. However, some validation rules may still be running asynchronously as described for the `INotifyDataErrorInfo.GetErrors` method.

## INotifyDataErrorInfo.GetErrors(String) method

```csharp
public System.Collections.IEnumerable GetErrors (string? propertyName);
```

Gets the validation errors for a specified property or for the entire entity.

Parameters:

- `propertyName`: The name of the property to retrieve validation errors for; or `null` or `String.Empty`, to retrieve entity-level errors.

Returns: The validation errors for the property or entity.

#### Remarks
This method returns an `IEnumerable` that can change as asynchronous validation rules finish processing. This enables the binding engine to automatically update the user interface validation feedback when errors are added, removed, or modified.

The return value can change to a different `IEnumerable`, or it can reuse a previously returned `IEnumerable` and change its contents. Any changes to the return value should raise the `ErrorsChanged` event, even if the return value implements `INotifyCollectionChanged`.

## INotifyDataErrorInfo.ErrorsChanged event

```csharp
event EventHandler<System.ComponentModel.DataErrorsChangedEventArgs>? ErrorsChanged;
```

Occurs when the validation errors have changed for a property or for the entire entity.

#### Remarks
The implementing class should raise this event on the user interface thread whenever the `INotifyDataErrorInfo.GetErrors` return value changes, even if the return value implements `INotifyCollectionChanged`.
