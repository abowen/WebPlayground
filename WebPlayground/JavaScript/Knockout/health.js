
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

    // Binding
    var myViewModel = {
        food: foodData,
        drink: drinkData,
        foodIntake: ko.observableArray([])
    };

    var foodEntry = function () {
        var self = this;
        this.selectedItem = ko.observable({});
        this.input = ko.observable(100);
        this.result = ko.computed(function() {
            //alert("called");            
            if (!selectedItem) {
                return 0;
            }
            return self.input * self.selectedItem.calories;
        });
    };

    myViewModel.foodIntake.push(new foodEntry());

    ko.applyBindings(myViewModel);
});

