let APIData = null;
let UsersData = [];
let column_list = [];
const GenerateTable = async ()=>{
    var response = await fetch("data.json")
    var data = await response.json();

    if(document.getElementById("load_button").innerText === "Refresh data"){
        var Table = document.getElementById("table_tag");
        Table.innerHTML = "";
    }else{
        document.getElementById("load_button").innerHTML = "Refresh data";
    }
    APIData = data;
    loadTableData();
}
function loadTableData(){
    
    var table = document.getElementById("table_tag")
    var row = table.insertRow(0);
    column_list = Object.keys(APIData[0]);
    column_list.push("Edit")

    column_list.forEach((column)=>{
        let headerCell = document.createElement("th");
        headerCell.innerHTML = column;
        row.appendChild(headerCell);
        
    })

    for (var i = 0; i < APIData.length; i++) { 
        row = table.insertRow(i+1);
        var arr = [];
        column_list.forEach((column)=>{
            if(column ==="Edit"){
                var btn = document.createElement('input');
                btn.type = "button";
                btn.className = "btn";
                btn.value = "Edit";
                var cell = row.insertCell(-1)
                cell.appendChild(btn);
                btn.onclick = (function(entry) {selectedRowEdit(this);});

                var btn1 = document.createElement('input');
                btn1.type = "button";
                btn1.className = "btn1";
                btn1.value = "Delete";
                btn1.onclick = (function(entry) {selectedRowDelete(this)});

                cell.appendChild(btn1);
                return
            }
            var cell = row.insertCell(-1)
            var inputField = document.createElement('input');
            inputField.type = "text";
            inputField.value =APIData[i][column]
            inputField.disabled = true
            arr.push(APIData[i][column])
            cell.appendChild(inputField);
        })
        UsersData.push(arr);
    }

}; 

function selectedRowEdit(refer){
            for(var j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                refer.parentNode.parentNode.cells[j].childNodes[0].disabled = false
            }
            refer.parentNode.parentNode.cells[j].childNodes[0].value = "Save";
            var arrChanged = [...UsersData[refer.parentNode.parentNode.rowIndex-1]]

            refer.parentNode.parentNode.cells[j].childNodes[0].onclick=function(){
                for(var j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                    arrChanged[j] = refer.parentNode.parentNode.cells[j].childNodes[0].value
                    refer.parentNode.parentNode.cells[j].childNodes[0].disabled = true
                    
                }
                UsersData[refer.parentNode.parentNode.rowIndex-1] = arrChanged;
                for(var j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                    refer.parentNode.parentNode.cells[j].childNodes[0].value = UsersData[refer.parentNode.parentNode.rowIndex-1][j]                   
                }
                refer.parentNode.parentNode.cells[j].childNodes[1].value = "Delete";
                refer.parentNode.parentNode.cells[j].childNodes[1].onclick = (function(){selectedRowDelete(this)})
                refer.parentNode.parentNode.cells[j].childNodes[0].value = "Edit";
                refer.parentNode.parentNode.cells[j].childNodes[0].onclick = (function(){selectedRowEdit(this)})
            }
            refer.parentNode.parentNode.cells[j].childNodes[1].value = "Cancel";

            refer.parentNode.parentNode.cells[j].childNodes[1].onclick=function(){
                for(var j=0;j<refer.parentNode.parentNode.cells.length-1;j++){
                    refer.parentNode.parentNode.cells[j].childNodes[0].value = UsersData[refer.parentNode.parentNode.rowIndex-1][j]
                    refer.parentNode.parentNode.cells[j].childNodes[0].disabled = true

                }
                refer.parentNode.parentNode.cells[j].childNodes[1].value = "Delete";
                refer.parentNode.parentNode.cells[j].childNodes[1].onclick = (function(){selectedRowDelete(this)})
                refer.parentNode.parentNode.cells[j].childNodes[0].value = "Edit";
                refer.parentNode.parentNode.cells[j].childNodes[0].onclick = (function(){selectedRowEdit(this)})
            }
}
function selectedRowDelete(i){
    var rIndex,table = document.getElementById("table_tag");
            rIndex = i.parentNode.parentNode.rowIndex;
            table.deleteRow(rIndex)
            UsersData.splice(rIndex-1,1)

}
