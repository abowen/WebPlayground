
$(function () {

    // Sample Data
    var sampleData = {};
    sampleData.getData = (function () {
        var result = ko.observableArray([
        { name: "Desktop", key: "1500" },
        { name: "Dell XPS 15", key: "2200" },
        { name: "Dell E7440", key: "900" },
        { name: "Lenovo X230", key: "1100" }
        ]);
        return result;
    })();


    // Observable
    var myViewModel = {
        firstName: ko.observable("Andrew"),
        lastName: ko.observable("Bowen"),
        income: ko.observable(100000),
        expenses: ko.observable(0),
    };

    

    // Computed Observable
    myViewModel.fullName = ko.computed(function() {
        return this.firstName() + ' ' + this.lastName();
    }, myViewModel);

    // Computed Converter
    myViewModel.percent = ko.computed({
        read: function () {            
            var value = this.expenses() ? this.income() / this.expenses() : 0;
            return (value * 100).toFixed(2) + '%';
        },
        write: function (value) {
            value = parseFloat(value.replace(/[^\.\d]/g, ""));
            value = isNaN(value) ? 0 : value;
            var result = this.income() / (value / 100);
            this.expenses(result);
        },
        owner: myViewModel
    });

    // Observable Array
    myViewModel.computers = ko.observableArray([]);
    myViewModel.selectedComputer = ko.observable("");

    myViewModel.loadData = function() {
        var data = sampleData.getData();
        $.each(data, function(i, c) {
            myViewModel.computers.push(c);
        });
    };


    myViewModel.loadData();

    ko.applyBindings(myViewModel);

});