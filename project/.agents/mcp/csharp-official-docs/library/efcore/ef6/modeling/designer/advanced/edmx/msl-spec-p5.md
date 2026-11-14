---
title: "MSL Specification - EF6 (part 5 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/msl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# MSL Specification - EF6 (part 5 of 8)

## InsertFunction Element (MSL)

The **InsertFunction** element in mapping specification language (MSL) maps the insert function of an entity type or association in the conceptual model to a stored procedure in the underlying database. Stored procedures to which modification functions are mapped must be declared in the storage model. For more information, see Function Element (SSDL).

> **Note:**
> If you do not map all three of the insert, update, or delete operations of an entity type to stored procedures, the unmapped operations will fail if executed at runtime and an UpdateException is thrown.

The **InsertFunction** element can be a child of the ModificationFunctionMapping element and applied to the EntityTypeMapping element or the AssociationSetMapping element.

### InsertFunction Applied to EntityTypeMapping

When applied to the EntityTypeMapping element, the **InsertFunction** element maps the insert function of an entity type in the conceptual model to a stored procedure.

The **InsertFunction** element can have the following child elements when applied to an **EntityTypeMapping** element:

-   AssociationEnd (zero or more)
-   ComplexProperty (zero or more)
-   ResultBinding (zero or one)
-   ScalarProperty (zero or more)

#### Applicable Attributes

The following table describes the attributes that can be applied to the **InsertFunction** element when applied to an **EntityTypeMapping** element.

| Attribute Name            | Is Required | Value                                                                                                                                                    |
|:--------------------------|:------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **FunctionName**          | Yes         | The namespace-qualified name of the stored procedure to which the insert function is mapped. The stored procedure must be declared in the storage model. |
| **RowsAffectedParameter** | No          | The name of the output parameter that returns the number of affected rows.                                                                               |

#### Example

The following example is based on the School model and shows the **InsertFunction** element used to map insert function of the Person entity type to the **InsertPerson** stored procedure. The **InsertPerson** stored procedure is declared in the storage model.

```xml
 <EntityTypeMapping TypeName="SchoolModel.Person">
   <ModificationFunctionMapping>
     <InsertFunction FunctionName="SchoolModel.Store.InsertPerson">
       <ScalarProperty Name="EnrollmentDate"
                       ParameterName="EnrollmentDate" />
       <ScalarProperty Name="HireDate" ParameterName="HireDate" />
       <ScalarProperty Name="FirstName" ParameterName="FirstName" />
       <ScalarProperty Name="LastName" ParameterName="LastName" />
       <ResultBinding Name="PersonID" ColumnName="NewPersonID" />
     </InsertFunction>
     <UpdateFunction FunctionName="SchoolModel.Store.UpdatePerson">
       <ScalarProperty Name="EnrollmentDate"
                       ParameterName="EnrollmentDate"
                       Version="Current" />
       <ScalarProperty Name="HireDate" ParameterName="HireDate"
                       Version="Current" />
       <ScalarProperty Name="FirstName" ParameterName="FirstName"
                       Version="Current" />
       <ScalarProperty Name="LastName" ParameterName="LastName"
                       Version="Current" />
       <ScalarProperty Name="PersonID" ParameterName="PersonID"
                       Version="Current" />
     </UpdateFunction>
     <DeleteFunction FunctionName="SchoolModel.Store.DeletePerson">
       <ScalarProperty Name="PersonID" ParameterName="PersonID" />
     </DeleteFunction>
   </ModificationFunctionMapping>
 </EntityTypeMapping>
```
### InsertFunction Applied to AssociationSetMapping

When applied to the AssociationSetMapping element, the **InsertFunction** element maps the insert function of an association in the conceptual model to a stored procedure.

The **InsertFunction** element can have the following child elements when applied to the **AssociationSetMapping** element:

-   EndProperty

#### Applicable Attributes

The following table describes the attributes that can be applied to the **InsertFunction** element when it is applied to the **AssociationSetMapping** element.

| Attribute Name            | Is Required | Value                                                                                                                                                    |
|:--------------------------|:------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **FunctionName**          | Yes         | The namespace-qualified name of the stored procedure to which the insert function is mapped. The stored procedure must be declared in the storage model. |
| **RowsAffectedParameter** | No          | The name of the output parameter that returns the number of rows affected.                                                                               |

#### Example

The following example is based on the School model and shows the **InsertFunction** element used to map insert function of the **CourseInstructor** association to the **InsertCourseInstructor** stored procedure. The **InsertCourseInstructor** stored procedure is declared in the storage model.

```xml
 <AssociationSetMapping Name="CourseInstructor"
                        TypeName="SchoolModel.CourseInstructor"
                        StoreEntitySet="CourseInstructor">
   <EndProperty Name="Person">
     <ScalarProperty Name="PersonID" ColumnName="PersonID" />
   </EndProperty>
   <EndProperty Name="Course">
     <ScalarProperty Name="CourseID" ColumnName="CourseID" />
   </EndProperty>
   <ModificationFunctionMapping>
     <InsertFunction FunctionName="SchoolModel.Store.InsertCourseInstructor" >   
       <EndProperty Name="Course">
         <ScalarProperty Name="CourseID" ParameterName="courseId"/>
       </EndProperty>
       <EndProperty Name="Person">
         <ScalarProperty Name="PersonID" ParameterName="instructorId"/>
       </EndProperty>
     </InsertFunction>
     <DeleteFunction FunctionName="SchoolModel.Store.DeleteCourseInstructor">
       <EndProperty Name="Course">
         <ScalarProperty Name="CourseID" ParameterName="courseId"/>
       </EndProperty>
       <EndProperty Name="Person">
         <ScalarProperty Name="PersonID" ParameterName="instructorId"/>
       </EndProperty>
     </DeleteFunction>
   </ModificationFunctionMapping>
 </AssociationSetMapping>
```

## Mapping Element (MSL)

The **Mapping** element in mapping specification language (MSL) contains information for mapping objects that are defined in a conceptual model to a database (as described in a storage model). For more information, see CSDL Specification and SSDL Specification.

The **Mapping** element is the root element for a mapping specification. The XML namespace for mapping specifications is `https://schemas.microsoft.com/ado/2009/11/mapping/cs`.

The mapping element can have the following child elements (in the order listed):

-   Alias (zero or more)
-   EntityContainerMapping (exactly one)

Names of conceptual and storage model types that are referenced in MSL must be qualified by their respective namespace names. For information about the conceptual model namespace name, see Schema Element (CSDL). For information about the storage model namespace name, see Schema Element (SSDL). Aliases for namespaces that are used in MSL can be defined with the Alias element.

### Applicable Attributes

The table below describes the attributes that can be applied to the **Mapping** element.

| Attribute Name | Is Required | Value                                                 |
|:---------------|:------------|:------------------------------------------------------|
| **Space**      | Yes         | **C-S**. This is a fixed value and cannot be changed. |

### Example

The following example shows a **Mapping** element that is based on part of the School model. For more information about the School model, see Quickstart (Entity Framework):

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

## MappingFragment Element (MSL)

The **MappingFragment** element in mapping specification language (MSL) defines the mapping between the properties of a conceptual model entity type and a table or view in the database. For information about conceptual model entity types and underlying database tables or views, see EntityType Element (CSDL) and EntitySet Element (SSDL). The **MappingFragment** can be a child element of the EntityTypeMapping element or the EntitySetMapping element.

The **MappingFragment** element can have the following child elements:

-   ComplexType (zero or more)
-   ScalarProperty (zero or more)
-   Condition (zero or more)

### Applicable Attributes

The following table describes the attributes that can be applied to the **MappingFragment** element.

| Attribute Name          | Is Required | Value                                                                                                                                                                                                                         |
|:------------------------|:------------|:------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **StoreEntitySet**      | Yes         | The name of the table or view that is being mapped.                                                                                                                                                                           |
| **MakeColumnsDistinct** | No          | **True** or **False** depending on whether only distinct rows are returned.  If this attribute is set to **True**, the **GenerateUpdateViews** attribute of the EntityContainerMapping element must be set to **False**. |

### Example

The following example shows a **MappingFragment** element as the child of an **EntityTypeMapping** element. In this example, properties of the **Course** type in the conceptual model are mapped to columns of the **Course** table in the database.

```xml
 <EntitySetMapping Name="Courses">
   <EntityTypeMapping TypeName="SchoolModel.Course">
     <MappingFragment StoreEntitySet="Course">
       <ScalarProperty Name="CourseID" ColumnName="CourseID" />
       <ScalarProperty Name="Title" ColumnName="Title" />
       <ScalarProperty Name="Credits" ColumnName="Credits" />
       <ScalarProperty Name="DepartmentID" ColumnName="DepartmentID" />
     </MappingFragment>
   </EntityTypeMapping>
 </EntitySetMapping>
```

### Example

The following example shows a **MappingFragment** element as the child of an **EntitySetMapping** element. As in the example above, properties of the **Course** type in the conceptual model are mapped to columns of the **Course** table in the database.

```xml
 <EntitySetMapping Name="Courses" TypeName="SchoolModel.Course">
     <MappingFragment StoreEntitySet="Course">
       <ScalarProperty Name="CourseID" ColumnName="CourseID" />
       <ScalarProperty Name="Title" ColumnName="Title" />
       <ScalarProperty Name="Credits" ColumnName="Credits" />
       <ScalarProperty Name="DepartmentID" ColumnName="DepartmentID" />
     </MappingFragment>
 </EntitySetMapping>
```
