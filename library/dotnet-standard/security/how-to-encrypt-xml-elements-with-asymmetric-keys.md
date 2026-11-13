---
title: "Encrypt XML elements with asymmetric keys (part 1 of 10)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-encrypt-xml-elements-with-asymmetric-keys.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# Encrypt XML elements with asymmetric keys

You can use the classes in the `System.Security.Cryptography.Xml` namespace to encrypt an element within an XML document.  XML Encryption is a standard way to exchange or store encrypted XML data, without worrying about the data being easily read.  For more information about the XML Encryption standard, see the World Wide Web Consortium (W3C) specification for XML Encryption located at <https://www.w3.org/TR/xmldsig-core/>.

You can use XML Encryption to replace any XML element or document with an `<EncryptedData>` element that contains the encrypted XML data.  The `<EncryptedData>` element can also contain sub elements that include information about the keys and processes used during encryption.  XML Encryption allows a document to contain multiple encrypted elements and allows an element to be encrypted multiple times.  The code example in this procedure shows how to create an `<EncryptedData>` element along with several other sub elements that you can use later during decryption.

This example encrypts an XML element using two keys.  It generates an RSA public/private key pair and saves the key pair to a secure key container.  The example then creates a separate session key using the Advanced Encryption Standard (AES) algorithm.  The example uses the AES session key to encrypt the XML document and then uses the RSA public key to encrypt the AES session key.  Finally, the example saves the encrypted AES session key and the encrypted XML data to the XML document within a new <`EncryptedData`> element.

To decrypt the XML element, you retrieve the RSA private key from the key container, use it to decrypt the session key, and then use the session key to decrypt the document.  For more information about how to decrypt an XML element that was encrypted using this procedure, see How to: Decrypt XML Elements with Asymmetric Keys.

This example is appropriate for situations where multiple applications need to share encrypted data or where an application needs to save encrypted data between the times that it runs.
