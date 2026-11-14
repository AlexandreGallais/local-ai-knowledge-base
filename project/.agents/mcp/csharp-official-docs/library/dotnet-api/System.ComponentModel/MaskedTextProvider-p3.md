---
title: "MaskedTextProvider class (part 3 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MaskedTextProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaskedTextProvider class (part 3 of 7)

## MaskedTextProvider.Add(String, Int32, MaskedTextResultHint) method

```csharp
public bool Add (string input, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Adds the characters in the specified input string to the end of the formatted string, and then outputs position and descriptive information.

Parameters:

- `input`: A `String` containing character values to be appended to the formatted string.
- `testPosition`: The zero-based position in the formatted string where the attempt was made to add the character. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the operation. An output parameter.

Returns: `true` if all the characters from the input string were added successfully; otherwise `false` to indicate that no characters were added.

#### Remarks
The `Add` method adds the characters from the `input` string to the formatted string, starting with the first available position after `MaskedTextProvider.LastAssignedPosition`. This method will fail for any of the following reasons:

- Any of the characters in the input value, `input`, are not printable, or the input value does not match its corresponding mask element.

- There are not enough available edit positions in the formatted string after the last assigned position.

If this method fails, no additions are made and the method returns `false`.

This method functions the same as the overridden version taking a single `String` parameter, `Add`, except that it outputs additional information.

## MaskedTextProvider.Clear() method

```csharp
public void Clear ();
```

Clears all the editable input characters from the formatted string, replacing them with prompt characters.

#### Remarks
The `Clear` method reinitializes the formatted string, inserting the prompt character into all editable positions.

## MaskedTextProvider.Clear(MaskedTextResultHint) method

```csharp
public void Clear (out System.ComponentModel.MaskedTextResultHint resultHint);
```

Clears all the editable input characters from the formatted string, replacing them with prompt characters, and then outputs descriptive information.

Parameters:

- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the operation. An output parameter.

#### Remarks
The `Clear` method reinitializes the formatted string, inserting the prompt character into all editable positions. It functions equivalently to the overridden version that takes no parameters, `Clear`, except it outputs additional information.

## MaskedTextProvider.Clone() method

```csharp
public object Clone ();
```

Creates a copy of the current `MaskedTextProvider`.

Returns: The `MaskedTextProvider` object this method creates, cast as an object.

#### Remarks
The `MaskedTextProvider.Clone` method returns a new copy of the current `MaskedTextProvider`.

## MaskedTextProvider.FindAssignedEditPositionFrom(Int32, Boolean) method

```csharp
public int FindAssignedEditPositionFrom (int position, bool direction);
```

Returns the position of the first assigned editable position after the specified position using the specified search direction.

Parameters:

- `position`: The zero-based position in the formatted string to start the search.
- `direction`: A `Boolean` indicating the search direction; either `true` to search forward or `false` to search backward.

Returns: If successful, an `Int32` representing the zero-based position of the first assigned editable position encountered; otherwise `MaskedTextProvider.InvalidIndex`.

#### Remarks
The formatted string is composed of editable characters and literals copied from the mask. The editable character positions will either be occupied by the prompt character copied from the mask if they are unassigned, or with a valid input character if they have been assigned an input.

The `MaskedTextProvider.FindAssignedEditPositionFrom` method is used to search for the first assigned character after a specified position and search direction. The result can subsequently be passed as a parameter to the `MaskedTextProvider.Item` indexer to obtain the assigned value at this position.

The `MaskedTextProvider.FindNonEditPositionFrom` and `MaskedTextProvider.FindUnassignedEditPositionFrom` methods are complements of this method.

## MaskedTextProvider.FindAssignedEditPositionInRange(Int32, Int32, Boolean) method

```csharp
public int FindAssignedEditPositionInRange (int startPosition, int endPosition, bool direction);
```

Returns the position of the first assigned editable position between the specified positions using the specified search direction.

Parameters:

- `startPosition`: The zero-based position in the formatted string where the search starts.
- `endPosition`: The zero-based position in the formatted string where the search ends.
- `direction`: A `Boolean` indicating the search direction; either `true` to search forward or `false` to search backward.

Returns: If successful, an `Int32` representing the zero-based position of the first assigned editable position encountered; otherwise `MaskedTextProvider.InvalidIndex`.

#### Remarks
The formatted string is composed of editable characters and literals copied from the mask. The editable character positions will either be occupied by the prompt character copied from the mask if they are unassigned, or with a valid input character if they have been assigned an input.

The `MaskedTextProvider.FindAssignedEditPositionInRange` method is used to search for the first assigned character between two specified positions, inclusive, using the specified search direction. The result can subsequently be passed as a parameter to the `MaskedTextProvider.Item` indexer to obtain the assigned value at this position.

The `MaskedTextProvider.FindNonEditPositionInRange` and `MaskedTextProvider.FindUnassignedEditPositionInRange` methods are complements of this method.

## MaskedTextProvider.FindEditPositionFrom(Int32, Boolean) method

```csharp
public int FindEditPositionFrom (int position, bool direction);
```

Returns the position of the first editable position after the specified position using the specified search direction.

Parameters:

- `position`: The zero-based position in the formatted string to start the search.
- `direction`: A `Boolean` indicating the search direction; either `true` to search forward or `false` to search backward.

Returns: If successful, an `Int32` representing the zero-based position of the first editable position encountered; otherwise `MaskedTextProvider.InvalidIndex`.

#### Remarks
The `MaskedTextProvider.FindEditPositionFrom` method is used to search for the next assigned or unassigned editable position in the formatted string after the specified position.

The `MaskedTextProvider.FindNonEditPositionFrom` method is the complement of this method.

## MaskedTextProvider.FindEditPositionInRange(Int32, Int32, Boolean) method

```csharp
public int FindEditPositionInRange (int startPosition, int endPosition, bool direction);
```

Returns the position of the first editable position between the specified positions using the specified search direction.

Parameters:

- `startPosition`: The zero-based position in the formatted string where the search starts.
- `endPosition`: The zero-based position in the formatted string where the search ends.
- `direction`: A `Boolean` indicating the search direction; either `true` to search forward or `false` to search backward.

Returns: If successful, an `Int32` representing the zero-based position of the first editable position encountered; otherwise `MaskedTextProvider.InvalidIndex`.

#### Remarks
The `MaskedTextProvider.FindEditPositionInRange` method is used to search for the first editable character between two specified positions, inclusive, using the specified search direction. The result can subsequently be passed as a parameter to the `MaskedTextProvider.Item` indexer to obtain the assigned value at this position.

The `MaskedTextProvider.FindNonEditPositionInRange` method is the complement of this method.

## MaskedTextProvider.FindNonEditPositionFrom(Int32, Boolean) method

```csharp
public int FindNonEditPositionFrom (int position, bool direction);
```

Returns the position of the first non-editable position after the specified position using the specified search direction.

Parameters:

- `position`: The zero-based position in the formatted string to start the search.
- `direction`: A `Boolean` indicating the search direction; either `true` to search forward or `false` to search backward.

Returns: If successful, an `Int32` representing the zero-based position of the first literal position encountered; otherwise `MaskedTextProvider.InvalidIndex`.

#### Remarks
The `MaskedTextProvider.FindNonEditPositionFrom` method is used to search for the next literal character in the formatted string after the specified position. The result can subsequently be passed as a parameter to the `MaskedTextProvider.Item` indexer to obtain the literal value at this position.

The `MaskedTextProvider.FindEditPositionFrom` method is the complement of this method.

## MaskedTextProvider.FindNonEditPositionInRange(Int32, Int32, Boolean) method

```csharp
public int FindNonEditPositionInRange (int startPosition, int endPosition, bool direction);
```

Returns the position of the first non-editable position between the specified positions using the specified search direction.

Parameters:

- `startPosition`: The zero-based position in the formatted string where the search starts.
- `endPosition`: The zero-based position in the formatted string where the search ends.
- `direction`: A `Boolean` indicating the search direction; either `true` to search forward or `false` to search backward.

Returns: If successful, an `Int32` representing the zero-based position of the first literal position encountered; otherwise `MaskedTextProvider.InvalidIndex`.

#### Remarks
The `MaskedTextProvider.FindNonEditPositionInRange` method is used to search for the first literal character between two specified positions, inclusive, using the specified search direction. The result can subsequently be passed as a parameter to the `MaskedTextProvider.Item` indexer to obtain the literal value at this position.

The `MaskedTextProvider.FindEditPositionInRange` method is the complement of this method.

## MaskedTextProvider.FindUnassignedEditPositionFrom(Int32, Boolean) method

```csharp
public int FindUnassignedEditPositionFrom (int position, bool direction);
```

Returns the position of the first unassigned editable position after the specified position using the specified search direction.

Parameters:

- `position`: The zero-based position in the formatted string to start the search.
- `direction`: A `Boolean` indicating the search direction; either `true` to search forward or `false` to search backward.

Returns: If successful, an `Int32` representing the zero-based position of the first unassigned editable position encountered; otherwise `MaskedTextProvider.InvalidIndex`.

#### Remarks
The formatted string is composed of editable characters and literals copied from the mask. The editable character positions will either be occupied by the prompt character copied from the mask if they are unassigned, or with a valid input character if they have been assigned an input.

The `MaskedTextProvider.FindUnassignedEditPositionFrom` method is used to search for the first unassigned character after a specified position and search direction. The prompt character should occupy this position.

The `MaskedTextProvider.FindNonEditPositionFrom` and `MaskedTextProvider.FindAssignedEditPositionFrom` methods are complements of this method.

## MaskedTextProvider.FindUnassignedEditPositionInRange(Int32, Int32, Boolean) method

```csharp
public int FindUnassignedEditPositionInRange (int startPosition, int endPosition, bool direction);
```

Returns the position of the first unassigned editable position between the specified positions using the specified search direction.

Parameters:

- `startPosition`: The zero-based position in the formatted string where the search starts.
- `endPosition`: The zero-based position in the formatted string where the search ends.
- `direction`: A `Boolean` indicating the search direction; either `true` to search forward or `false` to search backward.

Returns: If successful, an `Int32` representing the zero-based position of the first unassigned editable position encountered; otherwise `MaskedTextProvider.InvalidIndex`.

#### Remarks
The formatted string is composed of editable characters and literals copied from the mask. The editable character positions will either be occupied by the prompt character copied from the mask if they are unassigned, or with a valid input character if they have been assigned an input.

The `MaskedTextProvider.FindUnassignedEditPositionInRange` method is used to search for the first unassigned character between two specified positions, inclusive, using the specified search direction. The prompt character should occupy this position.

The `MaskedTextProvider.FindNonEditPositionInRange` and `MaskedTextProvider.FindAssignedEditPositionInRange` methods are complements of this method.

## MaskedTextProvider.GetOperationResultFromHint(MaskedTextResultHint) method

```csharp
public static bool GetOperationResultFromHint (System.ComponentModel.MaskedTextResultHint hint);
```

Determines whether the specified `MaskedTextResultHint` denotes success or failure.

Parameters:

- `hint`: A `MaskedTextResultHint` value typically obtained as an output parameter from a previous operation.

Returns: `true` if the specified `MaskedTextResultHint` value represents a success; otherwise, `false` if it represents failure.

#### Remarks
The following methods of the `MaskedTextProvider` class contain a parameter of type `MaskedTextResultHint` that is used to output information about the operation of the method: `MaskedTextProvider.Add`, `MaskedTextProvider.Clear`, `MaskedTextProvider.InsertAt`, `MaskedTextProvider.Remove`, `MaskedTextProvider.RemoveAt`, `MaskedTextProvider.Replace`, `MaskedTextProvider.Set`, `MaskedTextProvider.VerifyChar`, and `MaskedTextProvider.VerifyString`. The `MaskedTextProvider.GetOperationResultFromHint` method interprets this value and returns a Boolean value that indicates whether the `MaskedTextResultHint` has signaled that the operation was a success or failure.
