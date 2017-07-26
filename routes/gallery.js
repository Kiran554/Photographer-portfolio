'use strict';

const express = require('express');
const router = express.Router();
const requestHTTP = require('request');
const contentType = 'application/json;charset=UTF-8';
const acceptType = 'application/json';
const host = 'http://res.cloudinary.com/sharathmodumpally/image/list/';

router.get('/fetchGallery.action', function(req, res, next) {
	console.log(JSON.stringify(req.query));
	executeGetRequest(req, res, function(){
		res.writeHead(200, {'Content-Type': contentType});
		res.end(res.reply);
	});
});

function executeGetRequest (request, response, callback) {
	if (typeof callback !== 'function') return null;
	// only if the request is coming with valid parameters
	if (request.query.type) {
		// adding get information
		var options = {
			url: `${host}${request.query.type}.json`,			
			json: true,
			method: 'GET'
		};
		var reqCallBack = function(error, res, body) {
			// success condition
		 	if (!error) { //  && res.statusCode == 200
		    	response.reply = JSON.stringify(body);
		    	console.log(response.reply);
		    	callback();
		  	} else {
		  		console.log(error);
				response.writeHead(res.statusCode, {'Content-Type': contentType});
	        	response.end();
		  	}
		};

		requestHTTP(options, reqCallBack);

	}  else {
        response.writeHead(405, {'Content-Type': contentType});
        response.end();
    }
}

module.exports = router;