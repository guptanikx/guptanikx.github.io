---
title: WebApp Availability Test
---

# TrackAvaility Method (using code)
- Can Only be recorded from Visual Studio
- Supports Advanced scneraios like Workflow Test, Authentication etc.

# MultiStep Web Test (Deprecated in lieu of TrackAvailability Test)

# Url Ping Test
- Url Should be of public web app
- Parse dependent requests
 - Classic Test Feature Support
   - Custom Response Content
   - Repetition in Frequency and from Multiple Locations
   - Alerts
   - Supports testing of `dependent Assets` like images, javascripts etc.
      - Example of Dependent Assets Fail
          ![Large](/assets/images/azure/exam/webapp-avail-test-1.png)
 -  Standard Test Supports in addition to Classic Test features
    -  SSL Certificate Validity
    -  Custom Verbs and Response Codes

---

# References
- [Multistep Availability](https://learn.microsoft.com/en-us/azure/azure-monitor/app/availability-multistep){: .blank}
- [Url Ping](https://learn.microsoft.com/en-us/azure/azure-monitor/app/monitor-web-app-availability){: .blank}