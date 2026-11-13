---
title: "IIRFilterNode"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/iirfilternode/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# IIRFilterNode

The **`IIRFilterNode`** interface of the Web Audio API is an `AudioNode` processor which implements a general **infinite impulse response** (IIR) filter; this type of filter can be used to implement tone control devices and graphic equalizers as well. It lets the parameters of the filter response be specified, so that it can be tuned as needed.

       | Number of inputs
       | `1`

       | Number of outputs
       | `1`

       | Channel count mode
       | `"max"`

       | Channel count
       | Same as on the input

       | Channel interpretation
       | `"speakers"`

Typically, it's best to use the `BiquadFilterNode` interface to implement higher-order filters. There are several reasons why:

- Biquad filters are typically less sensitive to numeric quirks.
- The filter parameters of biquad filters can be automated.
- All even-ordered IIR filters can be created using `BiquadFilterNode`.

However, if you need to create an odd-ordered IIR filter, you'll need to use `IIRFilterNode`. You may also find this interface useful if you don't need automation, or for other reasons.

> **Note:**
> Once the node has been created, you can't change its coefficients.

`IIRFilterNode`s have a tail-time reference; they continue to output non-silent audio with zero input. As an IIR filter, the non-zero input continues forever, but this can be limited after some finite time in practice, when the output has approached zero closely enough. The actual time that takes depends on the filter coefficients provided.

## Constructor

- `IIRFilterNode()`
    Creates a new instance of an IIRFilterNode object.

## Instance properties

_This interface has no properties of its own; however, it inherits properties from its parent, `AudioNode`_.

## Instance methods

_Inherits methods from its parent, `AudioNode`. It also has the following additional methods:_

- `getFrequencyResponse()`
    Uses the filter's current parameter settings to calculate the response for frequencies specified in the provided array of frequencies.

## Examples

You can find a simple IIR filter demo live. Also see the source code on GitHub. It includes some different coefficient values for different lowpass <example-value> — you can change the value of the `filterNumber` constant to a value between 0 and 3 to check out the different available effects.

Also see our Using IIR filters guide for a full explanation.

## See also

- Using the Web Audio API
- `AudioNode`
- `BiquadFilterNode`
