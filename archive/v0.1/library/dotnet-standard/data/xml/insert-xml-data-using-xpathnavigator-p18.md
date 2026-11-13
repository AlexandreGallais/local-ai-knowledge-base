---
title: "Insert XML Data using XPathNavigator (part 18 of 20)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/insert-xml-data-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Insert XML Data using XPathNavigator (part 18 of 20)

```csharp
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertElementAfter()
    {
        // XPathNavigator.InsertElementAfter(string, string, string, string)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        navigator.InsertElementAfter(navigator.Prefix, "pages", navigator.LookupNamespace(navigator.Prefix), "100");

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertElementBefore()
    {
        // XPathNavigator.InsertElementBefore(string, string, string, string)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        navigator.InsertElementBefore(navigator.Prefix, "pages", navigator.LookupNamespace(navigator.Prefix), "100");

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_Matches()
    {
        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        // Select all book nodes.
        XPathNodeIterator nodes = navigator.SelectDescendants("book", "", false);

        // Select all book nodes that have the matching attribute value.
        XPathExpression expr = navigator.Compile("book[@genre='novel']");
        while (nodes.MoveNext())
        {
            XPathNavigator navigator2 = nodes.Current.Clone();
            if (navigator2.Matches(expr))
            {
                navigator2.MoveToFirstChild();
                Console.WriteLine($"Book title:  {navigator2.Value}");
            }
        }
    }

    static void XPathNavigatorMethods_MoveToFollowing1()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToFollowing(XPathNodeType.Element);

        Console.WriteLine($"Position: {navigator.Name}");
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_MoveToFollowing2()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToFollowing("price", "http://www.contoso.com/books");

        Console.WriteLine($"Position: {navigator.Name}");
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_MoveToFollowing3()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToFollowing("price", "http://www.contoso.com/books");
        XPathNavigator boundary = navigator.Clone();

        navigator.MoveToRoot();

        while (navigator.MoveToFollowing(XPathNodeType.Text, boundary))
        {
            Console.WriteLine(navigator.OuterXml);
        }
    }

    static void XPathNavigatorMethods_MoveToFollowing4()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToFollowing("book", "http://www.contoso.com/books");
        XPathNavigator boundary = navigator.Clone();
        boundary.MoveToFollowing("first-name", "http://www.contoso.com/books");

        navigator.MoveToFollowing("price", "http://www.contoso.com/books", boundary);

        Console.WriteLine($"Position (after boundary): {navigator.Name}");
        Console.WriteLine(navigator.OuterXml);

        navigator.MoveToFollowing("title", "http://www.contoso.com/books", boundary);

        Console.WriteLine($"Position (before boundary): {navigator.Name}");
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_MoveToNext()
    {

        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();
        XPathNodeIterator nodeset = navigator.Select("descendant::book[author/last-name='Melville']");

        while (nodeset.MoveNext())
        {
            // Clone iterator here when working with it.
            RecursiveWalk(nodeset.Current.Clone());
        }
    }

    public static void RecursiveWalk(XPathNavigator navigator)
    {
        switch (navigator.NodeType)
        {
            case XPathNodeType.Element:
                if (string.IsNullOrEmpty(navigator.Prefix))
                    Console.WriteLine($"<{navigator.LocalName}>");
                else
                    Console.Write("<{0}:{1}>", navigator.Prefix, navigator.LocalName);
                Console.WriteLine("\t" + navigator.NamespaceURI);
                break;
            case XPathNodeType.Text:
                Console.WriteLine("\t" + navigator.Value);
                break;
        }

        if (navigator.MoveToFirstChild())
        {
            do
            {
                RecursiveWalk(navigator);
            } while (navigator.MoveToNext());

            navigator.MoveToParent();
            if (navigator.NodeType == XPathNodeType.Element)
                Console.WriteLine($"</{navigator.Name}>");
        }
        else
        {
            if (navigator.NodeType == XPathNodeType.Element)
            {
                Console.WriteLine($"</{navigator.Name}>");
            }
        }
    }

    static void XPathNavigatorMethods_PrependChild1()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        XmlWriter pages = navigator.PrependChild();
        pages.WriteElementString("pages", "100");
        pages.Close();

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_PrependChild2()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        navigator.PrependChild("<pages>100</pages>");

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_PrependChild3()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        XmlReader pages = XmlReader.Create(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));

        navigator.PrependChild(pages);

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_PrependChild4()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        XmlDocument childNodes = new XmlDocument();
        childNodes.Load(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));
        XPathNavigator childNodesNavigator = childNodes.CreateNavigator();

        navigator.PrependChild(childNodesNavigator);

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_PrependChildElement()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        navigator.PrependChildElement(navigator.Prefix, "pages", navigator.LookupNamespace(navigator.Prefix), "100");

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_ReadSubtree()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        XmlReader reader = navigator.ReadSubtree();

        while (reader.Read())
        {
            Console.WriteLine(reader.ReadInnerXml());
        }

        reader.Close();
    }

    static void XPathNavigatorMethods_ReplaceRange()
    {
        // XPathNavigator.ReplaceRange()

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XmlNamespaceManager manager = new XmlNamespaceManager(document.NameTable);
        manager.AddNamespace("bk", "http://www.contoso.com/books");

        XPathNavigator first = navigator.SelectSingleNode("/bk:bookstore/bk:book[1]", manager);
        XPathNavigator last = navigator.SelectSingleNode("/bk:bookstore/bk:book[2]", manager);

        navigator.MoveTo(first);
        XmlWriter newRange = navigator.ReplaceRange(last);
        newRange.WriteStartElement("book");
        newRange.WriteAttributeString("genre", "");
        newRange.WriteAttributeString("publicationdate", "2005-04-07");
        newRange.WriteAttributeString("ISBN", "0");
        newRange.WriteStartElement("title");
        newRange.WriteString("New Book");
        newRange.WriteEndElement();
        newRange.WriteStartElement("author");
        newRange.WriteStartElement("first-name");
        newRange.WriteString("First Name");
        newRange.WriteEndElement();
        newRange.WriteStartElement("last-name");
        newRange.WriteString("Last Name");
        newRange.WriteEndElement();
        newRange.WriteEndElement();
        newRange.WriteElementString("price", "$0.00");
        newRange.WriteEndElement();
        newRange.Close();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_ReplaceSelf1()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        navigator.ReplaceSelf("<pages>100</pages>");

        Console.WriteLine($"Position after delete: {navigator.Name}");
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_ReplaceSelf2()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlReader pages = XmlReader.Create(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));

        navigator.ReplaceSelf(pages);

        Console.WriteLine($"Position after delete: {navigator.Name}");
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_ReplaceSelf3()
    {
        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlDocument childNodes = new XmlDocument();
        childNodes.Load(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));
        XPathNavigator childNodesNavigator = childNodes.CreateNavigator();

        navigator.ReplaceSelf(childNodesNavigator);

        Console.WriteLine($"Position after delete: {navigator.Name}");
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_Select1()
    {
        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XPathNodeIterator nodes = navigator.Select("/bookstore/book");
        nodes.MoveNext();
        XPathNavigator nodesNavigator = nodes.Current;

        XPathNodeIterator nodesText = nodesNavigator.SelectDescendants(XPathNodeType.Text, false);

        while (nodesText.MoveNext())
            Console.WriteLine(nodesText.Current.Value);
    }

    static void XPathNavigatorMethods_Select2()
    {
        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XPathExpression query = navigator.Compile("/bookstore/book");
        XPathNodeIterator nodes = navigator.Select(query);
        XPathNavigator nodesNavigator = nodes.Current;

        XPathNodeIterator nodesText = nodesNavigator.SelectDescendants(XPathNodeType.Text, false);

        while (nodesText.MoveNext())
        {
            Console.WriteLine(nodesText.Current.Value);
        }
    }

    static void XPathNavigatorMethods_Select3()
    {
        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();
        XmlNamespaceManager manager = new XmlNamespaceManager(navigator.NameTable);
        manager.AddNamespace("bk", "http://www.contoso.com/books");

        XPathNodeIterator nodes = navigator.Select("/bk:bookstore/bk:book/bk:price", manager);
        // Move to the first node bk:price node
        if(nodes.MoveNext())
        {
            // now nodes.Current points to the first selected node
            XPathNavigator nodesNavigator = nodes.Current;

            //select all the descendants of the current price node
            XPathNodeIterator nodesText =
```
