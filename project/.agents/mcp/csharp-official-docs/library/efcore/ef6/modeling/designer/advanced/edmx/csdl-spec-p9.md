---
title: "CSDL Specification - EF6 (part 9 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 9 of 12)

## Schema Element (CSDL)

The **Schema** element is the root element of a conceptual model definition. It contains definitions for the objects, functions, and containers that make up a conceptual model.

The **Schema** element may contain zero or more of the following child elements:

-   Using
-   EntityContainer
-   EntityType
-   EnumType
-   Association
-   ComplexType
-   Function

A **Schema** element may contain zero or one Annotation elements.

> **Note:**
> The **Function** element and annotation elements are only allowed in CSDL v2 and later.

 

The **Schema** element uses the **Namespace** attribute to define the namespace for the entity type, complex type, and association objects in a conceptual model. Within a namespace, no two objects can have the same name. Namespaces can span multiple **Schema** elements and multiple .csdl files.

A conceptual model namespace is different from the XML namespace of the **Schema** element. A conceptual model namespace (as defined by the **Namespace** attribute) is a logical container for entity types, complex types, and association types. The XML namespace (indicated by the **xmlns** attribute) of a **Schema** element is the default namespace for child elements and attributes of the **Schema** element. XML namespaces of the form `https://schemas.microsoft.com/ado/YYYY/MM/edm` (where YYYY and MM represent a year and month respectively) are reserved for CSDL. Custom elements and attributes cannot be in namespaces that have this form.

### Applicable Attributes

The table below describes the attributes can be applied to the **Schema** element.

| Attribute Name | Is Required | Value                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      |
|:---------------|:------------|:-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Namespace**  | Yes         | The namespace of the conceptual model. The value of the **Namespace** attribute is used to form the fully qualified name of a type. For example, if an **EntityType** named *Customer* is in the Simple.Example.Model namespace, then the fully qualified name of the **EntityType** is SimpleExampleModel.Customer.  The following strings cannot be used as the value for the **Namespace** attribute: **System**, **Transient**, or **Edm**. The value for the **Namespace** attribute cannot be the same as the value for the **Namespace** attribute in the SSDL Schema element. |
| **Alias**      | No          | An identifier used in place of the namespace name. For example, if an **EntityType** named *Customer* is in the Simple.Example.Model namespace and the value of the **Alias** attribute is *Model*, then you can use Model.Customer as the fully qualified name of the **EntityType.**                                                                                                                                                                                                                                                                                                     |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Schema** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows a **Schema** element that contains an **EntityContainer** element, two **EntityType** elements, and one **Association** element.

```xml
 <Schema xmlns="https://schemas.microsoft.com/ado/2009/11/edm"
      xmlns:cg="https://schemas.microsoft.com/ado/2009/11/codegeneration"
      xmlns:store="https://schemas.microsoft.com/ado/2009/11/edm/EntityStoreSchemaGenerator"
       Namespace="ExampleModel" Alias="Self">
         <EntityContainer Name="ExampleModelContainer">
           <EntitySet Name="Customers"
                      EntityType="ExampleModel.Customer" />
           <EntitySet Name="Orders" EntityType="ExampleModel.Order" />
           <AssociationSet
                       Name="CustomerOrder"
                       Association="ExampleModel.CustomerOrders">
             <End Role="Customer" EntitySet="Customers" />
             <End Role="Order" EntitySet="Orders" />
           </AssociationSet>
         </EntityContainer>
         <EntityType Name="Customer">
           <Key>
             <PropertyRef Name="CustomerId" />
           </Key>
           <Property Type="Int32" Name="CustomerId" Nullable="false" />
           <Property Type="String" Name="Name" Nullable="false" />
           <NavigationProperty
                    Name="Orders"
                    Relationship="ExampleModel.CustomerOrders"
                    FromRole="Customer" ToRole="Order" />
         </EntityType>
         <EntityType Name="Order">
           <Key>
             <PropertyRef Name="OrderId" />
           </Key>
           <Property Type="Int32" Name="OrderId" Nullable="false" />
           <Property Type="Int32" Name="ProductId" Nullable="false" />
           <Property Type="Int32" Name="Quantity" Nullable="false" />
           <NavigationProperty
                    Name="Customer"
                    Relationship="ExampleModel.CustomerOrders"
                    FromRole="Order" ToRole="Customer" />
           <Property Type="Int32" Name="CustomerId" Nullable="false" />
         </EntityType>
         <Association Name="CustomerOrders">
           <End Type="ExampleModel.Customer"
                Role="Customer" Multiplicity="1" />
           <End Type="ExampleModel.Order"
                Role="Order" Multiplicity="*" />
           <ReferentialConstraint>
             <Principal Role="Customer">
               <PropertyRef Name="CustomerId" />
             </Principal>
             <Dependent Role="Order">
               <PropertyRef Name="CustomerId" />
             </Dependent>
           </ReferentialConstraint>
         </Association>
       </Schema>
```
 

 

## TypeRef Element (CSDL)

The **TypeRef** element in conceptual schema definition language (CSDL) provides a reference to an existing named type. The **TypeRef** element can be a child of the CollectionType element, which is used to specify that a function has a collection as a parameter or return type.

A **TypeRef** element can have the following child elements (in the order listed):

-   Documentation (zero or one element)
-   Annotation elements (zero or more elements)

### Applicable Attributes

The following table describes the attributes that can be applied to the **TypeRef** element. Note that the **DefaultValue**, **MaxLength**, **FixedLength**, **Precision**, **Scale**, **Unicode**, and **Collation** attributes are only applicable to **EDMSimpleTypes**.

| Attribute Name                                                     | Is Required | Value                                                                                                                                                                                                                           |
|:-------------------------------------------------------------------|:------------|:--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Type**                                                           | No          | The name of the type being referenced.                                                                                                                                                                                          |
| **Nullable**                                                       | No          | **True** (the default value) or **False** depending on whether the property can have a null value.  [!NOTE]                                                                                                                |
| > In CSDL v1 a complex type property must have `Nullable="False"`. |             |                                                                                                                                                                                                                                 |
| **DefaultValue**                                                   | No          | The default value of the property.                                                                                                                                                                                              |
| **MaxLength**                                                      | No          | The maximum length of the property value.                                                                                                                                                                                       |
| **FixedLength**                                                    | No          | **True** or **False** depending on whether the property value will be stored as a fixed length string.                                                                                                                          |
| **Precision**                                                      | No          | The precision of the property value.                                                                                                                                                                                            |
| **Scale**                                                          | No          | The scale of the property value.                                                                                                                                                                                                |
| **SRID**                                                           | No          | Spatial System Reference Identifier. Valid only for properties of spatial types. For more information, see SRID and SRID (SQL Server). |
| **Unicode**                                                        | No          | **True** or **False** depending on whether the property value will be stored as a Unicode string.                                                                                                                               |
| **Collation**                                                      | No          | A string that specifies the collating sequence to be used in the data source.                                                                                                                                                   |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **CollectionType** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example shows a model-defined function that uses the **TypeRef** element (as a child of a **CollectionType** element) to specify that the function accepts a collection of **Department** entity types.

```xml
 <Function Name="GetAvgBudget">
      <Parameter Name="Departments">
          <CollectionType>
             <TypeRef Type="SchoolModel.Department"/>
          </CollectionType>
           </Parameter>
       <ReturnType Type="Collection(Edm.Decimal)"/>
       <DefiningExpression>
             SELECT VALUE AVG(d.Budget) FROM Departments AS d
       </DefiningExpression>
 </Function>
```
