var Crawler = require("crawler").Crawler,
	fs = require('fs');

var targetSite = "http://www.kangan.edu.au/";

var c = new Crawler({
"maxConnections":10,

// This will be called for each crawled page
"callback":function(error,result,$) {

	if (result) {
		var page = result.body;
		var res = page.match(/investigator/i);
		if (res && res.length > 0) {
			fs.appendFile('nodeSpiderResults.txt', 'MATCH LOCATION: ' + targetSite + result.body, function (err) {
				if (err) throw err;
				console.log('The "result.body" was appended to file "nodeSpiderResults.txt".');
			});
			console.log('A match has been found!');
		}
	}

    // $ is a jQuery instance scoped to the server-side DOM of the page
    $("a").each(function(index,a) {
    	//console.log(a.href);
    	targetSite = a.href;
        c.queue(a.href);
    });
}
});

// Queue just one URL, with default callback
c.queue("http://www.kangan.edu.au/");
