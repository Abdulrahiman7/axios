var forma=document.getElementById('newform');
var form = document.getElementById('submit');
form.addEventListener('click', newForm);

var ul = document.createElement('ul');

function display(nm, no, em, idr) {
  var li = document.createElement('li');
  li.setAttribute('email-data', em);
  li.setAttribute('id',idr)
  var text = document.createTextNode('name=' + nm + '   no.=' + no + " Submitted");
  var del = document.createElement('button');
  del.textContent = "Delete";
  var edit = document.createElement('button');
  edit.textContent = "Edit";
  li.appendChild(text);
  li.appendChild(del);
  li.appendChild(edit);
  ul.appendChild(li);

  del.addEventListener('click', function (e) {
    e.preventDefault();
    var de = this.parentElement;
    const ide = de.id;
    console.log(ide);
    const ur=`https://crudcrud.com/api/2fab56d7d9dc4b67a78dcc4bbd3bb8ec/newuser/${ide}`
    console.log(ur);
    axios.delete(ur)
      .then((response) => {
        ul.removeChild(de); 
      })
      .catch((err) => {
        console.log(err);
      });
  });

//   edit.addEventListener('click', function (e) {
//     e.preventDefault();
//     var n = document.getElementById('name');
//     n.value = nm;
//     var n = document.getElementById('email');
//     n.value = em;
//     var n = document.getElementById('number');
//     n.value = no;
//     var de = this.parentElement;
//     var e = de.getAttribute('i');
//   });
}

function newForm(e) {
  e.preventDefault();

  let nm = document.getElementById('name').value;
  let no = document.getElementById('number').value;
  let em = document.getElementById('email').value;

  let newitem = {
    name: nm,
    email: em,
    number: no
  };
  axios.post('https://crudcrud.com/api/2fab56d7d9dc4b67a78dcc4bbd3bb8ec/newuser', newitem)
    .then((response) => {
      var dataId = response.data._id;
      console.log(dataId);
      display(nm, no, em, dataId);
    })
    .catch((err) => {
      console.log(err);
    });
    
}

window.addEventListener('DOMContentLoaded', () => {
  axios.get('https://crudcrud.com/api/2fab56d7d9dc4b67a78dcc4bbd3bb8ec/newuser')
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        display(response.data[i].name, response.data[i].number, response.data[i].email, response.data[i]._id);
        //console.log(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

forma.appendChild(ul);