---
title: "PriorityLevelConfiguration (part 1 of 6)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/kubernetes-api/flowcontrol/priority-level-configuration-v1.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# PriorityLevelConfiguration

`apiVersion: flowcontrol.apiserver.k8s.io/v1`

`import "k8s.io/api/flowcontrol/v1"`

## PriorityLevelConfiguration {#PriorityLevelConfiguration}

PriorityLevelConfiguration represents the configuration of a priority level.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ObjectMeta
       | `metadata` is the standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

       | `spec` *PriorityLevelConfigurationSpec
       | `spec` is the specification of the desired behavior of a "request-priority". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

       | `status`PriorityLevelConfigurationStatus
       | `status` is the current status of a "request-priority". More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#spec-and-status

## PriorityLevelConfigurationSpec {#PriorityLevelConfigurationSpec}

PriorityLevelConfigurationSpec specifies the configuration of a priority level.

   | Field | Description

       | `exempt`ExemptPriorityLevelConfiguration
       | `exempt` specifies how requests are handled for an exempt priority level. This field MUST be empty if `type` is `"Limited"`. This field MAY be non-empty if `type` is `"Exempt"`. If empty and `type` is `"Exempt"` then the default values for `ExemptPriorityLevelConfiguration` apply.

       | `limited`LimitedPriorityLevelConfiguration
       | `limited` specifies how requests are handled for a Limited priority level. This field must be non-empty if and only if `type` is `"Limited"`.

       | `type` *string
       | `type` indicates whether this priority level is subject to limitation on request execution.  A value of `"Exempt"` means that requests of this priority level are not subject to a limit (and thus are never queued) and do not detract from the capacity made available to other priority levels.  A value of `"Limited"` means that (a) requests of this priority level _are_ subject to limits and (b) some of the server's limited capacity is made available exclusively to this priority level. Required.

## PriorityLevelConfigurationStatus {#PriorityLevelConfigurationStatus}

PriorityLevelConfigurationStatus represents the current state of a &#34;request-priority&#34;.

   | Field | Description

       | `conditions`PriorityLevelConfigurationCondition arraypatch strategy: merge on key `type`
       | `conditions` is the current state of "request-priority".

## PriorityLevelConfigurationList {#PriorityLevelConfigurationList}

PriorityLevelConfigurationList is a list of PriorityLevelConfiguration objects.

   | Field | Description

       | `apiVersion`string
       | APIVersion defines the versioned schema of this representation of an object. Servers should convert recognized schemas to the latest internal value, and may reject unrecognized values. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#resources

       | `items` *PriorityLevelConfiguration array
       | `items` is a list of request-priorities.

       | `kind`string
       | Kind is a string value representing the REST resource this object represents. Servers may infer this from the endpoint the client submits requests to. Cannot be updated. In CamelCase. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#types-kinds

       | `metadata`ListMeta
       | `metadata` is the standard object's metadata. More info: https://git.k8s.io/community/contributors/devel/sig-architecture/api-conventions.md#metadata

## ExemptPriorityLevelConfiguration {#ExemptPriorityLevelConfiguration}

ExemptPriorityLevelConfiguration describes the configurable aspects of the handling of exempt requests. In the mandatory exempt configuration object the values in the fields here can be modified by authorized users, unlike the rest of the `spec`.

   | Field | Description

       | `lendablePercent`integer
       | `lendablePercent` prescribes the fraction of the level's NominalCL that can be borrowed by other priority levels.  This value of this field must be between 0 and 100, inclusive, and it defaults to 0. The number of seats that other levels can borrow from this level, known as this level's LendableConcurrencyLimit (LendableCL), is defined as follows.  LendableCL(i) = round( NominalCL(i) * lendablePercent(i)/100.0 )

       | `nominalConcurrencyShares`integer
       | `nominalConcurrencyShares` (NCS) contributes to the computation of the NominalConcurrencyLimit (NominalCL) of this level. This is the number of execution seats nominally reserved for this priority level. This DOES NOT limit the dispatching from this priority level but affects the other priority levels through the borrowing mechanism. The server's concurrency limit (ServerCL) is divided among all the priority levels in proportion to their NCS values:  NominalCL(i)  = ceil( ServerCL * NCS(i) / sum_ncs ) sum_ncs = sum[priority level k] NCS(k)  Bigger numbers mean a larger nominal concurrency limit, at the expense of every other priority level. This field has a default value of zero.

## LimitResponse {#LimitResponse}

LimitResponse defines how to handle requests that can not be executed right now.

   | Field | Description

       | `queuing`QueuingConfiguration
       | `queuing` holds the configuration parameters for queuing. This field may be non-empty only if `type` is `"Queue"`.

       | `type` *string
       | `type` is "Queue" or "Reject". "Queue" means that requests that can not be executed upon arrival are held in a queue until they can be executed or a queuing limit is reached. "Reject" means that requests that can not be executed upon arrival are rejected. Required.

## LimitedPriorityLevelConfiguration {#LimitedPriorityLevelConfiguration}

LimitedPriorityLevelConfiguration specifies how to handle requests that are subject to limits. It addresses two issues:
  - How are requests for this priority level limited?
  - What should be done with requests that exceed the limit?

   | Field | Description

       | `borrowingLimitPercent`integer
       | `borrowingLimitPercent`, if present, configures a limit on how many seats this priority level can borrow from other priority levels. The limit is known as this level's BorrowingConcurrencyLimit (BorrowingCL) and is a limit on the total number of seats that this level may borrow at any one time. This field holds the ratio of that limit to the level's nominal concurrency limit. When this field is non-nil, it must hold a non-negative integer and the limit is calculated as follows.  BorrowingCL(i) = round( NominalCL(i) * borrowingLimitPercent(i)/100.0 )  The value of this field can be more than 100, implying that this priority level can borrow a number of seats that is greater than its own nominal concurrency limit (NominalCL). When this field is left `nil`, the limit is effectively infinite.

       | `lendablePercent`integer
       | `lendablePercent` prescribes the fraction of the level's NominalCL that can be borrowed by other priority levels. The value of this field must be between 0 and 100, inclusive, and it defaults to 0. The number of seats that other levels can borrow from this level, known as this level's LendableConcurrencyLimit (LendableCL), is defined as follows.  LendableCL(i) = round( NominalCL(i) * lendablePercent(i)/100.0 )

       | `limitResponse` *LimitResponse
       | `limitResponse` indicates what to do with requests that can not be executed right now

       | `nominalConcurrencyShares`integer
       | `nominalConcurrencyShares` (NCS) contributes to the computation of the NominalConcurrencyLimit (NominalCL) of this level. This is the number of execution seats available at this priority level. This is used both for requests dispatched from this priority level as well as requests dispatched from other priority levels borrowing seats from this level. The server's concurrency limit (ServerCL) is divided among the Limited priority levels in proportion to their NCS values:  NominalCL(i)  = ceil( ServerCL * NCS(i) / sum_ncs ) sum_ncs = sum[priority level k] NCS(k)  Bigger numbers mean a larger nominal concurrency limit, at the expense of every other priority level.  If not specified, this field defaults to a value of 30.  Setting this field to zero supports the construction of a "jail" for this priority level that is used to hold some request(s)

## PriorityLevelConfigurationCondition {#PriorityLevelConfigurationCondition}

PriorityLevelConfigurationCondition defines the condition of priority level.

   | Field | Description

       | `lastTransitionTime`Time
       | `lastTransitionTime` is the last time the condition transitioned from one status to another.

       | `message`string
       | `message` is a human-readable message indicating details about last transition.

       | `reason`string
       | `reason` is a unique, one-word, CamelCase reason for the condition's last transition.

       | `status`string
       | `status` is the status of the condition. Should be specified and set to one of True, False, Unknown.

       | `type` *string
       | `type` is the type of the condition. Required.

## QueuingConfiguration {#QueuingConfiguration}

QueuingConfiguration holds the configuration parameters for queuing

   | Field | Description

       | `handSize`integer
       | `handSize` is a small positive number that configures the shuffle sharding of requests into queues.  When enqueuing a request at this priority level the request's flow identifier (a string pair) is hashed and the hash value is used to shuffle the list of queues and deal a hand of the size specified here.  The request is put into one of the shortest queues in that hand. `handSize` must be no larger than `queues`, and should be significantly smaller (so that a few heavy flows do not saturate most of the queues).  See the user-facing documentation for more extensive guidance on setting this field.  This field has a default value of 8.

       | `queueLengthLimit`integer
       | `queueLengthLimit` is the maximum number of requests allowed to be waiting in a given queue of this priority level at a time; excess requests are rejected.  This value must be positive.  If not specified, it will be defaulted to 50.

       | `queues`integer
       | `queues` is the number of queues for this priority level. The queues exist independently at each apiserver. The value must be positive.  Setting it to 1 effectively precludes shufflesharding and thus makes the distinguisher method of associated flow schemas irrelevant.  This field has a default value of 64.
