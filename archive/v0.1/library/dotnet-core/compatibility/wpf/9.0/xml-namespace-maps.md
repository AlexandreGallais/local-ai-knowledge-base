---
title: "Breaking change: 'GetXmlNamespaceMaps' type change"
tool: "dotnet-core"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/core/compatibility/wpf/9.0/xml-namespace-maps.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# `GetXmlNamespaceMaps` type change

The backing property of `System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps` has been changed from `System.String` to `System.Collections.Hashtable`.

## Version introduced

.NET 9 Preview 3

## Previous behavior

Previously, the backing property of `System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps` was `System.String`. However, the value returned by `dependencyObject.GetValue(XmlNamespaceMapsProperty)` is of type `System.Collections.Hashtable` and the `System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject)` implementation tried to type cast it to `System.String`, which resulted in an `System.InvalidCastException`.

In addition, the `System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps(System.Windows.DependencyObject,System.String)` method accepted a `System.String` argument.

## New behavior

Starting in .NET 9, the backing property of `System.Windows.Markup.XmlAttributeProperties.XmlNamespaceMaps` is `System.Collections.Hashtable`, and the `System.InvalidCastException` is no longer thrown by `System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject)`.

In addition, the `System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps(System.Windows.DependencyObject,System.Collections.Hashtable)` method now accepts a `System.Collections.Hashtable` argument.

## Change category

This change is a *behavioral change* and can also affect *source compatibility*.

## Reason for change

This change was made to prevent the `System.InvalidCastException` from being thrown.

## Recommended action

Pass `Hashtable` instead of a string to the `System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps*` API.

## Affected APIs

- `System.Windows.Markup.XmlAttributeProperties.GetXmlNamespaceMaps(System.Windows.DependencyObject)`
- `System.Windows.Markup.XmlAttributeProperties.SetXmlNamespaceMaps*`
