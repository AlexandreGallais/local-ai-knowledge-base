---
title: "EntityTagHeaderValue class"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Net.Http.Headers/EntityTagHeaderValue.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# EntityTagHeaderValue class

Namespace: `System.Net.Http.Headers`

```csharp
public class EntityTagHeaderValue : ICloneable
```

Represents an entity-tag header value.

#### Remarks
Entity tags are used for comparing two or more entities from the same requested resource.

## EntityTagHeaderValue.EntityTagHeaderValue(String) constructor

```csharp
public EntityTagHeaderValue (string tag);
```

Initializes a new instance of the `EntityTagHeaderValue` class.

Parameters:

- `tag`: A string that contains an `EntityTagHeaderValue`.

To be added.

## EntityTagHeaderValue.EntityTagHeaderValue(String, Boolean) constructor

```csharp
public EntityTagHeaderValue (string tag, bool isWeak);
```

Initializes a new instance of the `EntityTagHeaderValue` class.

Parameters:

- `tag`: A string that contains an  `EntityTagHeaderValue`.
- `isWeak`: A value that indicates if this entity-tag header is a weak validator. If the entity-tag header is weak validator, then `isWeak` should be set to `true`. If the entity-tag header is a strong validator, then `isWeak` should be set to `false`.

To be added.

## EntityTagHeaderValue.Any property

```csharp
public static System.Net.Http.Headers.EntityTagHeaderValue Any { get; }
```

Gets the entity-tag header value.

Returns: Returns `EntityTagHeaderValue`.

#### Remarks
The entity-tag header value.

## EntityTagHeaderValue.IsWeak property

```csharp
public bool IsWeak { get; }
```

Gets whether the entity-tag is prefaced by a weakness indicator.

Returns: `true` if the entity-tag is prefaced by a weakness indicator; otherwise, `false`.

To be added.

## EntityTagHeaderValue.Tag property

```csharp
public string Tag { get; }
```

Gets the opaque quoted string.

Returns: An opaque quoted string.

To be added.

## EntityTagHeaderValue.Equals(Object) method

```csharp
public override bool Equals (object? obj);
```

Determines whether the specified `Object` is equal to the current `EntityTagHeaderValue` object.

Parameters:

- `obj`: The object to compare with the current object.

Returns: `true` if the specified `Object` is equal to the current object; otherwise, `false`.

To be added.

## EntityTagHeaderValue.GetHashCode() method

```csharp
public override int GetHashCode ();
```

Serves as a hash function for an `EntityTagHeaderValue` object.

Returns: A hash code for the current object.

#### Remarks
A hash code is a numeric value that is used to identify an object during equality testing. It can also serve as an index for an object in a collection.

The `AuthenticationHeaderValue.GetHashCode` method is suitable for use in hashing algorithms and data structures such as a hash table.

## EntityTagHeaderValue.Parse(String) method

```csharp
public static System.Net.Http.Headers.EntityTagHeaderValue Parse (string input);
```

Converts a string to an `EntityTagHeaderValue` instance.

Parameters:

- `input`: A string that represents entity tag header value information.

Returns: An `EntityTagHeaderValue` instance.

Exceptions:

- `ArgumentNullException`: `input` is a `null` reference.
- `FormatException`: `input` is not valid entity tag header value information.

To be added.

## EntityTagHeaderValue.System.ICloneable.Clone() method

```csharp
object ICloneable.Clone ();
```

Creates a new object that is a copy of the current `EntityTagHeaderValue` instance.

Returns: A copy of the current instance.

#### Remarks

This member is an explicit interface member implementation. It can be used only when the `EntityTagHeaderValue` instance is cast to an `ICloneable` interface.

## EntityTagHeaderValue.ToString() method

```csharp
public override string ToString ();
```

Returns a string that represents the current `EntityTagHeaderValue` object.

Returns: A string that represents the current object.

To be added.

## EntityTagHeaderValue.TryParse(String, EntityTagHeaderValue) method

```csharp
public static bool TryParse (string? input, out System.Net.Http.Headers.EntityTagHeaderValue? parsedValue);
```

Determines whether a string is valid `EntityTagHeaderValue` information.

Parameters:

- `input`: The string to validate.
- `parsedValue`: The `EntityTagHeaderValue` version of the string.

Returns: `true` if `input` is valid `EntityTagHeaderValue` information; otherwise, `false`.

To be added.
