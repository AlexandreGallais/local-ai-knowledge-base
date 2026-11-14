---
title: "DelayNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/delaynode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# DelayNode

The **`DelayNode`** interface represents a delay-line; an `AudioNode` audio-processing module that causes a delay between the arrival of an input data and its propagation to the output.

A `DelayNode` always has exactly one input and one output, both with the same amount of channels.

When creating a graph that has a cycle, it is mandatory to have at least one `DelayNode` in the cycle, or the nodes taking part in the cycle will be muted.

       | Number of inputs
       | `1`

       | Number of outputs
       | `1`

       | Channel count mode
       | `"max"`

       | Channel count
       | `2` (not used in the default count mode)

       | Channel interpretation
       | `"speakers"`

## Constructor

- `DelayNode()`
    Creates a new instance of a DelayNode object instance. As an alternative, you can use the `BaseAudioContext.createDelay()` factory method; see Creating an AudioNode.

## Instance properties

_Inherits properties from its parent, `AudioNode`._

- `DelayNode.delayTime` (read-only)
    An a-rate `AudioParam` representing the amount of delay to apply, specified in seconds.

## Instance methods

_No specific methods; inherits methods from its parent, `AudioNode`._

## Example

See `BaseAudioContext.createDelay()` for example code.

## See also

- Using the Web Audio API
