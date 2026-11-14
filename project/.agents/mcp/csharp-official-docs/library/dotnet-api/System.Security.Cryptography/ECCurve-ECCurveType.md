---
title: "ECCurve+ECCurveType enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Security.Cryptography/ECCurve+ECCurveType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# ECCurve+ECCurveType enum

Namespace: `System.Security.Cryptography`

```csharp
public enum ECCurve.ECCurveType
```

Indicates how to interpret the data contained in an `ECCurve` object.

To be added.

## ECCurve+ECCurveType.Characteristic2 field

```csharp
Characteristic2
```

The curve parameters represent a characteristic 2 curve.

## ECCurve+ECCurveType.Implicit field

```csharp
Implicit
```

No curve data is interpreted. The caller is assumed to know what the curve is.

## ECCurve+ECCurveType.Named field

```csharp
Named
```

The curve parameters represent a named curve.

## ECCurve+ECCurveType.PrimeMontgomery field

```csharp
PrimeMontgomery
```

The curve parameters represent a prime curve with the formula B*y^2 = x^3 + A\*x^2 + x.

## ECCurve+ECCurveType.PrimeShortWeierstrass field

```csharp
PrimeShortWeierstrass
```

The curve parameters represent a prime curve with the formula y^2 = x^3 + A*x + B in the prime field P.

## ECCurve+ECCurveType.PrimeTwistedEdwards field

```csharp
PrimeTwistedEdwards
```

The curve parameters represent a prime curve with the formula A*x^2 + y^2 = 1 + B\*x^2\*y^2 in the prime field P.
