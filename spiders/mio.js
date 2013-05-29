var nodeio = require('node.io');
var MongoSpider = require('./mongospider').job;

exports.job = MongoSpider.extend({
    input: ["http://www.mio.se/Hela-sortimentet/Belysning/Bordlampor/?ShowAllPages=true&selectedPageIndex1=4&selectedPageIndex2=0&selectedPageIndex3=0&SelectedFilterIndex=all"],

    run: function (search_page) {
        var self = this;
        this.getHtml(search_page, function(err, $) {

            //Handle any request / parsing errors
        if (err) this.exit(err);

			var baseUrl = search_page.split('/').splice(0, 3).join('/');    // extract host name from url ending with /

            //Scrape products on the page and emit
            var products = [];
            
            $('.searchPart').each(function (i, listing) {
                var product = {};
                product.image = baseUrl + $(this).find('img').attr('src');
                product.url = baseUrl + $(this).find('a').attr('href');
                product.name = $(this).find('a').text().trim();
                product.price = $(this).find('.price').text().trim();
                
                products.push(product);
               
                // console.log('found product', product);
                
                self.add(product.url);
            });


            self.emit(products);

        });
    }
});