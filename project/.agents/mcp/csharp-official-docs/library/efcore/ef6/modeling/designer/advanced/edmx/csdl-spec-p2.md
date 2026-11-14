---
title: "CSDL Specification - EF6 (part 2 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 2 of 12)

## CollectionType Element (CSDL)

The **CollectionType** element in conceptual schema definition language (CSDL) specifies that a function parameter or function return type is a collection. The **CollectionType** element can be a child of the Parameter element or the ReturnType (Function) element. The type of collection can be specified by using either the **Type** attribute or one of the following child elements:

-   **CollectionType**
-   ReferenceType
-   RowType
-   TypeRef

> **Note:**
> A model will not validate if the type of a collection is specified with both the **Type** attribute and a child element.

 

### Applicable Attributes

The following table describes the attributes that can be applied to the **CollectionType** element. Note that the **DefaultValue**, **MaxLength**, **FixedLength**, **Precision**, **Scale**, **Unicode**, and **Collation** attributes are only applicable to collections of **EDMSimpleTypes**.

| Attribute Name                                                          | Is Required | Value                                                                                                                                                                                                                            |
|:------------------------------------------------------------------------|:------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Type**                                                                | No          | The type of the collection.                                                                                                                                                                                                      |
| **Nullable**                                                            | No          | **True** (the default value) or **False** depending on whether the property can have a null value.  [!NOTE]                                                                                                                 |
| > In the CSDL v1, a complex type property must have `Nullable="False"`. |             |                                                                                                                                                                                                                                  |
| **DefaultValue**                                                        | No          | The default value of the property.                                                                                                                                                                                               |
| **MaxLength**                                                           | No          | The maximum length of the property value.                                                                                                                                                                                        |
| **FixedLength**                                                         | No          | **True** or **False** depending on whether the property value will be stored as a fixed length string.                                                                                                                           |
| **Precision**                                                           | No          | The precision of the property value.                                                                                                                                                                                             |
| **Scale**                                                               | No          | The scale of the property value.                                                                                                                                                                                                 |
| **SRID**                                                                | No          | Spatial System Reference Identifier. Valid only for properties of spatial types.   For more information, see SRID and SRID (SQL Server) |
| **Unicode**                                                             | No          | **True** or **False** depending on whether the property value will be stored as a Unicode string.                                                                                                                                |
| **Collation**                                                           | No          | A string that specifies the collating sequence to be used in the data source.                                                                                                                                                    |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **CollectionType** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows a model-defined function that uses a **CollectionType** element to specify that the function returns a collection of **Person** entity types (as specified with the **ElementType** attribute).

```xml
 <Function Name="LastNamesAfter">
        <Parameter Name="someString" Type="Edm.String"/>
        <ReturnType>
             <CollectionType  ElementType="SchoolModel.Person"/>
        </ReturnType>
        <DefiningExpression>
             SELECT VALUE p
             FROM SchoolEntities.People AS p
             WHERE p.LastName >= someString
        </DefiningExpression>
 </Function>
```
 

The following example shows a model-defined function that uses a **CollectionType** element to specify that the function returns a collection of rows (as specified in the **RowType** element).

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
 

The following example shows a model-defined function that uses the **CollectionType** element to specify that the function accepts as a parameter a collection of **Department** entity types.

```xml
 <Function Name="GetAvgBudget">
      <Parameter Name="Departments">
          <CollectionType>
             <TypeRef Type="SchoolModel.Department"/>
          </CollectionType>
           </Parameter>
       <ReturnType Type="Collection(Edm.Decimal)"/>
       <DefiningExpression>
             SELECT VALUE AVG(d.Budget) FROM Departments AS d
       </DefiningExpression>
 </Function>
```
 

 

## ComplexType Element (CSDL)

A **ComplexType** element defines a data structure composed of **EdmSimpleType** properties or other complex types.  A complex type can be a property of an entity type or another complex type. A complex type is similar to an entity type in that a complex type defines data. However, there are some key <example-value> between complex types and entity types:

-   Complex types do not have identities (or keys) and therefore cannot exist independently. Complex types can only exist as properties of entity types or other complex types.
-   Complex types cannot participate in associations. Neither end of an association can be a complex type, and therefore navigation properties cannot be defined for complex types.
-   A complex type property cannot have a null value, though the scalar properties of a complex type may each be set to null.

A **ComplexType** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Property (zero or more elements)
-   Annotation elements (zero or more elements)

The table below describes the attributes that can be applied to the **ComplexType** element.

| Attribute Name                                                                                                 | Is Required | Value                                                                                                                                                                               |
|:---------------------------------------------------------------------------------------------------------------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Name                                                                                                           | Yes         | The name of the complex type. The name of a complex type cannot be the same as the name of another complex type, entity type, or association that is within the scope of the model. |
| BaseType                                                                                                       | No          | The name of another complex type that is the base type of the complex type that is being defined.  [!NOTE]                                                                     |
| > This attribute is not applicable in CSDL v1. Inheritance for complex types is not supported in that version. |             |                                                                                                                                                                                     |
| Abstract                                                                                                       | No          | **True** or **False** (the default value) depending on whether the complex type is an abstract type.  [!NOTE]                                                                  |
| > This attribute is not applicable in CSDL v1. Complex types in that version cannot be abstract types.         |             |                                                                                                                                                                                     |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **ComplexType** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows a complex type, **Address**, with the **EdmSimpleType** properties **StreetAddress**, **City**, **StateOrProvince**, **Country**, and **PostalCode**.

```xml
 <ComplexType Name="Address" >
   <Property Type="String" Name="StreetAddress" Nullable="false" />
   <Property Type="String" Name="City" Nullable="false" />
   <Property Type="String" Name="StateOrProvince" Nullable="false" />
   <Property Type="String" Name="Country" Nullable="false" />
   <Property Type="String" Name="PostalCode" Nullable="false" />
 </ComplexType>
```
 

To define the complex type **Address** (above) as a property of an entity type, you must declare the property type in the entity type definition. The following example shows the **Address** property as a complex type on an entity type (**Publisher**):

```xml
 <EntityType Name="Publisher">
       <Key>
         <PropertyRef Name="Id" />
       </Key>
       <Property Type="Int32" Name="Id" Nullable="false" />
       <Property Type="String" Name="Name" Nullable="false" />
       <Property Type="BooksModel.Address" Name="Address" Nullable="false" />
       <NavigationProperty Name="Books" Relationship="BooksModel.PublishedBy"
                           FromRole="Publisher" ToRole="Book" />
     </EntityType>
```
 

 

## DefiningExpression Element (CSDL)

The **DefiningExpression** element in conceptual schema definition language (CSDL) contains an Entity SQL expression that defines a function in the conceptual model.  

> **Note:**
> For validation purposes, a **DefiningExpression** element can contain arbitrary content. However, Entity Framework will throw an exception at runtime if a **DefiningExpression** element does not contain valid Entity SQL.

 

### Applicable Attributes

Any number of annotation attributes (custom XML attributes) may be applied to the **DefiningExpression** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example uses a **DefiningExpression** element to define a function that returns the number of years since a book was published. The content of the **DefiningExpression** element is written in Entity SQL.

```xml
 <Function Name="GetYearsInPrint" ReturnType="Edm.Int32" >
       <Parameter Name="book" Type="BooksModel.Book" />
       <DefiningExpression>
         Year(CurrentDateTime()) - Year(cast(book.PublishedDate as DateTime))
       </DefiningExpression>
     </Function>
```
