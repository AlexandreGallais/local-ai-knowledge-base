---
title: "Modify XML Data using XPathNavigator (part 4 of 7)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/modify-xml-data-using-xpathnavigator.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Modify XML Data using XPathNavigator (part 4 of 7)

In the following example, the `System.Xml.XPath.XPathNavigator.SetValue*` method is used to update all `price` elements in the `contosoBooks.xml` file.
 ```csharp
using System;
using System.IO;
using System.Xml;
using System.Xml.Schema;
using System.Xml.XPath;
using System.Collections;

class XPathNavigatorMethods
{
    static string contosobooks = @"C:\Documents and Settings\dylanm\My Documents\contosoBooks.xml";

    static void Main()
    {
    }

    static void XPathNavigatorMethods_AppendChild1()
    {
        // XPathNavigator.AppendChild()

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        XmlWriter pages = navigator.AppendChild();
        pages.WriteElementString("pages", "100");
        pages.Close();

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_AppendChild2()
    {
        // XPathNavigator.AppendChild(string)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        navigator.AppendChild("<pages>100</pages>");

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_AppendChild3()
    {
        // XPathNavigator.AppendChile(XmlReader)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        XmlReader pages = XmlReader.Create(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));

        navigator.AppendChild(pages);

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_AppendChild4()
    {
        // XPathNavigator.AppendChild(XPathNavigator)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        XmlDocument childNodes = new XmlDocument();
        childNodes.Load(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));
        XPathNavigator childNodesNavigator = childNodes.CreateNavigator();

        if(childNodesNavigator.MoveToChild("pages", "http://www.contoso.com/books"))
        {
            navigator.AppendChild(childNodesNavigator);
        }

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_AppendChildElement()
    {
        // XPathNavigator.AppendChildElement(string, string, string, string)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");

        navigator.AppendChildElement(navigator.Prefix, "pages", navigator.LookupNamespace(navigator.Prefix), "100");

        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_Clone()
    {
        // XPathNavigator.Clone()

        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        // Select all books authored by Melville.
        XPathNodeIterator nodes = navigator.Select("descendant::book[author/last-name='Melville']");

        while (nodes.MoveNext())
        {
            // Clone the navigator returned by the Current property.
            // Use the cloned navigator to get the title element.
            XPathNavigator clone = nodes.Current.Clone();
            clone.MoveToFirstChild();
            Console.WriteLine($"Book title: {clone.Value}");
        }
    }

    static void XPathNavigatorMethods_CreateAttribute()
    {
        // XPathNavigator.CreateAttribute(string, string, string, string)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        navigator.CreateAttribute("", "discount", "", "1.00");

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_CreateAttributes()
    {
        // XPathNavigator.CreateAttributes()

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlWriter attributes = navigator.CreateAttributes();

        attributes.WriteAttributeString("discount", "1.00");
        attributes.WriteAttributeString("currency", "USD");
        attributes.Close();

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_DeleteSelf()
    {
        // XPathNavigator.DeleteSelf()

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        navigator.DeleteSelf();

        Console.WriteLine($"Position after delete: {navigator.Name}");
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_DeleteRange()
    {
        // XPathNavigator.DeleteRange()

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XmlNamespaceManager manager = new XmlNamespaceManager(document.NameTable);
        manager.AddNamespace("bk", "http://www.contoso.com/books");

        XPathNavigator first = navigator.SelectSingleNode("/bk:bookstore/bk:book[1]", manager);
        XPathNavigator last = navigator.SelectSingleNode("/bk:bookstore/bk:book[2]", manager);

        navigator.MoveTo(first);
        navigator.DeleteRange(last);
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_Evaluate1()
    {
        // XPathNavigator.Evaluate(string)

        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        Double total = (double)navigator.Evaluate("sum(descendant::book/price)");
        Console.WriteLine($"Total price for all books: {total.ToString()}");
    }

    static void XPathNavigatorMethods_Evaluate2()
    {
        // XPathNavigator.Evaluate(XPathExpression)

        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XPathExpression query = navigator.Compile("sum(descendant::book/price)");

        Double total = (double)navigator.Evaluate(query);
        Console.WriteLine($"Total price for all books: {total.ToString()}");
    }

    static void XPathNavigatorMethods_Evaluate3()
    {
        // XPathNavigator.Evaluate(string, IXmlNamespaceResolver)

        XPathDocument document = new XPathDocument("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XmlNamespaceManager manager = new XmlNamespaceManager(navigator.NameTable);
        manager.AddNamespace("bk", "http://www.contoso.com/books");

        Double total = (double)navigator.Evaluate("sum(descendant::bk:book/bk:price)", manager);
        Console.WriteLine($"Total price for all books: {total.ToString()}");
    }

    static void XPathNavigatorMethods_Evaluate4()
    {
        // XPathNavigator.Evaluate(XPathExpression, XPathNodeIterator)

        XPathDocument document = new XPathDocument("books.xml");
        XPathNavigator navigator = document.CreateNavigator();

        XPathNodeIterator nodes = navigator.Select("//book");
        XPathExpression query = nodes.Current.Compile("sum(descendant::price)");

        Double total = (double)navigator.Evaluate(query, nodes);
        Console.WriteLine($"Total price for all books: {total.ToString()}");
    }

    static void XPathNavigatorMethods_InsertAfter1()
    {
        // XPathNavigator.InsertAfter()

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlWriter pages = navigator.InsertAfter();
        pages.WriteElementString("pages", "100");
        pages.Close();

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertAfter2()
    {
        // XPathNavigator.InsertAfter(string)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        navigator.InsertAfter("<pages>100</pages>");

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertAfter3()
    {
        // XPathNavigator.InsertAfter(XmlReader)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlReader pages = XmlReader.Create(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));

        navigator.InsertAfter(pages);

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertAfter4()
    {
        // XPathNavigator.InsertAfter(XPathNavigator)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlDocument childNodes = new XmlDocument();
        childNodes.Load(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));
        XPathNavigator childNodesNavigator = childNodes.CreateNavigator();

        navigator.InsertAfter(childNodesNavigator);

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertBefore1()
    {
        // XPathNavigator.InsertBefore()

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlWriter pages = navigator.InsertBefore();
        pages.WriteElementString("pages", "100");
        pages.Close();

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertBefore2()
    {
        // XPathNavigator.InsertBefore(string)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        navigator.InsertBefore("<pages>100</pages>");

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertBefore3()
    {
        // XPathNavigator.InsertBefore(XmlReader)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlReader pages = XmlReader.Create(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));

        navigator.InsertBefore(pages);

        navigator.MoveToParent();
        Console.WriteLine(navigator.OuterXml);
    }

    static void XPathNavigatorMethods_InsertBefore4()
    {
        // XPathNavigator.InsertBefore(XPathNavigator)

        XmlDocument document = new XmlDocument();
        document.Load("contosoBooks.xml");
        XPathNavigator navigator = document.CreateNavigator();

        navigator.MoveToChild("bookstore", "http://www.contoso.com/books");
        navigator.MoveToChild("book", "http://www.contoso.com/books");
        navigator.MoveToChild("price", "http://www.contoso.com/books");

        XmlDocument childNodes = new XmlDocument();
        childNodes.Load(new StringReader("<pages xmlns=\"http://www.contoso.com/books\">100</pages>"));
        XPathNavigator childNodesNavigator = childNodes.CreateNavigator();

        navigator.InsertBefore(childNodesNavigator);

        navigator.MoveToParent();
```
