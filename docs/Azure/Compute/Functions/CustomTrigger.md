---
title: Weather Trigger Azure Function
categories: 
  - "azurefunction"
tags: 
  - "serverless"
---

- The runtime uses reflection to find methods that implements `AzureFunctionAttribute`
- Framework skips the function with wrong Binding Providers or Providers not found
- For each Trigger runtime creates a new Listener
- It's responsibility of the Binder to bind input values to the values used by function
- Responsibilities
  - `TriggerConfigProvider` - to configure the entire Trigger process
  - `TriggerAttribute` - contains the incoming trigger data
  - `TriggerBindingProvider` - creates the actual binding object
  - `TriggerBinding` - creates the listener interface
  - `TriggerListener` - reacts to events and executes the function. Different listener for each function
{: .msg-info}

- [Source Code](https://github.com/guptanikx/azure-sdk-samples/tree/main/dotnet/CustomFunctionTrigger)
- Process flow ![Center_600_Flow](/assets/images\Func_Lab02_01.png)
- Register on [OpenAPI Url](https://openweathermap.org/) and Get APIKey
