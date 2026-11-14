---
title: "SSDL Specification - EF6 (part 1 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/ssdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# SSDL Specification

> **Note:**
> SSDL v1 is unsupported, please update to V3

Store schema definition language (SSDL) is an XML-based language that describes the storage model of an Entity Framework application.

In an Entity Framework application, storage model metadata is loaded from a .ssdl file (written in SSDL) into an instance of the System.Data.Metadata.Edm.StoreItemCollection and is accessible by using methods in the System.Data.Metadata.Edm.MetadataWorkspace class. Entity Framework uses storage model metadata to translate queries against the conceptual model to store-specific commands.

The Entity Framework Designer (EF Designer) stores storage model information in an .edmx file at design time. At build time the Entity Designer uses information in an .edmx file to create the .ssdl file that is needed by Entity Framework at runtime.

Versions of SSDL are differentiated by XML namespaces.

| SSDL Version | XML Namespace                                     |
|:-------------|:--------------------------------------------------|
| SSDL v1      | `https://schemas.microsoft.com/ado/2006/04/edm/ssdl` |
| SSDL v2      | `https://schemas.microsoft.com/ado/2009/02/edm/ssdl` |
| SSDL v3      | `https://schemas.microsoft.com/ado/2009/11/edm/ssdl` |

## Association Element (SSDL)

An **Association** element in store schema definition language (SSDL) specifies table columns that participate in a foreign key <example-value> in the underlying database. Two required child End elements specify tables at the ends of the association and the multiplicity at each end. An optional ReferentialConstraint element specifies the principal and dependent ends of the association as well as the participating columns. If no **ReferentialConstraint** element is present, an AssociationSetMapping element must be used to specify the column mappings for the association.

The **Association** element can have the following child elements (in the order listed):

-   Documentation (zero or one)
-   End (exactly two)
-   ReferentialConstraint (zero or one)
-   Annotation elements (zero or more)

### Applicable Attributes

The following table describes the attributes that can be applied to the **Association** element.

| Attribute Name | Is Required | Value                                                                            |
|:---------------|:------------|:---------------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the corresponding foreign key <example-value> in the underlying database. |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Association** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

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

## AssociationSet Element (SSDL)

The **AssociationSet** element in store schema definition language (SSDL) represents a foreign key <example-value> between two tables in the underlying database. The table columns that participate in the foreign key <example-value> are specified in an Association element. The **Association** element that corresponds to a given **AssociationSet** element is specified in the **Association** attribute of the **AssociationSet** element.

SSDL association sets are mapped to CSDL association sets by an AssociationSetMapping element. However, if the CSDL association for a given CSDL association set is defined by using a ReferentialConstraint element , no corresponding **AssociationSetMapping** element is necessary. In this case, if an **AssociationSetMapping** element is present, the mappings it defines will be overridden by the **ReferentialConstraint** element.

The **AssociationSet** element can have the following child elements (in the order listed):

-   Documentation (zero or one)
-   End (zero or two)
-   Annotation elements (zero or more)

### Applicable Attributes

The following table describes the attributes that can be applied to the **AssociationSet** element.

| Attribute Name  | Is Required | Value                                                                                                |
|:----------------|:------------|:-----------------------------------------------------------------------------------------------------|
| **Name**        | Yes         | The name of the foreign key <example-value> that the association set represents.                          |
| **Association** | Yes         | The name of the association that defines the columns that participate in the foreign key constraint. |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **AssociationSet** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an **AssociationSet** element that represents the `FK_CustomerOrders` foreign key <example-value> in the underlying database:

```xml
 <AssociationSet Name="FK_CustomerOrders"
                 Association="ExampleModel.Store.FK_CustomerOrders">
   <End Role="Customers" EntitySet="Customers" />
   <End Role="Orders" EntitySet="Orders" />
 </AssociationSet>
```

## CollectionType Element (SSDL)

The **CollectionType** element in store schema definition language (SSDL) specifies that a function’s return type is a collection. The **CollectionType** element is a child of the ReturnType element. The type of collection is specified by using the RowType child element:

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **CollectionType** element. However, custom attributes may not belong to any XML namespace that is reserved for SSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows a function that uses a **CollectionType** element to specify that the function returns a collection of rows.

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

## CommandText Element (SSDL)

The **CommandText** element in store schema definition language (SSDL) is a child of the Function element that allows you to define a SQL statement that is executed at the database. The **CommandText** element allows you to add functionality that is similar to a stored procedure in the database, but you define the **CommandText** element in the storage model.

The **CommandText** element cannot have child elements. The body of the **CommandText** element must be a valid SQL statement for the underlying database.

No attributes are applicable to the **CommandText** element.

### Example

The following example shows a **Function** element with a child **CommandText** element. Expose the **UpdateProductInOrder** function as a method on the ObjectContext by importing it into the conceptual model.  

```xml
 <Function Name="UpdateProductInOrder" IsComposable="false">
   <CommandText>
     UPDATE Orders
     SET ProductId = @productId
     WHERE OrderId = @orderId;
   </CommandText>
   <Parameter Name="productId"
              Mode="In"
              Type="int"/>
   <Parameter Name="orderId"
              Mode="In"
              Type="int"/>
 </Function>
```

## DefiningQuery Element (SSDL)

The **DefiningQuery** element in store schema definition language (SSDL) allows you to execute a SQL statement directly in the underlying database. The **DefiningQuery** element is commonly used like a database view, but the view is defined in the storage model instead of the database. The view defined in a **DefiningQuery** element can be mapped to an entity type in the conceptual model through an EntitySetMapping element. These mappings are read-only.  

The following SSDL syntax shows the declaration of an **EntitySet** followed by the **DefiningQuery** element that contains a query used to retrieve the view.

```xml
 <Schema>
     <EntitySet Name="Tables" EntityType="Self.STable">
         <DefiningQuery>
           SELECT  TABLE_CATALOG,
                   'test' as TABLE_SCHEMA,
                   TABLE_NAME
           FROM    INFORMATION_SCHEMA.TABLES
         </DefiningQuery>
     </EntitySet>
 </Schema>
```

You can use stored procedures in the Entity Framework to enable read-write scenarios over views. You can use either a data source view or an Entity SQL view as the base table for retrieving data and for change processing by stored procedures.

You can use the **DefiningQuery** element to target Microsoft SQL Server Compact 3.5. Though SQL Server Compact 3.5 does not support stored procedures, you can implement similar functionality with the **DefiningQuery** element. Another place where it can be useful is in creating stored procedures to overcome a mismatch between the data types used in the programming language and those of the data source. You could write a **DefiningQuery** that takes a certain set of parameters and then calls a stored procedure with a different set of parameters, for example, a stored procedure that deletes data.

## Dependent Element (SSDL)

The **Dependent** element in store schema definition language (SSDL) is a child element to the ReferentialConstraint element that defines the dependent end of a foreign key <example-value> (also called a referential constraint). The **Dependent** element specifies the column (or columns) in a table that reference a primary key <example-value> (or columns). **PropertyRef** elements specify which columns are referenced. The Principal element specifies the primary key <example-value> that are referenced by columns that are specified in the **Dependent** element.

The **Dependent** element can have the following child elements (in the order listed):

-   PropertyRef (one or more)
-   Annotation elements (zero or more)

### Applicable Attributes

The following table describes the attributes that can be applied to the **Dependent** element.

| Attribute Name | Is Required | Value                                                                                                                                                       |
|:---------------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Role**       | Yes         | The same value as the **Role** attribute (if used) of the corresponding End element; otherwise, the name of the table that contains the referencing column. |

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Dependent** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows an Association element that uses a **ReferentialConstraint** element to specify the columns that participate in the **FK\_CustomerOrders** foreign key constraint. The **Dependent** element specifies the **CustomerId** column of the **Order** table as the dependent end of the constraint.

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

## Documentation Element (SSDL)

The **Documentation** element in store schema definition language (SSDL) can be used to provide information about an object that is defined in a parent element.

The **Documentation** element can have the following child elements (in the order listed):

-   **Summary**: A brief description of the parent element. (zero or one element)
-   **LongDescription**: An extensive description of the parent element. (zero or one element)

### Applicable Attributes

Any number of annotation attributes (custom XML attributes) may be applied to the **Documentation** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

### Example

The following example shows the **Documentation** element as a child element of an EntityType element.

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
