var nodeio = require('node.io');
var MongoSpider = require('./mongospider').job;

exports.job = MongoSpider.extend({
    input: [
    "http://www.em.com/produkter?PageSize=all",
    
    ],

    run: function (search_page) {
    	var self = this;
        this.postHtml(search_page, {'ctl00_ctl00_ctl02_IsPrintableVersion1_ctl00_SearchField1_m_searchField' : 'Sök', 'ctl00_ctl00_ContentMiddle_Content_showSelect': 3000, __EVENTTARGET : '', __EVENTARGUMENT : '', __VIEWSTATE : '', __EVENTVALIDATION : ''}, {'Content-Type': 'application/x-www-form-urlencoded'}, function(err, $, output) {

		    //Handle any request / parsing errors
	        if (err) this.exit(err);

			var baseUrl = search_page.split('/').splice(0, 3).join('/');    // extract host name from url ending with /
			    
            //Scrape products on the page and emit
            var products = [];
            
            $('.floated_element').each(function (i, listing) {
                var product = {};
                product.image = baseUrl + ($(this).find('.floated_imgdiv img').attr('src') || '').replace('~', '');
                product.url = baseUrl + ($(this).find('.for-screen a').attr('href') || '').replace('~', '');
                product.name = $(this).find('.for-screen a').text().trim();
                product.price = $(this).find('.list_price').text().trim();
                product.source = search_page;
                
                product.id = product.url.split('article=')[1];
                
            });
            console.log(output);
            this.emit(products);
        });
    }
});