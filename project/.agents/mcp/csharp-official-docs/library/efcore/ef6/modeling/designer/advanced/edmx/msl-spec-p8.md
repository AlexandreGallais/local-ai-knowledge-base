---
title: "MSL Specification - EF6 (part 8 of 8)"
tool: "efcore"
version: "11"
source: "https://github.com/dotnet/EntityFramework.Docs/blob/1459c99ecffb85202e1bbcf32504d074c430bfde/entity-framework/ef6/modeling/designer/advanced/edmx/msl-spec.md"
commit: "1459c99ecffb85202e1bbcf32504d074c430bfde"
license: "CC-BY-4.0"
---

# MSL Specification - EF6 (part 8 of 8)

## UpdateFunction Element (MSL)

The **UpdateFunction** element in mapping specification language (MSL) maps the update function of an entity type in the conceptual model to a stored procedure in the underlying database. Stored procedures to which modification functions are mapped must be declared in the storage model. For more information, see Function Element (SSDL).

> **Note:**
>  If you do not map all three of the insert, update, or delete operations of an entity type to stored procedures, the unmapped operations will fail if executed at runtime and an UpdateException is thrown.

The **UpdateFunction** element can be a child of the ModificationFunctionMapping element and applied to the EntityTypeMapping element.

The **UpdateFunction** element can have the following child elements:

-   AssociationEnd (zero or more)
-   ComplexProperty (zero or more)
-   ResultBinding (zero or one)
-   ScalarProperty (zero or more)

### Applicable Attributes

The following table describes the attributes that can be applied to the **UpdateFunction** element.

| Attribute Name            | Is Required | Value                                                                                                                                                    |
|:--------------------------|:------------|:---------------------------------------------------------------------------------------------------------------------------------------------------------|
| **FunctionName**          | Yes         | The namespace-qualified name of the stored procedure to which the update function is mapped. The stored procedure must be declared in the storage model. |
| **RowsAffectedParameter** | No          | The name of the output parameter that returns the number of rows affected.                                                                               |

### Example

The following example is based on the School model and shows the **UpdateFunction** element used to map update function of the **Person** entity type to the **UpdatePerson** stored procedure. The **UpdatePerson** stored procedure is declared in the storage model.

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
