---
title: "Attributed programming model overview (MEF) (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/mef/attributed-programming-model-overview-mef.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attributed programming model overview (MEF) (part 3 of 4)

## Import and Export Inheritance

If a class inherits from a part, that class may also become a part. Imports are always inherited by subclasses. Therefore, a subclass of a part will always be a part, with the same imports as its parent class.

Exports declared by using the `Export` attribute are not inherited by subclasses. However, a part can export itself by using the `InheritedExport` attribute. Subclasses of the part will inherit and provide the same export, including contract name and contract type. Unlike an `Export` attribute, `InheritedExport` can be applied only at the class level, and not at the member level. Therefore, member-level exports can never be inherited.

The following four classes demonstrate the principles of import and export inheritance. `NumTwo` inherits from `NumOne`, so `NumTwo` will import `IMyData`. Ordinary exports are not inherited, so `NumTwo` will not export anything. `NumFour` inherits from `NumThree`. Because `NumThree` used `InheritedExport`, `NumFour` has one export with contract type `NumThree`. Member-level exports are never inherited, so `IMyData` is not exported.

```vb
<Export()>
Public Class NumOne
    <Import()>
    Public Property MyData As IMyData
End Class

Public Class NumTwo
    Inherits NumOne

    'Imports are always inherited, so NumTwo will
    'Import IMyData

    'Ordinary exports are not inherited, so
    'NumTwo will NOT export anything.  As a result it
    'will not be discovered by the catalog!

End Class

<InheritedExport()>
Public Class NumThree

    <Export()>
    Public Property MyData As IMyData

    'This part provides two exports, one of
    'contract type NumThree, and one of
    'contract type IMyData.

End Class

Public Class NumFour
    Inherits NumThree

    'Because NumThree used InheritedExport,
    'this part has one export with contract
    'type NumThree.

    'Member-level exports are never inherited,
    'so IMyData is not exported.

End Class
```

```csharp
[Export]
public class NumOne
{
    [Import]
    public IMyData MyData { get; set; }
}

public class NumTwo : NumOne
{
    //Imports are always inherited, so NumTwo will
    //import IMyData.

    //Ordinary exports are not inherited, so
    //NumTwo will NOT export anything. As a result it
    //will not be discovered by the catalog!
}

[InheritedExport]
public class NumThree
{
    [Export]
    Public IMyData MyData { get; set; }

    //This part provides two exports, one of
    //contract type NumThree, and one of
    //contract type IMyData.
}

public class NumFour : NumThree
{
    //Because NumThree used InheritedExport,
    //this part has one export with contract
    //type NumThree.

    //Member-level exports are never inherited,
    //so IMyData is not exported.
}
```

If there is metadata associated with an `InheritedExport` attribute, that metadata will also be inherited. (For more information, see the earlier "Metadata and Metadata Views" section.) Inherited metadata cannot be modified by the subclass. However, by re-declaring the `InheritedExport` attribute with the same contract name and contract type, but with new metadata, the subclass can replace the inherited metadata with new metadata. The following class demonstrates this principle. The `MegaLogger` part inherits from `Logger` and includes the `InheritedExport` attribute. Since `MegaLogger` re-declares new metadata named Status, it does not inherit the Name and Version metadata from `Logger`.

```vb
<InheritedExport(GetType(IPlugin))>
<ExportMetadata("Name", "Logger")>
<ExportMetadata("Version", 4)>
Public Class Logger
    Implements IPlugin

    'Exports with contract type IPlugin
    'and metadata "Name" and "Version".
End Class

Public Class SuperLogger
    Inherits Logger

    'Exports with contract type IPlugin and
    'metadata "Name" and "Version", exactly the same
    'as the Logger class.

End Class

<InheritedExport(GetType(IPlugin))>
<ExportMetadata("Status", "Green")>
Public Class MegaLogger
    Inherits Logger

    'Exports with contract type IPlugin and
    'metadata "Status" only. Re-declaring
    'the attribute replaces all metadata.

End Class
```

```csharp
[InheritedExport(typeof(IPlugin)),
    ExportMetadata("Name", "Logger"),
    ExportMetadata("Version", 4)]
public class Logger : IPlugin
{
    //Exports with contract type IPlugin and
    //metadata "Name" and "Version".
}

public class SuperLogger : Logger
{
    //Exports with contract type IPlugin and
    //metadata "Name" and "Version", exactly the same
    //as the Logger class.
}

[InheritedExport(typeof(IPlugin)),
    ExportMetadata("Status", "Green")]
public class MegaLogger : Logger        {
    //Exports with contract type IPlugin and
    //metadata "Status" only. Re-declaring
    //the attribute replaces all metadata.
}
```

When re-declaring the `InheritedExport` attribute to override metadata, make sure that the contract types are the same. (In the previous example, `IPlugin` is the contract type.) If they differ, instead of overriding, the second attribute will create a second, independent export from the part. Generally, this means that you will have to explicitly specify the contract type when you override an `InheritedExport` attribute, as shown in the previous example.

Since interfaces cannot be instantiated directly, they generally cannot be decorated with `Export` or `Import` attributes. However, an interface can be decorated with an `InheritedExport` attribute at the interface level, and that export along with any associated metadata will be inherited by any implementing classes. The interface itself will not be available as a part, however.

## Custom Export Attributes

The basic <example-value> attributes, `Export` and `InheritedExport`, can be extended to include metadata as attribute properties. This technique is useful for applying similar metadata to many parts, or creating an inheritance tree of metadata attributes.

A custom attribute can specify the contract type, the contract name, or any other metadata. In order to define a custom attribute, a class inheriting from `ExportAttribute` (or `InheritedExportAttribute`) must be decorated with the `MetadataAttribute` attribute. The following class defines a custom attribute.

```vb
<MetadataAttribute()>
<AttributeUsage(AttributeTargets.Class, AllowMultiple:=false)>
Public Class MyAttribute
    Inherits ExportAttribute

    Public Property MyMetadata As String

    Public Sub New(ByVal myMetadata As String)
        MyBase.New(GetType(IMyAddin))

        myMetadata = myMetadata
    End Sub

End Class
```

```csharp
[MetadataAttribute]
[AttributeUsage(AttributeTargets.Class, AllowMultiple=false)]
public class MyAttribute : ExportAttribute
{
    public MyAttribute(string myMetadata)
        : base(typeof(IMyAddin))
    {
        MyMetadata = myMetadata;
    }

    public string MyMetadata { get; private set; }
}
```

This class defines a custom attribute named `MyAttribute` with contract type `IMyAddin` and some metadata named `MyMetadata`. All properties in a class marked with the `MetadataAttribute` attribute are considered to be metadata defined in the custom attribute. The following two declarations are equivalent.

```vb
<Export(GetType(IMyAddin))>
<ExportMetadata("MyMetadata", "theData")>
Public Property myAddin As MyAddin
```

```vb
<MyAttribute("theData")>
Public Property myAddin As MyAddin
```

```csharp
[Export(typeof(IMyAddin)),
    ExportMetadata("MyMetadata", "theData")]
public MyAddin myAddin { get; set; }
```

```csharp
[MyAttribute("theData")]
public MyAddin myAddin { get; set; }
```

In the first declaration, the contract type and metadata are explicitly defined. In the second declaration, the contract type and metadata are implicit in the customized attribute. Particularly in cases where a large amount of identical metadata must be applied to many parts (for example, author or copyright information), using a custom attribute can save a lot of time and duplication. Further, inheritance trees of custom attributes can be created to allow for variations.

To create optional metadata in a custom attribute, you can use the `DefaultValue` attribute. When this attribute is applied to a property in a custom attribute class, it specifies that the decorated property is optional and does not have to be supplied by an exporter. If a value for the property is not supplied, it will be assigned the default value for its property type (usually `null`, `false`, or 0.)

## Creation Policies

When a part specifies an import and composition is performed, the composition container attempts to find a matching export. If it matches the import with an export successfully, the importing member is set to an instance of the exported object. Where this instance comes from is controlled by the exporting part's *creation policy*.

The two possible creation policies are *shared* and *non-shared*. A part with a creation policy of shared will be shared between every import in the container for a part with that contract. When the composition engine finds a match and has to set an importing property, it will instantiate a new copy of the part only if one does not already exist; otherwise, it will supply the existing copy. This means that many objects may have references to the same part. Such parts should not rely on internal state that might be changed from many places. This policy is appropriate for static parts, parts that provide services, and parts that consume a lot of memory or other resources.

A part with the creation policy of non-shared will be created every time a matching import for one of its exports is found. A new copy will therefore be instantiated for every import in the container that matches one of the part's exported contracts. The internal state of these copies will not be shared. This policy is appropriate for parts where each import requires its own internal state.

Both the import and the export can specify the creation policy of a part, from among the values `Shared`, `NonShared`, or `Any`. The default is `Any` for both imports and exports. An export that specifies `Shared` or `NonShared` will only match an import that specifies the same, or that specifies `Any`. Similarly, an import that specifies `Shared` or `NonShared` will only match an export that specifies the same, or that specifies `Any`. Imports and exports with incompatible creation policies are not considered a match, in the same way as an import and export whose contract name or contract type are not a match. If both import and export specify `Any`, or do not specify a creation policy and default to `Any`, the creation policy will default to shared.

The following example shows both imports and exports specifying creation policies. `PartOne` does not specify a creation policy, so the default is `Any`. `PartTwo` does not specify a creation policy, so the default is `Any`. Since both import and export default to `Any`, `PartOne` will be shared. `PartThree` specifies a `Shared` creation policy, so `PartTwo` and `PartThree` will share the same copy of `PartOne`. `PartFour` specifies a `NonShared` creation policy, so `PartFour` will be non-shared in `PartFive`. `PartSix` specifies a `NonShared` creation policy. `PartFive` and `PartSix` will each receive separate copies of `PartFour`. `PartSeven` specifies a `Shared` creation policy. Because there is no exported `PartFour` with a creation policy of `Shared`, the `PartSeven` import does not match anything and will not be filled.

```vb
<Export()>
Public Class PartOne
    'The default creation policy for an export is Any.
End Class

Public Class PartTwo

    <Import()>
    Public Property partOne As PartOne

    'The default creation policy for an import is Any.
    'If both policies are Any, the part will be shared.

End Class

Public Class PartThree

    <Import(RequiredCreationPolicy:=CreationPolicy.Shared)>
    Public Property partOne As PartOne

    'The Shared creation policy is explicitly specified.
    'PartTwo and PartThree will receive references to the
    'SAME copy of PartOne.

End Class

<Export()>
<PartCreationPolicy(CreationPolicy.NonShared)>
Public Class PartFour
    'The NonShared creation policy is explicitly specified.
End Class

Public Class PartFive

    <Import()>
    Public Property partFour As PartFour

    'The default creation policy for an import is Any.
    'Since the export's creation policy was explicitly
    'defined, the creation policy for this property will
    'be non-shared.

End Class

Public Class PartSix

    <Import(RequiredCreationPolicy:=CreationPolicy.NonShared)>
    Public Property partFour As PartFour

    'Both import and export specify matching creation
    'policies.  PartFive and PartSix will each receive
    'SEPARATE copies of PartFour, each with its own
    'internal state.

End Class

Public Class PartSeven

    <Import(RequiredCreationPolicy:=CreationPolicy.Shared)>
    Public Property partFour As PartFour

    'A creation policy mismatch.  Because there is no
    'exported PartFour with a creation policy of Shared,
    'this import does not match anything and will not be
    'filled.

End Class
```

```csharp
[Export]
public class PartOne
{
    //The default creation policy for an export is Any.
}

public class PartTwo
{
    [Import]
    public PartOne partOne { get; set; }

    //The default creation policy for an import is Any.
    //If both policies are Any, the part will be shared.
}

public class PartThree
{
    [Import(RequiredCreationPolicy = CreationPolicy.Shared)]
    public PartOne partOne { get; set; }

    //The Shared creation policy is explicitly specified.
    //PartTwo and PartThree will receive references to the
    //SAME copy of PartOne.
}

[Export]
[PartCreationPolicy(CreationPolicy.NonShared)]
public class PartFour
{
    //The NonShared creation policy is explicitly specified.
}

public class PartFive
{
    [Import]
    public PartFour partFour { get; set; }

    //The default creation policy for an import is Any.
    //Since the export's creation policy was explicitly
    //defined, the creation policy for this property will
    //be non-shared.
}

public class PartSix
{
    [Import(RequiredCreationPolicy = CreationPolicy.NonShared)]
    public PartFour partFour { get; set; }

    //Both import and export specify matching creation
    //policies.  PartFive and PartSix will each receive
    //SEPARATE copies of PartFour, each with its own
    //internal state.
}

public class PartSeven
{
    [Import(RequiredCreationPolicy = CreationPolicy.Shared)]
    public PartFour partFour { get; set; }

    //A creation policy mismatch.  Because there is no
    //exported PartFour with a creation policy of Shared,
    //this import does not match anything and will not be
    //filled.
}
```
