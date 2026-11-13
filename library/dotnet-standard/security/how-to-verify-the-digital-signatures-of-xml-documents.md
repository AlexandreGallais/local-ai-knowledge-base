---
title: "How to: Verify the Digital Signatures of XML Documents (part 1 of 3)"
tool: "dotnet-standard"
version: "11"
source: "https://github.com/dotnet/docs/blob/c3377f5f732f604c8f9bffc14d814dd35c99f3c0/docs/standard/security/how-to-verify-the-digital-signatures-of-xml-documents.md"
commit: "c3377f5f732f604c8f9bffc14d814dd35c99f3c0"
license: "CC-BY-4.0"
---

# How to: Verify the Digital Signatures of XML Documents

You can use the classes in the `System.Security.Cryptography.Xml` namespace to verify XML data signed with a digital signature. XML digital signatures (XMLDSIG) allow you to verify that data was not altered after it was signed. For more information about the XMLDSIG standard, see the World Wide Web Consortium (W3C) specification at <https://www.w3.org/TR/xmldsig-core/>.

> **Note:**
> The code in this article applies to Windows.

> **Important:**
> Always verify XML signatures by using an overload of `System.Security.Cryptography.Xml.SignedXml.CheckSignature*` that takes the verification key or certificate as an argument, and obtain that key or certificate from a source that is independent of the signed document (for example, a key container as shown in this example, application configuration, or a certificate pinned to the application). Do not use the parameterless `CheckSignature()` overload to authenticate documents from an untrusted source: it selects a key from the document's own `<KeyInfo>` element, which is under the control of whoever produced the document, so a successful result does not prove that the signer is trusted. For the full rationale, see the Remarks on `System.Security.Cryptography.Xml.SignedXml`.

> **Important:**
> A `System.Security.Cryptography.Xml.SignedXml` instance is intended for a single verification. Do not call `System.Security.Cryptography.Xml.SignedXml.CheckSignature*` more than once on the same instance, and do not reuse an instance that was used for signing. Reusing an instance might produce incorrect results. Create a new `System.Security.Cryptography.Xml.SignedXml` for each verification.

The code example in this procedure demonstrates how to verify an XML digital signature contained in a <`Signature`> element.  The example retrieves an RSA public key from a key container and then uses the key to verify the signature.

For information about how to create a digital signature that can be verified using this technique, see How to: Sign XML Documents with Digital Signatures.
