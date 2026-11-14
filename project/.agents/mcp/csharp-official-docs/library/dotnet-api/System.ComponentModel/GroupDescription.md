---
title: "GroupDescription class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/GroupDescription.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GroupDescription class

Namespace: `System.ComponentModel`

```csharp
public abstract class GroupDescription : System.ComponentModel.INotifyPropertyChanged
```

Provides an abstract base class for types that describe how to divide the items in a collection into groups.

To be added.

## GroupDescription.GroupDescription() constructor

```csharp
protected GroupDescription ();
```

Initializes a new instance of the `GroupDescription` class.

To be added.

## GroupDescription.CustomSort property

```csharp
public System.Collections.IComparer CustomSort { get; set; }
```

Gets or sets a custom comparer that sorts groups using an object that implements `IComparer`.

Returns: A custom comparer that sorts groups using an object that implements `IComparer`.

#### Remarks

> **Note:**
>  Setting the custom comparer object will clear previously set `GroupDescription.SortDescriptions`.

## GroupDescription.GroupNames property

```csharp
public System.Collections.ObjectModel.ObservableCollection<object> GroupNames { get; }
```

Gets the collection of names that are used to initialize a group with a set of subgroups with the given names.

Returns: The collection of names that are used to initialize a group with a set of subgroups with the given names.

#### Remarks
You can add additional subgroups later if there are items that do not match any of the given names.

## GroupDescription.SortDescriptions property

```csharp
public System.ComponentModel.SortDescriptionCollection SortDescriptions { get; }
```

Gets the collection of sort criteria in which to sort the groups.

Returns: The collection of sort criteria in which to sort the groups.

To be added.

## GroupDescription.GroupNameFromItem(Object, Int32, CultureInfo) method

```csharp
public abstract object GroupNameFromItem (object item, int level, System.Globalization.CultureInfo culture);
```

Returns the group name(s) for the given item.

Parameters:

- `item`: The item to return group names for.
- `level`: The level of grouping.
- `culture`: The `CultureInfo` to supply to the converter.

Returns: The group name(s) for the given item.

To be added.

## GroupDescription.NamesMatch(Object, Object) method

```csharp
public virtual bool NamesMatch (object groupName, object itemName);
```

Returns a value that indicates whether the group name and the item name match such that the item belongs to the group.

Parameters:

- `groupName`: The name of the group to check.
- `itemName`: The name of the item to check.

Returns: `true` if the names match and the item belongs to the group; otherwise, `false`.

To be added.

## GroupDescription.OnPropertyChanged(PropertyChangedEventArgs) method

```csharp
protected virtual void OnPropertyChanged (System.ComponentModel.PropertyChangedEventArgs e);
```

Raises the `GroupDescription.PropertyChanged` event.

Parameters:

- `e`: Arguments of the event being raised.

#### Remarks
Subclasses need to call this method to raise the `PropertyChanged` event.

## GroupDescription.ShouldSerializeGroupNames() method

```csharp
public bool ShouldSerializeGroupNames ();
```

Returns whether serialization processes should serialize the effective value of the `GroupDescription.GroupNames` property on instances of this class.

Returns: `true` if the `GroupDescription.GroupNames` property value should be serialized; otherwise, `false`.

To be added.

## GroupDescription.ShouldSerializeSortDescriptions() method

```csharp
public bool ShouldSerializeSortDescriptions ();
```

Returns whether serialization processes should serialize the effective value of the `GroupDescription.SortDescriptions` property on instances of this class.

Returns: `true` if the `GroupDescription.SortDescriptions` property value should be serialized; otherwise, `false`.

To be added.

## GroupDescription.PropertyChanged event

```csharp
protected virtual event System.ComponentModel.PropertyChangedEventHandler PropertyChanged;
```

Occurs when a property value changes.

To be added.

## GroupDescription.System.ComponentModel.INotifyPropertyChanged.PropertyChanged event

```csharp
event System.ComponentModel.PropertyChangedEventHandler System.ComponentModel.INotifyPropertyChanged.PropertyChanged;
```

Occurs when a property value changes.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupDescription` instance is cast to an `INotifyPropertyChanged` interface.
