---
title: "CSDL Specification - EF6 (part 5 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 5 of 12)

## FunctionImport Element (CSDL)

The **FunctionImport** element in conceptual schema definition language (CSDL) represents a function that is defined in the data source but available to objects through the conceptual model. For example, a Function element in the storage model can be used to represent a stored procedure in a database. A **FunctionImport** element in the conceptual model represents the corresponding function in an Entity Framework application and is mapped to the storage model function by using the FunctionImportMapping element. When the function is called in the application, the corresponding stored procedure is executed in the database.

The **FunctionImport** element can have the following child elements (in the order listed):

-   Documentation (zero or one elements allowed)
-   Parameter (zero or more elements allowed)
-   Annotation elements (zero or more elements allowed)
-   ReturnType (FunctionImport) (zero or more elements allowed)

One **Parameter** element should be defined for each parameter that the function accepts.

A return type for a function must be specified with either the **ReturnType** (FunctionImport) element or the **ReturnType** attribute (see below), but not both. The return type value must be a  collection of EdmSimpleType, EntityType, or ComplexType.

### Applicable Attributes

The table below describes the attributes that can be applied to the **FunctionImport** element.

| Attribute Name   | Is Required | Value                                                                                                                                                                                                 |
|:-----------------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**         | Yes         | The name of the imported function.                                                                                                                                                                    |
| **ReturnType**   | No          | The type that the function returns. Do not use this attribute if the function does not return a value. Otherwise, the value must be a collection of ComplexType, EntityType, or EDMSimpleType.        |
| **EntitySet**    | No          | If the function returns a collection of entity types, the value of the **EntitySet** must be the entity set to which the collection belongs. Otherwise, the **EntitySet** attribute must not be used. |
| **IsComposable** | No          | If the value is set to true, the function is composable (Table-valued Function) and can be used in a LINQ query.  The default is **false**.                                                           |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **FunctionImport** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows a **FunctionImport** element that accepts one parameter and returns a collection of entity types:

```xml
 <FunctionImport Name="GetStudentGrades"
                 EntitySet="StudentGrade"
                 ReturnType="Collection(SchoolModel.StudentGrade)">
        <Parameter Name="StudentID" Mode="In" Type="Int32" />
 </FunctionImport>
```
 

 

## Key <example-value> (CSDL)

The **Key** element is a child element of the EntityType element and defines an *entity key* (a property or a set of properties of an entity type that determine identity). The properties that make up an entity key are chosen at design time. The values of entity key <example-value> must uniquely identify an entity type instance within an entity set at run time. The properties that make up an entity key <example-value> be chosen to guarantee uniqueness of instances in an entity set. The **Key** element defines an entity key by referencing one or more of the properties of an entity type.

The **Key** element can have the following child elements:

-   PropertyRef (one or more elements)
-   Annotation elements (zero or more elements)

### Applicable Attributes

Any number of annotation attributes (custom XML attributes) may be applied to the **Key** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The example below defines an entity type named **Book**. The entity key is defined by referencing the **ISBN** property of the entity type.

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
 

The **ISBN** property is a good choice for the entity key <example-value> an International Standard Book Number (ISBN) uniquely identifies a book.

The following example shows an entity type (**Author**) that has an entity key that consists of two properties, **Name** and **Address**.

```xml
 <EntityType Name="Author">
   <Key>
     <PropertyRef Name="Name" />
     <PropertyRef Name="Address" />
   </Key>
   <Property Type="String" Name="Name" Nullable="false" />
   <Property Type="String" Name="Address" Nullable="false" />
   <NavigationProperty Name="Books" Relationship="BooksModel.WrittenBy"
                       FromRole="Author" ToRole="Book" />
 </EntityType>
```
 

Using **Name** and **Address** for the entity key is a reasonable choice, because two authors of the same name are unlikely to live at the same address. However, this choice for an entity key does not absolutely guarantee unique entity keys in an entity set. Adding a property, such as **AuthorId**, that could be used to uniquely identify an author would be recommended in this case.

 

## Member Element (CSDL)

The **Member** element is a child element of the EnumType element and defines a member of the enumerated type.

### Applicable Attributes

The table below describes the attributes that can be applied to the **FunctionImport** element.

| Attribute Name | Is Required | Value                                                                                                                                                                                    |
|:---------------|:------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the member.                                                                                                                                                                  |
| **Value**      | No          | The value of the member. By default, the first member has the value 0, and the value of each successive enumerator is incremented by 1. Multiple members with the same values may exist. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **FunctionImport** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows an **EnumType** element with three **Member** elements:

```xml
 <EnumType Name="Color">
   <Member Name="Red" Value=”1”/>
   <Member Name="Green" Value=”3” />
   <Member Name="Blue" Value=”5”/>
 </EntityType>
```
 

 

## NavigationProperty Element (CSDL)

A **NavigationProperty** element defines a navigation property, which provides a reference to the other end of an association. Unlike properties defined with the Property element, navigation properties do not define the shape and characteristics of data. They provide a way to navigate an association between two entity types.

Note that navigation properties are optional on both entity types at the ends of an association. If you define a navigation property on one entity type at the end of an association, you do not have to define a navigation property on the entity type at the other end of the association.

The data type returned by a navigation property is determined by the multiplicity of its remote association end. For example, suppose a navigation property, **OrdersNavProp**, exists on a **Customer** entity type and navigates a one-to-many association between **Customer** and **Order**. Because the remote association end for the navigation property has multiplicity many (\*), its data type is a collection (of **Order**). Similarly, if a navigation property, **CustomerNavProp**, exists on the **Order** entity type, its data type would be **Customer** since the multiplicity of the remote end is one (1).

A **NavigationProperty** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The table below describes the attributes that can be applied to the **NavigationProperty** element.

| Attribute Name   | Is Required | Value                                                                                                                                                                                                                                            |
|:-----------------|:------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**         | Yes         | The name of the navigation property.                                                                                                                                                                                                             |
| **Relationship** | Yes         | The name of an association that is within the scope of the model.                                                                                                                                                                                |
| **ToRole**       | Yes         | The end of the association at which navigation ends. The value of the **ToRole** attribute must be the same as the value of one of the **Role** attributes defined on one of the association ends (defined in the AssociationEnd element).       |
| **FromRole**     | Yes         | The end of the association from which navigation begins. The value of the **FromRole** attribute must be the same as the value of one of the **Role** attributes defined on one of the association ends (defined in the AssociationEnd element). |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **NavigationProperty** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example defines an entity type (**Book**) with two navigation properties (**PublishedBy** and **WrittenBy**):

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
