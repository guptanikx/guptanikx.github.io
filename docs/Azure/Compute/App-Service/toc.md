---
layout: toc
title: Azure WebApp TOC
---

- [File Structure in Azure](file-struct){: .blank}
- [CLI Options](cli)
- [CLI Commands](cmds)

# Pricing Tiers
- # Shared
  - Plans
    - Free, Shared
  - Shared between different tenants
  - Resources can't scale out
  - Each app is allocated CPU Quota
- # Dedicated
  - Plans
    - Basic, Standard, Premium, PremiumV2, and PremiumV3
  - Shared between same App Service Plan
- # Isolated
  - Dedicated Azure VM on dedicated Virtual Networks
  - Compute Isloation with Network Isolation

# Limitations
- App Service on Linux is not supported on Shared pricing tier.
- You can't mix Windows and Linux apps in the same App  Service plan.
{: .msg-warn}

---

### References
- [Sample ARM Templates](https://learn.microsoft.com/en-us/azure/templates/microsoft.web/sites?pivots=deployment-language-arm-template)
- [Diagnostic Settings](https://learn.microsoft.com/en-us/azure/azure-monitor/essentials/resource-manager-diagnostic-settings?tabs=json)