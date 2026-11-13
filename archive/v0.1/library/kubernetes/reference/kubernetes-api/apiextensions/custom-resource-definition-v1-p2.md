---
title: "CustomResourceDefinition (part 2 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/apiextensions/custom-resource-definition-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# CustomResourceDefinition (part 2 of 8)

## CustomResourceSubresources {#CustomResourceSubresources}

CustomResourceSubresources defines the status and scale subresources for CustomResources.

   | Field | Description

       | `scale`CustomResourceSubresourceScale
       | scale indicates the custom resource should serve a `/scale` subresource that returns an `autoscaling/v1` Scale object.

       | `status`CustomResourceSubresourceStatus
       | status indicates the custom resource should serve a `/status` subresource. When enabled: 1. requests to the custom resource primary endpoint ignore changes to the `status` stanza of the object. 2. requests to the custom resource `/status` subresource ignore changes to anything other than the `status` stanza of the object.

## CustomResourceValidation {#CustomResourceValidation}

CustomResourceValidation is a list of validation methods for CustomResources.

   | Field | Description

       | `openAPIV3Schema`JSONSchemaProps
       | openAPIV3Schema is the OpenAPI v3 schema to use for validation and pruning.

## ExternalDocumentation {#ExternalDocumentation}

ExternalDocumentation allows referencing an external resource for extended documentation.

   | Field | Description

       | `description`string
       |

       | `url`string
       |

## JSON {#JSON}

JSON represents any valid JSON value. These types are supported: bool, int64, float64, string, []interface{}, map[string]interface{} and nil.

## JSONSchemaProps {#JSONSchemaProps}

JSONSchemaProps is a JSON-Schema following Specification Draft 4 (http://json-schema.org/).

   | Field | Description

       | `$ref`string
       |

       | `$schema`string
       |

       | `additionalItems`JSONSchemaPropsOrBool
       |

       | `additionalProperties`JSONSchemaPropsOrBool
       |

       | `allOf`JSONSchemaProps array
       |

       | `anyOf`JSONSchemaProps array
       |

       | `default`JSON
       | default is a default value for undefined object fields. Defaulting is a beta feature under the CustomResourceDefaulting feature gate. Defaulting requires spec.preserveUnknownFields to be false.

       | `definitions`object
       |

       | `dependencies`object
       |

       | `description`string
       |

       | `enum`JSON array
       |

       | `example`JSON
       |

       | `exclusiveMaximum`boolean
       |

       | `exclusiveMinimum`boolean
       |

       | `externalDocs`ExternalDocumentation
       |

       | `format`string
       | format is an OpenAPI v3 format string. Unknown formats are ignored. The following formats are validated:  - bsonobjectid: a bson object ID, i.e. a 24 characters hex string - uri: an URI as parsed by Golang net/url.ParseRequestURI - email: an email address as parsed by Golang net/mail.ParseAddress - hostname: a valid representation for an Internet host name, as defined by RFC 1034, section 3.1 [RFC1034]. - ipv4: an IPv4 IP as parsed by Golang net.ParseIP - ipv6: an IPv6 IP as parsed by Golang net.ParseIP - cidr: a CIDR as parsed by Golang net.ParseCIDR - mac: a MAC address as parsed by Golang net.ParseMAC - uuid: an UUID that allows uppercase defined by the regex (?i)^[0-9a-f]{8}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{4}-?[0-9a-f]{12}$ - uuid3: an UUID3 that allows uppercase defined by the regex (?i)^[0-9a-f]{8}-?[0-9a-f]{4}-?3[0-9a-f]{3}-?[0-9a-f]{4}-?[0-9a-f]{12}$ - uuid4: an UUID4 that allows uppercase defined by the regex (?i)^[0-9a-f]{8}-?[0-9a-f]{4}-?4[0-9a-f]{3}-?89ab{3}-?[0-9a-f]{12}$ - uuid5: an UUID5 that allows uppercase defined by the regex (?i)^[0-9a-f]{8}-?[0-9a-f]{4}-?5[0-9a-f]{3}-?89ab{3}-?[0-9a-f]{12}$ - isbn: an ISBN10 or ISBN13 number string like "<example-value>" or "<example-value>" - isbn10: an ISBN10 number string like "<example-value>" - isbn13: an ISBN13 number string like "<example-value>" - creditcard: a credit card number defined by the regex ^(?:4[0-9]{12}(?:[0-9]{3})?|51-5{14}|6(?:011|50-9)[0-9]{12}|347{13}|3(?:0[0-5]|68)[0-9]{11}|(?:2131|1800|35\\d{3})\\d{11})$ with any non digit characters mixed in - ssn: a U.S. social security number following the regex ^\\d{3}[- ]?\\d{2}[- ]?\\d{4}$ - hexcolor: an hexadecimal color code like "<example-value>"rgb(255,255,2559"<example-value>"2006-01-02"<example-value>"22 ns"<example-value>"2014-12-15T19:30:20.000Z" as defined by date-time in RFC3339.

       | `id`string
       |

       | `items`JSONSchemaPropsOrArray
       |

       | `maxItems`integer
       |

       | `maxLength`integer
       |

       | `maxProperties`integer
       |

       | `maximum`number
       |

       | `minItems`integer
       |

       | `minLength`integer
       |

       | `minProperties`integer
       |

       | `minimum`number
       |

       | `multipleOf`number
       |

       | `not`JSONSchemaProps
       |

       | `nullable`boolean
       |

       | `oneOf`JSONSchemaProps array
       |

       | `pattern`string
       |

       | `patternProperties`object
       |

       | `properties`object
       |

       | `required`string array
       |

       | `title`string
       |

       | `type`string
       |

       | `uniqueItems`boolean
       |

       | `x-kubernetes-embedded-resource`boolean
       | x-kubernetes-embedded-resource defines that the value is an embedded Kubernetes runtime.Object, with TypeMeta and ObjectMeta. The type must be object. It is allowed to further restrict the embedded object. kind, apiVersion and metadata are validated automatically. x-kubernetes-preserve-unknown-fields is allowed to be true, but does not have to be if the object is fully specified (up to kind, apiVersion, metadata).

       | `x-kubernetes-int-or-string`boolean
       | x-kubernetes-int-or-string specifies that this value is either an integer or a string. If this is true, an empty type is allowed and type as child of anyOf is permitted if following one of the following patterns:  1) anyOf:    - type: integer    - type: string 2) allOf:    - anyOf:      - type: integer      - type: string    - ... zero or more

       | `x-kubernetes-list-map-keys`string array
       | x-kubernetes-list-map-keys annotates an array with the x-kubernetes-list-type `map` by specifying the keys used as the index of the map.  This tag MUST only be used on lists that have the "x-kubernetes-list-type" extension set to "map". Also, the values specified for this attribute must be a scalar typed field of the child structure (no nesting is supported).  The properties specified must either be required or have a default value, to ensure those properties are present for all list items.

       | `x-kubernetes-list-type`string
       | x-kubernetes-list-type annotates an array to further describe its topology. This extension must only be used on lists and may have 3 possible values:  1) `atomic`: the list is treated as a single entity, like a scalar.      Atomic lists will be entirely replaced when updated. This extension      may be used on any type of list (struct, scalar, ...). 2) `set`:      Sets are lists that must not have multiple items with the same value. Each      value must be a scalar, an object with x-kubernetes-map-type `atomic` or an      array with x-kubernetes-list-type `atomic`. 3) `map`:      These lists are like maps in that their elements have a non-index key      used to identify them. Order is preserved upon merge. The map tag      must only be used on a list with elements of type object. Defaults to atomic for arrays.

       | `x-kubernetes-map-type`string
       | x-kubernetes-map-type annotates an object to further describe its topology. This extension must only be used when type is object and may have 2 possible values:  1) `granular`:      These maps are actual maps (key-value pairs) and each fields are independent      from each other (they can each be manipulated by separate actors). This is      the default behaviour for all maps. 2) `atomic`: the list is treated as a single entity, like a scalar.      Atomic maps will be entirely replaced when updated.

       | `x-kubernetes-preserve-unknown-fields`boolean
       | x-kubernetes-preserve-unknown-fields stops the API server decoding step from pruning fields which are not specified in the validation schema. This affects fields recursively, but switches back to normal pruning behaviour if nested properties or additionalProperties are specified in the schema. This can either be true or undefined. False is forbidden.

       | `x-kubernetes-validations`ValidationRule arraypatch strategy: merge on key `rule`
       | x-kubernetes-validations describes a list of validation rules written in the CEL expression language.

## JSONSchemaPropsOrArray {#JSONSchemaPropsOrArray}

JSONSchemaPropsOrArray represents a value that can either be a JSONSchemaProps or an array of JSONSchemaProps. Mainly here for serialization purposes.

## JSONSchemaPropsOrBool {#JSONSchemaPropsOrBool}

JSONSchemaPropsOrBool represents JSONSchemaProps or a boolean value. Defaults to true for the boolean property.

## SelectableField {#SelectableField}

SelectableField specifies the JSON path of a field that may be used with field selectors.

   | Field | Description

       | `jsonPath` *string
       | jsonPath is a simple JSON path which is evaluated against each custom resource to produce a field selector value. Only JSON paths without the array notation are allowed. Must point to a field of type string, boolean or integer. Types with enum values and strings with formats are allowed. If jsonPath refers to absent field in a resource, the jsonPath evaluates to an empty string. Must not point to metdata fields. Required.

## ServiceReference {#ServiceReference}

ServiceReference holds a reference to Service.legacy.k8s.io

   | Field | Description

       | `name` *string
       | name is the name of the service. Required

       | `namespace` *string
       | namespace is the namespace of the service. Required

       | `path`string
       | path is an optional URL path at which the webhook will be contacted.

       | `port`integer
       | port is an optional service port at which the webhook will be contacted. `port` should be a valid port number (1-65535, inclusive). Defaults to 443 for backward compatibility.
