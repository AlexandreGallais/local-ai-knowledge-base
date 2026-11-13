---
title: "Common Expression Language in Kubernetes (part 1 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/cel.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Common Expression Language in Kubernetes

The Common Expression Language (CEL) is used
in the Kubernetes API to declare validation rules, policy rules, and other
constraints or conditions.

CEL expressions are evaluated directly in the
API server, making CEL a
convenient alternative to out-of-process mechanisms, such as webhooks, for many
extensibility use cases. Your CEL expressions continue to execute so long as the
control plane's API server component remains available.

## Language overview

The CEL language
has a straightforward syntax that is similar to the expressions in C, C++, Java,
JavaScript and Go.

CEL was designed to be embedded into applications. Each CEL "program" is a
single expression that evaluates to a single value. CEL expressions are
typically short "one-liners" that inline well into the string fields of Kubernetes
API resources.

Inputs to a CEL program are "variables". Each Kubernetes API field that contains
CEL declares in the API documentation which variables are available to use for
that field. For example, in the `x-kubernetes-validations[i].rules` field of
CustomResourceDefinitions, the `self` and `oldSelf` variables are available and
refer to the previous and current state of the custom resource data to be
validated by the CEL expression. Other Kubernetes API fields may declare
different variables. See the API documentation of the API fields to learn which
variables are available for that field.

Example CEL expressions:

Examples of CEL expressions and the purpose of each

   | Rule
   | Purpose

   | <tt>self.minReplicas <= self.replicas && self.replicas <= self.maxReplicas</tt>
   | Validate that the three fields defining replicas are ordered appropriately

   | <tt>'Available' in self.stateCounts</tt>
   | Validate that an entry with the 'Available' key <example-value> in a map

   | <tt>(self.list1.size() == 0) != (self.list2.size() == 0)</tt>
   | Validate that one of two lists is non-empty, but not both

   | <tt>self.envars.filter(e, e.name = 'MY_ENV').all(e, e.value.matches('^[a-zA-Z]*$'))</tt>
   | Validate the 'value' field of a listMap entry where key field 'name' is 'MY_ENV'

   | <tt>has(self.expired) && self.created + self.ttl < self.expired</tt>
   | Validate that 'expired' date is after a 'create' date plus a 'ttl' duration

   | <tt>self.health.startsWith('ok')</tt>
   | Validate a 'health' string field has the prefix 'ok'

   | <tt>self.widgets.exists(w, w.key == 'x' && w.foo < 10)</tt>
   | Validate that the 'foo' property of a listMap item with a key 'x' is less than 10

   | <tt>type(self) == string ? self == '99%' : self == 42</tt>
   | Validate an int-or-string field for both the int and string cases

   | <tt>self.metadata.name == 'singleton'</tt>
   | Validate that an object's name matches a specific value (making it a singleton)

   | <tt>self.set1.all(e, !(e in self.set2))</tt>
   | Validate that two listSets are disjoint

   | <tt>self.names.size() == self.details.size() && self.names.all(n, n in self.details)</tt>
   | Validate the 'details' map is keyed by the items in the 'names' listSet

   | <tt>self.details.all(key, key.matches('^[a-zA-Z]*$'))</tt>
   | Validate the keys of the 'details' map

   | <tt>self.details.all(key, self.details[key].matches('^[a-zA-Z]*$'))</tt>
   | Validate the values of the 'details' map

## CEL options, language features, and libraries

CEL is configured with the following options, libraries and language features,
introduced at the specified Kubernetes versions:

   | CEL option, library or language feature
   | Included
   | Availability

   | Standard macros
   | `has`, `all`, `exists`, `exists_one`, `map`, `filter`
   | All Kubernetes versions

   | Standard functions
   | See

      official list of standard definitions

   | All Kubernetes versions

   |

      Homogeneous Aggregate Literals

   | -
   | All Kubernetes versions

   | Default UTC Time Zone
   | -
   | All Kubernetes versions

   |

      Eagerly Validate Declarations

   | -
   | All Kubernetes versions

   | Extended strings library, Version 1
   |
    `charAt`, `indexOf`, `lastIndexOf`, `lowerAscii`,
    `upperAscii`, `replace`, `split`, `join`, `substring`,
    `trim`

   | Kubernetes versions between 1.25 and 1.30

   | Extended strings library, Version 2
   |
    `charAt`, `indexOf`, `lastIndexOf`, `lowerAscii`,
    `upperAscii`, `replace`, `split`, `join`, `substring`,
    `trim`

   | Kubernetes versions 1.30+

   | Kubernetes list library
   | See

      Kubernetes list library

   | All Kubernetes versions

   | Kubernetes regex library
   | See

      Kubernetes regex library

   | All Kubernetes versions

   | Kubernetes URL library
   | See

      Kubernetes URL library

   | All Kubernetes versions

   | Kubernetes IP address library
   | See

      Kubernetes IP address library

   | Kubernetes versions 1.31+

   | Kubernetes CIDR library
   | See

      Kubernetes CIDR library

   | Kubernetes versions 1.31+

   | Kubernetes authorizer library
   | See

      Kubernetes authorizer library

   | All Kubernetes versions

   | Kubernetes quantity library
   | See

      Kubernetes quantity library

   | Kubernetes versions 1.29+

   | Kubernetes semver library
   | See

      Kubernetes semver library

   | Kubernetes versions 1.34+

   | Kubernetes format library
   | See

      Kubernetes format library

   | Kubernetes versions 1.32+

   | CEL optional types
   | See

      CEL optional types

   | Kubernetes versions 1.29+

   | CEL CrossTypeNumericComparisons
   | See

      CEL CrossTypeNumericComparisons

   | Kubernetes versions 1.29+

   | CEL TwoVarComprehensions
   | See

      CEL TwoVarComprehensions

   | Kubernetes versions 1.33+

CEL functions, features and language settings support Kubernetes control plane
rollbacks. For example, _CEL Optional Values_ was introduced at Kubernetes 1.29
and so only API servers at that version or newer will accept write requests to
CEL expressions that use _CEL Optional Values_. However, when a cluster is
rolled back to Kubernetes 1.28 CEL expressions using "CEL Optional Values" that
are already stored in API resources will continue to evaluate correctly.
