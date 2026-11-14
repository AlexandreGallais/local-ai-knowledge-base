---
title: "System.Numerics namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Numerics.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Numerics namespace

Contains numeric types that complement the numeric primitives, such as `Byte`, `Double`, and `Int32`, that are defined by .NET.

#### Remarks
This namespace includes the following types:

- The `BigInteger` structure, which is a nonprimitive integral type that supports arbitrarily large integers. An integral primitive such as `Byte` or `Int32` includes a `MinValue` and a `MaxValue` property, which define the lower bound and upper bound supported by that data type. In contrast, the `BigInteger` structure has no lower or upper bound, and can contain the value of any integer.

- The `Complex` structure, which represents a complex number. A complex number is a number in the form *a* + *b*i, where *a* is the real part, and *b* is the imaginary part.

- The SIMD-enabled vector types, which include `Vector2`, `Vector3`, `Vector4`, `Matrix3x2`, `Matrix4x4`, `Plane`, and `Quaternion`.
