---
title: "How to: Sign XML Documents with Digital Signatures (part 1 of 4)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-sign-xml-documents-with-digital-signatures.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Sign XML Documents with Digital Signatures

You can use the classes in the `System.Security.Cryptography.Xml` namespace to sign an XML document or part of an XML document with a digital signature.  XML digital signatures (XMLDSIG) allow you to verify that data was not altered after it was signed.  For more information about the XMLDSIG standard, see the World Wide Web Consortium (W3C) recommendation XML Signature Syntax and Processing.

> **Note:**
> The code in this article applies to Windows.

> **Important:**
> A `System.Security.Cryptography.Xml.SignedXml` instance is intended for a single signing operation. Do not reuse the same instance to compute more than one signature, and do not call `System.Security.Cryptography.Xml.SignedXml.ComputeSignature*` and then `System.Security.Cryptography.Xml.SignedXml.CheckSignature*` on the same instance. Reusing an instance might produce incorrect results. If you need to sign multiple documents (or sign and then verify), create a new `System.Security.Cryptography.Xml.SignedXml` for each operation.

The code example in this procedure demonstrates how to digitally sign an entire XML document and attach the signature to the document in a <`Signature`> element.  The example creates an RSA signing key, adds the key to a secure key container, and then uses the key to digitally sign an XML document.  The key can then be retrieved to verify the XML digital signature, or can be used to sign another XML document.

For information about how to verify an XML digital signature that was created using this procedure, see How to: Verify the Digital Signatures of XML Documents.
