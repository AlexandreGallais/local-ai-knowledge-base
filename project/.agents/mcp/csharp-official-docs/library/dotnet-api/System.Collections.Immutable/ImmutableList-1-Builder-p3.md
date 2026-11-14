---
title: "ImmutableList<T>+Builder class (part 3 of 3)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Collections.Immutable/ImmutableList`1+Builder.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ImmutableList<T>+Builder class (part 3 of 3)

## ImmutableList<T>+Builder.Sort(IComparer<T>) method

```csharp
public void Sort (System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the elements in the entire immutable list by using the specified comparer.

Parameters:

- `comparer`: The implementation to use when comparing elements, or `null` to use the default comparer (`Comparer<T>.Default`).

To be added.

## ImmutableList<T>+Builder.Sort(Comparison<T>) method

```csharp
public void Sort (Comparison<T> comparison);
```

Sorts the elements in the entire immutable list by using the specified comparison object.

Parameters:

- `comparison`: The object to use when comparing elements.

Exceptions:

- `ArgumentNullException`: `comparison` is `null`.

To be added.

## ImmutableList<T>+Builder.Sort(Int32, Int32, IComparer<T>) method

```csharp
public void Sort (int index, int count, System.Collections.Generic.IComparer<T>? comparer);
```

Sorts the elements in a range of elements in the immutable list  by using the specified comparer.

Parameters:

- `index`: The zero-based starting index of the range to sort.
- `count`: The length of the range to sort.
- `comparer`: The implementation to use when comparing elements, or `null` to use the default comparer (`Comparer<T>.Default`).

To be added.

## ImmutableList<T>+Builder.System.Collections.Generic.IEnumerable<T>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<T> IEnumerable<T>.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable<T>` interface.

## ImmutableList<T>+Builder.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int arrayIndex);
```

Copies the elements of the list to an array, starting at a particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the list. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `ICollection` interface.

## ImmutableList<T>+Builder.System.Collections.IEnumerable.GetEnumerator() method

```csharp
System.Collections.IEnumerator IEnumerable.GetEnumerator ();
```

Returns an enumerator that iterates through the collection.

Returns: An enumerator that can be used to iterate through the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IEnumerable` interface.

## ImmutableList<T>+Builder.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds an item to the list.

Parameters:

- `value`: The object to add to the list.

Returns: The position into which the new element was inserted, or -1 to indicate that the item was not inserted into the collection.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IList` interface.

## ImmutableList<T>+Builder.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Removes all items from the list.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IList` interface.

## ImmutableList<T>+Builder.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the list contains a specific value.

Parameters:

- `value`: The object to locate in the list.

Returns: `true` if the `Object` is found in the list; otherwise, `false`.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IList` interface.

## ImmutableList<T>+Builder.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific item in the list.

Parameters:

- `value`: The object to locate in the list.

Returns: The index of `value` if found in the list; otherwise, -1.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IList` interface.

## ImmutableList<T>+Builder.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts an item to the list at the specified index.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The object to insert into the list.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IList` interface.

## ImmutableList<T>+Builder.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes the first occurrence of a specific object from the list.

Parameters:

- `value`: The object to remove from the list.

#### Remarks
This member is an explicit interface member implementation. It can be used only when the `Builder` instance is cast to an `IList` interface.

## ImmutableList<T>+Builder.ToImmutable() method

```csharp
public System.Collections.Immutable.ImmutableList<T> ToImmutable ();
```

Creates an immutable list based on the contents of this instance.

Returns: An immutable list.

#### Remarks
This method is an O(n) operation and approaches O(log n) time as the number of actual mutations to the set since the last call to this method approaches 0.

## ImmutableList<T>+Builder.TrueForAll(Predicate<T>) method

```csharp
public bool TrueForAll (Predicate<T> match);
```

Determines whether every element in the immutable list matches the conditions defined by the specified predicate.

Parameters:

- `match`: The delegate that defines the conditions to check against the elements.

Returns: `true` if every element in the immutable list matches the conditions defined by the specified predicate; otherwise, `false`. If the list has no elements, the return value is `true`.

To be added.
