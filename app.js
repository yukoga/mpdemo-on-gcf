const Tracker = require('./tracker.js');

exports.mpdemo = function(req, res) {
  var tracker = new Tracker();
  var tids = req.body.tids;
  var data = req.body.data;

  if (tids && tids.length > 1) {
    tracker.setParams(data);
    for (var tid of tids) {
      tracker.setParams({'tid': tid});
      tracker.send();
    }
  } else {
    tracker.setParams(data);
    tracker.send();
  }
  res.send('Measurement finished.\n');
}
