---
title: "CSDL Specification - EF6 (part 4 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 4 of 12)

## EntitySet Element (CSDL)

The **EntitySet** element in conceptual schema definition language is a logical container for instances of an entity type and instances of any type that is derived from that entity type. The relationship between an entity type and an entity set is analogous to the relationship between a row and a table in a relational database. Like a row, an entity type defines a set of related data, and, like a table, an entity set contains instances of that definition. An entity set provides a construct for grouping entity type instances so that they can be mapped to related data structures in a data source.  

More than one entity set for a particular entity type may be defined.

> **Note:**
> The EF Designer does not support conceptual models that contain multiple entity sets per type.

 

The **EntitySet** element can have the following child elements (in the order listed):

-   Documentation Element (zero or one elements allowed)
-   Annotation elements (zero or more elements allowed)

### Applicable Attributes

The table below describes the attributes that can be applied to the **EntitySet** element.

| Attribute Name | Is Required | Value                                                                                    |
|:---------------|:------------|:-----------------------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the entity set.                                                              |
| **EntityType** | Yes         | The fully-qualified name of the entity type for which the entity set contains instances. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **EntitySet** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows an **EntityContainer** element with three **EntitySet** elements:

```xml
 <EntityContainer Name="BooksContainer" >
   <EntitySet Name="Books" EntityType="BooksModel.Book" />
   <EntitySet Name="Publishers" EntityType="BooksModel.Publisher" />
   <EntitySet Name="Authors" EntityType="BooksModel.Author" />
   <AssociationSet Name="PublishedBy" Association="BooksModel.PublishedBy">
     <End Role="Book" EntitySet="Books" />
     <End Role="Publisher" EntitySet="Publishers" />
   </AssociationSet>
   <AssociationSet Name="WrittenBy" Association="BooksModel.WrittenBy">
     <End Role="Book" EntitySet="Books" />
     <End Role="Author" EntitySet="Authors" />
   </AssociationSet>
 </EntityContainer>
```
 

It is possible to define multiple entity sets per type (MEST). The following example defines an entity container with two entity sets for the **Book** entity type:

```xml
 <EntityContainer Name="BooksContainer" >
   <EntitySet Name="Books" EntityType="BooksModel.Book" />
   <EntitySet Name="FictionBooks" EntityType="BooksModel.Book" />
   <EntitySet Name="Publishers" EntityType="BooksModel.Publisher" />
   <EntitySet Name="Authors" EntityType="BooksModel.Author" />
   <AssociationSet Name="PublishedBy" Association="BooksModel.PublishedBy">
     <End Role="Book" EntitySet="Books" />
     <End Role="Publisher" EntitySet="Publishers" />
   </AssociationSet>
   <AssociationSet Name="BookAuthor" Association="BooksModel.BookAuthor">
     <End Role="Book" EntitySet="Books" />
     <End Role="Author" EntitySet="Authors" />
   </AssociationSet>
 </EntityContainer>
```
 

 

## EntityType Element (CSDL)

The **EntityType** element represents the structure of a top-level concept, such as a customer or order, in a conceptual model. An entity type is a template for instances of entity types in an application. Each template contains the following information:

-   A unique name. (Required.)
-   An entity key that is defined by one or more properties. (Required.)
-   Properties for containing data. (Optional.)
-   Navigation properties that allow for navigation from one end of an association to the other end. (Optional.)

In an application, an instance of an entity type represents a specific object (such as a specific customer or order). Each instance of an entity type must have a unique entity key <example-value> an entity set.

Two entity type instances are considered equal only if they are of the same type and the values of their entity keys are the same.

An **EntityType** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Key (zero or one element)
-   Property (zero or more elements)
-   NavigationProperty (zero or more elements)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The table below describes the attributes that can be applied to the **EntityType** element.

| Attribute Name                                                                                                                                  | Is Required | Value                                                                                            |
|:------------------------------------------------------------------------------------------------------------------------------------------------|:------------|:-------------------------------------------------------------------------------------------------|
| **Name**                                                                                                                                        | Yes         | The name of the entity type.                                                                     |
| **BaseType**                                                                                                                                    | No          | The name of another entity type that is the base type of the entity type that is being defined.  |
| **Abstract**                                                                                                                                    | No          | **True** or **False**, depending on whether the entity type is an abstract type.                 |
| **OpenType**                                                                                                                                    | No          | **True** or **False** depending on whether the entity type is an open entity type.  [!NOTE] |
| > The **OpenType** attribute is only applicable to entity types that are defined in conceptual models that are used with ADO.NET Data Services. |             |                                                                                                  |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **EntityType** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows an **EntityType** element with three **Property** elements and two **NavigationProperty** elements:

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
 

 

## EnumType Element (CSDL)

The **EnumType** element represents an enumerated type.

An **EnumType** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Member (zero or more elements)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The table below describes the attributes that can be applied to the **EnumType** element.

| Attribute Name     | Is Required | Value                                                                                                                                                                                         |
|:-------------------|:------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**           | Yes         | The name of the entity type.                                                                                                                                                                  |
| **IsFlags**        | No          | **True** or **False**, depending on whether the enum type can be used as a set of flags. The default value is **False.**.                                                                     |
| **UnderlyingType** | No          | **Edm.Byte**, **Edm.Int16**, **Edm.Int32**, **Edm.Int64** or **Edm.SByte** defining the range of values of the type.   The default underlying type of enumeration elements is **Edm.Int32.**. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **EnumType** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows an **EnumType** element with three **Member** elements:

```xml
 <EnumType Name="Color" IsFlags=”false” UnderlyingTyp=”Edm.Byte”>
   <Member Name="Red" />
   <Member Name="Green" />
   <Member Name="Blue" />
 </EntityType>
```
 

 

## Function Element (CSDL)

The **Function** element in conceptual schema definition language (CSDL) is used to define or declare functions in the conceptual model. A function is defined by using a DefiningExpression element.  

A **Function** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Parameter (zero or more elements)
-   DefiningExpression (zero or one element)
-   ReturnType (Function) (zero or one element)
-   Annotation elements (zero or more elements)

A return type for a function must be specified with either the **ReturnType** (Function) element or the **ReturnType** attribute (see below), but not both. The possible return types are any EdmSimpleType, entity type, complex type, row type, or ref type (or a collection of one of these types).

### Applicable Attributes

The table below describes the attributes that can be applied to the **Function** element.

| Attribute Name | Is Required | Value                              |
|:---------------|:------------|:-----------------------------------|
| **Name**       | Yes         | The name of the function.          |
| **ReturnType** | No          | The type returned by the function. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Function** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example uses a **Function** element to define a function that returns the number of years since an instructor was hired.

```xml
 <Function Name="YearsSince" ReturnType="Edm.Int32">
   <Parameter Name="date" Type="Edm.DateTime" />
   <DefiningExpression>
     Year(CurrentDateTime()) - Year(date)
   </DefiningExpression>
 </Function>
```
