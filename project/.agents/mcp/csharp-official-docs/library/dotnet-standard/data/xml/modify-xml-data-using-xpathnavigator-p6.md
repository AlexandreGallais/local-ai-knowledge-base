---
title: "Modify XML Data using XPathNavigator (part 6 of 7)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/modify-xml-data-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Modify XML Data using XPathNavigator (part 6 of 7)

```csharp
               nodesNavigator.SelectDescendants(XPathNodeType.Text, false);

            while(nodesText.MoveNext())
            {
               Console.WriteLine(nodesText.Current.Value);
            }
        }
    }

    static void XPathNavigatorMethods_SelectAncestorsChildrenDescendants()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        // Select all the descendant nodes of the book node.
        XPathNodeIterator bookDescendants = navigator.SelectDescendants("", "http://www.contoso.com/books", false);

        // Display the LocalName of each descendant node.
        Console.WriteLine("Descendant nodes of the book node:");
        while (bookDescendants.MoveNext())
        {
            Console.WriteLine(bookDescendants.Current.Name);
        }

        // Select all the child nodes of the book node.
        XPathNodeIterator bookChildren = navigator.SelectChildren("", "http://www.contoso.com/books");

        // Display the LocalName of each child node.
        Console.WriteLine("\nChild nodes of the book node:");
        while (bookChildren.MoveNext())
        {
            Console.WriteLine(bookChildren.Current.Name);
        }

        // Select all the ancestor nodes of the title node.
        navigator.MoveToChild("title", "http://www.contoso.com/books");

        XPathNodeIterator bookAncestors = navigator.SelectAncestors("", "http://www.contoso.com/books", false);

        // Display the LocalName of each ancestor node.
        Console.WriteLine("\nAncestor nodes of the title node:");

        while (bookAncestors.MoveNext())
        {
            Console.WriteLine(bookAncestors.Current.Name);
        }
    }

    static void XPathNavigatorMethods_SelectSingleNode1()
    {
        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XPathNavigator node = navigator.SelectSingleNode("//title");
        Console.WriteLine(node.InnerXml);
    }

    static void XPathNavigatorMethods_SelectSingleNode2()
    {
        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XPathExpression query = navigator.Compile("//title");

        XPathNavigator node = navigator.SelectSingleNode(query);
        Console.WriteLine(node.InnerXml);
    }

    static void XPathNavigatorMethods_SelectSingleNode3()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XmlNamespaceManager manager = new XmlNamespaceManager(navigator.NameTable);
        manager.AddNamespace("bk", "http://www.contoso.com/books");

        XPathNavigator node = navigator.SelectSingleNode("//bk:title", manager);
        Console.WriteLine(node.InnerXml);
    }

    static void XPathNavigatorMethods_SetTypedValue()
    {
        XmlReaderSettings settings = new XmlReaderSettings();
        settings.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd");
        settings.ValidationType = ValidationType.Schema;

        XmlReader reader = XmlReader.Create("contosoBooks.xml", settings);
        XmlDocument document = new XmlDocument();
        document.Load(reader);

        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        Decimal price = 19.99M;
        navigator.SetTypedValue(price);

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_SetValue()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XmlNamespaceManager manager = new XmlNamespaceManager(navigator.NameTable);
        manager.AddNamespace("bk", "http://www.contoso.com/books");

        foreach (XPathNavigator nav in navigator.Select("//bk:price", manager))
        {
            if (nav.Value == "11.99")
            {
                nav.SetValue("12.99");
            }
        }

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_WriteSubtree()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        XmlWriter writer = XmlWriter.Create("contosoBook.xml");
        navigator.WriteSubtree(writer);

        writer.Close();
    }

    static void XPathNavigatorMethods_MoveToNextAttribute()
    {
        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        // Select all book nodes and display all attributes on each book.
        XPathNodeIterator nodes = navigator.SelectDescendants("book", "", false);
        while (nodes.MoveNext())
        {
            XPathNavigator navigator2 = nodes.Current.Clone();
            navigator2.MoveToFirstAttribute();
            Console.WriteLine($"{navigator2.Name} = {navigator2.Value}");

            while (navigator2.MoveToNextAttribute())
            {
                Console.WriteLine($"{navigator2.Name} = {navigator2.Value}");
            }

            Console.WriteLine();
        }
    }

    static void XPathNavigatorMethods_BasicMoveTos()
    {
        // Load the XML document.
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");

        // Create the XPathNavigator.
        XPathNavigator navigator = document.CreateNavigator();

        // Create an XmlNamespaceManager used to handle namespaces
        // found in the XML document.
        XmlNamespaceManager manager = new XmlNamespaceManager(document.NameTable);
        manager.AddNamespace("bk", "http://www.contoso.com/books");

        // Move to the last book node using the SelectSingleNode method.
        navigator = navigator.SelectSingleNode("//bk:book[last()]", manager);
        Console.WriteLine($"Last book node: \n===============\n{navigator.OuterXml}");

        // Move to the previous book node and write it to the console
        // if the move was successful.
        if (navigator.MoveToPrevious())
        {
            Console.WriteLine($"\nSecond book node: \n=================\n{navigator.OuterXml}");
        }

        // Move to the first book node and write it to the console
        // if the move was successful.
        if (navigator.MoveToFirst())
        {
            Console.WriteLine($"\nFirst book node: \n================\n{navigator.OuterXml}");
        }

        // Move to the parent bookstore node and write it to the console
        // if the move was successful.
        if (navigator.MoveToParent())
        {
            Console.WriteLine($"\nParent bookstore node: \n======================\n{navigator.OuterXml}");
        }

        // Move to the first child node of the bookstore node and write
        // it to the console if the move was successful.
        if (navigator.MoveToFirstChild())
        {
            Console.WriteLine($"\nFirst book node: \n================\n{navigator.OuterXml}");
        }

        // Move to the root node and write it to the console.
        navigator.MoveToRoot();
        Console.WriteLine($"\nRoot node: \n==========\n{navigator.OuterXml}");
    }

    static void XPathNavigatorMethods_TwoWaysToIterateOverXPathNavigator()
    {
        XPathDocument doc = new XPathDocument(new StringReader("<A><B/></A>"));
        XPathNavigator nav = doc.CreateNavigator();
        XPathNodeIterator nodeIterator = nav.SelectDescendants("", "", false);

        while (nodeIterator.MoveNext())
        {
            XPathNavigator n = nodeIterator.Current;
            Console.WriteLine(n.LocalName);
        }

        foreach (XPathNavigator n in nodeIterator)
            Console.WriteLine(n.LocalName);
    }
}
```

 The example takes the `contosoBooks.xml` file as an input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml._

### Modifying Typed Values

 When the type of a node is a W3C XML Schema simple type, the new value inserted by the `System.Xml.XPath.XPathNavigator.SetTypedValue*` method is checked against the facets of the simple type before the value is set. If the new value is not valid according to the type of the node (for example, setting a value of `-1` on an element whose type is `xs:positiveInteger`), it results in an exception.

 The following example attempts to change the value of the `price` element of the first `book` element in the `contosoBooks.xml` file to a `System.DateTime` value. Because the XML Schema type of the `price` element is defined as `xs:decimal` in the `contosoBooks.xsd` files, this results in an exception.

```vb
Dim settings As XmlReaderSettings = New XmlReaderSettings()
settings.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd")
settings.ValidationType = ValidationType.Schema

Dim reader As XmlReader = XmlReader.Create("contosoBooks.xml", settings)

Dim document As XmlDocument = New XmlDocument()
document.Load(reader)
Dim navigator As XPathNavigator = document.CreateNavigator()

navigator.MoveToChild("bookstore", "http://www.contoso.com/books")
navigator.MoveToChild("book", "http://www.contoso.com/books")
navigator.MoveToChild("price", "http://www.contoso.com/books")

navigator.SetTypedValue(DateTime.Now)
```

```csharp
XmlReaderSettings settings = new XmlReaderSettings();
settings.Schemas.Add("http://www.contoso.com/books", "contosoBooks.xsd");
settings.ValidationType = ValidationType.Schema;

XmlReader reader = XmlReader.Create("contosoBooks.xml", settings);

XmlDocument document = new XmlDocument();
document.Load(reader);
XPathNavigator navigator = document.CreateNavigator();

navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
navigator.MoveToChild("book", "http://www.contoso.com/books");
navigator.MoveToChild("price", "http://www.contoso.com/books");

navigator.SetTypedValue(DateTime.Now);
```

 The example takes the `contosoBooks.xml` file as an input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xml._

 The example also takes the `contosoBooks.xsd` as an input.

 _Code sample not included: ../../../../samples/snippets/xml/VS_Snippets_Data/XPathXMLExamples/XML/contosoBooks.xsd._

#### The Effects of Editing Strongly Typed XML Data

 The `System.Xml.XPath.XPathNavigator` class uses the W3C XML Schema as a basis for describing strongly typed XML. Elements and attributes can be annotated with type information based on validation against a W3C XML Schema document. Elements that can contain other elements or attributes are called complex types, while those that can only contain textual content are called simple types.

> **Note:**
> Attributes can only have simple types.

 An element or attribute can be considered to be schema-valid if it conforms to all the rules specific to its type definition. An element that has the simple type `xs:int` has to contain a numeric value between -2147483648 and 2147483647 to be schema-valid. For complex types, the schema-validity of the element is dependent on the schema-validity of its child elements and attributes. Thus if an element is valid against its complex type definition, all its child elements and attributes are valid against their type definitions. Similarly, if even one of the child elements or attributes of an element is invalid against its type definition, or has an unknown validity, the element is also either invalid or of unknown validity.

 Given that the validity of an element is dependent on the validity of its child elements and attributes, modifications to either result in altering the validity of the element if it was previously valid. Specifically, if the child elements or attributes of an element are inserted, updated, or deleted, then the validity of the element becomes unknown. This is represented by the `System.Xml.Schema.IXmlSchemaInfo.Validity` property of the element's `System.Xml.XPath.XPathNavigator.SchemaInfo` property being set to `System.Xml.Schema.XmlSchemaValidity.NotKnown`. Furthermore, this effect cascades upwards recursively across the XML document, because the validity of the element's parent element (and its parent element, and so on) also becomes unknown.

 For more information about schema validation and the `System.Xml.XPath.XPathNavigator` class, see Schema Validation using XPathNavigator.

### Modifying Attributes

 The `System.Xml.XPath.XPathNavigator.SetValue*` and `System.Xml.XPath.XPathNavigator.SetTypedValue*` methods can be used to modify untyped and typed attribute nodes as well as the other node types listed in the "Modifying Nodes" section.

 The following example changes the value of the `genre` attribute of the first `book` element in the `books.xml` file.

```vb
Dim document As XmlDocument = New XmlDocument()
document.Load("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

navigator.MoveToChild("bookstore", String.Empty)
navigator.MoveToChild("book", String.Empty)
navigator.MoveToAttribute("genre", String.Empty)

navigator.SetValue("non-fiction")

navigator.MoveToRoot()
Console.WriteLine(navigator.OuterXml)
```

```csharp
XmlDocument document = new XmlDocument();
document.Load("books.xml");
XPathNavigator navigator = document.CreateNavigator();

navigator.MoveToChild("bookstore", String.Empty);
navigator.MoveToChild("book", String.Empty);
navigator.MoveToAttribute("genre", String.Empty);

navigator.SetValue("non-fiction");

navigator.MoveToRoot();
Console.WriteLine(navigator.OuterXml);
```

 For more information about the `System.Xml.XPath.XPathNavigator.SetValue*` and `System.Xml.XPath.XPathNavigator.SetTypedValue*` methods, see the "Modifying Untyped Values" and "Modifying Typed Values" sections.
