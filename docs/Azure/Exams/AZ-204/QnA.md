---
title: Azure - AZ-204 - Question Bank
layout: exam
---

# Category - EventHub
{: #eh-partition}
- A company is building a traffic monitoring system. The system would be monitoring the `traffic along`
  `4 highways`. The system would be responsible for producing a time series-based analysis report for each highway. <br>
  The traffic sensors on each highway have been configured to send its data to Azure Event Hubs. The data from Event Hubs is then `consumed by three departments`. Each department makes use of an Azure Web App to display the data. <br>
  You have to implement the Azure Event Hub instance. You need to implement a solution which ensures data throughput is maximized and latency is minimized.
  
  - `# What is the number of partitions you would setup in the Event Hub?`
    - Answer - `4`{: .answer}

  - `Which of the following would you use as the partition key?`
    - Answer - `Highway`{: .answer}

  - # Reason
    - The number of partitions shall be decided based on incoming data.
    - The number of consumers are not deciding factor for partitions.

---

# Category - Storage - Blob (Soft Delete)
{: #soft-delete }
  - [Activity](/docs/Azure/Storage/StorageAccount/blob-soft-delete){: .blank}
- An application is currently making use of an Azure storage account. `Soft delete is enabled` on the 
  storage account.<br>
  The application uploads a blob named img1.jpg. `Snapshot 1 is then created` out of the blob. And then `Snapshot 2 is created` out of the blob. `Snapshot 1 is then deleted`. <br>
  A system error has caused the application to now go ahead and delete the blob and all of its snapshots.
  
  - `Would you be able to restore the blob img1.jpg?`
    - Answer - `YES`{: .answer}

  - `Would you be able to restore Snapshot 1?`
    - Answer - `YES`{: .answer}
  
  - `Would you be able to restore Snapshot 2?`
    - Answer - `YES`{: .answer}

  - # Reason
    - Soft Delete supports Container, Blobs and their snapshots.

---

# Category - Storage - Cosmos (Triggers)
{: #cosmos-trigger-1 }
  - [Activity](/docs/Azure/Storage/CosmosDB/db-triggers){: .blank}
- A company currently has a web service deployed that is used to take in food orders and deliveries. The 
  web service used Azure Cosmos DB as the data store.<br>
  A new feature is being rolled out that allow users to set a tip amount for orders. The new feature now mandates that the order needs to have a `property named Ordertip` in the document in Cosmos DB and that the property must contain a numeric value.<br>
  There might be existing web sites and web services that may not be updated so far to include this feature of having a tip in place.<br>
  You need to complete the below `code trigger` for this requirement
  ![](/assets/images/azure/exam/db-pre-trigger-1.png)

  - `Which of the following would go into Slot 1?`
    - Answer - `context.getRequest()`{: .answer}

  - `Which of the following would go into Slot 2?`
    - Answer - `if (!("Ordertip" in tipsItem))`{: .answer}
  
  - `Which of the following would go into Slot 3?`
    - Answer - `request.setBody(tipsItem)`{: .answer}

  - # Reason
    - Refer Activity

---

# Category - Azure App Service - Diagnostic Logging
{: #app-svc-diag-1 }
  - [Exercise](/docs/Azure/Compute/App-Service/linux-container-app){: .blank}
- You are going to `deploy a web application` onto Azure. You would make use of the `App Service on Linux`.
  You go ahead and create an `App Service Plan`. You then go ahead and publish a `custom docker image onto the Azure Web App.` 
  You need to `access the console logs` generated from the container `in real time.`
  <br>
  You need to complete the following Azure CLI script for this

  ![](/assets/images/azure/exam/webapp-logs-1.png)

  - `Which of the following would go into Slot 1?`
    - Answer - `config`{: .answer}
  - `Which of the following would go into Slot 2?`
    - Answer - `--docker-container-logging`{: .answer}
  - `Which of the following would go into Slot 3?`
    - Answer - `webapp`{: .answer}
  - `Which of the following would go into Slot 4?`
    - Answer - `tail`{: .answer}

---

# Category - Azure App Service - Authentication and Authorization
{: #app-svc-auth-1 }
  - [Exercise](/docs/Azure/Compute/App-Service/identity-provider){: .blank}
- You create and publish a new Azure App Service WebApp
  
  User `authentication and authorization must use Azure Active Directory (AD)`

  You need to configure Authentication and Authorization
  
  - `What should you do first ?`
    - Answer - `Add an identity provider`{: .answer}

---

# Category - Azure App Service - Deployment (using git repo)
{: #app-svc-deploy-1 }
  - [Exercise](/docs/Azure/Compute/App-Service/deploy-git){: .blank}
- You need to deploy code from Github to the newly created WebApp
  
  Variable : $webappname  webapp1103 <br>
  Variable : $gitrepo     https://github.com/Constoso/webapp

  Please complete the script.
  ![](/assets/images/azure/exam/webapp-deploy-1.png)

  - `Which of the following would go into Slot 1 ?`
    - Answer - `az appservice plan create`{: .answer}
  - `Which of the following would go into Slot 2 ?`
    - Answer - `az webapp create`{: .answer}
  - `Which of the following would go into Slot 3 ?`
    - Answer - `--plan $webappname`{: .answer}
  - `Which of the following would go into Slot 4 ?`
    - Answer - `az webapp deployment`{: .answer}
  - `Which of the following would go into Slot 5 ?`
    - Answer - `--repo-url $gitrepo --branch master --manual-integration`{: .answer}

---

# Category - Azure App Service - Monitoring (Availability Tests)
{: #app-svc-monitor-1 }
  - [Exercise](/docs/Azure/Monitoring/webapp-availability){: .blank}
  - The company has following requirements for testing on WebApp
    - Every five minutes verify that the websites are responsive
    - Verify that the websites respond within a specific time Threshold. Dependent requests like images, javascripts files shall load properly
    - Generate Alerts if a website is experiencing issues
    - If a website fails to load, the system must attempt to reload the site three more times <br>

  - `What should you use to fulfill above requirements ?`
    - Answer - `Set up a URL ping test`{: .answer}

---

# Category - Azure Function App - Create & Deploy
{: #func-app-deploy-1 }
  - [Exercise](https://learn.microsoft.com/en-in/azure/azure-functions/create-first-function-vs-code-other?tabs=go%2Clinux){: .blank}
  - You are developing an Azure Function App. You develop code by using a language that is not supported <br>

    Which configuration values should you use ?

  - `Configuration Value for  Publish ?`
    - Answer - `Docker Container`{: .answer}
  - `Configuration Value for  Runtime Stack ?`
    - Answer - `Custom Handler`{: .answer}
  - `Configuration Value for  Version ?`
    - Answer - `custom`{: .answer}

---

# Category - Azure WebApp - Scaling (Single Instance of WebApp within Shared Service Plan)
{: #func-app-scaling-1 }
  - [Exercise](/docs/Azure/Compute/App-Service/app-scale){: .blank}

- You are developing an new app ContosoApp. There is one service Plan requirement which will hosts multiple webapps. <br>
  However, The ContosoApp needs to be only deployed on `Single Instance` inside same AppService Plan.
    
  Which configuration values should you use ?
  ![Large](/assets/images/azure/exam/webapp-scale-1.png)

  - `What will got in slot 1 ?`
    - Answer - `--per-site-scaling = 1`{: .answer}
  - `What will got in slot 2 ?`
    - Answer - `siteConfig.numberOfWorkers=1`{: .answer}

---

# Category - Azure Container App - Deploy & Manage Secrets
{: #container-app-1 }
  - [Exercise](/docs/Azure/Compute/Container/simple-app){: .blank}
- An Application requires a secret value to be passed when container is started
  The value must be accessed only from within the container <br>
  You need to pass the secret value<br>
  
  `What are two possible ways ?`
  - Answers
    - {: .answer} Create a environment variable. Set the secureValue property
      to the secret value
    - {: .answer} Add a secret value to the container image. Use a managed Identity


---
