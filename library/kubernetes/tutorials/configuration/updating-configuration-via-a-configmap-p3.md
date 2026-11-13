---
title: "Updating Configuration via a ConfigMap (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/configuration/updating-configuration-via-a-configmap.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Updating Configuration via a ConfigMap (part 3 of 3)

## Update configuration via an immutable ConfigMap that is mounted as a volume {#rollout-configmap-immutable-volume}

Immutable ConfigMaps are especially used for configuration that is constant and is **not** expected
to change over time. Marking a ConfigMap as immutable allows a performance improvement where the kubelet does not watch for changes.

If you do need to make a change, you should plan to either:

- change the name of the ConfigMap, and switch to running Pods that reference the new name
- replace all the nodes in your cluster that have previously run a Pod that used the old value
- restart the kubelet on any node where the kubelet previously loaded the old ConfigMap

An example manifest for an Immutable ConfigMap is shown below.
```yaml
apiVersion: v1
data:
  company_name: "ACME, Inc." # existing fictional company name
kind: ConfigMap
immutable: true
metadata:
  name: company-name-20150801
```

Create the Immutable ConfigMap:

```shell
kubectl apply -f https://k8s.io/examples/configmap/immutable-configmap.yaml
```

Below is an example of a Deployment manifest with the Immutable ConfigMap `company-name-20150801` mounted as a
volume into the Pod's only container.

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: immutable-configmap-volume
  labels:
    app.kubernetes.io/name: immutable-configmap-volume
spec:
  replicas: 3
  selector:
    matchLabels:
      app.kubernetes.io/name: immutable-configmap-volume
  template:
    metadata:
      labels:
        app.kubernetes.io/name: immutable-configmap-volume
    spec:
      containers:
        - name: alpine
          image: alpine:3
          command:
            - /bin/sh
            - -c
            - while true; do echo "$(date) The name of the company is $(cat /etc/config/company_name)";
              sleep 10; done;
          ports:
            - containerPort: 80
          volumeMounts:
            - name: config-volume
              mountPath: /etc/config
      volumes:
        - name: config-volume
          configMap:
            name: company-name-20150801
```

Create the Deployment:

```shell
kubectl apply -f https://k8s.io/examples/deployments/deployment-with-immutable-configmap-as-volume.yaml
```

Check the pods for this Deployment to ensure they are ready (matching by
selector):

```shell
kubectl get pods --selector=app.kubernetes.io/name=immutable-configmap-volume
```

You should see an output similar to:

```
NAME                                          READY   STATUS    RESTARTS   AGE
immutable-configmap-volume-78b6fbff95-5gsfh   1/1     Running   0          62s
immutable-configmap-volume-78b6fbff95-7vcj4   1/1     Running   0          62s
immutable-configmap-volume-78b6fbff95-vdslm   1/1     Running   0          62s
```

The Pod's container refers to the data defined in the ConfigMap and uses it to print a report to stdout.
You can check this report by viewing the logs for one of the Pods in that Deployment:

```shell
# Pick one Pod that belongs to the Deployment, and view its logs
kubectl logs deployments/immutable-configmap-volume
```

You should see an output similar to:

```
Found 3 pods, using pod/immutable-configmap-volume-78b6fbff95-5gsfh
Wed Mar 20 03:52:34 UTC 2024 The name of the company is ACME, Inc.
Wed Mar 20 03:52:44 UTC 2024 The name of the company is ACME, Inc.
Wed Mar 20 03:52:54 UTC 2024 The name of the company is ACME, Inc.
```

Once a ConfigMap is marked as immutable, it is not possible to revert this change
nor to mutate the contents of the data or the binaryData field.
In order to modify the behavior of the Pods that use this configuration,
you will create a new immutable ConfigMap and edit the Deployment
to define a slightly different pod template, referencing the new ConfigMap.

Create a new immutable ConfigMap by using the manifest shown below:

```yaml
apiVersion: v1
data:
  company_name: "Fiktivesunternehmen GmbH" # new fictional company name
kind: ConfigMap
immutable: true
metadata:
  name: company-name-20240312
```

```shell
kubectl apply -f https://k8s.io/examples/configmap/new-immutable-configmap.yaml
```

You should see an output similar to:

```
configmap/company-name-20240312 created
```

Check the newly created ConfigMap:

```shell
kubectl get configmap
```

You should see an output displaying both the old and new ConfigMaps:

```
NAME                    DATA   AGE
company-name-20150801   1      22m
company-name-20240312   1      24s
```

Modify the Deployment to reference the new ConfigMap.

Edit the Deployment:

```shell
kubectl edit deployment immutable-configmap-volume
```

In the editor that appears, update the existing volume definition to use the new ConfigMap.

```yaml
volumes:
- configMap:
    defaultMode: 420
    name: company-name-20240312 # Update this field
  name: config-volume
```

You should see the following output:

```
deployment.apps/immutable-configmap-volume edited
```

This will trigger a rollout. Wait for all the previous Pods to terminate and the new Pods to be in a ready state.

Monitor the status of the Pods:

```shell
kubectl get pods --selector=app.kubernetes.io/name=immutable-configmap-volume
```

```
NAME                                          READY   STATUS        RESTARTS   AGE
immutable-configmap-volume-5fdb88fcc8-29v8n   1/1     Running       0          13s
immutable-configmap-volume-5fdb88fcc8-52ddd   1/1     Running       0          14s
immutable-configmap-volume-5fdb88fcc8-n5jx4   1/1     Running       0          15s
immutable-configmap-volume-78b6fbff95-5gsfh   1/1     Terminating   0          32m
immutable-configmap-volume-78b6fbff95-7vcj4   1/1     Terminating   0          32m
immutable-configmap-volume-78b6fbff95-vdslm   1/1     Terminating   0          32m
```

You should eventually see an output similar to:

```
NAME                                          READY   STATUS    RESTARTS   AGE
immutable-configmap-volume-5fdb88fcc8-29v8n   1/1     Running   0          43s
immutable-configmap-volume-5fdb88fcc8-52ddd   1/1     Running   0          44s
immutable-configmap-volume-5fdb88fcc8-n5jx4   1/1     Running   0          45s
```

View the logs for a Pod in this Deployment:

```shell
# Pick one Pod that belongs to the Deployment, and view its logs
kubectl logs deployment/immutable-configmap-volume
```

You should see an output similar to the below:

```
Found 3 pods, using pod/immutable-configmap-volume-5fdb88fcc8-n5jx4
Wed Mar 20 04:24:17 UTC 2024 The name of the company is Fiktivesunternehmen GmbH
Wed Mar 20 04:24:27 UTC 2024 The name of the company is Fiktivesunternehmen GmbH
Wed Mar 20 04:24:37 UTC 2024 The name of the company is Fiktivesunternehmen GmbH
```

Once all the deployments have migrated to use the new immutable ConfigMap, it is advised to delete the old one.

```shell
kubectl delete configmap company-name-20150801
```

## Summary

Changes to a ConfigMap mounted as a Volume on a Pod are available seamlessly after the subsequent kubelet sync.

Changes to a ConfigMap that configures environment variables for a Pod are available after the subsequent rollout for the Pod.

Once a ConfigMap is marked as immutable, it is not possible to revert this change
(you cannot make an immutable ConfigMap mutable), and you also cannot make any change
to the contents of the `data` or the `binaryData` field. You can delete and recreate
the ConfigMap, or you can make a new different ConfigMap. When you delete a ConfigMap,
running containers and their Pods maintain a mount point to any volume that referenced
that existing ConfigMap.

## Clean up

Terminate the `kubectl port-forward` commands in case they are running.

Delete the resources created during the tutorial:

```shell
kubectl delete deployment configmap-volume configmap-env-var configmap-two-containers configmap-sidecar-container immutable-configmap-volume
kubectl delete service configmap-service configmap-sidecar-service
kubectl delete configmap sport fruits color company-name-20240312

kubectl delete configmap company-name-20150801 # In case it was not handled during the task execution
```
