---
title: "Install Drivers and Allocate Devices with DRA (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/cluster-management/install-use-dra.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Install Drivers and Allocate Devices with DRA (part 2 of 2)

## Claim resources and deploy a Pod {#claim-resources-pod}

To request resources using DRA, you create ResourceClaims or
ResourceClaimTemplates that define the resources that your Pods need. In the
example driver, a memory capacity attribute is exposed for mock GPU devices.
This section shows you how to use cel to
express your requirements in a ResourceClaim, select that ResourceClaim in a Pod
specification, and observe the resource allocation.

This tutorial showcases only one basic <example-value> of a DRA ResourceClaim. Read
Dynamic Resource Allocation
to learn more about ResourceClaims.

### Create the ResourceClaim

In this section, you create a ResourceClaim and reference it in a Pod. Whatever
the claim, the `deviceClassName` is a required field, narrowing down the scope
of the request to a specific device class. The request itself can include a
cel expression that references attributes that
may be advertised by the driver managing that device class.

In this example, you will create a request for any GPU advertising over 10Gi
memory capacity. The attribute exposing capacity from the example driver takes
the form `device.capacity['gpu.example.com'].memory`. Note also that the name of
the claim is set to `some-gpu`.

```yaml
apiVersion: resource.k8s.io/v1
kind: ResourceClaim
metadata:
 name: some-gpu
 namespace: dra-tutorial
spec:
   devices:
     requests:
     - name: some-gpu
       exactly:
         deviceClassName: gpu.example.com
         selectors:
         - cel:
             expression: "device.capacity['gpu.example.com'].memory.compareTo(quantity('10Gi')) >= 0"
```

```shell
kubectl apply --server-side -f https://k8s.io/examples/dra/driver-install/example/resourceclaim.yaml
```

### Create the Pod that references that ResourceClaim

Below is the Pod manifest referencing the ResourceClaim you just made,
`some-gpu`, in the `spec.resourceClaims.resourceClaimName` field. The local name
for that claim, `gpu`, is then used in the
`spec.containers.resources.claims.name` field to allocate the claim to the Pod's
underlying container.

```yaml
apiVersion: v1
kind: Pod
metadata:
  name: pod0
  namespace: dra-tutorial
  labels:
    app: pod
spec:
  containers:
  - name: ctr0
    image: ubuntu:24.04
    command: ["bash", "-c"]
    args: ["export; trap 'exit 0' TERM; sleep 9999 & wait"]
    resources:
      claims:
      - name: gpu
  resourceClaims:
  - name: gpu
    resourceClaimName: some-gpu
```

```shell
kubectl apply --server-side -f https://k8s.io/examples/dra/driver-install/example/pod.yaml
```

Confirm the pod has deployed:

```shell
kubectl get pod pod0 -n dra-tutorial
```

The output is similar to this:

```
NAME   READY   STATUS    RESTARTS   AGE
pod0   1/1     Running   0          9s
```

### Explore the DRA state

After you create the Pod, the cluster tries to schedule that Pod to a node where
Kubernetes can satisfy the ResourceClaim. In this tutorial, the DRA driver is
deployed on all nodes, and is advertising mock GPUs on all nodes, all of which
have enough capacity advertised to satisfy the Pod's claim, so Kubernetes can
schedule this Pod on any node and can allocate any of the mock GPUs on that
node.

When Kubernetes allocates a mock GPU to a Pod, the example driver adds
environment variables in each container it is allocated to in order to indicate
which GPUs _would_ have been injected into them by a real resource driver and
how they would have been configured, so you can check those environment
variables to see how the Pods have been handled by the system.

1.  Check the Pod logs, which report the name of the mock GPU that was allocated:

    ```shell
    kubectl logs pod0 -c ctr0 -n dra-tutorial | grep -E "GPU_DEVICE_[0-9]+=" | grep -v "RESOURCE_CLAIM"
    ```

    The output is similar to this:
    ```
    declare -x GPU_DEVICE_0="gpu-0"
    ```

1.  Check the state of the ResourceClaim object:

    ```shell
    kubectl get resourceclaims -n dra-tutorial
    ```

    The output is similar to this:

    ```
    NAME       STATE                AGE
    some-gpu   allocated,reserved   34s
    ```

    In this output, the `STATE` column shows that the ResourceClaim is allocated
    and reserved.

1.  Check the details of the `some-gpu` ResourceClaim. The `status` stanza of
    the ResourceClaim has information about the allocated device and the Pod it
    has been reserved for:

    ```shell
    kubectl get resourceclaim some-gpu -n dra-tutorial -o yaml
    ```

    The output is similar to this:

    apiVersion: resource.k8s.io/v1
    kind: ResourceClaim
    metadata:
      creationTimestamp: "2025-08-20T18:17:31Z"
      finalizers:
      - resource.kubernetes.io/delete-protection
      name: some-gpu
      namespace: dra-tutorial
      resourceVersion: "2326"
      uid: d3e48dbf-40da-47c3-a7b9-f7d54d1051c3
    spec:
      devices:
        requests:
        - exactly:
            allocationMode: ExactCount
            count: 1
            deviceClassName: gpu.example.com
            selectors:
            - cel:
                expression: device.capacity['gpu.example.com'].memory.compareTo(quantity('10Gi'))
                >= 0
          name: some-gpu
    status:
      allocation:
        devices:
          results:
          - device: gpu-0
            driver: gpu.example.com
            pool: kind-worker
            request: some-gpu
        nodeSelector:
          nodeSelectorTerms:
          - matchFields:
            - key: metadata.name
              operator: In
              values:
              - kind-worker
      reservedFor:
      - name: pod0
        resource: pods
        uid: c4dadf20-392a-474d-a47b-ab82080c8bd7

1.  To check how the driver handled device allocation, get the logs for the
    driver DaemonSet Pods:

    ```shell
    kubectl logs -l app.kubernetes.io/name=dra-example-driver -n dra-tutorial
    ```

    The output is similar to this:
    ```
    I0820 18:17:44.131324       1 driver.go:106] PrepareResourceClaims is called: number of claims: 1
    I0820 18:17:44.135056       1 driver.go:133] Returning newly prepared devices for claim 'd3e48dbf-40da-47c3-a7b9-f7d54d1051c3': [{[some-gpu] kind-worker gpu-0 [k8s.gpu.example.com/gpu=common k8s.gpu.example.com/gpu=d3e48dbf-40da-47c3-a7b9-f7d54d1051c3-gpu-0]}]
    ```

You have now successfully deployed a Pod that claims devices using DRA, verified
that the Pod was scheduled to an appropriate node, and saw that the associated
DRA APIs kinds were updated with the allocation status.

## Delete a Pod that has a claim {#delete-pod-claim}

When a Pod with a claim is deleted, the DRA driver deallocates the resource so
it can be available for future scheduling. To validate this behavior, delete the
Pod that you created in the previous steps and watch the corresponding changes
to the ResourceClaim and driver.

Delete the `pod0` Pod:

```shell
kubectl delete pod pod0 -n dra-tutorial
```

The output is similar to this:

```
pod "pod0" deleted
```

### Observe the DRA state

When the Pod is deleted, the driver deallocates the device from the
ResourceClaim and updates the ResourceClaim resource in the Kubernetes API. The
ResourceClaim has a `pending` state until it's referenced in a new Pod.

1.  Check the state of the `some-gpu` ResourceClaim:

    ```shell
    kubectl get resourceclaims -n dra-tutorial
    ```

    The output is similar to this:
    ```
    NAME       STATE     AGE
    some-gpu   pending   76s
    ```

1.  Verify that the driver has processed unpreparing the device for this claim by
   checking the driver logs:

    ```shell
    kubectl logs -l app.kubernetes.io/name=dra-example-driver -n dra-tutorial
    ```
    The output is similar to this:
    ```
    I0820 18:22:15.629376       1 driver.go:138] UnprepareResourceClaims is called: number of claims: 1
    ```

You have now deleted a Pod that had a claim, and observed that the driver took
action to unprepare the underlying hardware resource and update the DRA APIs to
reflect that the resource is available again for future scheduling.

## Clean up

To clean up the resources that you created in this tutorial, follow these steps:

```shell
kubectl delete namespace dra-tutorial
kubectl delete deviceclass gpu.example.com
kubectl delete clusterrole dra-example-driver-role
kubectl delete clusterrolebinding dra-example-driver-role-binding
kubectl delete priorityclass dra-driver-high-priority
```

## What's next

* Learn more about DRA
* Allocate Devices to Workloads with DRA
