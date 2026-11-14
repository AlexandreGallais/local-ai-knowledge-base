---
title: "System.Xml namespace"
tool: "dotnet-api"
version: "11"
source: "https://github.com/dotnet/dotnet-api-docs/blob/a010100852b71f33d67d913d7a9ed69f83a639b1/xml/ns-System.Xml.xml"
commit: "a010100852b71f33d67d913d7a9ed69f83a639b1"
license: "CC-BY-4.0"
---

# System.Xml namespace

Provides standards-based support for processing XML.

#### Remarks

#### Supported standards
The `Xml` namespace supports these standards:

- XML 1.0, including DTD support
- XML namespaces, both stream-level and DOM
- XML schemas
- XPath expressions
- XSLT transformations
- DOM Level 1 Core
- DOM Level 2 Core

See the section Differences from the W3C specs for two cases in which the XML classes differ from the W3C recommendations.

#### Processing XML asynchronously
The `XmlReader` and `XmlWriter` classes include a number of asynchronous methods that are based on the asynchronous programming model. These methods can be identified by the string "Async" at the end of their names. With these methods, you can write asynchronous code that's similar to your synchronous code, and you can migrate your existing synchronous code to asynchronous code easily.

- Use the asynchronous methods in apps where there is significant network stream latency. Avoid using the asynchronous APIs for memory stream or local file stream read/write operations. The input stream, `XmlTextReader`, and `XmlTextWriter` should support asynchronous operations as well. Otherwise, threads will still be blocked by I/O operations.

- We don't recommend mixing synchronous and asynchronous function calls, because you might forget to use the `await` keyword or use a synchronous API where an asynchronous one is necessary.

- Do not set the `XmlReaderSettings.Async` or `XmlWriterSettings.Async` flag to `true` if you don't intend to use an asynchronous method.

- If you forget to specify the `await` keyword when you call an asynchronous method, the results are non-deterministic: You might receive the result you expected or an exception.

- When an `XmlReader` object is reading a large text node, it might cache only a partial text value and return the text node, so retrieving the `Value` property might be blocked by an I/O operation. Use the `XmlReader.GetValueAsync` method to get the text value in asynchronous mode, or use the `XmlReader.ReadValueChunkAsync` method to read a large text block in chunks.

- When you use an `XmlWriter` object, call the `XmlWriter.FlushAsync` method before calling `XmlWriter.Close` to avoid blocking an I/O operation.

#### Differences from the W3C specs
In two cases that involve constraints on model group schema components, the `Xml` namespace differs from the W3C recommendations.

**Consistency in element declarations:**

In some cases, when substitution groups are used, the `Xml` implementation does not satisfy the "Schema Component Constraint: Element Declarations Consistent," which is described in the Constraints on Model Group Schema Components section of the W3C spec.

For example, the following schema includes elements that have the same name but different types in the same content model, and substitution groups are used. This should cause an error, but `Xml` compiles and validates the schema without errors.

```xml
<?xml version="1.0" encoding="utf-8" ?>
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">

   
   

   
      <xs:complexType name="t2">
         <xs:complexContent>
            <xs:extension base="t1">
         </xs:extension>
      </xs:complexContent>
   </xs:complexType>

   <xs:complexType name="t3">
      <xs:sequence>
         
         
      </xs:sequence>
   </xs:complexType>
</xs:schema>
```

In this schema, type `t3` contains a sequence of elements. Because of the substitution, the reference to element `e1` from the sequence can result either in element `e1` of type `t1` or in element `e2` of type `t2`. The latter case would result in a sequence of two `e2` elements, where one is of type `t2` and the other is of type `xs:int`.

**Unique particle attribution:**

Under the following conditions, the `Xml` implementation does not satisfy the "Schema Component Constraint: Unique Particle Attribution," which is described in the Constraints on Model Group Schema Components section of the W3C spec.

- One of the elements in the group references another element.
- The referenced element is a head element of a substitution group.
- The substitution group contains an element that has the same name as one of the elements in the group.
- The cardinality of the element that references the substitution group head element and the element with the same name as a substitution group element is not fixed (minOccurs < maxOccurs).
- The definition of the element that references the substitution group precedes the definition of the element with the same name as a substitution group element.

For example, in the schema below the content model is ambiguous and should cause a compilation error, but `Xml` compiles the schema without errors.

```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">

  
  

  <xs:complexType name="t3">
    <xs:sequence>
      
      
    </xs:sequence>
  </xs:complexType>

  
</xs:schema>
```

If you try to validate the following XML against the schema above, the validation will fail with the following message: "The element 'e3' has invalid child element 'e2'." and an `XmlSchemaValidationException` exception will be thrown.

```xml
<e3>
  <e2>1</e2>
  <e2>2</e2>
</e3>
```

To work around this problem, you can swap element declarations in the XSD document. For example:

```xml
<xs:sequence>
  
  
</xs:sequence>
```

becomes this:

```xml
<xs:sequence>
  
  
</xs:sequence>
```

Here's another example of the same issue:

```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema" elementFormDefault="qualified">
   
   

   <xs:complexType name="t3">
      <xs:sequence>
         
         
      </xs:sequence>
   </xs:complexType>
   
</xs:schema>
```

If you try to validate the following XML against the schema above, the validation will fail with the following exception: "Unhandled Exception: System.Xml.Schema.XmlSchemaValidationException: The 'e2' el element is invalid - The value 'abc' is invalid according to its datatype `'http://www.w3.org/2001/XMLSchema:int'` - The string 'abc' is not a valid Int32 value."

```xml
<e3><e2>abc</e2></e3>
```

#### Security considerations
The types and members in the `Xml` namespace rely on the .NET security system. The following sections discuss security issues that are specific to XML technologies.

Also note that when you use the `Xml` types and members, if the XML contains data that has potential privacy implications, you need to implement your app in a way that respects your end users' privacy.

**External access**

Several XML technologies have the ability to retrieve other documents during processing. For example, a document type definition (DTD) can reside in the document being parsed. The DTD can also live in an external document that is referenced by the document being parsed. The XML Schema definition language (XSD) and XSLT technologies also have the ability to include information from other files. These external resources can present some security concerns. For example, you'll want to ensure that your app retrieves files only from trusted sites, and that the file it retrieves doesn't contain malicious data.

The `XmlUrlResolver` class is used to load XML documents and to resolve external resources such as entities, DTDs, or schemas, and import or include directives.

You can override this class and specify the `XmlResolver` object to use. Use the `XmlSecureResolver` class if you need to open a resource that you do not control, or that is untrusted. The `XmlSecureResolver` wraps an `XmlResolver` and allows you to restrict the resources that the underlying `XmlResolver` has access to.

**Denial of service**

The following scenarios are considered to be less vulnerable to denial of service attacks because the `Xml` classes provide a means of protection from such attacks.

- Parsing text XML data.

- Parsing binary XML data if the binary XML data was generated by Microsoft SQL Server.

- Writing XML documents and fragments from data sources to the file system, streams, a `TextWriter`, or a `StringBuilder`.

- Loading documents into the Document Object Model (DOM) object if you are using an `XmlReader` object and `XmlReaderSettings.DtdProcessing` set to `Prohibit`.

- Navigating the DOM object.

The following scenarios are not recommended if you are concerned about denial of service attacks, or if you are working in an untrusted environment.

- DTD processing.

- Schema processing. This includes adding an untrusted schema to the schema collection, compiling an untrusted schema, and validating by using an untrusted schema.

- XSLT processing.

- Parsing any arbitrary stream of user supplied binary XML data.

- DOM operations such as querying, editing, moving sub-trees between documents, and saving DOM objects.

If you are concerned about denial of service issues or if you are dealing with untrusted sources, do not enable DTD processing. This is disabled by default on `XmlReader` objects that the `XmlReader.Create` method creates.

> **Note:**
> The `XmlTextReader` allows DTD processing by default. Use the `DtdProcessing` property to disable this feature.

If you have DTD processing enabled, you can use the `XmlSecureResolver` class to restrict the resources that the `XmlReader` can access. You can also design your app so that the XML processing is memory and time constrained. For example, you can configure timeout limits in your ASP.NET app.

**Processing considerations**

Because XML documents can include references to other files, it is difficult to determine how much processing power is required to parse an XML document. For example, XML documents can include a DTD. If the DTD contains nested entities or complex content models, it could take an excessive amount of time to parse the document.

When using `XmlReader`, you can limit the size of the document that can be parsed by setting the `MaxCharactersInDocument` property. You can limit the number of characters that result from expanding entities by setting the `MaxCharactersFromEntities` property. See the appropriate reference topics for examples of setting these properties.

The XSD and XSLT technologies have additional capabilities that can affect processing performance. For example, it is possible to construct an XML schema that requires a substantial amount of time to process when evaluated over a relatively small document. It is also possible to embed script blocks within an XSLT style sheet. Both cases pose a potential security threat to your app.

When creating an app that uses the `XslCompiledTransform` class, you should be aware of the following items and their implications:

- XSLT scripting is disabled by default. XSLT scripting should be enabled only if you require script support and you are working in a fully trusted environment.

- The XSLT `document()` function is disabled by default. If you enable the `document()` function, restrict the resources that can be accessed by passing an `XmlSecureResolver` object to the `XslCompiledTransform.Transform` method.

- Extension objects are enabled by default. If an `XsltArgumentList` object that contains extension objects is passed to the `XslCompiledTransform.Transform` method, the extension objects are used.

- XSLT style sheets can include references to other files and embedded script blocks. A malicious user can exploit this by supplying you with data or style sheets that, when executed, can cause your system to process until the computer runs low on resources.

- XSLT apps that run in a mixed trust environment can result in style sheet spoofing. For example, a malicious user can load an object with a harmful style sheet and hand it off to another user who subsequently calls the `XslCompiledTransform.Transform` method and executes the transformation.

These security issues can be mitigated by not enabling scripting or the `document()` function unless the style sheet comes from a trusted source, and by not accepting `XslCompiledTransform` objects, XSLT style sheets, or XML source data from an untrusted source.

**Exception handling**

Exceptions thrown by lower level components can disclose path information that you do not want exposed to the app. Your apps must catch exceptions and process them appropriately.
