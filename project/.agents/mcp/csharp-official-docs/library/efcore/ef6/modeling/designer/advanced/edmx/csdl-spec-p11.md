---
title: "CSDL Specification - EF6 (part 11 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 11 of 12)

## Conceptual Model Types (CSDL)

Conceptual schema definition language (CSDL) supports a set of abstract primitive data types, called **EDMSimpleTypes**, that define properties in a conceptual model. **EDMSimpleTypes** are proxies for primitive data types that are supported in the storage or hosting environment.

The table below lists the primitive data types that are supported by CSDL. The table also lists the facets that can be applied to each **EDMSimpleType**.

| EDMSimpleType                    | Description                                                | Applicable Facets                                                        |
|:---------------------------------|:-----------------------------------------------------------|:-------------------------------------------------------------------------|
| **Edm.Binary**                   | Contains binary data.                                      | MaxLength, FixedLength, Nullable, Default                                |
| **Edm.Boolean**                  | Contains the value **true** or **false**.                  | Nullable, Default                                                        |
| **Edm.Byte**                     | Contains an unsigned 8-bit integer value.                  | Precision, Nullable, Default                                             |
| **Edm.DateTime**                 | Represents a date and time.                                | Precision, Nullable, Default                                             |
| **Edm.DateTimeOffset**           | Contains a date and time as an offset in minutes from GMT. | Precision, Nullable, Default                                             |
| **Edm.Decimal**                  | Contains a numeric value with fixed precision and scale.   | Precision, Nullable, Default                                             |
| **Edm.Double**                   | Contains a floating point number with 15-digit precision   | Precision, Nullable, Default                                             |
| **Edm.Float**                    | Contains a floating point number with 7-digit precision.   | Precision, Nullable, Default                                             |
| **Edm.Guid**                     | Contains a 16-byte unique identifier.                      | Precision, Nullable, Default                                             |
| **Edm.Int16**                    | Contains a signed 16-bit integer value.                    | Precision, Nullable, Default                                             |
| **Edm.Int32**                    | Contains a signed 32-bit integer value.                    | Precision, Nullable, Default                                             |
| **Edm.Int64**                    | Contains a signed 64-bit integer value.                    | Precision, Nullable, Default                                             |
| **Edm.SByte**                    | Contains a signed 8-bit integer value.                     | Precision, Nullable, Default                                             |
| **Edm.String**                   | Contains character data.                                   | Unicode, FixedLength, MaxLength, Collation, Precision, Nullable, Default |
| **Edm.Time**                     | Contains a time of day.                                    | Precision, Nullable, Default                                             |
| **Edm.Geography**                |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeographyPoint**           |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeographyLineString**      |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeographyPolygon**         |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeographyMultiPoint**      |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeographyMultiLineString** |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeographyMultiPolygon**    |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeographyCollection**      |                                                            | Nullable, Default, SRID                                                  |
| **Edm.Geometry**                 |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeometryPoint**            |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeometryLineString**       |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeometryPolygon**          |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeometryMultiPoint**       |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeometryMultiLineString**  |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeometryMultiPolygon**     |                                                            | Nullable, Default, SRID                                                  |
| **Edm.GeometryCollection**       |                                                            | Nullable, Default, SRID                                                  |
