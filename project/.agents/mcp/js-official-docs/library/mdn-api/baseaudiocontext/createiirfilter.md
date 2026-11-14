---
title: "BaseAudioContext: createIIRFilter() method"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/baseaudiocontext/createiirfilter/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# BaseAudioContext: createIIRFilter() method

The **`createIIRFilter()`** method of the `BaseAudioContext` interface creates an `IIRFilterNode`, which represents a general **infinite impulse response** (IIR) filter which can be configured to serve as various types of filter.

> **Note:**
> The `IIRFilterNode()`
> constructor is the recommended way to create an `IIRFilterNode`; see
> Creating an AudioNode.

## Syntax

```js
createIIRFilter(feedforward, feedback)
```

### Parameters

- `feedforward`
    An array of floating-point values specifying the feedforward (numerator)
    coefficients for the transfer function of the IIR filter. The maximum length of this
    array is 20, and at least one value must be nonzero.
- `feedback`
    An array of floating-point values specifying the feedback (denominator) coefficients
    for the transfer function of the IIR filter. This array may have up to 20 members, the
    first of which must not be zero.

### Return value

An `IIRFilterNode` implementing the filter with the specified feedback and
feedforward coefficient arrays.

### Exceptions

- `InvalidStateError` `DOMException`
    Thrown if all of the `feedforward` coefficients are 0, or if the first
    `feedback` coefficient is 0.
- `NotSupportedError` `DOMException`
    Thrown if one or both of the input arrays exceeds 20 members.

## See also

- Using the Web Audio API
- `IIRFilterNode`
- `AudioNode`
