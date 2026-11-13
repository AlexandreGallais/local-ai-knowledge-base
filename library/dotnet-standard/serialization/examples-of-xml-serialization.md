---
title: "Examples of XML Serialization (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/serialization/examples-of-xml-serialization.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Examples of XML Serialization

XML serialization can take more than one form, from simple to complex. For example, you can serialize a class that simply consists of public fields and properties, as shown in Introducing XML Serialization. The following code examples address various advanced scenarios, including how to use XML serialization to generate an XML stream that conforms to a specific XML Schema (XSD) document.

## Serializing a DataSet

Besides serializing an instance of a public class, you can also serialize an instance of a `System.Data.DataSet`, as shown in the following code example:

```vb
Private Sub SerializeDataSet(filename As String)
    Dim ser As XmlSerializer = new XmlSerializer(GetType(DataSet))
    ' Creates a DataSet; adds a table, column, and ten rows.
    Dim ds As DataSet = new DataSet("myDataSet")
    Dim t As DataTable = new DataTable("table1")
    Dim c As DataColumn = new DataColumn("thing")
    t.Columns.Add(c)
    ds.Tables.Add(t)
    Dim r As DataRow
    Dim i As Integer
    for i = 0 to 10
        r = t.NewRow()
        r(0) = "Thing " &  i
        t.Rows.Add(r)
    Next
    Dim writer As TextWriter = new StreamWriter(filename)
    ser.Serialize(writer, ds)
    writer.Close()
End Sub
```

```csharp
private void SerializeDataSet(string filename)
{
    XmlSerializer ser = new XmlSerializer(typeof(DataSet));

    // Creates a DataSet; adds a table, column, and ten rows.
    DataSet ds = new DataSet("myDataSet");
    DataTable t = new DataTable("table1");
    DataColumn c = new DataColumn("thing");
    t.Columns.Add(c);
    ds.Tables.Add(t);
    DataRow r;

    for (int i = 0; i < 10; i++) {
        r = t.NewRow();
        r[0] = "Thing " + i;
        t.Rows.Add(r);
    }

    TextWriter writer = new StreamWriter(filename);
    ser.Serialize(writer, ds);
    writer.Close();
}
```

## Serializing an XmlElement and XmlNode

You can also serialize instances of an `System.Xml.XmlElement` or `System.Xml.XmlNode` class, as shown in the following code example:

```vb
private Sub SerializeElement(filename As String)
    Dim ser As XmlSerializer = new XmlSerializer(GetType(XmlElement))
    Dim myElement As XmlElement = _
    new XmlDocument().CreateElement("MyElement", "ns")
    myElement.InnerText = "Hello World"
    Dim writer As TextWriter = new StreamWriter(filename)
    ser.Serialize(writer, myElement)
    writer.Close()
End Sub

Private Sub SerializeNode(filename As String)
    Dim ser As XmlSerializer = _
    new XmlSerializer(GetType(XmlNode))
    Dim myNode As XmlNode = new XmlDocument(). _
    CreateNode(XmlNodeType.Element, "MyNode", "ns")
    myNode.InnerText = "Hello Node"
    Dim writer As TextWriter = new StreamWriter(filename)
    ser.Serialize(writer, myNode)
    writer.Close()
End Sub
```

```csharp
private void SerializeElement(string filename)
{
    XmlSerializer ser = new XmlSerializer(typeof(XmlElement));
    XmlElement myElement = new XmlDocument().CreateElement("MyElement", "ns");
    myElement.InnerText = "Hello World";
    TextWriter writer = new StreamWriter(filename);
    ser.Serialize(writer, myElement);
    writer.Close();
}

private void SerializeNode(string filename)
{
    XmlSerializer ser = new XmlSerializer(typeof(XmlNode));
    XmlNode myNode = new XmlDocument().
    CreateNode(XmlNodeType.Element, "MyNode", "ns");
    myNode.InnerText = "Hello Node";
    TextWriter writer = new StreamWriter(filename);
    ser.Serialize(writer, myNode);
    writer.Close();
}
```

## Serializing a class that contains a field returning a complex object

If a property or field returns a complex object (such as an array or a class instance), the `System.Xml.Serialization.XmlSerializer` converts it to an element nested within the main XML document. For example, the first class in the following code example returns an instance of the second class:

```vb
Public Class PurchaseOrder
    Public MyAddress As Address
End Class

Public Class Address
    Public FirstName As String
End Class
```

```csharp
public class PurchaseOrder
{
    public Address MyAddress;
}

public record Address
{
    public string FirstName;
}
```

The serialized XML output might look like this:

```xml
<PurchaseOrder>
    <MyAddress>
        <FirstName>George</FirstName>
    </MyAddress>
</PurchaseOrder>
```

## Serializing an array of objects

You can also serialize a field that returns an array of objects, as shown in the following code example:

```vb
Public Class PurchaseOrder
    public ItemsOrders () As Item
End Class

Public Class Item
    Public ItemID As String
    Public ItemPrice As decimal
End Class
```

```csharp
public class PurchaseOrder
{
    public Item [] ItemsOrders;
}

public class Item
{
    public string ItemID;
    public decimal ItemPrice;
}
```

If two items are ordered, the serialized class instance might look like the following code:

```xml
<PurchaseOrder xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"  xmlns:xsd="http://www.w3.org/2001/XMLSchema">
    <ItemsOrders>
        <Item>
            <ItemID>aaa111</ItemID>
            <ItemPrice>34.22</ItemPrice>
        </Item>
        <Item>
            <ItemID>bbb222</ItemID>
            <ItemPrice>2.89</ItemPrice>
        </Item>
    </ItemsOrders>
</PurchaseOrder>
```

## Serializing a class that implements the ICollection interface

You can create your own collection classes by implementing the `System.Collections.ICollection` interface and using the `System.Xml.Serialization.XmlSerializer` to serialize instances of these classes.

> **Note:**
> When a class implements the `System.Collections.ICollection` interface, only the collection contained by the class is serialized. Any public properties or fields added to the class won't be serialized. To be serialized, the class must include an **Add** method and an **Item** property (C# indexer).

```vb
Imports System.Collections
Imports System.IO
Imports System.Xml.Serialization

Public Class Test
    Shared Sub Main()
        Dim t As Test= new Test()
        t.SerializeCollection("coll.xml")
    End Sub

    Private Sub SerializeCollection(filename As String)
        Dim Emps As Employees  = new Employees()
        ' Note that only the collection is serialized -- not the
        ' CollectionName or any other public property of the class.
        Emps.CollectionName = "Employees"
        Dim John100 As Employee = new Employee("John", "100xxx")
        Emps.Add(John100)
        Dim x As XmlSerializer = new XmlSerializer(GetType(Employees))
        Dim writer As TextWriter = new StreamWriter(filename)
        x.Serialize(writer, Emps)
        writer.Close()
    End Sub
End Class

Public Class Employees
    Implements ICollection
    Public CollectionName As String
    Private empArray As ArrayList = new ArrayList()

    Public ReadOnly Default Overloads _
    Property Item(index As Integer) As Employee
        get
        return CType (empArray(index), Employee)
        End Get
    End Property

    Public Sub CopyTo(a As Array, index As Integer) _
    Implements ICollection.CopyTo
        empArray.CopyTo(a, index)
    End Sub

    Public ReadOnly Property Count () As integer Implements _
    ICollection.Count
        get
            Count = empArray.Count
        End Get

    End Property

    Public ReadOnly Property SyncRoot ()As Object _
    Implements ICollection.SyncRoot
        get
        return me
        End Get
    End Property

    Public ReadOnly Property IsSynchronized () As Boolean _
    Implements ICollection.IsSynchronized
        get
        return false
        End Get
    End Property

    Public Function GetEnumerator() As IEnumerator _
    Implements IEnumerable.GetEnumerator

        return empArray.GetEnumerator()
    End Function

    Public Function Add(newEmployee As Employee) As Integer
        empArray.Add(newEmployee)
        return empArray.Count
    End Function
End Class

Public Class Employee
    Public EmpName As String
    Public EmpID As String

    Public Sub New ()
    End Sub

    Public Sub New (newName As String , newID As String )
        EmpName = newName
        EmpID = newID
    End Sub
End Class
```

```csharp
using System;
using System.Collections;
using System.IO;
using System.Xml.Serialization;

public class Test
{
    static void Main()
    {
        Test t = new Test();
        t.SerializeCollection("coll.xml");
    }

    private void SerializeCollection(string filename)
    {
        Employees Emps = new Employees();
        // Note that only the collection is serialized -- not the
        // CollectionName or any other public property of the class.
        Emps.CollectionName = "Employees";
        Employee John100 = new Employee("John", "100xxx");
        Emps.Add(John100);
        XmlSerializer x = new XmlSerializer(typeof(Employees));
        TextWriter writer = new StreamWriter(filename);
        x.Serialize(writer, Emps);
    }
}

public class Employees : ICollection
{
    public string CollectionName;
    private ArrayList empArray = new ArrayList();

    public Employee this[int index] => (Employee) empArray[index];

    public void CopyTo(Array a, int index)
    {
        empArray.CopyTo(a, index);
    }

    public int Count => empArray.Count;

    public object SyncRoot => this;

    public bool IsSynchronized => false;

    public IEnumerator GetEnumerator() => empArray.GetEnumerator();

    public void Add(Employee newEmployee)
    {
        empArray.Add(newEmployee);
    }
}

public class Employee
{
    public string EmpName;
    public string EmpID;

    public Employee() {}

    public Employee(string empName, string empID)
    {
        EmpName = empName;
        EmpID = empID;
    }
}
```
