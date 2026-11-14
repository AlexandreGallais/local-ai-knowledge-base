---
title: "Breaking change: TreeNodeCollection.Item(Int32) throws ArgumentException for in-use node"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/core/compatibility/windows-forms/6.0/treenodecollection-item-throws-argumentexception.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# TreeNodeCollection.Item throws exception if node is assigned elsewhere

`System.Windows.Forms.TreeNodeCollection.Item(System.Int32)` throws an `System.ArgumentException` if the node being assigned is already bound to another `System.Windows.Forms.TreeView` or to this `System.Windows.Forms.TreeView` at a different index.

## Change description

In previous .NET versions, you can assign a tree node to a collection even if it's already bound to a `System.Windows.Forms.TreeView`. This can lead to duplicated nodes. Starting in .NET 6, `System.Windows.Forms.TreeNodeCollection.Item(System.Int32)` throws an `System.ArgumentException` if the node being assigned is already bound to another `System.Windows.Forms.TreeView` or to this `System.Windows.Forms.TreeView` at a different index.

## Change category

This change affects binary compatibility.

## Reason for change

Validating the input parameter is consistent with the behavior of other `TreeNodeCollection` APIs.

## Version introduced

.NET 6

## Recommended action

Make sure to unbind a `TreeNode` before assigning it to the collection.

## Affected APIs

`System.Windows.Forms.TreeNodeCollection.Item(System.Int32)`
