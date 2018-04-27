// JavaScript Document
	

var charList = [{ name: "Bob", baseInit: 5, initRoll: 0, fullInit: 0 },
				 { name: "Sue", baseInit: 2, initRoll: 0, fullInit: 0 },
				 { name: "Jim", baseInit: 3, initRoll: 0, fullInit: 0 }];


function initialize()
{
    "use strict";
    // Load data from JSON
}

function defaultToolFunc(tName)
{
    if(tName == "Initiative")
    {
        writeCharacters();
        return;
    }
}


function openTool(evt, toolName) {
	"use strict";
	
    // Declare all variables
    var i, tabcontent, tablinks;

    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
        tabcontent[i].style.display = "none";
    }

    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
        tablinks[i].className = tablinks[i].className.replace(" active", "");
    }

    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(toolName).style.display = "block";
    evt.currentTarget.className += " active";

    // Run the default function for the tool
    defaultToolFunc(toolName);
}

function Delete(index)
{
	"use strict";
    charList.splice(index, 1);
    writeCharacters();
}

function CalcInit()
{
    for (i = 0; i < charList.length; i++)
    {
        charList[i].fullInit = charList[i].baseInit + charList[i].initRoll;
    }
    writeCharacters();
}

function AddCharInit()
{
	"use strict";
    var cname, initial, newChar;

    cname = document.getElementById("CharNameInit").value;
    initial = parseInt(document.getElementById("CharInitVal").value);
    if (!Number.isInteger(initial))
    {
        alert("Error: Please enter an integer for the initiative.");
        document.getElementById("CharInitVal").value = 0;
        return;
    }
    newChar = { name:cname, baseInit:initial, initRoll:0, fullInit:0};

    charList.push(newChar);
    writeCharacters();
}

function SaveCharList()
{
	"use strict";
	var json = JSON.stringify(charList);
	download(json, "InitiativeList.json", "application/json");
}



function writeCharacters() {
	"use strict";
	var outputString = "";

    outputString += "<table width=\"100%\">";

    outputString += "<tr>";
    outputString += "<td width=\"10%\"> Character Name </td>";
    outputString += "<td width=\"7%\" align=\"center\"> Base Init</td > ";
    outputString += "<td width=\"7%\" align=\"center\"> Rolled Init</td>";
    outputString += "<td width=\"7%\" align=\"center\"> Final Init</td>";
    outputString += "<td> Delete Entry</td>";
    outputString += "</tr>";


    for (var i = 0; i < charList.length; i++) {
        outputString += "<tr>";
        outputString += "<td width=\"10%\">" + charList[i].name + "</td>";
        outputString += "<td align=\"center\">" + charList[i].baseInit + "</td > ";
        outputString += "<td align=\"center\">" + "<textarea rows=\"1\" cols=\"4\">" + charList[i].initRoll + "</textarea>" + "</td>";
        outputString += "<td align=\"center\">" + charList[i].fullInit + "</td > ";
        outputString += "<td>" + "<button name=\"" + charList[i].name + "Delete\" onclick=\"Delete(" + i + ")\">X</button>" + "</td>";
        outputString += "</tr>";
    }
    outputString += "</table>";
    document.getElementById("CharacterList").innerHTML = outputString;
}