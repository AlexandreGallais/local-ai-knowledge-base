---
title: "Run a Replicated Stateful Application (part 1 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/run-application/run-replicated-stateful-application.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

This page shows how to run a replicated stateful application using a
statefulset.
This application is a replicated MySQL database. The example topology has a
single primary server and multiple replicas, using asynchronous row-based
replication.

**Note:**
**This is not a production configuration**. MySQL settings remain on insecure defaults to keep the focus
on general patterns for running stateful applications in Kubernetes.

## Before you begin

-
-
- This tutorial assumes you are familiar with
  PersistentVolumes
  and StatefulSets,
  as well as other core concepts like Pods,
  Services, and
  ConfigMaps.
- Some familiarity with MySQL helps, but this tutorial aims to present
  general patterns that should be useful for other systems.
- You are using the default namespace or another namespace that does not contain any conflicting objects.
- You need to have a AMD64-compatible CPU.

## Objectives

- Deploy a replicated MySQL topology with a StatefulSet.
- Send MySQL client traffic.
- Observe resistance to downtime.
- Scale the StatefulSet up and down.

## Deploy MySQL

The example MySQL deployment consists of a ConfigMap, two Services,
and a StatefulSet.

### Create a ConfigMap {#configmap}

Create the ConfigMap from the following YAML configuration file:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: mysql
  labels:
    app: mysql
    app.kubernetes.io/name: mysql
data:
  primary.cnf: |
    # Apply this config only on the primary.
    [mysqld]
    log-bin
  replica.cnf: |
    # Apply this config only on replicas.
    [mysqld]
    super-read-only
```

```shell
kubectl apply -f https://k8s.io/examples/application/mysql/mysql-configmap.yaml
```

This ConfigMap provides `my.cnf` overrides that let you independently control
configuration on the primary MySQL server and its replicas.
In this case, you want the primary server to be able to serve replication logs to replicas
and you want replicas to reject any writes that don't come via replication.

There's nothing special about the ConfigMap itself that causes different
portions to apply to different Pods.
Each Pod decides which portion to look at as it's initializing,
based on information provided by the StatefulSet controller.

### Create Services {#services}

Create the Services from the following YAML configuration file:

```yaml
# Headless service for stable DNS entries of StatefulSet members.
apiVersion: v1
kind: Service
metadata:
  name: mysql
  labels:
    app: mysql
    app.kubernetes.io/name: mysql
spec:
  ports:
  - name: mysql
    port: 3306
  clusterIP: None
  selector:
    app: mysql
---
# Client service for connecting to any MySQL instance for reads.
# For writes, you must instead connect to the primary: mysql-0.mysql.
apiVersion: v1
kind: Service
metadata:
  name: mysql-read
  labels:
    app: mysql
    app.kubernetes.io/name: mysql
    readonly: "true"
spec:
  ports:
  - name: mysql
    port: 3306
  selector:
    app: mysql
```

```shell
kubectl apply -f https://k8s.io/examples/application/mysql/mysql-services.yaml
```

The headless Service provides a home for the DNS entries that the StatefulSet
controllers creates for each
Pod that's part of the set.
Because the headless Service is named `mysql`, the Pods are accessible by
resolving `<pod-name>.mysql` from within any other Pod in the same Kubernetes
cluster and namespace.

The client Service, called `mysql-read`, is a normal Service with its own
cluster IP that distributes connections across all MySQL Pods that report
being Ready. The set of potential endpoints includes the primary MySQL server and all
replicas.

Note that only read queries can use the load-balanced client Service.
Because there is only one primary MySQL server, clients should connect directly to the
primary MySQL Pod (through its DNS entry within the headless Service) to execute
writes.

### Create the StatefulSet {#statefulset}

Finally, create the StatefulSet from the following YAML configuration file:

```yaml
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: mysql
spec:
  selector:
    matchLabels:
      app: mysql
      app.kubernetes.io/name: mysql
  serviceName: mysql
  replicas: 3
  template:
    metadata:
      labels:
        app: mysql
        app.kubernetes.io/name: mysql
    spec:
      initContainers:
      - name: init-mysql
        image: mysql:5.7
        command:
        - bash
        - "-c"
        - |
          set -ex
          # Generate mysql server-id from pod ordinal index.
          [[ $HOSTNAME =~ -([0-9]+)$ ]] || exit 1
          ordinal=${BASH_REMATCH[1]}
          echo [mysqld] > /mnt/conf.d/server-id.cnf
          # Add an offset to avoid reserved server-id=0 value.
          echo server-id=$((100 + $ordinal)) >> /mnt/conf.d/server-id.cnf
          # Copy appropriate conf.d files from config-map to emptyDir.
          if [[ $ordinal -eq 0 ]]; then
            cp /mnt/config-map/primary.cnf /mnt/conf.d/
          else
            cp /mnt/config-map/replica.cnf /mnt/conf.d/
          fi
        volumeMounts:
        - name: conf
          mountPath: /mnt/conf.d
        - name: config-map
          mountPath: /mnt/config-map
      - name: clone-mysql
        image: gcr.io/google-samples/xtrabackup:1.0
        command:
        - bash
        - "-c"
        - |
          set -ex
          # Skip the clone if data already exists.
          [[ -d /var/lib/mysql/mysql ]] && exit 0
          # Skip the clone on primary (ordinal index 0).
          [[ `hostname` =~ -([0-9]+)$ ]] || exit 1
          ordinal=${BASH_REMATCH[1]}
          [[ $ordinal -eq 0 ]] && exit 0
          # Clone data from previous peer.
          ncat --recv-only mysql-$(($ordinal-1)).mysql 3307 | xbstream -x -C /var/lib/mysql
          # Prepare the backup.
          xtrabackup --prepare --target-dir=/var/lib/mysql
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
          subPath: mysql
        - name: conf
          mountPath: /etc/mysql/conf.d
      containers:
      - name: mysql
        image: mysql:5.7
        env:
        - name: MYSQL_ALLOW_EMPTY_PASSWORD
          value: "1"
        ports:
        - name: mysql
          containerPort: 3306
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
          subPath: mysql
        - name: conf
          mountPath: /etc/mysql/conf.d
        resources:
          requests:
            cpu: 500m
            memory: 1Gi
        livenessProbe:
          exec:
            command: ["mysqladmin", "ping"]
          initialDelaySeconds: 30
          periodSeconds: 10
          timeoutSeconds: 5
        readinessProbe:
          exec:
            # Check we can execute queries over TCP (skip-networking is off).
            command: ["mysql", "-h", "127.0.0.1", "-e", "SELECT 1"]
          initialDelaySeconds: 5
          periodSeconds: 2
          timeoutSeconds: 1
      - name: xtrabackup
        image: gcr.io/google-samples/xtrabackup:1.0
        ports:
        - name: xtrabackup
          containerPort: 3307
        command:
        - bash
        - "-c"
        - |
          set -ex
          cd /var/lib/mysql

          # Determine binlog position of cloned data, if any.
          if [[ -f xtrabackup_slave_info && "x$(<xtrabackup_slave_info)" != "x" ]]; then
            # XtraBackup already generated a partial "CHANGE MASTER TO" query
            # because we're cloning from an existing replica. (Need to remove the tailing semicolon!)
            cat xtrabackup_slave_info | sed -E 's/;$//g' > change_master_to.sql.in
            # Ignore xtrabackup_binlog_info in this case (it's useless).
            rm -f xtrabackup_slave_info xtrabackup_binlog_info
          elif [[ -f xtrabackup_binlog_info ]]; then
            # We're cloning directly from primary. Parse binlog position.
            [[ `cat xtrabackup_binlog_info` =~ ^(.*?)[[:space:]]+(.*?)$ ]] || exit 1
            rm -f xtrabackup_binlog_info xtrabackup_slave_info
            echo "CHANGE MASTER TO MASTER_LOG_FILE='${BASH_REMATCH[1]}',\
                  MASTER_LOG_POS=${BASH_REMATCH[2]}" > change_master_to.sql.in
          fi

          # Check if we need to complete a clone by starting replication.
          if [[ -f change_master_to.sql.in ]]; then
            echo "Waiting for mysqld to be ready (accepting connections)"
            until mysql -h 127.0.0.1 -e "SELECT 1"; do sleep 1; done

            echo "Initializing replication from clone position"
            mysql -h 127.0.0.1 \
                  -e "$(<change_master_to.sql.in), \
                          MASTER_HOST='mysql-0.mysql', \
                          MASTER_USER='root', \
                          MASTER_PASSWORD='', \
                          MASTER_CONNECT_RETRY=10; \
                        START SLAVE;" || exit 1
            # In case of container restart, attempt this at-most-once.
            mv change_master_to.sql.in change_master_to.sql.orig
          fi

          # Start a server to send backups when requested by peers.
          exec ncat --listen --keep-open --send-only --max-conns=1 3307 -c \
            "xtrabackup --backup --slave-info --stream=xbstream --host=127.0.0.1 --user=root"
        volumeMounts:
        - name: data
          mountPath: /var/lib/mysql
          subPath: mysql
        - name: conf
          mountPath: /etc/mysql/conf.d
        resources:
          requests:
            cpu: 100m
            memory: 100Mi
      volumes:
      - name: conf
        emptyDir: {}
      - name: config-map
        configMap:
          name: mysql
  volumeClaimTemplates:
  - metadata:
      name: data
    spec:
      accessModes: ["ReadWriteOnce"]
      resources:
        requests:
          storage: 10Gi
```

```shell
kubectl apply -f https://k8s.io/examples/application/mysql/mysql-statefulset.yaml
```

You can watch the startup progress by running:

```shell
kubectl get pods -l app=mysql --watch
```

After a while, you should see all 3 Pods become `Running`:

```
NAME      READY     STATUS    RESTARTS   AGE
mysql-0   2/2       Running   0          2m
mysql-1   2/2       Running   0          1m
mysql-2   2/2       Running   0          1m
```

Press **Ctrl+C** to cancel the watch.

**Note:**
If you don't see any progress, make sure you have a dynamic PersistentVolume
provisioner enabled, as mentioned in the prerequisites.

This manifest uses a variety of techniques for managing stateful Pods as part of
a StatefulSet. The next section highlights some of these techniques to explain
what happens as the StatefulSet creates Pods.

## Understanding stateful Pod initialization

The StatefulSet controller starts Pods one at a time, in order by their
ordinal index.
It waits until each Pod reports being Ready before starting the next one.

In addition, the controller assigns each Pod a unique, stable name of the form
`<statefulset-name>-<ordinal-index>`, which results in Pods named `mysql-0`,
`mysql-1`, and `mysql-2`.

The Pod template in the above StatefulSet manifest takes advantage of these
properties to perform orderly startup of MySQL replication.

### Generating configuration

Before starting any of the containers in the Pod spec, the Pod first runs any
init containers
in the order defined.

The first init container, named `init-mysql`, generates special MySQL config
files based on the ordinal index.

The script determines its own ordinal index by extracting it from the end of
the Pod name, which is returned by the `hostname` command.
Then it saves the ordinal (with a numeric offset to avoid reserved values)
into a file called `server-id.cnf` in the MySQL `conf.d` directory.
This translates the unique, stable identity provided by the StatefulSet
into the domain of MySQL server IDs, which require the same properties.

The script in the `init-mysql` container also applies either `primary.cnf` or
`replica.cnf` from the ConfigMap by copying the contents into `conf.d`.
Because the example topology consists of a single primary MySQL server and any number of
replicas, the script assigns ordinal `0` to be the primary server, and everyone
else to be replicas.
Combined with the StatefulSet controller's
deployment order guarantee,
this ensures the primary MySQL server is Ready before creating replicas, so they can begin
replicating.

### Cloning existing data

In general, when a new Pod joins the set as a replica, it must assume the primary MySQL
server might already have data on it. It also must assume that the replication
logs might not go all the way back to the beginning of time.
These conservative assumptions are the key to allow a running StatefulSet
to scale up and down over time, rather than being fixed at its initial size.

The second init container, named `clone-mysql`, performs a clone operation on
a replica Pod the first time it starts up on an empty PersistentVolume.
That means it copies all existing data from another running Pod,
so its local state is consistent enough to begin replicating from the primary server.

MySQL itself does not provide a mechanism to do this, so the example uses a
popular open-source tool called Percona XtraBackup.
During the clone, the source MySQL server might suffer reduced performance.
To minimize impact on the primary MySQL server, the script instructs each Pod to clone
from the Pod whose ordinal index is one lower.
This works because the StatefulSet controller always ensures Pod `N` is
Ready before starting Pod `N+1`.

### Starting replication

After the init containers complete successfully, the regular containers run.
The MySQL Pods consist of a `mysql` container that runs the actual `mysqld`
server, and an `xtrabackup` container that acts as a
sidecar.

The `xtrabackup` sidecar looks at the cloned data files and determines if
it's necessary to initialize MySQL replication on the replica.
If so, it waits for `mysqld` to be ready and then executes the
`CHANGE MASTER TO` and `START SLAVE` commands with replication parameters
extracted from the XtraBackup clone files.

Once a replica begins replication, it remembers its primary MySQL server and
reconnects automatically if the server restarts or the connection dies.
Also, because replicas look for the primary server at its stable DNS name
(`mysql-0.mysql`), they automatically find the primary server even if it gets a new
Pod IP due to being rescheduled.

Lastly, after starting replication, the `xtrabackup` container listens for
connections from other Pods requesting a data clone.
This server remains up indefinitely in case the StatefulSet scales up, or in
case the next Pod loses its PersistentVolumeClaim and needs to redo the clone.
