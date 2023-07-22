//axios.defaults.headers.common['some auto token'] = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
// GET REQUEST
function getTodos() {
  axios
  .get('https://jsonplaceholder.typicode.com/todos')
  .then(res => showOutput(res))
  .catch(err => console.error(err));
}

// POST REQUEST
function addTodo() {
  axios
  .post('https://jsonplaceholder.typicode.com/todos',{
    title: 'new todo',
    completed: false
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err));
}

// PUT/PATCH REQUEST
function updateTodo() {
  axios
  .put('https://jsonplaceholder.typicode.com/todos/1',{
    title: 'updated todo',
    completed: true
  })
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// DELETE REQUEST
function removeTodo() {
  axios
  .put('https://jsonplaceholder.typicode.com/todos/1')
  .then(res => showOutput(res))
  .catch(err => console.error(err))
}

// SIMULTANEOUS DATA
function getData() {
  axios.all([axios.get('https://jsonplaceholder.typicode.com/todos?_limit=5'),
  axios.get('https://jsonplaceholder.typicode.com/posts?_limit=5')])
  // .then(res => {
  //   console.log(res[0]);
  //   console.log(res[1]);
  //   showOutput(res[1]);
  // }) or
  .then(axios.spread((todos, posts) => showOutput(posts)))
  .catch(err => console.error(err))
  console.log('Simultaneous Request');
}

// CUSTOM HEADERS
function customHeaders() {
  const config={
    headers: {
      'content-type': 'application/json',
      Authorization: 'sometoken'
    }
  }
  axios
  .post('https://jsonplaceholder.typicode.com/todos',{
    title: 'new todo',
    completed: false
  },config)
  .then(res => showOutput(res))
  .catch(err => console.error(err));
  console.log('Custom Headers');
}

// TRANSFORMING REQUESTS & RESPONSES
function transformResponse() {
  // const options ={
  //   method:'post',
  //   URL: 'https://jsonplaceholder.typicode.com/todos',
  //   data: {
  //     title:'Hello world'
  //   },
  //   transformResponse: axios.defaults.transformResponse.concat(data => {
  //     data.title = data.title.toUpperCase();
  //     return data;
  //   })
  // }
  // axios(options).then(res => showOutput(res))
  console.log('Transform Response');
}

// ERROR HANDLING
function errorHandling() {
  axios
  .get('https://jsonplaceholder.typicode.com/todos')
  .then(res => showOutput(res))
  .catch(err => {
    console.log(error.resposne.data)
    console.log(errors.response.status)
    console.log(errors.response.headers)
  });
  console.log('Error Handling');
  if(err.response.status === 404){
    alert('Error: page not found')
  }else console.log(err.message)
}

// CANCEL TOKEN
function cancelToken() {
  const source= axios.cancelToken.source();
  axios
  .get('https://jsonplaceholder.typicode.com/todos',{
  cancelToken: source.token
})
  .then(res => showOutput(res))
  .catch(thrown => {
    if(axios.isCancel(thrown)) {
      console.log('request cancelled',thrown.message)
    }
  });
}

// INTERCEPTING REQUESTS & RESPONSES
// axios.inteceptors.request.use(config => {
//   console.log(`${config.method.toUpperCase()} request send to ${config.url} at ${new Date().getTime()}`);
//   return config;
// },error =>{
//   return Promise.reject(error)
// });

// AXIOS INSTANCES
const instance= axios.create({baseURL: 'https://jsonplaceholder.typicode.com'});
instance.get('/comments').then(res => showOutput(res));


// Show output in browser
function showOutput(res) {
  document.getElementById('res').innerHTML = `
  <div class="card card-body mb-4">
    <h5>Status: ${res.status}</h5>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Headers
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.headers, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Data
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.data, null, 2)}</pre>
    </div>
  </div>

  <div class="card mt-3">
    <div class="card-header">
      Config
    </div>
    <div class="card-body">
      <pre>${JSON.stringify(res.config, null, 2)}</pre>
    </div>
  </div>
`;
}

// Event listeners
document.getElementById('get').addEventListener('click', getTodos);
document.getElementById('post').addEventListener('click', addTodo);
document.getElementById('update').addEventListener('click', updateTodo);
document.getElementById('delete').addEventListener('click', removeTodo);
document.getElementById('sim').addEventListener('click', getData);
document.getElementById('headers').addEventListener('click', customHeaders);
document
  .getElementById('transform')
  .addEventListener('click', transformResponse);
document.getElementById('error').addEventListener('click', errorHandling);
document.getElementById('cancel').addEventListener('click', cancelToken);
