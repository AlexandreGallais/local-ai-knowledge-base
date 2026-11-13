---
title: "How to: Migrate Your XslTransform Code (part 1 of 13)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/how-to-migrate-your-xsltransform-code.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Migrate Your XslTransform Code

The `System.Xml.Xsl.XslCompiledTransform` class replaced the `System.Xml.Xsl.XslTransform` class. This newer class was designed to be very similar to `System.Xml.Xsl.XslTransform`. Style sheets are compiled using the `System.Xml.Xsl.XslCompiledTransform.Load*` method. Transforms are executed using the `System.Xml.Xsl.XslCompiledTransform.Transform*` method.

The following procedures show common XSLT tasks, and compare the code using the `System.Xml.Xsl.XslTransform` class versus the `System.Xml.Xsl.XslCompiledTransform` class.
