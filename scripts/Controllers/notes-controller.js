//                       WORKING
// this talks with screen Controller(I/O) + Events + Talk to Service


import{noteOperations}from'../services/note-service.js';
window.addEventListener('load',init);

function init(){
  showCounts();
  bindEvents();
  disableButton(); //screen khulne par disabled h button
}



const enableButton=()=>
{
    document.querySelector("#delete").disabled=false;
}
const disableButton=()=>
{
    document.querySelector("#delete").disabled=true;
}
function bindEvents()
{
    document.querySelector('#add').addEventListener('click',addNote);
    document.querySelector("#delete").addEventListener('click',deleteMarked)
}

function deleteMarked()
{
    noteOperations.remove();
    printNotes(noteOperations.getNotes());
}

function showCounts()
{
    noteOperations.marktotal()>0?enableButton():disableButton();
    document.querySelector('#total').innerText = noteOperations.total();
    document.querySelector('#marktotal').innerText = noteOperations.marktotal();
    document.querySelector('#unmarktotal').innerText = noteOperations.unmarktotal();
}

function addNote(){
   // read id, title , desc, date of completion ,importance
   //DOM
   const fields = ['id','title','desc','cdate','importance']; // INPUT KA ARRAY H
   const noteObject = {};//object literal(generic)
   for(var field of fields)
   {
      noteObject[field]=document.querySelector(`#${field}`).value.trim(); // (created a object at every index of array)to take one-one field individualy at a time
   }
   
//    const id = document.querySelector('#id').value; (to avoid repeation use above method)
//    const title = document.querySelector('#title').value;
    noteOperations.add(noteObject);
    printNote(noteObject);
    showCounts();
}

function printIcon(myClassName='trash',fn,id)
{
    //<i class="fa-solid fa-trash"></i> // never write this 
    const iTag = document.createElement('i'); //**imp (to create dynamic tag)creating "i" tag <i></i>
    iTag.setAttribute('note-id',id);
    iTag.className = `fa-solid fa-${myClassName} me-2 hand`;// me-2 is margin = 2 pixel
    iTag.addEventListener('click',fn);
    return iTag;
}

function toggleMark() // on clicking it works and finds "this" of element
{
//    console.log("toggle mark...",this); //for getting "i" tag
   const icon = this;
   const id= this.getAttribute('note-id');
   noteOperations.toggleMark(id);
   const tr = icon.parentNode.parentNode; // icon ka "td" ka "tr" nikalo
//    tr.className = 'table-danger';
   tr.classList.toggle('table-danger');
   showCounts();
}
function edit()
{
   console.log("editing...");     
}

function  printNotes(notes)
{
    const tbody = document.querySelector('#notes');
    tbody.innerHTML = '';
    notes.forEach(note=>printNote(note));
    showCounts();
}
function printNote(noteObject){
    const tbody = document.querySelector('#notes');
    const row = tbody.insertRow();//<tr>
    for(let key in noteObject)
    {
        if(key == 'isMarked')
           {
            continue;
           }
        const td = row.insertCell();//<td>
        td.innerText = noteObject[key];
    }
    const td = row.insertCell(); // creating a new cell for trash pic
    td.appendChild(printIcon('trash',toggleMark,noteObject.id));// by default trash value is send
    td.appendChild(printIcon('user-pen',edit,noteObject.id));
}