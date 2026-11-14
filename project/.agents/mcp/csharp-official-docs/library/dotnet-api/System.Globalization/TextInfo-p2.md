---
title: "TextInfo class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Globalization/TextInfo.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# TextInfo class (part 2 of 2)

## TextInfo.ToUpper(Char) method

```csharp
public char ToUpper (char c);
```

Converts the specified character to uppercase.

Parameters:

- `c`: The character to convert to uppercase.

Returns: The specified character converted to uppercase.

#### Remarks
Casing semantics depend on the culture in use. For the invariant culture, the casing semantics are not culture-sensitive. For a specific culture, the casing semantics are sensitive to that culture.

If a security decision depends on a string comparison or a case-change operation, the application should use the `CultureInfo.InvariantCulture` to ensure that the behavior is consistent regardless of the culture settings of the system. However, the invariant culture must be used only by processes that require culture-independent results, such as system services. Otherwise, it produces results that might be linguistically incorrect or culturally inappropriate.

For more information on cultures, see `CultureInfo`.

## TextInfo.ToUpper(String) method

```csharp
public string ToUpper (string str);
```

Converts the specified string to uppercase.

Parameters:

- `str`: The string to convert to uppercase.

Returns: The specified string converted to uppercase.

Exceptions:

- `ArgumentNullException`: `str` is null.

#### Remarks
The returned string might differ in length from the input string. For more information on casing, refer to the Unicode Technical Report #21 "Case Mappings," published by the Unicode Consortium (https://www.unicode.org). The current implementation preserves the length of the string. However, this behavior is not guaranteed and could change in future implementations.

Casing semantics depend on the culture in use. For the invariant culture, the casing semantics are not culture-sensitive. For a specific culture, the casing semantics are sensitive to that culture.

If a security decision depends on a string comparison or a case-change operation, the application should use the `CultureInfo.InvariantCulture` to ensure that the behavior is consistent regardless of the culture settings of the system. However, the invariant culture must be used only by processes that require culture-independent results, such as system services. Otherwise, it produces results that might be linguistically incorrect or culturally inappropriate.

For more information on cultures, see `CultureInfo`.

## TextInfo.ToUpper(Rune) method

```csharp
public System.Text.Rune ToUpper (System.Text.Rune value);
```

To be added.

Parameters:

- `value`: To be added.

Returns: To be added.

To be added.
