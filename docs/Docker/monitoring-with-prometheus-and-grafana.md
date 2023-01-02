---
title: "Docker Container monitoring with Prometheus and Grafana"
date: "2021-03-25"
categories: 
  - "docker"
  - "monitoring"
tags: 
  - "containers"
---

##### Setup AspNetCore app for Logging

- Install `Prometheus-Net` nuget package in AspnetCore application
- Add below code to `Startup.cs`

				
					`public void Configure(IApplicationBuilder app, IWebHostEnvironment env)     {         // existing code         app.UseMetricServer();         // existing code     } protected override void ConfigureEndpoints(IApplicationBuilder app) {     app.UseEndpoints(endpoints =>     {         // existing code         endpoints.MapMetrics();     }); }`

				

- Verify the endpoint `http://localhost:8080/metrics` is displaying metrics like below

				
					`# HELP process_start_time_seconds Start time of the process since unix epoch in seconds. # TYPE process_start_time_seconds gauge process_start_time_seconds 1616752480.49 # HELP process_working_set_bytes Process working set # TYPE process_working_set_bytes gauge process_working_set_bytes 155553792 # HELP process_num_threads Total number of threads # TYPE process_num_threads gauge process_num_threads 26 # HELP process_cpu_seconds_total Total user and system CPU time spent in seconds. # TYPE process_cpu_seconds_total counter process_cpu_seconds_total 2.11 # HELP dotnet_total_memory_bytes Total known allocated memory # TYPE dotnet_total_memory_bytes gauge dotnet_total_memory_bytes 70938088 # HELP process_private_memory_bytes Process private memory size # TYPE process_private_memory_bytes gauge process_private_memory_bytes 278953984 # HELP process_virtual_memory_bytes Virtual memory size in bytes. # TYPE process_virtual_memory_bytes gauge process_virtual_memory_bytes 25543655424 # HELP process_open_handles Number of open handles # TYPE process_open_handles gauge process_open_handles 187 # HELP dotnet_collection_count_total GC collection count # TYPE dotnet_collection_count_total counter dotnet_collection_count_total{generation="1"} 0 dotnet_collection_count_total{generation="0"} 0 dotnet_collection_count_total{generation="2"} 0`
				

- Run the app in docker container on a seperate machine other than prometheus
- Port name should be same what we mentioned in `prometheus.yml` file. In our case `9100`

				
					`docker run -d --rm --name mongo-app          -local -p 9100:80          mongo-app-local`
				

##### Run Prometheus in container

- Run prometheus container in a seperate virtual machine, otherwise you will face issue with Port locking

				
					`docker run --name prometheus -d -p 9090:9090 prom/prometheus`
				

- Create a file `prometheus.yml` with below settings group on line. `192.168.118.219` is ip address of the machine where app is hosted

				
					`scrape_configs:     // existing code   - job_name: 'mongo-app'     static_configs:     - targets: ['192.168.118.129:9100']`

				

- Copy the `prometheus.yml` file to docker container we ran in above step to path `/etc/prometheus/prometheus.yml`

				
					`docker cp prometheus.yml prometheus:/etc/prometheus/prometheus.yml`
				

- Restart prometheus container to reflect changes

				
					`docker container restart prometheus`
				

- Verify Prometheus Tracking sources of mongo-app we hosted above on `http://localhost:9090/targets`

![](/assets/images/prometheus_02-768x298.png)

- Verify we are able to query DotNet metrics

![](/assets/images/prometheus_01-768x319.png)

##### Run Grafana in Container

				
					`docker run -d -p 3000:3000 --name grafana grafana/grafana:6.5.0`
				

- Browse Url `http://localhost:3000` ans etup grafana
- Add Prometheus as Data Source 

![](/assets/images/grafana_01-768x372.png)

- The IP address of the prometheus provide it as FQDN or machine IP Address and not localhost because Promethus and Grafana are running inside docker container

![](/assets/images/grafana_03.png)

- Generate some traffic on the application and observe the grafana dashboard

![](/assets/images/grafana_02.png)

#### References

- [Prometheus Github](https://github.com/prometheus/prometheus)
- [Prometheus Offiicial](https://prometheus.io/)
- [Grafana Official](https://grafana.com/docs/grafana/latest/installation/docker/)
