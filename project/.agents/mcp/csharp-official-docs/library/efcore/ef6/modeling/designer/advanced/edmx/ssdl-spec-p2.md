---
title: "SSDL Specification - EF6 (part 2 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/ssdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# SSDL Specification - EF6 (part 2 of 5)

## End Element (SSDL)

The **End** element in store schema definition language (SSDL) specifies the table and number of rows at one end of a foreign key <example-value> in the underlying database. The **End** element can be a child of the Association element or the AssociationSet element. In each case, the possible child elements and applicable attributes are different.

### End Element as a Child of the Association Element

An **End** element (as a child of the **Association** element) specifies the table and number of rows at the end of a foreign key <example-value> with the **Type** and **Multiplicity** attributes respectively. Ends of a foreign key <example-value> are defined as part of an SSDL association; an SSDL association must have exactly two ends.

An **End** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   OnDelete (zero or one element)
-   Annotation elements (zero or more elements)

#### Applicable Attributes

The following table describes the attributes that can be applied to the **End** element when it is the child of an **Association** element.

| Attribute Name   | Is Required | Value                                                                                                                                                                                                                                                                                                                                                                                      |
|:-----------------|:------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Type**         | Yes         | The fully qualified name of the SSDL entity set that is at the end of the foreign key constraint.                                                                                                                                                                                                                                                                                          |
| **Role**         | No          | The value of the **Role** attribute in either the Principal or Dependent element of the corresponding ReferentialConstraint element (if used).                                                                                                                                                                                                                                             |
| **Multiplicity** | Yes         | **1**, **0..1**, or **\*** depending on the number of rows that can be at the end of the foreign key constraint.  **1** indicates that exactly one row exists at the foreign key <example-value> end.  **0..1** indicates that zero or one row exists at the foreign key <example-value> end.  **\*** indicates that zero, one, or more rows exist at the foreign key <example-value> end. |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **End** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

#### Example

The following example shows an **Association** element that defines the **FK\_CustomerOrders** foreign key constraint. The **Multiplicity** values specified on each **End** element indicate that many rows in the **Orders** table can be associated with a row in the **Customers** table, but only one row in the **Customers** table can be associated with a row in the **Orders** table. Additionally, the **OnDelete** element indicates that all rows in the **Orders** table that reference a particular row in the **Customers** table will be deleted if the row in the **Customers** table is deleted.

```xml
 <Association Name="FK_CustomerOrders">
   <End Role="Customers"
        Type="ExampleModel.Store.Customers" Multiplicity="1">
     <OnDelete Action="Cascade" />
   </End>
   <End Role="Orders"
        Type="ExampleModel.Store.Orders" Multiplicity="*" />
   <ReferentialConstraint>
     <Principal Role="Customers">
       <PropertyRef Name="CustomerId" />
     </Principal>
     <Dependent Role="Orders">
       <PropertyRef Name="CustomerId" />
     </Dependent>
   </ReferentialConstraint>
 </Association>
```

### End Element as a Child of the AssociationSet Element

The **End** element (as a child of the **AssociationSet** element) specifies a table at one end of a foreign key <example-value> in the underlying database.

An **End** element can have the following child elements (in the order listed):

-   Documentation (zero or one)
-   Annotation elements (zero or more)

#### Applicable Attributes

The following table describes the attributes that can be applied to the **End** element when it is the child of an **AssociationSet** element.

| Attribute Name | Is Required | Value                                                                                                                  |
|:---------------|:------------|:-----------------------------------------------------------------------------------------------------------------------|
| **EntitySet**  | Yes         | The name of the SSDL entity set that is at the end of the foreign key constraint.                                      |
| **Role**       | No          | The value of one of the **Role** attributes specified on one **End** element of the corresponding Association element. |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **End** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

#### Example

The following example shows an **EntityContainer** element with an **AssociationSet** element with two **End** elements:

```xml
 <EntityContainer Name="ExampleModelStoreContainer">
   <EntitySet Name="Customers"
              EntityType="ExampleModel.Store.Customers"
              Schema="dbo" />
   <EntitySet Name="Orders"
              EntityType="ExampleModel.Store.Orders"
              Schema="dbo" />
   <AssociationSet Name="FK_CustomerOrders"
                   Association="ExampleModel.Store.FK_CustomerOrders">
     <End Role="Customers" EntitySet="Customers" />
     <End Role="Orders" EntitySet="Orders" />
   </AssociationSet>
 </EntityContainer>
```

## EntityContainer Element (SSDL)

An **EntityContainer** element in store schema definition language (SSDL) describes the structure of the underlying data source in an Entity Framework application: SSDL entity sets (defined in EntitySet elements) represent tables in a database, SSDL entity types (defined in EntityType elements) represent rows in a table, and association sets (defined in AssociationSet elements) represent foreign key <example-value> in a database. A storage model entity container maps to a conceptual model entity container through the EntityContainerMapping element.

An **EntityContainer** element can have zero or one Documentation elements. If a **Documentation** element is present, it must precede all other child elements.

An **EntityContainer** element can have zero or more of the following child elements (in the order listed):

-   EntitySet
-   AssociationSet
-   Annotation elements

### Applicable Attributes

The table below describes the attributes that can be applied to the **EntityContainer** element.

| Attribute Name | Is Required | Value                                                                   |
|:---------------|:------------|:------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the entity container. This name cannot contain periods (.). |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **EntityContainer** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an **EntityContainer** element that defines two entity sets and one association set. Note that entity type and association type names are qualified by the conceptual model namespace name.

```xml
 <EntityContainer Name="ExampleModelStoreContainer">
   <EntitySet Name="Customers"
              EntityType="ExampleModel.Store.Customers"
              Schema="dbo" />
   <EntitySet Name="Orders"
              EntityType="ExampleModel.Store.Orders"
              Schema="dbo" />
   <AssociationSet Name="FK_CustomerOrders"
                   Association="ExampleModel.Store.FK_CustomerOrders">
     <End Role="Customers" EntitySet="Customers" />
     <End Role="Orders" EntitySet="Orders" />
   </AssociationSet>
 </EntityContainer>
```

## EntitySet Element (SSDL)

An **EntitySet** element in store schema definition language (SSDL) represents a table or view in the underlying database. An EntityType element in SSDL represents a row in the table or view. The **EntityType** attribute of an **EntitySet** element specifies the particular SSDL entity type that represents rows in an SSDL entity set. The mapping between a CSDL entity set and an SSDL entity set is specified in an EntitySetMapping element.

The **EntitySet** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   DefiningQuery (zero or one element)
-   Annotation elements

### Applicable Attributes

The following table describes the attributes that can be applied to the **EntitySet** element.

> **Note:**
> Some attributes (not listed here) may be qualified with the **store** alias. These attributes are used by the Update Model Wizard when updating a model.

| Attribute Name | Is Required | Value                                                                                    |
|:---------------|:------------|:-----------------------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the entity set.                                                              |
| **EntityType** | Yes         | The fully-qualified name of the entity type for which the entity set contains instances. |
| **Schema**     | No          | The database schema.                                                                     |
| **Table**      | No          | The database table.                                                                      |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **EntitySet** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an **EntityContainer** element that has two **EntitySet** elements and one **AssociationSet** element:

```xml
 <EntityContainer Name="ExampleModelStoreContainer">
   <EntitySet Name="Customers"
              EntityType="ExampleModel.Store.Customers"
              Schema="dbo" />
   <EntitySet Name="Orders"
              EntityType="ExampleModel.Store.Orders"
              Schema="dbo" />
   <AssociationSet Name="FK_CustomerOrders"
                   Association="ExampleModel.Store.FK_CustomerOrders">
     <End Role="Customers" EntitySet="Customers" />
     <End Role="Orders" EntitySet="Orders" />
   </AssociationSet>
 </EntityContainer>
```

## EntityType Element (SSDL)

An **EntityType** element in store schema definition language (SSDL) represents a row in a table or view of the underlying database. An EntitySet element in SSDL represents the table or view in which rows occur. The **EntityType** attribute of an **EntitySet** element specifies the particular SSDL entity type that represents rows in an SSDL entity set. The mapping between an SSDL entity type and a CSDL entity type is specified in an EntityTypeMapping element.

The **EntityType** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Key (zero or one element)
-   Annotation elements

### Applicable Attributes

The table below describes the attributes that can be applied to the **EntityType** element.

| Attribute Name | Is Required | Value                                                                                                                                                                  |
|:---------------|:------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the entity type. This value is usually the same as the name of the table in which the entity type represents a row. This value can contain no periods (.). |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **EntityType** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an **EntityType** element with two properties:

```xml
 <EntityType Name="Customers">
   <Documentation>
     <Summary>Summary here.</Summary>
     <LongDescription>Long description here.</LongDescription>
   </Documentation>
   <Key>
     <PropertyRef Name="CustomerId" />
   </Key>
   <Property Name="CustomerId" Type="int" Nullable="false" />
   <Property Name="Name" Type="nvarchar(max)" Nullable="false" />
 </EntityType>
```
