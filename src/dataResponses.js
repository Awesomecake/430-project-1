// Default posts to keep Heroku Interesting
const posts = {
  'Elden Ring': {
    'Elden ringer ': {
      'Gosh Darn Elden Ring': {
        postTitle: 'Gosh Darn Elden Ring',
        postContent: 'AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA',
      },
      name: 'Elden ringer ',
    },
  },
};

// function to respond with a json object
// takes request, response, status code and object to send
const respondJSON = (request, response, status, object) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.write(JSON.stringify(object));
  response.end();
};

// function to respond without json body
// takes request, response and status code
const respondJSONMeta = (request, response, status) => {
  response.writeHead(status, { 'Content-Type': 'application/json' });
  response.end();
};

const addPost = (request, response, params) => {
  // default json message
  const responseJSON = {
    message: 'Error: Post Title and Content are both required.',
  };

  //Check for missing parameters
  if (!params.section) {
    responseJSON.id = 'missingSectionIdentifier';
    return respondJSON(request, response, 400, responseJSON);
  }

  if (!params.name || !params.postTitle || !params.postContent) {
    responseJSON.id = 'addMissingPostParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  // add section if it doesnt exist
  if (!posts[params.section]) {
    posts[params.section] = {};
  }

  let responseCode = 201;

  // add user name if it doesnt exist
  if (!posts[params.section][params.name]) {
    posts[params.section][params.name] = {};
  }

  // add post if it doesnt exist or update it if it does
  if (posts[params.section][params.name][params.postTitle]) {
    responseCode = 204;
  } else {
    posts[params.section][params.name][params.postTitle] = {};
  }

  posts[params.section][params.name].name = params.name;
  posts[params.section][params.name][params.postTitle].postTitle = params.postTitle;
  posts[params.section][params.name][params.postTitle].postContent = params.postContent;

  if (responseCode === 201) {
    responseJSON.message = 'Post created successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  return respondJSONMeta(request, response, responseCode);
};

// get posts, query by section
const getPosts = (request, response, params) => {
  if (request.method === 'GET') {
    if (!params.section) {
      const responseJSON = { posts };
      return respondJSON(request, response, 200, responseJSON);
    }

    if (!posts[params.section]) {
      posts[params.section] = {};
    }
    const responseJSON = { posts: posts[params.section] };
    return respondJSON(request, response, 200, responseJSON);
  }
  return respondJSONMeta(request, response, 200);
};

const notFound = (request, response) => {
  const responseOutput = {
    message: 'The page you are looking for was not found.',
    id: 'notFound',
  };
  return respondJSON(request, response, 404, responseOutput);
};

// set public modules
module.exports = {
  getPosts,
  addPost,
  notFound,
};
