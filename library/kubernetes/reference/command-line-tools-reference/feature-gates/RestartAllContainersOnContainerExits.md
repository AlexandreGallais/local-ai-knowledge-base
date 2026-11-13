---
title: "RestartAllContainersOnContainerExits"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/RestartAllContainersOnContainerExits.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# RestartAllContainersOnContainerExits

Enables the ability to specify
`RestartAllContainers` as an action in container `restartPolicyRules`. When a container's exit matches a rule with this action, the entire Pod is terminated and restarted in-place.

`RestartAllContainersOnContainerExits` depends on both the `ContainerRestartRules` and `NodeDeclaredFeatures` feature gates. If the dependent feature gates are not enabled, kubelet startup can fail.

See Restart All Containers for more details.
