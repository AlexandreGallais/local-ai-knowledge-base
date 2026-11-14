---
title: "INX extension descriptor format (part 2 of 2)"
tool: "inkscape-extensions-guide"
version: "1.4.1"
source: "https://gitlab.com/inkscape/extensions/blob/2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892/docs/authors/inx-overview.rst"
commit: "2044255c7a79a0d0b5fb20cb8b0f573ed1ae7892"
license: "GPL-2.0-or-later"
---

# INX extension descriptor format (part 2 of 2)

## DTD XML schema

> **Warning:** This section contains slightly outdated information.

The following XML schema may not fully describe the current INX file
structure. The actual XML schema used is described in the :ref:`next
paragraph <relax_ng_xml_schema>`.

```
<!ELEMENT inkscape-extension (name, id, dependency*, param*,(input|output|effect),(script|plugin))>
<!ELEMENT input (extension, mimetype, filetype, filetypetooltip, output_extension?)>
<!ELEMENT output (extension, mimetype, filetype, filetypetooltip, dataloss?)>
<!ELEMENT effect (object-type|submenu?)>
<!ELEMENT script (command, helper_extension*, check*)>
<!ELEMENT plugin (name)>
<!ELEMENT name (#PCDATA)>
<!ELEMENT id (#PCDATA)>
<!ELEMENT item (#PCDATA)>
<!ELEMENT option (#PCDATA)>
<!ELEMENT dependency (#PCDATA)>
<!ELEMENT param (#PCDATA|page|item|option)*>
<!ELEMENT page (#PCDATA, param*)>
<!ELEMENT extension (#PCDATA)>
<!ELEMENT mimetype (#PCDATA)>
<!ELEMENT filetype (#PCDATA)>
<!ELEMENT filetooltip (#PCDATA)>
<!ELEMENT object-type (#PCDATA)>
<!ELEMENT command (#PCDATA)>
<!ELEMENT check (#PCDATA)>
<!ELEMENT dataloss (#PCDATA)>
<!ELEMENT helper_extension (#PCDATA)>
<!ELEMENT output_extension (#PCDATA)>
<!ELEMENT menu-tip (#PCDATA)>

<!ATTLIST check reldir (absolute|path|extensions|plugins) #REQUIRED>
<!ATTLIST command reldir (absolute|path|extensions|plugins) #REQUIRED>
<!ATTLIST command interpreter CDATA #REQUIRED>
<!ATTLIST dependency type (executable|extension) #REQUIRED>
<!ATTLIST dependency location (absolute|path|extensions|plugins) #IMPLIED>
<!ATTLIST dependency description CDATA #IMPLIED>
<!ATTLIST effect needs-live-preview (true|false) #REQUIRED>
<!ATTLIST effect implements-custom-gui (true|false) #IMPLIED>
<!ATTLIST effect needs-document (true|false) #IMPLIED>
<!ATTLIST page name CDATA #REQUIRED>
<!ATTLIST page gui-text CDATA #IMPLIED>
<!ATTLIST param name CDATA #REQUIRED>
<!ATTLIST param type (int|float|string|bool|notebook|path|optiongroup|color) #REQUIRED>
<!ATTLIST param min CDATA #IMPLIED>
<!ATTLIST param max CDATA #IMPLIED>
<!ATTLIST param max_length CDATA #IMPLIED>
<!ATTLIST param precision CDATA #IMPLIED>
<!ATTLIST param gui-text CDATA #IMPLIED>
<!ATTLIST param gui-tip CDATA #IMPLIED>
<!ATTLIST param gui-description CDATA #IMPLIED>
<!ATTLIST param scope CDATA #IMPLIED>
<!ATTLIST param gui-hidden CDATA #IMPLIED>
<!ATTLIST param appearance (minimal|) "">
<!ATTLIST submenu name CDATA #REQUIRED>
```

## RELAX NG XML schema

The XML schema for INX files is available in the `Inkscape extensions
Git repository`_. This is a RELAX NG schema.
