---
title: "IEditableObject interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IEditableObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IEditableObject interface

Namespace: `System.ComponentModel`

```csharp
public interface IEditableObject
```

Provides functionality to commit or rollback changes to an object that is used as a data source.

#### Remarks
This interface is typically used to capture the `IEditableObject.BeginEdit`, `IEditableObject.EndEdit`, and `IEditableObject.CancelEdit` semantics of a `DataRowView`.

#### Examples
The following sample provides a simple implementation of the `IEditableObject` interface. The `Customer` class stores customer information and can be used as a collection for a customer database. This sample assumes that you have used the `CustomerList` class that can be found in sample in the `IBindingList` class.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IBindingList/Overview/binding_editable.cs._

## IEditableObject.BeginEdit() method

```csharp
public void BeginEdit ();
```

Begins an edit on an object.

#### Remarks
This method is typically used to capture the `IEditableObject.BeginEdit` semantics of a `DataRowView`.

If `IEditableObject.BeginEdit` is called on an object that is already being edited, the second and subsequent calls are ignored.

## IEditableObject.CancelEdit() method

```csharp
public void CancelEdit ();
```

Discards changes since the last `IEditableObject.BeginEdit` call.

#### Remarks
This method is typically used to capture the `IEditableObject.CancelEdit` semantics of a `DataRowView`.

This method will be ignored if called on an object that is not being edited.

> **Note:**
>  If the owning list implements `IBindingList`, calling `IEditableObject.CancelEdit` on an object created using `IBindingList.AddNew` discards the object.

## IEditableObject.EndEdit() method

```csharp
public void EndEdit ();
```

Pushes changes since the last `IEditableObject.BeginEdit` or `IBindingList.AddNew` call into the underlying object.

#### Remarks
This method is typically used to capture the `IEditableObject.EndEdit` semantics of a `DataRowView`.

This method will be ignored if called on an object that is not being edited.
