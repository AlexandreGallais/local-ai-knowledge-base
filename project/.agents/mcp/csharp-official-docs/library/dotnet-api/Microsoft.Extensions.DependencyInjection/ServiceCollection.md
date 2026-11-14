---
title: "ServiceCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/Microsoft.Extensions.DependencyInjection/ServiceCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ServiceCollection class

Namespace: `Microsoft.Extensions.DependencyInjection`

```csharp
public class ServiceCollection : Microsoft.Extensions.DependencyInjection.IServiceCollection, System.Collections.Generic.ICollection<Microsoft.Extensions.DependencyInjection.ServiceDescriptor>, System.Collections.Generic.IEnumerable<Microsoft.Extensions.DependencyInjection.ServiceDescriptor>, System.Collections.Generic.IList<Microsoft.Extensions.DependencyInjection.ServiceDescriptor>
```

Default implementation of `IServiceCollection`.

To be added.

## ServiceCollection.ServiceCollection() constructor

```csharp
public ServiceCollection ();
```

Initializes a new instance of the `ServiceCollection` class.

To be added.

## ServiceCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of elements contained in the .

Returns: The number of elements contained in the <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.ICollection`1"></xref>.

To be added.

## ServiceCollection.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value indicating whether the  is read-only.

Returns: ```csharp
true
```
if the <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.ICollection`1"></xref> is read-only; otherwise, 
```csharp
false
```
.

To be added.

## ServiceCollection.Item property

```csharp
public Microsoft.Extensions.DependencyInjection.ServiceDescriptor this[int index] { get; set; }
```

Gets or sets the element at the specified index.

Parameters:

- `index`: The zero-based index of the element to get or set.

Returns: The element at the specified index.

To be added.

## ServiceCollection.Clear() method

```csharp
public void Clear ();
```

Removes all items from the .

To be added.

## ServiceCollection.Contains(ServiceDescriptor) method

```csharp
public bool Contains (Microsoft.Extensions.DependencyInjection.ServiceDescriptor item);
```

Determines whether the  contains a specific value.

Parameters:

- `item`: The object to locate in the <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.ICollection`1"></xref>.

Returns: ```csharp
true
```
if 
```csharp
item
```
is found in the <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.ICollection`1"></xref>; otherwise,
```csharp
false
```
.

To be added.

## ServiceCollection.CopyTo(ServiceDescriptor[], Int32) method

```csharp
public void CopyTo (Microsoft.Extensions.DependencyInjection.ServiceDescriptor[] array, int arrayIndex);
```

Copies the elements of the  to an , starting at a particular  index.

Parameters:

- `array`: The one-dimensional <xref data-throw-if-not-resolved="true" uid="System.Array"></xref> that is the destination of the elements copied from <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.ICollection`1"></xref>. The <xref data-throw-if-not-resolved="true" uid="System.Array"></xref> must have zero-based indexing.
- `arrayIndex`: The zero-based index in
```csharp
array
```
at which copying begins.

To be added.

## ServiceCollection.GetEnumerator() method

```csharp
public System.Collections.Generic.IEnumerator<Microsoft.Extensions.DependencyInjection.ServiceDescriptor> GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

To be added.

## ServiceCollection.IndexOf(ServiceDescriptor) method

```csharp
public int IndexOf (Microsoft.Extensions.DependencyInjection.ServiceDescriptor item);
```

Determines the index of a specific item in the .

Parameters:

- `item`: The object to locate in the <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.IList`1"></xref>.

Returns: The index of
```csharp
item
```
if found in the list; otherwise, -1.

To be added.

## ServiceCollection.Insert(Int32, ServiceDescriptor) method

```csharp
public void Insert (int index, Microsoft.Extensions.DependencyInjection.ServiceDescriptor item);
```

Inserts an item to the  at the specified index.

Parameters:

- `index`: The zero-based index at which
```csharp
item
```
should be inserted.
- `item`: The object to insert into the <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.IList`1"></xref>.

To be added.

## ServiceCollection.MakeReadOnly() method

```csharp
public void MakeReadOnly ();
```

Makes this collection read-only.

After the collection is marked as read-only, any further attempt to modify it throws an `InvalidOperationException`.

## ServiceCollection.Remove(ServiceDescriptor) method

```csharp
public bool Remove (Microsoft.Extensions.DependencyInjection.ServiceDescriptor item);
```

Removes the first occurrence of a specific object from the .

Parameters:

- `item`: The object to remove from the <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.ICollection`1"></xref>.

Returns: ```csharp
true
```
if 
```csharp
item
```
was successfully removed from the <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.ICollection`1"></xref>; otherwise,
```csharp
false
```
. This method also returns
```csharp
false
```
if
```csharp
item
```
is not found in the original <xref data-throw-if-not-resolved="true" uid="System.Collections.Generic.ICollection`1"></xref>.

To be added.

## ServiceCollection.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes the  item at the specified index.

Parameters:

- `index`: The zero-based index of the item to remove.

To be added.

## ServiceCollection.System.Collections.Generic.ICollection<Microsoft.Extensions.DependencyInjection.ServiceDescriptor>.Add(ServiceDescriptor) method

```csharp
void ICollection<ServiceDescriptor>.Add (Microsoft.Extensions.DependencyInjection.ServiceDescriptor item);
```

Adds an item to the `ICollection<T>`.

Parameters:

- `item`: The object to add to the `ICollection<T>`.

To be added.

## ServiceCollection.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through a collection.

Returns: An `IEnumerator` object that can be used to iterate through the collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `ServiceCollection` instance is cast to an `IEnumerable` interface.
