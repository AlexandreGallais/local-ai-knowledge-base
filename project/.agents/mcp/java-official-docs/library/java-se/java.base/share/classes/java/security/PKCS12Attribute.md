---
title: "PKCS12Attribute class (java.security)"
tool: "java-se"
version: "25"
source: "https://github.com/openjdk/jdk/blob/6c48f4ed707bf0b15f9b6098de30db8aae6fa40f/src/java.base/share/classes/java/security/PKCS12Attribute.java"
commit: "6c48f4ed707bf0b15f9b6098de30db8aae6fa40f"
license: "GPL-2.0-only WITH Classpath-exception-2.0"
---

# PKCS12Attribute class (java.security)

```java
public final class PKCS12Attribute implements KeyStore.Entry.Attribute
```

An attribute associated with a PKCS12 keystore entry.
The attribute name is an ASN.1 Object Identifier and the attribute
value is a set of ASN.1 types.

**Since:** 1.8

## PKCS12Attribute.PKCS12Attribute(String, String)

```java
public PKCS12Attribute(String name, String value)
```

Constructs a PKCS12 attribute from its name and value.
The name is an ASN.1 Object Identifier represented as a list of
dot-separated integers.
A string value is represented as the string itself.
A binary value is represented as a string of colon-separated
pairs of hexadecimal digits.
Multivalued attributes are represented as a comma-separated
list of values, enclosed in square brackets. See
`Arrays.toString(java.lang.Object[])`.

A string value will be DER-encoded as an ASN.1 UTF8String and a
binary value will be DER-encoded as an ASN.1 Octet String.

Parameters:

- `name`: the attribute's identifier
- `value`: the attribute's value

Throws:

- `NullPointerException`: if `name` or `value` is `null`
- `IllegalArgumentException`: if `name` or `value` is incorrectly formatted

## PKCS12Attribute.PKCS12Attribute(byte[])

```java
public PKCS12Attribute(byte[] encoded)
```

Constructs a PKCS12 attribute from its ASN.1 DER encoding.
The DER encoding is specified by the following ASN.1 definition:

```java
Attribute ::= SEQUENCE {
    type   AttributeType,
    values SET OF AttributeValue
}
AttributeType ::= OBJECT IDENTIFIER
AttributeValue ::= ANY defined by type
```

Parameters:

- `encoded`: the attribute's ASN.1 DER encoding. It is cloned to prevent subsequent modification.

Throws:

- `NullPointerException`: if `encoded` is `null`
- `IllegalArgumentException`: if `encoded` is incorrectly formatted

## PKCS12Attribute.getName()

```java
public String getName()
```

Returns the attribute's ASN.1 Object Identifier represented as a
list of dot-separated integers.

**Returns:** the attribute's identifier

## PKCS12Attribute.getValue()

```java
public String getValue()
```

Returns the attribute's ASN.1 DER-encoded value as a string.
An ASN.1 DER-encoded value is returned in one of the following
`String` formats:

-  the DER encoding of a basic ASN.1 type that has a natural
     string representation is returned as the string itself.
     Such types are currently limited to BOOLEAN, INTEGER,
     OBJECT IDENTIFIER, UTCTime, GeneralizedTime and the
     following six ASN.1 string types: UTF8String,
     PrintableString, T61String, IA5String, BMPString and
     GeneralString.

-  the DER encoding of any other ASN.1 type is not decoded but
     returned as a binary string of colon-separated pairs of
     hexadecimal digits.

Multivalued attributes are represented as a comma-separated
list of values, enclosed in square brackets. See
`Arrays.toString(java.lang.Object[])`.

**Returns:** the attribute value's string encoding

## PKCS12Attribute.getEncoded()

```java
public byte[] getEncoded()
```

Returns the attribute's ASN.1 DER encoding.

**Returns:** a clone of the attribute's DER encoding

## PKCS12Attribute.equals(Object)

```java
public boolean equals(Object obj)
```

Compares this `PKCS12Attribute` and a specified object for
equality.

Parameters:

- `obj`: the comparison object

**Returns:** true if `obj` is a `PKCS12Attribute` and
their DER encodings are equal.

## PKCS12Attribute.hashCode()

```java
public int hashCode()
```

The hash code is computed from its DER encoding.

## PKCS12Attribute.toString()

```java
public String toString()
```

Returns a string representation of this `PKCS12Attribute`.

**Returns:** a name/value pair separated by an 'equals' symbol
