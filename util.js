class ExtMap extends Map {
  constructor (obj) {
    super();
    if (obj) {
      for (var k in obj) {
        if (obj.hasOwnProperty(k)) {
          this.set(k, obj[k]);
        }
      }
    }
  }

  toObject () {
    var obj = {};
    this.forEach(function(v, k) {
      obj[k] = v;
    });
    return obj;
  }

  merge (map) {
    if (!(map instanceof ExtMap)) {
      map = new ExtMap(map);
    }
    map.forEach(function(v, k) {
      this.set(k, v);
    }, this);
  }
}

module.exports = ExtMap;
