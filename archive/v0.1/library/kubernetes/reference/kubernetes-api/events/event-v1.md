---
title: "Event (part 1 of 8)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/events/event-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Event

`apiVersion: events.k8s.io/v1`

`import "k8s.io/api/events/v1"`

## Event {#Event}

Event is a report of an event somewhere in the cluster. It generally denotes some state change in the system. Events have a limited retention time and triggers and messages may evolve with time.  Event consumers should not rely on the timing of an event with a given Reason reflecting a consistent underlying trigger, or the continued existence of events with that Reason.  Events should be treated as informative, best-effort, supplemental data.

   | Field | Description

       | `action`string
       | action is what action was taken/failed regarding to the regarding object. It is machine-readable. This field cannot be empty for new Events and it can have at most 128 characters.

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `deprecatedCount`integer
       | deprecatedCount is the deprecated field assuring backward compatibility with core.v1 Event type.

       | `deprecatedFirstTimestamp`Time
       | deprecatedFirstTimestamp is the deprecated field assuring backward compatibility with core.v1 Event type.

       | `deprecatedLastTimestamp`Time
       | deprecatedLastTimestamp is the deprecated field assuring backward compatibility with core.v1 Event type.

       | `deprecatedSource`EventSource
       | deprecatedSource is the deprecated field assuring backward compatibility with core.v1 Event type.

       | `eventTime` *MicroTime
       | eventTime is the time when this Event was first observed. It is required.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | metadata is the standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `note`string
       | note is a human-readable description of the status of this operation. Maximal length of the note is 1kB, but libraries should be prepared to handle values up to 64kB.

       | `reason`string
       | reason is why the action was taken. It is human-readable. This field cannot be empty for new Events and it can have at most 128 characters.

       | `regarding`ObjectReference
       | regarding contains the object this Event is about. In most cases it's an Object reporting controller implements, e.g. ReplicaSetController implements ReplicaSets and this event is emitted because it acts on some changes in a ReplicaSet object.

       | `related`ObjectReference
       | related is the optional secondary object for more complex actions. E.g. when regarding object triggers a creation or deletion of related object.

       | `reportingController`string
       | reportingController is the name of the controller that emitted this Event, e.g. `kubernetes.io/kubelet`. This field cannot be empty for new Events.

       | `reportingInstance`string
       | reportingInstance is the ID of the controller instance, e.g. `kubelet-xyzf`. This field cannot be empty for new Events and it can have at most 128 characters.

       | `series`EventSeries
       | series is data about the Event series this event represents or nil if it's a singleton Event.

       | `type`string
       | type is the type of this event (Normal, Warning), new types could be added in the future. It is machine-readable. This field cannot be empty for new Events.

## EventList {#EventList}

EventList is a list of Event objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *Event array
       | items is a list of schema objects.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | metadata is the standard list metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## EventSeries {#EventSeries}

EventSeries contain information on series of events, i.e. thing that was/is happening continuously for some time. How often to update the EventSeries is up to the event reporters. The default event reporter in &#34;k8s.io/client-go/tools/events/event_broadcaster.go&#34; shows how this struct is updated on heartbeats and can guide customized reporter implementations.

   | Field | Description

       | `count` *integer
       | count is the number of occurrences in this series up to the last heartbeat time.

       | `lastObservedTime` *MicroTime
       | lastObservedTime is the time when last Event from the series was seen before last heartbeat.
