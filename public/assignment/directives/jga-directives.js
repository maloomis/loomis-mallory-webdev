(function() {
    angular
        .module('jgaDirective', [])
        .directive('jgaSortable', jgaSortable);

        function jgaSortable() {
            function linker(scope, element, attributes) {
                var start = -1;
                var end = -1;
                element
                    .sortable({
                        start: function(event, ui) {
                            console.log(ui.item);
                            start = $(ui.item).index();
                        },
                        stop: function(event, ui) {
                            end = $(ui.item).index();
                            scope.jgaSortableController.sort(start, end);
                        }
                    });
            }

            return {
                scope: {},
                restrict: 'C',
                link: linker,
                controller: jgaSortableController,
                controllerAs: 'jgaSortableController'
            }
        };

        function jgaSortableController(WidgetService, $routeParams) {
            var vm = this;
            vm.sort = sort;
            vm.pageId = $routeParams['pid'];

            function sort(start, end) {
                WidgetService.sortWidgets(start, end, vm.pageId);
            }

        }
})();