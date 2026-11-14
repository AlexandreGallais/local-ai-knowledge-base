---
title: "XObject class (part 4 of 4)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XObject.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XObject class (part 4 of 4)

## XObject.Changed event

```csharp
public event EventHandler<System.Xml.Linq.XObjectChangeEventArgs> Changed;
```

Raised when this `XObject` or any of its descendants have changed.

#### Remarks
Events are raised only when an XML tree is modified, not when it is constructed. This is because you have to add an event handler to an event before you can receive events, and you cannot add an event handler before you have a reference to an `XObject`. You cannot get a reference to an `XObject` before the XML tree is constructed. This means that during functional construction of an XML tree, you will not receive events.

You should be careful when modifying an XML tree within one of these events, because doing this might lead to unexpected results. For example, if you receive a `Changing` event, and while the event is being processed you remove the node from the tree, you might not receive the `Changed` event. When an event is being processed, it is valid to modify an XML tree other than the one that contains the node that is receiving the event; it is even valid to modify the same tree provided the modifications do not affect the specific nodes on which the event was raised. However, if you modify the area of the tree that contains the node receiving the event, the events that you receive and the impact to the tree are undefined.

#### Examples
The following example adds an event handler to the root element of an XML tree. It then modifies the tree, causing LINQ to XML to raise some events.

```csharp
XElement root = new XElement("Root", "content");
root.Changing += new EventHandler<XObjectChangeEventArgs>(
    (sender, cea) =>
    {
        Console.WriteLine("Changing event raised");
        XElement xSender = (XElement)sender;
        Console.WriteLine("  Sender: {0}", xSender.Name);
        Console.WriteLine("  ObjectChange: {0}", cea.ObjectChange);
    }
);
root.Changed += new EventHandler<XObjectChangeEventArgs>(
    (sender, cea) =>
    {
        Console.WriteLine("Changed event raised");
        XElement xSender = (XElement)sender;
        Console.WriteLine("  Sender: {0}", xSender.Name);
        Console.WriteLine("  ObjectChange: {0}", cea.ObjectChange);
    }
);
root.Add(new XElement("Child", "child content"));
```

```vb
Module Module1
    WithEvents root As XElement = <Root>content</Root>

    Sub Main()
        root.Add(<Child>child content</Child>)
    End Sub

    Private Sub root_Changing( _
            ByVal sender As Object, _
            ByVal e As XObjectChangeEventArgs) _
            Handles root.Changing
        Dim xSender As XElement = DirectCast(sender, XElement)
        Console.WriteLine("Changing event raised")
        Console.WriteLine("  Sender: {0}", xSender.Name)
        Console.WriteLine("  ObjectChange: {0}", e.ObjectChange)
    End Sub

    Private Sub root_Changed( _
            ByVal sender As Object, _
            ByVal e As XObjectChangeEventArgs) _
            Handles root.Changed
        Dim xSender As XElement = DirectCast(sender, XElement)
        Console.WriteLine("Changed event raised")
        Console.WriteLine("  Sender: {0}", xSender.Name)
        Console.WriteLine("  ObjectChange: {0}", e.ObjectChange)
    End Sub
End Module
```

This example produces the following output:

```
Changing event raised
  Sender: Child
  ObjectChange: Add
Changed event raised
  Sender: Child
  ObjectChange: Add
```

Events are useful when you want to maintain some aggregate information in an XML tree. For example, you may want maintain an invoice total that is the sum of the line items of the invoice. This example uses events to maintain the total of all of the child elements under the complex element `Items`.

```csharp
XElement root = new XElement("Root",
    new XElement("Total", 0),
    new XElement("Items")
);
XElement total = root.Element("Total");
XElement items = root.Element("Items");
items.Changed += (object sender, XObjectChangeEventArgs cea) =>
{
    switch (cea.ObjectChange)
    {
        case XObjectChange.Add:
            if (sender is XElement)
                total.Value = ((int)total + (int)(XElement)sender).ToString();
            if (sender is XText)
                total.Value = ((int)total + (int)((XText)sender).Parent).ToString();
            break;
        case XObjectChange.Remove:
            if (sender is XElement)
                total.Value = ((int)total - (int)(XElement)sender).ToString();
            if (sender is XText)
                total.Value = ((int)total - Int32.Parse(((XText)sender).Value)).ToString();
            break;
    }
    Console.WriteLine("Changed {0} {1}", sender.GetType().ToString(), cea.ObjectChange.ToString());
};
items.SetElementValue("Item1", 25);
items.SetElementValue("Item2", 50);
items.SetElementValue("Item2", 75);
items.SetElementValue("Item3", 133);
items.SetElementValue("Item1", null);
items.SetElementValue("Item4", 100);
Console.WriteLine("Total:{0}", (int)total);
Console.WriteLine(root);
```

```vb
Module Module1
    Private total As XElement = Nothing
    Private WithEvents items As XElement = Nothing
    Private root As XElement = _
            <Root>
                <Total>0</Total>
                <Items></Items>
            </Root>

    Sub Main()
        total = root.<Total>(0)
        items = root.<Items>(0)
        items.SetElementValue("Item1", 25)
        items.SetElementValue("Item2", 50)
        items.SetElementValue("Item2", 75)
        items.SetElementValue("Item3", 133)
        items.SetElementValue("Item1", Nothing)
        items.SetElementValue("Item4", 100)
        Console.WriteLine("Total:{0}", CInt(total))
        Console.WriteLine(root)
    End Sub

    Private Sub XObjectChanged( _
            ByVal sender As Object, _
            ByVal cea As XObjectChangeEventArgs) _
            Handles items.Changed
        Select Case cea.ObjectChange
            Case XObjectChange.Add
                If sender.GetType() Is GetType(XElement) Then
                    total.Value = CStr(CInt(total.Value) + _
                            CInt((DirectCast(sender, XElement)).Value))
                End If
                If sender.GetType() Is GetType(XText) Then
                    total.Value = CStr(CInt(total.Value) + _
                            CInt((DirectCast(sender, XText)).Value))
                End If
            Case XObjectChange.Remove
                If sender.GetType() Is GetType(XElement) Then
                    total.Value = CStr(CInt(total.Value) - _
                            CInt((DirectCast(sender, XElement)).Value))
                End If
                If sender.GetType() Is GetType(XText) Then
                    total.Value = CStr(CInt(total.Value) - _
                            CInt((DirectCast(sender, XText)).Value))
                End If
        End Select
        Console.WriteLine("Changed {0} {1}", _
                            sender.GetType().ToString(), _
                            cea.ObjectChange.ToString())
    End Sub
End Module
```

This code produces the following output:

```
Changed System.Xml.Linq.XElement Add
Changed System.Xml.Linq.XElement Add
Changed System.Xml.Linq.XText Remove
Changed System.Xml.Linq.XText Add
Changed System.Xml.Linq.XElement Add
Changed System.Xml.Linq.XElement Remove
Changed System.Xml.Linq.XElement Add
Total:308
<Root>
  <Total>308</Total>
  <Items>
    <Item2>75</Item2>
    <Item3>133</Item3>
    <Item4>100</Item4>
  </Items>
</Root>
```

## XObject.Changing event

```csharp
public event EventHandler<System.Xml.Linq.XObjectChangeEventArgs> Changing;
```

Raised when this `XObject` or any of its descendants are about to change.

#### Remarks
Events are raised only from modification of an XML tree, not from construction of an XML tree. You have to add an event handler to an event before you can receive events, and you can't add an event handler before you have a reference to an `XObject`. You can't get a reference to an `XObject` before the XML tree is constructed. This means that during functional construction of an XML tree, you will not receive events.

You should be careful when modifying an XML tree within one of these events, because doing this might lead to unexpected results. For example, if you receive a `Changing` event, and while the event is being processed you remove the node from the tree, you might not receive the `Changed` event. When an event is being processed, it is valid to modify an XML tree other than the one that contains the node that is receiving the event; it is even valid to modify the same tree provided the modifications do not affect the specific nodes on which the event was raised. However, if you modify the area of the tree that contains the node receiving the event, the events that you receive and the impact to the tree are undefined.

#### Examples
The following example adds an event handler to the root element of an XML tree. It then modifies the tree, causing LINQ to XML to raise some events.

```csharp
XElement root = new XElement("Root", "content");
root.Changing += new EventHandler<XObjectChangeEventArgs>(
    (sender, cea) =>
    {
        Console.WriteLine("Changing event raised");
        XElement xSender = (XElement)sender;
        Console.WriteLine("  Sender: {0}", xSender.Name);
        Console.WriteLine("  ObjectChange: {0}", cea.ObjectChange);
    }
);
root.Changed += new EventHandler<XObjectChangeEventArgs>(
    (sender, cea) =>
    {
        Console.WriteLine("Changed event raised");
        XElement xSender = (XElement)sender;
        Console.WriteLine("  Sender: {0}", xSender.Name);
        Console.WriteLine("  ObjectChange: {0}", cea.ObjectChange);
    }
);
root.Add(new XElement("Child", "child content"));
```

```vb
Module Module1
    WithEvents root As XElement = <Root>content</Root>

    Sub Main()
        root.Add(<Child>child content</Child>)
    End Sub

    Private Sub root_Changing( _
            ByVal sender As Object, _
            ByVal e As XObjectChangeEventArgs) _
            Handles root.Changing
        Dim xSender As XElement = CType(sender, XElement)
        Console.WriteLine("Changing event raised")
        Console.WriteLine("  Sender: {0}", xSender.Name)
        Console.WriteLine("  ObjectChange: {0}", e.ObjectChange)
    End Sub

    Private Sub root_Changed( _
            ByVal sender As Object, _
            ByVal e As XObjectChangeEventArgs) _
            Handles root.Changed
        Dim xSender As XElement = CType(sender, XElement)
        Console.WriteLine("Changed event raised")
        Console.WriteLine("  Sender: {0}", xSender.Name)
        Console.WriteLine("  ObjectChange: {0}", e.ObjectChange)
    End Sub
End Module
```

This example produces the following output:

```
Changing event raised
  Sender: Child
  ObjectChange: Add
Changed event raised
  Sender: Child
  ObjectChange: Add
```
