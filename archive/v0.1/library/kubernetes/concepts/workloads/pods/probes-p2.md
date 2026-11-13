---
title: "Liveness, Readiness, and Startup Probes (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/workloads/pods/probes.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Liveness, Readiness, and Startup Probes (part 2 of 2)

## Probe mechanism details {#probe-mechanism-details}

### HTTP probes {#http-probes}

HTTP probes
have additional fields that can be set on `httpGet`:

* `host`: Host name to connect to, defaults to the pod IP. You probably want to
  set "Host" in `httpHeaders` instead.
* `scheme`: Scheme to use for connecting to the host (HTTP or HTTPS). Defaults
  to "HTTP".
* `path`: Path to access on the HTTP server. Defaults to "/".
* `httpHeaders`: Custom headers to set in the request. HTTP allows repeated
  headers.
* `port`: Name or number of the port to access on the container. Number must be
  in the range 1 to 65535.
* `protocol`: Protocol to use for the probe request. Defaults to `HTTP1`.
  Set to `HTTP2` to probe over HTTP/2 cleartext (h2c). Requires the
  `H2CContainerProbe` feature gate
  to be enabled.

For an HTTP probe, the kubelet sends an HTTP request to the specified port and
path to perform the check. The kubelet sends the probe to the Pod's IP address,
unless the address is overridden by the optional `host` field in `httpGet`. If
`scheme` field is set to `HTTPS`, the kubelet sends an HTTPS request skipping
the certificate verification. In most scenarios, you do not want to set the
`host` field. Here's one scenario where you would set it. Suppose the container
listens on 127.0.0.1 and the Pod's `hostNetwork` field is true. Then `host`,
under `httpGet`, should be set to 127.0.0.1. If your pod relies on virtual
hosts, which is probably the more common case, you should not use `host`, but
rather set the `Host` header in `httpHeaders`.

For an HTTP probe, the kubelet sends two request headers in addition to the
mandatory `Host` header:

- `User-Agent`, which defaults to `kube-probe/`
  where `` is the version of the kubelet.
- `Accept`, which defaults to `*/*`.

You can override these headers by defining `httpHeaders` for the probe.
For example:

```yaml
livenessProbe:
  httpGet:
    httpHeaders:
      - name: Accept
        value: application/json

startupProbe:
  httpGet:
    httpHeaders:
      - name: User-Agent
        value: MyUserAgent
```

You can also remove these two headers by defining them with an empty value.

```yaml
livenessProbe:
  httpGet:
    httpHeaders:
      - name: Accept
        value: ""

startupProbe:
  httpGet:
    httpHeaders:
      - name: User-Agent
        value: ""
```

**Feature state:**

You can configure an HTTP probe to use HTTP/2 cleartext (h2c) by setting the
`protocol` field to `HTTP2`. When `protocol` is set to `HTTP2`, the kubelet
uses h2c (HTTP/2 over plain TCP) instead of HTTP/1.1. The default `protocol`
is `HTTP1`. Setting `protocol: HTTP2` requires `scheme: HTTP` (the default);
the API server rejects the combination of `protocol: HTTP2` with
`scheme: HTTPS`. For more details, see
Use HTTP/2 cleartext (h2c) with HTTP probes.

#### Redirect handling {#http-probes-redirects}

When the kubelet probes a container using HTTP, it follows redirects only if
the redirect is to the same host. This includes redirects that change the
protocol from HTTP to HTTPS, even if the probe is configured with
`scheme: HTTP`.

If the redirect is to a different hostname, the kubelet does not follow it.
Instead, the kubelet treats the probe as successful and records a
`ProbeWarning` event.

If the kubelet follows a redirect and receives 11 or more redirects in total, the probe
is considered successful and records a `ProbeWarning` event. For example:

```none
Events:
  Type     Reason        Age                     From               Message
  ----     ------        ----                    ----               -------
  Normal   Scheduled     29m                     default-scheduler  Successfully assigned default/httpbin-7b8bc9cb85-bjzwn to daocloud
  Normal   Pulling       29m                     kubelet            Pulling image "docker.io/kennethreitz/httpbin"
  Normal   Pulled        24m                     kubelet            Successfully pulled image "docker.io/kennethreitz/httpbin" in 5m12.402735213s
  Normal   Created       24m                     kubelet            Created container httpbin
  Normal   Started       24m                     kubelet            Started container httpbin
 Warning  ProbeWarning  4m11s (x1197 over 24m)  kubelet            Readiness probe warning: Probe terminated redirects
```

**Caution:**
When processing an `httpGet` probe, the kubelet stops reading the response body after 10KiB.
The probe's success is determined solely by the response status code, which is found in the response headers.

If you probe an endpoint that returns a response body larger than **10KiB**,
the kubelet will still mark the probe as successful based on the status code,
but it will close the connection after reaching the 10KiB limit.
This abrupt closure can cause **connection reset by peer** or **broken pipe errors** to appear in your application's logs,
which can be difficult to distinguish from legitimate network issues.

For reliable `httpGet` probes, it is strongly recommended to use dedicated health check endpoints
that return a minimal response body. If you must use an existing endpoint with a large payload,
consider using an `exec` probe to perform a HEAD request instead.

### TCP probes {#tcp-probes}

For a TCP probe, the kubelet makes the probe connection at the node, not in the
Pod, which means that you can not use a service name in the `host` parameter
since the kubelet is unable to resolve it.

### gRPC probes {#grpc-probes}

**Feature state:** v1.27 [stable]

If your application implements the
gRPC Health Checking Protocol,
you can configure Kubernetes to use it for application startup, liveness or readiness checks.

Here is an example manifest:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: etcd-with-grpc
spec:
  containers:
  - name: etcd
    image: registry.k8s.io/etcd:3.5.1-0
    command: [ "/usr/local/bin/etcd", "--data-dir",  "/var/lib/etcd", "--listen-client-urls", "http://0.0.0.0:2379", "--advertise-client-urls", "http://127.0.0.1:2379", "--log-level", "debug"]
    ports:
    - containerPort: 2379
    livenessProbe:
      grpc:
        port: 2379
      initialDelaySeconds: 10
```

To use a gRPC probe, `port` must be configured. If you want to
distinguish probes of different types and probes for different features you can
use the `service` field. You can set `service` to the value `liveness` and make
your gRPC Health Checking endpoint respond to this request differently than when
you set `service` set to `readiness`. This lets you use the same endpoint for
different kinds of container health check rather than listening on two different
ports. If you want to specify your own custom service name and also specify a
probe type, the Kubernetes project recommends that you use a name that
concatenates those. For example: `myservice-liveness` (using `-` as a separator).

**Note:**
Unlike HTTP or TCP probes, you cannot specify the health check port by name,
and you cannot configure a custom hostname.

Configuration problems (for example: incorrect port or service, unimplemented
health checking protocol) are considered a probe failure, similar to HTTP and
TCP probes.

**Feature state:**

You can configure a gRPC probe to connect over TLS by setting the `mode` field
to `TLS`. When `mode` is set to `TLS`, the kubelet uses TLS with
`InsecureSkipVerify` (it does not verify the server certificate). The default
`mode` is `Plaintext`. For more details, see
Use TLS with gRPC probes.

## What's next

* Learn how to
  Configure Liveness, Readiness and Startup Probes.
* For the full specification of probe-related fields, see the API reference:
  Pod,
  Container,
  Probe
