---
title: "How to list all nodes in a tree - LINQ to XML (part 3 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/linq/list-all-nodes-tree.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to list all nodes in a tree - LINQ to XML (part 3 of 3)

```vb
Module Module1
<System.Runtime.CompilerServices.Extension()> _
    Private Function StrCat(Of T)(ByVal source As IEnumerable(Of T), _
                                  ByVal separator As String) As String
        Return _
        source.Aggregate(New StringBuilder(), _
            Function(sb, i) sb _
                .Append(i.ToString()) _
                .Append(separator), _
                Function(s) s.ToString())
    End Function

    <System.Runtime.CompilerServices.Extension()> _
    Public Function GetXPath(ByVal xobj As XObject) As String
        Dim retStr As String
        If xobj.Parent Is Nothing Then
            Dim doc As XDocument = TryCast(xobj, XDocument)
            If doc IsNot Nothing Then
                Return "."
            End If
            Dim el As XElement = TryCast(xobj, XElement)
            If el IsNot Nothing Then
                Return ("/" & NameWithPredicate(el))
            End If

            ' The XPath data model doesn't include white space text nodes
            ' that are children of a document, so this method returns null.
            Dim xt As XText = TryCast(xobj, XText)
            If xt IsNot Nothing Then
                Return Nothing
            End If
            Dim com As XComment = TryCast(xobj, XComment)
            If com IsNot Nothing Then
                If com.Document().Nodes().OfType(Of XComment)().Count() <> 1 Then
                    Return "/comment()[" & (com.NodesBeforeSelf().OfType _
                        (Of XComment)().Count() + 1) & "]"
                Else
                    Return "/comment()"
                End If
            End If

            Dim pi As XProcessingInstruction = TryCast(xobj, XProcessingInstruction)
            If pi IsNot Nothing Then
                If pi.Document.Nodes().OfType(Of XProcessingInstruction)(). _
                        Count() <> 1 Then
                    Return "/processing-instruction()[" & _
                        (pi.NodesBeforeSelf().OfType(Of XProcessingInstruction)() _
                        .Count() + 1) & "]"
                Else
                    Return "/processing-instruction()"
                End If
            End If
        Else
            Dim el As XElement = TryCast(xobj, XElement)
            If el IsNot Nothing Then
                Return "/" & el.Ancestors().InDocumentOrder(). _
                    Select(Function(e) NameWithPredicate(e)) _
                    .StrCat("/") & NameWithPredicate(el)
            End If

            Dim at As XAttribute = TryCast(xobj, XAttribute)
            If at IsNot Nothing Then
                Return "/" & at.Parent().AncestorsAndSelf().InDocumentOrder(). _
                    Select(Function(e) NameWithPredicate(e)).StrCat("/") & _
                    "@" & GetQName(at)
            End If

            Dim com As XComment = TryCast(xobj, XComment)
            If com IsNot Nothing Then
                retStr = "/" & com.Parent.AncestorsAndSelf().InDocumentOrder(). _
                Select(Function(e) NameWithPredicate(e)).StrCat("/") & "comment()"
                If com.Parent().Nodes().OfType(Of XComment)().Count() <> 1 Then
                    retStr &= "[" & (com.NodesBeforeSelf().OfType(Of XComment)().Count() + 1) & "]"
                End If
                Return retStr
            End If

            Dim cd As XCData = TryCast(xobj, XCData)
            If cd IsNot Nothing Then
                retStr = "/" & cd.Parent.AncestorsAndSelf().InDocumentOrder(). _
                    Select(Function(e) NameWithPredicate(e)).StrCat("/") & "text()"
                If cd.Parent.Nodes().OfType(Of XText)().Count() <> 1 Then
                    retStr &= "[" & (cd.NodesBeforeSelf().OfType(Of XText)(). _
                        Count() + 1) & "]"
                End If
                Return retStr
            End If

            Dim tx As XText = TryCast(xobj, XText)
            If tx IsNot Nothing Then
                retStr = "/" & tx.Parent.AncestorsAndSelf().InDocumentOrder(). _
                    Select(Function(e) NameWithPredicate(e)).StrCat("/") & "text()"
                If tx.Parent.Nodes().OfType(Of XText)().Count() <> 1 Then
                    retStr &= "[" & (tx.NodesBeforeSelf().OfType(Of XText)(). _
                        Count() + 1) & "]"
                End If
                Return retStr
            End If

            Dim pi As XProcessingInstruction = TryCast(xobj, XProcessingInstruction)
            If pi IsNot Nothing Then
                retStr = "/" & pi.Parent.AncestorsAndSelf().InDocumentOrder(). _
                    Select(Function(e) NameWithPredicate(e)). _
                    StrCat("/") & "processing-instruction()"
                If pi.Parent.Nodes().OfType(Of XProcessingInstruction)().Count() <> 1 Then
                    retStr &= "[" & (pi.NodesBeforeSelf().OfType(Of XProcessingInstruction)(). _
                        Count() + 1) & "]"
                End If
            End If
        End If
        Return Nothing
    End Function

    Private Function GetQName(ByVal xe As XElement) As String
        Dim prefix As String = xe.GetPrefixOfNamespace(xe.Name.Namespace)
        If xe.Name.Namespace = XNamespace.None Or prefix Is Nothing Then
            Return xe.Name.LocalName.ToString()
        Else
            Return prefix + ":" & xe.Name.LocalName.ToString()
        End If
    End Function

    Private Function GetQName(ByVal xa As XAttribute) As String
        Dim prefix As String = _
            xa.Parent.GetPrefixOfNamespace(xa.Name.Namespace)
        If xa.Name.Namespace = XNamespace.None Or prefix Is Nothing Then
            Return xa.Name.ToString()
        Else
            Return prefix + ":" & xa.Name.LocalName
        End If
    End Function

    Public Function NameWithPredicate(ByVal el As XElement) As String
        If el.Parent IsNot Nothing AndAlso el.Parent.Elements(el.Name).Count() <> 1 Then
            Return GetQName(el) + "[" & _
                (el.ElementsBeforeSelf(el.Name).Count() + 1) & "]"
        Else
            Return GetQName(el)
        End If
    End Function

    Sub Main()
        Dim aw As XNamespace = "http://www.adventure-works.com"
        Dim doc As XDocument = _
            <?xml version='1.0' encoding="utf-8" standalone='yes'?>
            <?target data?>
            <Root AttName='An Attribute' xmlns:aw='http://www.adventure-works.com'>
                <!--This is a comment-->
                <Child>Text</Child>
                <Child>Other Text</Child>
                <ChildWithMixedContent>text<b>BoldText</b>otherText</ChildWithMixedContent>
                <aw:ElementInNamespace>
                    <aw:ChildInNamespace/>
                </aw:ElementInNamespace>
            </Root>
        doc.Save("Test.xml")
        Console.WriteLine(File.ReadAllText("Test.xml"))
        Console.WriteLine("------")
        For Each obj As XObject In doc.DescendantNodes()
            Console.WriteLine(obj.GetXPath())
            Dim el As XElement = TryCast(obj, XElement)
            If el IsNot Nothing Then
                For Each at As XAttribute In el.Attributes()
                    Console.WriteLine(at.GetXPath())
                Next
            End If
        Next
    End Sub
End Module
```

This example produces the following output:

```output
<?xml version="1.0" encoding="utf-8" standalone="yes"?>
<?target data?>
<Root AttName="An Attribute" xmlns:aw="http://www.adventure-works.com">
  <!--This is a comment-->
  <Child>Text</Child>
  <Child>Other Text</Child>
  <ChildWithMixedContent>text<b>BoldText</b>otherText</ChildWithMixedContent>
  <aw:ElementInNamespace>
    <aw:ChildInNamespace />
  </aw:ElementInNamespace>
</Root>
------
/processing-instruction()
/Root
/Root/@AttName
/Root/@xmlns:aw
/Root/comment()
/Root/Child[1]
/Root/Child[1]/text()
/Root/Child[2]
/Root/Child[2]/text()
/Root/ChildWithMixedContent
/Root/ChildWithMixedContent/text()[1]
/Root/ChildWithMixedContent/b
/Root/ChildWithMixedContent/b/text()
/Root/ChildWithMixedContent/text()[2]
/Root/aw:ElementInNamespace
/Root/aw:ElementInNamespace/aw:ChildInNamespace
```
