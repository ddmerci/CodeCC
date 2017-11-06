angular.module('codecc.factories', ['ngResource'])
.factory('Post', ['$resource', function($resource) {
    return $resource('/api/posts/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('User', ['$resource', function($resource) {
    return $resource('/api/users/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('Reply', ['$resource', function($resource) {
    return $resource('/api/replies/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('Bootcamp', ['$resource', function($resource){
    return $resource('/api/bootcamps', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}])
.factory('Review', ['$resource', function($resource){
    return $resource('/api/review/:id', { id: '@id' }, {
        update: {
            method: 'PUT'
        }
    });
}]);

