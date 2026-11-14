---
title: "Claim class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Claims/Claim.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Claim class (part 2 of 2)

## Claim.Value property

```csharp
public string Value { get; }
```

Gets the value of the claim.

Returns: The claim value.

#### Remarks
The value of a claim is represented only as a string. For more complex value types, it is recommended that you use standard XML schema types to indicate how the value is meant to be serialized and deserialized to and from a string.

The `ValueType` property provides the underlying syntactic type information about the value. The `Type` property provides the semantic information about the value; that is, it provides the meaning of the value and tells a claim consumer how to interpret it.

## Claim.ValueType property

```csharp
public string ValueType { get; }
```

Gets the value type of the claim.

Returns: The claim value type.

#### Remarks
The `ValueType` property contains a string that identifies the type information of the value. This property can be used to understand the format of the value and to provide information about how to serialize and deserialize the value. If your solution requires complex value types, it is recommended that you use standard XML schema types in the `ValueType` property to indicate how the `Value` property is meant to be serialized and deserialized from a string.

## Claim.Clone() method

```csharp
public virtual System.Security.Claims.Claim Clone ();
```

Returns a new `Claim` object copied from this object. The new claim does not have a subject.

Returns: The new claim object.

#### Remarks
This is a shallow copy operation. The `Subject` property of the new `Claim` object is set to `null`.

## Claim.Clone(ClaimsIdentity) method

```csharp
public virtual System.Security.Claims.Claim Clone (System.Security.Claims.ClaimsIdentity? identity);
```

Returns a new `Claim` object copied from this object. The subject of the new claim is set to the specified ClaimsIdentity.

Parameters:

- `identity`: The intended subject of the new claim.

Returns: The new claim object.

#### Remarks
This is a shallow copy operation. The `Subject` property of the new `Claim` object is set to the value of the `identity` parameter.

## Claim.ToString() method

```csharp
public override string ToString ();
```

Returns a string representation of this `Claim` object.

Returns: The string representation of this `Claim` object.

#### Remarks
The string that is returned contains the values of the `Claim.Type` and `Claim.Value` properties in the following format:."Type: Value".

## Claim.WriteTo(BinaryWriter) method

```csharp
public virtual void WriteTo (System.IO.BinaryWriter writer);
```

Writes this `Claim` to the writer.

Parameters:

- `writer`: The writer to use for data storage.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.

## Claim.WriteTo(BinaryWriter, Byte[]) method

```csharp
protected virtual void WriteTo (System.IO.BinaryWriter writer, byte[]? userData);
```

Writes this `Claim` to the writer.

Parameters:

- `writer`: The writer to write this claim.
- `userData`: The user data to claim.

Exceptions:

- `ArgumentNullException`: `writer` is `null`.
