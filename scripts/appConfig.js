
   /* Angular Modules configuration
   *  ui.router : This module help in URL Routing
   *  ui.select : This module help in rendering beautiful custom selects.
   *  ngSanitize : This module provides a functionality, which helps making clean HTML.
   *               However its not mandatory to configure Angular, to make ui.select functional it requires ngSanitize
   */
   var appConfig = angular.module('applyAccount', ['ui.router']);


    /* URL Routing */
    appConfig.config(function($stateProvider,$urlRouterProvider) {
        $urlRouterProvider.otherwise('personal-information');
        $stateProvider
            .state('personal-information',{
                url : '/personal-information',
                templateUrl : 'fragments/personal-information.html',
                controller : 'PersonalInfo'
            }).
            state('seat-selection',{
                url : '/seat-selection',
                templateUrl : 'fragments/seat-selection.html',
                controller : 'SeatSelection'
            })
            .state('confirmation',{
                url : '/confirmation',
                templateUrl : 'fragments/confirmation.html',
                controller : 'Conformation'
            })
            .state('account',{
                url : '/form/account/:accountId',
                templateUrl : 'fragments/application.html',
                controller : 'FormCtrl'
            })
            .state('application-success',{
                url : '/form/success/:accountId',
                templateUrl : 'fragments/application-success.html',
                controller : 'AppSuccessCtrl'
            })
    });


    /* Application Values */
    appConfig.value('appvalues', {
        breadcrumbs : [{"title":"Personal Information","icon":"fa-user","active":false,"url":"#/personal-information"},{"title":"Seat Reservation","icon":"fa-film","active":false,"url":"#/seat-selection"},{"title":"Confirmation Deatils","icon":"fa-check","active":false,"url":"#/confirmation"}],
        seating : [{"rowName":"A","count":12},{"rowName":"B","count":12},{"rowName":"C","count":12},{"rowName":"D","count":12},{"rowName":"E","count":12},{"rowName":"F","count":12},{"rowName":"G","count":12},{"rowName":"H","count":12},{"rowName":"I","count":12}]
    });

    /* Application Constants */
    appConfig.constant('appconstants', {
        accountDetailsKey : "3zIZ3aBPxB",
        breadcrumbsKey : "r6XnMHBzjm",
        formFieldsKey : "yzlHvrj0cK",
        parseURILabels : "https://api.parse.com/1/classes/labels/",
        parseURIApplications : "https://api.parse.com/1/classes/applications/",
        applicationId : "HnUsOaemBuSD01Qd302yK7mmflVZsrQqOxjJwETp",
        restAPIkey : "cgpDruLiMSjz1fCoS3KFpdCm3Vor9S65JALwBrzM",
        personal : { step : 1, icon : "fa-user", formName : "personal"},
        income : { step : 2, icon : "fa-briefcase", formName : "income"},
        account : { step : 3, icon : "fa-inr", formName : "account"},
        1 : "personal/",
        2 : "income/",
        3 : "account/"
    });


    appConfig.filter('range', function() {
          return function(input, total) {
                start = 0 ;
                total = parseInt(total);
                for (start; start<total; start++)
                  input.push(start);
                return input;
          };
    });

    /* Date directive to update System time on every second
    *  systemTime directive restricted to Attribute, Means it get called only if directive matches to attribute
    */
    appConfig.directive('systemTime', ['utilityService', function(utilityService) {
        return {
            restrict: 'A',
            link: function ($scope, element, attrs) {
                utilityService.updateDateTime(element);
                setInterval(function() { utilityService.updateDateTime(element) },1000);
            }
        }
    }]);

    /* Angular Application Bootstrap */
    angular.element(document).ready(function() {
        angular.bootstrap(document,['applyAccount']);
    });


