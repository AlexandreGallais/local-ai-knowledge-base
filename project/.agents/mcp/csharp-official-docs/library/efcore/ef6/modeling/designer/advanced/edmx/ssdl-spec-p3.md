---
title: "SSDL Specification - EF6 (part 3 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/ssdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# SSDL Specification - EF6 (part 3 of 5)

## Function Element (SSDL)

The **Function** element in store schema definition language (SSDL) specifies a stored procedure that exists in the underlying database.

The **Function** element can have the following child elements (in the order listed):

-   Documentation (zero or one)
-   Parameter (zero or more)
-   CommandText (zero or one)
-   ReturnType (zero or more)
-   Annotation elements (zero or more)

A return type for a function must be specified with either the **ReturnType** element or the **ReturnType** attribute (see below), but not both.

Stored procedures that are specified in the storage model can be imported into the conceptual model of an application. For more information, see Querying with Stored Procedures. The **Function** element can also be used to define custom functions in the storage model.  

### Applicable Attributes

The following table describes the attributes that can be applied to the **Function** element.

> **Note:**
> Some attributes (not listed here) may be qualified with the **store** alias. These attributes are used by the Update Model Wizard when updating a model.

| Attribute Name             | Is Required | Value                                                                                                                                                                                                              |
|:---------------------------|:------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**                   | Yes         | The name of the stored procedure.                                                                                                                                                                                  |
| **ReturnType**             | No          | The return type of the stored procedure.                                                                                                                                                                           |
| **Aggregate**              | No          | **True** if the stored procedure returns an aggregate value; otherwise **False**.                                                                                                                                  |
| **BuiltIn**                | No          | **True** if the function is a built-in1 function; otherwise **False**.                                                                                                                                  |
| **StoreFunctionName**      | No          | The name of the stored procedure.                                                                                                                                                                                  |
| **NiladicFunction**        | No          | **True** if the function is a niladic2 function; **False** otherwise.                                                                                                                                   |
| **IsComposable**           | No          | **True** if the function is a composable3 function; **False** otherwise.                                                                                                                                |
| **ParameterTypeSemantics** | No          | The enumeration that defines the type semantics used to resolve function overloads. The enumeration is defined in the provider manifest per function definition. The default value is **AllowImplicitConversion**. |
| **Schema**                 | No          | The name of the schema in which the stored procedure is defined.                                                                                                                                                   |

1 A built-in function is a function that is defined in the database. For information about functions that are defined in the storage model, see CommandText Element (SSDL).

2 A niladic function is a function that accepts no parameters and, when called, does not require parentheses.

3 Two functions are composable if the output of one function can be the input for the other function.

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Function** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows a **Function** element that corresponds to the **UpdateOrderQuantity** stored procedure. The stored procedure accepts two parameters and does not return a value.

```xml
 <Function Name="UpdateOrderQuantity"
           Aggregate="false"
           BuiltIn="false"
           NiladicFunction="false"
           IsComposable="false"
           ParameterTypeSemantics="AllowImplicitConversion"
           Schema="dbo">
   <Parameter Name="orderId" Type="int" Mode="In" />
   <Parameter Name="newQuantity" Type="int" Mode="In" />
 </Function>
```

## Key <example-value> (SSDL)

The **Key** element in store schema definition language (SSDL) represents the primary key of a table in the underlying database. **Key** is a child element of an EntityType element, which represents a row in a table. The primary key is defined in the **Key** element by referencing one or more Property elements that are defined on the **EntityType** element.

The **Key** element can have the following child elements (in the order listed):

-   PropertyRef (one or more)
-   Annotation elements

No attributes are applicable to the **Key** element.

### Example

The following example shows an **EntityType** element with a key that references one property:

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

## OnDelete Element (SSDL)

The **OnDelete** element in store schema definition language (SSDL) reflects the database behavior when a row that participates in a foreign key <example-value> is deleted. If the action is set to **Cascade**, then rows that reference a row that is being deleted will also be deleted. If the action is set to **None**, then rows that reference a row that is being deleted are not also deleted. An **OnDelete** element is a child element of an End element.

An **OnDelete** element can have the following child elements (in the order listed):

-   Documentation (zero or one)
-   Annotation elements (zero or more)

### Applicable Attributes

The following table describes the attributes that can be applied to the **OnDelete** element.

| Attribute Name | Is Required | Value                                                                                               |
|:---------------|:------------|:----------------------------------------------------------------------------------------------------|
| **Action**     | Yes         | **Cascade** or **None**. (The value **Restricted** is valid but has the same behavior as **None**.) |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **OnDelete** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an **Association** element that defines the **FK\_CustomerOrders** foreign key constraint. The **OnDelete** element indicates that all rows in the **Orders** table that reference a particular row in the **Customers** table will be deleted if the row in the **Customers** table is deleted.

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

## Parameter Element (SSDL)

The **Parameter** element in store schema definition language (SSDL) is a child of the Function element that specifies parameters for a stored procedure in the database.

The **Parameter** element can have the following child elements (in the order listed):

-   Documentation (zero or one)
-   Annotation elements (zero or more)

### Applicable Attributes

The table below describes the attributes that can be applied to the **Parameter** element.

| Attribute Name | Is Required | Value                                                                                                                                                                                                                           |
|:---------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the parameter.                                                                                                                                                                                                      |
| **Type**       | Yes         | The parameter type.                                                                                                                                                                                                             |
| **Mode**       | No          | **In**, **Out**, or **InOut** depending on whether the parameter is an input, output, or input/output parameter.                                                                                                                |
| **MaxLength**  | No          | The maximum length of the parameter.                                                                                                                                                                                            |
| **Precision**  | No          | The precision of the parameter.                                                                                                                                                                                                 |
| **Scale**      | No          | The scale of the parameter.                                                                                                                                                                                                     |
| **SRID**       | No          | Spatial System Reference Identifier. Valid only for parameters of spatial types. For more information, see SRID and SRID (SQL Server). |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Parameter** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows a **Function** element that has two **Parameter** elements that specify input parameters:

```xml
 <Function Name="UpdateOrderQuantity"
           Aggregate="false"
           BuiltIn="false"
           NiladicFunction="false"
           IsComposable="false"
           ParameterTypeSemantics="AllowImplicitConversion"
           Schema="dbo">
   <Parameter Name="orderId" Type="int" Mode="In" />
   <Parameter Name="newQuantity" Type="int" Mode="In" />
 </Function>
```

## Principal Element (SSDL)

The **Principal** element in store schema definition language (SSDL) is a child element to the ReferentialConstraint element that defines the principal end of a foreign key <example-value> (also called a referential constraint). The **Principal** element specifies the primary key <example-value> (or columns) in a table that is referenced by another column (or columns). **PropertyRef** elements specify which columns are referenced. The Dependent element specifies columns that reference the primary key <example-value> that are specified in the **Principal** element.

The **Principal** element can have the following child elements (in the order listed):

-   PropertyRef (one or more)
-   Annotation elements (zero or more)

### Applicable Attributes

The following table describes the attributes that can be applied to the **Principal** element.

| Attribute Name | Is Required | Value                                                                                                                                                      |
|:---------------|:------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Role**       | Yes         | The same value as the **Role** attribute (if used) of the corresponding End element; otherwise, the name of the table that contains the referenced column. |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Principal** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an Association element that uses a **ReferentialConstraint** element to specify the columns that participate in the **FK\_CustomerOrders** foreign key constraint. The **Principal** element specifies the **CustomerId** column of the **Customer** table as the principal end of the constraint.

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
