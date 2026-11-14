---
title: "XObject class (part 3 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XObject class (part 3 of 4)

## XObject.RemoveAnnotations(Type) method

```csharp
public void RemoveAnnotations (Type type);
```

Removes the annotations of the specified type from this `XObject`.

Parameters:

- `type`: The type of annotations to remove.

#### Examples
The following example creates an element with four annotations on it. It then uses this method to remove two of them.

```csharp
public class MyAnnotation {
    private string tag;
    public string Tag {get{return tag;} set{tag=value;}}
    public MyAnnotation(string tag) {
        this.tag = tag;
    }
}

class Program
{
    static void Main(string[] args)
    {
        XElement root = new XElement("Root", "content");
        root.AddAnnotation(new MyAnnotation("T1"));
        root.AddAnnotation(new MyAnnotation("T2"));
        root.AddAnnotation("abc");
        root.AddAnnotation("def");

        Console.WriteLine("Count before removing: {0}", root.Annotations<object>().Count());
        root.RemoveAnnotations(typeof(MyAnnotation));
        Console.WriteLine("Count after removing: {0}", root.Annotations<object>().Count());
    }
}
```

```vb
Public Class MyAnnotation
    Private _tag As String

    Property Tag() As String
        Get
            Return Me._tag
        End Get
        Set(ByVal Value As String)
            Me._tag = Value
        End Set
    End Property

    Public Sub New(ByVal tag As String)
        Me._tag = tag
    End Sub
End Class

Module Module1
    Sub Main()
        Dim root As XElement = <Root>content</Root>
        root.AddAnnotation(New MyAnnotation("T1"))
        root.AddAnnotation(New MyAnnotation("T2"))
        root.AddAnnotation("abc")
        root.AddAnnotation("def")

        Console.WriteLine("Count before removing: {0}", root.Annotations(Of Object)().Count())
        root.RemoveAnnotations(GetType(MyAnnotation))
        Console.WriteLine("Count after removing: {0}", root.Annotations(Of Object)().Count())
    End Sub
End Module
```

This example produces the following output:

```
Count before removing: 4
Count after removing: 2
```

## XObject.RemoveAnnotations<T>() method

```csharp
public void RemoveAnnotations<T> () where T : class;
```

Removes the annotations of the specified type from this `XObject`.

Parameters:

- `T`: The type of annotations to remove.

#### Examples
The following example creates an element with four annotations on it. It then uses this method to remove two of them.

```csharp
public class MyAnnotation {
    private string tag;
    public string Tag {get{return tag;} set{tag=value;}}
    public MyAnnotation(string tag) {
        this.tag = tag;
    }
}

class Program {
    static void Main(string[] args) {
        XElement root = new XElement("Root", "content");
        root.AddAnnotation(new MyAnnotation("T1"));
        root.AddAnnotation(new MyAnnotation("T2"));
        root.AddAnnotation("abc");
        root.AddAnnotation("def");

        Console.WriteLine("Count before removing: {0}", root.Annotations<object>().Count());
        root.RemoveAnnotations<MyAnnotation>();
        Console.WriteLine("Count after removing: {0}", root.Annotations<object>().Count());
    }
}
```

```vb
Public Class MyAnnotation
    Private _tag As String

    Property Tag() As String
        Get
            Return Me._tag
        End Get
        Set(ByVal Value As String)
            Me._tag = Value
        End Set
    End Property

    Public Sub New(ByVal tag As String)
        Me._tag = tag
    End Sub
End Class

Module Module1
    Sub Main()
        Dim root As XElement = <Root>content</Root>
        root.AddAnnotation(New MyAnnotation("T1"))
        root.AddAnnotation(New MyAnnotation("T2"))
        root.AddAnnotation("abc")
        root.AddAnnotation("def")

        Console.WriteLine("Count before removing: {0}", root.Annotations(Of Object)().Count())
        root.RemoveAnnotations(Of MyAnnotation)()
        Console.WriteLine("Count after removing: {0}", root.Annotations(Of Object)().Count())
    End Sub
End Module
```

This example produces the following output:

```
Count before removing: 4
Count after removing: 2
```

## XObject.System.Xml.IXmlLineInfo.HasLineInfo() method

```csharp
bool IXmlLineInfo.HasLineInfo ();
```

Gets a value indicating whether or not this `XObject` has line information.

Returns: `true` if the `XObject` has line information; otherwise, `false`.

#### Remarks
You can call this method to determine whether the `XObject` contains valid line information.

This method is an explicit interface member implementation of a method in the `IXmlLineInfo` interface, so in order to call this method, it is necessary to cast to `IXmlLineInfo`.

#### Examples
This example loads a small XML tree from a file, setting the options to set base URI and retain line information. It then adds another element that does not have line information. It then prints the line information for each element in the tree.

```csharp
string markup = @"<Root>
    
    
    
</Root>";

File.WriteAllText("Test.xml", markup);

XElement po = XElement.Load("Test.xml",
    LoadOptions.SetBaseUri | LoadOptions.SetLineInfo);

// add a node to the tree.
// the newly added node will not have line information.
po.Element("Child2").AddAfterSelf(new XElement("Child3"));

string[] splitUri = po.BaseUri.Split('/');
Console.WriteLine("BaseUri: {0}", splitUri[splitUri.Length - 1]);
Console.WriteLine();
Console.WriteLine("{0}{1}{2}",
    "Element Name".PadRight(20),
    "Line".PadRight(5),
    "Position");
Console.WriteLine("{0}{1}{2}",
    "------------".PadRight(20),
    "----".PadRight(5),
    "--------");
foreach (XElement e in po.DescendantsAndSelf())
    Console.WriteLine("{0}{1}{2}",
        ("".PadRight(e.Ancestors().Count() * 2) + e.Name).PadRight(20),
        ((IXmlLineInfo)e).HasLineInfo() ?
            ((IXmlLineInfo)e).LineNumber.ToString().PadRight(5) :
            "",
        ((IXmlLineInfo)e).HasLineInfo() ?
            ((IXmlLineInfo)e).LinePosition.ToString() :
            "No Line Information");
```

```vb
Dim markup As String = _
    "<Root>" & Environment.NewLine & _
    "    " & Environment.NewLine & _
    "    " & Environment.NewLine & _
    "    " & Environment.NewLine & _
    "</Root>"

File.WriteAllText("Test.xml", markup)

Dim po As XElement = XElement.Load("Test.xml", LoadOptions.SetBaseUri Or LoadOptions.SetLineInfo)

' add a node to the tree.
' the newly added node will not have line information.
po.Element("Child2").AddAfterSelf(New XElement("Child3"))

Dim splitUri() As String = po.BaseUri.Split("/"c)
Console.WriteLine("BaseUri: {0}", splitUri(splitUri.Length - 1))
Console.WriteLine()
Console.WriteLine("{0}{1}{2}", _
    "Element Name".PadRight(20), _
    "Line".PadRight(5), _
    "Position")
Console.WriteLine("{0}{1}{2}", _
    "------------".PadRight(20), _
    "----".PadRight(5), _
    "--------")
For Each e As XElement In po.DescendantsAndSelf()
    Console.WriteLine("{0}{1}{2}", _
        ("".PadRight(e.Ancestors().Count() * 2) & e.Name.ToString).PadRight(20), _
        IIf(DirectCast(e, IXmlLineInfo).HasLineInfo(), _
            DirectCast(e, IXmlLineInfo).LineNumber.ToString().PadRight(5), _
            ""), _
        IIf(DirectCast(e, IXmlLineInfo).HasLineInfo(), _
            DirectCast(e, IXmlLineInfo).LinePosition.ToString(), _
            "No Line Information"))
Next
```

This example produces the following output:

```
BaseUri: Test.xml

Element Name        Line Position
------------        ---- --------
Root                1    2
  Child1            2    6
  Child2            3    6
  Child3            No Line Information
  Child4            4    6
```
