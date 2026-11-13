---
title: "API Priority and Fairness (part 1 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/cluster-administration/flow-control.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# API Priority and Fairness

**Feature state:** v1.29 [stable]

Controlling the behavior of the Kubernetes API server in an overload situation
is a key task for cluster administrators. The kube-apiserver has some controls available
(i.e. the `--max-requests-inflight` and `--max-mutating-requests-inflight`
command-line flags) to limit the amount of outstanding work that will be
accepted, preventing a flood of inbound requests from overloading and
potentially crashing the API server, but these flags are not enough to ensure
that the most important requests get through in a period of high traffic.

The API Priority and Fairness feature (APF) is an alternative that improves upon
aforementioned max-inflight limitations. APF classifies
and isolates requests in a more fine-grained way. It also introduces
a limited amount of queuing, so that no requests are rejected in cases
of very brief bursts. Requests are dispatched from queues using a
fair queuing technique so that, for example, a poorly-behaved
controller need not
starve others (even at the same priority level).

This feature is designed to work well with standard controllers, which
use informers and react to failures of API requests with exponential
back-off, and other clients that also work this way.

**Caution:**
Some requests classified as "long-running"—such as remote
command execution or log tailing—are not subject to the API
Priority and Fairness filter. This is also true for the
`--max-requests-inflight` flag without the API Priority and Fairness
feature enabled. API Priority and Fairness _does_ apply to **watch**
requests. When API Priority and Fairness is disabled, **watch** requests
are not subject to the `--max-requests-inflight` limit.

## Enabling/Disabling API Priority and Fairness

The API Priority and Fairness feature is controlled by a command-line flag
and is enabled by default. See
Options
for a general explanation of the available kube-apiserver command-line
options and how to enable and disable them. The name of the
command-line option for APF is "--enable-priority-and-fairness". This feature
also involves an API Group
with: (a) a stable `v1` version, introduced in 1.29, and
enabled by default (b) a `v1beta3` version, enabled by default, and
deprecated in v1.29. You can
disable the API group beta version `v1beta3` by adding the
following command-line flags to your `kube-apiserver` invocation:

```shell
kube-apiserver \
--runtime-config=flowcontrol.apiserver.k8s.io/v1beta3=false \
 # …and other flags as usual
```

The command-line flag `--enable-priority-and-fairness=false` will disable the
API Priority and Fairness feature.

## Recursive server scenarios

API Priority and Fairness must be used carefully in recursive server
scenarios. These are scenarios in which some server A, while serving
a request, issues a subsidiary request to some server B. Perhaps
server B might even make a further subsidiary call back to server
A. In situations where Priority and Fairness control is applied to
both the original request and some subsidiary ones(s), no matter how
deep in the recursion, there is a danger of priority inversions and/or
deadlocks.

One example of recursion is when the `kube-apiserver` issues an
admission webhook call to server B, and while serving that call,
server B makes a further subsidiary request back to the
`kube-apiserver`. Another example of recursion is when an `APIService`
object directs the `kube-apiserver` to delegate requests about a
certain API group to a custom external server B (this is one of the
things called "aggregation").

When the original request is known to belong to a certain priority
level, and the subsidiary controlled requests are classified to higher
priority levels, this is one possible solution. When the original
requests can belong to any priority level, the subsidiary controlled
requests have to be exempt from Priority and Fairness limitation. One
way to do that is with the objects that configure classification and
handling, discussed below. Another way is to disable Priority and
Fairness on server B entirely, using the techniques discussed above. A
third way, which is the simplest to use when server B is not
`kube-apiserver`, is to build server B with Priority and Fairness
disabled in the code.

## Concepts

There are several distinct features involved in the API Priority and Fairness
feature. Incoming requests are classified by attributes of the request using
_FlowSchemas_, and assigned to priority levels. Priority levels add a degree of
isolation by maintaining separate concurrency limits, so that requests assigned
to different priority levels cannot starve each other. Within a priority level,
a fair-queuing algorithm prevents requests from different _flows_ from starving
each other, and allows for requests to be queued to prevent bursty traffic from
causing failed requests when the average load is acceptably low.

### Priority Levels

Without APF enabled, overall concurrency in the API server is limited by the
`kube-apiserver` flags `--max-requests-inflight` and
`--max-mutating-requests-inflight`. With APF enabled, the concurrency limits
defined by these flags are summed and then the sum is divided up among a
configurable set of _priority levels_. Each incoming request is assigned to a
single priority level, and each priority level will only dispatch as many
concurrent requests as its particular limit allows.

The default configuration, for example, includes separate priority levels for
leader-election requests, requests from built-in controllers, and requests from
Pods. This means that an ill-behaved Pod that floods the API server with
requests cannot prevent leader election or actions by the built-in controllers
from succeeding.

The concurrency limits of the priority levels are periodically
adjusted, allowing under-utilized priority levels to temporarily lend
concurrency to heavily-utilized levels. These limits are based on
nominal limits and bounds on how much concurrency a priority level may
lend and how much it may borrow, all derived from the configuration
objects mentioned below.

### Seats Occupied by a Request

The above description of concurrency management is the baseline story.
Requests have different durations but are counted equally at any given
moment when comparing against a priority level's concurrency limit. In
the baseline story, each request occupies one unit of concurrency. The
word "seat" is used to mean one unit of concurrency, inspired by the
way each passenger on a train or aircraft takes up one of the fixed
supply of seats.

But some requests take up more than one seat. Some of these are **list**
requests that the server estimates will return a large number of
objects. These have been found to put an exceptionally heavy burden
on the server. For this reason, the server estimates the number of objects
that will be returned and considers the request to take a number of seats
that is proportional to that estimated number.

### Execution time tweaks for watch requests

API Priority and Fairness manages **watch** requests, but this involves a
couple more excursions from the baseline behavior. The first concerns
how long a **watch** request is considered to occupy its seat. Depending
on request parameters, the response to a **watch** request may or may not
begin with **create** notifications for all the relevant pre-existing
objects. API Priority and Fairness considers a **watch** request to be
done with its seat once that initial burst of notifications, if any,
is over.

The normal notifications are sent in a concurrent burst to all
relevant **watch** response streams whenever the server is notified of an
object create/update/delete. To account for this work, API Priority
and Fairness considers every write request to spend some additional
time occupying seats after the actual writing is done. The server
estimates the number of notifications to be sent and adjusts the write
request's number of seats and seat occupancy time to include this
extra work.

### Queuing

Even within a priority level there may be a large number of distinct sources of
traffic. In an overload situation, it is valuable to prevent one stream of
requests from starving others (in particular, in the relatively common case of a
single buggy client flooding the kube-apiserver with requests, that buggy client
would ideally not have much measurable impact on other clients at all). This is
handled by use of a fair-queuing algorithm to process requests that are assigned
the same priority level. Each request is assigned to a _flow_, identified by the
name of the matching FlowSchema plus a _flow distinguisher_ — which
is either the requesting user, the target resource's namespace, or nothing — and the
system attempts to give approximately equal weight to requests in different
flows of the same priority level.
To enable distinct handling of distinct instances, controllers that have
many instances should authenticate with distinct usernames

After classifying a request into a flow, the API Priority and Fairness
feature then may assign the request to a queue. This assignment uses
a technique known as shuffle sharding, which makes relatively efficient use of
queues to insulate low-intensity flows from high-intensity flows.

The details of the queuing algorithm are tunable for each priority level, and
allow administrators to trade off memory use, fairness (the property that
independent flows will all make progress when total traffic exceeds capacity),
tolerance for bursty traffic, and the added latency induced by queuing.

### Exempt requests

Some requests are considered sufficiently important that they are not subject to
any of the limitations imposed by this feature. These exemptions prevent an
improperly-configured flow control configuration from totally disabling an API
server.
