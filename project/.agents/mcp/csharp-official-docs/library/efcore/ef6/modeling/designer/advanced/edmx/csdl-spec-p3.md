---
title: "CSDL Specification - EF6 (part 3 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 3 of 12)

## Dependent Element (CSDL)

The **Dependent** element in conceptual schema definition language (CSDL) is a child element to the ReferentialConstraint element and defines the dependent end of a referential constraint. A **ReferentialConstraint** element defines functionality that is similar to a referential integrity constraint in a relational database. In the same way that a column (or columns) from a database table can reference the primary key of another table, a property (or properties) of an entity type can reference the entity key of another entity type. The entity type that is referenced is called the *principal end* of the constraint. The entity type that references the principal end is called the *dependent end* of the constraint. **PropertyRef** elements are used to specify which keys reference the principal end.

The **Dependent** element can have the following child elements (in the order listed):

-   PropertyRef (one or more elements)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The table below describes the attributes that can be applied to the **Dependent** element.

| Attribute Name | Is Required | Value                                                                |
|:---------------|:------------|:---------------------------------------------------------------------|
| **Role**       | Yes         | The name of the entity type on the dependent end of the association. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Dependent** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows a **ReferentialConstraint** element being used as part of the definition of the **PublishedBy** association. The **PublisherId** property of the **Book** entity type makes up the dependent end of the referential constraint.

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
 

 

## Documentation Element (CSDL)

The **Documentation** element in conceptual schema definition language (CSDL) can be used to provide information about an object that is defined in a parent element. In an .edmx file, when the **Documentation** element is a child of an element that appears as an object on the design surface of the EF Designer  (such as an entity, association, or property), the contents of the **Documentation** element will appear in the Visual Studio **Properties** window for the object.

The **Documentation** element can have the following child elements (in the order listed):

-   **Summary**: A brief description of the parent element. (zero or one element)
-   **LongDescription**: An extensive description of the parent element. (zero or one element)
-   Annotation elements. (zero or more elements)

### Applicable Attributes

Any number of annotation attributes (custom XML attributes) may be applied to the **Documentation** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows the **Documentation** element as a child element of an EntityType element. If the snippet below were in the CSDL content of an .edmx file, the contents of the **Summary** and **LongDescription** elements would appear in the Visual Studio **Properties** window when you click on the `Customer` entity type.

```xml
 <EntityType Name="Customer">
    <Documentation>
      <Summary>Summary here.</Summary>
      <LongDescription>Long description here.</LongDescription>
    </Documentation>
    <Key>
      <PropertyRef Name="CustomerId" />
    </Key>
    <Property Type="Int32" Name="CustomerId" Nullable="false" />
    <Property Type="String" Name="Name" Nullable="false" />
 </EntityType>
```
 

 

## End Element (CSDL)

The **End** element in conceptual schema definition language (CSDL) can be a child of the Association element or the AssociationSet element. In each case, the role of the **End** element is different and the applicable attributes are different.

### End Element as a Child of the Association Element

An **End** element (as a child of the **Association** element) identifies the entity type on one end of an association and the number of entity type instances that can exist at that end of an association. Association ends are defined as part of an association; an association must have exactly two association ends. Entity type instances at one end of an association can be accessed through navigation properties or foreign keys if they are exposed on an entity type.  

An **End** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   OnDelete (zero or one element)
-   Annotation elements (zero or more elements)

#### Applicable Attributes

The following table describes the attributes that can be applied to the **End** element when it is the child of an **Association** element.

| Attribute Name   | Is Required | Value                                                                                                                                                                                                                                                                                                                                                                                                              |
|:-----------------|:------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Type**         | Yes         | The name of the entity type at one end of the association.                                                                                                                                                                                                                                                                                                                                                         |
| **Role**         | No          | A name for the association end. If no name is provided, the name of the entity type on the association end will be used.                                                                                                                                                                                                                                                                                           |
| **Multiplicity** | Yes         | **1**, **0..1**, or **\*** depending on the number of entity type instances that can be at the end of the association.  **1** indicates that exactly one entity type instance exists at the association end.  **0..1** indicates that zero or one entity type instances exist at the association end.  **\*** indicates that zero, one, or more entity type instances exist at the association end. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **End** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

#### Example

The following example shows an **Association** element that defines the **CustomerOrders** association. The **Multiplicity** values for each **End** of the association indicate that many **Orders** can be associated with a **Customer**, but only one **Customer** can be associated with an **Order**. Additionally, the **OnDelete** element indicates that all **Orders** that are related to a particular **Customer** and that have been loaded into the ObjectContext will be deleted if the **Customer** is deleted.

```xml
 <Association Name="CustomerOrders">
   <End Type="ExampleModel.Customer" Role="Customer" Multiplicity="1" />
   <End Type="ExampleModel.Order" Role="Order" Multiplicity="*">
         <OnDelete Action="Cascade" />
   </End>
 </Association>
```
 

### End Element as a Child of the AssociationSet Element

The **End** element specifies one end of an association set. The **AssociationSet** element must contain two **End** elements. The information contained in an **End** element is used in mapping an association set to a data source.

An **End** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Annotation elements (zero or more elements)

> **Note:**
> Annotation elements must appear after all other child elements. Annotation elements are only allowed in CSDL v2 and later.

 

#### Applicable Attributes

The following table describes the attributes that can be applied to the **End** element when it is the child of an **AssociationSet** element.

| Attribute Name | Is Required | Value                                                                                                                                                                                                                 |
|:---------------|:------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **EntitySet**  | Yes         | The name of the **EntitySet** element that defines one end of the parent **AssociationSet** element. The **EntitySet** element must be defined in the same entity container as the parent **AssociationSet** element. |
| **Role**       | No          | The name of the association set end. If the **Role** attribute is not used, the name of the association set end will be the name of the entity set.                                                                   |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **End** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

#### Example

The following example shows an **EntityContainer** element with two **AssociationSet** elements, each with two **End** elements:

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
 

 

## EntityContainer Element (CSDL)

The **EntityContainer** element in conceptual schema definition language (CSDL) is a logical container for entity sets, association sets, and function imports. A conceptual model entity container maps to a storage model entity container through the EntityContainerMapping element. A storage model entity container describes the structure of the database: entity sets describe tables, association sets describe foreign key <example-value>, and function imports describe stored procedures in a database.

An **EntityContainer** element can have zero or one Documentation elements. If a **Documentation** element is present, it must precede all **EntitySet**, **AssociationSet**, and **FunctionImport** elements.

An **EntityContainer** element can have zero or more of the following child elements (in the order listed):

-   EntitySet
-   AssociationSet
-   FunctionImport
-   Annotation elements

You can extend an **EntityContainer** element to include the contents of another **EntityContainer** that is within the same namespace. To include the contents of another **EntityContainer**, in the referencing **EntityContainer** element, set the value of the **Extends** attribute to the name of the **EntityContainer** element that you want to include. All child elements of the included **EntityContainer** element will be treated as child elements of the referencing **EntityContainer** element.

### Applicable Attributes

The table below describes the attributes that can be applied to the **Using** element.

| Attribute Name | Is Required | Value                                                           |
|:---------------|:------------|:----------------------------------------------------------------|
| **Name**       | Yes         | The name of the entity container.                               |
| **Extends**    | No          | The name of another entity container within the same namespace. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **EntityContainer** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows an **EntityContainer** element that defines three entity sets and two association sets.

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
