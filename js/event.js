jQuery(document).ready(function(){

	var songName = '';
	var songAlbum = '';
	var ico =  '';
	var songInfo = '';
	var imgInfo = '';
	var gaanaLoaded = false;
	var isPaused = true;


	//initialize local storage
	if(!gaanaLoaded) {
		initGaana();
		gaanaLoaded	= true;
	}
	

	/* Fetch the latest thumbnail */
	jQuery('.thumbHolder').bind('DOMNodeInserted', function(event) {

		imgInfo = jQuery(event.target.outerHTML).attr('src');
		
		if(!isEmpty(imgInfo)) {
			ico = imgInfo;
		}		
		callNotification(ico, songName, songAlbum);
	});

	/* Fetch Song Info */
	jQuery('.mainPlayer').bind('DOMNodeInserted', function(event) {
		try {
			songInfo = jQuery(event.target).find(".song-title1").html();
			if(!isEmpty(songInfo)) {
				songName = jQuery(event.target).find(" .song-title1 #trackInfo").html();
				songAlbum = jQuery(event.target).find(" .song-title1 .albumNamePl").html();
			}
		}
		catch(exception) {

		}
    });


	function callNotification(ico, songName, songAlbum) {
		if(!isEmpty(songName) && !isEmpty(songAlbum) && !isEmpty(ico)) {
				 chrome.runtime.sendMessage({notify:'notification', ico: ico, title: songName, message: songAlbum}, function(response) {
				 	songName = '';
				 	songAlbum = '';
				 	ico = '';
				 });
			}
	}

	function isEmpty(strValue) {
		if(strValue == '' || strValue == undefined || strValue == 'undefined') {
			return true;
		} 
		else
			return false;
	}


	function initGaana() {

		var songnm = jQuery('.song-title1 #trackInfo').html();
		var songalbm = jQuery('.song-title1 .albumNamePl').html();
		var songicon = jQuery('.thumbHolder img').attr('src');

		callNotification(songicon, songnm, songalbm);
	}

});