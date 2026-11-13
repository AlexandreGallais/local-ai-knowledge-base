---
title: "Breaking change: XNodeReader.GetAttribute and invalid indices"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/core-libraries/6.0/xnodereader-getattribute.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XNodeReader.GetAttribute behavior for invalid index

`XNodeReader` is an internal class, but it's accessible through the `System.Xml.XmlReader` class if you call `System.Xml.Linq.XNode.CreateReader*`. All `System.Xml.XmlReader` implementations except `XNodeReader` threw an `System.ArgumentOutOfRangeException` for an invalid index in the `System.Xml.XmlReader.GetAttribute(System.Int32)` method. With this change, `XNodeReader.GetAttribute(int)` now also throws an `System.ArgumentOutOfRangeException` for an invalid index.

## Old behavior

`XNodeReader.GetAttribute(int)` returned `null` if the index was invalid.

## New behavior

`XNodeReader.GetAttribute(int)` throws an `System.ArgumentOutOfRangeException` if the index is invalid.

## Version introduced

.NET 6

## Type of breaking change

This change can affect source compatibility.

## Reason for change

`XmlReader.GetAttribute(int)` is well documented, and `XNodeReader` was not behaving as documented. It's behavior for invalid indices was also inconsistent with other `System.Xml.XmlReader` implementations.

## Recommended action

To avoid an invalid index:

- Call `System.Xml.XmlReader.AttributeCount` to retrieve the number of attributes in the current node.
- Then, pass a value of range `0..XmlReader.AttributeCount-1` to `System.Xml.XmlReader.GetAttribute(System.Int32)`.

## Affected APIs

- `System.Xml.XmlReader.GetAttribute(System.Int32)`
