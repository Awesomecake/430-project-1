const posts = {};

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
    message: 'Name and age are both required.',
  };

  // check for name and age
  if (!params.name || !params.postTitle || !params.postContent) {
    responseJSON.id = 'addUserMissingParams';
    return respondJSON(request, response, 400, responseJSON);
  }

  if(!posts[params.section])
  {
    posts[params.section] = {};
  }

  let responseCode = 201;

  if (!posts[params.section][params.name]) {
    posts[params.section][params.name] = {};
  } 

  if (posts[params.section][params.name][params.postTitle]) {
    responseCode = 204;
  }
  else 
  {
    posts[params.section][params.name][params.postTitle] = {};
  }

  posts[params.section][params.name].name = params.name;
  posts[params.section][params.name][params.postTitle].postTitle = params.postTitle;
  posts[params.section][params.name][params.postTitle].postContent = params.postContent;

  if (responseCode === 201) {
    responseJSON.message = 'Created Successfully';
    return respondJSON(request, response, responseCode, responseJSON);
  }

  responseJSON.message = 'Updated Successfully';
  return respondJSON(request, response, responseCode, responseJSON);
};

const getPosts = (request, response,params) => {
  if (request.method === 'GET') {
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
  getUsers: getPosts,
  addPost,
  notFound,
};
