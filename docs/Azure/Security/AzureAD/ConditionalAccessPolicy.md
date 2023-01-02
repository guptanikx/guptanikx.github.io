---
title: "Conditional Access Policies with AzureAD"
date: "2021-03-10"
categories: 
  - "azuread"
tags: 
  - "security"
---

- Enabling `Include Unknown Areas` in Named location is a security risk
- Enable Named Location
- Navigate to `Conditional Access` and `Named Locations` in Azure AD panel
{: .msg-info}

- Create a Named location based on Country/Region
![](/assets/images/CondAccess_01.png)

- Create a Named location based on IP/Address as Trusted Location. Multiple IP/Address can be added
![](/assets/images/CondAccess_02.png)

- Enable Multi-Factor Authentication (Trusted IP's)
  - Navigate to `Conditional Access` and Click `Configure MFS Trusted IPs`
  - Configure Settings to `Trust MFA on device` for limited time 
    ![](/assets/images/CondAccess_03.png)
