 appConfig.service('utilityService', ['$http', 'appconstants', "appvalues", function( $http, appconstants, appvalues ) {
      var utilityService = {};

      /*   handleAppResponsive is being called on page load, as well as on browser resize
      *    it will adjusts the menu and form completion circle as per screen width
      */
      utilityService.handleAppResponsive = function($scope) {
          $scope.browserWidth = $(window).width();
          if( $scope.browserWidth < 768 ) {
              $scope.menuType = 'short'; $scope.showMenu = false;
          } else if( $scope.browserWidth > 991) {
              $scope.showMenu = true; $scope.device = "desktop";
          } else {
              $scope.showMenu = true; $scope.device = "tablet"
          }
          $("#home").click();
      };

      utilityService.getCurrentUser = function() {
          if(!sessionStorage.currentUser) {
             sessionStorage.setItem("currentUser", JSON.stringify({}));
             sessionStorage.setItem("confirmedSeats", JSON.stringify({"totalSeatsLeft":105,"list":[]}));
          }
          return  JSON.parse(sessionStorage.currentUser);
      };

      utilityService.updateCurrentUser = function(currentUser) {
            sessionStorage.currentUser = JSON.stringify(currentUser)
      }

      utilityService.getConfirmedSeats = function() {
           return  JSON.parse(sessionStorage.confirmedSeats);
      }

      utilityService.blockReservedSeats = function($scope) {
         try {
            $.each(JSON.parse(sessionStorage.confirmedSeats).list, function(index, confirmedSeat) {
                $.each(confirmedSeat.seats.split(","), function(innerIndex, seatNo){
                    $scope.selection[seatNo] = "reserved"
                });
            });
            $("#home").click();
         } catch(e) {
            utilityService.getCurrentUser();
            utilityService.blockReservedSeats();
         }

      };
      utilityService.updateConfirmationList = function(seatNosParam, seatingCount) {
        var confirmedSeats = JSON.parse(sessionStorage.confirmedSeats), seatNos = "",
            currentUser = utilityService.getCurrentUser();
        confirmedSeats.totalSeatsLeft = confirmedSeats.totalSeatsLeft - seatingCount;
        for(var key in seatNosParam) {
            if(seatNosParam[key] == "selected") {
                seatNos += (key + ",");
            }
        }
        seatNos = seatNos.substring(0, seatNos.length -1);
        confirmedSeats.list.push({ user : currentUser.name, count : seatingCount, seats : seatNos})
        sessionStorage.setItem("confirmedSeats", JSON.stringify(confirmedSeats));
      }
      utilityService.updateBreadcrumbs = function($scope, state, activeIndex, addThis) {
           var breadcrumbs = angular.copy(appvalues.breadcrumbs).slice(0,state);

           /* If we need to add any specific breadcrumb at last */
           if(addThis) {
              breadcrumbs.push(angular.copy(appvalues.breadcrumbs[addThis]))
           }

           /* This will make breadcrumb active, based on passed index*/
           activeIndex ? breadcrumbs[activeIndex].active = true : '';

           $scope.breadcrumbs = breadcrumbs;

           /* This method is being called on all pages, so this makes sure too remove spinner on successful loads */
           $scope.updateSpinner("hide");
      };


      utilityService.updateDateTime = function(element) {
           var dateString = new Date().toString();
           element.html(dateString.slice(0, dateString.indexOf("GMT")));
      };

      /* this being called on page load, and it is correct place to initialize any plugins, custom codes etc. on load
      *  Currently it will initialize window resize event and also updates scope with current device width */
      utilityService.init = function($scope) {
            utilityService.handleAppResponsive($scope);
           $(window).resize(function() { utilityService.handleAppResponsive($scope) });
      };
      return utilityService;
 }]);