---
title: "GroupCollection class (part 1 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/GroupCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GroupCollection class

Namespace: `System.Text.RegularExpressions`

```csharp
public class GroupCollection : System.Collections.Generic.ICollection<System.Text.RegularExpressions.Group>, System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<string,System.Text.RegularExpressions.Group>>, System.Collections.Generic.IEnumerable<System.Text.RegularExpressions.Group>, System.Collections.Generic.IList<System.Text.RegularExpressions.Group>, System.Collections.Generic.IReadOnlyCollection<System.Collections.Generic.KeyValuePair<string,System.Text.RegularExpressions.Group>>, System.Collections.Generic.IReadOnlyCollection<System.Text.RegularExpressions.Group>, System.Collections.Generic.IReadOnlyDictionary<string,System.Text.RegularExpressions.Group>, System.Collections.Generic.IReadOnlyList<System.Text.RegularExpressions.Group>, System.Collections.IList
```

Returns the set of captured groups in a single match. The collection is immutable (read-only) and
has no public constructor.

The `GroupCollection` class is a zero-based collection class that consists of one or
more `Group` objects that provide information about captured groups in a regular
expression match. The collection is immutable (read-only) and has no public constructor. A
`GroupCollection` object is returned by the `Match.Groups` property.

The collection contains one or more `Group` objects. If the match is successful, the
first element in the collection contains the `Group` object that corresponds to the
entire match. Each subsequent element represents a captured group, if the regular expression
includes capturing groups. Matches from numbered (unnamed) capturing groups appear in numeric
order before matches from named capturing groups. If the match is unsuccessful, the collection
contains a single `Group` object whose `Group.Success` property is
`false` and whose `Capture.Value` property equals
`String.Empty`.

To iterate through the members of the collection, you should use the collection iteration
construct provided by your language (such as `foreach` in C#) instead of retrieving the
enumerator that is returned by the `GroupCollection.GetEnumerator` method.

## GroupCollection.Count property

```csharp
public int Count { get; }
```

Returns the number of groups in the collection.

Returns: The number of groups in the collection.

The `GroupCollection` object always has at least one member. If a match is
unsuccessful, the `Match.Groups` property returns a
`GroupCollection` object that contains a single member.

## GroupCollection.IsReadOnly property

```csharp
public bool IsReadOnly { get; }
```

Gets a value that indicates whether the collection is read only.

Returns: `true` in all cases.

#### Remarks

A collection that is read-only does not allow the addition or removal of elements after the collection is created. Note that read-only in this context does not indicate whether individual elements of the collection can be modified, since the `ICollection<T>` interface only supports addition and removal operations. For example, the `IsReadOnly` property of an array that is cast or converted to an `ICollection<T>` object returns `true`, even though individual array elements can be modified.

## GroupCollection.IsSynchronized property

```csharp
public bool IsSynchronized { get; }
```

Gets a value that indicates whether access to the `GroupCollection` is
synchronized (thread-safe).

Returns: `false` in all cases.

To be added.

## GroupCollection.Item property

```csharp
public System.Text.RegularExpressions.Group this[int groupnum] { get; }
```

Enables access to a member of the collection by integer index.

Parameters:

- `groupnum`: The zero-based index of the collection member to be retrieved.

Returns: The member of the collection specified by `groupnum`.

This property is the indexer of the `GroupCollection`
class. It allows you to enumerate the members of the collection by using a `foreach`
statement.

You can also use this property to retrieve individual captured groups by their index number.
You can determine the number of items in the collection by retrieving the value of the
`GroupCollection.Count` property. Valid values for the `groupnum` parameter
range from 0 to one less than the number of items in the collection.

If `groupnum` is not the index of a member of the collection, or if
`groupnum` is the index of a capturing group that has not been matched in
the input string, the method returns a `Group` object whose
`Group.Success` property is `false` and whose
`Group.Value` property is `String.Empty`.

## GroupCollection.Item property

```csharp
public System.Text.RegularExpressions.Group this[string groupname] { get; }
```

Enables access to a member of the collection by string index.

Parameters:

- `groupname`: The name of a capturing group.

Returns: The member of the collection specified by `groupname`.

`groupname` can be either the name of a capturing group that is defined by
the `(?<name>)` element in a regular expression, or the string representation of
the number of a capturing group.

If `groupname` is not the name of a capturing group in the collection, or
if `groupname` is the name of a capturing group that has not been matched in
the input string, the method returns a `Group` object whose
`Group.Success` property is `false` and whose
`Group.Value` property is `String.Empty`.

## GroupCollection.Keys property

```csharp
public System.Collections.Generic.IEnumerable<string> Keys { get; }
```

Gets a string enumeration that contains the name keys of the group collection.

Returns: The name keys of the group collection.

#### Remarks

The order of the keys in the enumerable collection is unspecified, but the implementation must guarantee that the keys are in the same order as the corresponding values in the enumerable collection that is returned by the `Values` property.

## GroupCollection.SyncRoot property

```csharp
public object SyncRoot { get; }
```

Gets an object that can be used to synchronize access to the
`GroupCollection`.

Returns: A copy of the `Match` object to synchronize.

To be added.

## GroupCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Group>.Item property

```csharp
System.Text.RegularExpressions.Group System.Collections.Generic.IList<System.Text.RegularExpressions.Group>.Item[int index] { get; set; }
```

Gets the group at the specified position in the collection.

Parameters:

- `index`: The zero-based index of the group in the group collection.

Returns: The group in the desired position.

Exceptions:

- `NotSupportedException`: Cannot set an item. This is a read-only collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `IList<T>` interface.

## GroupCollection.System.Collections.IList.IsFixedSize property

```csharp
bool System.Collections.IList.IsFixedSize { get; }
```

Gets a value indicating whether the group collection has a fixed size.

Returns: `true` always.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `IList` interface.

## GroupCollection.System.Collections.IList.Item property

```csharp
object? System.Collections.IList.Item[int index] { get; set; }
```

Gets the group in the desired position.

Parameters:

- `index`: The zero-index position of the group in the group collection.

Returns: The group in the desired position.

Exceptions:

- `NotSupportedException`: Cannot set an item. This is a read-only collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `IList` interface.

## GroupCollection.Values property

```csharp
public System.Collections.Generic.IEnumerable<System.Text.RegularExpressions.Group> Values { get; }
```

Gets a group enumeration with all the groups in the group collection.

Returns: A group enumeration.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `IEnumerable<T>` interface.

## GroupCollection.ContainsKey(String) method

```csharp
public bool ContainsKey (string key);
```

Determines whether the group collection contains a captured group identified by the specified
name.

Parameters:

- `key`: A string with the name of the captured group to locate.

Returns: `true` if the group collection contains a captured group identified by
`key`; `false` otherwise.

To be added.

## GroupCollection.CopyTo(Array, Int32) method

```csharp
public void CopyTo (Array array, int arrayIndex);
```

Copies all the elements of the collection to the given array beginning at the given index.

Parameters:

- `array`: The array the collection is to be copied into.
- `arrayIndex`: The position in the destination array where copying is to begin.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `IndexOutOfRangeException`: `arrayIndex` is outside the bounds of `array`.
-or-
`arrayIndex` plus `GroupCollection.Count` is outside the bounds of
`array`.

#### Remarks
Because the entire collection is copied into the array starting at the given index, the destination array must be at least as large as the collection.

#### Examples
The following example extracts each word from a sentence and captures it in a capturing group, The `GroupCollection.CopyTo` method is then used to copy the elements in each match's `GroupCollection` object to an array that contains the capturing groups from all matches. The individual captured words are then displayed to the console.

_Code sample not included: ~/snippets/csharp/System.Text.RegularExpressions/GroupCollection/CopyTo/copyto1.cs._

The regular expression is defined as follows:

|Pattern|Description|
|-------------|-----------------|
|`\b`|Match a word boundary.|
|`(\S+?)`|Match one or more non-white space characters. Assign them to the first capturing group.|
|`\b`|Match a word boundary.|

## GroupCollection.CopyTo(Group[], Int32) method

```csharp
public void CopyTo (System.Text.RegularExpressions.Group[] array, int arrayIndex);
```

Copies the elements of the group collection to a `Group` array, starting at a
particular array index.

Parameters:

- `array`: The one-dimensional array that is the destination of the elements copied from the group
collection. The array must have zero-based indexing.
- `arrayIndex`: The zero-based index in `array` at which copying begins.

Exceptions:

- `ArgumentNullException`: `array` is `null`.
- `ArgumentOutOfRangeException`: `arrayIndex` is less than zero.
-or-
`arrayIndex` is greater than the length of `array`.
- `ArgumentException`: The length of `array` minus `arrayIndex` is less than the
group collection count.

To be added.

## GroupCollection.GetEnumerator() method

```csharp
public System.Collections.IEnumerator GetEnumerator ();
```

Provides an enumerator that iterates through the collection.

Returns: An enumerator that contains all `Group` objects in the
`GroupCollection`.

Instead of calling the `GroupCollection.GetEnumerator` method to retrieve an enumerator that lets
you iterate through the `Group` objects in the collection, you should use the
collection iteration construct provided by your programming language (such as `foreach`
in C#).

## GroupCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Group>.Add(Group) method

```csharp
void ICollection<Group>.Add (System.Text.RegularExpressions.Group item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `item`: The group to add to the collection.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Group>.Clear() method

```csharp
void ICollection<Group>.Clear ();
```

Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Group>.Contains(Group) method

```csharp
bool ICollection<Group>.Contains (System.Text.RegularExpressions.Group item);
```

Determines whether the group collection contains a specific group item.

Parameters:

- `item`: The group to locate in the group collection.

Returns: `true` if the group item is found in the group collection; `false` otherwise.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `ICollection<T>` interface.

## GroupCollection.System.Collections.Generic.ICollection<System.Text.RegularExpressions.Group>.Remove(Group) method

```csharp
bool ICollection<Group>.Remove (System.Text.RegularExpressions.Group item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `item`: The group to remove.

Returns: Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.System.Collections.Generic.IEnumerable<System.Collections.Generic.KeyValuePair<System.String,System.Text.RegularExpressions.Group>>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Collections.Generic.KeyValuePair<string,System.Text.RegularExpressions.Group>> IEnumerable<KeyValuePair<string,Group>>.GetEnumerator ();
```

Provides an enumerator that iterates through the group collection.

Returns: An enumerator that contains all names and objects in the `Group` collection.

#### Remarks

Instead of calling this method to retrieve an enumerator that lets you iterate through the `Group` objects in the collection, you should use the group iteration construct (such as `foreach` in C# and `For Each`…`Next` in Visual Basic) that is provided by your programming language.

## GroupCollection.System.Collections.Generic.IEnumerable<System.Text.RegularExpressions.Group>.GetEnumerator() method

```csharp
System.Collections.Generic.IEnumerator<System.Text.RegularExpressions.Group> IEnumerable<Group>.GetEnumerator ();
```

Provides an enumerator that iterates through the group collection.

Returns: An enumerator that contains all `Group` objects in the group collection.

#### Remarks

Instead of calling this method to retrieve an enumerator that lets you iterate through the `Group` objects in the collection, you should use the group iteration construct (such as `foreach` in C# and `For Each`…`Next` in Visual Basic) that is provided by your programming language.
