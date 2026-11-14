---
title: "System.Linq.Expressions namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Linq.Expressions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Linq.Expressions namespace

Contains classes, interfaces and enumerations that enable language-level code expressions to be represented as objects in the form of expression trees.

#### Remarks
The abstract class `Expression` provides the root of a class hierarchy used to model expression trees.

The classes in this namespace that derive from `Expression`, for example `MemberExpression` and `ParameterExpression`, are used to represent nodes in an expression tree. The `Expression` class contains `static` (`Shared` in Visual Basic) factory methods to create expression tree nodes of the various types.

The enumeration type `ExpressionType` specifies the unique node types.
