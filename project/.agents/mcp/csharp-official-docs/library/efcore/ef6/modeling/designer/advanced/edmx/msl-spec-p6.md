---
title: "MSL Specification - EF6 (part 6 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/msl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# MSL Specification - EF6 (part 6 of 8)

## ModificationFunctionMapping Element (MSL)

The **ModificationFunctionMapping** element in mapping specification language (MSL) maps the insert, update, and delete functions of a conceptual model entity type to stored procedures in the underlying database. The **ModificationFunctionMapping** element can also map the insert and delete functions for many-to-many associations in the conceptual model to stored procedures in the underlying database. Stored procedures to which modification functions are mapped must be declared in the storage model. For more information, see Function Element (SSDL).

> **Note:**
> If you do not map all three of the insert, update, or delete operations of an entity type to stored procedures, the unmapped operations will fail if executed at runtime and an UpdateException is thrown.

> **Note:**
> If the modification functions for one entity in an inheritance hierarchy are mapped to stored procedures, then modification functions for all types in the hierarchy must be mapped to stored procedures.

The **ModificationFunctionMapping** element can be a child of the EntityTypeMapping element or the AssociationSetMapping element.

The **ModificationFunctionMapping** element can have the following child elements:

-   DeleteFunction (zero or one)
-   InsertFunction (zero or one)
-   UpdateFunction (zero or one)

No attributes are applicable to the **ModificationFunctionMapping** element.

### Example

The following example shows the entity set mapping for the **People** entity set in the School model. In addition to the column mapping for the **Person** entity type, the mapping of the insert, update, and delete functions of the **Person** type are shown. The functions that are mapped to are declared in the storage model.

```xml
 <EntitySetMapping Name="People">
   <EntityTypeMapping TypeName="SchoolModel.Person">
     <MappingFragment StoreEntitySet="Person">
       <ScalarProperty Name="PersonID" ColumnName="PersonID" />
       <ScalarProperty Name="LastName" ColumnName="LastName" />
       <ScalarProperty Name="FirstName" ColumnName="FirstName" />
       <ScalarProperty Name="HireDate" ColumnName="HireDate" />
       <ScalarProperty Name="EnrollmentDate"
                       ColumnName="EnrollmentDate" />
     </MappingFragment>
 </EntityTypeMapping>
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
 </EntitySetMapping>
```

### Example

The following example shows the association set mapping for the **CourseInstructor** association set in the School model. In addition to the column mapping for the **CourseInstructor** association, the mapping of the insert and delete functions of the **CourseInstructor** association are shown. The functions that are mapped to are declared in the storage model.

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
 

 

## QueryView Element (MSL)

The **QueryView** element in mapping specification language (MSL) defines a read-only mapping between an entity type or association in the conceptual model and a table in the underlying database. The mapping is defined with an Entity SQL query that is evaluated against the storage model, and you express the result set in terms of an entity or association in the conceptual model. Because query views are read-only, you cannot use standard update commands to update types that are defined by query views. You can make updates to these types by using modification functions. For more information, see How to: Map Modification Functions to Stored Procedures.

> **Note:**
> In the **QueryView** element, Entity SQL expressions that contain **GroupBy**, group aggregates, or navigation properties are not supported.

 

The **QueryView** element can be a child of the EntitySetMapping element or the AssociationSetMapping element. In the former case, the query view defines a read-only mapping for an entity in the conceptual model. In the latter case, the query view defines a read-only mapping for an association in the conceptual model.

> **Note:**
> If the **AssociationSetMapping** element is for an association with a referential constraint, the **AssociationSetMapping** element is ignored. For more information, see ReferentialConstraint Element (CSDL).

The **QueryView** element cannot have any child elements.

### Applicable Attributes

The following table describes the attributes that can be applied to the **QueryView** element.

| Attribute Name | Is Required | Value                                                                         |
|:---------------|:------------|:------------------------------------------------------------------------------|
| **TypeName**   | No          | The name of the conceptual model type that is being mapped by the query view. |

### Example

The following example shows the **QueryView** element as a child of the **EntitySetMapping** element and defines a query view mapping for the **Department** entity type in the School Model.

```xml
 <EntitySetMapping Name="Departments" >
   <QueryView>
     SELECT VALUE SchoolModel.Department(d.DepartmentID,
                                         d.Name,
                                         d.Budget,
                                         d.StartDate)
     FROM SchoolModelStoreContainer.Department AS d
     WHERE d.Budget > 150000
   </QueryView>
 </EntitySetMapping>
```

Because the query only returns a subset of the members of the **Department** type in the storage model, the **Department** type in the School model has been modified based on this mapping as follows:

```xml
 <EntityType Name="Department">
   <Key>
     <PropertyRef Name="DepartmentID" />
   </Key>
   <Property Type="Int32" Name="DepartmentID" Nullable="false" />
   <Property Type="String" Name="Name" Nullable="false"
             MaxLength="50" FixedLength="false" Unicode="true" />
   <Property Type="Decimal" Name="Budget" Nullable="false"
             Precision="19" Scale="4" />
   <Property Type="DateTime" Name="StartDate" Nullable="false" />
   <NavigationProperty Name="Courses"
                       Relationship="SchoolModel.FK_Course_Department"
                       FromRole="Department" ToRole="Course" />
 </EntityType>
```

### Example

The next example shows the **QueryView** element as the child of an **AssociationSetMapping** element and defines a read-only mapping for the `FK_Course_Department` association in the School model.

```xml
 <EntityContainerMapping StorageEntityContainer="SchoolModelStoreContainer"
                         CdmEntityContainer="SchoolEntities">
   <EntitySetMapping Name="Courses" >
     <QueryView>
       SELECT VALUE SchoolModel.Course(c.CourseID,
                                       c.Title,
                                       c.Credits)
       FROM SchoolModelStoreContainer.Course AS c
     </QueryView>
   </EntitySetMapping>
   <EntitySetMapping Name="Departments" >
     <QueryView>
       SELECT VALUE SchoolModel.Department(d.DepartmentID,
                                           d.Name,
                                           d.Budget,
                                           d.StartDate)
       FROM SchoolModelStoreContainer.Department AS d
       WHERE d.Budget > 150000
     </QueryView>
   </EntitySetMapping>
   <AssociationSetMapping Name="FK_Course_Department" >
     <QueryView>
       SELECT VALUE SchoolModel.FK_Course_Department(
         CREATEREF(SchoolEntities.Departments, row(c.DepartmentID), SchoolModel.Department),
         CREATEREF(SchoolEntities.Courses, row(c.CourseID)) )
       FROM SchoolModelStoreContainer.Course AS c
     </QueryView>
   </AssociationSetMapping>
 </EntityContainerMapping>
```
 
### Comments

You can define query views to enable the following scenarios:

-   Define an entity in the conceptual model that doesn't include all the properties of the entity in the storage model. This includes properties that do not have default values and do not support **null** values.
-   Map computed columns in the storage model to properties of entity types in the conceptual model.
-   Define a mapping where conditions used to partition entities in the conceptual model are not based on equality. When you specify a conditional mapping using the **Condition** element, the supplied condition must equal the specified value. For more information, see Condition Element (MSL).
-   Map the same column in the storage model to multiple types in the conceptual model.
-   Map multiple types to the same table.
-   Define associations in the conceptual model that are not based on foreign keys in the relational schema.
-   Use custom business logic to set the value of properties in the conceptual model. For example, you could map the string value "T" in the data source to a value of **true**, a Boolean, in the conceptual model.
-   Define conditional filters for query results.
-   Enforce fewer restrictions on data in the conceptual model than in the storage model. For example, you could make a property in the conceptual model nullable even if the column to which it is mapped does not support **null**values.

The following considerations apply when you define query views for entities:

-   Query views are read-only. You can only make updates to entities by using modification functions.
-   When you define an entity type by a query view, you must also define all related entities by query views.
-   When you map a many-to-many association to an entity in the storage model that represents a link table in the relational schema, you must define a **QueryView** element in the **AssociationSetMapping** element for this link table.
-   Query views must be defined for all types in a type hierarchy. You can do this in the following ways:
-   -   With a single **QueryView** element that specifies a single Entity SQL query that returns a union of all of the entity types in the hierarchy.
    -   With a single **QueryView** element that specifies a single Entity SQL query that uses the CASE operator to return a specific entity type in the hierarchy based on a specific condition.
    -   With an additional **QueryView** element for a specific type in the hierarchy. In this case, use the **TypeName** attribute of the **QueryView** element to specify the entity type for each view.
-   When a query view is defined, you cannot specify the **StorageSetName** attribute on the **EntitySetMapping** element.
-   When a query view is defined, the **EntitySetMapping**element cannot also contain **Property** mappings.
