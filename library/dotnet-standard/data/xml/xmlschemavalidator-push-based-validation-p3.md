---
title: "XmlSchemaValidator Push-Based Validation (part 3 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/xmlschemavalidator-push-based-validation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XmlSchemaValidator Push-Based Validation (part 3 of 4)

### Retrieving Expected Particles, Attributes, and Unspecified Default Attributes

The `System.Xml.Schema.XmlSchemaValidator` class provides the `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*`, `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*`, and `System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*` methods to retrieve the expected particles, attributes, and unspecified default attributes in the current validation context.

#### Retrieving Expected Particles

The `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method returns an array of `System.Xml.Schema.XmlSchemaParticle` objects containing the expected particles in the current element context. The valid particles that can be returned by the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method are instances of the `System.Xml.Schema.XmlSchemaElement` and `System.Xml.Schema.XmlSchemaAny` classes.

When the compositor for the content model is an `xs:sequence`, only the next particle in the sequence is returned. If the compositor for the content model is an `xs:all` or an `xs:choice`, then all valid particles that could follow in the current element context are returned.

> **Note:**
> If the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method is called immediately after calling the `System.Xml.Schema.XmlSchemaValidator.Initialize*` method, the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method returns all global elements.

For example, in the XML Schema Definition Language (XSD) schema and XML document that follow, after validating the `book` element, the `book` element is the current element context. The `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method returns an array containing a single `System.Xml.Schema.XmlSchemaElement` object representing the `title` element. When the validation context is the `title` element, the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method returns an empty array. If the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method is called after the `title` element has been validated but before the `description` element has been validated, it returns an array containing a single `System.Xml.Schema.XmlSchemaElement` object representing the `description` element. If the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method is called after the `description` element has been validated then it returns an array containing a single `System.Xml.Schema.XmlSchemaAny` object representing the wildcard.

```vb
Dim reader As XmlReader =  XmlReader.Create("input.xml")

Dim schemaSet As New XmlSchemaSet()
schemaSet.Add(Nothing, "schema.xsd")
Dim manager As New XmlNamespaceManager(reader.NameTable)

Dim validator As New XmlSchemaValidator(reader.NameTable,schemaSet,manager,XmlSchemaValidationFlags.None)
validator.Initialize()

validator.ValidateElement("book", "", Nothing)

validator.ValidateEndOfAttributes(Nothing)
For Each element As XmlSchemaElement In validator.GetExpectedParticles()
    Console.WriteLine(element.Name)
Next

validator.ValidateElement("title", "", Nothing)
validator.ValidateEndOfAttributes(Nothing)
For Each element As XmlSchemaElement In validator.GetExpectedParticles()
    Console.WriteLine(element.Name)
Next
validator.ValidateEndElement(Nothing)

For Each element As XmlSchemaElement In validator.GetExpectedParticles()
    Console.WriteLine(element.Name)
Next

validator.ValidateElement("description", "", Nothing)
validator.ValidateEndOfAttributes(Nothing)
validator.ValidateEndElement(Nothing)

For Each particle As XmlSchemaParticle In validator.GetExpectedParticles()
    Console.WriteLine(particle.GetType())
Next

validator.ValidateElement("namespace", "", Nothing)
validator.ValidateEndOfAttributes(Nothing)
validator.ValidateEndElement(Nothing)

validator.ValidateEndElement(Nothing)
```

```csharp
XmlReader reader = XmlReader.Create("input.xml");

var schemaSet = new XmlSchemaSet();
schemaSet.Add(null, "schema.xsd");
var manager = new XmlNamespaceManager(reader.NameTable);

var validator = new XmlSchemaValidator(reader.NameTable, schemaSet, manager, XmlSchemaValidationFlags.None);
validator.Initialize();

validator.ValidateElement("book", "", null);

validator.ValidateEndOfAttributes(null);
foreach (XmlSchemaElement element in validator.GetExpectedParticles())
{
    Console.WriteLine(element.Name);
}

validator.ValidateElement("title", "", null);
validator.ValidateEndOfAttributes(null);
foreach (XmlSchemaElement element in validator.GetExpectedParticles())
{
    Console.WriteLine(element.Name);
}
validator.ValidateEndElement(null);

foreach (XmlSchemaElement element in validator.GetExpectedParticles())
{
    Console.WriteLine(element.Name);
}

validator.ValidateElement("description", "", null);
validator.ValidateEndOfAttributes(null);
validator.ValidateEndElement(null);

foreach (XmlSchemaParticle particle in validator.GetExpectedParticles())
{
    Console.WriteLine(particle.GetType());
}

validator.ValidateElement("namespace", "", null);
validator.ValidateEndOfAttributes(null);
validator.ValidateEndElement(null);

validator.ValidateEndElement(null);
```

 The example takes the following XML as input:

```xml
<xs:schema xmlns:xs="http://www.w3c.org/2001/XMLSchema">
  <xs:element name="book">
    <xs:sequence>
      <xs:element name="title" type="xs:string" />
      <xs:element name="description" type="xs:string" />
      <xs:any processContent="lax" maxOccurs="unbounded" />
    </xs:sequence>
  </xs:element>
</xs:schema>
```

The example takes the following XSD schema as input:

```xml
<book>
  <title>My Book</title>
  <description>My Book's Description</description>
  <namespace>System.Xml.Schema</namespace>
</book>
```

> **Note:**
> The results of the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*`, `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*`, and `System.Xml.Schema.XmlSchemaValidator.AddSchema*` methods of the `System.Xml.Schema.XmlSchemaValidator` class are dependent on the current context being validated. For more information, see the "Validation Context" section of this topic.

For an example of the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method, see the example in the introduction. For more information about the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*` method, see the `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

#### Retrieving Expected Attributes

The `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*` method returns an array of `System.Xml.Schema.XmlSchemaAttribute` objects containing the expected attributes in the current element context.

For example, in the example in the introduction, the `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*` method is used to retrieve all the attributes of the `book` element.

If you call the `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*` method immediately after the `System.Xml.Schema.XmlSchemaValidator.ValidateElement*` method, all the attributes that could appear in the XML document are returned. However, if you call the `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*` method after one or more calls to the `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*` method, the attributes that have not yet been validated for the current element are returned.

> **Note:**
> The results of the `System.Xml.Schema.XmlSchemaValidator.GetExpectedParticles*`, `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*`, and `System.Xml.Schema.XmlSchemaValidator.AddSchema*` methods of the `System.Xml.Schema.XmlSchemaValidator` class are dependent on the current context being validated. For more information, see the "Validation Context" section of this topic.

For an example of the `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*` method, see the example in the introduction. For more information about the `System.Xml.Schema.XmlSchemaValidator.GetExpectedAttributes*` method, see the `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

#### Retrieving Unspecified Default Attributes

The `System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*` method populates the `System.Collections.ArrayList` specified with `System.Xml.Schema.XmlSchemaAttribute` objects for any attributes with default values that have not been previously validated using the `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*` method in the element context. The `System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*` method should be called after calling the `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*` method on each attribute in the element context. The `System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*` method should be used to determine what default attributes are to be inserted into the XML document being validated.

For more information about the `System.Xml.Schema.XmlSchemaValidator.GetUnspecifiedDefaultAttributes*` method, see the `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

### Handling Schema Validation Events

Schema validation warnings and errors encountered during validation are handled by the `System.Xml.Schema.XmlSchemaValidator.ValidationEventHandler` event of the `System.Xml.Schema.XmlSchemaValidator` class.

Schema validation warnings have an `System.Xml.Schema.XmlSeverityType` value of `System.Xml.Schema.XmlSeverityType.Warning` and schema validation errors have an `System.Xml.Schema.XmlSeverityType` value of `System.Xml.Schema.XmlSeverityType.Error`. If no `System.Xml.Schema.XmlSchemaValidator.ValidationEventHandler` has been assigned, an `System.Xml.Schema.XmlSchemaValidationException` is thrown for all schema validation errors with an `System.Xml.Schema.XmlSeverityType` value of `System.Xml.Schema.XmlSeverityType.Error`. However, an `System.Xml.Schema.XmlSchemaValidationException` is not thrown for schema validation warnings with an `System.Xml.Schema.XmlSeverityType` value of `System.Xml.Schema.XmlSeverityType.Warning`.

The following is an example of a `System.Xml.Schema.ValidationEventHandler` that receives schema validation warnings and errors encountered during schema validation taken from the example in the introduction.

```vb
Shared Sub SchemaValidationEventHandler(sender As Object, e As ValidationEventArgs)

    Select Case e.Severity
        Case XmlSeverityType.Error
            Console.WriteLine(vbCrLf & "Error: {0}", e.Message)
            Exit Sub
        Case XmlSeverityType.Warning
            Console.WriteLine(vbCrLf & "Warning: {0}", e.Message)
            Exit Sub
    End Select
End Sub
```

```csharp
static void SchemaValidationEventHandler(object sender, ValidationEventArgs e)
{
    switch (e.Severity)
    {
        case XmlSeverityType.Error:
            Console.WriteLine("\nError: {0}", e.Message);
            break;
        case XmlSeverityType.Warning:
            Console.WriteLine("\nWarning: {0}", e.Message);
            break;
    }
}
```

For a complete example of the `System.Xml.Schema.ValidationEventHandler`, see the example in the introduction. For more information, see the `System.Xml.Schema.XmlSchemaInfo` class reference documentation.

## XmlSchemaValidator State Transition

The `System.Xml.Schema.XmlSchemaValidator` class has a defined state transition that enforces the sequence and occurrence of calls made to each of the methods used to validate elements, attributes, and content in an XML infoset.

The following table describes the state transition of the `System.Xml.Schema.XmlSchemaValidator` class, and the sequence and occurrence of method calls that can be made in each state.

|State|Transition|
|-----------|----------------|
|Validate|`System.Xml.Schema.XmlSchemaValidator.Initialize*` (`System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*` &#124; TopLevel*) `System.Xml.Schema.XmlSchemaValidator.EndValidation*`|
|TopLevel|`System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*` &#124; `System.Xml.Schema.XmlSchemaValidator.ValidateText*` &#124; Element|
|Element|`System.Xml.Schema.XmlSchemaValidator.ValidateElement*` `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*`* (`System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*` Content\*)? `System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*` &#124; `System.Xml.Schema.XmlSchemaValidator.ValidateElement*` `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*`\* `System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*` &#124; `System.Xml.Schema.XmlSchemaValidator.ValidateElement*` `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*`\* `System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*` Content\* `System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*` &#124;|
|Content|`System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*` &#124; `System.Xml.Schema.XmlSchemaValidator.ValidateText*` &#124; Element|

> **Note:**
> An `System.InvalidOperationException` is thrown by each of the methods in the table above when the call to the method is made in the incorrect sequence according to the current state of an `System.Xml.Schema.XmlSchemaValidator` object.

The state transition table above uses punctuation symbols to describe the methods and other states that can be called for each state of the state transition of the `System.Xml.Schema.XmlSchemaValidator` class. The symbols used are the same symbols found in the XML Standards reference for Document Type Definition (DTD).

The following table describes how the punctuation symbols found in the state transition table above affect the methods and other states that can be called for each state in the state transition of the `System.Xml.Schema.XmlSchemaValidator` class.

|Symbol|Description|
|------------|-----------------|
|&#124;|Either method or state (the one before the bar or the one after it) can be called.|
|?|The method or state that precedes the question mark is optional but if it is called it can only be called once.|
|\*|The method or state that precedes the \* symbol is optional, and can be called more than once.|
