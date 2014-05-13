
$(function () {

    // Common Food Calories
    var foodData = {};
    foodData.getData = (function () {
        var result = ko.observableArray([
        { name: "Milk", calories: "69", reference: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+milk" },
        { name: "Skim Milk", calories: "39", reference: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+skim+milk" },
        { name: "Beer", calories: "34", reference: "https://www.wolframalpha.com/input/?i=how+many+calories+in+100ml+of+beer" },
            
        ]);
        return result;
    })();

    // Observable
    var myViewModel = {        
        food:  ko.observableArray([])
    };   

    myViewModel.loadData = function() {
        var data = foodData.getData();
        $.each(data, function(i, c) {
            myViewModel.food.push(c);
        });
    };

    myViewModel.loadData();

    ko.applyBindings(myViewModel);

});