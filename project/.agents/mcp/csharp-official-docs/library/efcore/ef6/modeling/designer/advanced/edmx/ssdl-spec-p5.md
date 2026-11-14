---
title: "SSDL Specification - EF6 (part 5 of 5)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/ssdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# SSDL Specification - EF6 (part 5 of 5)

## Schema Element (SSDL)

The **Schema** element in store schema definition language (SSDL) is the root element of a storage model definition. It contains definitions for the objects, functions, and containers that make up a storage model.

The **Schema** element may contain zero or more of the following child elements:

-   Association
-   EntityType
-   EntityContainer
-   Function

The **Schema** element uses the **Namespace** attribute to define the namespace for the entity type and association objects in a storage model. Within a namespace, no two objects can have the same name.

A storage model namespace is different from the XML namespace of the **Schema** element. A storage model namespace (as defined by the **Namespace** attribute) is a logical container for entity types and association types. The XML namespace (indicated by the **xmlns** attribute) of a **Schema** element is the default namespace for child elements and attributes of the **Schema** element. XML namespaces of the form `https://schemas.microsoft.com/ado/YYYY/MM/edm/ssdl` (where YYYY and MM represent a year and month respectively) are reserved for SSDL. Custom elements and attributes cannot be in namespaces that have this form.

### Applicable Attributes

The table below describes the attributes can be applied to the **Schema** element.

| Attribute Name            | Is Required | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|:--------------------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Namespace**             | Yes         | The namespace of the storage model. The value of the **Namespace** attribute is used to form the fully qualified name of a type. For example, if an **EntityType** named *Customer* is in the ExampleModel.Store namespace, then the fully qualified name of the **EntityType** is ExampleModel.Store.Customer.  The following strings cannot be used as the value for the **Namespace** attribute: **System**, **Transient**, or **Edm**. The value for the **Namespace** attribute cannot be the same as the value for the **Namespace** attribute in the CSDL Schema element. |
| **Alias**                 | No          | An identifier used in place of the namespace name. For example, if an **EntityType** named *Customer* is in the ExampleModel.Store namespace and the value of the **Alias** attribute is *StorageModel*, then you can use StorageModel.Customer as the fully qualified name of the **EntityType.**                                                                                                                                                                                                                                                                                    |
| **Provider**              | Yes         | The data provider.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    |
| **ProviderManifestToken** | Yes         | A token that indicates to the provider which provider manifest to return. No format for the token is defined. Values for the token are defined by the provider. For information about SQL Server provider manifest tokens, see SqlClient for Entity Framework.                                                                                                                                                                                                                                                                                                                        |

### Example

The following example shows a **Schema** element that contains an **EntityContainer** element, two **EntityType** elements, and one **Association** element.

```xml
 <Schema Namespace="ExampleModel.Store"
       Alias="Self" Provider="System.Data.SqlClient"
       ProviderManifestToken="<example-value>"
       xmlns="https://schemas.microsoft.com/ado/2009/11/edm/ssdl">
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
   <EntityType Name="Orders" xmlns:c="http://CustomNamespace">
     <Key>
       <PropertyRef Name="OrderId" />
     </Key>
     <Property Name="OrderId" Type="int" Nullable="false"
               c:CustomAttribute="someValue"/>
     <Property Name="ProductId" Type="int" Nullable="false" />
     <Property Name="Quantity" Type="int" Nullable="false" />
     <Property Name="CustomerId" Type="int" Nullable="false" />
     <c:CustomElement>
       Custom data here.
     </c:CustomElement>
   </EntityType>
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
 </Schema>
```

## Annotation Attributes

Annotation attributes in store schema definition language (SSDL) are custom XML attributes in the storage model that provide extra metadata about the elements in the storage model. In addition to having valid XML structure, the following constraints apply to annotation attributes:

-   Annotation attributes must not be in any XML namespace that is reserved for SSDL.
-   The fully-qualified names of any two annotation attributes must not be the same.

More than one annotation attribute may be applied to a given SSDL element. Metadata contained in annotation elements can be accessed at runtime by using classes in the System.Data.Metadata.Edm namespace.

### Example

The following example shows an EntityType element that has an annotation attribute applied to the **OrderId** property. The example also show an annotation element added to the **EntityType** element.

```xml
 <EntityType Name="Orders" xmlns:c="http://CustomNamespace">
   <Key>
     <PropertyRef Name="OrderId" />
   </Key>
   <Property Name="OrderId" Type="int" Nullable="false"
             c:CustomAttribute="someValue"/>
   <Property Name="ProductId" Type="int" Nullable="false" />
   <Property Name="Quantity" Type="int" Nullable="false" />
   <Property Name="CustomerId" Type="int" Nullable="false" />
   <c:CustomElement>
     Custom data here.
   </c:CustomElement>
 </EntityType>
```

## Annotation Elements (SSDL)

Annotation elements in store schema definition language (SSDL) are custom XML elements in the storage model that provide extra metadata about the storage model. In addition to having valid XML structure, the following constraints apply to annotation elements:

-   Annotation elements must not be in any XML namespace that is reserved for SSDL.
-   The fully-qualified names of any two annotation elements must not be the same.
-   Annotation elements must appear after all other child elements of a given SSDL element.

More than one annotation element may be a child of a given SSDL element. Starting with the .NET Framework version 4, metadata contained in annotation elements can be accessed at runtime by using classes in the System.Data.Metadata.Edm namespace.

### Example

The following example shows an EntityType element that has an annotation element (**CustomElement**). The example also shows an annotation attribute applied to the **OrderId** property.

```xml
 <EntityType Name="Orders" xmlns:c="http://CustomNamespace">
   <Key>
     <PropertyRef Name="OrderId" />
   </Key>
   <Property Name="OrderId" Type="int" Nullable="false"
             c:CustomAttribute="someValue"/>
   <Property Name="ProductId" Type="int" Nullable="false" />
   <Property Name="Quantity" Type="int" Nullable="false" />
   <Property Name="CustomerId" Type="int" Nullable="false" />
   <c:CustomElement>
     Custom data here.
   </c:CustomElement>
 </EntityType>
```

## Facets (SSDL)

Facets in store schema definition language (SSDL) represent constraints on column types that are specified in Property elements. Facets are implemented as XML attributes on **Property** elements.

The following table describes the facets that are supported in SSDL:

| Facet           | Description                                                                                                                                                                                                                                                 |
|:----------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Collation**   | Specifies the collating sequence (or sorting sequence) to be used when performing comparison and ordering operations on values of the property.                                                                                                             |
| **FixedLength** | Specifies whether the length of the column value can vary.                                                                                                                                                                                                  |
| **MaxLength**   | Specifies the maximum length of the column value.                                                                                                                                                                                                           |
| **Precision**   | For properties of type **Decimal**, specifies the number of digits a property value can have. For properties of type **Time**, **DateTime**, and **DateTimeOffset**, specifies the number of digits for the fractional part of seconds of the column value. |
| **Scale**       | Specifies the number of digits to the right of the decimal point for the column value.                                                                                                                                                                      |
| **Unicode**     | Indicates whether the column value is stored as Unicode.                                                                                                                                                                                                    |
