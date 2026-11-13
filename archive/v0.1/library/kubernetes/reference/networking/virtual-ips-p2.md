---
title: "Virtual IPs and Service Proxies (part 2 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/networking/virtual-ips.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Virtual IPs and Service Proxies (part 2 of 4)

## Proxy modes

The kube-proxy starts up in different modes, which are determined by its configuration.

On Linux nodes, the available modes for kube-proxy are:

`iptables`
: A mode where the kube-proxy configures packet forwarding rules using iptables.

`ipvs`
: a mode where the kube-proxy configures packet forwarding rules using ipvs.

`nftables`
: a mode where the kube-proxy configures packet forwarding rules using nftables.

If you do not choose a mode explicitly (via the `--proxy-mode`
command-line option, or the `mode` field in a config file) when
starting kube-proxy, then it will use the recommended default version.
In Kubernetes , this is `iptables`, but a
future version of Kubernetes will change the default to `nftables`. To
avoid having the proxy backend in a cluster be changed unexpectedly
during an upgrade, you should ensure that all clusters have a
kube-proxy configuration that explicitly indicates which mode to use.

There is only one mode available for kube-proxy on Windows:

`kernelspace`
: a mode where the kube-proxy configures packet forwarding rules in the Windows kernel

### `iptables` proxy mode {#proxy-mode-iptables}

_This proxy mode is only available on Linux nodes._

In this mode, kube-proxy configures packet forwarding rules using the
iptables API of the kernel netfilter subsystem. For each endpoint, it
installs iptables rules which, by default, select a backend Pod at
random.

#### Example {#packet-processing-iptables}

As an example, consider the image processing application described earlier
in the page.
When the backend Service is created, the Kubernetes control plane assigns a virtual
IP address, for example 10.0.0.1. For this example, assume that the
Service port is 1234.
All of the kube-proxy instances in the cluster observe the creation of the new
Service.

When kube-proxy on a node sees a new Service, it installs a series of iptables rules
which redirect from the virtual IP address to more iptables rules, defined per Service.
The per-Service rules link to further rules for each backend endpoint, and the per-
endpoint rules redirect traffic (using destination NAT) to the backends.

When a client connects to the Service's virtual IP address the iptables rule kicks in.
A backend is chosen (either based on session affinity or randomly) and packets are
redirected to the backend without rewriting the client IP address.

This same basic flow executes when traffic comes in through a `type: NodePort` Service, or
through a load-balancer, though in those cases the client IP address does get altered.

#### Optimizing iptables mode performance

In iptables mode, kube-proxy creates a few iptables rules for every
Service, and a few iptables rules for each endpoint IP address. In
clusters with tens of thousands of Pods and Services, this means tens
of thousands of iptables rules, and kube-proxy may take a long time to update the rules
in the kernel when Services (or their EndpointSlices) change. You can adjust the syncing
behavior of kube-proxy via options in the
`iptables` section
of the kube-proxy configuration file
(which you specify via `kube-proxy --config `):

```yaml
...
iptables:
  minSyncPeriod: 1s
  syncPeriod: 30s
...
```

##### `minSyncPeriod`

The `minSyncPeriod` parameter sets the minimum duration between
attempts to resynchronize iptables rules with the kernel. If it is
`0s`, then kube-proxy will always immediately synchronize the rules
every time any Service or EndpointSlice changes. This works fine in very
small clusters, but it results in a lot of redundant work when lots of
things change in a small time period. For example, if you have a
Service backed by a Deployment
with 100 pods, and you delete the
Deployment, then with `minSyncPeriod: 0s`, kube-proxy would end up
removing the Service's endpoints from the iptables rules one by one,
resulting in a total of 100 updates. With a larger `minSyncPeriod`, multiple
Pod deletion events would get aggregated together, so kube-proxy might
instead end up making, say, 5 updates, each removing 20 endpoints,
which will be much more efficient in terms of CPU, and result in the
full set of changes being synchronized faster.

The larger the value of `minSyncPeriod`, the more work that can be
aggregated, but the downside is that each individual change may end up
waiting up to the full `minSyncPeriod` before being processed, meaning
that the iptables rules spend more time being out-of-sync with the
current API server state.

The default value of `1s` should work well in most clusters, but in very
large clusters it may be necessary to set it to a larger value.
Especially, if kube-proxy's `sync_proxy_rules_duration_seconds` metric
indicates an average time much larger than 1 second, then bumping up
`minSyncPeriod` may make updates more efficient.

##### Updating legacy `minSyncPeriod` configuration {#minimize-iptables-restore}

Older versions of kube-proxy updated all the rules for all Services on
every sync; this led to performance issues (update lag) in large
clusters, and the recommended solution was to set a larger
`minSyncPeriod`. Since Kubernetes v1.28, the iptables mode of
kube-proxy uses a more minimal approach, only making updates where
Services or EndpointSlices have actually changed.

If you were previously overriding `minSyncPeriod`, you should try
removing that override and letting kube-proxy use the default value
(`1s`) or at least a smaller value than you were using before upgrading.

If you are not running kube-proxy from Kubernetes , check
the behavior and associated advice for the version that you are actually running.

##### `syncPeriod`

The `syncPeriod` parameter controls a handful of synchronization
operations that are not directly related to changes in individual
Services and EndpointSlices. In particular, it controls how quickly
kube-proxy notices if an external component has interfered with
kube-proxy's iptables rules. In large clusters, kube-proxy also only
performs certain cleanup operations once every `syncPeriod` to avoid
unnecessary work.

For the most part, increasing `syncPeriod` is not expected to have much
impact on performance, but in the past, it was sometimes useful to set
it to a very large value (eg, `1h`). This is no longer recommended,
and is likely to hurt functionality more than it improves performance.

### IPVS proxy mode {#proxy-mode-ipvs}

**Feature state:** v1.35 [deprecated]

_This proxy mode is only available on Linux nodes._

**The `ipvs` proxy mode is deprecated**. Support for `ipvs` mode will be disabled by default from Kubernetes v1.40 (you can re-enable it with the `KubeProxyIPVS`
feature gate);
`ipvs` mode will be fully removed in Kubernetes v1.43.

In `ipvs` mode, kube-proxy uses the kernel IPVS and iptables APIs to
create rules to redirect traffic from Service IPs to endpoint IPs.

The IPVS proxy mode is based on netfilter hook function that is similar to
iptables mode, but uses a hash table as the underlying data structure and works
in the kernel space.

**Note:**
The `ipvs` proxy mode was an experiment in providing a Linux
kube-proxy backend with better rule-synchronizing performance and
higher network-traffic throughput than the `iptables` mode. While it
succeeded in those goals, the kernel IPVS API turned out to be a bad
match for the Kubernetes Services API, and the `ipvs` backend was
never able to implement all of the edge cases of Kubernetes Service
functionality correctly.

The `nftables` proxy mode (described below) is essentially a
replacement for both the `iptables` and `ipvs` modes, with better
performance than either of them, and is recommended as a replacement
for `ipvs`. If you are deploying onto Linux systems that are too old
to run the `nftables` proxy mode, you should also consider trying the
`iptables` mode rather than `ipvs`, since the performance of
`iptables` mode has improved greatly since the `ipvs` mode was first
introduced.

IPVS provides more options for balancing traffic to backend Pods;
these are:

* `rr` (Round Robin): Traffic is equally distributed amongst the backing servers.

* `wrr` (Weighted Round Robin): Traffic is routed to the backing servers based on
  the weights of the servers. Servers with higher weights receive new connections
  and get more requests than servers with lower weights.

* `lc` (Least Connection): More traffic is assigned to servers with fewer active connections.

* `wlc` (Weighted Least Connection): More traffic is routed to servers with fewer connections
  relative to their weights, that is, connections divided by weight.

* `lblc` (Locality based Least Connection): Traffic for the same IP address is sent to the
  same backing server if the server is not overloaded and available; otherwise the traffic
  is sent to servers with fewer connections, and keep it for future assignment.

* `lblcr` (Locality Based Least Connection with Replication): Traffic for the same IP
  address is sent to the server with least connections. If all the backing servers are
  overloaded, it picks up one with fewer connections and adds it to the target set.
  If the target set has not changed for the specified time, the server with the highest load
  is removed from the set, in order to avoid a high degree of replication.

* `sh` (Source Hashing): Traffic is sent to a backing server by looking up a statically
  assigned hash table based on the source IP addresses.

* `dh` (Destination Hashing): Traffic is sent to a backing server by looking up a
  statically assigned hash table based on their destination addresses.

* `sed` (Shortest Expected Delay): Traffic forwarded to a backing server with the shortest
  expected delay. The expected delay is `(C + 1) / U` if sent to a server, where `C` is
  the number of connections on the server and `U` is the fixed service rate (weight) of
  the server.

* `nq` (Never Queue): Traffic is sent to an idle server if there is one, instead of
  waiting for a fast one; if all servers are busy, the algorithm falls back to the `sed`
  behavior.

* `mh` (Maglev Hashing): Assigns incoming jobs based on
  Google's Maglev hashing algorithm,
  This scheduler has two flags: `mh-fallback`, which enables fallback to a different
  server if the selected server is unavailable, and `mh-port`, which adds the source port number to
  the hash computation. When using `mh`, kube-proxy always sets the `mh-port` flag and does not
  enable the `mh-fallback` flag.
  In proxy-mode=ipvs `mh` will work as source-hashing (`sh`), but with ports.

These scheduling algorithms are configured through the
`ipvs.scheduler`
field in the kube-proxy configuration.

### `nftables` proxy mode {#proxy-mode-nftables}

_This proxy mode is only available on Linux nodes, and requires kernel
5.13 or later._

In this mode, kube-proxy configures packet forwarding rules using the
nftables API of the kernel netfilter subsystem. For each endpoint, it
installs nftables rules which, by default, select a backend Pod at
random.

The nftables API is the successor to the iptables API and is designed
to provide better performance and scalability than iptables. The
`nftables` proxy mode is able to process changes to service endpoints
faster and more efficiently than the `iptables` mode, and is also able
to more efficiently process packets in the kernel (though this only
becomes noticeable in clusters with tens of thousands of services).

#### Migrating from `iptables` mode to `nftables`

Users who want to switch from the default `iptables` mode to the
`nftables` mode should be aware that some features work slightly
differently the `nftables` mode:

- **NodePort interfaces**: In `iptables` mode, by default,
  NodePort services
  are reachable on all local IP addresses. This is usually not what
  users want, so the `nftables` mode defaults to
  `--nodeport-addresses primary`, meaning Services using `type: NodePort` are only
  reachable on the node's primary IPv4 and/or IPv6 addresses. You can
  override this by specifying an explicit value for that option:
  e.g., `--nodeport-addresses 0.0.0.0/0` to listen on all (local)
  IPv4 IPs.

- **NodePort interaction with firewalls**: The `iptables` mode of
  kube-proxy tries to be compatible with overly-aggressive firewalls;
  for each `type: NodePort` service, it will add rules to accept inbound
  traffic on that port, in case that traffic would otherwise be
  blocked by a firewall. This approach will not work with firewalls
  based on nftables, so kube-proxy's `nftables` mode does not do
  anything here; if you have a local firewall, you must ensure that
  it is properly configured to allow Kubernetes traffic through
  (e.g., by allowing inbound traffic on the entire NodePort range).

- **Conntrack bug workarounds**: Linux kernels prior to 6.1 have a
  bug that can result in long-lived TCP connections to service IPs
  being closed with the error "Connection reset by peer". The
  `iptables` mode of kube-proxy installs a workaround for this bug,
  but this workaround was later found to cause other problems in some
  clusters. The `nftables` mode does not install any workaround by
  default, but you can check kube-proxy's
  `iptables_ct_state_invalid_dropped_packets_total` metric to see if
  your cluster is depending on the workaround, and if so, you can run
  kube-proxy with the option `--conntrack-tcp-be-liberal` to work
  around the problem in `nftables` mode.

**Feature state:**

- `type: NodePort` **Services on `127.0.0.1`**: In `iptables` mode, if the
  `--nodeport-addresses` range includes `127.0.0.1` (and the option
  `--iptables-localhost-nodeports false` option is not passed), then
  Services of `type: NodePort` are reachable even on "localhost" (`127.0.0.1`).
  Originally, in `nftables` mode, this did not work. However, in
  Kubernetes , you can enable localhost
  NodePorts in `nftables` mode by enabling the
  `KubeProxyNFTablesLocalhostNodePorts` feature gate, and setting
  `--nodeport-addresses` to `primary,localhost` rather than the
  default value of `primary`.

  If you are not sure if you are depending on this functionality, you
  can check kube-proxy's
  `iptables_localhost_nodeports_accepted_packets_total` metric; if it
  is non-0, that means that some client has connected to a `type:
  NodePort` Service via localhost/loopback.
