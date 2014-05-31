
$(function() {

    // Common Food
    var foodData = ko.observableArray([
    { name: "Chicken Thigh", calories: 235, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100g+of+chicken+thigh" },
    { name: "Chicken Breast", calories: 175, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100g+of+chicken+breast" },
    { name: "Lamb", calories: 251, url: "https://www.wolframalpha.com/input/?i=calories+in+100g+of+lamb&a=*DPClash.ExpandedFoodE.lamb-_*PreparedLamb-" },
    { name: "Duck", calories: 269, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100g+of+duck" },
    { name: "Sirloin Steak", calories: 211, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100g+of+sirloin+steak" },


    ]);

    // Common Drinks
    var drinkData = ko.observableArray([
    { name: "Milk", calories: 69, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+milk" },
    { name: "Skim Milk", calories: 39, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+skim+milk" },
    { name: "Beer", calories: 34, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+beer" },
    { name: "Rum", calories: 219, url: "https://www.wolframalpha.com/input/?i=calories+in+100ml+of+rum" },
    ]);

    var exerciseData = ko.observableArray([
    { name: "Push ups",      calories: 20, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+milk" },
    { name: "Burpees",       calories: 10, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+milk" },
    { name: "Walking  4kmh", calories:  1, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+milk" },
    { name: "Jogging  6kmh", calories:  4, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+milk" },
    { name: "Running  8kmh", calories:  8, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+skim+milk" },
    { name: "Running 10kmh", calories: 10, url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+beer" },
    { name: "Running 12kmh", calories: 15, url: "https://www.wolframalpha.com/input/?i=calories+in+100ml+of+rum" },
    { name: "Running 15kmh", calories: 24, url: "https://www.wolframalpha.com/input/?i=calories+in+100ml+of+rum" },
    { name: "Sprint  18kmh", calories: 30, url: "https://www.wolframalpha.com/input/?i=calories+in+100ml+of+rum" },
    ]);

    // Binding
    var myViewModel = {
        food: foodData,
        drink: drinkData,
        exercise: exerciseData,
        foodIntake: ko.observableArray([]),
        speedEntry: ko.observableArray([])
    };

    var foodEntry = function () {
        var self = this;
        this.selectedItem = ko.observable();
        this.input = ko.observable(0);
        this.result = ko.computed(function() {                    
            if (!self.selectedItem()) {
                return 0;
            }
            return self.input() * self.selectedItem()[0].calories / 100;
        });
    };

    myViewModel.foodIntake.push(new foodEntry());

    var speedEntry = function () {
        var self = this;
        this.speed = ko.observable(0);
        this.time = ko.observable(0);
        this.distance = ko.computed(function () {
            return self.speed() * self.time() / 60;
        });
        this.pace = ko.computed(function () {
            if (self.speed() == 0) {
                return 0;
            }
            return 1 / (self.speed() / 60);
        });
    };

    myViewModel.speedEntry.push(new speedEntry());


    ko.applyBindings(myViewModel);
});

