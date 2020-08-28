
$(document).ready(function () {



    function weatherApi(event) {
        event.preventDefault();






        var city = $('#city').val();
        // history.push(city)
        weatherForecast(city);

        if (city != '') {

            $.ajax({

                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7b8ff497009dcd9d7687041d628b4ed1&units=imperial",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    localStorage.setItem(city, JSON.stringify(data))
                    var weatherAnswers = show(data);


                    $('#show').html(weatherAnswers);
                    $('#city').val('');

                    uvIndex(data.coord.lat, data.coord.lon);
                    if (city && data) {
                        localStorage.setItem(data, city);



                    }


                }
            });

        } else {
            $('#invalid').html('Invalid city');
        }
        for (i = 0; i < localStorage.length; i++) {

            console.log(localStorage.getItem(data));

            var li = output.innerhtml += $('#city');
            $('#submitCity').append(li);






        }



    };








    function uvIndex(lat, lon) {
        console.log("lat and lon")
        console.log(lat, lon)
        $.ajax({
            type: "GET",
            url: "https://api.openweathermap.org/data/2.5/uvi?appid=7b8ff497009dcd9d7687041d628b4ed1&lat=" + lat + "&lon=" + lon,
            dataType: "json",
            success: function (UVdata) {
                var uv = UVdata
                //console.log("UV Data")
                // console.log(UVdata)
                //determine the uv value
                //determine the level
                //update the uv data in the html
                $('#showUv').html(uv)
                console.log(UVdata.value);
                if (UVdata.value < 3) {
                    return $('#showUv').css({ color: 'green', background: 'blue' }).html('UV Index' + UVdata.value);
                }
                else if (UVdata.value < 7) {
                    return $('#showUv').css({ color: 'yellow', background: 'blue' }).html('UV Index' + UVdata.value);
                }
                else {
                    return $('#showUv').css({ color: 'red', background: 'blue' }).html('UV Index' + UVdata.value);


                }





            }

        });
    }
    function weatherForecast(city) {
        $.ajax({
            type: "GET",
            url: "http://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=7b8ff497009dcd9d7687041d628b4ed1&units=imperial",
            dataType: 'json',
            success: function (forData) {
                console.log('fordata1', forData);
                console.log('fordata2', forData.list[1].dt_txt);
                console.log('fordata2', forData.list[1].main.temp);

                $('#forecastWeek').html("<h3><strong>5 Day Forecast:</strong></h3>").append('<div class="row"/>');

                // $('#forecastDay').html('Date:' + forData.list[1].dt_txt) +
                // $('#forecast').html('Temp:' + forData.list[1].main.temp) +
                // $('#forecastHum').html('Humidity:' + forData.list[1].main.humidity);

                for (i = 0; i < forData.list.length; i++) {
                    if (forData.list[i].dt_txt.indexOf('15:00:00') !== -1) {
                        console.log('fordata3', forData.list[i].dt_txt);

                        var col = $("<div>").addClass("col-2");
                        var card = $("<div>").addClass("card bg-primary text-white");
                        var body = $("<div>").addClass("card-body p-2");
                        var title = $("<h3>").addClass("card-title").text(forData.list[i].dt_txt).toLocalDateString;

                        var p1 = $("<p>").addClass("card-text").text("Temperature: " + forData.list[i].main.temp_max + " F");
                        var p2 = $("<p>").addClass("card-text").text("Humidity: " + forData.list[i].main.humidity + "%");
                        col.empty();
                        col.append(card.append(body.append(title, p1, p2)));
                        $("#forecastWeek .row").append(col);



                    }

                }













            }


        })




    }




    $('#submitCity').click(weatherApi)



});

function show(data) {

    return "<h2><em>Current Weather</em>: " + data.name + "</h2>" +
        "<h3><strong>Temperature:</strong>: " + data.main.temp + "</h3>" +
        "<h3><strong>Humidity:</strong>: " + data.main.humidity + "%</h3>" +
        "<h3><strong>Wind Speed:</strong>: " + data.wind.speed + "MPH</h3>";




}







