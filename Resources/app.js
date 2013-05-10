Titanium.UI.setBackgroundColor('#000');
Ti.Database.install('indicator.sqlite', "indicator");

var win = Titanium.UI.createWindow({  
    backgroundColor:'#fff'
});
var wrappr;

var inserRow = function(rowIndex){
	 var db = Ti.Database.open("indicator");
	 db.execute("INSERT OR REPLACE INTO demo (cid,coloumn1,coloumn2,coloumn3,coloumn4,coloumn5,coloumn6,coloumn7,coloumn8,coloumn9,coloumn10,coloumn11,coloumn12,coloumn13,coloumn14,coloumn15,coloumn16,coloumn17,coloumn18,coloumn19,coloumn20,coloumn21,coloumn22) VALUES (?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)", rowIndex, "coloumn1 - this sampele description text", "coloumn2 - this sampele description text", "coloumn3 - this sampele description text", "coloumn4 - this sampele description text", "coloumn5 - this sampele description text", "coloumn6 - this sampele description text", "coloumn7 - this sampele description text", "coloumn8 - this sampele description text", "coloumn9 - this sampele description text", "coloumn10 - this sampele description text", "coloumn11 - this sampele description text", "coloumn12 - this sampele description text", "coloumn13 - this sampele description text", "coloumn14 - this sampele description text", "coloumn15 - this sampele description text", "coloumn16 - this sampele description text", "coloumn17 - this sampele description text", "coloumn18 - this sampele description text", "coloumn19 - this sampele description text", "coloumn20 - this sampele description text", "coloumn21 - this sampele description text", "coloumn22 - this sampele description text");
	 db.close();
};

var deleteTable = function(){
	var db = Ti.Database.open("indicator");
	db.execute("delete from demo");
	db.close();
};

var addLoading = function(){
     wrappr = Titanium.UI.createView({
        height: Ti.Platform.displayCaps.platformHeight,
        width: Ti.Platform.displayCaps.platformWidth,
        backgroundColor: '#000',
        opacity: 0.8
    });
    win.add(wrappr);
    
    var indView = Titanium.UI.createView({
        height : "150",
        width : Ti.UI.FILL,
        backgroundColor: '#000'
    });
    wrappr.add(indView);

	var loaderView = Ti.UI.createView({
		height : Ti.UI.SIZE,
		top : 35
	});
	indView.add(loaderView);

	var prefix = 'loadingSmall/';
    
    Ti.API.info("prefix = "+prefix);
	var loader = Ti.UI.createImageView({
		height : 50,
		width : 50,
		duration : 50,
		images : [prefix + 'loading01.png', prefix + 'loading02.png', prefix + 'loading03.png', prefix + 'loading04.png', prefix + 'loading05.png', prefix + 'loading06.png', prefix + 'loading07.png', prefix + 'loading08.png', prefix + 'loading09.png', prefix + 'loading10.png', prefix + 'loading11.png', prefix + 'loading12.png', prefix + 'loading13.png', prefix + 'loading14.png', prefix + 'loading15.png', prefix + 'loading16.png', prefix + 'loading17.png', prefix + 'loading18.png']
	});
	loaderView.add(loader);
	loader.start();
	
	var message = Titanium.UI.createLabel({ 
		top: 100,
	    text: 'Loading...',
	    color: '#fff',
	    width: Ti.UI.SIZE,
	    height: Ti.UI.SIZE,
	    font : {
			fontFamily:"Helvetica Nue",
			fontSize:14,
			fontWight:"bold"
		}
	});
	indView.add(message);
};

var removeLoading = function(){
	win.remove(wrappr);
}

// Create a Button.
var syncBtn = Ti.UI.createButton({
	title : 'Sync'
});

// Listen for click events.
syncBtn.addEventListener('click', function() {
	 addLoading();
	 var url = "http://www.appcelerator.com";
	 var client = Ti.Network.createHTTPClient({
	     // function called when the response data is available
	     onload : function(e) {
	         Ti.API.info("Received text: " + this.responseText);
	         Ti.API.info("delete demo table");
	         deleteTable();
			 Ti.API.info("insert demo table");
	         for(var i = 1; i<3500; i++){
	         	 Ti.API.info("row index = "+i);
	         	 inserRow(i);
			 }
			 removeLoading();
	     },
	     // function called when an error occurs, including a timeout
	     onerror : function(e) {
	     	 removeLoading();
	         Ti.API.debug(e.error);
	     },
	     timeout : 5000  // in milliseconds
	 });
	 // Prepare the connection.
	 client.open("GET", url);
	 // Send the request.
	 client.send();
});

win.add(syncBtn);
	

win.open();
