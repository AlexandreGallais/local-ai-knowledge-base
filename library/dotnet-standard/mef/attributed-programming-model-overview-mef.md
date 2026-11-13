---
title: "Attributed programming model overview (MEF) (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/mef/attributed-programming-model-overview-mef.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attributed programming model overview (MEF)

In the Managed Extensibility Framework (MEF), a *programming model* is a particular method of defining the set of conceptual objects on which MEF operates. These conceptual objects include parts, imports, and exports. MEF uses these objects, but does not specify how they should be represented. Therefore, a wide variety of programming models are possible, including customized programming models.

The default programming model used in MEF is the *attributed programming model*. In the attributed programming model parts, imports, exports, and other objects are defined with attributes that decorate ordinary .NET classes. This article explains how to use the attributes provided by the attributed programming model to create a MEF application.

## Import and Export Basics

An *export* is a value that a part provides to other parts in the container, and an *import* is a requirement that a part expresses to the container, to be filled from the available exports. In the attributed programming model, imports and exports are declared by decorating classes or members with the `Import` and `Export` attributes. The `Export` attribute can decorate a class, field, property, or method, while the `Import` attribute can decorate a field, property, or constructor parameter.

In order for an import to be matched with an export, the import and export must have the same *contract*. The contract consists of a string, called the *contract name*, and the type of the exported or imported object, called the *contract type*. Only if both the contract name and contract type match is an export considered to fulfill a particular import.

Either or both of the contract parameters can be implicit or explicit. The following code shows a class that declares a basic import.

```vb
Public Class MyClass1
    <Import()>
    Public Property MyAddin As IMyAddin
End Class
```

```csharp
public class MyClass
{
    [Import]
    public IMyAddin MyAddin { get; set; }
}
```

In this import, the `Import` attribute has neither a contract type nor a contract name parameter attached. Therefore, both will be inferred from the decorated property. In this case, the contract type will be `IMyAddin`, and the contract name will be a unique string created from the contract type. (In other words, the contract name will match only exports whose names are also inferred from the type `IMyAddin`.)

The following shows an export that matches the previous import.

```vb
<Export(GetType(IMyAddin))>
Public Class MyLogger
    Implements IMyAddin

End Class
```

```csharp
[Export(typeof(IMyAddin))]
public class MyLogger : IMyAddin { }
```

In this export, the contract type is `IMyAddin` because it is specified as a parameter of the `Export` attribute. The exported type must be either the same as the contract type, derive from the contract type, or implement the contract type if it is an interface. In this export, the actual type `MyLogger` implements the interface `IMyAddin`. The contract name is inferred from the contract type, which means that this export will match the previous import.

> **Note:**
> Exports and imports should usually be declared on public classes or members. Other declarations are supported, but exporting or importing a private, protected, or internal member breaks the isolation model for the part and is therefore not recommended.

The contract type must match exactly for the export and import to be considered a match. Consider the following export.

```vb
<Export()> 'WILL NOT match the previous import!
Public Class MyLogger
    Implements IMyAddin

End Class
```

```csharp
[Export] //WILL NOT match the previous import!
public class MyLogger : IMyAddin { }
```

In this export, the contract type is `MyLogger` instead of `IMyAddin`. Even though `MyLogger` implements `IMyAddin`, and therefore could be cast to an `IMyAddin` object, this export will not match the previous import because the contract types are not the same.

In general, it is not necessary to specify the contract name, and most contracts should be defined in terms of the contract type and metadata. However, under certain circumstances, it is important to specify the contract name directly. The most common case is when a class exports several values that share a common type, such as primitives. The contract name can be specified as the first parameter of the `Import` or `Export` attribute. The following code shows an import and an export with a specified contract name of `MajorRevision`.

```vb
Public Class MyExportClass

    'This one will match
    <Export("MajorRevision")>
    Public ReadOnly Property MajorRevision As Integer
        Get
            Return 4
        End Get
    End Property

    <Export("MinorRevision")>
    Public ReadOnly Property MinorRevision As Integer
        Get
            Return 16
        End Get
    End Property
End Class
```

```csharp
public class MyClass
{
    [Import("MajorRevision")]
    public int MajorRevision { get; set; }
}

public class MyExportClass
{
    [Export("MajorRevision")] //This one will match.
    public int MajorRevision = 4;

    [Export("MinorRevision")]
    public int MinorRevision = 16;
}
```

If the contract type is not specified, it will still be inferred from the type of the import or export. However, even if the contract name is specified explicitly, the contract type must also match exactly for the import and export to be considered a match. For example, if the `MajorRevision` field was a string, the inferred contract types would not match and the export would not match the import, despite having the same contract name.

### Importing and Exporting a Method

The `Export` attribute can also decorate a method, in the same way as a class, property, or function. Method exports must specify a contract type or contract name, as the type cannot be inferred. The specified type can be either a custom delegate or a generic type, such as `Func`. The following class exports a method named `DoSomething`.

```vb
Public Class MyAddin

    'Explicitly specifying a generic type
    <Export(GetType(Func(Of Integer, String)))>
    Public Function DoSomething(ByVal TheParam As Integer) As String
        Return Nothing 'Function body goes here
    End Function

End Class
```

```csharp
public class MyAddin
{
    //Explicitly specifying a generic type.
    [Export(typeof(Func<int, string>))]
    public string DoSomething(int TheParam);
}
```

In this class, the `DoSomething` method takes a single `int` parameter and returns a `string`. To match this export, the importing part must declare an appropriate member. The following class imports the `DoSomething` method.

```vb
Public Class MyClass1

    'Contract name must match!
    <Import()>
    Public Property MajorRevision As Func(Of Integer, String)
End Class
```

```csharp
public class MyClass
{
    [Import] //Contract name must match!
    public Func<int, string> DoSomething { get; set; }
}
```

For more information about how to use of the `Func<T, T>` object, see `System.Func`2`.
