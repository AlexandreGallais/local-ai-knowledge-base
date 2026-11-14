---
title: "CSDL Specification - EF6 (part 10 of 12)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/csdl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# CSDL Specification - EF6 (part 10 of 12)

## Using Element (CSDL)

The **Using** element in conceptual schema definition language (CSDL) imports the contents of a conceptual model that exists in a different namespace. By setting the value of the **Namespace** attribute, you can refer to entity types, complex types, and association types that are defined in another conceptual model. More than one **Using** element can be a child of a **Schema** element.

> **Note:**
> The **Using** element in CSDL does not function exactly like a **using** statement in a programming language. By importing a namespace with a **using** statement in a programming language, you do not affect objects in the original namespace. In CSDL, an imported namespace can contain an entity type that is derived from an entity type in the original namespace. This can affect entity sets declared in the original namespace.

 

The **Using** element can have the following child elements:

-   Documentation (zero or one elements allowed)
-   Annotation elements (zero or more elements allowed)

### Applicable Attributes

The table below describes the attributes can be applied to the **Using** element.

| Attribute Name | Is Required | Value                                                                                                                                                                              |
|:---------------|:------------|:-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **Namespace**  | Yes         | The name of the imported namespace.                                                                                                                                                |
| **Alias**      | Yes         | An identifier used in place of the namespace name. Although this attribute is required, it is not required that it be used in place of the namespace name to qualify object names. |

 

> **Note:**
> Any number of annotation attributes (custom XML attributes) may be applied to the **Using** element. However, custom attributes may not belong to any XML namespace that is reserved for CSDL. The fully-qualified names for any two custom attributes cannot be the same.

 

### Example

The following example demonstrates the **Using** element being used to import a namespace that is defined elsewhere. Note that the namespace for the **Schema** element shown is `BooksModel`. The `Address` property on the `Publisher`**EntityType** is a complex type that is defined in the `ExtendedBooksModel` namespace (imported with the **Using** element).

```xml
 <Schema xmlns="https://schemas.microsoft.com/ado/2009/11/edm"
           xmlns:cg="https://schemas.microsoft.com/ado/2009/11/codegeneration"
           xmlns:store="https://schemas.microsoft.com/ado/2009/11/edm/EntityStoreSchemaGenerator"
           Namespace="BooksModel" Alias="Self">

     <Using Namespace="BooksModel.Extended" Alias="BMExt" />

 <EntityContainer Name="BooksContainer" >
       <EntitySet Name="Publishers" EntityType="BooksModel.Publisher" />
     </EntityContainer>

 <EntityType Name="Publisher">
       <Key>
         <PropertyRef Name="Id" />
       </Key>
       <Property Type="Int32" Name="Id" Nullable="false" />
       <Property Type="String" Name="Name" Nullable="false" />
       <Property Type="BMExt.Address" Name="Address" Nullable="false" />
     </EntityType>

 </Schema>
```
 

 

## Annotation Attributes (CSDL)

Annotation attributes in conceptual schema definition language (CSDL) are custom XML attributes in the conceptual model. In addition to having valid XML structure, the following must be true of annotation attributes:

-   Annotation attributes must not be in any XML namespace that is reserved for CSDL.
-   More than one annotation attribute may be applied to a given CSDL element.
-   The fully-qualified names of any two annotation attributes must not be the same.

Annotation attributes can be used to provide extra metadata about the elements in a conceptual model. Metadata contained in annotation elements can be accessed at runtime by using classes in the System.Data.Metadata.Edm namespace.

### Example

The following example shows an **EntityType** element with an annotation attribute (**CustomAttribute**). The example also shows an annotation element applied to the entity type element.

```xml
 <Schema Namespace="SchoolModel" Alias="Self"
         xmlns:annotation="https://schemas.microsoft.com/ado/2009/02/edm/annotation"
         xmlns="https://schemas.microsoft.com/ado/2009/11/edm">
   <EntityContainer Name="SchoolEntities" annotation:LazyLoadingEnabled="true">
     <EntitySet Name="People" EntityType="SchoolModel.Person" />
   </EntityContainer>
   <EntityType Name="Person" xmlns:p="http://CustomNamespace.com"
               p:CustomAttribute="Data here.">
     <Key>
       <PropertyRef Name="PersonID" />
     </Key>
     <Property Name="PersonID" Type="Int32" Nullable="false"
               annotation:StoreGeneratedPattern="Identity" />
     <Property Name="LastName" Type="String" Nullable="false"
               MaxLength="50" Unicode="true" FixedLength="false" />
     <Property Name="FirstName" Type="String" Nullable="false"
               MaxLength="50" Unicode="true" FixedLength="false" />
     <Property Name="HireDate" Type="DateTime" />
     <Property Name="EnrollmentDate" Type="DateTime" />
     <p:CustomElement>
       Custom metadata.
     </p:CustomElement>
   </EntityType>
 </Schema>
```
 

The following code retrieves the metadata in the annotation attribute and writes it to the console:

```xml
 EdmItemCollection collection = new EdmItemCollection("School.csdl");
 MetadataWorkspace workspace = new MetadataWorkspace();
 workspace.RegisterItemCollection(collection);
 EdmType contentType;
 workspace.TryGetType("Person", "SchoolModel", DataSpace.CSpace, out contentType);
 if (contentType.MetadataProperties.Contains("http://CustomNamespace.com:CustomAttribute"))
 {
     MetadataProperty annotationProperty =
         contentType.MetadataProperties["http://CustomNamespace.com:CustomAttribute"];
     object annotationValue = annotationProperty.Value;
     Console.WriteLine(annotationValue.ToString());
 }
```
 

The code above assumes that the `School.csdl` file is in the project's output directory and that you have added the following `Imports` and `Using` statements to your project:

```csharp
 using System.Data.Metadata.Edm;
```
 

 

## Annotation Elements (CSDL)

Annotation elements in conceptual schema definition language (CSDL) are custom XML elements in the conceptual model. In addition to having valid XML structure, the following must be true of annotation elements:

-   Annotation elements must not be in any XML namespace that is reserved for CSDL.
-   More than one annotation element may be a child of a given CSDL element.
-   The fully-qualified names of any two annotation elements must not be the same.
-   Annotation elements must appear after all other child elements of a given CSDL element.

Annotation elements can be used to provide extra metadata about the elements in a conceptual model. Starting with the .NET Framework version 4, metadata contained in annotation elements can be accessed at runtime by using classes in the System.Data.Metadata.Edm namespace.

### Example

The following example shows an **EntityType** element with an annotation element (**CustomElement**). The example also show an annotation attribute applied to the entity type element.

```xml
 <Schema Namespace="SchoolModel" Alias="Self"
         xmlns:annotation="https://schemas.microsoft.com/ado/2009/02/edm/annotation"
         xmlns="https://schemas.microsoft.com/ado/2009/11/edm">
   <EntityContainer Name="SchoolEntities" annotation:LazyLoadingEnabled="true">
     <EntitySet Name="People" EntityType="SchoolModel.Person" />
   </EntityContainer>
   <EntityType Name="Person" xmlns:p="http://CustomNamespace.com"
               p:CustomAttribute="Data here.">
     <Key>
       <PropertyRef Name="PersonID" />
     </Key>
     <Property Name="PersonID" Type="Int32" Nullable="false"
               annotation:StoreGeneratedPattern="Identity" />
     <Property Name="LastName" Type="String" Nullable="false"
               MaxLength="50" Unicode="true" FixedLength="false" />
     <Property Name="FirstName" Type="String" Nullable="false"
               MaxLength="50" Unicode="true" FixedLength="false" />
     <Property Name="HireDate" Type="DateTime" />
     <Property Name="EnrollmentDate" Type="DateTime" />
     <p:CustomElement>
       Custom metadata.
     </p:CustomElement>
   </EntityType>
 </Schema>
```
 

The following code retrieves the metadata in the annotation element and writes it to the console:

```csharp
 EdmItemCollection collection = new EdmItemCollection("School.csdl");
 MetadataWorkspace workspace = new MetadataWorkspace();
 workspace.RegisterItemCollection(collection);
 EdmType contentType;
 workspace.TryGetType("Person", "SchoolModel", DataSpace.CSpace, out contentType);
 if (contentType.MetadataProperties.Contains("http://CustomNamespace.com:CustomElement"))
 {
     MetadataProperty annotationProperty =
         contentType.MetadataProperties["http://CustomNamespace.com:CustomElement"];
     object annotationValue = annotationProperty.Value;
     Console.WriteLine(annotationValue.ToString());
 }
```
 

The code above assumes that the School.csdl file is in the project's output directory and that you have added the following `Imports` and `Using` statements to your project:

```csharp
 using System.Data.Metadata.Edm;
```
