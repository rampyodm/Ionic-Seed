/**
 * The Projects factory handles saving and loading projects
 * from local storage, and also lets us save and load the
 * last active project index.
 */
(function() {
    'use strict';

    angular.module('todo').factory('TodoService', ['$http', function ($http, $q, globalService) {
        var getAll = function() {
            var projectString = window.localStorage['projects'];
            if(projectString) {
              return angular.fromJson(projectString);
            }
            return [];
        };

        var save = function(projects) {
            window.localStorage['projects'] = angular.toJson(projects);
        };

        var newProject = function(projectTitle) {
          // Add a new project
          return {
            title: projectTitle,
            tasks: []
          };
        };
        var getLastActiveIndex = function() {
            return parseInt(window.localStorage['lastActiveProject']) || 0;
        };

        var setLastActiveIndex = function(index) {
            window.localStorage['lastActiveProject'] = index;
        };

        return {
            all: getAll,
            save: save,
            newProject: newProject,
            getLastActiveIndex: getLastActiveIndex,
            setLastActiveIndex: setLastActiveIndex
        };
    }]);
}());


