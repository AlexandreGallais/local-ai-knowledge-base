---
title: "Quaternion struct (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Quaternion.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Quaternion struct (part 2 of 2)

## Quaternion.Slerp(Quaternion, Quaternion, Single) method

```csharp
public static System.Numerics.Quaternion Slerp (System.Numerics.Quaternion quaternion1, System.Numerics.Quaternion quaternion2, float amount);
```

Interpolates between two quaternions, using spherical linear interpolation.

Parameters:

- `quaternion1`: The first quaternion.
- `quaternion2`: The second quaternion.
- `amount`: The relative weight of the second quaternion in the interpolation.

Returns: The interpolated quaternion.

To be added.

## Quaternion.Subtract(Quaternion, Quaternion) method

```csharp
public static System.Numerics.Quaternion Subtract (System.Numerics.Quaternion value1, System.Numerics.Quaternion value2);
```

Subtracts each element in a second quaternion from its corresponding element in a first quaternion.

Parameters:

- `value1`: The first quaternion.
- `value2`: The second quaternion.

Returns: The quaternion containing the values that result from subtracting each element in `value2` from its corresponding element in `value1`.

To be added.

## Quaternion.ToString() method

```csharp
public override readonly string ToString ();
```

Returns a string that represents this quaternion.

Returns: The string representation of this quaternion.

#### Remarks
The numeric values in the returned string are formatted by using the conventions of the current culture. For example, for the en-US culture, the returned string might appear as `{X:1.1 Y:2.2 Z:3.3 W:4.4}`.

## Quaternion.W field

```csharp
public float W;
```

The rotation component of the quaternion.

To be added.

## Quaternion.X field

```csharp
public float X;
```

The X value of the vector component of the quaternion.

To be added.

## Quaternion.Y field

```csharp
public float Y;
```

The Y value of the vector component of the quaternion.

To be added.

## Quaternion.Z field

```csharp
public float Z;
```

The Z value of the vector component of the quaternion.

To be added.
