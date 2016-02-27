[![Stories in Ready](https://badge.waffle.io/araedavis/screen.png?label=ready&title=Ready)](https://waffle.io/araedavis/screen)

#**About Screen**

Screen is written in client-side JavaScript and SQL, and is designed to serve as a companion schedule application to independent film festivals. Filter a festival schedule on multiple criteria, watch trailers, and create a custom schedule of interesting films. Integrates with the Open Movie Database API and Twitter to display ratings and tweet reviews quickly.

**[View live demo](https://screen-portland.herokuapp.com/)**

##**Getting Started**

Before cloning the Screen repo, make sure you have the following installed:
* 		[node](https://nodejs.org/en/)
* 		[npm](https://www.npmjs.com/)
		
	
##**Add Data**

	The Screen repo includes a festivalData.json file that can be repurposed to house your event data. The database table instantiates from this file.
	
	Default JSON format: 
	{
    "country":"AFGHANISTAN",
    "title":"WAJMA (AN AFGHAN LOVE STORY)",
    "director":"Barmak Akram",
    "description":"It's snowing in Kabul, and gregarious waiter Mustafa charms a bright, pretty student named Wajma... ",
    "trt":85,
    "venue":"Fox Tower",
    "date":"2016/02/07",
    "time":"20:30:00",
    "alt_venue":"Cinemagic",
    "alt_date":"2016/02/16",
    "alt_time":"15:00:00",
    "imagesmall":"Wajma_500.jpg",
    "imagelarge":"1183805_Wajma-guitar.jpg",
    "youtube":"http://www.youtube.com/v/zcTp5fbW3K0",
    "genre1":"Narrative Feature",
    "genre2":"",
    "genre3":"",
    "title":"WAJMA (AN AFGHAN LOVE STORY)"
  	},
		
