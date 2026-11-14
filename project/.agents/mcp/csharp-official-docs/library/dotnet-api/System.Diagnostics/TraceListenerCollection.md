---
title: "TraceListenerCollection class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Diagnostics/TraceListenerCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TraceListenerCollection class

Namespace: `System.Diagnostics`

```csharp
public class TraceListenerCollection : System.Collections.IList
```

Provides a thread-safe list of `TraceListener` objects.

#### Remarks
The `TraceListenerCollection` list is used to specify the output listeners for the `Trace.Listeners` and the `Debug.Listeners` collections. You cannot create an instance of this class.

This list is thread-safe, however the methods used to access the list and the enumerator do not take synchronization locks. Instead, the collection is copied, the copy is modified, and a reference is set to the copy of the collection. Methods like `TraceListenerCollection.Add`, `TraceListenerCollection.Remove`, and `TraceListenerCollection.Clear` modify the elements in the collection.

The `TraceListenerCollection` class provides the `Count` property for information about the list. It also provides the following methods: `TraceListenerCollection.Contains`, `TraceListenerCollection.GetEnumerator`, `TraceListenerCollection.IndexOf`.

This class also provides the following methods to modify the list: `TraceListenerCollection.Add`, `TraceListenerCollection.Clear`, `TraceListenerCollection.Insert`, and `TraceListenerCollection.Remove`. The `TraceListenerCollection.CopyTo` method copies a part of the list to an array. The `TraceListenerCollection.RemoveAt` method deletes the list member at a specified index number.

#### Examples
The following example creates a `ConsoleTraceListener` that writes to the console screen. The code then adds the new listener to the `Trace.Listeners`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/Trace/Listeners/source.cs._

## TraceListenerCollection.Count property

```csharp
public int Count { get; }
```

Gets the number of listeners in the list.

Returns: The number of listeners in the list.

To be added.

## TraceListenerCollection.Item property

```csharp
public System.Diagnostics.TraceListener this[int i] { get; set; }
```

Gets or sets the `TraceListener` at the specified index.

Parameters:

- `i`: The zero-based index of the `TraceListener` to get from the list.

Returns: A `TraceListener` with the specified index.

Exceptions:

- `ArgumentNullException`: The value is `null`.

#### Remarks
The index is zero-based. Therefore, you must subtract one from the numerical position of a particular `TraceListener` to access that `TraceListener`. For example, to get the third `TraceListener`, you need to specify `myTraceListenerColl[2]`.

## TraceListenerCollection.Item property

```csharp
public System.Diagnostics.TraceListener? this[string name] { get; }
```

Gets the first `TraceListener` in the list with the specified name.

Parameters:

- `name`: The name of the `TraceListener` to get from the list.

Returns: The first `TraceListener` in the list with the given `TraceListener.Name`. This item returns `null` if no `TraceListener` with the given name can be found.

#### Remarks
The `TraceListenerCollection.Item` property is case-sensitive when searching for names. That is, if two listeners exist with the names "Lname" and "lname", `TraceListenerCollection.Item` property will find only the `TraceListener` with the `TraceListener.Name` that you specify, not both.

## TraceListenerCollection.System.Collections.ICollection.IsSynchronized property

```csharp
bool System.Collections.ICollection.IsSynchronized { get; }
```

Gets a value indicating whether access to the `TraceListenerCollection` is synchronized (thread safe).

Returns: Always `true`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `TraceListenerCollection` instance is cast to an `ICollection` interface.

## TraceListenerCollection.System.Collections.ICollection.SyncRoot property

```csharp
object System.Collections.ICollection.SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the `TraceListenerCollection`.

Returns: The current `TraceListenerCollection` object.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `TraceListenerCollection` instance is cast to an `ICollection` interface.

## TraceListenerCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the `TraceListenerCollection` has a fixed size.

Returns: Always `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `TraceListenerCollection` instance is cast to an `IList` interface.

## TraceListenerCollection.System.Collections.IList.IsReadOnly property

```csharp
bool System.Collections.IList.IsReadOnly { get; }
```

Gets a value indicating whether the `TraceListenerCollection` is read-only.

Returns: Always `false`.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `TraceListenerCollection` instance is cast to an `IList` interface.

## TraceListenerCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets or sets the `TraceListener` at the specified index in the `TraceListenerCollection`.

Parameters:

- `index`: The zero-based index of the value to get.

Returns: The `TraceListener` at the specified index.

#### Remarks
Use the `TraceListenerCollection.Item` property or the indexer of the `TraceListenerCollection` class to get or set a `TraceListener` in the collection.

## TraceListenerCollection.Add(TraceListener) method

```csharp
public int Add (System.Diagnostics.TraceListener listener);
```

Adds a `TraceListener` to the list.

Parameters:

- `listener`: A `TraceListener` to add to the list.

Returns: The position at which the new listener was inserted.

#### Examples
The following example creates a `TextWriterTraceListener` that outputs to the console screen. The code then adds the new listener to the `Trace.Listeners`.

_Code sample not included: ~/snippets/csharp/System.Diagnostics/TraceListenerCollection/Add/source.cs._

## TraceListenerCollection.AddRange(TraceListener[]) method

```csharp
public void AddRange (System.Diagnostics.TraceListener[] value);
```

Adds an array of `TraceListener` objects to the list.

Parameters:

- `value`: An array of `TraceListener` objects to add to the list.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## TraceListenerCollection.AddRange(TraceListenerCollection) method

```csharp
public void AddRange (System.Diagnostics.TraceListenerCollection value);
```

Adds the contents of another `TraceListenerCollection` to the list.

Parameters:

- `value`: Another `TraceListenerCollection` whose contents are added to the list.

Exceptions:

- `ArgumentNullException`: `value` is `null`.

To be added.

## TraceListenerCollection.Clear() method

```csharp
public void Clear ();
```

Clears all the listeners from the list.

To be added.

## TraceListenerCollection.Contains(TraceListener) method

```csharp
public bool Contains (System.Diagnostics.TraceListener? listener);
```

Checks whether the list contains the specified listener.

Parameters:

- `listener`: A `TraceListener` to find in the list.

Returns: `true` if the listener is in the list; otherwise, `false`.

#### Remarks
The `TraceListenerCollection.Contains` method can confirm the existence of a `TraceListener` before you perform further operations.

## TraceListenerCollection.CopyTo(TraceListener[], Int32) method

```csharp
public void CopyTo (System.Diagnostics.TraceListener[] listeners, int index);
```

Copies a section of the current `TraceListenerCollection` list to the specified array at the specified index.

Parameters:

- `listeners`: An array of type `Array` to copy the elements into.
- `index`: The starting index number in the current list to copy from.

To be added.

## TraceListenerCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Gets an enumerator for this list.

Returns: An enumerator of type `IEnumerator`.

To be added.

## TraceListenerCollection.IndexOf(TraceListener) method

```csharp
public int IndexOf (System.Diagnostics.TraceListener? listener);
```

Gets the index of the specified listener.

Parameters:

- `listener`: A `TraceListener` to find in the list.

Returns: The index of the listener, if it can be found in the list; otherwise, -1.

To be added.

## TraceListenerCollection.Insert(Int32, TraceListener) method

```csharp
public void Insert (int index, System.Diagnostics.TraceListener listener);
```

Inserts the listener at the specified index.

Parameters:

- `index`: The position in the list to insert the new `TraceListener`.
- `listener`: A `TraceListener` to insert in the list.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` is not a valid index in the list.
- `ArgumentException`: `listener` is `null`.

#### Remarks
If the index equals the number of items in the list, then the listener is appended to the end of the list.

The index is zero-based. Therefore, if you want to insert the listener into the third position, you must call `myTraceListenerColl.Insert(2, myNewListener)`.

## TraceListenerCollection.Remove(TraceListener) method

```csharp
public void Remove (System.Diagnostics.TraceListener? listener);
```

Removes from the collection the specified `TraceListener`.

Parameters:

- `listener`: A `TraceListener` to remove from the list.

To be added.

## TraceListenerCollection.Remove(String) method

```csharp
public void Remove (string name);
```

Removes from the collection the first `TraceListener` with the specified name.

Parameters:

- `name`: The name of the `TraceListener` to remove from the list.

#### Remarks
The `name` parameter is case-sensitive. That is, if two listeners exist with the names "Rname" and "rname", the `TraceListenerCollection.Remove` method will find the specific listener you name.

## TraceListenerCollection.RemoveAt(Int32) method

```csharp
public void RemoveAt (int index);
```

Removes from the collection the `TraceListener` at the specified index.

Parameters:

- `index`: The zero-based index of the `TraceListener` to remove from the list.

Exceptions:

- `ArgumentOutOfRangeException`: The `index` is not a valid index in the list.

#### Remarks
The index is zero-based. Therefore, you must subtract one from the numerical position of a particular `TraceListener` to delete that `TraceListener`. For example, to remove the third `TraceListener`, you need to specify `myTraceListenerColl.RemoveAt(2)`.

## TraceListenerCollection.System.Collections.ICollection.CopyTo(Array, Int32) method

```csharp
void ICollection.CopyTo (Array array, int index);
```

Copies a section of the current `TraceListenerCollection` to the specified array of `TraceListener` objects.

Parameters:

- `array`: The one-dimensional array of `TraceListener` objects that is the destination of the elements copied from the `TraceListenerCollection`. The array must have zero-based indexing.
- `index`: The zero-based index in `array` at which copying begins.

#### Remarks
Use the `TraceListenerCollection.CopyTo` method of the `TraceListenerCollection` class to copy all or part of the collection to an array.

## TraceListenerCollection.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Adds a trace listener to the `TraceListenerCollection`.

Parameters:

- `value`: The object to add to the `TraceListenerCollection`.

Returns: The position into which the new trace listener was inserted.

Exceptions:

- `ArgumentException`: `value` is `null`.

-or-

`value` is not a `TraceListener`.

#### Remarks
Use the `TraceListenerCollection.Add` method to add a new trace listener to the collection.

## TraceListenerCollection.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the `TraceListenerCollection` contains a specific object.

Parameters:

- `value`: The object to locate in the `TraceListenerCollection`.

Returns: `true` if the `Object` is found in the `TraceListenerCollection`; otherwise, `false`.

#### Remarks
Use the `TraceListenerCollection.Contains` method of the `TraceListenerCollection` class to determine whether the collection contains a specific `TraceListener` object.

## TraceListenerCollection.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific object in the `TraceListenerCollection`.

Parameters:

- `value`: The object to locate in the `TraceListenerCollection`.

Returns: The index of `value` if found in the `TraceListenerCollection`; otherwise, -1.

#### Remarks
Use the `TraceListenerCollection.IndexOf` method of the `TraceListenerCollection` class to determine the index of a `TraceListener` object in the collection.

## TraceListenerCollection.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Inserts a `TraceListener` object at the specified position in the `TraceListenerCollection`.

Parameters:

- `index`: The zero-based index at which `value` should be inserted.
- `value`: The `TraceListener` object to insert into the `TraceListenerCollection`.

Exceptions:

- `ArgumentException`: `value` is not a `TraceListener` object.

#### Remarks
Use the `TraceListenerCollection.Insert` method of the `TraceListenerCollection` class to insert a `TraceListener` object into the collection.

## TraceListenerCollection.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Removes an object from the `TraceListenerCollection`.

Parameters:

- `value`: The object to remove from the `TraceListenerCollection`.

#### Remarks
Use the `TraceListenerCollection.Remove` method of the `TraceListenerCollection` class to remove a `TraceListener` from the collection.
