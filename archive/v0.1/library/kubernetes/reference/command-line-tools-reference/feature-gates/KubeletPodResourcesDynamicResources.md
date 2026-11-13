---
title: "KubeletPodResourcesDynamicResources"
tool: "kubernetes"
version: "1.37"
source: "https://github.com/kubernetes/website/blob/df9918100e7213445c18995258497b9bcbe0f624/content/en/docs/reference/command-line-tools-reference/feature-gates/KubeletPodResourcesDynamicResources.md"
commit: "df9918100e7213445c18995258497b9bcbe0f624"
license: "CC-BY-4.0"
---

# KubeletPodResourcesDynamicResources

Extend the kubelet's
pod resources monitoring gRPC API
endpoints List and Get to include resources allocated in ResourceClaims
via Dynamic Resource Allocation.

Below is an example of GPU metrics to show how this API is consumed by
NVIDIA dcgm-exporter to collect per pod GPU metrics allocated by
NVIDIA DRA driver:

```
DCGM_FI_PROF_PCIE_RX_BYTES{gpu="0",UUID="GPU-a4f34abc-7715-3560-dcea-7238b9611a45",pci_bus_id="00000009:01:00.0",device="nvidia0",modelName="NVIDIA GH200 96GB HBM3",Hostname="sc-starwars-xxxx",container="ctr",dra_claim_name="single-gpu",dra_claim_namespace="gpu-test3",dra_device_name="gpu-0",dra_driver_name="gpu.nvidia.com",dra_pool_name="sc-starwars-xxxx",namespace="gpu-test3",pod="pod1"} 23792

DCGM_FI_PROF_PCIE_RX_BYTES{gpu="0",UUID="GPU-a4f34abc-7715-3560-dcea-7238b9611a45",pci_bus_id="00000009:01:00.0",device="nvidia0",modelName="NVIDIA GH200 96GB HBM3",Hostname="sc-starwars-xxxx",container="ctr",dra_claim_name="single-gpu",dra_claim_namespace="gpu-test3",dra_device_name="gpu-0",dra_driver_name="gpu.nvidia.com",dra_pool_name="sc-starwars-xxxx",namespace="gpu-test3",pod="pod2"} 23792

with Pod DRA info:

container="ctr",
dra_claim_name="single-gpu",
dra_claim_namespace="gpu-test3",
dra_device_name="gpu-0",dra_driver_name="gpu.nvidia.com",
dra_pool_name="sc-starwars-xxxx",
namespace="gpu-test3",
pod="pod1"
```
