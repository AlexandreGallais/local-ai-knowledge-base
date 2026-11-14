---
title: "Editing XML Schemas (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/data/xml/editing-xml-schemas.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# Edit XML schemas

Editing an XML schema is one of the most important features of the Schema Object Model (SOM). All of the pre-schema-compilation properties of the SOM can be used to change the existing values in an XML schema. The XML schema can then be recompiled to reflect the changes.

The first step in editing a schema loaded into the SOM is to traverse the schema. You should be familiar with traversing a schema using the SOM API before you attempt to edit a schema. You should also be familiar with the pre- and post-schema-compilation properties of the Post-Schema-Compilation-Infoset (PSCI).
