---
title: "Extensions class (part 4 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/Extensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Extensions class (part 4 of 6)

## Extensions.Descendants<T>(IEnumerable<T>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Descendants<T> (this System.Collections.Generic.IEnumerable<T?> source) where T : System.Xml.Linq.XContainer;
```

Returns a collection of elements that contains the descendant elements of every element and document in the source collection.

Parameters:

- `T`: The type of the objects in `source`, constrained to `XContainer`.
- `source`: An `IEnumerable<T>` of `XContainer` that contains the source collection.

Returns: An `IEnumerable<T>` of `XElement` that contains the descendant elements of every element and document in the source collection.

#### Remarks
Visual Basic users can use the integrated XML descendant axis to retrieve the descendant elements of a collection. However, the integrated axis only retrieves descendants with a specified name. If Visual Basic users want to retrieve all descendants, then they must use this axis method explicitly.

This method uses deferred execution.

#### Examples
The following example retrieves a collection of elements, and then uses this axis method to retrieve all descendent elements of every item in the collection of elements.

```csharp
XElement xmlTree = XElement.Parse(
@"<Root>
    <Para>
        <t>This is some text </t>
        
            <t>where</t>
        
        <t> all of the nodes must be concatenated. </t>
    </Para>
    <Para>
        <t>This is a second sentence.</t>
    </Para>
</Root>");

IEnumerable<XElement> elList =
    from el in xmlTree.Elements("Para").Descendants()
    select el;

foreach (XElement el in elList)
    Console.WriteLine(el);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Para>
            <t>This is some text </t>
            
                <t>where</t>
            
            <t> all of the nodes must be concatenated. </t>
        </Para>

        <Para>
            <t>This is a second sentence.</t>
        </Para>
    </Root>

Dim elList = From el In xmlTree.<Para>.Descendants _
                        Select el

For Each el As XElement In elList
    Console.WriteLine(el)
Next
```

This example produces the following output:

```
<t>This is some text </t>

  <t>where</t>

<t>where</t>
<t> all of the nodes must be concatenated. </t>
<t>This is a second sentence.</t>
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = XElement.Parse(
@"<Root xmlns='http://www.adventure-works.com'>
    <Para>
        <t>This is some text </t>
        
            <t>where</t>
        
        <t> all of the nodes must be concatenated. </t>
    </Para>
    <Para>
        <t>This is a second sentence.</t>
    </Para>
</Root>");

IEnumerable<XElement> elList =
    from el in xmlTree.Elements(aw + "Para").Descendants()
    select el;

foreach (XElement el in elList)
    Console.WriteLine(el);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
            <Root>
                <Para>
                    <t>This is some text </t>
                    
                        <t>where</t>
                    
                    <t> all of the nodes must be concatenated. </t>
                </Para>

                <Para>
                    <t>This is a second sentence.</t>
                </Para>
            </Root>

        Dim elList = From el In xmlTree.<Para>.Descendants _
                                Select el

        For Each el As XElement In elList
            Console.WriteLine(el)
        Next
    End Sub
End Module

```

This example produces the following output:

```
<t xmlns="http://www.adventure-works.com">This is some text </t>

  <t>where</t>

<t xmlns="http://www.adventure-works.com">where</t>
<t xmlns="http://www.adventure-works.com"> all of the nodes must be concatenated. </t>
<t xmlns="http://www.adventure-works.com">This is a second sentence.</t>
```

## Extensions.Descendants<T>(IEnumerable<T>, XName) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> Descendants<T> (this System.Collections.Generic.IEnumerable<T?> source, System.Xml.Linq.XName? name) where T : System.Xml.Linq.XContainer;
```

Returns a filtered collection of elements that contains the descendant elements of every element and document in the source collection. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `T`: The type of the objects in `source`, constrained to `XContainer`.
- `source`: An `IEnumerable<T>` of `XContainer` that contains the source collection.
- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` that contains the descendant elements of every element and document in the source collection. Only elements that have a matching `XName` are included in the collection.

#### Remarks
Visual Basic users can use the Language-Integrated Axes in Visual Basic (LINQ to XML) instead of using this axis method explicitly.

This method uses deferred execution.

#### Examples
The following example retrieves a collection of two elements, and then retrieves a collection of all descendants of the two elements that have the specified element name.

```csharp
XElement xmlTree = XElement.Parse(
@"<Root>
    <Para>
        <t>This is some text </t>
        
            <t>where</t>
        
        <t> all of the text nodes must be concatenated. </t>
    </Para>
    <Para>
        <t>This is a second sentence.</t>
    </Para>
</Root>");

string str =
    (from el in xmlTree.Elements("Para").Descendants("t")
    select (string)el)
    .Aggregate(new StringBuilder(),
        (sb, i) => sb.Append(i),
        sb => sb.ToString());

Console.WriteLine(str);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Para>
            <t>This is some text </t>
            
                <t>where</t>
            
            <t> all of the text nodes must be concatenated. </t>
        </Para>
        <Para>
            <t>This is a second sentence.</t>
        </Para>
    </Root>

Dim str As String = _
    ( _
        From el In xmlTree.<Para>...<t> _
        Select CStr(el) _
    ) _
    .Aggregate(New StringBuilder(), _
               Function(ByVal sb, ByVal i) sb.Append(i), _
               Function(ByVal sb) sb.ToString())

Console.WriteLine(str)
```

This example produces the following output:

```
This is some text where all of the text nodes must be concatenated. This is a second sentence.
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = XElement.Parse(
@"<Root xmlns='http://www.adventure-works.com'>
    <Para>
        <t>This is some text </t>
        
            <t>where</t>
        
        <t> all of the text nodes must be concatenated. </t>
    </Para>
    <Para>
        <t>This is a second sentence.</t>
    </Para>
</Root>");

string str =
    (from el in xmlTree.Elements(aw + "Para").Descendants(aw + "t")
     select (string)el)
    .Aggregate(new StringBuilder(),
        (sb, i) => sb.Append(i),
        sb => sb.ToString());

Console.WriteLine(str);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
            <Root>
                <Para>
                    <t>This is some text </t>
                    
                        <t>where</t>
                    
                    <t> all of the text nodes must be concatenated. </t>
                </Para>
                <Para>
                    <t>This is a second sentence.</t>
                </Para>
            </Root>

        Dim str As String = _
            ( _
                From el In xmlTree.<Para>...<t> _
                Select CStr(el) _
            ) _
            .Aggregate(New StringBuilder(), _
                       Function(sb, i) sb.Append(i), _
                       Function(sb) sb.ToString())

        Console.WriteLine(str)
    End Sub
End Module
```

This example produces the following output:

```
This is some text where all of the text nodes must be concatenated. This is a second sentence.
```

## Extensions.DescendantsAndSelf(XElement>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> DescendantsAndSelf (this System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement?> source);
```

Returns a collection of elements that contains every element in the source collection, and the descendent elements of every element in the source collection.

Parameters:

- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.

Returns: An `IEnumerable<T>` of `XElement` that contains every element in the source collection, and the descendent elements of every element in the source collection.

#### Remarks
Although Visual Basic has an integrated XML axis for descendant elements, there is no integrated axis that has the semantics of this method, so Visual Basic users must use this axis method explicitly.

This method uses deferred execution.

## Extensions.DescendantsAndSelf(XElement>, XName) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> DescendantsAndSelf (this System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement?> source, System.Xml.Linq.XName? name);
```

Returns a filtered collection of elements that contains every element in the source collection, and the descendents of every element in the source collection. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.
- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` that contains every element in the source collection, and the descendents of every element in the source collection. Only elements that have a matching `XName` are included in the collection.

#### Remarks
Although Visual Basic has an integrated XML axis for descendant elements, there is no integrated axis that has the semantics of this method, so Visual Basic users must use this axis method explicitly.

This method uses deferred execution.
