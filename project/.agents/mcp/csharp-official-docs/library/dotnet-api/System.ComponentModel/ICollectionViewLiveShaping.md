---
title: "ICollectionViewLiveShaping interface"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/ICollectionViewLiveShaping.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ICollectionViewLiveShaping interface

Namespace: `System.ComponentModel`

```csharp
public interface ICollectionViewLiveShaping
```

Defines properties that enables sorting, grouping, and filtering on a `CollectionView` in real time.

#### Remarks
When live sorting, grouping, or filtering is enabled, a `CollectionView` will rearrange the position of data in the `CollectionView` when the data is modified.  For example, suppose that an application uses a `DataGrid` to list stocks in a stock market and the stocks are sorted by stock value.  If live sorting is enabled on the stocks' `CollectionView`, a stock's position in the `DataGrid` moves when the value of the stock becomes greater or less than another stock's value.

The `ListCollectionView`, `BindingListCollectionView`, and `ItemCollection` classes implement the `ICollectionViewLiveShaping` interface. The `CollectionViewSource` class also implements the properties defined by `ICollectionViewLiveShaping` to enable setting the properties in XAML.

#### Notes for Inheritors
Implement this interface on your custom `CollectionView` to support sorting, grouping, and filtering data in real time. Your `CollectionView` can implement the sorting, grouping, and filtering operations itself, or you can delegate one or more of them to another object, such as the underlying collection. If you delegate the shaping operations, the `CollectionView` might not have control over whether live shaping is enabled. Your `CollectionView` must accept the behavior of the object to which it delegates. In this case, set the appropriate **CanChange*** properties to `false`.  If your `CollectionView` knows whether the delegate object supports live shaping, it can set the appropriate `IsLive`* properties to the known value.  Otherwise, the `CollectionView` should set the `IsLive`* properties to `null`.

## ICollectionViewLiveShaping.CanChangeLiveFiltering property

```csharp
public bool CanChangeLiveFiltering { get; }
```

Gets a value that indicates whether the collection view supports turning filtering data in real time on or off.

Returns: `true` if the collection view supports turning live filtering on or off; otherwise, `false`.

#### Remarks

#### Notes for Inheritors
Your `CollectionView` can implement live filtering itself, or you can delegate live filtering to another object, such as the underlying collection. If you delegate live filtering, the `CollectionView` might not have control over whether it is enabled. Your `CollectionView` must accept the behavior of the object to which it delegates. In this case, set the `CanChangeLiveFiltering` property to `false`.

## ICollectionViewLiveShaping.CanChangeLiveGrouping property

```csharp
public bool CanChangeLiveGrouping { get; }
```

Gets a value that indicates whether the collection view supports turning grouping data in real time on or off.

Returns: `true` if the collection view supports turning live grouping on or off; otherwise, `false`.

#### Remarks

#### Notes for Inheritors
Your `CollectionView` can implement live grouping itself, or you can delegate live grouping to another object, such as the underlying collection. If you delegate live grouping, the `CollectionView` might not have control over whether it is enabled. Your `CollectionView` must accept the behavior of the object to which it delegates. In this case, set the `CanChangeLiveGrouping` property to `false`.

## ICollectionViewLiveShaping.CanChangeLiveSorting property

```csharp
public bool CanChangeLiveSorting { get; }
```

Gets a value that indicates whether the collection view supports turning sorting data in real time on or off.

Returns: `true` if the collection view supports turning live sorting on or off; otherwise, `false`.

#### Remarks

#### Notes for Inheritors
Your `CollectionView` can implement live sorting itself, or you can delegate live sorting to another object, such as the underlying collection. If you delegate live sorting, the `CollectionView` might not have control over whether it is enabled. Your `CollectionView` must accept the behavior of the object to which it delegates. In this case, set the `CanChangeLiveSorting` property to `false`.

## ICollectionViewLiveShaping.IsLiveFiltering property

```csharp
public bool? IsLiveFiltering { get; set; }
```

Gets or sets a value that indicates whether filtering data in real time is enabled.

Returns: `true` if filtering data in real time is enabled; `false` if live filtering is not enabled; `null` if it cannot be determined whether the collection view implements live filtering.

#### Remarks

#### Notes for Inheritors
Your `CollectionView` can implement live filtering itself, or you can delegate live filtering to another object, such as the underlying collection. If you delegate live filtering, the `CollectionView` might not have control over whether it is enabled. Your `CollectionView` must accept the behavior of the object to which it delegates. If your `CollectionView` knows whether the delegate object supports live filtering, set the `IsLiveFiltering` property to the known value.  Otherwise, set `ICollectionViewLiveShaping.IsLiveFiltering` to `null`.

## ICollectionViewLiveShaping.IsLiveGrouping property

```csharp
public bool? IsLiveGrouping { get; set; }
```

Gets or sets a value that indicates whether grouping data in real time is enabled.

Returns: `true` if grouping data in real time is enable; `false` if live grouping is not enabled; `null` if it cannot be determined whether the collection view implements live grouping.

#### Remarks

#### Notes for Inheritors
Your `CollectionView` can implement live grouping itself, or you can delegate live grouping to another object, such as the underlying collection. If you delegate live grouping, the `CollectionView` might not have control over whether it is enabled. Your `CollectionView` must accept the behavior of the object to which it delegates. If your `CollectionView` knows whether the delegate object supports live grouping, set the `IsLiveGrouping` property to the known value.  Otherwise, set `ICollectionViewLiveShaping.IsLiveGrouping` to `null`.

## ICollectionViewLiveShaping.IsLiveSorting property

```csharp
public bool? IsLiveSorting { get; set; }
```

Gets or sets a value that indicates whether sorting in real time is enabled.

Returns: `true` if sorting data in real time is enable; `false` if live sorting is not enabled; `null` if it cannot be determined whether the collection view implements live sorting.

#### Remarks

#### Notes for Inheritors
Your `CollectionView` can implement live sorting itself, or you can delegate live sorting to another object, such as the underlying collection. If you delegate live sorting, the `CollectionView` might not have control over whether it is enabled. Your `CollectionView` must accept the behavior of the object to which it delegates. If your `CollectionView` knows whether the delegate object supports live sorting, set the `IsLiveSorting` property to the known value.  Otherwise, set `ICollectionViewLiveShaping.IsLiveSorting` to `null`.

## ICollectionViewLiveShaping.LiveFilteringProperties property

```csharp
public System.Collections.ObjectModel.ObservableCollection<string> LiveFilteringProperties { get; }
```

Gets a collection of strings that specify the properties that participate in filtering data in real time.

Returns: A collection of strings that specify the properties that participate in filtering data in real time.

To be added.

## ICollectionViewLiveShaping.LiveGroupingProperties property

```csharp
public System.Collections.ObjectModel.ObservableCollection<string> LiveGroupingProperties { get; }
```

Gets a collection of strings that specify the properties that participate in grouping data in real time.

Returns: A collection of strings that specify the properties that participate in grouping data in real time.

To be added.

## ICollectionViewLiveShaping.LiveSortingProperties property

```csharp
public System.Collections.ObjectModel.ObservableCollection<string> LiveSortingProperties { get; }
```

Gets a collection of strings that specify the properties that participate in sorting data in real time.

Returns: A collection of strings that specify the properties that participate in sorting data in real time.

To be added.
