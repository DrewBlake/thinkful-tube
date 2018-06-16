const YOUTUBE_SEARCH_URL = 'https://www.googleapis.com/youtube/v3/search';

function getDataFromApi(userInput, callback) {
  const query = {
    part: 'snippet',
    type: 'video',
    key: 'AIzaSyBAF_VBTljjbBf2BIhP8mXReU6pdHIPrIA',
    q: `${userInput}`
  }
  $.getJSON(YOUTUBE_SEARCH_URL, query, callback);
}

//use this to link to video from image url.
//last part after query is items.videoId in api object.
//https://www.youtube.com/results?search_query=ws1o-N024es

function renderResult(result) {
  const videoLink = `https://www.youtube.com/results?search_query=${result.id.videoId}`;
  return `<div class='results' aria-live='assertive'><a href="${videoLink}"><img src="${result.snippet.thumbnails.medium.url}" 
          alt='${result.snippet.title}'/></a></div>`;
}

function displayYouTubeData(data) {
  const results = data.items.map((item, index) => renderResult(item));
  
  //console.log(data.items[0].snippet.title);
  $('.js-search-results').html(results);
}

function getSubmitDisplay () {
 /* $('js-search-form').submit(function(event) {
    event.preventDefault();
    const queryTarget = $(this).find('.js-query');
    const query = queryTarget.val();
    queryTarget.val('');
    getDataFromApi(query, displayYouTubeData);
  });*/
  $('.js-search-form').submit(event => {
    event.preventDefault();
    const queryTarget = $(event.currentTarget).find('.js-query');
    const query = queryTarget.val();
    // clear out the input
    queryTarget.val("");
    getDataFromApi(query, displayYouTubeData);
    console.log(query);
    
  });
}

$(getSubmitDisplay);
