---
title: "RTCIceCandidatePairStats: selected property"
tool: "mdn-api"
version: "2026-11"
source: "https://github.com/mdn/content/blob/c44f591049bc129b356acb0a9ce281974c035113/files/en-us/web/api/rtcicecandidatepairstats/selected/index.md"
commit: "c44f591049bc129b356acb0a9ce281974c035113"
license: "CC-BY-SA-2.5"
---

# RTCIceCandidatePairStats: selected property

The **`selected`** property of the `RTCIceCandidatePairStats` dictionary indicates whether or not the candidate pair described by the object is the one currently being used to communicate with the remote peer.

This property is non-standard and is only supported by Firefox.
The standard way to determine the selected candidate pair is to look at the `selectedCandidatePairId` property of the stats object of type `transport`.

## Value

`true` if the candidate pair described by this object is the one currently in use, and `false` otherwise.

## Examples

The function shown in this example identifies the currently-selected candidate pair from a statistics report by first iterating over each report, looking for a `transport` report.
When one is found, that transport's `selectedCandidatePairId` is used to get the `RTCIceCandidatePair` describing the connection.

If that fails, then the second part iterates over the reports, looking for a `candidate-pair` record whose Firefox-specific `selected` property is `true`.
This candidate pair is then returned as the currently-selected one.

```js
function getCurrentCandidatePair(statsResults) {
  statsResults.forEach((report) => {
    if (report.type === "transport") {
      currentPair = statsResults.get(report.selectedCandidatePairId);
    }
  });

  if (!currentPair) {
    statsResults.forEach((report) => {
      if (report.type === "candidate-pair" && report.selected) {
        currentPair = report;
      }
    });
  }

  return currentPair;
}
```

## Specifications

Not part of any specification.
This property is unique to Firefox.
