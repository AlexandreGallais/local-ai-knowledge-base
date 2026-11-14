---
title: "How to: Encrypt XML Elements with X.509 Certificates (part 1 of 5)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/94b7dca39d8dca4374f326176874381661f4dd59/docs/standard/security/how-to-encrypt-xml-elements-with-x-509-certificates.md"
commit: "94b7dca39d8dca4374f326176874381661f4dd59"
license: "CC-BY-4.0"
---

# How to: Encrypt XML Elements with X.509 Certificates

You can use the classes in the `System.Security.Cryptography.Xml` namespace to encrypt an element within an XML document.  XML Encryption is a standard way to exchange or store encrypted XML data, without worrying about the data being easily read.  For more information about the XML Encryption standard, see the World Wide Web Consortium (W3C) specification for XML Encryption located at <https://www.w3.org/TR/xmldsig-core/>.

 You can use XML Encryption to replace any XML element or document with an <`EncryptedData`> element that contains the encrypted XML data. The <`EncryptedData`> element can contain sub elements that include information about the keys and processes used during encryption.  XML Encryption allows a document to contain multiple encrypted elements and allows an element to be encrypted multiple times.  The code example in this procedure shows you how to create an <`EncryptedData`> element along with several other sub elements that you can use later during decryption.

This example encrypts an XML element using two keys. The example programmatically retrieves a certificate and uses it to encrypt an XML element using the `System.Security.Cryptography.Xml.EncryptedXml.Encrypt*` method. Internally, the `System.Security.Cryptography.Xml.EncryptedXml.Encrypt*` method creates a separate session key and uses it to encrypt the XML document. This method encrypts the session key and saves it along with the encrypted XML within a new <`EncryptedData`> element.

To decrypt the XML element, call the `System.Security.Cryptography.Xml.EncryptedXml.DecryptDocument*` method, which automatically retrieves the X.509 certificate from the store and performs the necessary decryption.  For more information about how to decrypt an XML element that was encrypted using this procedure, see How to: Decrypt XML Elements with X.509 Certificates.

This example is appropriate for situations where multiple applications need to share encrypted data or where an application needs to save encrypted data between the times that it runs.
