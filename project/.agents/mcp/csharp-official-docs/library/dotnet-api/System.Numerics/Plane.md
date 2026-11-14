---
title: "Plane struct"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Plane.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Plane struct

Namespace: `System.Numerics`

```csharp
public struct Plane : IEquatable<System.Numerics.Plane>
```

Represents a plane in three-dimensional space.

#### Remarks

## Plane.Plane(Vector4) constructor

```csharp
public Plane (System.Numerics.Vector4 value);
```

Creates a `Plane` object from a specified four-dimensional vector.

Parameters:

- `value`: A vector whose first three elements describe the normal vector, and whose `Vector4.W` defines the distance along that normal from the origin.

To be added.

## Plane.Plane(Vector3, Single) constructor

```csharp
public Plane (System.Numerics.Vector3 normal, float d);
```

Creates a `Plane` object from a specified normal and the distance along the normal from the origin.

Parameters:

- `normal`: The plane's normal vector.
- `d`: The plane's distance from the origin along its normal vector.

To be added.

## Plane.Plane(Single, Single, Single, Single) constructor

```csharp
public Plane (float x, float y, float z, float d);
```

Creates a `Plane` object from the X, Y, and Z components of its normal, and its distance from the origin on that normal.

Parameters:

- `x`: The X component of the normal.
- `y`: The Y component of the normal.
- `z`: The Z component of the normal.
- `d`: The distance of the plane along its normal from the origin.

To be added.

## Plane.Create(Vector4) method

```csharp
public static System.Numerics.Plane Create (System.Numerics.Vector4 value);
```

Creates a `Plane` from a specified four-dimensional vector.

Parameters:

- `value`: A vector whose first three elements describe the normal vector, and whose `Vector4.W` defines the distance along that normal from the origin.

Returns: To be added.

A `Plane` created using `value`.

## Plane.Create(Vector3, Single) method

```csharp
public static System.Numerics.Plane Create (System.Numerics.Vector3 normal, float d);
```

Creates a `Plane` from a specified normal and the distance along the normal from the origin.

Parameters:

- `normal`: The plane's normal vector.
- `d`: The plane's distance from the origin along its normal vector.

Returns: A `Plane` created from a specified normal and the distance along the normal from the origin.

To be added.

## Plane.Create(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Plane Create (float x, float y, float z, float d);
```

Creates a `Plane` from the X, Y, and Z components of its normal, and its distance from the origin on that normal.

Parameters:

- `x`: The X component of the normal.
- `y`: The Y component of the normal.
- `z`: The Z component of the normal.
- `d`: The distance of the plane along its normal from the origin.

Returns: A `Plane` created from the X, Y, and Z components of its normal, and its distance from the origin on that normal.

To be added.

## Plane.CreateFromVertices(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Plane CreateFromVertices (System.Numerics.Vector3 point1, System.Numerics.Vector3 point2, System.Numerics.Vector3 point3);
```

Creates a `Plane` object that contains three specified points.

Parameters:

- `point1`: The first point defining the plane.
- `point2`: The second point defining the plane.
- `point3`: The third point defining the plane.

Returns: The plane containing the three points.

To be added.

## Plane.Dot(Plane, Vector4) method

```csharp
public static float Dot (System.Numerics.Plane plane, System.Numerics.Vector4 value);
```

Calculates the dot product of a plane and a 4-dimensional vector.

Parameters:

- `plane`: The plane.
- `value`: The four-dimensional vector.

Returns: The dot product.

To be added.

## Plane.DotCoordinate(Plane, Vector3) method

```csharp
public static float DotCoordinate (System.Numerics.Plane plane, System.Numerics.Vector3 value);
```

Returns the dot product of a specified three-dimensional vector and the normal vector of this plane plus the distance (`Plane.D`) value of the plane.

Parameters:

- `plane`: The plane.
- `value`: The 3-dimensional vector.

Returns: The dot product.

To be added.

## Plane.DotNormal(Plane, Vector3) method

```csharp
public static float DotNormal (System.Numerics.Plane plane, System.Numerics.Vector3 value);
```

Returns the dot product of a specified three-dimensional vector and the `Plane.Normal` vector of this plane.

Parameters:

- `plane`: The plane.
- `value`: The three-dimensional vector.

Returns: The dot product.

To be added.

## Plane.Equals(Plane) method

```csharp
public readonly bool Equals (System.Numerics.Plane other);
```

Returns a value that indicates whether this instance and another plane object are equal.

Parameters:

- `other`: The other plane.

Returns: `true` if the two planes are equal; otherwise, `false`.

#### Remarks
Two `Plane` objects are equal if their `Normal` and `D` fields are equal.

## Plane.Equals(Object) method

```csharp
public override readonly bool Equals (object? obj);
```

Returns a value that indicates whether this instance and a specified object are equal.

Parameters:

- `obj`: The object to compare with the current instance.

Returns: `true` if the current instance and `obj` are equal; otherwise, `false`. If `obj` is `null`, the method returns `false`.

#### Remarks
The current instance and `obj` are equal if `obj` is a `Plane` object and their `Normal` and `D` fields are equal.

## Plane.GetHashCode() method

```csharp
public override readonly int GetHashCode ();
```

Returns the hash code for this instance.

Returns: The hash code.

To be added.

## Plane.Normalize(Plane) method

```csharp
public static System.Numerics.Plane Normalize (System.Numerics.Plane value);
```

Creates a new `Plane` object whose normal vector is the source plane's normal vector normalized.

Parameters:

- `value`: The source plane.

Returns: The normalized plane.

To be added.

## Plane.op_Equality(Plane, Plane) method

```csharp
public static bool operator == (System.Numerics.Plane value1, System.Numerics.Plane value2);
```

Returns a value that indicates whether two planes are equal.

Parameters:

- `value1`: The first plane to compare.
- `value2`: The second plane to compare.

Returns: `true` if `value1` and `value2` are equal; otherwise, `false`.

#### Remarks
Two `Plane` objects are equal if their `Normal` and `D` fields are equal.

The `Plane.op_Equality` method defines the operation of the equality operator for `Plane` objects.

## Plane.op_Inequality(Plane, Plane) method

```csharp
public static bool operator != (System.Numerics.Plane value1, System.Numerics.Plane value2);
```

Returns a value that indicates whether two planes are not equal.

Parameters:

- `value1`: The first plane to compare.
- `value2`: The second plane to compare.

Returns: `true` if `value1` and `value2` are not equal; otherwise, `false`.

#### Remarks
The `Plane.op_Inequality` method defines the operation of the inequality operator for `Plane` objects.

## Plane.ToString() method

```csharp
public override readonly string ToString ();
```

Returns the string representation of this plane object.

Returns: A string that represents this `Plane` object.

#### Remarks
The string representation of a `Plane` object use the formatting conventions of the current culture to format the numeric values in the returned string. For example, a `Plane` object whose string representation is formatted by using the conventions of the en-US culture might appear as `{Normal:<1.1, 2.2, 3.3> D:4.4}`.

## Plane.Transform(Plane, Matrix4x4) method

```csharp
public static System.Numerics.Plane Transform (System.Numerics.Plane plane, System.Numerics.Matrix4x4 matrix);
```

Transforms a normalized plane by a 4x4 matrix.

Parameters:

- `plane`: The normalized plane to transform.
- `matrix`: The transformation matrix to apply to `plane`.

Returns: The transformed plane.

#### Remarks
`plane` must already be normalized so that its `Normal` vector is of unit length before this method is called.

## Plane.Transform(Plane, Quaternion) method

```csharp
public static System.Numerics.Plane Transform (System.Numerics.Plane plane, System.Numerics.Quaternion rotation);
```

Transforms a normalized plane by a Quaternion rotation.

Parameters:

- `plane`: The normalized plane to transform.
- `rotation`: The Quaternion rotation to apply to the plane.

Returns: A new plane that results from applying the Quaternion rotation.

#### Remarks
`plane` must already be normalized so that its `Normal` vector is of unit length before this method is called.

## Plane.D field

```csharp
public float D;
```

The distance of the plane along its normal from the origin.

To be added.

## Plane.Normal field

```csharp
public System.Numerics.Vector3 Normal;
```

The normal vector of the plane.

To be added.
