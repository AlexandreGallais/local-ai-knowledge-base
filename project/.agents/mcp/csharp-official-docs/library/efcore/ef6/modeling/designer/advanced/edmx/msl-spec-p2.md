---
title: "MSL Specification - EF6 (part 2 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/msl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# MSL Specification - EF6 (part 2 of 8)

## ComplexProperty Element (MSL)

A **ComplexProperty** element in mapping specification language (MSL) defines the mapping between a complex type property on a conceptual model entity type and table columns in the underlying database. The property-column mappings are specified in child ScalarProperty elements.

The **ComplexType** property element can have the following child elements:

-   ScalarProperty (zero or more)
-   **ComplexProperty** (zero or more)
-   ComplexTypeMapping (zero or more)
-   Condition (zero or more)

### Applicable Attributes

The following table describes the attributes that are applicable to the **ComplexProperty** element:

| Attribute Name | Is Required | Value                                                                                            |
|:---------------|:------------|:-------------------------------------------------------------------------------------------------|
| **Name**       | Yes         | The name of the complex property of an entity type in the conceptual model that is being mapped. |
| **TypeName**   | No          | The namespace-qualified name of the conceptual model property type.                              |

### Example

The following example is based on the School model. The following complex type has been added to the conceptual model:

```xml
 <ComplexType Name="FullName">
   <Property Type="String" Name="LastName"
             Nullable="false" MaxLength="50"
             FixedLength="false" Unicode="true" />
   <Property Type="String" Name="FirstName"
             Nullable="false" MaxLength="50"
             FixedLength="false" Unicode="true" />
 </ComplexType>
```

The **LastName** and **FirstName** properties of the **Person** entity type have been replaced with one complex property, **Name**:

```xml
 <EntityType Name="Person">
   <Key>
     <PropertyRef Name="PersonID" />
   </Key>
   <Property Name="PersonID" Type="Int32" Nullable="false"
             annotation:StoreGeneratedPattern="Identity" />
   <Property Name="HireDate" Type="DateTime" />
   <Property Name="EnrollmentDate" Type="DateTime" />
   <Property Name="Name" Type="SchoolModel.FullName" Nullable="false" />
 </EntityType>
```

The following MSL shows the **ComplexProperty** element used to map the **Name** property to columns in the underlying database:

```xml
 <EntitySetMapping Name="People">
   <EntityTypeMapping TypeName="SchoolModel.Person">
     <MappingFragment StoreEntitySet="Person">
       <ScalarProperty Name="PersonID" ColumnName="PersonID" />
       <ScalarProperty Name="HireDate" ColumnName="HireDate" />
       <ScalarProperty Name="EnrollmentDate" ColumnName="EnrollmentDate" />
       <ComplexProperty Name="Name" TypeName="SchoolModel.FullName">
         <ScalarProperty Name="FirstName" ColumnName="FirstName" />
         <ScalarProperty Name="LastName" ColumnName="LastName" />  
       </ComplexProperty>
     </MappingFragment>
   </EntityTypeMapping>
 </EntitySetMapping>
```

## ComplexTypeMapping Element (MSL)

The **ComplexTypeMapping** element in mapping specification language (MSL) is a child of the ResultMapping element and defines the mapping between a function import in the conceptual model and a stored procedure in the underlying database when the following are true:

-   The function import returns a conceptual complex type.
-   The names of the columns returned by the stored procedure do not exactly match the names of the properties on the complex type.

By default, the mapping between the columns returned by a stored procedure and a complex type is based on column and property names. If column names do not exactly match property names, you must use the **ComplexTypeMapping** element to define the mapping. For an example of the default mapping, see FunctionImportMapping Element (MSL).

The **ComplexTypeMapping** element can have the following child elements:

-   ScalarProperty (zero or more)

### Applicable Attributes

The following table describes the attributes that are applicable to the **ComplexTypeMapping** element.

| Attribute Name | Is Required | Value                                                                  |
|:---------------|:------------|:-----------------------------------------------------------------------|
| **TypeName**   | Yes         | The namespace-qualified name of the complex type that is being mapped. |

### Example

Consider the following stored procedure:

```sql
 CREATE PROCEDURE [dbo].[GetGrades]
             @student_Id int
             AS
             SELECT     EnrollmentID as enroll_id,
                                                                             Grade as grade,
                                                                             CourseID as course_id,
                                                                             StudentID as student_id
                                               FROM dbo.StudentGrade
             WHERE StudentID = @student_Id
```

Also consider the following conceptual model complex type:

```xml
 <ComplexType Name="GradeInfo">
   <Property Type="Int32" Name="EnrollmentID" Nullable="false" />
   <Property Type="Decimal" Name="Grade" Nullable="true"
             Precision="3" Scale="2" />
   <Property Type="Int32" Name="CourseID" Nullable="false" />
   <Property Type="Int32" Name="StudentID" Nullable="false" />
 </ComplexType>
```

In order to create a function import that returns instances of the previous complex type, the mapping between the columns returned by the stored procedure and the entity type must be defined in a **ComplexTypeMapping** element:

```xml
 <FunctionImportMapping FunctionImportName="GetGrades"
                        FunctionName="SchoolModel.Store.GetGrades" >
   <ResultMapping>
     <ComplexTypeMapping TypeName="SchoolModel.GradeInfo">
       <ScalarProperty Name="EnrollmentID" ColumnName="enroll_id"/>
       <ScalarProperty Name="CourseID" ColumnName="course_id"/>
       <ScalarProperty Name="StudentID" ColumnName="student_id"/>
       <ScalarProperty Name="Grade" ColumnName="grade"/>
     </ComplexTypeMapping>
   </ResultMapping>
 </FunctionImportMapping>
```

## Condition Element (MSL)

The **Condition** element in mapping specification language (MSL) places conditions on mappings between the conceptual model and the underlying database. The mapping that is defined within an XML node is valid if all conditions, as specified in child **Condition** elements, are met. Otherwise, the mapping is not valid. For example, if a MappingFragment element contains one or more **Condition** child elements, the mapping defined within the **MappingFragment** node will only be valid if all the conditions of the child **Condition** elements are met.

Each condition can apply to either a **Name** (the name of a conceptual model entity property, specified by the **Name** attribute), or a **ColumnName** (the name of a column in the database, specified by the **ColumnName** attribute). When the **Name** attribute is set, the condition is checked against an entity property value. When the **ColumnName** attribute is set, the condition is checked against a column value. Only one of the **Name** or **ColumnName** attribute can be specified in a **Condition** element.

> **Note:**
> When the **Condition** element is used within a FunctionImportMapping element, only the **Name** attribute is not applicable.

The **Condition** element can be a child of the following elements:

-   AssociationSetMapping
-   ComplexProperty
-   EntitySetMapping
-   MappingFragment
-   EntityTypeMapping

The **Condition** element can have no child elements.

### Applicable Attributes

The following table describes the attributes that are applicable to the **Condition** element:

| Attribute Name | Is Required | Value                                                                                                                                                                                                                                                                                         |
|:---------------|:------------|:----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| **ColumnName** | No          | The name of the table column whose value is used to evaluate the condition.                                                                                                                                                                                                                   |
| **IsNull**     | No          | **True** or **False**. If the value is **True** and the column value is **null**, or if the value is **False** and the column value is not **null**, the condition is true. Otherwise, the condition is false.  The **IsNull** and **Value** attributes cannot be used at the same time. |
| **Value**      | No          | The value with which the column value is compared. If the values are the same, the condition is true. Otherwise, the condition is false.  The **IsNull** and **Value** attributes cannot be used at the same time.                                                                       |
| **Name**       | No          | The name of the conceptual model entity property whose value is used to evaluate the condition.  This attribute is not applicable if the **Condition** element is used within a FunctionImportMapping element.                                                                           |

### Example

The following example shows **Condition** elements as children of **MappingFragment** elements. When **HireDate** is not null and **EnrollmentDate** is null, data is mapped between the **SchoolModel.Instructor** type and the **PersonID** and **HireDate** columns of the **Person** table. When **EnrollmentDate** is not null and **HireDate** is null, data is mapped between the **SchoolModel.Student** type and the **PersonID** and **Enrollment** columns of the **Person** table.

```xml
 <EntitySetMapping Name="People">
   <EntityTypeMapping TypeName="IsTypeOf(SchoolModel.Person)">
     <MappingFragment StoreEntitySet="Person">
       <ScalarProperty Name="PersonID" ColumnName="PersonID" />
       <ScalarProperty Name="FirstName" ColumnName="FirstName" />
       <ScalarProperty Name="LastName" ColumnName="LastName" />
     </MappingFragment>
   </EntityTypeMapping>
   <EntityTypeMapping TypeName="IsTypeOf(SchoolModel.Instructor)">
     <MappingFragment StoreEntitySet="Person">
       <ScalarProperty Name="PersonID" ColumnName="PersonID" />
       <ScalarProperty Name="HireDate" ColumnName="HireDate" />
       <Condition ColumnName="HireDate" IsNull="false" />
       <Condition ColumnName="EnrollmentDate" IsNull="true" />
     </MappingFragment>
   </EntityTypeMapping>
   <EntityTypeMapping TypeName="IsTypeOf(SchoolModel.Student)">
     <MappingFragment StoreEntitySet="Person">
       <ScalarProperty Name="PersonID" ColumnName="PersonID" />
       <ScalarProperty Name="EnrollmentDate"
                       ColumnName="EnrollmentDate" />
       <Condition ColumnName="EnrollmentDate" IsNull="false" />
       <Condition ColumnName="HireDate" IsNull="true" />
     </MappingFragment>
   </EntityTypeMapping>
 </EntitySetMapping>
```
