---
title: "CounterCreationDataCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/CounterCreationDataCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CounterCreationDataCollection class

Namespace: `System.Diagnostics`

```csharp
public class CounterCreationDataCollection : System.Collections.CollectionBase
```

Provides a strongly typed collection of `CounterCreationData` objects.

#### Examples
The following example demonstrates how to use the `CounterCreationDataCollection` class. The example creates a new instance of the class and uses several methods to add statements to the collection, return their index, and add or remove attributes at a specific index point.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterCreationDataCollection.CounterCreationDataCollection() constructor

```csharp
public CounterCreationDataCollection ();
```

Initializes a new instance of the `CounterCreationDataCollection` class, with no associated `CounterCreationData` instances.

To be added.

## CounterCreationDataCollection.CounterCreationDataCollection(CounterCreationData[]) constructor

```csharp
public CounterCreationDataCollection (System.Diagnostics.CounterCreationData[] value);
```

Initializes a new instance of the `CounterCreationDataCollection` class by using the specified array of `CounterCreationData` instances.

Parameters:

- `value`: An array of `CounterCreationData` instances with which to initialize this `CounterCreationDataCollection`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Examples
The following example demonstrates how to create a `CounterCreationDataCollection` object by using a `CounterCreationData` array.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationDataCollection/.ctor/countercreationdatacollection_ctor.cs._

## CounterCreationDataCollection.CounterCreationDataCollection(CounterCreationDataCollection) constructor

```csharp
public CounterCreationDataCollection (System.Diagnostics.CounterCreationDataCollection value);
```

Initializes a new instance of the `CounterCreationDataCollection` class by using the specified collection of `CounterCreationData` instances.

Parameters:

- `value`: A `CounterCreationDataCollection` that holds `CounterCreationData` instances with which to initialize this `CounterCreationDataCollection`.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Examples
The following example demonstrates how to create a `CounterCreationDataCollection` object by using `CounterCreationData` objects from another `CounterCreationDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationDataCollection/.ctor/countercreationdatacollection_ctor_countercreationdatacollection.cs._

## CounterCreationDataCollection.Item property

```csharp
public System.Diagnostics.CounterCreationData this[int index] { get; set; }
```

Indexes the `CounterCreationData` collection.

Parameters:

- `index`: An index into the `CounterCreationDataCollection`.

Returns: The collection index, which is used to access individual elements of the collection.

Exceptions:

- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is equal to or greater than the number of items in the collection.

To be added.

## CounterCreationDataCollection.Add(CounterCreationData) method

```csharp
public int Add (System.Diagnostics.CounterCreationData value);
```

Adds an instance of the `CounterCreationData` class to the collection.

Parameters:

- `value`: A `CounterCreationData` object to append to the existing collection.

Returns: The index of the new `CounterCreationData` object.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` is not a `CounterCreationData` object.

#### Examples
The following example demonstrates how to use the `CounterCreationDataCollection.Add` method to add a `CounterCreationData` object to a `CounterCreationDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationData/Overview/averagecount32.cs._

## CounterCreationDataCollection.AddRange(CounterCreationData[]) method

```csharp
public void AddRange (System.Diagnostics.CounterCreationData[] value);
```

Adds the specified array of `CounterCreationData` instances to the collection.

Parameters:

- `value`: An array of `CounterCreationData` instances to append to the existing collection.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## CounterCreationDataCollection.AddRange(CounterCreationDataCollection) method

```csharp
public void AddRange (System.Diagnostics.CounterCreationDataCollection value);
```

Adds the specified collection of `CounterCreationData` instances to the collection.

Parameters:

- `value`: A collection of `CounterCreationData` instances to append to the existing collection.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

#### Examples
The following example demonstrates how to use the `AddRange` method overload to add `CounterCreationData` objects from one `CounterCreationDataCollection` to another `CounterCreationDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationDataCollection/AddRange/countercreationdatacollection_addrange.cs._

## CounterCreationDataCollection.Contains(CounterCreationData) method

```csharp
public bool Contains (System.Diagnostics.CounterCreationData value);
```

Determines whether a `CounterCreationData` instance exists in the collection.

Parameters:

- `value`: The `CounterCreationData` object to find in the collection.

Returns: `true` if the specified `CounterCreationData` object exists in the collection; otherwise, `false`.

#### Examples
The following example demonstrates how to use the `CounterCreationDataCollection.Contains` method to find a `CounterCreationData` object in a `CounterCreationDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationDataCollection/Contains/countercreationdatacollection_contains.cs._

## CounterCreationDataCollection.CopyTo(CounterCreationData[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.CounterCreationData[] array, int index);
```

Copies the elements of the `CounterCreationData` to an array, starting at the specified index of the array.

Parameters:

- `array`: An array of `CounterCreationData` instances to add to the collection.
- `index`: The location at which to add the new instances.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `index` is less than 0.
- `ArgumentException`: The number of elements in the `CounterCreationDataCollection` is greater than the available space from `index` to the end of the destination array.

To be added.

## CounterCreationDataCollection.IndexOf(CounterCreationData) method

```csharp
public int IndexOf (System.Diagnostics.CounterCreationData value);
```

Returns the index of a `CounterCreationData` object in the collection.

Parameters:

- `value`: The `CounterCreationData` object to locate in the collection.

Returns: The zero-based index of the specified `CounterCreationData`, if it is found, in the collection; otherwise, -1.

#### Examples
The following example retrieves `CounterCreationData` entries from a `CounterCreationDataCollection` and uses the `CounterCreationDataCollection.IndexOf` method to display their names and indexes.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationDataCollection/IndexOf/countercreationdatacollection_insert_indexof.cs._

## CounterCreationDataCollection.Insert(Int32, CounterCreationData) method

```csharp
public void Insert (int index, System.Diagnostics.CounterCreationData value);
```

Inserts a `CounterCreationData` object into the collection, at the specified index.

Parameters:

- `index`: The zero-based index of the location at which the `CounterCreationData` is to be inserted.
- `value`: The `CounterCreationData` to insert into the collection.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` is not a `CounterCreationData` object.
- `ArgumentOutOfRangeException`: `index` is less than 0.

-or-

`index` is greater than the number of items in the collection.

#### Examples
The following example demonstrates how to use the `CounterCreationDataCollection.Insert` method to insert a `CounterCreationData` object into a `CounterCreationDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationDataCollection/IndexOf/countercreationdatacollection_insert_indexof.cs._

## CounterCreationDataCollection.OnValidate(Object) method

```csharp
protected override void OnValidate (object value);
```

Checks the specified object to determine whether it is a valid `CounterCreationData` type.

Parameters:

- `value`: The object that will be validated.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` is not a `CounterCreationData` object.

#### Remarks
The `CounterCreationDataCollection.OnValidate` method determines whether the object specified in the `value` parameter is a `CounterCreationData` instance. If not, it throws an `ArgumentException`.

## CounterCreationDataCollection.Remove(CounterCreationData) method

```csharp
public virtual void Remove (System.Diagnostics.CounterCreationData value);
```

Removes a `CounterCreationData` object from the collection.

Parameters:

- `value`: The `CounterCreationData` to remove from the collection.

Exceptions:

- `ArgumentNullException`: `value` is `null`.
- `ArgumentException`: `value` is not a `CounterCreationData` object.

-or-

`value` does not exist in the collection.

#### Examples
The following example demonstrates how to use the `CounterCreationDataCollection.Remove` method to delete a `CounterCreationData` object from the `CounterCreationDataCollection`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/CounterCreationDataCollection/Contains/countercreationdatacollection_contains.cs._
