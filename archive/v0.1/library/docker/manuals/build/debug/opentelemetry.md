---
title: "OpenTelemetry support"
tool: "docker"
version: "2026-11"
source: "https://github.com/docker/docs/blob/a0442378fca4987b1235614ec917b4138b5d5e5d/content/manuals/build/debug/opentelemetry.md"
commit: "a0442378fca4987b1235614ec917b4138b5d5e5d"
license: "Apache-2.0"
---

# OpenTelemetry support

Both Buildx and BuildKit support OpenTelemetry.

To capture the trace to Jaeger,
set `JAEGER_TRACE` environment variable to the collection address using a
`driver-opt`.

First create a Jaeger container:

```console
$ docker run -d --name jaeger -p "6831:6831/udp" -p "16686:16686" --restart unless-stopped jaegertracing/all-in-one
```

Then create a `docker-container` builder
that will use the Jaeger instance via the `JAEGER_TRACE` environment variable:

```console
$ docker buildx create --use \
  --name mybuilder \
  --driver docker-container \
  --driver-opt "network=host" \
  --driver-opt "env.JAEGER_TRACE=localhost:6831"
```

Boot and inspect `mybuilder`:

```console
$ docker buildx inspect --bootstrap
```

Buildx commands should be traced at `http://127.0.0.1:16686/`:
