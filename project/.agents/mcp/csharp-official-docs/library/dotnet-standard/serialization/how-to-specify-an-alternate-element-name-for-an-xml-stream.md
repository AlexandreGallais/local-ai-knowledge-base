---
title: "How to: Specify an Alternate Element Name for an XML Stream"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/serialization/how-to-specify-an-alternate-element-name-for-an-xml-stream.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Specify an Alternate Element Name for an XML Stream

Using the `System.Xml.Serialization.XmlSerializer`, you can generate more than one XML stream with the same set of classes. You might want to do this because two different XML Web services require the same basic <example-value>, with only slight differences. For example, imagine two XML Web services that process orders for books, and thus both require ISBN numbers. One service uses the tag `<ISBN>` while the second uses the tag `<BookID>`. You have a class named `Book` that contains a field named `ISBN`. When an instance of the `Book` class is serialized, it will, by default, use the member name (ISBN) as the tag element name. For the first XML Web service, this is as expected. But to send the XML stream to the second XML Web service, you must override the serialization so that the tag's element name is `BookID`.

## To create an XML stream with an alternate element name

1. Create an instance of the `System.Xml.Serialization.XmlElementAttribute` class.

2. Set the `System.Xml.Serialization.XmlElementAttribute.ElementName*` of the `System.Xml.Serialization.XmlElementAttribute` to "BookID".

3. Create an instance of the `System.Xml.Serialization.XmlAttributes` class.

4. Add the `XmlElementAttribute` object to the collection accessed through the `System.Xml.Serialization.XmlAttributes.XmlElements` property of `System.Xml.Serialization.XmlAttributes` .

5. Create an instance of the `System.Xml.Serialization.XmlAttributeOverrides` class.

6. Add the `XmlAttributes` to the `System.Xml.Serialization.XmlAttributeOverrides`, passing the type of the object to override and the name of the member being overridden.

7. Create an instance of the `XmlSerializer` class with `XmlAttributeOverrides`.

8. Create an instance of the `Book` class, and serialize or deserialize it.

## Example

```vb
Public Function SerializeOverride()
    ' Creates an XmlElementAttribute with the alternate name.
    Dim myElementAttribute As XmlElementAttribute = _
    New XmlElementAttribute()
    myElementAttribute.ElementName = "BookID"
    Dim myAttributes As XmlAttributes = New XmlAttributes()
    myAttributes.XmlElements.Add(myElementAttribute)
    Dim myOverrides As XmlAttributeOverrides = New XmlAttributeOverrides()
    myOverrides.Add(typeof(Book), "ISBN", myAttributes)
    Dim mySerializer As XmlSerializer = _
    New XmlSerializer(GetType(Book), myOverrides)
    Dim b As Book = New Book()
    b.ISBN = "123456789"
    ' Creates a StreamWriter to write the XML stream to.
    Dim writer As StreamWriter = New StreamWriter("Book.xml")
    mySerializer.Serialize(writer, b);
End Class
```

```csharp
public void SerializeOverride()
{
    // Creates an XmlElementAttribute with the alternate name.
    XmlElementAttribute myElementAttribute = new XmlElementAttribute();
    myElementAttribute.ElementName = "BookID";
    XmlAttributes myAttributes = new XmlAttributes();
    myAttributes.XmlElements.Add(myElementAttribute);
    XmlAttributeOverrides myOverrides = new XmlAttributeOverrides();
    myOverrides.Add(typeof(Book), "ISBN", myAttributes);
    XmlSerializer mySerializer =
    new XmlSerializer(typeof(Book), myOverrides);
    Book b = new Book();
    b.ISBN = "123456789";
    // Creates a StreamWriter to write the XML stream to.
    StreamWriter writer = new StreamWriter("Book.xml");
    mySerializer.Serialize(writer, b);
}
```

 The XML stream might resemble the following.

```xml
<Book>
    <BookID>123456789</BookID>
</Book>
```

## See also

- `System.Xml.Serialization.XmlElementAttribute`
- `System.Xml.Serialization.XmlAttributes`
- `System.Xml.Serialization.XmlAttributeOverrides`
- XML and SOAP Serialization
- `System.Xml.Serialization.XmlSerializer`
- How to: Serialize an Object
- How to: Deserialize an Object
