---
title: "Insert XML Data using XPathNavigator (part 14 of 20)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Insert XML Data using XPathNavigator (part 14 of 20)

```csharp
            XPathNavigator nodesNavigator = nodes.Current;

            //select all the descendants of the current price node
            XPathNodeIterator nodesText =
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

 For more information about the `System.Xml.XPath.XPathNavigator.CreateAttribute*` and `System.Xml.XPath.XPathNavigator.CreateAttributes*` methods, see the `System.Xml.XPath.XPathNavigator` class reference documentation.

## Copying Nodes

 In certain cases you may want to populate an XML document with the contents from another XML document. Both the `System.Xml.XPath.XPathNavigator` class and the `System.Xml.XmlWriter` class can copy nodes to an `System.Xml.XmlDocument` object from an existing `System.Xml.XmlReader` object or `System.Xml.XPath.XPathNavigator` object.

 The `System.Xml.XPath.XPathNavigator.AppendChild*`, `System.Xml.XPath.XPathNavigator.PrependChild*`, `System.Xml.XPath.XPathNavigator.InsertBefore*` and `System.Xml.XPath.XPathNavigator.InsertAfter*` methods of the `System.Xml.XPath.XPathNavigator` class all have overloads that can accept an `System.Xml.XPath.XPathNavigator` object or an `System.Xml.XmlReader` object as a parameter.

 The `System.Xml.XmlWriter.WriteNode*` method of the `System.Xml.XmlWriter` class has overloads that can accept an `System.Xml.XmlNode`, `System.Xml.XmlReader`, or `System.Xml.XPath.XPathNavigator` object.

 The following example copies all the `book` elements from one document to another.

```vb
Dim document As XmlDocument = New XmlDocument()
document.Load("books.xml")
Dim navigator As XPathNavigator = document.CreateNavigator()

navigator.MoveToChild("bookstore", String.Empty)

Dim newBooks As XPathDocument = New XPathDocument("newBooks.xml")
Dim newBooksNavigator As XPathNavigator = newBooks.CreateNavigator()

Dim nav As XPathNavigator
For Each nav in newBooksNavigator.SelectDescendants("book", "", false)
    navigator.AppendChild(nav)
Next

document.Save("newBooks.xml");
```

```csharp
XmlDocument document = new XmlDocument();
document.Load("books.xml");
XPathNavigator navigator = document.CreateNavigator();

navigator.MoveToChild("bookstore", String.Empty);

XPathDocument newBooks = new XPathDocument("newBooks.xml");
XPathNavigator newBooksNavigator = newBooks.CreateNavigator();

foreach (XPathNavigator nav in newBooksNavigator.SelectDescendants("book", "", false))
{
    navigator.AppendChild(nav);
}

document.Save("newBooks.xml");
```
