(function () {
    'use strict';

    angular.module('todo').controller('TodoCtrl', ['$scope', '$timeout', '$ionicModal', '$ionicSideMenuDelegate', 'TodoService',
        function ($scope, $timeout, $ionicModal, $ionicSideMenuDelegate, TodoService) {

    // A utility function for creating a new project
    // with the given projectTitle
    var createProject = function(projectTitle) {
      var newProject = TodoService.newProject(projectTitle);
      $scope.projects.push(newProject);
      TodoService.save($scope.projects);
      $scope.selectProject(newProject, $scope.projects.length-1);
    }


    // Load or initialize projects
    $scope.projects = TodoService.all();

    // Grab the last active, or the first project
    $scope.activeProject = $scope.projects[TodoService.getLastActiveIndex()];

    // Called to create a new project
    $scope.newProject = function() {
      var projectTitle = prompt('Project name');
      if(projectTitle) {
        createProject(projectTitle);
      }
    };

    // Called to select the given project
    $scope.selectProject = function(project, index) {
      $scope.activeProject = project;
      TodoService.setLastActiveIndex(index);
      $ionicSideMenuDelegate.toggleLeft(false);
    };

    // Create our modal
    $ionicModal.fromTemplateUrl('new-task.html', function(modal) {
      $scope.taskModal = modal;
    }, {
      scope: $scope
    });

    $scope.createTask = function(task) {
      if(!$scope.activeProject || !task) {
        return;
      }
      $scope.activeProject.tasks.push({
        title: task.title
      });
      $scope.taskModal.hide();

      // Inefficient, but save all the projects
      TodoService.save($scope.projects);

      task.title = "";
    };

    $scope.newTask = function() {
      $scope.taskModal.show();
    };

    $scope.closeNewTask = function() {
      $scope.taskModal.hide();
    }

    $scope.toggleProjects = function() {
      $ionicSideMenuDelegate.toggleLeft();
    };

    // Try to create the first project, make sure to defer
    // this by using $timeout so everything is initialized
    // properly
    $timeout(function() {
      if($scope.projects.length == 0) {
        while(true) {
          var projectTitle = prompt('Your first project title:');
          if(projectTitle) {
            createProject(projectTitle);
            break;
          }
        }
      }
    });
    }]);
}());