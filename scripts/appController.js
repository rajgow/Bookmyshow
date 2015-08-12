
    /* Root control, it has his scope for entire application, how ever it can be overridden by child controllers  */
    appConfig.controller('TemplateCtrl',function($scope,utilityService,$location) {

        /* It helps in toggling page spinner */
        $scope.updateSpinner = function(value) {
            $scope.spinner = value;
        }

        /* It helps in toggling Main Menu,
        *  it toggles differently as per screen size
        */
        $scope.toggleMenu = function() {
            $(window).width() < 768 ? $scope.showMenu = !$scope.showMenu : $scope.menuType = $scope.menuType == 'short' ? '' : 'short';
        };


        /* Helps in showing Form completion circle in mobiles. The reason this code is part of root controller,
        *  instead of FormCtrl is it should get accessed on window resize from utilityService as well
        */
        $scope.toggleFormCompletion = function() {
            $scope.showFormCompletion = !$scope.showFormCompletion;
        };

        /* it is blank function, and being called when every on browsers resize to refresh the application device configurations in scope
        *  it is kind of trick to refresh the scope, some times angular doesn't update the view, when model is changed through widow resize.
        *  it requires any event to refresh the scope values, So after browser resize, it will fire click event on home ele, in turn this function will get called.
        */
        $scope.home = function() {};

        /* updates the scope with the current year, and is currently being used in Footer */
        $scope.currentYear = new Date().getFullYear();

        /* This will called on page loads, and it is correct place to initialize any plugins, custom codes etc.
        *  Currently it will initialize window resize events and also updates scope with current device width
        */
        utilityService.init($scope);
    });

    appConfig.controller('PersonalInfo', function($scope,$state,$location,utilityService,appvalues,appconstants) {

         $scope.application = {};

         /* This call updates the breadcrumbs,
         *  refer utilityService.updateBreadcrumbs function for more information
         */
         utilityService.updateBreadcrumbs($scope, 1);

         $scope.currentUser = utilityService.getCurrentUser();

         $scope.confirmedSeats = utilityService.getConfirmedSeats();

         $scope.submit = function(isValid) {
            if(isValid && $scope.currentUser.seats <= $scope.confirmedSeats.totalSeatsLeft) {
                utilityService.updateCurrentUser($scope.currentUser);
                $location.path("/seat-selection").replace();
            }
            if($scope.currentUser.seats > $scope.confirmedSeats.totalSeatsLeft) {
                $scope.application.form.seats.$invalid = true;
            }
         }
    });

    appConfig.controller('SeatSelection', function($scope, $state, $location, utilityService, appvalues,appconstants) {
        $scope.currentUser = utilityService.getCurrentUser();
        $scope.seating = angular.copy(appvalues.seating);
        $scope.selection = {}; $scope.selectedCount = 0;
        setTimeout(function() { utilityService.blockReservedSeats($scope    ) },10)
        utilityService.updateBreadcrumbs($scope, 2, 1);
        $scope.reserveSeat = function(seatNo) {
            if(($scope.selection[seatNo] != "reserved" && $scope.selectedCount < $scope.currentUser.seats) || $scope.selection[seatNo] == "selected") {
                $scope.selection[seatNo] =  $scope.selection[seatNo] == "selected" ? "" : "selected";
                $scope.selectedCount = $scope.selection[seatNo] == "" ? $scope.selectedCount - 1 : $scope.selectedCount + 1;
            }
        }

        $scope.confirmSeats = function() {
            if($scope.selectedCount == $scope.currentUser.seats) {
                utilityService.updateConfirmationList($scope.selection, $scope.selectedCount)
                $location.path("/confirmation").replace();
            }
        }
    });

    appConfig.controller('Conformation', function($scope, $state, $location, utilityService, appvalues,appconstants) {
        utilityService.updateBreadcrumbs($scope, 1, 1, 2);
        $scope.confirmedSeats = utilityService.getConfirmedSeats().list;
    });




