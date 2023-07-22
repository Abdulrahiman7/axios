var form=document.getElementById('newform');

form.addEventListener('submit', newForm);
var ul=document.createElement('ul');


function display(nm,no,em){
    var li=document.createElement('li');
    li.setAttribute('email-data',em);
    var text=document.createTextNode('name='+nm+'   no.='+no+" Submitted");
    var del=document.createElement('button');
    del.textContent="delete";
    var edit=document.createElement('button');
    edit.textContent="Edit";
    li.appendChild(text);
    li.appendChild(del);
    li.appendChild(edit);
    ul.appendChild(li);
}
function newForm(e)
{
    e.preventDefault();

    let nm=document.getElementById('name').value;
    let no=document.getElementById('number').value;
    let em=document.getElementById('email').value;
    
    display(nm,no,em);
    

    del.addEventListener('click',function()
    {
            var de=this.parentElement;
            ul.removeChild(de);
            var ema=de.getAttribute('email-data');  
    });
    edit.addEventListener('click',function(e)
    {
        e.preventDefault();
        var n=document.getElementById('name');
        n.value=nm;
        var n=document.getElementById('email');
        n.value=em;
        var n=document.getElementById('number');
        n.value=no;
        var de=this.parentElement;
            var e=de.getAttribute('i');  
    });
var newitem={
    name:nm,
    email:em,
    number:no
};
axios.post('https://crudcrud.com/api/c6c902a5fa894d978a0f9fe5eb66fefe/newuser',newitem)
.then((resoponse) => {
    console.log(resoponse);
})
.catch((err) => {
    console.log(err);
} )
}
window.addEventListener('DOMContentLoaded',()=>{
    axios.get('https://crudcrud.com/api/c6c902a5fa894d978a0f9fe5eb66fefe/newuser')
    
.then((resoponse) => {
    for(let i=0;i<resoponse.data.length;i++){
        display(resoponse.data[i].name,resoponse.data[i].number,resoponse.data[i].email);
    console.log(resoponse.data[i]);
} 
})
.catch((err) => {
    console.log(err);
})
})
form.appendChild(ul);