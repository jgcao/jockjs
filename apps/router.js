
/**
 *
 * router.js
 *
 */

var conf = require("../conf/config"),
    url = require("url"),
    path = require("path");


/**
 * Router(request, response)
 *
 * @param {Object} request A http.ServerRequest instance.
 * @param {Object} response A http.ServerResponse instance.
 * @return {Object} Router
 */
var Router = exports.Router = function(request, response) {

    /**
     * Sets request as http.ServerRequest instance
     */
    this.req = request;

    /**
     * Sets response as http.ServerResponse instance
     */
    this.res = response;

    /**
     * Sets path name
     */
    this.pathName = url.parse(request.url).pathname;

    /**
     * Default router
     * @const
     */
    this.router = [];

    /**
     * Sets root path
     * @const
     */
    this.root = conf.root || 'err';

    /**
     * Default handers object
     * @const
     */
    this.headers = {};

    /**
     * Default handers send
     * @const
     */
    this.sentHeaders = false;

    /**
     * Default handers status objects
     * @const
     */

    this.init();
};

/**
 *
 * Router.init()
 *
 * Router initialize.
 *
 */
Router.prototype.init = function(){
    this.fixParentPath();
}


/**
 *
 * Router.init()
 *
 * Fix parent path
 *
 */
Router.prototype.fixParentPath = function(){
    if ("/" === this.pathName.slice(-1)) {
        this.res.err404();
    }
}

/**
 *
 * Router.getRealPath()
 *
 * Get real path
 *
 * @return path
 *
 */
Router.prototype.getRealPath = function(){
    return path.normalize(this.pathName.replace(/\.\./g, ""));
}

/**
 *
 * Router.getHost()
 *
 * Get real host
 *
 * @return path
 *
 */
Router.prototype.getHost = function(){
    return 'http://'+this.req.headers.host+'/';
}

/**
 *
 * Router.getFilePath()
 *
 * Get file path
 *
 * @return path
 *
 */
Router.prototype.getLibsFilePath = function(){
    return conf.root;
}
/**
 *
 * Router.getCacheFilePath()
 *
 * Get cache file path
 *
 * @return path
 *
 */
Router.prototype.getCacheFilePath = function(){
    return conf.cache;
}
/**
 *
 * Router.getLogFilePath()
 *
 * Get cache file path
 *
 * @return path
 *
 */
Router.prototype.getLogFilePath = function(){
    return conf.cache;
}