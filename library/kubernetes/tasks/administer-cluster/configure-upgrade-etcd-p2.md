---
title: "Operating etcd clusters for Kubernetes (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/administer-cluster/configure-upgrade-etcd.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Operating etcd clusters for Kubernetes (part 2 of 2)

## Restoring an etcd cluster

**Caution:**
If any API servers are running in your cluster, you should not attempt to
restore instances of etcd. Instead, follow these steps to restore etcd:

- stop *all* API server instances
- restore state in all etcd instances
- restart all API server instances

The Kubernetes project also recommends restarting Kubernetes components (`kube-scheduler`,
`kube-controller-manager`, `kubelet`) to ensure that they don't rely on some
stale data. In practice the restore takes a bit of time.  During the
restoration, critical components will lose leader lock and restart themselves.

etcd supports restoring from snapshots that are taken from an etcd process of
the major.minor version. Restoring a version from a
different patch version of etcd is also supported. A restore operation is
employed to recover the data of a failed cluster.

Before starting the restore operation, a snapshot file must be present. It can
either be a snapshot file from a previous backup operation, or from a remaining
data directory.

**Use etcdutl**
   When restoring the cluster using `etcdutl`,
   use the `--data-dir` option to specify to which folder the cluster should be restored:

   ```shell
   etcdutl --data-dir <data-dir-location> snapshot restore snapshot.db
   ```
   where `<data-dir-location>` is a directory that will be created during the restore process.

**Use etcdctl (Deprecated)**

   **Note:**
   The usage of `etcdctl` for restoring has been **deprecated** since etcd v3.5.x and is slated for removal from etcd v3.6.
   It is recommended to utilize `etcdutl` instead.

   The below example depicts the usage of the `etcdctl` tool for the restore operation:

   ```shell
   export ETCDCTL_API=3
   etcdctl --data-dir <data-dir-location> snapshot restore snapshot.db
   ```

If `<data-dir-location>` is the same folder as before, delete it and stop the etcd process before restoring the cluster.
Otherwise, change etcd configuration and restart the etcd process after restoration to have it use the new data directory:
first change  `/etc/kubernetes/manifests/etcd.yaml`'s `volumes.hostPath.path` for `name: etcd-data`  to `<data-dir-location>`,
then execute `kubectl -n kube-system delete pod <name-of-etcd-pod>` or `systemctl restart kubelet.service` (or both).
On a cluster that kubeadm manages, also set `etcd.local.dataDir` to `<data-dir-location>` in the `kubeadm-config` ConfigMap
(Reconfiguring a kubeadm cluster).
If it still names the old directory, the next `kubeadm upgrade` writes an etcd manifest for that directory.

For more information and examples on restoring a cluster from a snapshot file, see
etcd disaster recovery documentation.

If the access URLs of the restored cluster are changed from the previous
cluster, the Kubernetes API server must be reconfigured accordingly. In this
case, restart Kubernetes API servers with the flag
`--etcd-servers=$NEW_ETCD_CLUSTER` instead of the flag
`--etcd-servers=$OLD_ETCD_CLUSTER`. Replace `$NEW_ETCD_CLUSTER` and
`$OLD_ETCD_CLUSTER` with the respective IP addresses. If a load balancer is
used in front of an etcd cluster, you might need to update the load balancer
instead.

If the majority of etcd members have permanently failed, the etcd cluster is
considered failed. In this scenario, Kubernetes cannot make any changes to its
current state. Although the scheduled pods might continue to run, no new pods
can be scheduled. In such cases, recover the etcd cluster and potentially
reconfigure Kubernetes API servers to fix the issue.

## Upgrading etcd clusters

**Caution:**
Before you start an upgrade, back up your etcd cluster first.

For details on etcd upgrade, refer to the etcd upgrades documentation.

## Streaming reads from etcd

**Feature state:**

With the `EtcdRangeStream` feature gate enabled and etcd v3.7 or later, the API server
reads large collections from etcd as a stream instead of in pages, which lowers peak
memory use on both sides. If the backend does not implement the `RangeStream` RPC, the
API server detects the gRPC `Unimplemented` response and falls back to paginated reads.
If your etcd-compatible backend or proxy does not fall back cleanly, disable the gate
with `--feature-gates=EtcdRangeStream=false`.

**Note:**
Streamed reads are recorded as `operation="listStream"` in the
`etcd_request_duration_seconds` metric. Update any dashboard or alert that matches
`operation="list"`.

## Maintaining etcd clusters

For more details on etcd maintenance, please refer to the etcd maintenance documentation.

### Cluster defragmentation

Defragmentation is an expensive operation, so it should be executed as infrequently
as possible. On the other hand, it's also necessary to make sure any etcd member
will not exceed the storage quota. The Kubernetes project recommends that when
you perform defragmentation, you use a tool such as etcd-defrag.

You can also run the defragmentation tool as a Kubernetes CronJob, to make sure that
defragmentation happens regularly. See `etcd-defrag-cronjob.yaml`
for details.
