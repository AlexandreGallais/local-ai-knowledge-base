---
title: "ContactAddress: toJSON() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/contactaddress/tojson/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# ContactAddress: toJSON() method

The **`toJSON()`** method of the `ContactAddress` interface returns a JSON-serializable plain object representing the `ContactAddress` object.

The method is automatically called by `JSON.stringify()` when a `ContactAddress` object is encountered during JSON serialization.

## Syntax

```js
toJSON()
```

### Parameters

None.

### Return value

A JSON-serializable plain object containing the following properties:

- `country`
- `addressLine`
- `region`
- `city`
- `dependentLocality`
- `postalCode`
- `sortingCode`
- `organization`
- `recipient`
- `phone`

Each property's value is copied as-is.

## Examples

### Calling toJSON() directly

Given a `ContactAddress` object named `address`, calling `toJSON()` directly returns a plain object. Its properties have the same values as the corresponding properties of the original object.

```js
const json = address.toJSON();
console.log(json); // A plain object
console.log(typeof json); // "object"
console.log(json.country); // Same value as address.country
```

### Serializing to a JSON string

The `ContactAddress` object is serialized using `JSON.stringify()`, which calls the `toJSON()` method automatically.

```js
console.log(JSON.stringify(address));
```

This would log a JSON string like so (formatted for readability):

```json
{
  "country": "US",
  "addressLine": ["123 Main Street"],
  "region": "CA",
  "city": "San Francisco",
  "dependentLocality": "",
  "postalCode": "94105",
  "sortingCode": "",
  "organization": "",
  "recipient": "Alex Smith",
  "phone": ""
}
```
