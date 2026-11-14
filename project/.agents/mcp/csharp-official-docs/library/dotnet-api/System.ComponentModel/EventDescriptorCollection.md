---
title: "EventDescriptorCollection class (part 1 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/EventDescriptorCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EventDescriptorCollection class

Namespace: `System.ComponentModel`

```csharp
public class EventDescriptorCollection : System.Collections.IList
```

Represents a collection of `EventDescriptor` objects.

#### Remarks
`EventDescriptorCollection` is read-only; it does not implement methods that add or remove events. You must inherit from this class to implement these methods.

Using the properties available in the `EventDescriptorCollection` class, you can query the collection about its contents. Use the `Count` property to determine the number of elements in the collection. Use the `EventDescriptorCollection.Item` property to get a specific property by index number or by name.

You can also use the `EventDescriptorCollection.Find` method to get a description of the event with the specified name from the collection.

#### Examples
The following code example prints all the events on a button in a text box. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Overview/source.cs._

## EventDescriptorCollection.EventDescriptorCollection(EventDescriptor[]) constructor

```csharp
public EventDescriptorCollection (System.ComponentModel.EventDescriptor[]? events);
```

Initializes a new instance of the `EventDescriptorCollection` class with the given array of `EventDescriptor` objects.

Parameters:

- `events`: An array of type `EventDescriptor` that provides the events for this collection.

#### Remarks
If the `events` parameter is empty, this constructor creates an empty `EventDescriptorCollection` class.

The `HostProtectionAttribute` attribute applied to this member has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example creates a new `EventDescriptorCollection` class using the events on `button1`. It requires that `button1` has been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/.ctor/source.cs._

## EventDescriptorCollection.EventDescriptorCollection(EventDescriptor[], Boolean) constructor

```csharp
public EventDescriptorCollection (System.ComponentModel.EventDescriptor[]? events, bool readOnly);
```

Initializes a new instance of the `EventDescriptorCollection` class with the given array of `EventDescriptor` objects. The collection is optionally read-only.

Parameters:

- `events`: An array of type `EventDescriptor` that provides the events for this collection.
- `readOnly`: `true` to specify a read-only collection; otherwise, `false`.

#### Remarks
If the `events` parameter is empty, this constructor creates an empty `EventDescriptorCollection` class.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example creates a new `EventDescriptorCollection` class using the events on `button1`. It requires that `button1` has been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/.ctor/source.cs._

## EventDescriptorCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of event descriptors in the collection.

Returns: The number of event descriptors in the collection.

#### Remarks
The `Count` property can be used to set the limits of a loop that iterates through a collection of objects. If the collection is zero-based, be sure to use `Count - 1` as the upper boundary of the loop.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example uses the `Count` property to print the number of events attached to `button1`. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Count/source.cs._

## EventDescriptorCollection.Item property

```csharp
public virtual System.ComponentModel.EventDescriptor? this[int index] { get; }
```

Gets or sets the event with the specified index number.

Parameters:

- `index`: The zero-based index number of the `EventDescriptor` to get or set.

Returns: The `EventDescriptor` with the specified index number.

Exceptions:

- `IndexOutOfRangeException`: `index` is not a valid index for `EventDescriptorCollection.Item`.

#### Remarks
The index number is zero-based. Therefore, you must subtract 1 from the numerical position of a particular `EventDescriptor` to access that `EventDescriptor`. For example, to get the third `EventDescriptor`, you need to specify `myColl[2]`.

#### Examples
The following code example uses the `EventDescriptorCollection.Item` property to print the name of the `EventDescriptor` specified by the index number in a text box. Because the index number is zero-based, this example prints the name of the second `EventDescriptor`. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Item/source.cs._

## EventDescriptorCollection.Item property

```csharp
public virtual System.ComponentModel.EventDescriptor this[string name] { get; }
```

Gets or sets the event with the specified name.

Parameters:

- `name`: The name of the `EventDescriptor` to get or set.

Returns: The `EventDescriptor` with the specified name, or `null` if the event does not exist.

#### Remarks
The `EventDescriptorCollection.Item` property is case-sensitive when searching for names. That is, the names "Ename" and "ename" are considered to be two different events.

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

#### Examples
The following code example uses the `EventDescriptorCollection.Item` property to print the type of the component for the `EventDescriptor` specified by the index. It requires that `button1` and `textBox1` have been instantiated on a form.

_Code sample not included: ~/snippets/csharp/System.ComponentModel/EventDescriptorCollection/Item/source1.cs._

## EventDescriptorCollection.System.Collections.ICollection.Count property

```csharp
int System.Collections.ICollection.Count { get; }
```

Gets the number of elements contained in the collection.

Returns: The number of elements contained in the collection.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the collection is synchronized.

Returns: `true` if access to the collection is synchronized; otherwise, `false`.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the collection.

Returns: An object that can be used to synchronize access to the collection.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the collection has a fixed size.

Returns: `true` if the collection has a fixed size; otherwise, `false`.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the collection is read-only.

Returns: `true` if the collection is read-only; otherwise, `false`.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

Exceptions:

- `NotSupportedException`: The collection is read-only.
- `IndexOutOfRangeException`: `index` is less than 0.

-or-

`index` is equal to or greater than `EventDescriptorCollection.Count`.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.Add(EventDescriptor) method

```csharp
public int Add (System.ComponentModel.EventDescriptor? value);
```

Adds an `EventDescriptor` to the end of the collection.

Parameters:

- `value`: An `EventDescriptor` to add to the collection.

Returns: The position of the `EventDescriptor` within the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.Clear() method

```csharp
public void Clear ();
```

Removes all objects from the collection.

Exceptions:

- `NotSupportedException`: The collection is read-only.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.

## EventDescriptorCollection.Contains(EventDescriptor) method

```csharp
public bool Contains (System.ComponentModel.EventDescriptor? value);
```

Returns whether the collection contains the given `EventDescriptor`.

Parameters:

- `value`: The `EventDescriptor` to find within the collection.

Returns: `true` if the collection contains the `value` parameter given; otherwise, `false`.

#### Remarks

> **Note:**
>  The `HostProtectionAttribute` attribute applied to this class has the following `Resources` property value: `Synchronization`. The `HostProtectionAttribute` does not affect desktop applications (which are typically started by double-clicking an icon, typing a command, or entering a URL in a browser). For more information, see the `HostProtectionAttribute` class or SQL Server Programming and Host Protection Attributes.
