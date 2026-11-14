---
title: "ITypedList interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ITypedList.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ITypedList interface

Namespace: `System.ComponentModel`

```csharp
public interface ITypedList
```

Provides functionality to discover the schema for a bindable list, where the properties available for binding differ from the public properties of the object to bind to.

#### Remarks
Use this interface if, for instance, you are using a `DataView` object that represents a `customer` table, you want to bind to the properties on the `customer` object that the `DataView` represents, not the properties of the `DataView`.

This interface is not required for design-time support of a bindable list.

Binding to data can occur either at run time or in a designer, but there are rules for both. At run time, you can bind to data in any of the following:

-   `Array`

- Implementer of `IList`, provided the implementer has a strongly typed `IList.Item` property (that is, the `Type` is anything but `Object`). You can accomplish this by making the default implementation of `IList.Item` private. If you want to create an `IList` that follows the rules of a strongly typed collection, you should derive from `CollectionBase`.

- Implementer of `ITypedList`.

In a designer, you can initialize binding to `Component` objects by following the same rules.

For more information on binding to a data source, see the `Binding` class.

#### Examples
The following code example demonstrates how to implement the `ITypedList` interface. A generic type named `SortableBindingList` derives from the `BindingList<T>` class and implements the `ITypedList` interface. For a full code listing, see How to: Implement the ITypedList Interface.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ITypedList/Overview/SortableBindingList.cs._

## ITypedList.GetItemProperties(PropertyDescriptor[]) method

```csharp
public System.ComponentModel.PropertyDescriptorCollection GetItemProperties (System.ComponentModel.PropertyDescriptor[]? listAccessors);
```

Returns the `PropertyDescriptorCollection` that represents the properties on each item used to bind data.

Parameters:

- `listAccessors`: An array of `PropertyDescriptor` objects to find in the collection as bindable. This can be `null`.

Returns: The `PropertyDescriptorCollection` that represents the properties on each item used to bind data.

#### Remarks
If the `listAccessors` parameter is not `null`, it typically contains a property descriptor that identifies a list of containers to retrieve for the object that implements `ITypedList`. For example, a `DataSet` containing two tables, `myCustomers` and `myOrders`, with a relationship between them called `myCustOrders`. If you create a `DataView` object to view `myCustomers`, then calling the `ITypedList.GetItemProperties` method with `null` returns the property descriptors for the columns in `myCustomers`. As a result, one of the returned property descriptors is a property descriptor for `myCustOrders`, just as calling the `ITypedList.GetItemProperties` method with a list accessor array containing the property descriptors for `myCustOrders` will return the property descriptors for `myOrders`.

#### Examples
The following code example demonstrates how to implement the `ITypedList.GetItemProperties` method. For a full code listing, see How to: Implement the ITypedList Interface.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ITypedList/Overview/SortableBindingList.cs._

## ITypedList.GetListName(PropertyDescriptor[]) method

```csharp
public string GetListName (System.ComponentModel.PropertyDescriptor[]? listAccessors);
```

Returns the name of the list.

Parameters:

- `listAccessors`: An array of `PropertyDescriptor` objects, for which the list name is returned. This can be `null`.

Returns: The name of the list.

#### Remarks
This method is used only in the design-time framework and by the obsolete `DataGrid` control.

#### Examples
The following code example demonstrates how to implement the `ITypedList.GetListName` method. For a full code listing, see How to: Implement the ITypedList Interface.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/ITypedList/Overview/SortableBindingList.cs._
