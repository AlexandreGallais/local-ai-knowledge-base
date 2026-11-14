---
title: "Breaking change: MVC: ObjectModelValidator calls a new overload of ValidationVisitor.Validate"
tool: "aspnetcore"
version: "11"
source: "https://github.com/dotnet/AspNetCore.Docs/blob/692feee601358eeb5d8915b46143303f45e83887/aspnetcore/breaking-changes/5/mvc-objectmodelvalidator-calls-new-overload.md"
commit: "692feee601358eeb5d8915b46143303f45e83887"
license: "CC-BY-4.0"
---

# MVC: ObjectModelValidator calls a new overload of ValidationVisitor.Validate

In ASP.NET Core 5.0, an overload of the `Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidationVisitor.Validate*` was added. The new overload accepts the top-level model instance that contains properties:

```diff
  bool Validate(ModelMetadata metadata, string key, object model, bool alwaysValidateAtTopLevel);
+ bool Validate(ModelMetadata metadata, string key, object model, bool alwaysValidateAtTopLevel, object container);
```

`Microsoft.AspNetCore.Mvc.ModelBinding.ObjectModelValidator` invokes this new overload of `ValidationVisitor` to perform validation. This new overload is pertinent if your validation library integrates with ASP.NET Core MVC's model validation system.

For discussion, see GitHub issue dotnet/aspnetcore#26020.

## Version introduced

5.0

## Old behavior

`ObjectModelValidator` invokes the following overload during model validation:

```csharp
ValidationVisitor.Validate(ModelMetadata metadata, string key, object model, bool alwaysValidateAtTopLevel)
```

## New behavior

`ObjectModelValidator` invokes the following overload during model validation:

```csharp
ValidationVisitor.Validate(ModelMetadata metadata, string key, object model, bool alwaysValidateAtTopLevel, object container)
```

## Reason for change

This change was introduced to support validators, such as `System.ComponentModel.DataAnnotations.CompareAttribute`, that rely on inspection of other properties.

## Recommended action

Validation frameworks that rely on `ObjectModelValidator` to invoke the existing overload of `ValidationVisitor` must override the new method when targeting .NET 5 or later:

```csharp
public class MyCustomValidationVisitor : ValidationVisitor
{
+  public override bool Validate(ModelMetadata metadata, string key, object model, bool alwaysValidateAtTopLevel, object container)
+  {
+    ...
}
```

## Affected APIs

`Microsoft.AspNetCore.Mvc.ModelBinding.Validation.ValidationVisitor.Validate*`
