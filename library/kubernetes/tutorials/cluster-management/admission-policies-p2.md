---
title: "Explore Validating and Mutating Admission Policies (part 2 of 2)"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/tutorials/cluster-management/admission-policies.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# Explore Validating and Mutating Admission Policies (part 2 of 2)

## Modifying resources when they are created or changed {#mutation}

For this example, imagine that you want to use Pod security admission
to ensure that namespaces, other than system namespaces, enforce a Pod security standard.

Similar to validation, you can create a MutatingAdmissionPolicy that can modify
resources during admission. The API type that you need to modify is Namespace.

Here's a MutatingAdmissionPolicy that does some of this:

```yaml
---
# Caution: read the notes for this default-pod-security-baseline policy before
# you apply it, so that you understand the information security consequences.
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingAdmissionPolicy
metadata:
  name: "default-pod-security-baseline"
  annotations:
    kubernetes.io/description: "Default new namespaces to enforce the Baseline pod security standard"
spec:
  reinvocationPolicy: IfNeeded
  matchConstraints:
    resourceRules:
    - apiGroups:   [""]
      apiVersions: ["v1"]
      operations:  ["CREATE"]
      resources:   ["namespaces"]
  matchConditions:
    - name: "exclude-system-namespaces"
      # If the name begins with "kube-", it's a system namespace.
      # Assume that the API server or cluster management tooling applies relevant defaults.
      expression: "!object.metadata.name.startsWith('kube-')"
    - name: "no-existing-pod-security-label"
      expression: "!('pod-security.kubernetes.io/enforce' in object.metadata.labels)"
  mutations:
    - patchType: "ApplyConfiguration"
      applyConfiguration:
        expression: "Object{metadata: Object.metadata{labels: {'pod-security.kubernetes.io/enforce': 'baseline'}}}"
```

**Caution:**
This policy sets a **default**. Someone with the ability to update a Namespace would be able to remove the
`pod-security.kubernetes.io/enforce` label from a namespace.

If you are not sure what this means, read through the Security documentation or
get external information security advice.

To apply that policy:

```shell
kubectl apply --server-side -f https://k8s.io/examples/access/manifest-admission-control/default-pod-security-baseline.yaml 
```

A MutatingAdmissionPolicyBinding is required to activate this policy; for example:

```yaml
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingAdmissionPolicyBinding
metadata:
  name: default-pod-security-baseline
spec:
  # the name of the MutatingAdmissionPolicy to apply
  policyName: default-pod-security-baseline
```

### Test the policy {#test-admission-policy-mutation}

Try creating a new namespace named `example`:

```shell
kubectl create ns example
```

Examine its labels:
```shell
kubectl describe ns example
```

Even though you didn't specify a Pod security admission enforcement level, the label has been set.

Next, check whether you can find a way round the security settings.
Create a YAML manifest for a different Namespace:

```yaml
apiVersion: v1
kind: Namespace
metadata:
  name: another-example
  labels:
    pod-security.kubernetes.io/enforce: privileged
```

You can create that namespace from the local manifest using `kubectl apply --server-side`. Does it work?

Yes, and the new namespace allows running privileged Pods.

This admission policy was **not** set up to validate or restrict. It provides a default value, but you can set
your own.
However, you can combine mutating admission with a validating admission policy as a way to enforce something,
but also make it easy to comply. (The tutorial doesn't explain this, but you can do it).

Providing a useful default means that when people don't set anything, they get a better outcome than just seeing
an error message. Imagine if you did have a validation rule to make sure that all namespaces had to enforce at
least the baseline standard. Anyone who didn't know about that rule might try to deploy something and immediately
see an error message when they try making a namespace.

### Use a parameter resource

Parameter resources allow a policy configuration to be separate from its definition.
A policy can define `paramKind`, which outlines the group, version, and kind (also known as GVK)
of the parameter resource. Then, a  policy binding ties that policy to the scope where it is bound,
as configured by a particular parameter resource.

```yaml
---
# Caution: read the notes for this default-pod-security-configurable policy before
# you apply it, so that you understand the information security consequences.
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingAdmissionPolicy
metadata:
  name: "default-pod-security-configurable"
  annotations:
    kubernetes.io/description: "Default new namespaces to enforce the chosen pod security standard"
spec:
  reinvocationPolicy: IfNeeded
  paramKind:
    apiVersion: v1
    kind: ConfigMap
  matchConstraints:
    resourceRules:
    - apiGroups:   [""]
      apiVersions: ["v1"]
      operations:  ["CREATE"]
      resources:   ["namespaces"]
  matchConditions:
    - name: "exclude-system-namespaces"
      # If the name begins with "kube-", it's a system namespace.
      # Assume that the API server or cluster management tooling applies relevant defaults.
      expression: "!object.metadata.name.startsWith('kube-')"
    - name: "no-existing-pod-security-label"
      expression: "!('pod-security.kubernetes.io/enforce' in object.metadata.labels)"
  mutations:
    - patchType: "ApplyConfiguration"
      applyConfiguration:
        expression: "Object{metadata: Object.metadata{labels: {'pod-security.kubernetes.io/enforce': params.data.default}}}"
```

Here is a sample MutatingAdmissionPolicyBinding:

```yaml
---
apiVersion: admissionregistration.k8s.io/v1
kind: MutatingAdmissionPolicyBinding
metadata:
  name: default-pod-security-configurable
spec:
  # the name of the MutatingAdmissionPolicy to apply
  policyName: default-pod-security-configurable

  # parameters to use
  paramRef:
    # if the ConfigMap is missing or empty, don't set a default
    # (but do allow namespace creation)
    parameterNotFoundAction: Allow

    # where to find the parameter
    namespace: kube-system
    name: default-pod-security-standard
```

and here's a sample ConfigMap to put into the kube-system namespace:

```yaml
---
apiVersion: v1
kind: ConfigMap
metadata:
  namespace: kube-system
  name: default-pod-security-standard
data:
  default: baseline # could also be "restricted"
```

Define both of those. You should **create the ConfigMap first**; the binding expects that the parameter
resource already exists (even if you plan to change it later).

Now, delete the previous MutatingAdmissionPolicyBinding:
```shell
kubectl delete mutatingadmissionpolicybindings/default-pod-security-baseline
```

and create a new namespace:
```shell
kubectl create ns yet-another-example
```

```shell
kubectl describe ns yet-another-example
```

Did the labels get defaulted?

### Change the parameter

```shell
# This starts an editor that lets you change .data.default for the parameter
kubectl --namespace kube-system edit configmap default-pod-security-standard
```

After you change it, try creating one more namespace. What happens?

## Clean up

To remove the resources created, run the following commands:

```bash
kubectl delete validatingadmissionpolices/enforce-multiple-replicas-deployments \
               validatingadmissionpolicybindings/enforce-multiple-replicas-deployments

kubectl delete mutatingadmissionpolicies/default-pod-security-baseline \
               mutatingadmissionpolicybindings/default-pod-security-baseline

kubectl delete mutatingadmissionpolicies/default-pod-security-configurable \
               mutatingadmissionpolicybindings/default-pod-security-configurable

kubectl --namespace kube-system delete configmaps/default-pod-security-standard

kubectl delete namespaces/example namespaces/another-example namespaces/yet-another-example
```

If you created any test Pods or test Namespaces, clear those up too.
