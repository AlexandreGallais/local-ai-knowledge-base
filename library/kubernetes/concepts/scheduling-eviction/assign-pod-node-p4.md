---
title: "Assigning Pods to Nodes (part 4 of 4)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/concepts/scheduling-eviction/assign-pod-node.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Assigning Pods to Nodes (part 4 of 4)

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: web-server
spec:
  selector:
    matchLabels:
      app: web-store
  replicas: 3
  template:
    metadata:
      labels:
        app: web-store
    spec:
      affinity:
        podAntiAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - web-store
            topologyKey: "kubernetes.io/hostname"
        podAffinity:
          requiredDuringSchedulingIgnoredDuringExecution:
          - labelSelector:
              matchExpressions:
              - key: app
                operator: In
                values:
                - store
            topologyKey: "kubernetes.io/hostname"
      containers:
      - name: web-app
        image: nginx:1.16-alpine
```

Creating the two preceding Deployments results in the following cluster layout,
where each web server is co-located with a cache, on three separate nodes.

|    node-1     |    node-2     |    node-3     |
| :-----------: | :-----------: | :-----------: |
| *webserver-1* | *webserver-2* | *webserver-3* |
|   *cache-1*   |   *cache-2*   |   *cache-3*   |

The overall effect is that each cache instance is likely to be accessed by a single client that
is running on the same node. This approach aims to minimize both skew (imbalanced load) and latency.

You might have other reasons to use Pod anti-affinity.
See the ZooKeeper tutorial
for an example of a StatefulSet configured with anti-affinity for high
availability, using the same technique as this example.

## nodeName

`nodeName` is a more direct form of node selection than affinity or
`nodeSelector`. `nodeName` is a field in the Pod spec. If the `nodeName` field
is not empty, the scheduler ignores the Pod and the kubelet on the named node
tries to place the Pod on that node. Using `nodeName` overrules using
`nodeSelector` or affinity and anti-affinity rules.

Some of the limitations of using `nodeName` to select nodes are:

- If the named node does not exist, the Pod will not run, and in
  some cases may be automatically deleted.
- If the named node does not have the resources to accommodate the
  Pod, the Pod will fail and its reason will indicate why,
  for example OutOfmemory or OutOfcpu.
- Node names in cloud environments are not always predictable or stable.

**Warning:**
`nodeName` is intended for use by custom schedulers or advanced use cases where
you need to bypass any configured schedulers. Bypassing the schedulers might lead to
failed Pods if the assigned Nodes get oversubscribed. You can use node affinity
or the `nodeSelector` field to assign a Pod to a specific Node without bypassing the schedulers.

Here is an example of a Pod spec using the `nodeName` field:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
spec:
  containers:
  - name: nginx
    image: nginx
  nodeName: kube-01
```

The above Pod will only run on the node `kube-01`.

## nominatedNodeName

**Feature state:**

`nominatedNodeName` can be used for external components to nominate node for a pending pod.
This nomination is best effort: it might be ignored if the scheduler determines the pod cannot go to a nominated node.

Also, this field can be (over)written by the scheduler:
- If the scheduler finds a node to nominate via the preemption.
- If the scheduler decides where the pod is going, and move it to the binding cycle.
  - Note that, in this case, `nominatedNodeName` is put only when the pod has to go through `WaitOnPermit` or `PreBind` extension points.

Here is an example of a Pod status using the `nominatedNodeName` field:

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: nginx
...
status:
  nominatedNodeName: kube-01
```

## Pod topology spread constraints

You can use _topology spread constraints_ to control how Pods
are spread across your cluster among failure-domains such as regions, zones, nodes, or among any other
topology domains that you define. You might do this to improve performance, expected availability, or
overall utilization.

Read Pod topology spread constraints
to learn more about how these work.

## Pod topology labels

**Feature state:**

Pods inherit the topology labels (`topology.kubernetes.io/zone` and `topology.kubernetes.io/region`) from their assigned Node if those labels are present. These labels can then be utilized via the Downward API to provide the workload with node topology awareness.

Here is an example of a Pod using downward API for it's zone and region:
```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod-with-topology-labels
spec:
  containers:
    - name: app
      image: alpine
      command: ["sh", "-c", "env"]
      env:
        - name: MY_ZONE
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['topology.kubernetes.io/zone']
        - name: MY_REGION
          valueFrom:
            fieldRef:
              fieldPath: metadata.labels['topology.kubernetes.io/region']
```

## Operators

The following are all the logical operators that you can use in the `operator` field for `nodeAffinity` and `podAffinity` mentioned above.

|    Operator    |    Behavior     |
| :------------: | :-------------: |
| `In` | The label value is present in the supplied set of strings |
|   `NotIn`   | The label value is not contained in the supplied set of strings |
| `Exists` | A label with this key <example-value> on the object |
| `DoesNotExist` | No label with this key <example-value> on the object |

The following operators can only be used with `nodeAffinity`.

|    Operator    |    Behavior    |
| :------------: | :-------------: |
| `Gt` | The field value will be parsed as an integer, and the integer that results from parsing the value of a label named by this selector is greater than this integer |
| `Lt` | The field value will be parsed as an integer, and the integer that results from parsing the value of a label named by this selector is less than this integer |

**Note:**

`Gt` and `Lt` operators will not work with non-integer values. If the given value
doesn't parse as an integer, the Pod will fail to get scheduled. Also, `Gt` and `Lt`
are not available for `podAffinity`.

## What's next

- Read more about taints and tolerations.
- Read the design docs for node affinity
  and for inter-pod affinity/anti-affinity.
- Learn about how the topology manager takes part in node-level
  resource allocation decisions.
- Learn how to use nodeSelector.
- Learn how to use affinity and anti-affinity.
