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

  return `<div class='results'><a href="${videoLink}" target='_blank'><img src="${result.snippet.thumbnails.medium.url}" 
          alt='${result.snippet.title}'/></a></div>`;
}

/*function renderNumResults(data) {
  const numResults = data.pageInfo.resultsPerPage;
  console.log(numResults);
  return `<p>There are ${numResults} videos</p>`;
}

function displayNumResults(data) {
  const numberOfResults = renderNumResults(data);
  $('.js-search-results').html(numberOfResults);
}*/

function displayYouTubeData(data) {
  
  const results = data.items.map((item, index) => renderResult(item));
  //displayNumResults(data);
  const numberOfResults = results.length;
  $('.js-num-results').prop('hidden', false).html(`<div class='numberRes'>There are ${numberOfResults} videos</div>`);
  //$('.js-search-results').prop('hidden', false).html(`<h1>this is a header</h1><br>`);
  $('.js-search-results').prop('hidden', false).html(results);
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
