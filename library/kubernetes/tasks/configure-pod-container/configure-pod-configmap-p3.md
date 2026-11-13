---
title: "Configure a Pod to Use a ConfigMap (part 3 of 3)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tasks/configure-pod-container/configure-pod-configmap.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Configure a Pod to Use a ConfigMap (part 3 of 3)

## Restrictions

- You must create the `ConfigMap` object before you reference it in a Pod
  specification. Alternatively, mark the ConfigMap reference as `optional` in the Pod spec (see
  Optional ConfigMaps). If you reference a ConfigMap that doesn't exist
  and you don't mark the reference as `optional`, the Pod won't start. Similarly, references
  to keys that don't exist in the ConfigMap will also prevent the Pod from starting, unless
  you mark the key <example-value> as `optional`.

- If you use `envFrom` to define environment variables from ConfigMaps, keys that are considered
  invalid will be skipped. The pod will be allowed to start, but the invalid names will be
  recorded in the event log (`InvalidVariableNames`). The log message lists each skipped
  key. For example:

  ```shell
  kubectl get events
  ```

  The output is similar to this:
  ```
  LASTSEEN FIRSTSEEN COUNT NAME          KIND  SUBOBJECT  TYPE      REASON                            SOURCE                MESSAGE
  0s       0s        1     dapi-test-pod Pod              Warning   InvalidEnvironmentVariableNames   {kubelet, 127.0.0.1}  Keys [1badkey, 2alsobad] from the EnvFrom configMap default/myconfig were skipped since they are considered invalid environment variable names.
  ```

- ConfigMaps reside in a specific namespace.
  Pods can only refer to ConfigMaps that are in the same namespace as the Pod.

- You can't use ConfigMaps for
  static pods, because the
  kubelet does not support this.

## Clean up

Delete the ConfigMaps and Pods that you made:

```bash
kubectl delete configmaps/game-config configmaps/game-config-2 configmaps/game-config-3 \
               configmaps/game-config-env-file
kubectl delete pod dapi-test-pod --now

# You might already have removed the next set
kubectl delete configmaps/special-config configmaps/env-config
kubectl delete configmap -l 'game-config in (config-4,config-5)'
```

Remove the `kustomization.yaml` file that you used to generate the ConfigMap:

```bash
rm kustomization.yaml
```

If you created a directory `configure-pod-container` and no longer need it, you should remove that too,
or move it into the trash can / deleted files location.

```bash
rm -r configure-pod-container
```

## What's next

* Follow a real world example of
  Configuring Redis using a ConfigMap.
* Follow an example of Updating configuration via a ConfigMap.
