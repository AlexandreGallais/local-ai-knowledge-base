---
title: "Kubernetes Deprecation Policy (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/deprecation-policy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Kubernetes Deprecation Policy

This document details the deprecation policy for various facets of the system.

Kubernetes is a large system with many components and many contributors. As
with any such software, the feature set naturally evolves over time, and
sometimes a feature may need to be removed. This could include an API, a flag,
or even an entire feature. To avoid breaking existing users, Kubernetes follows
a deprecation policy for aspects of the system that are slated to be removed.

## Deprecating parts of the API

Since Kubernetes is an API-driven system, the API has evolved over time to
reflect the evolving understanding of the problem space. The Kubernetes API is
actually a set of APIs, called "API groups", and each API group is
independently versioned. API versions fall
into 3 main tracks, each of which has different policies for deprecation:

| Example  | Track                            |
|----------|----------------------------------|
| v1       | GA (generally available, stable) |
| v1beta1  | Beta (pre-release)               |
| v1alpha1 | Alpha (experimental)             |

A given release of Kubernetes can support any number of API groups and any
number of versions of each.

The following rules govern the deprecation of elements of the API. This
includes:

* REST resources (aka API objects)
* Fields of REST resources
* Annotations on REST resources, including "beta" annotations but not
  including "alpha" annotations.
* Enumerated or constant values
* Component config structures

These rules are enforced between official releases, not between
arbitrary commits to master or release branches.

**Rule #1: API elements may only be removed by incrementing the version of the
API group.**

Once an API element has been added to an API group at a particular version, it
can not be removed from that version or have its behavior significantly
changed, regardless of track.

**Note:**
For historical reasons, there are 2 "monolithic" API groups - "core" (no
group name) and "extensions". Resources will incrementally be moved from these
legacy API groups into more domain-specific API groups.

**Rule #2: API objects must be able to round-trip between API versions in a given
release without information loss, with the exception of whole REST resources
that do not exist in some versions.**

For example, an object can be written as v1 and then read back as v2 and
converted to v1, and the resulting v1 resource will be identical to the
original. The representation in v2 might be different from v1, but the system
knows how to convert between them in both directions. Additionally, any new
field added in v2 must be able to round-trip to v1 and back, which means v1
might have to add an equivalent field or represent it as an annotation.

**Rule #3: An API version in a given track may not be deprecated in favor of a less stable API version.**

* GA API versions can replace beta and alpha API versions.
* Beta API versions can replace earlier beta and alpha API versions, but *may not* replace GA API versions.
* Alpha API versions can replace earlier alpha API versions, but *may not* replace GA or beta API versions.

**Rule #4a: API lifetime is determined by the API stability level**

* GA API versions may be marked as deprecated, but must not be removed within a major version of Kubernetes
* Beta API versions are deprecated no more than 9 months or 3 minor releases after introduction (whichever is longer),
  and are no longer served 9 months or 3 minor releases after deprecation (whichever is longer)
* Alpha API versions may be removed in any release without prior deprecation notice

This ensures beta API support covers the maximum supported version skew of 2 releases,
and that APIs don't stagnate on unstable beta versions, accumulating production usage that will be
disrupted when support for the beta API ends.

**Note:**
There are no current plans for a major version revision of Kubernetes that removes GA APIs.

**Note:**
Until #52185 is
resolved, no API versions that have been persisted to storage may be removed.
Serving REST endpoints for those versions may be disabled (subject to the
deprecation timelines in this document), but the API server must remain capable
of decoding/converting previously persisted data from storage.

**Rule #4b: The "preferred" API version and the "storage version" for a given
group may not advance until after a release has been made that supports both the
new version and the previous version**

Users must be able to upgrade to a new release of Kubernetes and then roll back
to a previous release, without converting anything to the new API version or
suffering breakages (unless they explicitly used features only available in the
newer version). This is particularly evident in the stored representation of
objects.

All of this is best illustrated by examples. Imagine a Kubernetes release,
version X, which introduces a new API group. A new Kubernetes release is made
every approximately 4 months (3 per year). The following table describes which
API versions are supported in a series of subsequent releases.

       | Release
       | API Versions
       | Preferred/Storage Version
       | Notes

       | X
       | v1alpha1
       | v1alpha1
       |

       | X+1
       | v1alpha2
       | v1alpha2
       |

           v1alpha1 is removed. See release notes for required actions.

       | X+2
       | v1beta1
       | v1beta1
       |

          v1alpha2 is removed. See release notes for required actions.

       | X+3
       | v1beta2, v1beta1 (deprecated)
       | v1beta1
       |

          v1beta1 is deprecated. See release notes for required actions.

       | X+4
       | v1beta2, v1beta1 (deprecated)
       | v1beta2
       |

       | X+5
       | v1, v1beta1 (deprecated), v1beta2 (deprecated)
       | v1beta2
       |

          v1beta2 is deprecated. See release notes for required actions.

       | X+6
       | v1, v1beta2 (deprecated)
       | v1
       |

          v1beta1 is removed. See release notes for required actions.

       | X+7
       | v1, v1beta2 (deprecated)
       | v1
       |

       | X+8
       | v2alpha1, v1
       | v1
       |

          v1beta2 is removed. See release notes for required actions.

       | X+9
       | v2alpha2, v1
       | v1
       |

           v2alpha1 is removed. See release notes for required actions.

       | X+10
       | v2beta1, v1
       | v1
       |

          v2alpha2 is removed. See release notes for required actions.

       | X+11
       | v2beta2, v2beta1 (deprecated), v1
       | v1
       |

          v2beta1 is deprecated. See release notes for required actions.

       | X+12
       | v2, v2beta2 (deprecated), v2beta1 (deprecated), v1 (deprecated)
       | v1
       |

          v2beta2 is deprecated. See release notes for required actions.
          v1 is deprecated in favor of v2, but will not be removed

       | X+13
       | v2, v2beta1 (deprecated), v2beta2 (deprecated), v1 (deprecated)
       | v2
       |

       | X+14
       | v2, v2beta2 (deprecated), v1 (deprecated)
       | v2
       |

          v2beta1 is removed. See release notes for required actions.

       | X+15
       | v2, v1 (deprecated)
       | v2
       |

          v2beta2 is removed. See release notes for required actions.

### REST resources (aka API objects)

Consider a hypothetical REST resource named Widget, which was present in API v1
in the above timeline, and which needs to be deprecated. We document and
announce the
deprecation in sync with release X+1. The Widget resource still exists in API
version v1 (deprecated) but not in v2alpha1. The Widget resource continues to
exist and function in releases up to and including X+8. Only in release X+9,
when API v1 has aged out, does the Widget resource cease to exist, and the
behavior get removed.

Starting in Kubernetes v1.19, making an API request to a deprecated REST API endpoint:

1. Returns a `Warning` header
   (as defined in RFC7234, Section 5.5) in the API response.
1. Adds a `"k8s.io/deprecated":"true"` annotation to the
   audit event recorded for the request.
1. Sets an `apiserver_requested_deprecated_apis` gauge metric to `1` in the `kube-apiserver`
   process. The metric has labels for `group`, `version`, `resource`, `subresource` that can be joined
   to the `apiserver_request_total` metric, and a `removed_release` label that indicates the
   Kubernetes release in which the API will no longer be served. The following Prometheus query
   returns information about requests made to deprecated APIs which will be removed in v1.22:

   ```promql
   apiserver_requested_deprecated_apis{removed_release="1.22"} * on(group,version,resource,subresource) group_right() apiserver_request_total
   ```

### Fields of REST resources

As with whole REST resources, an individual field which was present in API v1
must exist and function until API v1 is removed. Unlike whole resources, the
v2 APIs may choose a different representation for the field, as long as it can
be round-tripped. For example a v1 field named "magnitude" which was
deprecated might be named "deprecatedMagnitude" in API v2. When v1 is
eventually removed, the deprecated field can be removed from v2.

### Enumerated or constant values

As with whole REST resources and fields thereof, a constant value which was
supported in API v1 must exist and function until API v1 is removed.

### Component config structures

Component configs are versioned and managed similar to REST resources.

### Future work

Over time, Kubernetes will introduce more fine-grained API versions, at which
point these rules will be adjusted as needed.

## Deprecating a flag or CLI

The Kubernetes system is comprised of several different programs cooperating.
Sometimes, a Kubernetes release might remove flags or CLI commands
(collectively "CLI elements") in these programs. The individual programs
naturally sort into two main groups - user-facing and admin-facing programs,
which vary slightly in their deprecation policies. Unless a flag is explicitly
prefixed or documented as "alpha" or "beta", it is considered GA.

CLI elements are effectively part of the API to the system, but since they are
not versioned in the same way as the REST API, the rules for deprecation are as
follows:

**Rule #5a: CLI elements of user-facing components (e.g. kubectl) must function
after their announced deprecation for no less than:**

* **GA: 12 months or 2 releases (whichever is longer)**
* **Beta: 3 months or 1 release (whichever is longer)**
* **Alpha: 0 releases**

**Rule #5b: CLI elements of admin-facing components (e.g. kubelet) must function
after their announced deprecation for no less than:**

* **GA: 6 months or 1 release (whichever is longer)**
* **Beta: 3 months or 1 release (whichever is longer)**
* **Alpha: 0 releases**

**Rule #5c: Command line interface (CLI) elements cannot be deprecated in favor of
less stable CLI elements**

Similar to the Rule #3 for APIs, if an element of a command line interface is being replaced with an
alternative implementation, such as by renaming an existing element, or by switching to
use configuration sourced from a file
instead of a command line argument, that recommended alternative must be of
the same or higher stability level.

**Rule #6: Deprecated CLI elements must emit warnings (optionally disable)
when used.**
