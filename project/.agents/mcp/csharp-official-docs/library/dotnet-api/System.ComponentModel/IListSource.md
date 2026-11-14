---
title: "IListSource interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IListSource.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IListSource interface

Namespace: `System.ComponentModel`

```csharp
public interface IListSource
```

Provides functionality to an object to return a list that can be bound to a data source.

#### Remarks
You typically use this interface to return a list that can be bound to a data source, from an object that does not implement `IList` itself.

Binding to data can occur at either run time or in a designer, but there are rules for each. At run time, you can bind to data in any of the following:

-   `Array`

- Implementer of `IList`, provided the implementer has a strongly typed `IList.Item` property (that is, the `Type` is anything but `Object`). You can accomplish this by making the default implementation of `IList.Item` private. If you want to create an `IList` that follows the rules of a strongly typed collection, you should derive from `CollectionBase`.

- Implementer of `ITypedList`.

In a designer, you can initialize binding to `Component` objects by following the same rules.

> **Note:**
>  Implementers of `IListSource` can return an `IList` that contains a collection of `IList` objects.

#### Examples
The following code example demonstrates how to implement the `IListSource` interface. A component named `EmployeeListSource` exposes an `IList` for data binding by implementing the `IListSource.GetList` method. For a full code listing, see How to: Implement the IListSource Interface.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IListSource/Overview/EmployeeListSource.cs._

## IListSource.ContainsListCollection property

```csharp
public bool ContainsListCollection { get; }
```

Gets a value indicating whether the collection is a collection of `IList` objects.

Returns: `true` if the collection is a collection of `IList` objects; otherwise, `false`.

#### Remarks
Using this property in `DataSet` returns `true` because the `DataSet` class contains a collection of collections. Using this property in `DataTable` returns `false` because the `DataTable` class contains a collection of objects.

#### Examples
The following code example demonstrates how to implement the `IListSource` interface. A component named `EmployeeListSource` indicates that it does not contain an `IList` for data binding by returning `false` from the `IListSource.ContainsListCollection` method. For a full code listing, see How to: Implement the IListSource Interface.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IListSource/Overview/EmployeeListSource.cs._

## IListSource.GetList() method

```csharp
public System.Collections.IList GetList ();
```

Returns an `IList` that can be bound to a data source from an object that does not implement an `IList` itself.

Returns: An `IList` that can be bound to a data source from the object.

#### Examples
The following code example demonstrates how to implement the `IListSource` interface. A component named `EmployeeListSource` exposes an `IList` for data binding by implementing the `IListSource.GetList` method. For a full code listing, see How to: Implement the IListSource Interface.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/IListSource/Overview/EmployeeListSource.cs._
