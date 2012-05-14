mongoose.connect('mongodb://localhost/furniture');


var stream = Model.find().stream();

stream.on('data', function (doc) {
  if (somethingHappened) {
    this.pause()

    var self = this
    return bakeSomePizza(function () {
      self.resume()
    })
  }

  res.write(doc)
})

stream.on('error', function (err) {
  // handle err
})

stream.on('close', function () {
  // all done
})