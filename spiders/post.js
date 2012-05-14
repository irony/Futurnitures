var nodeio = require('node.io');

exports.job = new nodeio.Job({jsdom: true, followAllRedirects: true }, {
    input: ["http://jgn-imac/NodeTest"],

    run: function (search_page) {
        var self = this;
        this.postHtml(search_page, {test:'test'}, {'Content-Type': 'application/x-www-form-urlencoded'}, function(err, $) {

            console.log(arguments);
            //Handle any request / parsing errors
            if (err) this.exit(err);

            this.exit();
        });
    }
});