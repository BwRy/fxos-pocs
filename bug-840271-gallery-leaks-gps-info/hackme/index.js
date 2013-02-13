
console.log("Hello this is hackme");

var button = document.querySelector("#button");
if (button) {
    button.onclick = function () {
	var settings = navigator.mozSettings;
	var lock = settings.createLock();
	var reqWallpaper = lock.get('wallpaper.image');
	reqWallpaper.onsuccess = function wallpaper_getWallpaperSuccess() {
	    console.log("WALLPAPER.IMAGE: " + reqWallpaper.result['wallpaper.image']);
	};
    };
}

function uploadImages(data) {
    var blobs = data.blobs, filenames = data.filenames, paths = data.filepaths;
    blobs.forEach(function(blob, index) {
	console.log("Uploading " + filenames[index] + " " + paths[index]);
	var fd = new FormData();
        fd.append('name', 'photo');
        fd.append('file', blob);
        $.ajax({
            type: 'POST',
            url: 'http://10.242.35.205:8080/upload',
            data: fd,
            processData: false,
            contentType: false
        }).done(function(data) {
            console.log(data);
        });
    });
}

navigator.mozSetMessageHandler("activity", function (a) {
    if (a.source.name === 'share') {
	uploadImages(a.source.data);
    }
});

