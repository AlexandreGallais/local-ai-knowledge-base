---
title: "XDocumentType class (part 2 of 2)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XDocumentType.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XDocumentType class (part 2 of 2)

## XDocumentType.SystemId property

```csharp
public string? SystemId { get; set; }
```

Gets or sets the system identifier for this Document Type Definition (DTD).

Returns: A `String` that contains the system identifier for this Document Type Definition (DTD).

#### Remarks
If an XML document uses an external private DTD, this property will contain the private identifier of the external DTD.

#### Examples
The following example creates an XML document that refers to an external private DTD. The DTD does not have an internal subset. The call to the `XDocumentType` constructor reflects the use of the external private DTD. It passes `null` for the internal subset.

```csharp
string pubsDtd =
@"<!ELEMENT Pubs (Book+)>
<!ELEMENT Book (Title, Author)>
<!ELEMENT Title (#PCDATA)>
<!ELEMENT Author (#PCDATA)>";
File.WriteAllText("Pubs.dtd", pubsDtd);

string target = "xml-stylesheet";
string data = "href=\"mystyle.css\" title=\"Compact\" type=\"text/css\"";

XDocument doc = new XDocument(
    new XDocumentType("Pubs", null, "Pubs.dtd", null),
    new XElement("Pubs",
        new XElement("Book",
            new XElement("Title", "Artifacts of Roman Civilization"),
            new XElement("Author", "Moreno, Jordao")
        ),
        new XElement("Book",
            new XElement("Title", "Midieval Tools and Implements"),
            new XElement("Author", "Gazit, Inbar")
        )
    ),
    new XComment("This is another comment.")
);
doc.Declaration = new XDeclaration("1.0", "utf-8", "true");
doc.Save("Pubs.xml");

// Validate Pubs.xml against Pubs.dtd.
XmlReaderSettings xrs = new XmlReaderSettings();
xrs.ProhibitDtd = false;
xrs.ValidationType = ValidationType.DTD;
xrs.ConformanceLevel = ConformanceLevel.Auto;
XmlReader xr = XmlReader.Create("Pubs.xml", xrs);
XDocument doc2 = XDocument.Load(xr);

XDocumentType dt = doc2.Document.DocumentType;
Console.WriteLine("SystemId:{0}", dt.SystemId);
```

```vb
Dim pubsDtd As String = _
    "<!ELEMENT Pubs (Book+)>" & Environment.NewLine & _
    "<!ELEMENT Book (Title, Author)>" & Environment.NewLine & _
    "<!ELEMENT Title (#PCDATA)>" & Environment.NewLine & _
    "<!ELEMENT Author (#PCDATA)>"
File.WriteAllText("Pubs.dtd", pubsDtd)

Dim target As String = "xml-stylesheet"
Dim data As String = "href='mystyle.css' title='Compact' type='text/css'"

Dim doc As XDocument = _
    <?xml version='1.0'?>
    <Pubs>
        <Book>
            <Title>Artifacts of Roman Civilization</Title>
            <Author>Moreno, Jordao</Author>
        </Book>
        <Book>
            <Title>Midieval Tools and Implements</Title>
            <Author>Gazit, Inbar</Author>
        </Book>
    </Pubs>
    <!--This is another comment.-->

doc _
.FirstNode _
.AddBeforeSelf(New XDocumentType("Pubs", Nothing, "Pubs.dtd", Nothing))

doc.Declaration = New XDeclaration("1.0", "utf-8", "true")
doc.Save("Pubs.xml")

' Validate Pubs.xml against Pubs.dtd.
Dim xrs As XmlReaderSettings = New XmlReaderSettings()
xrs.ProhibitDtd = False
xrs.ValidationType = ValidationType.DTD
xrs.ConformanceLevel = ConformanceLevel.Auto
Dim xr As XmlReader = XmlReader.Create("Pubs.xml", xrs)
Dim doc2 As XDocument = XDocument.Load(xr)

Dim dt As XDocumentType = doc2.Document.DocumentType
Console.WriteLine("SystemId:{0}", dt.SystemId)
```

This example produces the following output:

```
SystemId:Pubs.dtd
```

## XDocumentType.WriteTo(XmlWriter) method

```csharp
public override void WriteTo (System.Xml.XmlWriter writer);
```

Write this `XDocumentType` to an `XmlWriter`.

Parameters:

- `writer`: An `XmlWriter` into which this method will write.

#### Remarks
This method is primarily used internally by the methods that write an XML tree to an `XmlWriter`.

## XDocumentType.WriteToAsync(XmlWriter, CancellationToken) method

```csharp
public override System.Threading.Tasks.Task WriteToAsync (System.Xml.XmlWriter writer, System.Threading.CancellationToken <example-value>);
```

Writes this `XDocumentType` to the specified `XmlWriter`.

Parameters:

- `writer`: The writer to write this `XDocumentType` to.
- `cancellationToken`: A token that can be used to request cancellation of the asynchronous operation.

Returns: A task representing the asynchronous write operation.

Exceptions:

- `OperationCanceledException`: The cancellation token was canceled. This exception is stored into the returned task.

This method stores in the task it returns all non-usage exceptions that the method's synchronous counterpart can throw. If an exception is stored into the returned task, that exception will be thrown when the task is awaited. Usage exceptions, such as `ArgumentException`, are still thrown synchronously. For the stored exceptions, see the exceptions thrown by `XDocumentType.WriteTo`.
