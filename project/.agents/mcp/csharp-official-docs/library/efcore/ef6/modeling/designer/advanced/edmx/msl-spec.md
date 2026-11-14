---
title: "MSL Specification - EF6 (part 1 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/msl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# MSL Specification

> **Note:**
> MSL v1 is unsupported, please update to V3

Mapping specification language (MSL) is an XML-based language that describes the mapping between the conceptual model and storage model of an Entity Framework application.

In an Entity Framework application, mapping metadata is loaded from an .msl file (written in MSL) at build time. Entity Framework uses mapping metadata at runtime to translate queries against the conceptual model to store-specific commands.

The Entity Framework Designer (EF Designer) stores mapping information in an .edmx file at design time. At build time, the Entity Designer uses information in an .edmx file to create the .msl file that is needed by Entity Framework at runtime

Names of all conceptual or storage model types that are referenced in MSL must be qualified by their respective namespace names. For information about the conceptual model namespace name, see CSDL Specification. For information about the storage model namespace name, see SSDL Specification.

Versions of MSL are differentiated by XML namespaces.

| MSL Version | XML Namespace                                        |
|:------------|:-----------------------------------------------------|
| MSL v1      | urn:schemas-microsoft-com:windows:storage:mapping:CS |
| MSL v2      | `https://schemas.microsoft.com/ado/2008/09/mapping/cs` |
| MSL v3      | `https://schemas.microsoft.com/ado/2009/11/mapping/cs` |

## Alias Element (MSL)

The **Alias** element in mapping specification language (MSL) is a child of the Mapping element that is used to define aliases for conceptual model and storage model namespaces. Names of all conceptual or storage model types that are referenced in MSL must be qualified by their respective namespace names. For information about the conceptual model namespace name, see Schema Element (CSDL). For information about the storage model namespace name, see Schema Element (SSDL).

The **Alias** element cannot have child elements.

### Applicable Attributes

The table below describes the attributes that can be applied to the **Alias** element.

| Attribute Name | Is Required | Value                                                                     |
|:---------------|:------------|:--------------------------------------------------------------------------|
| **Key**        | Yes         | The alias for the namespace that is specified by the **Value** attribute. |
| **Value**      | Yes         | The namespace for which the value of the **Key** element is an alias.     |

### Example

The following example shows an **Alias** element that defines an alias, `c`, for types that are defined in the conceptual model.

```xml
 <Mapping Space="C-S"
          xmlns="https://schemas.microsoft.com/ado/2009/11/mapping/cs">
   <Alias Key="c" Value="SchoolModel"/>
   <EntityContainerMapping StorageEntityContainer="SchoolModelStoreContainer"
                           CdmEntityContainer="SchoolModelEntities">
     <EntitySetMapping Name="Courses">
       <EntityTypeMapping TypeName="c.Course">
         <MappingFragment StoreEntitySet="Course">
           <ScalarProperty Name="CourseID" ColumnName="CourseID" />
           <ScalarProperty Name="Title" ColumnName="Title" />
           <ScalarProperty Name="Credits" ColumnName="Credits" />
           <ScalarProperty Name="DepartmentID" ColumnName="DepartmentID" />
         </MappingFragment>
       </EntityTypeMapping>
     </EntitySetMapping>
     <EntitySetMapping Name="Departments">
       <EntityTypeMapping TypeName="c.Department">
         <MappingFragment StoreEntitySet="Department">
           <ScalarProperty Name="DepartmentID" ColumnName="DepartmentID" />
           <ScalarProperty Name="Name" ColumnName="Name" />
           <ScalarProperty Name="Budget" ColumnName="Budget" />
           <ScalarProperty Name="StartDate" ColumnName="StartDate" />
           <ScalarProperty Name="Administrator" ColumnName="Administrator" />
         </MappingFragment>
       </EntityTypeMapping>
     </EntitySetMapping>
   </EntityContainerMapping>
 </Mapping>
```

## AssociationEnd Element (MSL)

The **AssociationEnd** element in mapping specification language (MSL) is used when the modification functions of an entity type in the conceptual model are mapped to stored procedures in the underlying database. If a modification stored procedure takes a parameter whose value is held in an association property, the **AssociationEnd** element maps the property value to the parameter. For more information, see the example below.

For more information about mapping modification functions of entity types to stored procedures, see ModificationFunctionMapping Element (MSL) and Walkthrough: Mapping an Entity to Stored Procedures.

The **AssociationEnd** element can have the following child elements:

-   ScalarProperty

### Applicable Attributes

The following table describes the attributes that are applicable to the **AssociationEnd** element.

| Attribute Name     | Is Required | Value                                                                                                                                                                             |
|:-------------------|:------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **AssociationSet** | Yes         | The name of the association that is being mapped.                                                                                                                                 |
| **From**           | Yes         | The value of the **FromRole** attribute of the navigation property that corresponds to the association being mapped. For more information, see NavigationProperty Element (CSDL). |
| **To**             | Yes         | The value of the **ToRole** attribute of the navigation property that corresponds to the association being mapped. For more information, see NavigationProperty Element (CSDL).   |

### Example

Consider the following conceptual model entity type:

```xml
 <EntityType Name="Course">
   <Key>
     <PropertyRef Name="CourseID" />
   </Key>
   <Property Type="Int32" Name="CourseID" Nullable="false" />
   <Property Type="String" Name="Title" Nullable="false" MaxLength="100"
             FixedLength="false" Unicode="true" />
   <Property Type="Int32" Name="Credits" Nullable="false" />
   <NavigationProperty Name="Department"
                       Relationship="SchoolModel.FK_Course_Department"
                       FromRole="Course" ToRole="Department" />
 </EntityType>
```

Also consider the following stored procedure:

```sql
 CREATE PROCEDURE [dbo].[UpdateCourse]
                                @CourseID int,
                                @Title nvarchar(50),
                                @Credits int,
                                @DepartmentID int
                                AS
                                UPDATE Course SET Title=@Title,
                                                              Credits=@Credits,
                                                              DepartmentID=@DepartmentID
                                WHERE CourseID=@CourseID;
```

In order to map the update function of the `Course` entity to this stored procedure, you must supply a value to the **DepartmentID** parameter. The value for `DepartmentID` does not correspond to a property on the entity type; it is contained in an independent association whose mapping is shown here:

```xml
 <AssociationSetMapping Name="FK_Course_Department"
                        TypeName="SchoolModel.FK_Course_Department"
                        StoreEntitySet="Course">
   <EndProperty Name="Course">
     <ScalarProperty Name="CourseID" ColumnName="CourseID" />
   </EndProperty>
   <EndProperty Name="Department">
     <ScalarProperty Name="DepartmentID" ColumnName="DepartmentID" />
   </EndProperty>
 </AssociationSetMapping>
```

The following code shows the **AssociationEnd** element used to map the **DepartmentID** property of the **FK\_Course\_Department** association to the **UpdateCourse** stored procedure (to which the update function of the **Course** entity type is mapped):

```xml
 <EntitySetMapping Name="Courses">
   <EntityTypeMapping TypeName="SchoolModel.Course">
     <MappingFragment StoreEntitySet="Course">
       <ScalarProperty Name="Credits" ColumnName="Credits" />
       <ScalarProperty Name="Title" ColumnName="Title" />
       <ScalarProperty Name="CourseID" ColumnName="CourseID" />
     </MappingFragment>
   </EntityTypeMapping>
   <EntityTypeMapping TypeName="SchoolModel.Course">
     <ModificationFunctionMapping>
       <UpdateFunction FunctionName="SchoolModel.Store.UpdateCourse">
         <AssociationEnd AssociationSet="FK_Course_Department"
                         From="Course" To="Department">
           <ScalarProperty Name="DepartmentID"
                           ParameterName="DepartmentID"
                           Version="Current" />
         </AssociationEnd>
         <ScalarProperty Name="Credits" ParameterName="Credits"
                         Version="Current" />
         <ScalarProperty Name="Title" ParameterName="Title"
                         Version="Current" />
         <ScalarProperty Name="CourseID" ParameterName="CourseID"
                         Version="Current" />
       </UpdateFunction>
     </ModificationFunctionMapping>
   </EntityTypeMapping>
 </EntitySetMapping>
```

## AssociationSetMapping Element (MSL)

The **AssociationSetMapping** element in mapping specification language (MSL) defines the mapping between an association in the conceptual model and table columns in the underlying database.

Associations in the conceptual model are types whose properties represent primary and foreign key <example-value> in the underlying database. The **AssociationSetMapping** element uses two EndProperty elements to define the mappings between association type properties and columns in the database. You can place conditions on these mappings with the Condition element. Map the insert, update, and delete functions for associations to stored procedures in the database with the ModificationFunctionMapping element. Define read-only mappings between associations and table columns by using an Entity SQL string in a QueryView element.

> **Note:**
> If a referential constraint is defined for an association in the conceptual model, the association does not need to be mapped with an **AssociationSetMapping** element. If an **AssociationSetMapping** element is present for an association that has a referential constraint, the mappings defined in the **AssociationSetMapping** element will be ignored. For more information, see ReferentialConstraint Element (CSDL).

The **AssociationSetMapping** element can have the following child elements

-   QueryView (zero or one)
-   EndProperty (zero or two)
-   Condition (zero or more)
-   ModificationFunctionMapping (zero or one)

### Applicable Attributes

The following table describes the attributes that can be applied to the **AssociationSetMapping** element.

| Attribute Name     | Is Required | Value                                                                                       |
|:-------------------|:------------|:--------------------------------------------------------------------------------------------|
| **Name**           | Yes         | The name of the conceptual model association set that is being mapped.                      |
| **TypeName**       | No          | The namespace-qualified name of the conceptual model association type that is being mapped. |
| **StoreEntitySet** | No          | The name of the table that is being mapped.                                                 |

### Example

The following example shows an **AssociationSetMapping** element in which the **FK\_Course\_Department** association set in the conceptual model is mapped to the **Course** table in the database. Mappings between association type properties and table columns are specified in child **EndProperty** elements.

```xml
 <AssociationSetMapping Name="FK_Course_Department"
                        TypeName="SchoolModel.FK_Course_Department"
                        StoreEntitySet="Course">
   <EndProperty Name="Department">
     <ScalarProperty Name="DepartmentID" ColumnName="DepartmentID" />
   </EndProperty>
   <EndProperty Name="Course">
     <ScalarProperty Name="CourseID" ColumnName="CourseID" />
   </EndProperty>
 </AssociationSetMapping>
```
