


//DEFINE CITIES
var cities = [{name:"Chengdu", lat:104.065307, lon:30.6611346, qName:"chengdu", dName:"chengdu"},
    {name:"Changchun", lat:125.3235, lon:43.8171, qName:"changchun", dName:"changchun"},
    {name:"Tianjin", lat:117.2010, lon:39.0842, qName:"tianjing", dName:"tianjin"},
    {name:"Wuhan", lat:114.3054, lon:30.5931, qName:"wuhan", dName:"wuhan"},
    {name:"Xi'an", lat:108.9398, lon:34.3416, qName:"xian", dName:"xian"},
    {name:"Shenyang", lat:123.4315, lon:41.8057, qName:"shenyang", dName:"shenyang"},
    {name:"Hangzhou", lat:120.1551, lon:30.2741, qName:"hangzhou", dName:"hangzhou"}
    ];

var currentCityName = "Wuhan";
var currentCity;
for (var i in cities){
    if (cities[i].name == currentCityName){
        currentCity = cities[i];
    }
}
$(".dropdown-btn").html(currentCity.name);



//CREATE MAP
mapboxgl.accessToken = 'pk.eyJ1IjoibWl0Y2l2aWNkYXRhIiwiYSI6ImNpbDQ0aGR0djN3MGl1bWtzaDZrajdzb28ifQ.quOF41LsLB5FdjnGLwbrrg';


var map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/mitcivicdata/ciyl2q5f2002z2rnop6l2oenw',
    zoom: 11,
    //minZoom: 10,
    maxZoom: 14,
    center: [currentCity.lat, currentCity.lon]
});
// map.scrollZoom.disable();
map.getCanvas().style.position = 'absolute';
map.getCanvas().style.width = '100%';
map.getCanvas().style.left = '0';
map.getCanvasContainer().style.position = 'absolute';
map.getCanvasContainer().style.width = '100%';
map.getCanvasContainer().style.height = '100%';
map.addControl(new mapboxgl.NavigationControl(), 'bottom-left');


//ADD DATA TO MAP
map.on('load', function () {


    map.addLayer({
        'id': 'clusters-layer',
        'type': 'fill',
        'source': {
            type: 'vector',
            url:'mapbox://mitcivicdata.424jj7nw'
        },
        'source-layer':'ghostcities-bcoxq3',
        'paint': {
            'fill-color': {
                property: 'ghostcity',
                type: 'categorical',
                stops: [
                    ['false', 'rgba(176, 218, 228, 0.7)'],
                    ['true', 'rgba(254, 9, 1, 0.7)']
                ]
            },
            'fill-outline-color': {
                property: 'ghostcity',
                type: 'categorical',
                stops: [
                    ['false', 'rgba(176, 218, 228, 1)'],
                    ['true', 'rgba(254, 9, 1, 1)']
                ]
            }
        }

    });


});

//CHANGE CITY

var previousCity;
$(".dropdown-content").on('click', 'li', function(){
    currentCityName = String($(this).html());
    previousCity = currentCity;
    for (var i in cities){
        if (cities[i].name == currentCityName){
            currentCity = cities[i];
        }
    }
    $(".dropdown-btn").html(currentCity.name);
    $(this).remove();
    $('.dropdown-content').append('<li class="city-btn">'+previousCity.name+'</li>');
    if(currentCity.name != previousCity.name){
        map.flyTo({center: [currentCity.lat, currentCity.lon], zoom: 11});
    }


});



