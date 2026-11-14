---
title: "XObject class (part 2 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XObject class (part 2 of 4)

## XObject.System.Xml.IXmlLineInfo.LinePosition property

```csharp
int System.Xml.IXmlLineInfo.LinePosition { get; }
```

Gets the line position that the underlying `XmlReader` reported for this `XObject`.

Returns: An `Int32` that contains the line position reported by the `XmlReader` for this `XObject`.

#### Remarks
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

## XObject.AddAnnotation(Object) method

```csharp
public void AddAnnotation (object annotation);
```

Adds an object to the annotation list of this `XObject`.

Parameters:

- `annotation`: An object that contains the annotation to add.

#### Remarks
Note that annotations are not part of the infoset; they are not persisted, or displayed by `XNode.ToString`. Also, if you import an XML Namespace into your VB project and call AddAnnotation with the SaveOptions.OmitDuplicateNamespaces enumeration value, then only one element will contain the XML Namespace attribute instead of every element. For more information, see Removing duplicate namespaces in XML Literals.

#### Examples
The following example adds an annotation to an `XElement`.

```csharp
public class MyAnnotation {
    private string tag;
    public string Tag {get{return tag;} set{tag=value;}}
    public MyAnnotation(string tag) {
        this.tag = tag;
    }
}

public class Program {
    public static void Main(string[] args) {
        MyAnnotation ma = new MyAnnotation("T1");
        XElement root = new XElement("Root", "content");
        root.AddAnnotation(ma);

        MyAnnotation ma2 = (MyAnnotation)root.Annotation<MyAnnotation>();
        Console.WriteLine(ma2.Tag);
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
        Dim ma As MyAnnotation = New MyAnnotation("T1")
        Dim root As XElement = <Root>content</Root>
        root.AddAnnotation(ma)

        Dim ma2 As MyAnnotation = DirectCast(root.Annotation(Of MyAnnotation)(), MyAnnotation)
        Console.WriteLine(ma2.Tag)
    End Sub

End Module
```

This example produces the following output:

```
T1
```

## XObject.Annotation(Type) method

```csharp
public object? Annotation (Type type);
```

Gets the first annotation object of the specified type from this `XObject`.

Parameters:

- `type`: The type of the annotation to retrieve.

Returns: The `Object` that contains the first annotation object that matches the specified type, or `null` if no annotation is of the specified type.

#### Examples
The following example adds an annotation to an `XElement`. It then retrieves the annotation, specifying the type to retrieve.

```csharp
public class MyAnnotation {
    private string tag;
    public string Tag {get{return tag;} set{tag=value;}}
    public MyAnnotation(string tag) {
        this.tag = tag;
    }
}

public class Program {
    public static void Main(string[] args) {
        MyAnnotation ma = new MyAnnotation("T1");
        XElement root = new XElement("Root", "content");
        root.AddAnnotation(ma);

        MyAnnotation ma2 = (MyAnnotation)root.Annotation(typeof(MyAnnotation));
        Console.WriteLine(ma2.Tag);
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
        Dim ma As MyAnnotation = New MyAnnotation("T1")
        Dim root As XElement = <Root>content</Root>
        root.AddAnnotation(ma)

        Dim ma2 As MyAnnotation = DirectCast(root.Annotation(GetType(MyAnnotation)), MyAnnotation)
        Console.WriteLine(ma2.Tag)
    End Sub

End Module
```

This example produces the following output:

```
T1
```

## XObject.Annotation<T>() method

```csharp
public T? Annotation<T> () where T : class;
```

Gets the first annotation object of the specified type from this `XObject`.

Parameters:

- `T`: The type of the annotation to retrieve.

Returns: The first annotation object that matches the specified type, or `null` if no annotation is of the specified type.

#### Examples
The following example adds an annotation to an element, and then retrieves it through this method.

```csharp
public class MyAnnotation {
    private string tag;
    public string Tag {get{return tag;} set{tag=value;}}
    public MyAnnotation(string tag) {
        this.tag = tag;
    }
}

public class Program {
    public static void Main(string[] args) {
        MyAnnotation ma = new MyAnnotation("T1");
        XElement root = new XElement("Root", "content");
        root.AddAnnotation(ma);

        MyAnnotation ma2 = root.Annotation<MyAnnotation>();
        Console.WriteLine(ma2.Tag);
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
        Dim ma As MyAnnotation = New MyAnnotation("T1")
        Dim root As XElement = <Root>content</Root>
        root.AddAnnotation(ma)

        Dim ma2 As MyAnnotation = root.Annotation(Of MyAnnotation)()
        Console.WriteLine(ma2.Tag)
    End Sub
End Module
```

This example produces the following output:

```
T1
```

## XObject.Annotations(Type) method

```csharp
public System.Collections.Generic.IEnumerable<object> Annotations (Type type);
```

Gets a collection of annotations of the specified type for this `XObject`.

Parameters:

- `type`: The type of the annotations to retrieve.

Returns: An `IEnumerable<T>` of `Object` that contains the annotations that match the specified type for this `XObject`.

#### Examples
The following example adds some annotations to an `XElement`, then retrieves a collection of annotations by using this method.

```csharp
public class MyAnnotation
{
    private string tag;
    public string Tag { get { return tag; } set { tag = value; } }
    public MyAnnotation(string tag)
    {
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

        IEnumerable<object> annotationList;
        annotationList = root.Annotations(typeof(MyAnnotation));
        foreach (object ma in annotationList)
            Console.WriteLine(((MyAnnotation)ma).Tag);
        Console.WriteLine("----");

        IEnumerable<object> stringAnnotationList;
        stringAnnotationList = root.Annotations(typeof(string));
        foreach (object str in stringAnnotationList)
            Console.WriteLine((string)str);
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

        Dim annotationList As IEnumerable(Of Object)
        annotationList = root.Annotations(GetType(MyAnnotation))
        For Each ma As MyAnnotation In annotationList
            Console.WriteLine(ma.Tag)
        Next

        Console.WriteLine("----")

        Dim stringAnnotationList As IEnumerable(Of Object)
        stringAnnotationList = root.Annotations(GetType(String))
        For Each str As String In stringAnnotationList
            Console.WriteLine(str)
        Next
    End Sub
End Module
```

This example produces the following output:

```
T1
T2
----
abc
def
```

## XObject.Annotations<T>() method

```csharp
public System.Collections.Generic.IEnumerable<T> Annotations<T> () where T : class;
```

Gets a collection of annotations of the specified type for this `XObject`.

Parameters:

- `T`: The type of the annotations to retrieve.

Returns: An `IEnumerable<T>` that contains the annotations for this `XObject`.

#### Examples
The following example uses this method to retrieve annotations on an element.

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

        IEnumerable<MyAnnotation> annotationList;
        annotationList = root.Annotations<MyAnnotation>();
        foreach (MyAnnotation ma in annotationList)
            Console.WriteLine(ma.Tag);
        Console.WriteLine("----");

        IEnumerable<string> stringAnnotationList;
        stringAnnotationList = root.Annotations<string>();
        foreach (string str in stringAnnotationList)
            Console.WriteLine(str);
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

        Dim annotationList As IEnumerable(Of MyAnnotation)
        annotationList = root.Annotations(Of MyAnnotation)()
        For Each ma As MyAnnotation In annotationList
            Console.WriteLine(ma.Tag)
        Next
        Console.WriteLine("----")

        Dim stringAnnotationList As IEnumerable(Of String)
        stringAnnotationList = root.Annotations(Of String)()
        For Each str As String In stringAnnotationList
            Console.WriteLine(str)
        Next
    End Sub
End Module
```

This example produces the following output:

```
T1
T2
----
abc
def
```
