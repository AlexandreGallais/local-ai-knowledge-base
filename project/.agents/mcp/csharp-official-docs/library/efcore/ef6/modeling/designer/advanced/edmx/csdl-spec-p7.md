---
title: "CSDL Specification - EF6 (part 7 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 7 of 12)

## Property Element (CSDL)

The **Property** element in conceptual schema definition language (CSDL) can be a child of the EntityType element, the ComplexType element, or the RowType element.

### EntityType and ComplexType Element Applications

**Property** elements (as children of **EntityType** or **ComplexType** elements) define the shape and characteristics of data that an entity type instance or complex type instance will contain. Properties in a conceptual model are analogous to properties that are defined on a class. In the same way that properties on a class define the shape of the class and carry information about objects, properties in a conceptual model define the shape of an entity type and carry information about entity type instances.

The **Property** element can have the following child elements (in the order listed):

-   Documentation Element (zero or one elements allowed)
-   Annotation elements (zero or more elements allowed)

The following facets can be applied to a **Property** element: **Nullable**, **DefaultValue**, **MaxLength**, **FixedLength**, **Precision**, **Scale**, **Unicode**, **Collation**, **ConcurrencyMode**. Facets are XML attributes that provide information about how property values are stored in the data store.

> **Note:**
> Facets can only be applied to properties of type **EDMSimpleType**.

 

#### Applicable Attributes

The following table describes the attributes that can be applied to the **Property** element.

| Attribute Name                                                         | Is Required | Value                                                                                                                                                                                                                           |
|:-----------------------------------------------------------------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                                                               | Yes         | The name of the property.                                                                                                                                                                                                       |
| **Type**                                                               | Yes         | The type of the property value. The property value type must be an **EDMSimpleType** or a complex type (indicated by a fully-qualified name) that is within scope of the model.                                                 |
| **Nullable**                                                           | No          | **True** (the default value) or False depending on whether the property can have a null value.  [!NOTE]                                                                                                   |
| > In the CSDL v1 a complex type property must have `Nullable="False"`. |             |                                                                                                                                                                                                                                 |
| **DefaultValue**                                                       | No          | The default value of the property.                                                                                                                                                                                              |
| **MaxLength**                                                          | No          | The maximum length of the property value.                                                                                                                                                                                       |
| **FixedLength**                                                        | No          | **True** or **False** depending on whether the property value will be stored as a fixed length string.                                                                                                                          |
| **Precision**                                                          | No          | The precision of the property value.                                                                                                                                                                                            |
| **Scale**                                                              | No          | The scale of the property value.                                                                                                                                                                                                |
| **SRID**                                                               | No          | Spatial System Reference Identifier. Valid only for properties of spatial types. For more information, see SRID and SRID (SQL Server). |
| **Unicode**                                                            | No          | **True** or **False** depending on whether the property value will be stored as a Unicode string.                                                                                                                               |
| **Collation**                                                          | No          | A string that specifies the collating sequence to be used in the data source.                                                                                                                                                   |
| **ConcurrencyMode**                                                    | No          | **None** (the default value) or **Fixed**. If the value is set to **Fixed**, the property value will be used in optimistic concurrency checks.                                                                                  |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Property** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

#### Example

The following example shows an **EntityType** element with three **Property** elements:

```xml
 <EntityType Name="Book">
   <Key>
     <PropertyRef Name="ISBN" />
   </Key>
   <Property Type="String" Name="ISBN" Nullable="false" />
   <Property Type="String" Name="Title" Nullable="false" />
   <Property Type="Decimal" Name="Revision" Nullable="false" Precision="29" Scale="29" />
   <NavigationProperty Name="Publisher" Relationship="BooksModel.PublishedBy"
                       FromRole="Book" ToRole="Publisher" />
   <NavigationProperty Name="Authors" Relationship="BooksModel.WrittenBy"
                       FromRole="Book" ToRole="Author" />
 </EntityType>
```
 

The following example shows a **ComplexType** element with five **Property** elements:

```xml
 <ComplexType Name="Address" >
   <Property Type="String" Name="StreetAddress" Nullable="false" />
   <Property Type="String" Name="City" Nullable="false" />
   <Property Type="String" Name="StateOrProvince" Nullable="false" />
   <Property Type="String" Name="Country" Nullable="false" />
   <Property Type="String" Name="PostalCode" Nullable="false" />
 </ComplexType>
```
 

### RowType Element Application

**Property** elements (as the children of a **RowType** element) define the shape and characteristics of data that can be passed to or returned from a model-defined function.  

The **Property** element can have exactly one of the following child elements:

-   CollectionType
-   ReferenceType
-   RowType

The **Property** element can have any number child annotation elements.

> **Note:**
> Annotation elements are only allowed in CSDL v2 and later.

 

#### Applicable Attributes

The following table describes the attributes that can be applied to the **Property** element.

| Attribute Name                                                     | Is Required | Value                                                                                                                                                                                                                           |
|:-------------------------------------------------------------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                                                           | Yes         | The name of the property.                                                                                                                                                                                                       |
| **Type**                                                           | Yes         | The type of the property value.                                                                                                                                                                                                 |
| **Nullable**                                                       | No          | **True** (the default value) or **False** depending on whether the property can have a null value.  [!NOTE]                                                                                                                |
| > In CSDL v1 a complex type property must have `Nullable="False"`. |             |                                                                                                                                                                                                                                 |
| **DefaultValue**                                                   | No          | The default value of the property.                                                                                                                                                                                              |
| **MaxLength**                                                      | No          | The maximum length of the property value.                                                                                                                                                                                       |
| **FixedLength**                                                    | No          | **True** or **False** depending on whether the property value will be stored as a fixed length string.                                                                                                                          |
| **Precision**                                                      | No          | The precision of the property value.                                                                                                                                                                                            |
| **Scale**                                                          | No          | The scale of the property value.                                                                                                                                                                                                |
| **SRID**                                                           | No          | Spatial System Reference Identifier. Valid only for properties of spatial types. For more information, see SRID and SRID (SQL Server). |
| **Unicode**                                                        | No          | **True** or **False** depending on whether the property value will be stored as a Unicode string.                                                                                                                               |
| **Collation**                                                      | No          | A string that specifies the collating sequence to be used in the data source.                                                                                                                                                   |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Property** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

#### Example

The following example shows **Property** elements used to define the shape of the return type of a model-defined function.

```xml
 <Function Name="LastNamesAfter">
   <Parameter Name="someString" Type="Edm.String" />
   <ReturnType>
    <CollectionType>
      <RowType>
        <Property Name="FirstName" Type="Edm.String" Nullable="false" />
        <Property Name="LastName" Type="Edm.String" Nullable="false" />
      </RowType>
    </CollectionType>
   </ReturnType>
   <DefiningExpression>
             SELECT VALUE ROW(p.FirstName, p.LastName)
             FROM SchoolEntities.People AS p
             WHERE p.LastName &gt;= somestring
   </DefiningExpression>
 </Function>
```
