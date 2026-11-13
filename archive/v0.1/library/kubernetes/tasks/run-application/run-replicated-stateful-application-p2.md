---
title: "Run a Replicated Stateful Application (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/run-application/run-replicated-stateful-application.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Run a Replicated Stateful Application (part 2 of 2)

## Sending client traffic

You can send test queries to the primary MySQL server (hostname `mysql-0.mysql`)
by running a temporary container with the `mysql:5.7` image and running the
`mysql` client binary.

```shell
kubectl run mysql-client --image=mysql:5.7 -i --rm --restart=Never --\
  mysql -h mysql-0.mysql <<EOF
CREATE DATABASE test;
CREATE TABLE test.messages (message VARCHAR(250));
INSERT INTO test.messages VALUES ('hello');
EOF
```

Use the hostname `mysql-read` to send test queries to any server that reports
being Ready:

```shell
kubectl run mysql-client --image=mysql:5.7 -i -t --rm --restart=Never --\
  mysql -h mysql-read -e "SELECT * FROM test.messages"
```

You should get output like this:

```
Waiting for pod default/mysql-client to be running, status is Pending, pod ready: false
+---------+
| message |
+---------+
| hello   |
+---------+
pod "mysql-client" deleted
```

To demonstrate that the `mysql-read` Service distributes connections across
servers, you can run `SELECT @@server_id` in a loop:

```shell
kubectl run mysql-client-loop --image=mysql:5.7 -i -t --rm --restart=Never --\
  bash -ic "while sleep 1; do mysql -h mysql-read -e 'SELECT @@server_id,NOW()'; done"
```

You should see the reported `@@server_id` change randomly, because a different
endpoint might be selected upon each connection attempt:

```
+-------------+---------------------+
| @@server_id | NOW()               |
+-------------+---------------------+
|         100 | 2006-01-02 15:04:05 |
+-------------+---------------------+
+-------------+---------------------+
| @@server_id | NOW()               |
+-------------+---------------------+
|         102 | 2006-01-02 15:04:06 |
+-------------+---------------------+
+-------------+---------------------+
| @@server_id | NOW()               |
+-------------+---------------------+
|         101 | 2006-01-02 15:04:07 |
+-------------+---------------------+
```

You can press **Ctrl+C** when you want to stop the loop, but it's useful to keep
it running in another window so you can see the effects of the following steps.

## Simulate Pod and Node failure {#simulate-pod-and-node-downtime}

To demonstrate the increased availability of reading from the pool of replicas
instead of a single server, keep the `SELECT @@server_id` loop from above
running while you force a Pod out of the Ready state.

### Break the Readiness probe

The readiness probe
for the `mysql` container runs the command `mysql -h 127.0.0.1 -e 'SELECT 1'`
to make sure the server is up and able to execute queries.

One way to force this readiness probe to fail is to break that command:

```shell
kubectl exec mysql-2 -c mysql -- mv /usr/bin/mysql /usr/bin/mysql.off
```

This reaches into the actual container's filesystem for Pod `mysql-2` and
renames the `mysql` command so the readiness probe can't find it.
After a few seconds, the Pod should report one of its containers as not Ready,
which you can check by running:

```shell
kubectl get pod mysql-2
```

Look for `1/2` in the `READY` column:

```
NAME      READY     STATUS    RESTARTS   AGE
mysql-2   1/2       Running   0          3m
```

At this point, you should see your `SELECT @@server_id` loop continue to run,
although it never reports `102` anymore.
Recall that the `init-mysql` script defined `server-id` as `100 + $ordinal`,
so server ID `102` corresponds to Pod `mysql-2`.

Now repair the Pod and it should reappear in the loop output
after a few seconds:

```shell
kubectl exec mysql-2 -c mysql -- mv /usr/bin/mysql.off /usr/bin/mysql
```

### Delete Pods

The StatefulSet also recreates Pods if they're deleted, similar to what a
ReplicaSet does for stateless Pods.

```shell
kubectl delete pod mysql-2
```

The StatefulSet controller notices that no `mysql-2` Pod exists anymore,
and creates a new one with the same name and linked to the same
PersistentVolumeClaim.
You should see server ID `102` disappear from the loop output for a while
and then return on its own.

### Drain a Node

If your Kubernetes cluster has multiple Nodes, you can simulate Node downtime
(such as when Nodes are upgraded) by issuing a
drain.

First determine which Node one of the MySQL Pods is on:

```shell
kubectl get pod mysql-2 -o wide
```

The Node name should show up in the last column:

```
NAME      READY     STATUS    RESTARTS   AGE       IP            NODE
mysql-2   2/2       Running   0          15m       10.244.5.27   kubernetes-node-9l2t
```

Then, drain the Node by running the following command, which cordons it so
no new Pods may schedule there, and then evicts any existing Pods.
Replace `<node-name>` with the name of the Node you found in the last step.

**Caution:**
Draining a Node can impact other workloads and applications
running on the same node. Only perform the following step in a test
cluster.

```shell
# See above advice about impact on other workloads
kubectl drain <node-name> --force --delete-emptydir-data --ignore-daemonsets
```

Now you can watch as the Pod reschedules on a different Node:

```shell
kubectl get pod mysql-2 -o wide --watch
```

It should look something like this:

```
NAME      READY   STATUS          RESTARTS   AGE       IP            NODE
mysql-2   2/2     Terminating     0          15m       10.244.1.56   kubernetes-node-9l2t
[...]
mysql-2   0/2     Pending         0          0s        <none>        kubernetes-node-fjlm
mysql-2   0/2     Init:0/2        0          0s        <none>        kubernetes-node-fjlm
mysql-2   0/2     Init:1/2        0          20s       10.244.5.32   kubernetes-node-fjlm
mysql-2   0/2     PodInitializing 0          21s       10.244.5.32   kubernetes-node-fjlm
mysql-2   1/2     Running         0          22s       10.244.5.32   kubernetes-node-fjlm
mysql-2   2/2     Running         0          30s       10.244.5.32   kubernetes-node-fjlm
```

And again, you should see server ID `102` disappear from the
`SELECT @@server_id` loop output for a while and then return.

Now uncordon the Node to return it to a normal state:

```shell
kubectl uncordon <node-name>
```

## Scaling the number of replicas

When you use MySQL replication, you can scale your read query capacity by
adding replicas.
For a StatefulSet, you can achieve this with a single command:

```shell
kubectl scale statefulset mysql  --replicas=5
```

Watch the new Pods come up by running:

```shell
kubectl get pods -l app=mysql --watch
```

Once they're up, you should see server IDs `103` and `104` start appearing in
the `SELECT @@server_id` loop output.

You can also verify that these new servers have the data you added before they
existed:

```shell
kubectl run mysql-client --image=mysql:5.7 -i -t --rm --restart=Never --\
  mysql -h mysql-3.mysql -e "SELECT * FROM test.messages"
```

```
Waiting for pod default/mysql-client to be running, status is Pending, pod ready: false
+---------+
| message |
+---------+
| hello   |
+---------+
pod "mysql-client" deleted
```

Scaling back down is also seamless:

```shell
kubectl scale statefulset mysql --replicas=3
```

**Note:**
Although scaling up creates new PersistentVolumeClaims
automatically, scaling down does not automatically delete these PVCs.

This gives you the choice to keep those initialized PVCs around to make
scaling back up quicker, or to extract data before deleting them.

You can see this by running:

```shell
kubectl get pvc -l app=mysql
```

Which shows that all 5 PVCs still exist, despite having scaled the
StatefulSet down to 3:

```
NAME           STATUS    VOLUME                                     CAPACITY   ACCESSMODES   AGE
data-mysql-0   Bound     pvc-8acbf5dc-b103-11e6-93fa-42010a800002   10Gi       RWO           20m
data-mysql-1   Bound     pvc-8ad39820-b103-11e6-93fa-42010a800002   10Gi       RWO           20m
data-mysql-2   Bound     pvc-8ad69a6d-b103-11e6-93fa-42010a800002   10Gi       RWO           20m
data-mysql-3   Bound     pvc-50043c45-b1c5-11e6-93fa-42010a800002   10Gi       RWO           2m
data-mysql-4   Bound     pvc-500a9957-b1c5-11e6-93fa-42010a800002   10Gi       RWO           2m
```

If you don't intend to reuse the extra PVCs, you can delete them:

```shell
kubectl delete pvc data-mysql-3
kubectl delete pvc data-mysql-4
```

## Clean up

1. Cancel the `SELECT @@server_id` loop by pressing **Ctrl+C** in its terminal,
   or running the following from another terminal:

   ```shell
   kubectl delete pod mysql-client-loop --now
   ```

1. Delete the StatefulSet. This also begins terminating the Pods.

   ```shell
   kubectl delete statefulset mysql
   ```

1. Verify that the Pods disappear.
   They might take some time to finish terminating.

   ```shell
   kubectl get pods -l app=mysql
   ```

   You'll know the Pods have terminated when the above returns:

   ```
   No resources found.
   ```

1. Delete the ConfigMap, Services, and PersistentVolumeClaims.

   ```shell
   kubectl delete configmap,service,pvc -l app=mysql
   ```

1. If you manually provisioned PersistentVolumes, you also need to manually
   delete them, as well as release the underlying resources.
   If you used a dynamic provisioner, it automatically deletes the
   PersistentVolumes when it sees that you deleted the PersistentVolumeClaims.
   Some dynamic provisioners (such as those for EBS and PD) also release the
   underlying resources upon deleting the PersistentVolumes.

## What's next

- Learn more about scaling a StatefulSet.
- Learn more about debugging a StatefulSet.
- Learn more about deleting a StatefulSet.
- Learn more about force deleting StatefulSet Pods.
- Look in the Helm Charts repository
  for other stateful application examples.
