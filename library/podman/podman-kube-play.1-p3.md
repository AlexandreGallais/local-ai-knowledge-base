---
title: "podman-kube-play.1 (part 3 of 3)"
tool: "podman"
version: "6.2"
source: "https://github.com/containers/podman/blob/055de046937d29450f310fce0fe3071485d8bed9/docs/source/markdown/podman-kube-play.1.md.in"
commit: "055de046937d29450f310fce0fe3071485d8bed9"
license: "Apache-2.0"
---

# podman-kube-play.1 (part 3 of 3)

### `TLSVerify=`
<< else >>
#### **--tls-verify**
<< endif >>

Require HTTPS and verify certificates when contacting registries (default: **true**).
If explicitly set to **true**, TLS verification is used.
If set to **false**, TLS verification is not used.
If not specified, TLS verification is used unless the target registry
is listed as an insecure registry in **containers-registries.conf(5)**

#### **--validate**=*mode*

Control how unrecognized YAML fields and unsupported objects are handled. Supported modes are:

- **ignore**: silently skip them (default).
- **warn**: report a warning and continue. Warnings are printed to stderr and, when using the API, returned in the play report.
- **strict**: fail with an error.

When **strict** is used, any object that fails validation halts the processing of
further objects, but prior objects will still exist and will not be rolled back.
For example, in a YAML file containing a Pod followed by an unsupported object, the
Pod is created and then the command fails.

#### **--wait**, **-w**

Run pods and containers in the foreground. Default is false.

At  any time you can run `podman pod ps` in another shell to view a list of
the running pods and containers.

When  attached  in the tty mode, you can kill the pods and containers by pressing
Ctrl-C or receiving any other interrupt signals.

All pods, containers, and volumes created with `podman kube play` is removed
upon exit.

## EXAMPLES

Recreate the pod and containers described in the specified host YAML file.
```
$ podman kube play demo.yml
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```

Recreate the pod and containers specified in a YAML file sent to stdin.
```
$ cat demo.yml | podman kube play -
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```

Tear down the pod and containers as described in the specified YAML file.
```
$  podman kube play --down demo.yml
Pods stopped:
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
Pods removed:
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```

Provide multiple configmap files as sources for environment variables within the specified pods and containers.
```
$ podman kube play demo.yml --configmap configmap-foo.yml,configmap-bar.yml
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6

$ podman kube play demo.yml --configmap configmap-foo.yml --configmap configmap-bar.yml
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```

Create a pod connected to two networks with a static ip on each.
```
$ podman kube play demo.yml --network net1:ip=10.89.1.5 --network net2:ip=10.89.10.10
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```
Please take into account that networks must be created first using podman-network-create(1).

Create and teardown from a URL pointing to a YAML file.
```
$ podman kube play https://podman.io/demo.yml
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6

$ podman kube play --down https://podman.io/demo.yml
Pods stopped:
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
Pods removed:
52182811df2b1e73f36476003a66ec872101ea59034ac0d4d3a7b40903b955a6
```
`podman kube play --down` does not work with a URL if the YAML file the URL points to
has been changed or altered.

@@include ../../kubernetes_support.md

## SEE ALSO
**podman(1)**, **podman-kube(1)**, **podman-kube-down(1)**, **podman-network-create(1)**, **podman-kube-generate(1)**, **podman-build(1)**, **containers-certs.d(5)**
