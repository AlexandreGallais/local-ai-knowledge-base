---
title: "QUIC (part 4 of 13)"
tool: "node"
version: "26.13"
source: "https://github.com/nodejs/node/blob/e9c277643b0249c50f6e6de5413be8a88ea11b6a/doc/api/quic.md"
commit: "e9c277643b0249c50f6e6de5413be8a88ea11b6a"
license: "MIT"
---

# QUIC (part 4 of 13)

## Class: `QuicEndpoint.Stats`

A view of the collected statistics for an endpoint.

### `endpointStats.createdAt`

* Type: {bigint} A timestamp indicating the moment the endpoint was created. Read only.

### `endpointStats.destroyedAt`

* Type: {bigint} A timestamp indicating the moment the endpoint was destroyed. Read only.

### `endpointStats.bytesReceived`

* Type: {bigint} The total number of bytes received by this endpoint. Read only.

### `endpointStats.bytesSent`

* Type: {bigint} The total number of bytes sent by this endpoint. Read only.

### `endpointStats.packetsReceived`

* Type: {bigint} The total number of QUIC packets successfully received by this endpoint. Read only.

### `endpointStats.packetsSent`

* Type: {bigint} The total number of QUIC packets successfully sent by this endpoint. Read only.

### `endpointStats.serverSessions`

* Type: {bigint} The total number of peer-initiated sessions received by this endpoint. Read only.

### `endpointStats.clientSessions`

* Type: {bigint} The total number of sessions initiated by this endpoint. Read only.

### `endpointStats.serverBusyCount`

* Type: {bigint} The total number of times an initial packet was rejected due to the
  endpoint being marked busy. Read only.

### `endpointStats.retryCount`

* Type: {bigint} The total number of retry packets sent by this endpoint. Read only.

### `endpointStats.retryRateLimited`

* Type: {bigint} The total number of retry packets dropped by the global rate
  limiter. Read only. A non-zero value indicates the endpoint is under retry
  flood pressure.

### `endpointStats.versionNegotiationCount`

* Type: {bigint} The total number of version negotiation packets sent by this
  endpoint. Read only.

### `endpointStats.versionNegotiationRateLimited`

* Type: {bigint} The total number of version negotiation packets dropped by
  the global rate limiter. Read only.

### `endpointStats.statelessResetCount`

* Type: {bigint} The total number of stateless reset packets sent by this
  endpoint. Read only.

### `endpointStats.statelessResetRateLimited`

* Type: {bigint} The total number of stateless reset packets dropped by the
  global rate limiter. Read only.

### `endpointStats.immediateCloseCount`

* Type: {bigint} The total number of immediate connection close packets sent
  by this endpoint. Read only.

### `endpointStats.immediateCloseRateLimited`

* Type: {bigint} The total number of immediate connection close packets
  dropped by the global rate limiter. Read only.

### `endpointStats.sessionCreationRateLimited`

* Type: {bigint} The total number of session creation attempts dropped by the
  per-host rate limiter. Read only. A non-zero value indicates one or more
  remote addresses are creating sessions faster than the configured rate allows.

### `endpointStats.packetsBlocked`

* Type: {bigint} The total number of incoming packets dropped by the
  block list filter. Read only.
