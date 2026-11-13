---
title: "kube-proxy (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/kube-proxy.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# kube-proxy (part 3 of 3)

|  | Enable strict ARP by setting arp_ignore to 1 and arp_announce to 2

 | --ipvs-sync-period duration     Default: 30s

 |  | An interval (e.g. '5s', '1m', '2h22m') indicating how frequently various re-synchronizing and cleanup operations are performed. Must be greater than 0.

 | --ipvs-tcp-timeout duration

 |  | The timeout for idle IPVS TCP connections, 0 to leave as-is. (e.g. '5s', '1m', '2h22m').

 | --ipvs-tcpfin-timeout duration

 |  | The timeout for IPVS TCP connections after receiving a FIN packet, 0 to leave as-is. (e.g. '5s', '1m', '2h22m').

 | --ipvs-udp-timeout duration

 |  | The timeout for IPVS UDP packets, 0 to leave as-is. (e.g. '5s', '1m', '2h22m').

 | --kube-api-burst int32     Default: 10

 |  | Burst to use while talking with kubernetes apiserver

 | --kube-api-content-type string     Default: "application/vnd.kubernetes.protobuf"

 |  | Content type of requests sent to apiserver.

 | --kube-api-qps float     Default: 5

 |  | QPS to use while talking with kubernetes apiserver

 | --kubeconfig string

 |  | Path to kubeconfig file with authorization information (the master location can be overridden by the master flag).

 | --legacy_stderr_threshold_behavior     Default: true

 |  | If true, stderrthreshold is ignored when logtostderr=true (legacy behavior). If false, stderrthreshold is honored even when logtostderr=true

 | --log-flush-frequency duration     Default: 5s

 |  | Maximum number of seconds between log flushes

 | --log-text-info-buffer-size quantity

 |  | [Alpha] In text format with split output streams, the info messages can be buffered for a while to increase performance. The default value of zero bytes disables buffering. The size can be specified as number of bytes (512), multiples of 1000 (1K), multiples of 1024 (2Ki), or powers of those (3M, 4G, 5Mi, 6Gi). Enable the LoggingAlphaOptions feature gate to use this.

 | --log-text-split-stream

 |  | [Alpha] In text format, write error messages to stderr and info messages to stdout. The default is to write a single stream to stdout. Enable the LoggingAlphaOptions feature gate to use this.

 | --log_backtrace_at <a string in the form 'file:N'>     Default: :0

 |  | when logging hits line file:N, emit a stack trace

 | --log_dir string

 |  | If non-empty, write log files in this directory (no effect when -logtostderr=true)

 | --log_file string

 |  | If non-empty, use this log file (no effect when -logtostderr=true)

 | --log_file_max_size uint     Default: 1800

 |  | Defines the maximum size a log file can grow to (no effect when -logtostderr=true). Unit is megabytes. If the value is 0, the maximum file size is unlimited.

 | --logging-format string     Default: "text"

 |  | Sets the log format. Permitted formats: "text".

 | --logtostderr     Default: true

 |  | log to standard error instead of files

 | --masquerade-all

 |  | SNAT all traffic sent via Service cluster IPs. This may be required with some CNI plugins. Only supported on Linux.

 | --master string

 |  | The address of the Kubernetes API server (overrides any value in kubeconfig)

 | --metrics-bind-address ipport     Default: 127.0.0.1:10249

 |  | The IP address and port for the metrics server to serve on, defaulting to "127.0.0.1:10249". (Set to "0.0.0.0:10249" / "[::]:10249" to bind on all interfaces.) This parameter is ignored if a config file is specified by --config.

 | --nodeport-addresses strings

 |  | A list of CIDR ranges and/or keywords that expand to CIDR ranges. NodePort services are only accessible on node IPs covered by the list. Supported keywords: 'primary' (the Node object's primary IPv4 and/or IPv6 addresses), 'localhost' (127.0.0.0/8 and ::1/128), and 'all' (0.0.0.0/0 and ::/0). Any combination of valid keywords and CIDRS may be included in the list. Serving NodePorts on loopback IPs is only supported in iptables mode (IPv4 only, see --iptables-localhost-nodeports), and, only for TCP, in nftables mode when the KubeProxyNFTablesLocalhostNodePorts feature gate is enabled and the list explicitly includes loopback (e.g. 'localhost'). If unset, this defaults to 'all' in iptables and ipvs mode, and to 'primary' in nftables mode. This parameter is ignored if a config file is specified by --config.

 | --one_output

 |  | If true, only write logs to their native severity level (vs also writing to each lower severity level; no effect when -logtostderr=true)

 | --oom-score-adj int32     Default: -999

 |  | The oom-score-adj value for kube-proxy process. Values must be within the range [-1000, 1000]. This parameter is ignored if a config file is specified by --config.

 | --pod-bridge-interface string

 |  | A bridge interface name. When --detect-local-mode is set to BridgeInterface, kube-proxy will consider traffic to be local if it originates from this bridge.

 | --pod-interface-name-prefix string

 |  | An interface name prefix. When --detect-local-mode is set to InterfaceNamePrefix, kube-proxy will consider traffic to be local if it originates from any interface whose name begins with this prefix.

 | --profiling

 |  | If true enables profiling via web interface on /debug/pprof handler. This parameter is ignored if a config file is specified by --config.

 | --proxy-mode ProxyMode

 |  | Which proxy mode to use: on Linux this can be 'iptables' (default), 'ipvs', or 'nftables'. On Windows the only supported value is 'kernelspace'. This parameter is ignored if a config file is specified by --config.

 | --show-hidden-metrics-for-version string

 |  | The previous version for which you want to show hidden metrics. Only the previous minor version is meaningful, other values will not be allowed. The format is <major>.<minor>, e.g.: '1.16'. The purpose of this format is make sure you have the opportunity to notice if the next release hides additional metrics, rather than being surprised when they are permanently removed in the release after that. This parameter is ignored if a config file is specified by --config.

 | --skip_headers

 |  | If true, avoid header prefixes in the log messages

 | --skip_log_headers

 |  | If true, avoid headers when opening log files (no effect when -logtostderr=true)

 | --stderrthreshold int     Default: 2

 |  | logs at or above this threshold go to stderr when writing to files and stderr (no effect when -logtostderr=true or -alsologtostderr=true unless -legacy_stderr_threshold_behavior=false)

 | -v, --v int

 |  | number for the log level verbosity

 | --version version[=true]

 |  | --version, --version=raw prints version information and quits; --version=vX.Y.Z... sets the reported version

 | --vmodule pattern=N,...

 |  | comma-separated list of pattern=N settings for file-filtered logging (only works for text log format)

 | --write-config-to string

 |  | If set, write the default configuration values to this file and exit.
