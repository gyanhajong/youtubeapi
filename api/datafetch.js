'use-strict';

var mongoose = require('mongoose');
var Video = mongoose.model('Videos');

const axios = require('axios');


var npageToken = "";

function runSample() {
    console.log("pageToken "+npageToken);
    axios.get('https://youtube.googleapis.com/youtube/v3/search?',{
        params: {
            part: 'snippet',
            order: 'date',
            pageToken: npageToken,
            publishedAfter: '2021-01-01T00:00:00Z',
            type: 'video',
            q: "errichto",
            key: 'AIzaSyBJFRtYrUMg22wHy6BKYjFQRkNOmkyogfc'

        }
    })
        .then(function (response) {
            uploadData(response.data);
            console.log(response.data);
        })
        .catch(function (error) {
        // handle error
        console.log(error);
        })
        .then(function () {
        // always executed
        });
}

if (module === require.main) {
  runSample().catch(console.error);
}
var videoTitle, videoId, videoDesc, videoThumbnail;

function uploadData(response) {
    npageToken = response.nextPageToken;
    var noPP = response.pageInfo.resultsPerPage;
    response.items.forEach(item => {
        var video = {
            _id: item.id.videoId,
            title: item.snippet.title,
            order: "date",
            description: item.snippet.description,
            publishedDateTime:  new Date(item.snippet.publishedAt),
            thumbnail: item.snippet.thumbnails.default.url
        }
        var newVideo = new Video(video);
        newVideo.save(function(err, task) {
            if (err) console.log(err);
            else console.log("Success!"+npageToken+"\n");
        });
    });
    if(npageToken!=undefined||noPP>0) runSample();
}
module.exports = runSample;