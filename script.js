
$(document).ready(function () {


    function weatherApi(event) {
        event.preventDefault();

        var city = $('#city').val();
        weatherForecast(city);

        if (city != '') {

            $.ajax({

                url: "http://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=7b8ff497009dcd9d7687041d628b4ed1&units=imperial",
                type: "GET",
                dataType: "json",
                success: function (data) {
                    console.log(data);
                    var weatherAnswers = show(data);


                    $('#show').html(weatherAnswers);
                    $('#city').val('');

                    uvIndex(data.coord.lat, data.coord.lon);

                }
            });

        } else {
            $('#invalid').html('Invalid city');
        }
    };

    function weatherForecast(city) {
        $.ajax({
            type: "GET",
            url: "api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=7b8ff497009dcd9d7687041d628b4ed1",
            dataType: 'json',
            success: function (forData) {
                console.log(forData);
                var forecast = forData
                $('#forecast').html(forecast)
                console.log(forData);
            }


        })
        console.log(city);
    }


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
                    return $('#showUv').html('UV Index' + UVdata.value);
                }
                else if (UVdata.value < 7) {
                    return $('#showUv').html('UV Index' + UVdata.value);
                }
                else {
                    return $('#showUv').css({ color: 'red', background: 'blue' }).html('UV Index' + UVdata.value);
                }



            }
        });
    }




    $('#submitCity').click(weatherApi)



});

function show(data) {

    return "<h2><em>Current Weather</em>: " + data.name + ", " + data.date + "</h2>" +
        "<h3><strong>Temperature:</strong>: " + data.main.temp + "</h3>" +
        "<h3><strong>Humidity:</strong>: " + data.main.humidity + "%</h3>" +
        "<h3><strong>Wind Speed:</strong>: " + data.wind.speed + "MPH</h3>";




}


