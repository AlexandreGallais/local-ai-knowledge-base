---
title: "Extension interface (java.security.cert)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/cert/Extension.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# Extension interface (java.security.cert)

```java
public interface Extension
```

This interface represents an X.509 extension.

Extensions provide a means of associating additional attributes with users
or public keys and for managing a certification hierarchy.  The extension
format also allows communities to define private extensions to carry
information unique to those communities.

Each extension contains an object identifier, a criticality setting
indicating whether it is a critical or a non-critical extension, and
an ASN.1 DER-encoded value. Its ASN.1 definition is:

```java
    Extension ::= SEQUENCE {
        extnId        OBJECT IDENTIFIER,
        critical      BOOLEAN DEFAULT FALSE,
        extnValue     OCTET STRING
                -- contains a DER encoding of a value
                -- of the type registered for use with
                -- the extnId object identifier value
```

This interface is designed to provide access to a single extension,
unlike `java.security.cert.X509Extension` which is more suitable
for accessing a set of extensions.

**Since:** 1.7

## Extension.getId()

```java
String getId()
```

Gets the extensions's object identifier.

**Returns:** the object identifier as a String

## Extension.isCritical()

```java
boolean isCritical()
```

Gets the extension's criticality setting.

**Returns:** true if this is a critical extension.

## Extension.getValue()

```java
byte[] getValue()
```

Gets the extensions's DER-encoded value. Note, this is the bytes
that are encoded as an OCTET STRING. It does not include the OCTET
STRING tag and length.

**Returns:** a copy of the extension's value, or `null` if no
   extension value is present.

## Extension.encode(OutputStream)

```java
void encode(OutputStream out) throws IOException
```

Generates the extension's DER encoding and writes it to the output
stream.

Parameters:

- `out`: the output stream

Throws:

- `IOException`: on encoding or output error.
- `NullPointerException`: if `out` is `null`.
