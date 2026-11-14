---
title: "XObjectChange enum"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/XObjectChange.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# XObjectChange enum

Namespace: `System.Xml.Linq`

```csharp
public enum XObjectChange
```

Specifies the event type when an event is raised for an `XObject`.

#### Remarks
This `enum` specifies the event type when an event is raised for an `XObject`.

All operations that modify the XML tree break down to a series of primitives. There are four types of primitives. Two of the primitives (Add and Remove) act on collections. Two of them (Name and Value) act on instances. There is a corresponding event for each of these primitives.

You should be careful when modifying an XML tree within one of these events, because doing this might lead to unexpected results. For example, if you receive a `Changing` event, and while the event is being processed you remove the node from the tree, you might not receive the `Changed` event. When an event is being processed, it is valid to modify an XML tree other than the one that contains the node that is receiving the event; it is even valid to modify the same tree provided the modifications do not affect the specific nodes on which the event was raised. However, if you modify the area of the tree that contains the node receiving the event, the events that you receive and the impact to the tree are undefined.

#### Examples
The following example raises an event by adding an element to the tree.

```csharp
XElement root = new XElement("Root", "content");  
root.Changing += (sender, e) =>  
    {  
        Console.WriteLine("Changing event raised");  
        Console.WriteLine("  Sender: " + sender.GetType());  
        Console.WriteLine("  Changing: " + e.ObjectChange);  
    };  
root.Changed += (sender, e) =>  
    {  
        Console.WriteLine("Changed event raised");  
        Console.WriteLine("  Sender: " + sender.GetType());  
        Console.WriteLine("  Changed: " + e.ObjectChange);  
    };  
root.Add(new XElement("Child", "child content"));  
```  

This example produces the following output:

```
Changing event raised  
  Sender: System.Xml.Linq.XElement  
  Changing: Add  
Changed event raised  
  Sender: System.Xml.Linq.XElement  
  Changed: Add  
```  

The following example raises an event by removing an element from the tree.

```csharp
XElement root = new XElement("Root",  
    new XElement("Child", "content")  
);  
root.Changing += (sender, e) =>  
    {  
        Console.WriteLine("Changing event raised");  
        Console.WriteLine("  Sender: " + sender.GetType());  
        Console.WriteLine("  Changing: " + e.ObjectChange);  
    };  
root.Changed += (sender, e) =>  
    {  
        Console.WriteLine("Changed event raised");  
        Console.WriteLine("  Sender: " + sender.GetType());  
        Console.WriteLine("  Changed: " + e.ObjectChange);  
    };  
root.Element("Child").Remove();  
```  

This example produces the following output:

```
Changing event raised  
  Sender: System.Xml.Linq.XElement  
  Changing: Remove  
Changed event raised  
  Sender: System.Xml.Linq.XElement  
  Changed: Remove  
```  

The following example raises an event by changing the name of an element.

```csharp
XElement root = new XElement("Root", "content");  
root.Changing += (sender, e) =>  
    {  
        Console.WriteLine("Changing event raised");  
        Console.WriteLine("  Sender: " + sender.GetType());  
        Console.WriteLine("  Changing: " + e.ObjectChange);  
    };  
root.Changed += (sender, e) =>  
    {  
        Console.WriteLine("Changed event raised");  
        Console.WriteLine("  Sender: " + sender.GetType());  
        Console.WriteLine("  Changed: " + e.ObjectChange);  
    };  
root.Name = "NewName";  
```  

This example produces the following output:

```
Changing event raised  
  Sender: System.Xml.Linq.XElement  
  Changing: Name  
Changed event raised  
  Sender: System.Xml.Linq.XElement  
  Changed: Name  
```  

The following example raises an event by setting the value of an attribute.

```csharp
XElement root = new XElement("Root",  
    new XAttribute("Att", "att value")  
);  
root.Changing += (sender, e) =>  
    {  
        Console.WriteLine("Changing event raised");  
        Console.WriteLine("  Sender: " + sender.GetType());  
        Console.WriteLine("  Changing: " + e.ObjectChange);  
    };  
root.Changed += (sender, e) =>  
    {  
        Console.WriteLine("Changed event raised");  
        Console.WriteLine("  Sender: " + sender.GetType());  
        Console.WriteLine("  Changed: " + e.ObjectChange);  
    };  
root.FirstAttribute.Value = "new contents";  
```  

This example produces the following output:

```
Changing event raised  
  Sender: System.Xml.Linq.XAttribute  
  Changing: Value  
Changed event raised  
  Sender: System.Xml.Linq.XAttribute  
  Changed: Value  
```

## XObjectChange.Add field

```csharp
Add
```

An `XObject` has been or will be added to an `XContainer`.

## XObjectChange.Name field

```csharp
Name
```

An `XObject` has been or will be renamed.

## XObjectChange.Remove field

```csharp
Remove
```

An `XObject` has been or will be removed from an `XContainer`.

## XObjectChange.Value field

```csharp
Value
```

The value of an `XObject` has been or will be changed. In addition, a change in the serialization of an empty element (either from an empty tag to start/end tag pair or vice versa) raises this event.
