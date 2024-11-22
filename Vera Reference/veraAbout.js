// Sheet data
// let sheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQgX8JsunBo1VTkO6vhueqN_xnQ5u7yOw9a4l0T4seUj88PH-KjMqEab_JwnA-00G3myQcl90w6lvA_/pub?output=csv"
let sheet = "https://docs.google.com/spreadsheets/d/e/2PACX-1vQgX8JsunBo1VTkO6vhueqN_xnQ5u7yOw9a4l0T4seUj88PH-KjMqEab_JwnA-00G3myQcl90w6lvA_/pubhtml"
let htmlString = ""
let data;


// Row info

fetch(sheet)
  .then(response => response.text())
  .then(html => {
    const parser = new DOMParser();
    htmlString = parser.parseFromString(html, 'text/html');
    data = parseHTMLTable(htmlString);
    if(data.length > 0){
      console.log("CV loaded :-)")
      data.reverse()
      document.querySelector('.loading-icon').classList.remove('loading-icon')
      appendContent()
    }
    // const links = doc.querySelectorAll('a'); // Selects all <a> tags

    // links.forEach(link => {
    //   console.log('Text:', link.textContent); // Text of the link
    //   console.log('Href:', link.href); // URL of the link
    // });
  })
  .catch(error => {
    console.error('Lol I cannot load CV because: ', error);
  });



  function parseHTMLTable(htmlString) {
      // const parser = new DOMParser();
      // const doc = parser.parseFromString(htmlString, 'text/html');
      const table = htmlString.querySelector('table'); // Assuming there's only one table
      const rows = table.querySelectorAll('tr');
      let tableData = [];

      rows.forEach(row => {
          const cells = row.querySelectorAll('td');
          let rowData = [];
          cells.forEach(cell => {
          		let cellMerge = cell.querySelector(".softmerge-inner")
          		let cellContent = cell.innerHTML.replaceAll("\"", "'")

              if(cellMerge != undefined) {
          			cellContent = cellMerge.innerHTML
          		}

          		rowData.push(cellContent.trim())
              // rowData.push(cell.innerText.trim());
          });
          if (rowData.length > 0) {
              tableData.push(rowData);
          }
      });

      return tableData;
  }


let showAll =  true

function appendContent() {
  const year = 0
  const category = 1
  const title = 2
  const event = 3
  const venue = 4
  const city = 5
  const country = 6
  const online = 7
  const collab = 8
  const organ = 9
  const selected = 13


  for(let i = 0; i < data.length; i++) {
    let row = data[i]
    let entry = document.createElement('div')
    entry.classList.add('entry')
    if(row[selected].indexOf('#checked') >= 0) {
      entry.classList.add('highlight')
    } else {
      entry.classList.add('normal')
      entry.classList.add('hidden')

    }
    entry.setAttribute('year', row[year])
      // Year
      let yearSpan = document.createElement('span')
      yearSpan.classList.add('time')
      yearSpan.innerHTML = row[year]
      entry.append(yearSpan)

      let descSpan = document.createElement('span')
      descSpan.classList.add('desc')

      // Title
      if(row[title].length > 0 ) {
        let desc = document.createElement('em')
        desc.innerHTML = row[title]
        descSpan.append(desc)
      }
   
      // Event area
      if(row[event].length > 0 ) {
        ( descSpan.innerHTML.length > 0 ) ? descSpan.innerHTML += ", " : "";
        let desc = document.createElement('p')
        desc.innerHTML = row[event]
        if(row[venue].length > 0 ) {
          ( desc.innerHTML.length > 0 ) ? desc.innerHTML += ", " : "";
          desc.innerHTML += row[venue]
        }
        descSpan.append(desc)
      } else if (row[venue].length > 0 ) {
        ( descSpan.innerHTML.length > 0 ) ? descSpan.innerHTML += ", " : "";
        let desc = document.createElement('p')
        desc.innerHTML = row[venue]
        descSpan.append(desc)
      }
        
      // City, Country
      (row[city].length > 0 ) ?  descSpan.innerHTML += ", " + row[city] + " " + row[country]  : ", " + row[country];
      
      if(row[online].indexOf("#checked") >= 0) {
        descSpan.innerHTML += " (online)"
      } 

      // ICW
      (row[collab].length > 0 ) ?  descSpan.innerHTML += ". With " + row[collab] + "" : "";
      
      // Organised by
      (row[organ].length > 0 ) ?  descSpan.innerHTML += ". Organised by " + row[organ]  + "" : "";
      
      entry.append(descSpan)

    
    let parent 
    let cat = row[category] 

    switch(row[category]) {
    case "Talk":
      parent = document.querySelector('#talks')
      parent.append(entry)
      break;
    case "Workshop":
      parent = document.querySelector('#workshops')
      parent.append(entry)
      break;
    case "Exhibition":
      parent = document.querySelector('#exhibitions')
      parent.append(entry)
      break;
    case "Award":
      parent = document.querySelector('#awards')
      parent.append(entry)
      break;
    case "Interview":
      parent = document.querySelector('#features')
      parent.append(entry)
      break;
    case "Education":
      parent = document.querySelector('#education')
      parent.append(entry)
      break;
    case "Upcoming":
      parent = document.querySelector('#upcoming')
      parent.append(entry)
      break;
    default: 
        break;
    }
  }
}


function printCV(e) {
  // e.preventDefault()
  window.print();  
}

function toggleCV() {
  console.log('toggle')
  let normals = document.querySelectorAll('.normal')
  for(let i = 0; i < normals.length; i++ ) {
    if(normals[i].classList.contains('hidden')) {
      document.querySelector("#highlight-label").innerHTML = "Everything"
      normals[i].classList.remove('hidden')
    } else {
      document.querySelector("#highlight-label").innerHTML = "Selection"

      normals[i].classList.add('hidden')
    }
  }
}