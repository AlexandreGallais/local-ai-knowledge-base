---
title: "SSDL Specification - EF6 (part 4 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/ssdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# SSDL Specification - EF6 (part 4 of 5)

## Property Element (SSDL)

The **Property** element in store schema definition language (SSDL) represents a column in a table in the underlying database. **Property** elements are children of EntityType elements, which represent rows in a table. Each **Property** element defined on an **EntityType** element represents a column.

A **Property** element cannot have any child elements.

### Applicable Attributes

The following table describes the attributes that can be applied to the **Property** element.

| Attribute Name            | Is Required | Value                                                                                                                                                                                                                           |
|:--------------------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                  | Yes         | The name of the corresponding column.                                                                                                                                                                                           |
| **Type**                  | Yes         | The type of the corresponding column.                                                                                                                                                                                           |
| **Nullable**              | No          | **True** (the default value) or **False** depending on whether the corresponding column can have a null value.                                                                                                                  |
| **DefaultValue**          | No          | The default value of the corresponding column.                                                                                                                                                                                  |
| **MaxLength**             | No          | The maximum length of the corresponding column.                                                                                                                                                                                 |
| **FixedLength**           | No          | **True** or **False** depending on whether the corresponding column value will be stored as a fixed length string.                                                                                                              |
| **Precision**             | No          | The precision of the corresponding column.                                                                                                                                                                                      |
| **Scale**                 | No          | The scale of the corresponding column.                                                                                                                                                                                          |
| **Unicode**               | No          | **True** or **False** depending on whether the corresponding column value will be stored as a Unicode string.                                                                                                                   |
| **Collation**             | No          | A string that specifies the collating sequence to be used in the data source.                                                                                                                                                   |
| **SRID**                  | No          | Spatial System Reference Identifier. Valid only for properties of spatial types. For more information, see SRID and SRID (SQL Server). |
| **StoreGeneratedPattern** | No          | **None**, **Identity** (if the corresponding column value is an identity that is generated in the database), or **Computed** (if the corresponding column value is computed in the database). Not Valid for RowType properties. |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Property** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an **EntityType** element with two child **Property** elements:

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

## PropertyRef Element (SSDL)

The **PropertyRef** element in store schema definition language (SSDL) references a property defined on an EntityType element to indicate that the property will perform one of the following roles:

-   Be part of the primary key of the table that the **EntityType** represents. One or more **PropertyRef** elements can be used to define a primary key. For more information, see Key element.
-   Be the dependent or principal end of a referential constraint. For more information, see ReferentialConstraint element.

The **PropertyRef** element can only have the following child elements:

-   Documentation (zero or one)
-   Annotation elements

### Applicable Attributes

The table below describes the attributes that can be applied to the **PropertyRef** element.

| Attribute Name | Is Required | Value                                |
|:---------------|:------------|:-------------------------------------|
| **Name**       | Yes         | The name of the referenced property. |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **PropertyRef** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows a **PropertyRef** element used to define a primary key by referencing a property that is defined on an **EntityType** element.

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

## ReferentialConstraint Element (SSDL)

The **ReferentialConstraint** element in store schema definition language (SSDL) represents a foreign key <example-value> (also called a referential integrity constraint) in the underlying database. The principal and dependent ends of the constraint are specified by the Principal and Dependent child elements, respectively. Columns that participate in the principal and dependent ends are referenced with PropertyRef elements.

The **ReferentialConstraint** element is an optional child element of the Association element. If a **ReferentialConstraint** element is not used to map the foreign key <example-value> that is specified in the **Association** element, an AssociationSetMapping element must be used to do this.

The **ReferentialConstraint** element can have the following child elements:

-   Documentation (zero or one)
-   Principal (exactly one)
-   Dependent (exactly one)
-   Annotation elements (zero or more)

### Applicable Attributes

Any number of annotation attributes (custom XML attributes) may be applied to the **ReferentialConstraint** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an **Association** element that uses a **ReferentialConstraint** element to specify the columns that participate in the **FK\_CustomerOrders** foreign key <example-value>:

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

## ReturnType Element (SSDL)

The **ReturnType** element in store schema definition language (SSDL) specifies the return type for a function that is defined in a **Function** element. A function return type can also be specified with a **ReturnType** attribute.

The return type of a function is specified with the **Type** attribute or the **ReturnType** element.

The **ReturnType** element can have the following child elements:

- CollectionType (one)

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **ReturnType** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example uses a **Function** that returns a collection of rows.

```xml
   <Function Name="GetProducts" IsComposable="true" Schema="dbo">
     <ReturnType>
       <CollectionType>
         <RowType>
           <Property Name="ProductID" Type="int" Nullable="false" />
           <Property Name="CategoryID" Type="bigint" Nullable="false" />
           <Property Name="ProductName" Type="nvarchar" MaxLength="40" Nullable="false" />
           <Property Name="UnitPrice" Type="money" />
           <Property Name="Discontinued" Type="bit" />
         </RowType>
       </CollectionType>
     </ReturnType>
   </Function>
```

## RowType Element (SSDL)

A **RowType** element in store schema definition language (SSDL) defines an unnamed structure as a return type for a function defined in the store.

A **RowType** element is the child element of **CollectionType** element:

A **RowType** element can have the following child elements:

- Property (one or more)

### Example

The following example shows a store function that uses a **CollectionType** element to specify that the function returns a collection of rows (as specified in the **RowType** element).

```xml
   <Function Name="GetProducts" IsComposable="true" Schema="dbo">
     <ReturnType>
       <CollectionType>
         <RowType>
           <Property Name="ProductID" Type="int" Nullable="false" />
           <Property Name="CategoryID" Type="bigint" Nullable="false" />
           <Property Name="ProductName" Type="nvarchar" MaxLength="40" Nullable="false" />
           <Property Name="UnitPrice" Type="money" />
           <Property Name="Discontinued" Type="bit" />
         </RowType>
       </CollectionType>
     </ReturnType>
   </Function>
```
