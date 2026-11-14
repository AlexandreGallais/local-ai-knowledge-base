---
title: "MaskedTextProvider class (part 5 of 7)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.ComponentModel/MaskedTextProvider.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# MaskedTextProvider class (part 5 of 7)

## MaskedTextProvider.RemoveAt(Int32, Int32, Int32, MaskedTextResultHint) method

```csharp
public bool RemoveAt (int startPosition, int endPosition, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Removes the assigned characters between the specified positions from the formatted string, and then outputs the removal position and descriptive information.

Parameters:

- `startPosition`: The zero-based index of the first assigned character to remove.
- `endPosition`: The zero-based index of the last assigned character to remove.
- `testPosition`: If successful, the zero-based position in the formatted string of where the characters were actually removed; otherwise, the first position where the operation failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the operation. An output parameter.

Returns: `true` if the character was successfully removed; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.RemoveAt` method has no effect if there are no assigned characters at the removal positions specified.

When a character is removed, the remaining higher-positioned characters in the mask will shift to the left to fill in the gap created by the removal. Vacated positions are reset for input. If movement of the characters is prevented by the mask definition, no removal occurs, and `MaskedTextProvider.RemoveAt` returns `false`.

This version of `MaskedTextProvider.RemoveAt` provides two additional output parameters to convey more information about the operation of the method.

## MaskedTextProvider.Replace(Char, Int32) method

```csharp
public bool Replace (char input, int position);
```

Replaces a single character at or beyond the specified position with the specified character value.

Parameters:

- `input`: The `Char` value that replaces the existing value.
- `position`: The zero-based position to search for the first editable character to replace.

Returns: `true` if the character was successfully replaced; otherwise, `false`.

#### Remarks
The `Replace` method searches for the first editable position in the formatted string at or beyond the specified position, `pos`. If one is found, the value of the editable position is changed to the specified character, `input`. Any of the following conditions will result in an error that causes no replacement to be performed and a value of `false` to be returned:

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the formatted string.

- An editable character was not found in the formatted string at or beyond the specified position, `pos`.

- The replacement character, `input`, is not a valid input character because it is not printable or does not match its corresponding mask element.

## MaskedTextProvider.Replace(String, Int32) method

```csharp
public bool Replace (string input, int position);
```

Replaces a range of editable characters starting at the specified position with the specified string.

Parameters:

- `input`: The `String` value used to replace the existing editable characters.
- `position`: The zero-based position to search for the first editable character to replace.

Returns: `true` if all the characters were successfully replaced; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `input` parameter is `null`.

#### Remarks
The `Replace` method searches for the first editable position at or beyond the specified position, `pos`. Operating under the assumption that there are enough editable positions after this point, the existing character values are replaced one-by-one with the contents of the replacement string parameter, `input`.

The following conditions are considered errors. When an error occurs, no replacement occurs and `Replace` returns `false`.

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the formatted string.

- There are not enough editable positions in the formatted string to hold the contents of the replacement string.

- One of the replacement character values is not valid because it is not printable or does not match its corresponding mask element.

## MaskedTextProvider.Replace(Char, Int32, Int32, MaskedTextResultHint) method

```csharp
public bool Replace (char input, int position, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Replaces a single character at or beyond the specified position with the specified character value, and then outputs the removal position and descriptive information.

Parameters:

- `input`: The `Char` value that replaces the existing value.
- `position`: The zero-based position to search for the first editable character to replace.
- `testPosition`: If successful, the zero-based position in the formatted string where the last character was actually replaced; otherwise, the first position where the operation failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the replacement operation. An output parameter.

Returns: `true` if the character was successfully replaced; otherwise, `false`.

#### Remarks
The `Replace` method searches for the first editable position in the formatted string at or beyond the specified position, `pos`. If one is found, the value of the editable position is changed to the specified character, `input`. Any of the following conditions will result in an error condition that causes no replacement to be performed and a value of `false` to be returned:

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the formatted string.

- An editable character was not found in the formatted string at or beyond the specified position, `pos`.

- The replacement character, `input`, is not a valid input character because it is not printable or does not match its corresponding mask element.

In addition to the return value, this method has two output parameters to supply additional information about the replacement operation.

## MaskedTextProvider.Replace(String, Int32, Int32, MaskedTextResultHint) method

```csharp
public bool Replace (string input, int position, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Replaces a range of editable characters starting at the specified position with the specified string, and then outputs the removal position and descriptive information.

Parameters:

- `input`: The `String` value used to replace the existing editable characters.
- `position`: The zero-based position to search for the first editable character to replace.
- `testPosition`: If successful, the zero-based position in the formatted string where the last character was actually replaced; otherwise, the first position where the operation failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the replacement operation. An output parameter.

Returns: `true` if all the characters were successfully replaced; otherwise, `false`.

#### Remarks
The `Replace` method searches for the first editable position at or beyond the specified position, `pos`. Operating on the assumption that there are enough editable positions after this point, the existing character values are replaced one-by-one with the contents of the replacement string parameter, `input`.

The following conditions are considered errors. When an error occurs, no replacement occurs and `Replace` returns `false`.

- The `pos` parameter is less than zero or greater than the `MaskedTextProvider.Length` of the formatted string.

- There are not enough editable positions in the formatted string to hold the contents of the replacement string.

- One of the replacement character values is not valid because it is not printable or does not match its corresponding mask element.

In addition to the return value, this method has two output parameters to supply additional information about the replacement operation.

## MaskedTextProvider.Replace(Char, Int32, Int32, Int32, MaskedTextResultHint) method

```csharp
public bool Replace (char input, int startPosition, int endPosition, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Replaces a single character between the specified starting and ending positions with the specified character value, and then outputs the removal position and descriptive information.

Parameters:

- `input`: The `Char` value that replaces the existing value.
- `startPosition`: The zero-based position in the formatted string where the replacement starts.
- `endPosition`: The zero-based position in the formatted string where the replacement ends.
- `testPosition`: If successful, the zero-based position in the formatted string where the last character was actually replaced; otherwise, the first position where the operation failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the replacement operation. An output parameter.

Returns: `true` if the character was successfully replaced; otherwise, `false`.

#### Remarks
The `Replace` method searches for the first editable position in the formatted string between the specified starting and ending positions. If one is found, the value of the editable position is changed to the specified character, `input`. Any of the following conditions will result in an error condition that causes no replacement to be performed and a value of `false` to be returned:

- The `startPos` or `endPos` parameters point before the start of the formatted string or beyond its end.

- An editable character was not found in the specified interval.

- The replacement character, `input`, is not a valid input character because it is not printable or does not match its corresponding mask element.

In addition to the return value, this method has two output parameters to supply additional information about the replacement operation.

## MaskedTextProvider.Replace(String, Int32, Int32, Int32, MaskedTextResultHint) method

```csharp
public bool Replace (string input, int startPosition, int endPosition, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Replaces a range of editable characters between the specified starting and ending positions with the specified string, and then outputs the removal position and descriptive information.

Parameters:

- `input`: The `String` value used to replace the existing editable characters.
- `startPosition`: The zero-based position in the formatted string where the replacement starts.
- `endPosition`: The zero-based position in the formatted string where the replacement ends.
- `testPosition`: If successful, the zero-based position in the formatted string where the last character was actually replaced; otherwise, the first position where the operation failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the replacement operation. An output parameter.

Returns: `true` if all the characters were successfully replaced; otherwise, `false`.

#### Remarks
The `MaskedTextProvider.Replace` method searches for the first editable position in the formatted string between the specified starting and ending positions. Operating on the assumption that there are enough editable positions after this point, the existing character values are replaced one-by-one with the contents of the replacement string parameter, `input`.

The following conditions are considered errors. When an error occurs, no replacement occurs and `MaskedTextProvider.Replace` returns `false`.

- The `startPos` or `endPos` parameters point before the start of the formatted string or beyond its end.

- There are not enough editable positions in the formatted string to hold the contents of the replacement string.

- One of the replacement character values is not valid because it is not printable or does not match its corresponding mask element.

In addition to the return value, this method has two output parameters to supply additional information about the replacement operation.

## MaskedTextProvider.Set(String) method

```csharp
public bool Set (string input);
```

Sets the formatted string to the specified input string.

Parameters:

- `input`: The `String` value used to set the formatted string.

Returns: `true` if all the characters were successfully set; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `input` parameter is `null`.

#### Remarks
The `MaskedTextProvider.Set` method clears the existing contents of the formatted string and then applies the mask against the `input` string to update the contents of the formatted string.

The following conditions are considered errors. When an error occurs, the formatted string remains unaltered and `MaskedTextProvider.Set` returns `false`.

- There are not enough editable positions in the formatted string to hold the contents of the replacement string.

- One of the replacement character values is not valid because it is not printable or does not match its corresponding mask element.

## MaskedTextProvider.Set(String, Int32, MaskedTextResultHint) method

```csharp
public bool Set (string input, out int testPosition, out System.ComponentModel.MaskedTextResultHint resultHint);
```

Sets the formatted string to the specified input string, and then outputs the removal position and descriptive information.

Parameters:

- `input`: The `String` value used to set the formatted string.
- `testPosition`: If successful, the zero-based position in the formatted string where the last character was actually set; otherwise, the first position where the operation failed. An output parameter.
- `resultHint`: A `MaskedTextResultHint` that succinctly describes the result of the set operation. An output parameter.

Returns: `true` if all the characters were successfully set; otherwise, `false`.

Exceptions:

- `ArgumentNullException`: The `input` parameter is `null`.

#### Remarks
The `MaskedTextProvider.Set` method clears the existing contents of the formatted string and then applies the mask against the `input` string to update the contents of the formatted string.

The following conditions are considered errors. When an error occurs, the formatted string remains unaltered and `MaskedTextProvider.Set` returns `false`.

- There are not enough editable positions in the formatted string to hold the contents of the replacement string.

- One of the replacement character values is not valid because it is not printable or does not match its corresponding mask element.

This version of `MaskedTextProvider.Set` provides two additional output parameters to convey more information about the operation of the method.
