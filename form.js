var forma=document.getElementById('newform');
var form = document.getElementById('submit');
form.addEventListener('click', newForm);
let isEdit=false;
var ul = document.createElement('ul');
let ur='';
function display(nm, no, em, idr) {
  var li = document.createElement('li');
  li.setAttribute('email', em);
  li.setAttribute('number', no);
  li.setAttribute('name', nm);
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
    const de = this.parentElement;
    const ide = de.id;
    console.log(ide);
    ur=`https://crudcrud.com/api/36136c7b53a04424927c0d2f4126da9c/newuser/${ide}`
    axios.delete(ur)
      .then((response) => {
        ul.removeChild(de); 
      })
      .catch((err) => {
        console.log(err);
      });
  });

  edit.addEventListener('click', function (e) {
    e.preventDefault();
    isEdit=true;
    const de = this.parentElement;
    const ide = de.id;
    var ur=`https://crudcrud.com/api/36136c7b53a04424927c0d2f4126da9c/newuser/${ide}`
    axios.get(ur)
    .then((res) => {
        let n = document.getElementById('name');
    n.value = res.data.name;
    let m = document.getElementById('email');
    m.value = res.data.email;
    let l = document.getElementById('number');
    l.value = res.data.number;
    ul.removeChild(de);
    if(isEdit===true)
    {
    form.addEventListener('click', (e)=> {
        e.preventDefault();
        let nm = document.getElementById('name').value;
  let no = document.getElementById('number').value;
  let em = document.getElementById('email').value;

  let newitem = {
    name: nm,
    email: em,
    number: no
  };
        axios.put(ur, newitem)
        .then((response) => {
        console.log(response.data)
        isEdit=false;
        n='';
        m='';
        l='';
        })
    .catch((err) => {
      console.log(err)
    });
    })
}
    
    }).catch((err) => {
        console.log(err);
    })
    

    
  })
// function editing(m){

}

function newForm(e) {
  e.preventDefault();
if(isEdit===false)
{
  let nm = document.getElementById('name').value;
  let no = document.getElementById('number').value;
  let em = document.getElementById('email').value;

  let newitem = {
    name: nm,
    email: em,
    number: no
  };
  axios.post('https://crudcrud.com/api/36136c7b53a04424927c0d2f4126da9c/newuser', newitem)
    .then((response) => {
      var dataId = response.data._id;
      console.log(dataId);
      display(nm, no, em, dataId);
    })
    .catch((err) => {
      console.log(err);
    });
}
}
window.addEventListener('DOMContentLoaded', () => {
  axios.get('https://crudcrud.com/api/36136c7b53a04424927c0d2f4126da9c/newuser')
    .then((response) => {
      for (let i = 0; i < response.data.length; i++) {
        display(response.data[i].name, response.data[i].number, response.data[i].email, response.data[i]._id);
        console.log(response.data[i]);
      }
    })
    .catch((err) => {
      console.log(err);
    });
});

forma.appendChild(ul);