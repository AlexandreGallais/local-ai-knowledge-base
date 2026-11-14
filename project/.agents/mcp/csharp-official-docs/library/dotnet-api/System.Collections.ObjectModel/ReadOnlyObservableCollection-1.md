---
title: "ReadOnlyObservableCollection<T> class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.ObjectModel/ReadOnlyObservableCollection`1.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ReadOnlyObservableCollection<T> class

Namespace: `System.Collections.ObjectModel`

```csharp
public class ReadOnlyObservableCollection<T> : System.Collections.ObjectModel.ReadOnlyCollection<T>, System.Collections.Specialized.INotifyCollectionChanged, System.ComponentModel.INotifyPropertyChanged
```

Represents a read-only `ObservableCollection<T>`.

Parameters:

- `T`: The type of elements in the collection.

#### Remarks
This class is a read-only wrapper around an `ObservableCollection<T>`. If changes are made to the underlying collection, the `ReadOnlyObservableCollection<T>` reflects those changes. To be notified of the changes to this class, subscribe to the `CollectionChanged` or `PropertyChanged` event.

## ReadOnlyObservableCollection<T>.ReadOnlyObservableCollection(ObservableCollection<T>) constructor

```csharp
public ReadOnlyObservableCollection (System.Collections.ObjectModel.ObservableCollection<T> list);
```

Initializes a new instance of the `ReadOnlyObservableCollection<T>` class that serves as a wrapper around the specified `ObservableCollection<T>`.

Parameters:

- `list`: The `ObservableCollection<T>` with which to create this instance of the `ReadOnlyObservableCollection<T>` class.

Exceptions:

- `ArgumentNullException`: `list` is `null`.

To be added.

## ReadOnlyObservableCollection<T>.Empty property

```csharp
public static System.Collections.ObjectModel.ReadOnlyObservableCollection<T> Empty { get; }
```

Gets an empty `ReadOnlyObservableCollection<T>`.

Returns: An empty `ReadOnlyObservableCollection<T>`.

The returned instance is immutable and will always be empty.

## ReadOnlyObservableCollection<T>.OnCollectionChanged(NotifyCollectionChangedEventArgs) method

```csharp
protected virtual void OnCollectionChanged (System.Collections.Specialized.NotifyCollectionChangedEventArgs args);
```

Raises the `ReadOnlyObservableCollection<T>.CollectionChanged` event using the provided arguments.

Parameters:

- `args`: Arguments of the event being raised.

To be added.

## ReadOnlyObservableCollection<T>.OnPropertyChanged(PropertyChangedEventArgs) method

```csharp
protected virtual void OnPropertyChanged (System.ComponentModel.PropertyChangedEventArgs args);
```

Raises the `ReadOnlyObservableCollection<T>.PropertyChanged` event using the provided arguments.

Parameters:

- `args`: Arguments of the event being raised.

To be added.

## ReadOnlyObservableCollection<T>.CollectionChanged event

```csharp
protected virtual event System.Collections.Specialized.NotifyCollectionChangedEventHandler? CollectionChanged;
```

Occurs when an item is added or removed.

#### Remarks
For more information, see `CollectionChanged`.

## ReadOnlyObservableCollection<T>.PropertyChanged event

```csharp
protected virtual event System.ComponentModel.PropertyChangedEventHandler? PropertyChanged;
```

Occurs when a property value changes.

#### Remarks
For more information, see `PropertyChanged`.

## ReadOnlyObservableCollection<T>.System.Collections.Specialized.INotifyCollectionChanged.CollectionChanged event

```csharp
event System.Collections.Specialized.NotifyCollectionChangedEventHandler? System.Collections.Specialized.INotifyCollectionChanged.CollectionChanged;
```

Occurs when the collection changes.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyObservableCollection<T>` instance is cast to an `INotifyCollectionChanged` interface.

## ReadOnlyObservableCollection<T>.System.ComponentModel.INotifyPropertyChanged.PropertyChanged event

```csharp
event System.ComponentModel.PropertyChangedEventHandler? System.ComponentModel.INotifyPropertyChanged.PropertyChanged;
```

Occurs when a property value changes.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `ReadOnlyObservableCollection<T>` instance is cast to an `INotifyPropertyChanged` interface.
