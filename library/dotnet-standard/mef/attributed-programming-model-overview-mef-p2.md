---
title: "Attributed programming model overview (MEF) (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/mef/attributed-programming-model-overview-mef.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Attributed programming model overview (MEF) (part 2 of 4)

## Types of Imports

MEF support several import types, including dynamic, lazy, prerequisite, and optional.

### Dynamic Imports

In some cases, the importing class may want to match exports of any type that have a particular contract name. In this scenario, the class can declare a *dynamic import*. The following import matches any export with contract name "TheString".

```vb
Public Class MyClass1

    <Import("TheString")>
    Public Property MyAddin

End Class
```

```csharp
public class MyClass
{
    [Import("TheString")]
    public dynamic MyAddin { get; set; }
}
```

When the contract type is inferred from the `dynamic` keyword, it will match any contract type. In this case, an import should **always** specify a contract name to match on. (If no contract name is specified, the import will be considered to match no exports.) Both of the following exports would match the previous import.

```vb
<Export("TheString", GetType(IMyAddin))>
Public Class MyLogger
    Implements IMyAddin

End Class

<Export("TheString")>
Public Class MyToolbar

End Class
```

```csharp
[Export("TheString", typeof(IMyAddin))]
public class MyLogger : IMyAddin { }

[Export("TheString")]
public class MyToolbar { }
```

Obviously, the importing class must be prepared to deal with an object of arbitrary type.

### Lazy Imports

In some cases, the importing class may require an indirect reference to the imported object, so that the object is not instantiated immediately. In this scenario, the class can declare a *lazy import* by using a contract type of `Lazy<T>`. The following importing property declares a lazy import.

```vb
Public Class MyClass1

    <Import()>
    Public Property MyAddin As Lazy(Of IMyAddin)

End Class
```

```csharp
public class MyClass
{
    [Import]
    public Lazy<IMyAddin> MyAddin { get; set; }
}
```

From the point of view of the composition engine, a contract type of `Lazy<T>` is considered identical to contract type of `T`. Therefore, the previous import would match the following export.

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

The contract name and contract type can be specified in the `Import` attribute for a lazy import, as described earlier in the "Basic Imports and Exports" section.

### Prerequisite Imports

Exported MEF parts are typically created by the composition engine, in response to a direct request or the need to fill a matched import. By default, when creating a part, the composition engine uses the parameter-less constructor. To make the engine use a different constructor, you can mark it with the `ImportingConstructor` attribute.

Each part may have only one constructor for use by the composition engine. Providing no parameterless constructor and no `ImportingConstructor` attribute, or providing more than one `ImportingConstructor` attribute, will produce an error.

To fill the parameters of a constructor marked with the `ImportingConstructor` attribute, all of those parameters are automatically declared as imports. This is a convenient way to declare imports that are used during part initialization. The following class uses `ImportingConstructor` to declare an import.

```vb
Public Class MyClass1

    Private _theAddin As IMyAddin

    'Parameterless constructor will NOT be used
    'because the ImportingConstructor
    'attribute is present.
    Public Sub New()

    End Sub

    'This constructor will be used.
    'An import with contract type IMyAddin
    'is declared automatically.
    <ImportingConstructor()>
    Public Sub New(ByVal MyAddin As IMyAddin)
        _theAddin = MyAddin
    End Sub

End Class
```

```csharp
public class MyClass
{
    private IMyAddin _theAddin;

    //Parameterless constructor will NOT be
    //used because the ImportingConstructor
    //attribute is present.
    public MyClass() { }

    //This constructor will be used.
    //An import with contract type IMyAddin is
    //declared automatically.
    [ImportingConstructor]
    public MyClass(IMyAddin MyAddin)
    {
        _theAddin = MyAddin;
    }
}
```

By default, the `ImportingConstructor` attribute uses inferred contract types and contract names for all of the parameter imports. It is possible to override this by decorating the parameters with `Import` attributes, which can then define the contract type and contract name explicitly. The following code demonstrates a constructor that uses this syntax to import a derived class instead of a parent class.

```vb
<ImportingConstructor()>
Public Sub New(<Import(GetType(IMySubAddin))> ByVal MyAddin As IMyAddin)

End Sub
```

```csharp
[ImportingConstructor]
public MyClass([Import(typeof(IMySubAddin))]IMyAddin MyAddin)
{
    _theAddin = MyAddin;
}
```

In particular, you should be careful with collection parameters. For example, if you specify `ImportingConstructor` on a constructor with a parameter of type `IEnumerable<int>`, the import will match a single export of type `IEnumerable<int>`, instead of a set of exports of type `int`. To match a set of exports of type `int`, you have to decorate the parameter with the `ImportMany` attribute.

Parameters declared as imports by the `ImportingConstructor` attribute are also marked as *prerequisite imports*. MEF normally allows exports and imports to form a *cycle*. For example, a cycle is where object A imports object B, which in turn imports object A. Under ordinary circumstances, a cycle is not a problem, and the composition container constructs both objects normally.

When an imported value is required by the constructor of a part, that object cannot participate in a cycle. If object A requires that object B be constructed before it can be constructed itself, and object B imports object A, then the cycle will be unable to resolve and a composition error will occur. Imports declared on constructor parameters are therefore prerequisite imports, which must all be filled before any of the exports from the object that requires them can be used.

### Optional Imports

The `Import` attribute specifies a requirement for the part to function. If an import cannot be fulfilled, the composition of that part will fail and the part will not be available.

You can specify that an import is *optional* by using the `AllowDefault` property. In this case, the composition will succeed even if the import does not match any available exports, and the importing property will be set to the default for its property type (`null` for object properties, `false` for Booleans, or zero for numeric properties.) The following class uses an optional import.

```vb
Public Class MyClass1

    <Import(AllowDefault:=True)>
    Public Property thePlugin As Plugin

    'If no matching export is available,
    'thePlugin will be set to null.
End Class
```

```csharp
public class MyClass
{
    [Import(AllowDefault = true)]
    public Plugin thePlugin { get; set; }

    //If no matching export is available,
    //thePlugin will be set to null.
}
```

### Importing Multiple Objects

The `Import` attribute will only be successfully composed when it matches one and only one export. Other cases will produce a composition error. To import more than one export that matches the same contract, use the `ImportMany` attribute. Imports marked with this attribute are always optional. For example, composition will not fail if no matching exports are present. The following class imports any number of exports of type `IMyAddin`.

```vb
Public Class MyClass1

    <ImportMany()>
    Public Property MyAddin As IEnumerable(Of IMyAddin)

End Class
```

```csharp
public class MyClass
{
    [ImportMany]
    public IEnumerable<IMyAddin> MyAddin { get; set; }
}
```

The imported array can be accessed by using ordinary `IEnumerable<T>` syntax and methods. It is also possible to use an ordinary array (`IMyAddin[]`) instead.

This pattern can be very important when you use it in combination with the `Lazy<T>` syntax. For example, by using `ImportMany`, `IEnumerable<T>`, and `Lazy<T>`, you can import indirect references to any number of objects and only instantiate the ones that become necessary. The following class shows this pattern.

```vb
Public Class MyClass1

    <ImportMany()>
    Public Property MyAddin As IEnumerable(Of Lazy(Of IMyAddin))

End Class
```

```csharp
public class MyClass
{
    [ImportMany]
    public IEnumerable<Lazy<IMyAddin>> MyAddin { get; set; }
}
```

## Avoiding Discovery

In some cases, you may want to prevent a part from being discovered as part of a catalog. For example, the part may be a base class intended to be inherited from, but not used. There are two ways to accomplish this. First, you can use the `abstract` keyword on the part class. Abstract classes never provide exports, although they can provide inherited exports to classes that derive from them.

If the class cannot be made abstract, you can decorate it with the `PartNotDiscoverable` attribute. A part decorated with this attribute will not be included in any catalogs. The following example demonstrates these patterns. `DataOne` will be discovered by the catalog. Since `DataTwo` is abstract, it will not be discovered. Since `DataThree` used the `PartNotDiscoverable` attribute, it will not be discovered.

```vb
<Export()>
Public Class DataOne
    'This part will be discovered
    'as normal by the catalog.
End Class

<Export()>
Public MustInherit Class DataTwo
    'This part will not be discovered
    'by the catalog.
End Class

<PartNotDiscoverable()>
<Export()>
Public Class DataThree
    'This part will also not be discovered
    'by the catalog.
End Class
```

```csharp
[Export]
public class DataOne
{
    //This part will be discovered
    //as normal by the catalog.
}

[Export]
public abstract class DataTwo
{
    //This part will not be discovered
    //by the catalog.
}

[PartNotDiscoverable]
[Export]
public class DataThree
{
    //This part will also not be discovered
    //by the catalog.
}
```

## Metadata and Metadata Views

Exports can provide additional information about themselves known as *metadata*. Metadata can be used to convey properties of the exported object to the importing part. The importing part can use this data to decide which exports to use, or to gather information about an export without having to construct it. For this reason, an import must be lazy to use metadata.

To use metadata, you typically declare an interface known as a *metadata view*, which declares what metadata will be available. The metadata view interface must have only properties, and those properties must have `get` accessors. The following interface is an example metadata view.

```vb
Public Interface IPluginMetadata

    ReadOnly Property Name As String

    <DefaultValue(1)>
    ReadOnly Property Version As Integer

End Interface
```

```csharp
public interface IPluginMetadata
{
    string Name { get; }

    [DefaultValue(1)]
    int Version { get; }
}
```

It is also possible to use a generic collection, `IDictionary<string, object>`, as a metadata view, but this forfeits the benefits of type checking and should be avoided.

Ordinarily, all of the properties named in the metadata view are required, and any exports that do not provide them will not be considered a match. The `DefaultValue` attribute specifies that a property is optional. If the property is not included, it will be assigned the default value specified as a parameter of `DefaultValue`. The following are two different classes decorated with metadata. Both of these classes would match the previous metadata view.

```vb
<Export(GetType(IPlugin))>
<ExportMetadata("Name", "Logger")>
<ExportMetadata("Version", 4)>
Public Class MyLogger
    Implements IPlugin

End Class

'Version is not required because of the DefaultValue
<Export(GetType(IPlugin))>
<ExportMetadata("Name", "Disk Writer")>
Public Class DWriter
    Implements IPlugin

End Class
```

```csharp
[Export(typeof(IPlugin)),
    ExportMetadata("Name", "Logger"),
    ExportMetadata("Version", 4)]
public class Logger : IPlugin
{
}

[Export(typeof(IPlugin)),
    ExportMetadata("Name", "Disk Writer")]
    //Version is not required because of the DefaultValue
public class DWriter : IPlugin
{
}
```

Metadata is expressed after the `Export` attribute by using the `ExportMetadata` attribute. Each piece of metadata is composed of a name/value pair. The name portion of the metadata must match the name of the appropriate property in the metadata view, and the value will be assigned to that property.

It is the importer that specifies what metadata view, if any, will be in use. An import with metadata is declared as a lazy import, with the metadata interface as the second type parameter to `Lazy<T,T>`. The following class imports the previous part with metadata.

```vb
Public Class Addin

    <Import()>
    Public Property plugin As Lazy(Of IPlugin, IPluginMetadata)
End Class
```

```csharp
public class Addin
{
    [Import]
    public Lazy<IPlugin, IPluginMetadata> plugin;
}
```

In many cases, you will want to combine metadata with the `ImportMany` attribute, in order to parse through the available imports and choose and instantiate only one, or filter a collection to match a certain condition. The following class instantiates only `IPlugin` objects that have the `Name` value "Logger".

```vb
Public Class User

    <ImportMany()>
    Public Property plugins As IEnumerable(Of Lazy(Of IPlugin, IPluginMetadata))

    Public Function InstantiateLogger() As IPlugin

        Dim logger As IPlugin
        logger = Nothing

        For Each Plugin As Lazy(Of IPlugin, IPluginMetadata) In plugins
            If Plugin.Metadata.Name = "Logger" Then
                logger = Plugin.Value
            End If
        Next
        Return logger
    End Function

End Class
```

```csharp
public class User
{
    [ImportMany]
    public IEnumerable<Lazy<IPlugin, IPluginMetadata>> plugins;

    public IPlugin InstantiateLogger()
    {
        IPlugin logger = null;

        foreach (Lazy<IPlugin, IPluginMetadata> plugin in plugins)
        {
            if (plugin.Metadata.Name == "Logger")
                logger = plugin.Value;
        }
        return logger;
    }
}
```
