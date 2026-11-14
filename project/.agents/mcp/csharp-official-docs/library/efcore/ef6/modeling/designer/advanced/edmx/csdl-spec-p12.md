---
title: "CSDL Specification - EF6 (part 12 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 12 of 12)

## Facets (CSDL)

Facets in conceptual schema definition language (CSDL) represent constraints on properties of entity types and complex types. Facets appear as XML attributes on the following CSDL elements:

-   Property
-   TypeRef
-   Parameter

The following table describes the facets that are supported in CSDL. All facets are optional. Some facets listed below are used by the Entity Framework when generating a database from a conceptual model.

> **Note:**
> For information about data types in a conceptual model, see Conceptual Model Types (CSDL).

| Facet               | Description                                                                                                                                                                                                                                                   | Applies to                                                                                                                                                                                                                                                                                                                                                                           | Used for the database generation | Used by the runtime |
|:--------------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|:---------------------------------|:--------------------|
| **Collation**       | Specifies the collating sequence (or sorting sequence) to be used when performing comparison and ordering operations on values of the property.                                                                                                               | **Edm.String**                                                                                                                                                                                                                                                                                                                                                                       | Yes                              | No                  |
| **ConcurrencyMode** | Indicates that the value of the property should be used for optimistic concurrency checks.                                                                                                                                                                    | All **EDMSimpleType** properties                                                                                                                                                                                                                                                                                                                                                     | No                               | Yes                 |
| **Default**         | Specifies the default value of the property if no value is supplied upon instantiation.                                                                                                                                                                       | All **EDMSimpleType** properties                                                                                                                                                                                                                                                                                                                                                     | Yes                              | Yes                 |
| **FixedLength**     | Specifies whether the length of the property value can vary.                                                                                                                                                                                                  | **Edm.Binary**, **Edm.String**                                                                                                                                                                                                                                                                                                                                                       | Yes                              | No                  |
| **MaxLength**       | Specifies the maximum length of the property value.                                                                                                                                                                                                           | **Edm.Binary**, **Edm.String**                                                                                                                                                                                                                                                                                                                                                       | Yes                              | No                  |
| **Nullable**        | Specifies whether the property can have a **null** value.                                                                                                                                                                                                     | All **EDMSimpleType** properties                                                                                                                                                                                                                                                                                                                                                     | Yes                              | Yes                 |
| **Precision**       | For properties of type **Decimal**, specifies the number of digits a property value can have. For properties of type **Time**, **DateTime**, and **DateTimeOffset**, specifies the number of digits for the fractional part of seconds of the property value. | **Edm.DateTime**, **Edm.DateTimeOffset**, **Edm.Decimal**, **Edm.Time**                                                                                                                                                                                                                                                                                                              | Yes                              | No                  |
| **Scale**           | Specifies the number of digits to the right of the decimal point for the property value.                                                                                                                                                                      | **Edm.Decimal**                                                                                                                                                                                                                                                                                                                                                                      | Yes                              | No                  |
| **SRID**            | Specifies the Spatial System Reference System ID. For more information, see SRID and SRID (SQL Server).                                                              | **Edm.Geography, Edm.GeographyPoint, Edm.GeographyLineString, Edm.GeographyPolygon, Edm.GeographyMultiPoint, Edm.GeographyMultiLineString, Edm.GeographyMultiPolygon, Edm.GeographyCollection, Edm.Geometry, Edm.GeometryPoint, Edm.GeometryLineString, Edm.GeometryPolygon, Edm.GeometryMultiPoint, Edm.GeometryMultiLineString, Edm.GeometryMultiPolygon, Edm.GeometryCollection** | No                               | Yes                 |
| **Unicode**         | Indicates whether the property value is stored as Unicode.                                                                                                                                                                                                    | **Edm.String**                                                                                                                                                                                                                                                                                                                                                                       | Yes                              | Yes                 |

>**Note:**
> When generating a database from a conceptual model, the Generate Database Wizard will recognize the value of the **StoreGeneratedPattern** attribute on a **Property** element if it is in the following namespace: `https://schemas.microsoft.com/ado/2009/02/edm/annotation`. The supported values for the attribute are **Identity** and **Computed**. A value of **Identity** will produce a database column with an identity value that is generated in the database. A value of **Computed** will produce a column with a value that is computed in the database.

### Example

The following example shows facets applied to the properties of an entity type:

```xml
 <EntityType Name="Product">
   <Key>
     <PropertyRef Name="ProductId" />
   </Key>
   <Property Type="Int32"
             Name="ProductId" Nullable="false"
             a:StoreGeneratedPattern="Identity"
    xmlns:a="https://schemas.microsoft.com/ado/2009/02/edm/annotation" />
   <Property Type="String"
             Name="ProductName"
             Nullable="false"
             MaxLength="50" />
   <Property Type="String"
             Name="Location"
             Nullable="true"
             MaxLength="25" />
 </EntityType>
```
