# mpdemo-on-gcf
This is a sample "Serverless Application" for [Google Analytics Measurement Protocol](https://developers.google.com/analytics/devguides/collection/protocol/v1/) which works on [Google Cloud Functions](https://cloud.google.com/functions/).  
This application works like "measurement dispatcher", which is as if an endpoint of your measurement enables you to send same data to multiple Google Analytics properties.  
See below instructions to get how to use.  

Note that you need to [create your Google Cloud project](https://cloud.google.com/resource-manager/docs/creating-managing-projects#creating_a_project) before start instructions.  
Also recommend reading [QuickStart: Using the gcloud Commnad-Line Tool on Google Cloud official document](https://cloud.google.com/functions/docs/quickstart) before you start.  

## How to deploy as 
You can deploy this app on your Google Cloud project using the gcloud command.  
See detail steps below.  

### 1. Checkout source files from github.com  
```bash
mkdir WORKING_DIR; cd $_   
git clone https://github.com/yukoga/mpdemo-on-gcf.git  
cd mpdemo-on-gcf  
```

### 2. Create Google Cloud Storage to deploy files  
```bash
gsutil mb -p [YOUR_PROJECT_ID] gs://[YOUR_BUCKET_NAME]  
```
Where:  
* [YOUR_PROJECT_ID] is your Google Cloud project ID.  
* [YOUR_BUCKET_NAME] is a bucket name of your Google Cloud Storage. It must be globally unique to avoid conflict.  

### 3. Deploy a function  
Deploy files with an HTTP trigger.  
```bash
gcloud beta functions deploy mpdemo --stage-bucket gs://[YOUR_BUCKET_NAME] --trigger-http
```
It might take a few minutes to deploy the function at the first time. Once after you finish deployment, this cloud function will be triggered when this function received HTTP request with measurement data for Google Analytics.  
Here is the sample code to trigger the cloud function as follows : 
```bash
curl -X POST -H "Content-Type:application/json" \
-d '{"tids": ["UA-12345-67", "UA-1234-56", "UA-9876-54"], 
"data": {"cid": "123.456", "dp": "/index.html", "dt": "Sample page.", "dh": "example.com"}}' \
https://[YOUR_REGION]-[YOUR_PROJECT_ID].cloudfunctions.net/mpdemo
```
Where :  
* [YOUR_REGION] is a region code which specified your region on which your cloud function will be deployed.  
* [YOUR_PROJECT_ID] is your Google Cloud project ID.  

POST data must have "tids" and "data" that contains to be measured data for Google Analytics.  
See below explanation for semantics.  

## POST data requirement  
This application expects to receive http POST request with the following format.  
* Content-Type must be "application/json".  
* http request method should be POST.  
* POST data should have following two fields.  
  - tids ... an array of [Google Analytics tracking ID](https://support.google.com/analytics/answer/1008080)  
  - data ... The data which Google Analytics receives via Measurement Protocol. Please make sure that this data satisfies [Measurement Protocol parameter criteria](https://developers.google.com/analytics/devguides/collection/protocol/v1/parameters).  
