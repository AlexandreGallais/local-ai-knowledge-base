---
title: "Matrix4x4 struct (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Matrix4x4.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Matrix4x4 struct (part 2 of 4)

## Matrix4x4.CreateLookToLeftHanded(Vector3, Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateLookToLeftHanded (System.Numerics.Vector3 cameraPosition, System.Numerics.Vector3 cameraDirection, System.Numerics.Vector3 cameraUpVector);
```

Creates a left-handed view matrix.

Parameters:

- `cameraPosition`: The position of the camera.
- `cameraDirection`: The direction in which the camera is pointing.
- `cameraUpVector`: The direction that is "up" from the camera's point of view.

Returns: The left-handed view matrix.

To be added.

## Matrix4x4.CreateOrthographic(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateOrthographic (float width, float height, float zNearPlane, float zFarPlane);
```

Creates an orthographic perspective matrix from the given view volume dimensions.

Parameters:

- `width`: The width of the view volume.
- `height`: The height of the view volume.
- `zNearPlane`: The minimum Z-value of the view volume.
- `zFarPlane`: The maximum Z-value of the view volume.

Returns: The orthographic projection matrix.

To be added.

## Matrix4x4.CreateOrthographicLeftHanded(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateOrthographicLeftHanded (float width, float height, float zNearPlane, float zFarPlane);
```

Creates a left-handed orthographic perspective matrix from the given view volume dimensions.

Parameters:

- `width`: The width of the view volume.
- `height`: The height of the view volume.
- `zNearPlane`: The minimum Z-value of the view volume.
- `zFarPlane`: The maximum Z-value of the view volume.

Returns: The left-handed orthographic projection matrix.

To be added.

## Matrix4x4.CreateOrthographicOffCenter(Single, Single, Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateOrthographicOffCenter (float left, float right, float bottom, float top, float zNearPlane, float zFarPlane);
```

Creates a customized orthographic projection matrix.

Parameters:

- `left`: The minimum X-value of the view volume.
- `right`: The maximum X-value of the view volume.
- `bottom`: The minimum Y-value of the view volume.
- `top`: The maximum Y-value of the view volume.
- `zNearPlane`: The minimum Z-value of the view volume.
- `zFarPlane`: The maximum Z-value of the view volume.

Returns: The orthographic projection matrix.

To be added.

## Matrix4x4.CreateOrthographicOffCenterLeftHanded(Single, Single, Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateOrthographicOffCenterLeftHanded (float left, float right, float bottom, float top, float zNearPlane, float zFarPlane);
```

Creates a left-handed customized orthographic projection matrix.

Parameters:

- `left`: The minimum X-value of the view volume.
- `right`: The maximum X-value of the view volume.
- `bottom`: The minimum Y-value of the view volume.
- `top`: The maximum Y-value of the view volume.
- `zNearPlane`: The minimum Z-value of the view volume.
- `zFarPlane`: The maximum Z-value of the view volume.

Returns: The left-handed orthographic projection matrix.

To be added.

## Matrix4x4.CreatePerspective(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreatePerspective (float width, float height, float nearPlaneDistance, float farPlaneDistance);
```

Creates a perspective projection matrix from the given view volume dimensions.

Parameters:

- `width`: The width of the view volume at the near view plane.
- `height`: The height of the view volume at the near view plane.
- `nearPlaneDistance`: The distance to the near view plane.
- `farPlaneDistance`: The distance to the far view plane.

Returns: The perspective projection matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `nearPlaneDistance` is less than or equal to zero.

-or-

`farPlaneDistance` is less than or equal to zero.

-or-

`nearPlaneDistance` is greater than or equal to `farPlaneDistance`.

To be added.

## Matrix4x4.CreatePerspectiveFieldOfView(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreatePerspectiveFieldOfView (float fieldOfView, float aspectRatio, float nearPlaneDistance, float farPlaneDistance);
```

Creates a perspective projection matrix based on a field of view, aspect ratio, and near and far view plane distances.

Parameters:

- `fieldOfView`: The field of view in the y direction, in radians.
- `aspectRatio`: The aspect ratio, defined as view space width divided by height.
- `nearPlaneDistance`: The distance to the near view plane.
- `farPlaneDistance`: The distance to the far view plane.

Returns: The perspective projection matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `fieldOfView` is less than or equal to zero.

-or-

`fieldOfView` is greater than or equal to `Math.PI`.

`nearPlaneDistance` is less than or equal to zero.

-or-

`farPlaneDistance` is less than or equal to zero.

-or-

`nearPlaneDistance` is greater than or equal to `farPlaneDistance`.

To be added.

## Matrix4x4.CreatePerspectiveFieldOfViewLeftHanded(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreatePerspectiveFieldOfViewLeftHanded (float fieldOfView, float aspectRatio, float nearPlaneDistance, float farPlaneDistance);
```

Creates a left-handed perspective projection matrix based on a field of view, aspect ratio, and near and far view plane distances.

Parameters:

- `fieldOfView`: The field of view in the y direction, in radians.
- `aspectRatio`: The aspect ratio, defined as view space width divided by height.
- `nearPlaneDistance`: The distance to the near view plane.
- `farPlaneDistance`: The distance to the far view plane.

Returns: The left-handed perspective projection matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `fieldOfView` is less than or equal to zero.

-or-

`fieldOfView` is greater than or equal to `Math.PI`.

-or-

`nearPlaneDistance` is less than or equal to zero.

-or-

`farPlaneDistance` is less than or equal to zero.

-or-

`nearPlaneDistance` is greater than or equal to `farPlaneDistance`.

To be added.

## Matrix4x4.CreatePerspectiveLeftHanded(Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreatePerspectiveLeftHanded (float width, float height, float nearPlaneDistance, float farPlaneDistance);
```

Creates a left-handed perspective projection matrix from the given view volume dimensions.

Parameters:

- `width`: The width of the view volume at the near view plane.
- `height`: The height of the view volume at the near view plane.
- `nearPlaneDistance`: The distance to the near view plane.
- `farPlaneDistance`: The distance to the far view plane.

Returns: The left-handed perspective projection matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `nearPlaneDistance` is less than or equal to zero.

-or-

`farPlaneDistance` is less than or equal to zero.

-or-

`nearPlaneDistance` is greater than or equal to `farPlaneDistance`.

To be added.

## Matrix4x4.CreatePerspectiveOffCenter(Single, Single, Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreatePerspectiveOffCenter (float left, float right, float bottom, float top, float nearPlaneDistance, float farPlaneDistance);
```

Creates a customized perspective projection matrix.

Parameters:

- `left`: The minimum x-value of the view volume at the near view plane.
- `right`: The maximum x-value of the view volume at the near view plane.
- `bottom`: The minimum y-value of the view volume at the near view plane.
- `top`: The maximum y-value of the view volume at the near view plane.
- `nearPlaneDistance`: The distance to the near view plane.
- `farPlaneDistance`: The distance to the far view plane.

Returns: The perspective projection matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `nearPlaneDistance` is less than or equal to zero.

-or-

`farPlaneDistance` is less than or equal to zero.

-or-

`nearPlaneDistance` is greater than or equal to `farPlaneDistance`.

To be added.

## Matrix4x4.CreatePerspectiveOffCenterLeftHanded(Single, Single, Single, Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreatePerspectiveOffCenterLeftHanded (float left, float right, float bottom, float top, float nearPlaneDistance, float farPlaneDistance);
```

Creates a left-handed customized perspective projection matrix.

Parameters:

- `left`: The minimum x-value of the view volume at the near view plane.
- `right`: The maximum x-value of the view volume at the near view plane.
- `bottom`: The minimum y-value of the view volume at the near view plane.
- `top`: The maximum y-value of the view volume at the near view plane.
- `nearPlaneDistance`: The distance to the near view plane.
- `farPlaneDistance`: The distance to the far view plane.

Returns: The left-handed perspective projection matrix.

Exceptions:

- `ArgumentOutOfRangeException`: `nearPlaneDistance` is less than or equal to zero.

-or-

`farPlaneDistance` is less than or equal to zero.

-or-

`nearPlaneDistance` is greater than or equal to `farPlaneDistance`.

To be added.

## Matrix4x4.CreateReflection(Plane) method

```csharp
public static System.Numerics.Matrix4x4 CreateReflection (System.Numerics.Plane value);
```

Creates a matrix that reflects the coordinate system about a specified plane.

Parameters:

- `value`: The plane about which to create a reflection.

Returns: A new matrix expressing the reflection.

To be added.

## Matrix4x4.CreateRotationX(Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateRotationX (float radians);
```

Creates a matrix for rotating points around the X axis.

Parameters:

- `radians`: The amount, in radians, by which to rotate around the X axis.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateRotationX(Single, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateRotationX (float radians, System.Numerics.Vector3 centerPoint);
```

Creates a matrix for rotating points around the X axis from a center point.

Parameters:

- `radians`: The amount, in radians, by which to rotate around the X axis.
- `centerPoint`: The center point.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateRotationY(Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateRotationY (float radians);
```

Creates a matrix for rotating points around the Y axis.

Parameters:

- `radians`: The amount, in radians, by which to rotate around the Y-axis.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateRotationY(Single, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateRotationY (float radians, System.Numerics.Vector3 centerPoint);
```

The amount, in radians, by which to rotate around the Y axis from a center point.

Parameters:

- `radians`: The amount, in radians, by which to rotate around the Y-axis.
- `centerPoint`: The center point.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateRotationZ(Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateRotationZ (float radians);
```

Creates a matrix for rotating points around the Z axis.

Parameters:

- `radians`: The amount, in radians, by which to rotate around the Z-axis.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateRotationZ(Single, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateRotationZ (float radians, System.Numerics.Vector3 centerPoint);
```

Creates a matrix for rotating points around the Z axis from a center point.

Parameters:

- `radians`: The amount, in radians, by which to rotate around the Z-axis.
- `centerPoint`: The center point.

Returns: The rotation matrix.

To be added.

## Matrix4x4.CreateScale(Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateScale (System.Numerics.Vector3 scales);
```

Creates a scaling matrix from the specified vector scale.

Parameters:

- `scales`: The scale to use.

Returns: The scaling matrix.

To be added.

## Matrix4x4.CreateScale(Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateScale (float scale);
```

Creates a uniform scaling matrix that scale equally on each axis.

Parameters:

- `scale`: The uniform scaling factor.

Returns: The scaling matrix.

To be added.

## Matrix4x4.CreateScale(Vector3, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateScale (System.Numerics.Vector3 scales, System.Numerics.Vector3 centerPoint);
```

Creates a scaling matrix with a center point.

Parameters:

- `scales`: The vector that contains the amount to scale on each axis.
- `centerPoint`: The center point.

Returns: The scaling matrix.

To be added.

## Matrix4x4.CreateScale(Single, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateScale (float scale, System.Numerics.Vector3 centerPoint);
```

Creates a uniform scaling matrix that scales equally on each axis with a center point.

Parameters:

- `scale`: The uniform scaling factor.
- `centerPoint`: The center point.

Returns: The scaling matrix.

To be added.

## Matrix4x4.CreateScale(Single, Single, Single) method

```csharp
public static System.Numerics.Matrix4x4 CreateScale (float xScale, float yScale, float zScale);
```

Creates a scaling matrix from the specified X, Y, and Z components.

Parameters:

- `xScale`: The value to scale by on the X axis.
- `yScale`: The value to scale by on the Y axis.
- `zScale`: The value to scale by on the Z axis.

Returns: The scaling matrix.

To be added.

## Matrix4x4.CreateScale(Single, Single, Single, Vector3) method

```csharp
public static System.Numerics.Matrix4x4 CreateScale (float xScale, float yScale, float zScale, System.Numerics.Vector3 centerPoint);
```

Creates a scaling matrix that is offset by a given center point.

Parameters:

- `xScale`: The value to scale by on the X axis.
- `yScale`: The value to scale by on the Y axis.
- `zScale`: The value to scale by on the Z axis.
- `centerPoint`: The center point.

Returns: The scaling matrix.

To be added.

## Matrix4x4.CreateShadow(Vector3, Plane) method

```csharp
public static System.Numerics.Matrix4x4 CreateShadow (System.Numerics.Vector3 lightDirection, System.Numerics.Plane plane);
```

Creates a matrix that flattens geometry into a specified plane as if casting a shadow from a specified light source.

Parameters:

- `lightDirection`: The direction from which the light that will cast the shadow is coming.
- `plane`: The plane onto which the new matrix should flatten geometry so as to cast a shadow.

Returns: A new matrix that can be used to flatten geometry onto the specified plane from the specified direction.

To be added.
