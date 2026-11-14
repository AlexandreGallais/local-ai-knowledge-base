---
title: "ListSortDescription class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ListSortDescription.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ListSortDescription class

Namespace: `System.ComponentModel`

```csharp
public class ListSortDescription
```

Provides a description of the sort operation applied to a data source.

#### Remarks
The `ListSortDescription` is used by the `IBindingListView` interface.

## ListSortDescription.ListSortDescription(PropertyDescriptor, ListSortDirection) constructor

```csharp
public ListSortDescription (System.ComponentModel.PropertyDescriptor? property, System.ComponentModel.ListSortDirection direction);
```

Initializes a new instance of the `ListSortDescription` class with the specified property description and direction.

Parameters:

- `property`: The `PropertyDescriptor` that describes the property by which the data source is sorted.
- `direction`: One of the `ListSortDescription` values.

To be added.

## ListSortDescription.PropertyDescriptor property

```csharp
public System.ComponentModel.PropertyDescriptor? PropertyDescriptor { get; set; }
```

Gets or sets the abstract description of a class property associated with this `ListSortDescription`.

Returns: The `PropertyDescriptor` associated with this `ListSortDescription`.

To be added.

## ListSortDescription.SortDirection property

```csharp
public System.ComponentModel.ListSortDirection SortDirection { get; set; }
```

Gets or sets the direction of the sort operation associated with this `ListSortDescription`.

Returns: One of the `ListSortDirection` values.

To be added.
