---
title: "MaskedTextProvider class (part 4 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MaskedTextProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaskedTextProvider class (part 4 of 7)

## MaskedTextProvider.InsertAt(Char, Int32) method

```csharp
public bool InsertAt (char input, int position);
```

Inserts the specified character at the specified position within the formatted string.

Parameters:

- `input`: The `Char` to be inserted.
- `position`: The zero-based position in the formatted string to insert the character.

Returns: `true` if the insertion was successful; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.InsertAt` method inserts a character into the first edit position at or beyond that specified by the `pos` parameter. This method will shift all existing characters after the insertion point over by one position to make room for the inserted `input` character. If one of the following errors occurs, the insertion is not performed, and the method returns `false`.

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the formatted string.

- An editable character was not found in the formatted string at or beyond the specified position, `pos`.

- The insertion character, `input`, is not a valid input character because it is not printable or does not match its corresponding mask element.

- There are no available positions to the right of the insertion point, so that existing characters cannot be shifted.

- Shifting the existing characters would produce a violation of the mask.

An empty `input` string will cause no change in the formatted string, but will return `true`.

## MaskedTextProvider.InsertAt(String, Int32) method

```csharp
public bool InsertAt (string input, int position);
```

Inserts the specified string at a specified position within the formatted string.

Parameters:

- `input`: The `String` to be inserted.
- `position`: The zero-based position in the formatted string to insert the input string.

Returns: `true` if the insertion was successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `input` parameter is `null`.

#### Remarks
The `MaskedTextProvider.InsertAt` method inserts each character from the `input` string into the edit positions located at position `pos` and beyond. This method will shift all existing characters after the insertion point over by one position for each inserted character. If one of the following errors occurs, no insertion is performed, and the method returns `false`.

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the formatted string.

- Not enough editable characters exist in the formatted string at or beyond the specified position, `pos`, to insert all of the characters from the `input` string.

- One or more of the insertion characters are not a valid input character because they are not printable or do not match their corresponding mask element.

- There are not enough available positions to the right of the insertion point, so that existing characters cannot be shifted.

- Shifting the existing characters would produce a violation of the mask. Note that this shifting occurs during the insertion of each individual character.

An empty `input` string will cause no change in the formatted string, but will return `true`.

## MaskedTextProvider.InsertAt(Char, Int32, Int32, MaskedTextResultHint) method

```csharp
public bool InsertAt (char input, int position, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Inserts the specified character at the specified position within the formatted string, returning the last insertion position and the status of the operation.

Parameters:

- `input`: The `Char` to be inserted.
- `position`: The zero-based position in the formatted string to insert the character.
- `testPosition`: If the method is successful, the last position where a character was inserted; otherwise, the first position where the insertion failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the insertion operation. An output parameter.

Returns: `true` if the insertion was successful; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.InsertAt` method inserts a character into the first edit position at or beyond that specified by the `pos` parameter. This method will shift all existing characters after the insertion point over by one position to make room for the inserted `input` character. If one of the following errors occurs, the insertion is not performed, and the method returns `false`.

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the formatted string.

- An editable character was not found in the formatted string at or beyond the specified position, `pos`.

- The insertion character, `input`, is not a valid input character because it is not printable or does not match its corresponding mask element.

- There are no available positions to the right of the insertion point, so that existing characters cannot be shifted.

- Shifting the existing characters would produce a violation of the mask.

An empty `input` string will cause no change in the formatted string, but will return `true`.

## MaskedTextProvider.InsertAt(String, Int32, Int32, MaskedTextResultHint) method

```csharp
public bool InsertAt (string input, int position, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Inserts the specified string at a specified position within the formatted string, returning the last insertion position and the status of the operation.

Parameters:

- `input`: The `String` to be inserted.
- `position`: The zero-based position in the formatted string to insert the input string.
- `testPosition`: If the method is successful, the last position where a character was inserted; otherwise, the first position where the insertion failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the insertion operation. An output parameter.

Returns: `true` if the insertion was successful; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `input` parameter is `null`.

#### Remarks
The `MaskedTextProvider.InsertAt` method inserts each character from the `input` string into the edit positions located at position `pos` and beyond. This method will shift all existing characters after the insertion point over by one position for each inserted character. If one of the following errors occurs, no insertion is performed, and the method returns `false`.

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the formatted string.

- Not enough editable characters exist in the formatted string at or beyond the specified position, `pos`, to insert all of the characters from the `input` string.

- One or more of the insertion characters are not a valid input character because they are not printable or do not match their corresponding mask element.

- There are not enough available positions to the right of the insertion point, so that existing characters cannot be shifted.

- Shifting the existing characters would produce a violation of the mask. Note that this shifting occurs during the insertion of each individual character.

An empty `input` string will cause no change in the formatted string, but will return `true`.

## MaskedTextProvider.IsAvailablePosition(Int32) method

```csharp
public bool IsAvailablePosition (int position);
```

Determines whether the specified position is available for assignment.

Parameters:

- `position`: The zero-based position in the mask to test.

Returns: `true` if the specified position in the formatted string is editable and has not been assigned to yet; otherwise `false`.

#### Remarks
The `MaskedTextProvider.IsAvailablePosition` method returns `true` only if all of the following conditions are true:

- The `pos` parameter is within the bounds of the formatted string; that is, its value is greater than or equal to zero and less than the `MaskedTextProvider.Length` of the formatted string.

- The specified position is an editable character.

- A character has not already been assigned to this position.

## MaskedTextProvider.IsEditPosition(Int32) method

```csharp
public bool IsEditPosition (int position);
```

Determines whether the specified position is editable.

Parameters:

- `position`: The zero-based position in the mask to test.

Returns: `true` if the specified position in the formatted string is editable; otherwise `false`.

#### Remarks
The `MaskedTextProvider.IsEditPosition` method returns `true` only if both of the following conditions are true:

- The `pos` parameter is within the bounds of the formatted string; that is, its value is greater than or equal to zero and less than the `MaskedTextProvider.Length` of the formatted string.

- The specified position is an editable character.

## MaskedTextProvider.IsValidInputChar(Char) method

```csharp
public static bool IsValidInputChar (char c);
```

Determines whether the specified character is a valid input character.

Parameters:

- `c`: The `Char` value to test.

Returns: `true` if the specified character contains a valid input value; otherwise `false`.

#### Remarks
Valid input characters include all printable characters, which include letters, digits, punctuation, symbols and the space character.

## MaskedTextProvider.IsValidMaskChar(Char) method

```csharp
public static bool IsValidMaskChar (char c);
```

Determines whether the specified character is a valid mask character.

Parameters:

- `c`: The `Char` value to test.

Returns: `true` if the specified character contains a valid mask value; otherwise `false`.

#### Remarks
Valid mask characters include all printable characters, which include letters, digits, punctuation, symbols and the space character.

## MaskedTextProvider.IsValidPasswordChar(Char) method

```csharp
public static bool IsValidPasswordChar (char c);
```

Determines whether the specified character is a valid password character.

Parameters:

- `c`: The `Char` value to test.

Returns: `true` if the specified character contains a valid password value; otherwise `false`.

#### Remarks
Valid password <example-value> include all printable characters and the null character, which is used to disable password functionality. Printable characters include letters, digits, punctuation, symbols and the space character.

## MaskedTextProvider.Remove() method

```csharp
public bool Remove ();
```

Removes the last assigned character from the formatted string.

Returns: `true` if the character was successfully removed; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.Remove` method has no effect if there are no characters assigned to the mask yet.

When the last assigned character is removed from the formatted string, the editable mask character is reset for that position, allowing subsequent input.

## MaskedTextProvider.Remove(Int32, MaskedTextResultHint) method

```csharp
public bool Remove (out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Removes the last assigned character from the formatted string, and then outputs the removal position and descriptive information.

Parameters:

- `testPosition`: The zero-based position in the formatted string where the character was actually removed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the operation. An output parameter.

Returns: `true` if the character was successfully removed; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.Remove` method has no effect if there are no characters assigned to the mask yet.

When the last assigned character is removed from the formatted string, the editable mask character is reset for that position, allowing subsequent input.

## MaskedTextProvider.RemoveAt(Int32) method

```csharp
public bool RemoveAt (int position);
```

Removes the assigned character at the specified position from the formatted string.

Parameters:

- `position`: The zero-based position of the assigned character to remove.

Returns: `true` if the character was successfully removed; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.RemoveAt` method has no effect if there are no assigned characters at the removal position specified. Literal characters are not affected by this method.

When a character is removed, the remaining higher-positioned characters in the mask will shift to the left to fill in the gap created by the removal. Vacated positions are reset for input. If movement of the characters is prevented by the mask definition, no removal occurs, and `MaskedTextProvider.RemoveAt` returns `false`.

This method call is exactly equivalent to the following call to the overloaded `RemoveAt` version:

`RemoveAt(pos, pos);`

## MaskedTextProvider.RemoveAt(Int32, Int32) method

```csharp
public bool RemoveAt (int startPosition, int endPosition);
```

Removes the assigned characters between the specified positions from the formatted string.

Parameters:

- `startPosition`: The zero-based index of the first assigned character to remove.
- `endPosition`: The zero-based index of the last assigned character to remove.

Returns: `true` if the character was successfully removed; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.RemoveAt` method has no effect if there are no assigned characters at the removal positions specified.

When a character is removed, the remaining higher-positioned characters in the mask will shift to the left to fill in the gap created by the removal. Vacated positions are reset for input. If movement of the characters is prevented by the mask definition, no removal occurs, and `MaskedTextProvider.RemoveAt` returns `false`.
