---
title: "CSDL Specification - EF6 (part 6 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 6 of 12)

## OnDelete Element (CSDL)

The **OnDelete** element in conceptual schema definition language (CSDL) defines behavior that is connected with an association. If the **Action** attribute is set to **Cascade** on one end of an association, related entity types on the other end of the association are deleted when the entity type on the first end is deleted. If the association between two entity types is a primary key-to-primary key <example-value>, then a loaded dependent object is deleted when the principal object on the other end of the association is deleted regardless of the **OnDelete** specification.  

> **Note:**
> The **OnDelete** element only affects the runtime behavior of an application; it does not affect behavior in the data source. The behavior defined in the data source should be the same as the behavior defined in the application.

 

An **OnDelete** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The table below describes the attributes that can be applied to the **OnDelete** element.

| Attribute Name | Is Required | Value                                                                                                                                                                                                                         |
|:---------------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Action**     | Yes         | **Cascade** or **None**. If **Cascade**, dependent entity types will be deleted when the principal entity type is deleted. If **None**, dependent entity types will not be deleted when the principal entity type is deleted. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Association** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows an **Association** element that defines the **CustomerOrders** association. The **OnDelete** element indicates that all **Orders** that are related to a particular **Customer** and have been loaded into the ObjectContext will be deleted when the **Customer** is deleted.

```xml
 <Association Name="CustomerOrders">
   <End Type="ExampleModel.Customer" Role="Customer" Multiplicity="1">
         <OnDelete Action="Cascade" />
   </End>
   <End Type="ExampleModel.Order" Role="Order" Multiplicity="*" />
 </Association>
```
 

 

## Parameter Element (CSDL)

The **Parameter** element in conceptual schema definition language (CSDL) can be a child of the FunctionImport element or the Function element.

### FunctionImport Element Application

A **Parameter** element (as a child of the **FunctionImport** element) is used to define input and output parameters for function imports that are declared in CSDL.

The **Parameter** element can have the following child elements (in the order listed):

-   Documentation (zero or one elements allowed)
-   Annotation elements (zero or more elements allowed)

#### Applicable Attributes

The following table describes the attributes that can be applied to the **Parameter** element.

| Attribute Name | Is Required | Value                                                                                                                                                                                                                           |
|:---------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the parameter.                                                                                                                                                                                                      |
| **Type**       | Yes         | The parameter type. The value must be an **EDMSimpleType** or a complex type that is within the scope of the model.                                                                                                             |
| **Mode**       | No          | **In**, **Out**, or **InOut** depending on whether the parameter is an input, output, or input/output parameter.                                                                                                                |
| **MaxLength**  | No          | The maximum allowed length of the parameter.                                                                                                                                                                                    |
| **Precision**  | No          | The precision of the parameter.                                                                                                                                                                                                 |
| **Scale**      | No          | The scale of the parameter.                                                                                                                                                                                                     |
| **SRID**       | No          | Spatial System Reference Identifier. Valid only for parameters of spatial types. For more information, see SRID and SRID (SQL Server). |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Parameter** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

#### Example

The following example shows a **FunctionImport** element with one **Parameter** child element. The function accepts one input parameter and returns a collection of entity types.

```xml
 <FunctionImport Name="GetStudentGrades"
                 EntitySet="StudentGrade"
                 ReturnType="Collection(SchoolModel.StudentGrade)">
        <Parameter Name="StudentID" Mode="In" Type="Int32" />
 </FunctionImport>
```
 

### Function Element Application

A **Parameter** element (as a child of the **Function** element) defines parameters for functions that are defined or declared in a conceptual model.

The **Parameter** element can have the following child elements (in the order listed):

-   Documentation (zero or one elements)
-   CollectionType (zero or one elements)
-   ReferenceType (zero or one elements)
-   RowType (zero or one elements)

> **Note:**
> Only one of the **CollectionType**, **ReferenceType**, or **RowType** elements can be a child element of a **Property** element.

 

-   Annotation elements (zero or more elements allowed)

> **Note:**
> Annotation elements must appear after all other child elements. Annotation elements are only allowed in CSDL v2 and later.

 

#### Applicable Attributes

The following table describes the attributes that can be applied to the **Parameter** element.

| Attribute Name   | Is Required | Value                                                                                                                                                                                                                           |
|:-----------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**         | Yes         | The name of the parameter.                                                                                                                                                                                                      |
| **Type**         | No          | The parameter type. A parameter can be any of the following types (or collections of these types):  **EdmSimpleType**  entity type  complex type  row type  reference type                             |
| **Nullable**     | No          | **True** (the default value) or **False** depending on whether the property can have a **null** value.                                                                                                                          |
| **DefaultValue** | No          | The default value of the property.                                                                                                                                                                                              |
| **MaxLength**    | No          | The maximum length of the property value.                                                                                                                                                                                       |
| **FixedLength**  | No          | **True** or **False** depending on whether the property value will be stored as a fixed length string.                                                                                                                          |
| **Precision**    | No          | The precision of the property value.                                                                                                                                                                                            |
| **Scale**        | No          | The scale of the property value.                                                                                                                                                                                                |
| **SRID**         | No          | Spatial System Reference Identifier. Valid only for properties of spatial types. For more information, see SRID and SRID (SQL Server). |
| **Unicode**      | No          | **True** or **False** depending on whether the property value will be stored as a Unicode string.                                                                                                                               |
| **Collation**    | No          | A string that specifies the collating sequence to be used in the data source.                                                                                                                                                   |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Parameter** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

#### Example

The following example shows a **Function** element that uses one **Parameter** child element to define a function parameter.

```xml
 <Function Name="GetYearsEmployed" ReturnType="Edm.Int32">
 <Parameter Name="Instructor" Type="SchoolModel.Person" />
   <DefiningExpression>
   Year(CurrentDateTime()) - Year(cast(Instructor.HireDate as DateTime))
   </DefiningExpression>
 </Function>
```

 

## Principal Element (CSDL)

The **Principal** element in conceptual schema definition language (CSDL) is a child element to the ReferentialConstraint element that defines the principal end of a referential constraint. A **ReferentialConstraint** element defines functionality that is similar to a referential integrity constraint in a relational database. In the same way that a column (or columns) from a database table can reference the primary key of another table, a property (or properties) of an entity type can reference the entity key of another entity type. The entity type that is referenced is called the *principal end* of the constraint. The entity type that references the principal end is called the *dependent end* of the constraint. **PropertyRef** elements are used to specify which keys are referenced by the dependent end.

The **Principal** element can have the following child elements (in the order listed):

-   PropertyRef (one or more elements)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The table below describes the attributes that can be applied to the **Principal** element.

| Attribute Name | Is Required | Value                                                                |
|:---------------|:------------|:---------------------------------------------------------------------|
| **Role**       | Yes         | The name of the entity type on the principal end of the association. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Principal** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows a **ReferentialConstraint** element that is part of the definition of the **PublishedBy** association. The **Id** property of the **Publisher** entity type makes up the principal end of the referential constraint.

```xml
 <Association Name="PublishedBy">
   <End Type="BooksModel.Book" Role="Book" Multiplicity="*" >
   </End>
   <End Type="BooksModel.Publisher" Role="Publisher" Multiplicity="1" />
   <ReferentialConstraint>
     <Principal Role="Publisher">
       <PropertyRef Name="Id" />
     </Principal>
     <Dependent Role="Book">
       <PropertyRef Name="PublisherId" />
     </Dependent>
   </ReferentialConstraint>
 </Association>
```
