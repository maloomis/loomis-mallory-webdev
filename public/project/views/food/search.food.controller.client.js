(function() {
    angular
        .module("FitnessApp")
        .controller("FoodSearchController", FoodSearchController);
        function FoodSearchController($http) {
            var vm = this;
            vm.searchFoodByName = searchFoodByName;

            function searchFoodByName(name) {
                var url = "https://spoonacular-recipe-food-nutrition-v1.p.mashape.com/food/products/search?number=50&offset=0&query=" + name;
                var config = {headers: {
                        "X-Mashape-Key": "KK8WWHvSogmshmwCpe9OrEHv3KSOp1M1QbIjsnlTToIfiwquvO"
                    }
                };
                $http
                    .get(url, config)
                    .success(function (result) {
                        vm.food = result.products;
                        console.log(result.products);
                    })
            }
        }
})();