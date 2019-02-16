var request;
var open;
var store;
var result;
var tx;
var indexedDB=window.indexedDB || window.webkitIndexedDB || window.mozIndexedDB || window.msIndexedDB;
  request=indexedDB.open("mydatabase",1);
  // onerror
  request.onerror=function(e){
    console.log("error"+e);
  }
// onupgradeneeded
request.onupgradeneeded=function(e){
result=e.target.result;
store=result.createObjectStore("resume",{keyPath:"name"});
}
//onsuccess
request.onsuccess=function(e){
result=e.target.result;
function getdata(callback) {
  tx=result.transaction("resume",IDBTransaction.READ_ONLY);
  store=tx.objectStore("resume");
  data=[];
  tx.oncomplete=function(e){
    callback(result);
    console.log(result);
  }
  var cursor=store.openCursor();
  // onerror
  cursor.onerror=function(e){
    console.log("error",+e);
  }
  // onsuccess
  cursor.onsuccess=function(e){
    var dn=e.target.result;
    if(dn){
      data.push(dn.value);
      dn.continue();
    }
  }
}
var parent=document.querySelector(".parent");
 getdata(function(d){
  for(var i in data){
    var child=document.createElement("div");
    child.classList.add("child");
    parent.appendChild(child);

    var image=document.createElement("img");
    image.src="images/plus.svg";
    image.alt=data[i].name;
    child.appendChild(image);

    var name=document.createElement("h1");
    name.textContent=data[i].name;
    child.appendChild(name);

    var button=document.createElement("a");
    button.textContent="view profile";
    button.href="resume.html?name="+data[i].name;
    child.appendChild(button);
  }

})
}
