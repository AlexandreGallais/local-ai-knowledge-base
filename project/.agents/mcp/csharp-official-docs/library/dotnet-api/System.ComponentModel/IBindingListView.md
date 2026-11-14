---
title: "IBindingListView interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/IBindingListView.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# IBindingListView interface

Namespace: `System.ComponentModel`

```csharp
public interface IBindingListView : System.Collections.IList, System.ComponentModel.IBindingList
```

Extends the `IBindingList` interface by providing advanced sorting and filtering capabilities.

#### Remarks
With the `IBindingListView` interface, you implement advanced sorting as a set of property descriptor-direction pairs. You implement filtering as a string to be interpreted by the data source implementation. The `IBindingListView` interface is implemented by the `BindingSource` class.

## IBindingListView.Filter property

```csharp
public string? Filter { get; set; }
```

Gets or sets the filter to be used to exclude items from the collection of items returned by the data source.

Returns: The string used to filter items out in the item collection returned by the data source.

#### Remarks
Your implementation of the `Filter` property should exhibit the following behavior when the `Filter` property is set: The data source returns only the items that meet the filter criteria when the list is accessed by item index or when the list is enumerated. The definition of the filter string is dependent on the data-source implementation, but the behavior associated with setting the filter should be modeled on `DataColumn.Expression`.

## IBindingListView.SortDescriptions property

```csharp
public System.ComponentModel.ListSortDescriptionCollection SortDescriptions { get; }
```

Gets the collection of sort descriptions currently applied to the data source.

Returns: The `ListSortDescriptionCollection` currently applied to the data source.

#### Remarks
The `ListSortDescriptionCollection` is a read-only collection, once constructed.

## IBindingListView.SupportsAdvancedSorting property

```csharp
public bool SupportsAdvancedSorting { get; }
```

Gets a value indicating whether the data source supports advanced sorting.

Returns: `true` if the data source supports advanced sorting; otherwise, `false`.

#### Remarks
Advanced sorting refers to the ability to sort by multiple columns.

## IBindingListView.SupportsFiltering property

```csharp
public bool SupportsFiltering { get; }
```

Gets a value indicating whether the data source supports filtering.

Returns: `true` if the data source supports filtering; otherwise, `false`.

#### Remarks
With the `SupportsFiltering` property, you implement filtering as a string to be interpreted by the data source implementation.

## IBindingListView.ApplySort(ListSortDescriptionCollection) method

```csharp
public void ApplySort (System.ComponentModel.ListSortDescriptionCollection sorts);
```

Sorts the data source based on the given `ListSortDescriptionCollection`.

Parameters:

- `sorts`: The `ListSortDescriptionCollection` containing the sorts to apply to the data source.

#### Remarks
The `ListSortDescriptionCollection` is a read-only collection, once constructed.

## IBindingListView.RemoveFilter() method

```csharp
public void RemoveFilter ();
```

Removes the current filter applied to the data source.

#### Remarks
With the `IBindingListView` type, you implement filtering as a string to be interpreted by the data source implementation.
