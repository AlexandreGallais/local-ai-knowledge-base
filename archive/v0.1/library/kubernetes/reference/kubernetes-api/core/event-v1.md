---
title: "Event (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/core/event-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Event

`apiVersion: v1`

`import "k8s.io/api/core/v1"`

## Event {#Event}

Event is a report of an event somewhere in the cluster.  Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data.

   | Field | Description

       | `action`string
       | What action was taken/failed regarding to the Regarding object.

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `count`integer
       | The number of times this event has occurred.

       | `eventTime`MicroTime
       | Time when this Event was first observed.

       | `firstTimestamp`Time
       | The time at which the event was first recorded. (Time of server receipt is in TypeMeta.)

       | `involvedObject` *ObjectReference
       | The object that this event is about.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `lastTimestamp`Time
       | The time at which the most recent occurrence of this event was recorded.

       | `message`string
       | A human-readable description of the status of this operation.

       | `metadata` *ObjectMeta
       | Standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `reason`string
       | This should be a short, machine understandable string that gives the reason for the transition into the object's current status.

       | `related`ObjectReference
       | Optional secondary object for more complex actions.

       | `reportingComponent`string
       | Name of the controller that emitted this Event, e.g. `kubernetes.io/kubelet`.

       | `reportingInstance`string
       | ID of the controller instance, e.g. `kubelet-xyzf`.

       | `series`EventSeries
       | Data about the Event series this event represents or nil if it's a singleton Event.

       | `source`EventSource
       | The component reporting this event. Should be a short machine understandable string.

       | `type`string
       | Type of this event (Normal, Warning), new types could be added in the future

## EventList {#EventList}

EventList is a list of events.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Event array
       | List of events

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | Standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

## EventSeries {#EventSeries}

EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time.

   | Field | Description

       | `count`integer
       | Number of occurrences in this series up to the last heartbeat time

       | `lastObservedTime`MicroTime
       | Time of the last occurrence observed
