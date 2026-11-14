---
title: "CSDL Specification - EF6 (part 8 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 8 of 12)

## PropertyRef Element (CSDL)

The **PropertyRef** element in conceptual schema definition language (CSDL) references a property of an entity type to indicate that the property will perform one of the following roles:

-   Part of the entity's key (a property or a set of properties of an entity type that determine identity). One or more **PropertyRef** elements can be used to define an entity key.
-   The dependent or principal end of a referential constraint.

The **PropertyRef** element can only have annotation elements (zero or more) as child elements.

> **Note:**
> Annotation elements are only allowed in CSDL v2 and later.

 

### Applicable Attributes

The table below describes the attributes that can be applied to the **PropertyRef** element.

| Attribute Name | Is Required | Value                                |
|:---------------|:------------|:-------------------------------------|
| **Name**       | Yes         | The name of the referenced property. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **PropertyRef** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The example below defines an entity type (**Book**). The entity key is defined by referencing the **ISBN** property of the entity type.

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
 

In the next example, two **PropertyRef** elements are used to indicate that two properties (**Id** and **PublisherId**) are the principal and dependent ends of a referential constraint.

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
 

 

## ReferenceType Element (CSDL)

The **ReferenceType** element in conceptual schema definition language (CSDL) specifies a reference to an entity type. The **ReferenceType** element can be a child of the following elements:

-   ReturnType (Function)
-   Parameter
-   CollectionType

The **ReferenceType** element is used when defining a parameter or return type for a function.

A **ReferenceType** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The table below describes the attributes that can be applied to the **ReferenceType** element.

| Attribute Name | Is Required | Value                                         |
|:---------------|:------------|:----------------------------------------------|
| **Type**       | Yes         | The name of the entity type being referenced. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **ReferenceType** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows the **ReferenceType** element used as a child of a **Parameter** element in a model-defined function that accepts a reference to a **Person** entity type:

```xml
 <Function Name="GetYearsEmployed" ReturnType="Edm.Int32">
   <Parameter Name="instructor">
     <ReferenceType Type="SchoolModel.Person" />
   </Parameter>
   <DefiningExpression>
   Year(CurrentDateTime()) - Year(cast(instructor.HireDate as DateTime))
   </DefiningExpression>
 </Function>
```
 

The following example shows the **ReferenceType** element used as a child of a **ReturnType** (Function) element in a model-defined function that returns a reference to a **Person** entity type:

```xml
 <Function Name="GetPersonReference">
     <Parameter Name="p" Type="SchoolModel.Person" />
     <ReturnType>
         <ReferenceType Type="SchoolModel.Person" />
     </ReturnType>
     <DefiningExpression>
           REF(p)
     </DefiningExpression>
 </Function>
```
 

 

## ReferentialConstraint Element (CSDL)

A **ReferentialConstraint** element in conceptual schema definition language (CSDL) defines functionality that is similar to a referential integrity constraint in a relational database. In the same way that a column (or columns) from a database table can reference the primary key of another table, a property (or properties) of an entity type can reference the entity key of another entity type. The entity type that is referenced is called the *principal end* of the constraint. The entity type that references the principal end is called the *dependent end* of the constraint.

If a foreign key that is exposed on one entity type references a property on another entity type, the **ReferentialConstraint** element defines an association between the two entity types. Because the **ReferentialConstraint** element provides information about how two entity types are related, no corresponding AssociationSetMapping element is necessary in the mapping specification language (MSL). An association between two entity types that do not have foreign keys exposed must have a corresponding **AssociationSetMapping** element in order to map association information to the data source.

If a foreign key is not exposed on an entity type, the **ReferentialConstraint** element can only define a primary key-to-primary key <example-value> between the entity type and another entity type.

A **ReferentialConstraint** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Principal (exactly one element)
-   Dependent (exactly one element)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The **ReferentialConstraint** element can have any number of annotation attributes (custom XML attributes). However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows a **ReferentialConstraint** element being used as part of the definition of the **PublishedBy** association.

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
 

 

## ReturnType (Function) Element (CSDL)

The **ReturnType** (Function) element in conceptual schema definition language (CSDL) specifies the return type for a function that is defined in a Function element. A function return type can also be specified with a **ReturnType** attribute.

Return types can be any **EdmSimpleType**, entity type, complex type, row type, ref type, or a collection of one of these types.

The return type of a function can be specified with either the **Type** attribute of the **ReturnType** (Function) element, or with one of the following child elements:

-   CollectionType
-   ReferenceType
-   RowType

> **Note:**
> A model will not validate if you specify a function return type with both the **Type** attribute of the **ReturnType** (Function) element and one of the child elements.

 

### Applicable Attributes

The following table describes the attributes that can be applied to the **ReturnType** (Function) element.

| Attribute Name | Is Required | Value                              |
|:---------------|:------------|:-----------------------------------|
| **ReturnType** | No          | The type returned by the function. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **ReturnType** (Function) element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example uses a **Function** element to define a function that returns the number of years a book has been in print. Note that the return type is specified by the **Type** attribute of a **ReturnType** (Function) element.

```xml
 <Function Name="GetYearsInPrint">
   <ReturnType Type=="Edm.Int32">
   <Parameter Name="book" Type="BooksModel.Book" />
   <DefiningExpression>
    Year(CurrentDateTime()) - Year(cast(book.PublishedDate as DateTime))
   </DefiningExpression>
 </Function>
```
 

 

## ReturnType (FunctionImport) Element (CSDL)

The **ReturnType** (FunctionImport) element in conceptual schema definition language (CSDL) specifies the return type for a function that is defined in a FunctionImport element. A function return type can also be specified with a **ReturnType** attribute.

Return types can be any collection of entity type, complex type,or **EdmSimpleType**,

The return type of a function is specified with the **Type** attribute of the **ReturnType** (FunctionImport) element.

### Applicable Attributes

The following table describes the attributes that can be applied to the **ReturnType** (FunctionImport) element.

| Attribute Name | Is Required | Value                                                                                                                                                                                                 |
|:---------------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Type**       | No          | The type that the function returns. The value must be a collection of ComplexType, EntityType, or EDMSimpleType.                                                                                      |
| **EntitySet**  | No          | If the function returns a collection of entity types, the value of the **EntitySet** must be the entity set to which the collection belongs. Otherwise, the **EntitySet** attribute must not be used. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **ReturnType** (FunctionImport) element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example uses a **FunctionImport** that returns books and publishers. Note that the function returns two result sets and therefore two **ReturnType** (FunctionImport) elements are specified.

```xml
 <FunctionImport Name="GetBooksAndPublishers">
   <ReturnType Type=="Collection(BooksModel.Book )" EntitySet=”Books”>
   <ReturnType Type=="Collection(BooksModel.Publisher)" EntitySet=”Publishers”>
 </FunctionImport>
```
 

 

## RowType Element (CSDL)

A **RowType** element in conceptual schema definition language (CSDL) defines an unnamed structure as a parameter or return type for a function defined in the conceptual model.

A **RowType** element can be the child of the following elements:

-   CollectionType
-   Parameter
-   ReturnType (Function)

A **RowType** element can have the following child elements (in the order listed):

-   Property (one or more)
-   Annotation elements (zero or more)

### Applicable Attributes

Any number of annotation attributes (custom XML attributes) may be applied to the **RowType** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

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
