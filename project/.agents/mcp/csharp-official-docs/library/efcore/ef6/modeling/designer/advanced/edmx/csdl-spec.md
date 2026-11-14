---
title: "CSDL Specification - EF6 (part 1 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification

> **Note:**
> CSDL v1 is unsupported, please update to V3

Conceptual schema definition language (CSDL) is an XML-based language that describes the entities, relationships, and functions that make up a conceptual model of a data-driven application. This conceptual model can be used by the Entity Framework or WCF Data Services. The metadata that is described with CSDL is used by the Entity Framework to map entities and relationships that are defined in a conceptual model to a data source. For more information, see SSDL Specification and MSL Specification.

CSDL is the Entity Framework's implementation of the Entity Data Model.

In an Entity Framework application, conceptual model metadata is loaded from a .csdl file (written in CSDL) into an instance of the System.Data.Metadata.Edm.EdmItemCollection and is accessible by using methods in the System.Data.Metadata.Edm.MetadataWorkspace class. Entity Framework uses conceptual model metadata to translate queries against the conceptual model to data source-specific commands.

The EF Designer stores conceptual model information in an .edmx file at design time. At build time, the EF Designer uses information in an .edmx file to create the .csdl file that is needed by Entity Framework at runtime.

Versions of CSDL are differentiated by XML namespaces.

| CSDL Version | XML Namespace                                |
|:-------------|:---------------------------------------------|
| CSDL v1      | `https://schemas.microsoft.com/ado/2006/04/edm` |
| CSDL v2      | `https://schemas.microsoft.com/ado/2008/09/edm` |
| CSDL v3      | `https://schemas.microsoft.com/ado/2009/11/edm` |

## Association Element (CSDL)

An **Association** element defines a relationship between two entity types. An association must specify the entity types that are involved in the relationship and the possible number of entity types at each end of the relationship, which is known as the multiplicity. The multiplicity of an association end can have a value of one (1), zero or one (0..1), or many (\*). This information is specified in two child End elements.

Entity type instances at one end of an association can be accessed through navigation properties or foreign keys, if they are exposed on an entity type.

In an application, an instance of an association represents a specific association between instances of entity types. Association instances are logically grouped in an association set.

An **Association** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   End (exactly 2 elements)
-   ReferentialConstraint (zero or one element)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The table below describes the attributes that can be applied to the **Association** element.

| Attribute Name | Is Required | Value                        |
|:---------------|:------------|:-----------------------------|
| **Name**       | Yes         | The name of the association. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Association** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows an **Association** element that defines the **CustomerOrders** association when foreign keys have not been exposed on the **Customer** and **Order** entity types. The **Multiplicity** values for each **End** of the association indicate that many **Orders** can be associated with a **Customer**, but only one **Customer** can be associated with an **Order**. Additionally, the **OnDelete** element indicates that all **Orders** that are related to a particular **Customer** and have been loaded into the ObjectContext will be deleted if the **Customer** is deleted.

```xml
 <Association Name="CustomerOrders">
   <End Type="ExampleModel.Customer" Role="Customer" Multiplicity="1" >
         <OnDelete Action="Cascade" />
   </End>
   <End Type="ExampleModel.Order" Role="Order" Multiplicity="*" />
 </Association>
```
 

The following example shows an **Association** element that defines the **CustomerOrders** association when foreign keys have been exposed on the **Customer** and **Order** entity types. With foreign keys exposed, the relationship between the entities is managed with a **ReferentialConstraint** element. A corresponding AssociationSetMapping element is not necessary to map this association to the data source.

```xml
 <Association Name="CustomerOrders">
   <End Type="ExampleModel.Customer" Role="Customer" Multiplicity="1" >
         <OnDelete Action="Cascade" />
   </End>
   <End Type="ExampleModel.Order" Role="Order" Multiplicity="*" />
   <ReferentialConstraint>
        <Principal Role="Customer">
            <PropertyRef Name="Id" />
        </Principal>
        <Dependent Role="Order">
             <PropertyRef Name="CustomerId" />
         </Dependent>
   </ReferentialConstraint>
 </Association>
```
 

 

## AssociationSet Element (CSDL)

The **AssociationSet** element in conceptual schema definition language (CSDL) is a logical container for association instances of the same type. An association set provides a definition for grouping association instances so that they can be mapped to a data source.  

The **AssociationSet** element can have the following child elements (in the order listed):

-   Documentation (zero or one elements allowed)
-   End (exactly two elements required)
-   Annotation elements (zero or more elements allowed)

The **Association** attribute specifies the type of association that an association set contains. The entity sets that make up the ends of an association set are specified with exactly two child **End** elements.

### Applicable Attributes

The table below describes the attributes that can be applied to the **AssociationSet** element.

| Attribute Name  | Is Required | Value                                                                                                                                                             |
|:----------------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**        | Yes         | The name of the entity set. The value of the **Name** attribute cannot be the same as the value of the **Association** attribute.                                 |
| **Association** | Yes         | The fully-qualified name of the association that the association set contains instances of. The association must be in the same namespace as the association set. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **AssociationSet** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows an **EntityContainer** element with two **AssociationSet** elements:

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
