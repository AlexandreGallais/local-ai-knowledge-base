---
title: "EventDescriptorCollection class (part 2 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/EventDescriptorCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventDescriptorCollection class (part 2 of 3)

## EventDescriptorCollection.Find(String, Boolean) method

```csharp
public virtual System.ComponentModel.EventDescriptor? Find (string name, bool ignoreCase);
```

Gets the description of the event with the specified name in the collection.

Parameters:

- `name`: The name of the event to get from the collection.
- `ignoreCase`: `true` if you want to ignore the case of the event; otherwise, `false`.

Returns: The `EventDescriptor` with the specified name, or `null` if the event does not exist.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example finds a specific `EventDescriptor`. It prints the type of component for this `EventDescriptor` in a text box. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Find/source.cs._

## EventDescriptorCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Gets an enumerator for this `EventDescriptorCollection`.

Returns: An enumerator that implements `IEnumerator`.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example gets an enumerator for the events on `button1`. It uses the enumerator to print the names of the events in the collection. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/GetEnumerator/source.cs._

## EventDescriptorCollection.IndexOf(EventDescriptor) method

```csharp
public int IndexOf (System.ComponentModel.EventDescriptor? value);
```

Returns the index of the given `EventDescriptor`.

Parameters:

- `value`: The `EventDescriptor` to find within the collection.

Returns: The index of the given `EventDescriptor` within the collection.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.Insert(Int32, EventDescriptor) method

```csharp
public void Insert (int index, System.ComponentModel.EventDescriptor? value);
```

Inserts an `EventDescriptor` to the collection at a specified index.

Parameters:

- `index`: The index within the collection in which to insert the `value` parameter.
- `value`: An `EventDescriptor` to insert into the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.InternalSort(IComparer) method

```csharp
protected void InternalSort (System.Collections.IComparer? sorter);
```

Sorts the members of this `EventDescriptorCollection`, using the specified `IComparer`.

Parameters:

- `sorter`: A comparer to use to sort the `EventDescriptor` objects in this collection.

#### Remarks
If the `sorter` parameter is `null`, the default sort order is used.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.InternalSort(String[]) method

```csharp
protected void InternalSort (string[]? names);
```

Sorts the members of this `EventDescriptorCollection`. The specified order is applied first, followed by the default sort for this collection, which is usually alphabetical.

Parameters:

- `names`: An array of strings describing the order in which to sort the `EventDescriptor` objects in this collection.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example defines the sort order for the `EventDescriptorCollection.InternalSort` method. If the `EventDescriptorCollection` contains four `EventDescriptor` objects with the names `A`, `B`, `C`, and `D`, the properties of this `EventDescriptorCollection` would be sorted in the order `D`, `B`, `A`, and `C`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/InternalSort/source.cs._

## EventDescriptorCollection.Remove(EventDescriptor) method

```csharp
public void Remove (System.ComponentModel.EventDescriptor? value);
```

Removes the specified `EventDescriptor` from the collection.

Parameters:

- `value`: The `EventDescriptor` to remove from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the `EventDescriptor` at the specified index from the collection.

Parameters:

- `index`: The index of the `EventDescriptor` to remove.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.Sort() method

```csharp
public virtual System.ComponentModel.EventDescriptorCollection Sort ();
```

Sorts the members of this `EventDescriptorCollection`, using the default sort for this collection, which is usually alphabetical.

Returns: The new `EventDescriptorCollection`.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example defines the sort order for the `EventDescriptorCollection.Sort` method. If the `EventDescriptorCollection` contains four `EventDescriptor` objects with the names `A`, `B`, `C`, and `D`, the properties of `myNewColl` would be sorted in the order `D`, `B`, `A`, and `C`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Sort/source.cs._

## EventDescriptorCollection.Sort(IComparer) method

```csharp
public virtual System.ComponentModel.EventDescriptorCollection Sort (System.Collections.IComparer comparer);
```

Sorts the members of this `EventDescriptorCollection`, using the specified `IComparer`.

Parameters:

- `comparer`: An `IComparer` to use to sort the `EventDescriptor` objects in this collection.

Returns: The new `EventDescriptorCollection`.

#### Remarks
The specified `IComparer` is applied first, followed by the default sort for this collection, which is usually alphabetical.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example defines the sort order for the `EventDescriptorCollection.Sort` method. If the `EventDescriptorCollection` contains four `EventDescriptor` objects with the names `A`, `B`, `C`, and `D`, the properties of `myNewColl` would be sorted in the order `D`, `B`, `A`, and `C`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Sort/source.cs._

## EventDescriptorCollection.Sort(String[]) method

```csharp
public virtual System.ComponentModel.EventDescriptorCollection Sort (string[] names);
```

Sorts the members of this `EventDescriptorCollection`, given a specified sort order.

Parameters:

- `names`: An array of strings describing the order in which to sort the `EventDescriptor` objects in the collection.

Returns: The new `EventDescriptorCollection`.

#### Remarks
The specified order is applied first, followed by the default sort for this collection, which is usually alphabetical.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example defines the sort order for the `EventDescriptorCollection.Sort` method. If the `EventDescriptorCollection` contains four `EventDescriptor` objects with the names `A`, `B`, `C`, and `D`, the properties of `myNewColl` would be sorted in the order `D`, `B`, `A`, and `C`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Sort/source.cs._

## EventDescriptorCollection.Sort(String[], IComparer) method

```csharp
public virtual System.ComponentModel.EventDescriptorCollection Sort (string[] names, System.Collections.IComparer comparer);
```

Sorts the members of this `EventDescriptorCollection`, given a specified sort order and an `IComparer`.

Parameters:

- `names`: An array of strings describing the order in which to sort the `EventDescriptor` objects in the collection.
- `comparer`: An `IComparer` to use to sort the `EventDescriptor` objects in this collection.

Returns: The new `EventDescriptorCollection`.

#### Remarks
The specified sort order is applied first, followed by the sort using the specified `IComparer`.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example defines the sort order for the `EventDescriptorCollection.Sort` method. If the `EventDescriptorCollection` contains four `EventDescriptor` objects with the names `A`, `B`, `C`, and `D`, the properties of `myNewColl` would be sorted in the order `D`, `B`, `A`, and `C`.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Sort/source.cs._

## EventDescriptorCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array? array, int index);
```

Copies the elements of the collection to an `Array`, starting at a particular `Array` index.

Parameters:

- `array`: The one-dimensional `Array` that is the destination of the elements copied from collection. The `Array` must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.
