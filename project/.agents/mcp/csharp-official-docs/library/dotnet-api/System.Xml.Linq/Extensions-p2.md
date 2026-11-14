---
title: "Extensions class (part 2 of 6)"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/System.Xml.Linq/Extensions.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# Extensions class (part 2 of 6)

## Extensions.AncestorsAndSelf(XElement>) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> AncestorsAndSelf (this System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement?> source);
```

Returns a collection of elements that contains every element in the source collection, and the ancestors of every element in the source collection.

Parameters:

- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.

Returns: An `IEnumerable<T>` of `XElement` that contains every element in the source collection, and the ancestors of every element in the source collection.

#### Remarks
If multiple nodes in the source collection have the same ancestor, the ancestor will be included multiple times in the result collection. To avoid this, use the `Enumerable.Distinct` method.

This method uses deferred execution.

#### Examples
The following example retrieves a collection of the great grandchildren elements. It then uses this axis method to retrieve all ancestors and self of all elements in the collection.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1",
        new XElement("GrandChild1",
            new XElement("GreatGrandChild1", "content")
        )
    ),
    new XElement("Child2",
        new XElement("GrandChild2",
            new XElement("GreatGrandChild2", "content")
        )
    )
);
IEnumerable<XElement> greatGrandChildren =
    from el in xmlTree.Descendants()
    where el.Name.LocalName.StartsWith("Great")
    select el;

Console.WriteLine("Great Grand Children Elements");
Console.WriteLine("----");
foreach (XElement de in greatGrandChildren)
    Console.WriteLine(de.Name);

IEnumerable<XElement> allAncestors =
    from el in greatGrandChildren.AncestorsAndSelf().Distinct()
    select el;

Console.WriteLine("");
Console.WriteLine("Ancestors and Self");
Console.WriteLine("----");
foreach (XElement de in allAncestors)
    Console.WriteLine(de.Name);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Child1>
            <GrandChild1>
                <GreatGrandChild1>content</GreatGrandChild1>
            </GrandChild1>
        </Child1>
        <Child2>
            <GrandChild2>
                <GreatGrandChild2>content</GreatGrandChild2>
            </GrandChild2>
        </Child2>
    </Root>

Dim greatGrandChildren = From el In xmlTree.Descendants _
                         Where el.Name.LocalName.StartsWith("Great") _
                         Select el

Console.WriteLine("Great Grand Children Elements")
Console.WriteLine("----")

For Each de As XElement In greatGrandChildren
    Console.WriteLine(de.Name)
Next

Dim allAncestors = From el In greatGrandChildren.AncestorsAndSelf.Distinct _
                   Select el

Console.WriteLine("")
Console.WriteLine("Ancestors and Self")
Console.WriteLine("----")

For Each de As XElement In allAncestors
    Console.WriteLine(de.Name)
Next

```

This example produces the following output:

```
Great Grand Children Elements
----
GreatGrandChild1
GreatGrandChild2

Ancestors and Self
----
GreatGrandChild1
GrandChild1
Child1
Root
GreatGrandChild2
GrandChild2
Child2
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XElement(aw + "Child1",
        new XElement(aw + "GrandChild1",
            new XElement(aw + "GreatGrandChild1", "content")
        )
    ),
    new XElement(aw + "Child2",
        new XElement(aw + "GrandChild2",
            new XElement(aw + "GreatGrandChild2", "content")
        )
    )
);
IEnumerable<XElement> greatGrandChildren =
    from el in xmlTree.Descendants()
    where el.Name.LocalName.StartsWith("Great")
    select el;

Console.WriteLine("Great Grand Children Elements");
Console.WriteLine("----");
foreach (XElement de in greatGrandChildren)
    Console.WriteLine(de.Name);

IEnumerable<XElement> allAncestors =
    from el in greatGrandChildren.AncestorsAndSelf().Distinct()
    select el;

Console.WriteLine("");
Console.WriteLine("Ancestors and Self");
Console.WriteLine("----");
foreach (XElement de in allAncestors)
    Console.WriteLine(de.Name);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
            <Root>
                <Child1>
                    <GrandChild1>
                        <GreatGrandChild1>content</GreatGrandChild1>
                    </GrandChild1>
                </Child1>
                <Child2>
                    <GrandChild2>
                        <GreatGrandChild2>content</GreatGrandChild2>
                    </GrandChild2>
                </Child2>
            </Root>

        Dim greatGrandChildren = From el In xmlTree.Descendants _
                                 Where el.Name.LocalName.StartsWith("Great") _
                                 Select el

        Console.WriteLine("Great Grand Children Elements")
        Console.WriteLine("----")

        For Each de As XElement In greatGrandChildren
            Console.WriteLine(de.Name)
        Next

        Dim allAncestors = From el In greatGrandChildren.AncestorsAndSelf.Distinct _
                           Select el

        Console.WriteLine("")
        Console.WriteLine("Ancestors and Self")
        Console.WriteLine("----")

        For Each de As XElement In allAncestors
            Console.WriteLine(de.Name)
        Next
    End Sub
End Module

```

This example produces the following output:

```
Great Grand Children Elements
----
{http://www.adventure-works.com}GreatGrandChild1
{http://www.adventure-works.com}GreatGrandChild2

Ancestors and Self
----
{http://www.adventure-works.com}GreatGrandChild1
{http://www.adventure-works.com}GrandChild1
{http://www.adventure-works.com}Child1
{http://www.adventure-works.com}Root
{http://www.adventure-works.com}GreatGrandChild2
{http://www.adventure-works.com}GrandChild2
{http://www.adventure-works.com}Child2
```

## Extensions.AncestorsAndSelf(XElement>, XName) method

```csharp
public static System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement> AncestorsAndSelf (this System.Collections.Generic.IEnumerable<System.Xml.Linq.XElement?> source, System.Xml.Linq.XName? name);
```

Returns a filtered collection of elements that contains every element in the source collection, and the ancestors of every element in the source collection. Only elements that have a matching `XName` are included in the collection.

Parameters:

- `source`: An `IEnumerable<T>` of `XElement` that contains the source collection.
- `name`: The `XName` to match.

Returns: An `IEnumerable<T>` of `XElement` that contains every element in the source collection, and the ancestors of every element in the source collection. Only elements that have a matching `XName` are included in the collection.

#### Remarks
If multiple nodes in the source collection have the same ancestor with a matching `XName`, the ancestor will be included multiple times in the result collection.

This method uses deferred execution.

#### Examples
The following example retrieves a collection of the great grandchildren elements. It then uses this axis method to retrieve all self and ancestors of all elements in the collection that match a specified `XName`.

```csharp
XElement xmlTree = new XElement("Root",
    new XElement("Child1",
        new XElement("GrandChild1",
            new XElement("GreatGrandChild1", "content")
        )
    ),
    new XElement("Child2",
        new XElement("GrandChild2",
            new XElement("GreatGrandChild2", "content")
        )
    )
);
IEnumerable<XElement> greatGrandChildren =
    from el in xmlTree.Descendants()
    where el.Name.LocalName.StartsWith("Great")
    select el;

Console.WriteLine("Great Grand Children Elements");
Console.WriteLine("----");
foreach (XElement de in greatGrandChildren)
    Console.WriteLine(de.Name);

IEnumerable<XElement> allAncestors =
    from el in greatGrandChildren.AncestorsAndSelf("GreatGrandChild1")
    select el;

Console.WriteLine("");
Console.WriteLine("Ancestors and Self");
Console.WriteLine("----");
foreach (XElement de in allAncestors)
    Console.WriteLine(de.Name);
```

```vb
Dim xmlTree As XElement = _
    <Root>
        <Child1>
            <GrandChild1>
                <GreatGrandChild1>content</GreatGrandChild1>
            </GrandChild1>
        </Child1>
        <Child2>
            <GrandChild2>
                <GreatGrandChild2>content</GreatGrandChild2>
            </GrandChild2>
        </Child2>
    </Root>

Dim greatGrandChildren = From el In xmlTree.Descendants _
                         Where el.Name.LocalName.StartsWith("Great") _
                         Select el

Console.WriteLine("Great Grand Children Elements")
Console.WriteLine("----")

For Each de As XElement In greatGrandChildren
    Console.WriteLine(de.Name)
Next

Dim allAncestors = From el In greatGrandChildren.AncestorsAndSelf("GreatGrandChild1") _
                   Select el

Console.WriteLine("")
Console.WriteLine("Ancestors and Self")
Console.WriteLine("----")

For Each de As XElement In allAncestors
    Console.WriteLine(de.Name)
Next

```

This example produces the following output:

```
Great Grand Children Elements
----
GreatGrandChild1
GreatGrandChild2

Ancestors and Self
----
GreatGrandChild1
```

The following is the same example, but in this case the XML is in a namespace. For more information, see Work with XML Namespaces.

```csharp
XNamespace aw = "http://www.adventure-works.com";
XElement xmlTree = new XElement(aw + "Root",
    new XElement(aw + "Child1",
        new XElement(aw + "GrandChild1",
            new XElement(aw + "GreatGrandChild1", "content")
        )
    ),
    new XElement(aw + "Child2",
        new XElement(aw + "GrandChild2",
            new XElement(aw + "GreatGrandChild2", "content")
        )
    )
);
IEnumerable<XElement> greatGrandChildren =
    from el in xmlTree.Descendants()
    where el.Name.LocalName.StartsWith("Great")
    select el;

Console.WriteLine("Great Grand Children Elements");
Console.WriteLine("----");
foreach (XElement de in greatGrandChildren)
    Console.WriteLine(de.Name);

IEnumerable<XElement> allAncestors =
    from el in greatGrandChildren.AncestorsAndSelf(aw + "GreatGrandChild1")
    select el;

Console.WriteLine("");
Console.WriteLine("Ancestors and Self");
Console.WriteLine("----");
foreach (XElement de in allAncestors)
    Console.WriteLine(de.Name);
```

```vb
Imports <xmlns="http://www.adventure-works.com">

Module Module1
    Sub Main()
        Dim xmlTree As XElement = _
            <Root>
                <Child1>
                    <GrandChild1>
                        <GreatGrandChild1>content</GreatGrandChild1>
                    </GrandChild1>
                </Child1>
                <Child2>
                    <GrandChild2>
                        <GreatGrandChild2>content</GreatGrandChild2>
                    </GrandChild2>
                </Child2>
            </Root>

        Dim greatGrandChildren = From el In xmlTree.Descendants _
                                 Where el.Name.LocalName.StartsWith("Great") _
                                 Select el

        Console.WriteLine("Great Grand Children Elements")
        Console.WriteLine("----")

        For Each de As XElement In greatGrandChildren
            Console.WriteLine(de.Name)
        Next

        Dim allAncestors = From el In greatGrandChildren.AncestorsAndSelf(GetXmlNamespace() + "GreatGrandChild1") _
                           Select el

        Console.WriteLine("")
        Console.WriteLine("Ancestors and Self")
        Console.WriteLine("----")

        For Each de As XElement In allAncestors
            Console.WriteLine(de.Name)
        Next
    End Sub
End Module

```

This example produces the following output:

```
Great Grand Children Elements
----
{http://www.adventure-works.com}GreatGrandChild1
{http://www.adventure-works.com}GreatGrandChild2

Ancestors and Self
----
{http://www.adventure-works.com}GreatGrandChild1
```
