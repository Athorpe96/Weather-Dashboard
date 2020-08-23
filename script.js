
$(document).ready(function () {
    $('#submitCity').click(function (event) {
        event.preventDefault();

        var city = $('#city').val();
        if (city != '') {

            $.ajax({

                url: 'https://api.openweathermap.org/data/2.5/weather?q=' + city + "&appid=7b8ff497009dcd9d7687041d628b4ed1",
                type: "GET",
                dataType: "json",
                success: function (data) {

                    var weatherAnswers = show(data);


                    $('#show').html(weatherAnswers);
                    $('#city').val('');



                }
            });




        } else {
            $('#invalid').html('Invalid city');
        }
    });




});
function show(data) {
    return "<h2><em>Current Weather</em>: " + data.name + ", " + data.date + "</h2>" +
        "<h3><strong>Temperature:</strong>: " + data.main.temp + "</h3>" +
        "<h3><strong>Humidity:</strong>: " + data.main.humidity + "%</h3>" +
        "<h3><strong>Wind Speed:</strong>: " + data.wind.speed + "MPH</h3>";



}
function uvIndex(lat, lon) {
    $.ajax({
        type: "GET",
        url: "https://api.openweathermap.org/data/2.5/uvi?appid=7b8ff497009dcd9d7687041d628b4ed=" + lat + "&lon=" + lon,
        dataType: "json",
        success: function (data) {

        }
    });

}

