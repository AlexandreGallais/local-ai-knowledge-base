---
title: "CodeIdentifier class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Serialization/CodeIdentifier.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# CodeIdentifier class

Namespace: `System.Xml.Serialization`

```csharp
public class CodeIdentifier
```

Provides static methods to convert input text into names for code entities.

#### Remarks
The methods of the `CodeIdentifier` class are used by the XML serialization infrastructure while producing .NET types from XML element and data type definitions. XML element or attribute names typically provide the methods' input text.

You do not need to call the methods of the `CodeIdentifier` class directly from your code. Instead, use the various tools and APIs provided by .NET for XML serialization, such as `XmlSerializer` or the XML Schema Definition Tool (Xsd.exe) tool.

## CodeIdentifier.CodeIdentifier() constructor

```csharp
public CodeIdentifier ();
```

Initializes a new instance of the `CodeIdentifier` class.

To be added.

## CodeIdentifier.MakeCamel(String) method

```csharp
public static string MakeCamel (string identifier);
```

Produces a camel-case string from an input string.

Parameters:

- `identifier`: The name of a code entity, such as a method parameter, typically taken from an XML element or attribute name.

Returns: A camel-case version of the parameter string.

#### Remarks
The `CodeIdentifier.MakeCamel` method converts the initial character from an upper-case to lower-case letter, if necessary.

You do not need to call this method directly.

## CodeIdentifier.MakePascal(String) method

```csharp
public static string MakePascal (string identifier);
```

Produces a Pascal-case string from an input string.

Parameters:

- `identifier`: The name of a code entity, such as a method parameter, typically taken from an XML element or attribute name.

Returns: A Pascal-case version of the parameter string.

#### Remarks
The `CodeIdentifier.MakePascal` method converts the initial character from a lower-case to upper-case letter, if necessary.

You do not need to call this method directly.

## CodeIdentifier.MakeValid(String) method

```csharp
public static string MakeValid (string identifier);
```

Produces a valid code entity name from an input string.

Parameters:

- `identifier`: The name of a code entity, such as a method parameter, typically taken from an XML element or attribute name.

Returns: A string that can be used as a code identifier, such as the name of a method parameter.

#### Remarks
The `CodeIdentifier.MakeValid` method removes any characters that cannot appear in a code identifier. It returns the string "Item" if no characters are valid. It prefixes the string "Item" to an input that begins with an invalid start character, for example, a digit, or a currency symbol.

You do not need to call this method directly.
