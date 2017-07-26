var Communication = {};

Communication.get = function (url) {

	return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);

    req.onload = function() {
      // This is called even on 404 etc
      // so check the status
      if (req.status == 200) {
        // Resolve the promise with the response text
        resolve(req.response);
      }
      else {
        // Otherwise reject with the status text
        // which will hopefully be a meaningful error
        reject(Error(req.statusText));
      }
    };

    // Handle network errors
    req.onerror = function() {
      reject(Error("Network Error"));
    };

    // Make the request
    req.send();
  });
}

Communication.getViewportDimensions = function (type) {
	let isTypeMain = type === 'main';
	let isTypeThumbnail = type === 'thumbnail';
	let isTypeProfile = type === 'profile';
	let width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
	let height = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);

	if (isTypeMain) {
		return setDimensions([300, 500, 750]);
	} else if (isTypeThumbnail) {
		return setDimensions([150, 250, 350]);
	} else if (isTypeProfile) {
		return setDimensions([250, 350, 350]);
	} else {
		return setDimensions([500, 750, 1000]);
	}

	function setDimensions(args) {
		if (width <= 479) {
			return {width: args[0], height: args[0]}
		} else if (width <= 767) {
			return {width: args[1], height: args[1]}
		} else {
			return {width: args[2], height: args[2]}
		}
	}
}

export default Communication;