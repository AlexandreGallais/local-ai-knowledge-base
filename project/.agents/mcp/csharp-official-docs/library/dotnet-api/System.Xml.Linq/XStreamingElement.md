---
title: "XStreamingElement class (part 1 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XStreamingElement.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XStreamingElement class

Namespace: `System.Xml.Linq`

```csharp
public class XStreamingElement
```

Represents elements in an XML tree that supports deferred streaming output.

#### Remarks
This class allows you to create an XML tree that supports deferred streaming output. You use this class to create an XML tree in a very similar fashion to creating an XML tree using `XElement`. However, there is a fundamental difference. When you use a LINQ query to specify content when creating an XML tree using `XElement`, the query variable is iterated at the time of construction of the XML tree, and the results of the query are added to the XML tree. In contrast, when you create an XML tree using `XStreamingElement`, a reference to the query variable is stored in the XML tree without being iterated. Queries are iterated only upon serialization. This allows you to create larger XML trees while maintaining a smaller memory footprint.

If you are streaming from an input source, such as a text file, then you can read a very large text file, and generate a very large XML document while maintaining a small memory footprint.

Another scenario is that you have a large XML tree that has been loaded into memory, and you want to create a transformed version of the document. If you create a new document using `XElement`, then you will have two large XML trees in memory upon completion of the transformation. However, if you create the new XML tree using `XStreamingElement`, then your working set will be effectively cut in half.

Note that when debugging a program that uses `XStreamingElement`, displaying the value of an object causes its `XStreamingElement.ToString` method to be called. This causes the XML to be serialized. If the semantics of your streaming element query are such that the streaming element can only be streamed once, this may cause undesirable behavior in your debugging experience.

#### Examples
The following example first creates a source XML tree. It then creates a transform of the source XML tree using `XElement`. This transform creates a new tree in memory. It then creates a transform of the source XML tree using `XStreamingElement`. This transform doesn't execute the query until the transformed tree is serialized to the console. Its memory usage is less.

```csharp
XElement srcTree = new XElement("Root",
                       new XElement("Child", 1),
                       new XElement("Child", 2),
                       new XElement("Child", 3),
                       new XElement("Child", 4),
                       new XElement("Child", 5)
                   );

XElement dstTree1 = new XElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el >= 3
                        select new XElement("DifferentChild", (int)el)
                    );

XStreamingElement dstTree2 = new XStreamingElement("NewRoot",
                        from el in srcTree.Elements()
                        where (int)el >= 3
                        select new XElement("DifferentChild", (int)el)
                    );

Console.WriteLine(dstTree1);
Console.WriteLine("------");
Console.WriteLine(dstTree2);
```

```vb
Dim srcTree As XElement = _
        <Root>
            <Child>1</Child>
            <Child>2</Child>
            <Child>3</Child>
            <Child>4</Child>
            <Child>5</Child>
        </Root>

Dim dstTree1 As XElement = _
    <NewRoot>
        <%= From el In srcTree.Elements _
            Where (el.Value >= 3) _
            Select <DifferentChild><%= el.Value %></DifferentChild> %>
    </NewRoot>

Dim dstTree2 As XStreamingElement = New XStreamingElement("NewRoot", _
                From el In srcTree.Elements _
                Where el.Value >= 3 _
                Select <DifferentChild><%= el.Value %></DifferentChild> _
            )

Console.WriteLine(dstTree1)
Console.WriteLine("------")
Console.WriteLine(dstTree2)
```

This example produces the following output:

```txt
<NewRoot>
  <DifferentChild>3</DifferentChild>
  <DifferentChild>4</DifferentChild>
  <DifferentChild>5</DifferentChild>
</NewRoot>
------
<NewRoot>
  <DifferentChild>3</DifferentChild>
  <DifferentChild>4</DifferentChild>
  <DifferentChild>5</DifferentChild>
</NewRoot>
```

One approach to processing a text file is to write an extension method that streams the text file a line at a time using the `yield return` construct. You then can write a LINQ query that processes the text file in a lazy deferred fashion. If you then use the `XStreamingElement` to stream output, you then can create a transform from the text file to XML that uses a minimal amount of memory, regardless of the size of the source text file.

The following text file, People.txt, is the source for this example.

```txt
#This is a comment
1,Tai,Yee,Writer
2,Nikolay,Grachev,Programmer
3,David,Wright,Inventor
```

The following code contains an extension method that streams the lines of the text file in a deferred fashion.

```csharp
public static class StreamReaderSequence
{
    public static IEnumerable<string> Lines(this StreamReader source)
    {
        String line;

        if (source == null)
            throw new ArgumentNullException("source");
        while ((line = source.ReadLine()) != null)
        {
            yield return line;
        }
    }
}

class Program
{
    static void Main(string[] args)
    {
        StreamReader sr = new StreamReader("People.txt");
        XStreamingElement xmlTree = new XStreamingElement("Root",
            from line in sr.Lines()
            let items = line.Split(',')
            where !line.StartsWith("#")
            select new XElement("Person",
                       new XAttribute("ID", items[0]),
                       new XElement("First", items[1]),
                       new XElement("Last", items[2]),
                       new XElement("Occupation", items[3])
                   )
        );
        Console.WriteLine(xmlTree);
        sr.Close();
    }
}
```

```vb
Module StreamReaderSequence

    <Runtime.CompilerServices.Extension>
    Public Iterator Function Lines(source As IO.StreamReader) As IEnumerable(Of String)
        If source Is Nothing Then Throw New ArgumentNullException("source")
        Dim line As String = source.ReadLine()
        While (line <> Nothing)
            Yield line
            line = source.ReadLine()
        End While
    End Function

End Module

Module Module1
    Sub Main()
        Dim sr As New IO.StreamReader("People.txt")
        Dim xmlTree As New XStreamingElement("Root",
            From line In sr.Lines()
            Let items = line.Split(","c)
            Where Not line.StartsWith("#")
            Select <Person ID=<%= items(0) %>>
                       <First><%= items(1) %></First>
                       <Last><%= items(2) %></Last>
                       <Occupation><%= items(3) %></Occupation>
                   </Person>)
        Console.WriteLine(xmlTree)
        sr.Close()
    End Sub
End Module
```

This example produces the following output:

```xml
<Root>
  <Person ID="1">
    <First>Tai</First>
    <Last>Yee</Last>
    <Occupation>Writer</Occupation>
  </Person>
  <Person ID="2">
    <First>Nikolay</First>
    <Last>Grachev</Last>
    <Occupation>Programmer</Occupation>
  </Person>
  <Person ID="3">
    <First>David</First>
    <Last>Wright</Last>
    <Occupation>Inventor</Occupation>
  </Person>
</Root>
```

Sometimes you have to transform large XML files, and write your application so that the memory footprint of the application is predictable. If you try to populate an XML tree with a very large XML file, your memory usage will be proportional to the size of the file (that is, excessive). Therefore, you should use a streaming technique instead.

Certain standard query operators, such as `Enumerable.OrderBy`, iterate their source, collect all of the data, sort it, and then finally yield the first item in the sequence. Note that if you use a query operator that materializes its source before yielding the first item, you will not retain a small memory footprint for your application.

Even if you use the technique described in , if you try to assemble an XML tree that contains the transformed document, memory usage may be too great.

The following example builds on the example in How to stream XML fragments with access to header information.

This example uses the deferred execution capabilities of `XStreamingElement` to stream the output.

Note that the custom axis (`StreamCustomerItem`) is specifically written so that it expects a document that has `Customer`, `Name`, and `Item` elements, and that those elements will be arranged as in the following Source.xml document. A more robust implementation, however, would either validate the source document with an XSD, or would be prepared to parse an invalid document.

The following is the source document, Source.xml:

```xml
<?xml version="1.0" encoding="utf-8" ?>
<Root>
  <Customer>
    <Name>A. Datum Corporation</Name>
    <Item>
      <Key>0001</Key>
    </Item>
    <Item>
      <Key>0002</Key>
    </Item>
    <Item>
      <Key>0003</Key>
    </Item>
    <Item>
      <Key>0004</Key>
    </Item>
  </Customer>
  <Customer>
    <Name>Fabrikam, Inc.</Name>
    <Item>
      <Key>0005</Key>
    </Item>
    <Item>
      <Key>0006</Key>
    </Item>
    <Item>
      <Key>0007</Key>
    </Item>
    <Item>
      <Key>0008</Key>
    </Item>
  </Customer>
  <Customer>
    <Name>Southridge Video</Name>
    <Item>
      <Key>0009</Key>
    </Item>
    <Item>
      <Key>0010</Key>
    </Item>
  </Customer>
</Root>
```

The following code contains a method that uses an `XmlReader` to stream the source XML. It uses `XStreamingElement` to stream the new XML.

```csharp
static IEnumerable<XElement> StreamCustomerItem(string uri)
{
    using (XmlReader reader = XmlReader.Create(uri))
    {
        XElement name = null;
        XElement item = null;

        reader.MoveToContent();

        // Parse the file, save header information when encountered, and yield the
        // Item XElement objects as they are created.

        // loop through Customer elements
        while (reader.Read())
        {
            if (reader.NodeType == XmlNodeType.Element
                && reader.Name == "Customer")
            {
                // move to Name element
                while (reader.Read())
                {
                    if (reader.NodeType == XmlNodeType.Element &&
                        reader.Name == "Name")
                    {
                        name = XElement.ReadFrom(reader) as XElement;
                        break;
                    }
                }

                // loop through Item elements
                while (reader.Read())
                {
                    if (reader.NodeType == XmlNodeType.EndElement)
                        break;
                    if (reader.NodeType == XmlNodeType.Element
                        && reader.Name == "Item")
                    {
                        item = XElement.ReadFrom(reader) as XElement;
                        if (item != null)
                        {
                            XElement tempRoot = new XElement("Root",
                                new XElement(name)
                            );
                            tempRoot.Add(item);
                            yield return item;
                        }
                    }
                }
            }
        }
    }
}

static void Main(string[] args)
{
    XStreamingElement root = new XStreamingElement("Root",
        from el in StreamCustomerItem("Source.xml")
        select new XElement("Item",
            new XElement("Customer", (string)el.Parent.Element("Name")),
            new XElement(el.Element("Key"))
        )
    );
    root.Save("Test.xml");
    Console.WriteLine(File.ReadAllText("Test.xml"));
}
```

```vb
Iterator Function StreamCustomerItem(uri As String) As IEnumerable(Of XElement)

    Dim name As XElement = Nothing
    Dim item As XElement = Nothing

    Dim reader As XmlReader = XmlReader.Create(uri)
    reader.MoveToContent()

    ' Parse the file, save header information when encountered, and yield the
    ' Item XElement objects as they are created.

    ' Loop through Customer elements.
    While (reader.Read())
        If (reader.NodeType = XmlNodeType.Element And reader.Name = "Customer") Then
            While (reader.Read())
                ' Move to Name element
                If (reader.NodeType = XmlNodeType.Element And reader.Name = "Name") Then
                    name = CType(XElement.ReadFrom(reader), XElement)
                    Exit While
                End If
            End While

            ' Loop through Item elements
            While (reader.Read())
                If (reader.NodeType = XmlNodeType.EndElement) Then
                    Exit While
                End If

                If (reader.NodeType = XmlNodeType.Element And reader.Name = "Item") Then
                    item = CType(XElement.ReadFrom(reader), XElement)
                    If (Not (item Is Nothing)) Then
                        Dim tempRoot = New XElement("Root",
                            New XElement(name)
                        )
                        tempRoot.Add(item)
                        Yield item
                     End If
                End If
            End While
        End If
     End While
    reader.Close()
End Function

Sub Main()
    Dim root As New XStreamingElement("Root",
        From el In StreamCustomerItem("c:\trash\Source.xml")
        Select New XElement("Item",
            New XElement("Customer", CStr(el.Parent.Element("Name"))),
            New XElement(el.Element("Key"))))
    root.Save("c:\trash\Test.xml")
    Console.WriteLine(System.IO.File.ReadAllText("c:\trash\Test.xml"))
End Sub
```

This example produces the following output:

```xml
<?xml version="1.0" encoding="utf-8"?>
<Root>
  <Item>
    <Customer>A. Datum Corporation</Customer>
    <Key>0001</Key>
  </Item>
  <Item>
    <Customer>A. Datum Corporation</Customer>
    <Key>0002</Key>
  </Item>
  <Item>
    <Customer>A. Datum Corporation</Customer>
    <Key>0003</Key>
  </Item>
  <Item>
    <Customer>A. Datum Corporation</Customer>
    <Key>0004</Key>
  </Item>
  <Item>
    <Customer>Fabrikam, Inc.</Customer>
    <Key>0005</Key>
  </Item>
  <Item>
    <Customer>Fabrikam, Inc.</Customer>
    <Key>0006</Key>
  </Item>
  <Item>
    <Customer>Fabrikam, Inc.</Customer>
    <Key>0007</Key>
  </Item>
  <Item>
    <Customer>Fabrikam, Inc.</Customer>
    <Key>0008</Key>
  </Item>
  <Item>
    <Customer>Southridge Video</Customer>
    <Key>0009</Key>
  </Item>
  <Item>
    <Customer>Southridge Video</Customer>
    <Key>0010</Key>
  </Item>
</Root>
```
