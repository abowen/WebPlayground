
$(function () {

    // Common Food
    var foodData = ko.observableArray([
    { name: "Chicken Thigh", calories: "235", url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100g+of+chicken+thigh" },
    { name: "Lamb", calories: "78", url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100g+of+lamb" },
    { name: "Duck", calories: "269", url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100g+of+duck" },

    ]);

    // Common Drinks
    var drinkData = ko.observableArray([
    { name: "Milk", calories: "69", url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+milk" },
    { name: "Skim Milk", calories: "39", url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+skim+milk" },
    { name: "Beer", calories: "34", url: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+beer" },

    ]);

    // Binding
    var myViewModel = {
        food: foodData,
        drink: drinkData
    };

    ko.applyBindings(myViewModel);
});