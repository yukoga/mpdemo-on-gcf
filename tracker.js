const ExtMap = require('./util.js');
const qs = require('querystring');
const http = require('https');

class Tracker {
  constructor (name, tid) {
    this.name = name;
    this.tid = tid;
    this.params = new ExtMap({'v': 1, 'tid': tid});
  }

  setParams (data) {
    this.params.merge(data);
  }

  getParams () {
    return this.params;
  }

  send () {
    var postData = qs.stringify(this.getParams().toObject());
    var request = this.buildRequest(postData);
    request.write(postData);
    request.end();
  }

  buildRequest (postData) {
    var options = {
      protocol: "https:",
      hostname: "www.google-analytics.com",
      port: 443,
      path: "/collect",
      method: "POST",
      headers: {
        "Content-type": "application/x-www-form-urlencoded",
        "Content-Length": Buffer.byteLength(postData)
      }
    };
    var mpRequest = http.request(options, (res) => {
      console.log(`STATUS: ${res.statusCode}`);
      console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
      res.setEncoding('utf8');
      res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
      });
      res.on('end', () => {
        console.log('No more data in response.');
      });
    });
    mpRequest.on('error', () => {
      console.error(`problem with request: ${e.message}`);
    });

    return mpRequest;
  }
}

module.exports = Tracker;
