---
title: "GroupCollection class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Text.RegularExpressions/GroupCollection.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# GroupCollection class (part 2 of 2)

## GroupCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Group>.IndexOf(Group) method

```csharp
int IList<Group>.IndexOf (System.Text.RegularExpressions.Group item);
```

Determines the index of a specific group in the group collection.

Parameters:

- `item`: The group to locate in the group collection.

Returns: The index of the `item` if found; otherwise, -1.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `IList<T>` interface.

## GroupCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Group>.Insert(Int32, Group) method

```csharp
void IList<Group>.Insert (int index, System.Text.RegularExpressions.Group item);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The position at which to insert the group.
- `item`: The group to insert.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.System.Collections.Generic.IList<System.Text.RegularExpressions.Group>.RemoveAt(Int32) method

```csharp
void IList<Group>.RemoveAt (int index);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index of the group to remove.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.System.Collections.IList.Add(Object) method

```csharp
int IList.Add (object value);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `value`: The object to add to the group collection.

Returns: Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.System.Collections.IList.Clear() method

```csharp
void IList.Clear ();
```

Calling this method always throws `NotSupportedException`.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `IList` interface.

## GroupCollection.System.Collections.IList.Contains(Object) method

```csharp
bool IList.Contains (object value);
```

Determines whether the group collection contains a specific group item.

Parameters:

- `value`: The group to locate in the group collection.

Returns: `true` if the group item is found in the group collection; `false` otherwise.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `IList` interface.

## GroupCollection.System.Collections.IList.IndexOf(Object) method

```csharp
int IList.IndexOf (object value);
```

Determines the index of a specific group in the group collection.

Parameters:

- `value`: The group to locate in the group collection.

Returns: The index of the `value` if found; otherwise, -1.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `GroupCollection` instance is cast to an `IList` interface.

## GroupCollection.System.Collections.IList.Insert(Int32, Object) method

```csharp
void IList.Insert (int index, object value);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The position at which to insert the group.
- `value`: The group to insert.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.System.Collections.IList.Remove(Object) method

```csharp
void IList.Remove (object value);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `value`: The group to remove.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.System.Collections.IList.RemoveAt(Int32) method

```csharp
void IList.RemoveAt (int index);
```

Calling this method always throws `NotSupportedException`.

Parameters:

- `index`: The zero-based index of the group to remove.

Exceptions:

- `NotSupportedException`: This method is not supported. This is a read-only collection.

To be added.

## GroupCollection.TryGetValue(String, Group) method

```csharp
public bool TryGetValue (string key, out System.Text.RegularExpressions.Group? value);
```

Attempts to retrieve a group identified by the provided name key, if it exists in the group
collection.

Parameters:

- `key`: A string with the group name key to look for.
- `value`: When the method returns, the group whose name is `key`, if it is found;
otherwise, `null` if not found.

Returns: `true` if a group identified by the provided name key <example-value>;
`false` otherwise.

To be added.
