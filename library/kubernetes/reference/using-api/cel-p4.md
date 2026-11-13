---
title: "Common Expression Language in Kubernetes (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/using-api/cel.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Common Expression Language in Kubernetes (part 4 of 4)

## Resource constraints

CEL is non-Turing complete and offers a variety of production safety controls to
limit execution time. CEL's _resource constraint_ features provide feedback to
developers about expression complexity and help protect the API server from
excessive resource consumption during evaluation. CEL's resource constraint
features are used to prevent CEL evaluation from consuming excessive API server
resources.

A key element of the resource constraint features is a _cost unit_ that CEL
defines as a way of tracking CPU utilization. Cost units are independent of
system load and hardware. Cost units are also deterministic; for any given CEL
expression and input data, evaluation of the expression by the CEL interpreter
will always result in the same cost.

Many of CEL's core operations have fixed costs. The simplest operations, such as
comparisons (e.g. `<`) have a cost of 1. Some have a higher fixed cost, for
example list literal declarations have a fixed base cost of 40 cost units.

Calls to functions implemented in native code approximate cost based on the time
complexity of the operation. For example: operations that use regular
expressions, such as `match` and `find`, are estimated using an approximated
cost of `length(regexString)*length(inputString)`. The approximated cost
reflects the worst case time complexity of Go's RE2 implementation.

### Runtime cost budget

All CEL expressions evaluated by Kubernetes are constrained by a runtime cost
budget. The runtime cost budget is an estimate of actual CPU utilization
computed by incrementing a cost unit counter while interpreting a CEL
expression. If the CEL interpreter executes too many instructions, the runtime
cost budget will be exceeded, execution of the expressions will be halted, and
an error will result.

Some Kubernetes resources define an additional runtime cost budget that bounds
the execution of multiple expressions. If the sum total of the cost of
expressions exceed the budget, execution of the expressions will be halted, and
an error will result. For example the validation of a custom resource has a
_per-validation_ runtime cost budget for all
Validation Rules
evaluated to validate the custom resource.

### Estimated cost limits

For some Kubernetes resources, the API server may also check if worst case
estimated running time of CEL expressions would be prohibitively expensive to
execute. If so, the API server prevent the CEL expression from being written to
API resources by rejecting create or update operations containing the CEL
expression to the API resources. This feature offers a stronger assurance that
CEL expressions written to the API resource will be evaluated at runtime without
exceeding the runtime cost budget.
