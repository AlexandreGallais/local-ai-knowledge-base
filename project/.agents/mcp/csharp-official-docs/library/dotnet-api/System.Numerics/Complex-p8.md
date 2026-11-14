---
title: "Complex struct (part 8 of 8)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Numerics/Complex.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Complex struct (part 8 of 8)

## Complex.ImaginaryOne field

```csharp
public static readonly System.Numerics.Complex ImaginaryOne;
```

Returns a new `Complex` instance with a real number equal to zero and an imaginary number equal to one.

#### Examples
The following example instantiates a `Complex` value by using the `ImaginaryOne` property. It then compares this value to another value that is instantiated by calling the `Complex` constructor with a real part equal to zero and an imaginary part equal to one. As the output from the example shows, the two values are equal.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/ImaginaryOne/imaginaryone1.cs._

## Complex.Infinity field

```csharp
public static readonly System.Numerics.Complex Infinity;
```

Represents infinity as a complex number.

To be added.

## Complex.NaN field

```csharp
public static readonly System.Numerics.Complex NaN;
```

Represents a complex instance that is not a number (NaN).

To be added.

## Complex.One field

```csharp
public static readonly System.Numerics.Complex One;
```

Returns a new `Complex` instance with a real number equal to one and an imaginary number equal to zero.

#### Examples
The following example instantiates a `Complex` value by using the `One` property. It then compares this value to another value that is instantiated by calling the `Complex` constructor with a real part equal to one and an imaginary part equal to zero. As the output from the example shows, the two values are equal.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/One/one1.cs._

## Complex.Zero field

```csharp
public static readonly System.Numerics.Complex Zero;
```

Returns a new `Complex` instance with a real number equal to zero and an imaginary number equal to zero.

#### Remarks
The `Zero` property is most frequently used to compare a `Complex` value to zero.

#### Examples
The following example instantiates a `Complex` value by using the `Zero` property. It then compares this value to another value that is instantiated by calling the `Complex` constructor with a real part equal to zero and an imaginary part equal to zero. As the output from the example shows, the two values are equal.

_Code sample not included: ~/snippets/csharp/System.Numerics/Complex/Zero/zero1.cs._
