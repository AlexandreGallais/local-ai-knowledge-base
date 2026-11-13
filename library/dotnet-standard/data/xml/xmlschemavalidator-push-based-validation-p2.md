---
title: "XmlSchemaValidator Push-Based Validation (part 2 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/data/xml/xmlschemavalidator-push-based-validation.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# XmlSchemaValidator Push-Based Validation (part 2 of 4)

## Validating XML Data using XmlSchemaValidator

To begin validating an XML infoset, you must first initialize a new instance of the `System.Xml.Schema.XmlSchemaValidator` class using the `System.Xml.Schema.XmlSchemaValidator.#ctor*` constructor.

The `System.Xml.Schema.XmlSchemaValidator.#ctor*` constructor takes `System.Xml.XmlNameTable`, `System.Xml.Schema.XmlSchemaSet`, and `System.Xml.XmlNamespaceManager` objects as parameters as well as a `System.Xml.Schema.XmlSchemaValidationFlags` value as a parameter. The `System.Xml.XmlNameTable` object is used to atomize well-known namespace strings like the schema namespace, the XML namespace, and so on, and is passed to the `System.Xml.Schema.XmlSchemaDatatype.ParseValue*` method while validating simple content. The `System.Xml.Schema.XmlSchemaSet` object contains the XML schemas used to validate the XML infoset. The `System.Xml.XmlNamespaceManager` object is used to resolve namespaces encountered during validation. The `System.Xml.Schema.XmlSchemaValidationFlags` value is used to disable certain features of validation.

For more information about the `System.Xml.Schema.XmlSchemaValidator.#ctor*` constructor, see the `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

### Initializing Validation

After an `System.Xml.Schema.XmlSchemaValidator` object has been constructed, there are two overloaded `System.Xml.Schema.XmlSchemaValidator.Initialize*` methods used to initialize the state of the `System.Xml.Schema.XmlSchemaValidator` object. The following are the two `System.Xml.Schema.XmlSchemaValidator.Initialize*` methods.

- `System.Xml.Schema.XmlSchemaValidator.Initialize*`

- `System.Xml.Schema.XmlSchemaValidator.Initialize*`

The default `System.Xml.Schema.XmlSchemaValidator.Initialize*` method initializes an `System.Xml.Schema.XmlSchemaValidator` object to its starting state, and the overloaded `System.Xml.Schema.XmlSchemaValidator.Initialize*` method that takes an `System.Xml.Schema.XmlSchemaObject` as a parameter initializes an `System.Xml.Schema.XmlSchemaValidator` object to its starting state for partial validation.

Both `System.Xml.Schema.XmlSchemaValidator.Initialize*` methods can only be called immediately after an `System.Xml.Schema.XmlSchemaValidator` object has been constructed or after a call to `System.Xml.Schema.XmlSchemaValidator.EndValidation*`.

For an example of the `System.Xml.Schema.XmlSchemaValidator.Initialize*` method, see the example in the introduction. For more information about the `System.Xml.Schema.XmlSchemaValidator.Initialize*` method, see the `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

#### Partial Validation

The `System.Xml.Schema.XmlSchemaValidator.Initialize*` method that takes an `System.Xml.Schema.XmlSchemaObject` as a parameter initializes an `System.Xml.Schema.XmlSchemaValidator` object to its starting state for partial validation.

In the following example, an `System.Xml.Schema.XmlSchemaObject` is initialized for partial validation using the `System.Xml.Schema.XmlSchemaValidator.Initialize*` method. The `orderNumber` schema element is passed by selecting the schema element by `System.Xml.XmlQualifiedName` in the `System.Xml.Schema.XmlSchemaObjectTable` collection returned by the `System.Xml.Schema.XmlSchemaSet.GlobalElements` property of the `System.Xml.Schema.XmlSchemaSet` object. The `System.Xml.Schema.XmlSchemaValidator` object then validates this specific element.

```vb
Dim schemaSet As XmlSchemaSet = New XmlSchemaSet()
schemaSet.Add(Nothing, "schema.xsd")
schemaSet.Compile()
Dim nameTable As NameTable = New NameTable()
Dim manager As XmlNamespaceManager = New XmlNamespaceManager(nameTable)

Dim validator As XmlSchemaValidator = New XmlSchemaValidator(nameTable, schemaSet, manager, XmlSchemaValidationFlags.None)
validator.Initialize(schemaSet.GlobalElements.Item(New XmlQualifiedName("orderNumber")))

validator.ValidateElement("orderNumber", "", Nothing)
validator.ValidateEndOfAttributes(Nothing)
validator.ValidateText("123")
validator.ValidateEndElement(Nothing)
```

```csharp
XmlSchemaSet schemaSet = new XmlSchemaSet();
schemaSet.Add(null, "schema.xsd");
schemaSet.Compile();
NameTable nameTable = new NameTable();
XmlNamespaceManager manager = new XmlNamespaceManager(nameTable);

XmlSchemaValidator validator = new XmlSchemaValidator(nameTable, schemaSet, manager, XmlSchemaValidationFlags.None);
validator.Initialize(schemaSet.GlobalElements[new XmlQualifiedName("orderNumber")]);

validator.ValidateElement("orderNumber", "", null);
validator.ValidateEndOfAttributes(null);
validator.ValidateText("123");
validator.ValidateEndElement(null);
```

The example takes the following XML schema as input.

```xml
<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
  <xs:element name="orderNumber" type="xs:int" />
</xs:schema>
```

For more information about the `System.Xml.Schema.XmlSchemaValidator.Initialize*` method, see the `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

### Adding Additional Schemas

The `System.Xml.Schema.XmlSchemaValidator.AddSchema*` method of the `System.Xml.Schema.XmlSchemaValidator` class is used to add an XML schema to the set of schemas used during validation. The `System.Xml.Schema.XmlSchemaValidator.AddSchema*` method can be used to simulate the effect of encountering an inline XML schema in the XML infoset being validated.

> **Note:**
> The target namespace of the `System.Xml.Schema.XmlSchema` parameter cannot match that of any element or attribute already encountered by the `System.Xml.Schema.XmlSchemaValidator` object.
>
> If the `System.Xml.Schema.XmlSchemaValidationFlags.ProcessInlineSchema` value was not passed as a parameter to the `System.Xml.Schema.XmlSchemaValidator.#ctor*` constructor, the `System.Xml.Schema.XmlSchemaValidator.AddSchema*` method does nothing.

The result of the `System.Xml.Schema.XmlSchemaValidator.AddSchema*` method is dependant on the current XML node context being validated. For more information about validation contexts, see the "Validation Context" section of this topic.

For more information about the `System.Xml.Schema.XmlSchemaValidator.AddSchema*` method, see the `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

### Validating Elements, Attributes, and Content

The `System.Xml.Schema.XmlSchemaValidator` class provides several methods used to validate elements, attributes, and content in an XML infoset against XML schemas. The following table describes each of these methods.

|Method|Description|
|------------|-----------------|
|`System.Xml.Schema.XmlSchemaValidator.ValidateElement*`|Validates the element name in the current context.|
|`System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*`|Validates the attribute in the current element context or against the `System.Xml.Schema.XmlSchemaAttribute` object passed as a parameter to the `System.Xml.Schema.XmlSchemaValidator.Initialize*` method.|
|`System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*`|Verifies whether all the required attributes in the element context are present and prepares the `System.Xml.Schema.XmlSchemaValidator` object to validate the child content of the element.|
|`System.Xml.Schema.XmlSchemaValidator.ValidateText*`|Validates whether text is allowed in the current element context, and accumulates the text for validation if the current element has simple content.|
|`System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*`|Validates whether white-space is allowed in the current element context, and accumulates the white-space for validation whether the current element has simple content.|
|`System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*`|Verifies whether the text content of the element is valid according to its data type for elements with simple content, and verifies whether the content of the current element is complete for elements with complex content.|
|`System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*`|Skips validation of the current element content and prepares the `System.Xml.Schema.XmlSchemaValidator` object to validate content in the parent element's context.|
|`System.Xml.Schema.XmlSchemaValidator.EndValidation*`|Ends validation and checks identity constraints for the entire XML document if the `System.Xml.Schema.XmlSchemaValidationFlags.ProcessIdentityConstraints` validation option is set.|

> **Note:**
> The `System.Xml.Schema.XmlSchemaValidator` class has a defined state transition that enforces the sequence and occurrence of calls made to each of the methods described in the previous table. The specific state transition of the `System.Xml.Schema.XmlSchemaValidator` class is described in the "XmlSchemaValidator State Transition" section of this topic.

For an example of the methods used to validate elements, attributes, and content in an XML infoset, see the example in the previous section. For more information about these methods, see the `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

#### Validating Content Using an XmlValueGetter

The `System.Xml.Schema.XmlValueGetter``delegate` can be used to pass the value of attribute, text, or white-space nodes as a Common Language Runtime (CLR) types compatible with the XML Schema Definition Language (XSD) type of the attribute, text, or white-space node. An `System.Xml.Schema.XmlValueGetter``delegate` is useful if the CLR value of an attribute, text, or white-space node is already available, and avoids the cost of converting it to a `string` and then reparsing it again for validation.

The `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*`, `System.Xml.Schema.XmlSchemaValidator.ValidateText*`, and `System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*` methods are overloaded and accept the value of attribute, text, or white-space nodes as a `string` or `System.Xml.Schema.XmlValueGetter``delegate`.

The following methods of the `System.Xml.Schema.XmlSchemaValidator` class accept an `System.Xml.Schema.XmlValueGetter``delegate` as a parameter.

- `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateText*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateWhitespace*`

The following is an example `System.Xml.Schema.XmlValueGetter``delegate` taken from the `System.Xml.Schema.XmlSchemaValidator` class example in the introduction. The `System.Xml.Schema.XmlValueGetter``delegate` returns the value of an attribute as a `System.DateTime` object. To validate this `System.DateTime` object returned by the `System.Xml.Schema.XmlValueGetter`, the `System.Xml.Schema.XmlSchemaValidator` object first converts it to the ValueType (ValueType is the default CLR mapping for the XSD type) for the data type of the attribute and then checks facets on the converted value.

```vb
Shared dateTimeGetterContent As Object

Shared Function DateTimeGetterHandle() As Object
    Return dateTimeGetterContent
End Function

Shared Function DateTimeGetter(dateTime As DateTime) As XmlValueGetter
    dateTimeGetterContent = dateTime
    Return New XmlValueGetter(AddressOf DateTimeGetterHandle)
End Function
```

```csharp
static object dateTimeGetterContent;

static object DateTimeGetterHandle()
{
    return dateTimeGetterContent;
}

static XmlValueGetter DateTimeGetter(DateTime dateTime)
{
    dateTimeGetterContent = dateTime;
    return new XmlValueGetter(dateTimeGetterHandle);
}
```

For a complete example of the `System.Xml.Schema.XmlValueGetter``delegate`, see the example in the introduction. For more information about the `System.Xml.Schema.XmlValueGetter``delegate`, see the `System.Xml.Schema.XmlValueGetter`, and `System.Xml.Schema.XmlSchemaValidator` class reference documentation.

#### Post-Schema-Validation-Information

The `System.Xml.Schema.XmlSchemaInfo` class represents some of the Post-Schema-Validation-Information of an XML node validated by the `System.Xml.Schema.XmlSchemaValidator` class. Various methods of the `System.Xml.Schema.XmlSchemaValidator` class accept an `System.Xml.Schema.XmlSchemaInfo` object as an optional, (`null`) `out` parameter.

Upon successful validation, properties of the `System.Xml.Schema.XmlSchemaInfo` object are set with the results of the validation. For example, upon successful validation of an attribute using the `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*` method, the `System.Xml.Schema.XmlSchemaInfo` object's (if specified) `System.Xml.Schema.XmlSchemaInfo.SchemaAttribute*`, `System.Xml.Schema.XmlSchemaInfo.SchemaType*`, `System.Xml.Schema.XmlSchemaInfo.MemberType*`, and `System.Xml.Schema.XmlSchemaInfo.Validity` properties are set with the results of the validation.

The following `System.Xml.Schema.XmlSchemaValidator` class methods accept an `System.Xml.Schema.XmlSchemaInfo` object as an out parameter.

- `System.Xml.Schema.XmlSchemaValidator.SkipToEndElement*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateAttribute*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateElement*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateElement*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateEndElement*`

- `System.Xml.Schema.XmlSchemaValidator.ValidateEndOfAttributes*`

For a complete example of the `System.Xml.Schema.XmlSchemaInfo` class, see the example in the introduction. For more information about the `System.Xml.Schema.XmlSchemaInfo` class, see the `System.Xml.Schema.XmlSchemaInfo` class reference documentation.
