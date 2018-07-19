const read = require('readline-sync');
const fs = require('fs');

let allBooks = [];
let allAuthors = [];

//this two vars are needed for remembering the last book id of the last added book 
let checkAllBooks = readFile('books.json');
let bookId = checkAllBooks.length + 1;


//Saving data into JSON file
function saveData (data, filePath) {
    let str = JSON.stringify(data);
    fs.writeFileSync(filePath, str);
};
//Reading data from JSON file
function readFile (filePath) {
    let str = fs.readFileSync(filePath).toString();
    return JSON.parse(str);
}
// On the Home screen
function mainMenu(){
    while(true){
        console.log('\nLibrary\n\t1: List all\n\t2: Search\n\t3: Add\n\t4: Rate\n\t5: Clear\n\t6: Reload');
        let chosenValue = read.question();
        let isValidValue = false;
            
        switch(chosenValue){
            case '1':
            case 'List all':
                inListAll();
                isValidValue = true;
                break;
            case '2':
            case 'Search':
                inSearch();
                isValidValue = true;
                break; 
            case '3':
            case 'Add':
                inAdd();
                isValidValue = true;
                break; 
            case '4':
            case 'Rate':
                inRate();
                isValidValue = true;
                break;
            case '5':
            case 'Clear':
                inClear();
                isValidValue = true;
                break;
            case '6':
            case 'Reload':
                inReload();
                isValidValue = true;
                break;
        }
        
        if(chosenValue === 'quit' || isValidValue){
            break;
        } else {
            console.log('\n\nPlease make a correct choice!!\n\n');
        }
    }
}
// when user is in List All option
function inListAll(){
    // this variables are used for string numbering for authors/ for books we're using 'BookId' variable
    let authorOrder = 1; 
    
    let author;
    let book;
    let listAuthors = readFile('authors.json');
    let listBooks = readFile('books.json');
    if(listAuthors){
        allAuthors = listAuthors;
    }
    if(listBooks){
        allBooks = listBooks;
    }
    console.log('\nAuthors:');
    for(let i = 0; i < allAuthors.length; i++){
        author = authorOrder++ + '. ' + allAuthors[i].name + '(' + allAuthors[i].language + '). ' + allAuthors[i].genre;
        console.log('\t' + author); 
    }
    console.log('\nBooks:');
    for(let i = 0; i < allBooks.length; i++){
        book = allBooks[i].id + '. ' + allBooks[i].title + '(' + allBooks[i].author + '). Rating: ' + allBooks[i].rate;
        console.log('\t' + book); 
    }
    mainMenu();
}
//when user is in Add option
function inAdd(){
    while(true){
        console.log('\nAdd entity\n\t1: Author\n\t2: Book\n\t3: Back');
        let chosenValue = read.question();
        
        if(chosenValue === 'quit'){
            break;
        }    
        if(chosenValue === 'Author' || chosenValue === '1'){
            addAuthor();
            
        } else if(chosenValue === 'Book' || chosenValue === '2'){
            addBook();
            
        } else if(chosenValue === 'Back' || chosenValue === '3'){
            mainMenu();     
        } else {
            console.log('\n\nPlease choose a valid option!!\n\n')
        }    
    }
}
// Adding new author
function addAuthor(){
    let tempAuthor = {};
    let listAuthors = readFile('authors.json');
    
    if(listAuthors){
        allAuthors = listAuthors;
    }
    console.log('Adding new author.\nName:');
    let addedName = read.question();
    while(true){
        if(addedName !== ''){
            tempAuthor.name = addedName;

            break;
        } else {
            console.log('Author name caccont be blank!');
        }
    }
    console.log('Language: ');
    let addedLang = read.question();
    while(true){
        if(addedLang !== ''){
            tempAuthor.language = addedLang;
            break;
        }else{
            console.log('Language cannot be blank!!')
        }
    }
    console.log('Genre: ');
    let addedGenre = read.question();
    while(true){
        if(addedGenre !== ''){
            tempAuthor.genre = addedGenre;
            break;
        }else{
            console.log('Genre cannot be blank!')
        }
    }
        
    allAuthors.push(tempAuthor);
    saveData(allAuthors, 'authors.json');
    inAdd();
} 

//adding new book
function addBook(){
    let tempBook = {};
    let listBooks = readFile('books.json');
     
    if(listBooks){
        allBooks = listBooks;
    }
    //if there are no books in the library, the id of a new book starts from 1
    if(allBooks.length === 0){
        bookId = 1;
    }
    let listAuthors = readFile('authors.json');
    console.log('Adding new book.\nChoose an author');
    
    //using this loop we're checking if the entered author name exists in the library
    //if yes, we're adding an 'author' and 'genre' to the book
    addBookFlag: while(true){
        let chooseAuthor = read.question();
        for(let i = 0; i < listAuthors.length; i++){
            if(listAuthors[i].name === chooseAuthor){
                tempBook.author = listAuthors[i].name;
                tempBook.genre = listAuthors[i].genre;
                break addBookFlag;
            }
        }
        console.log('enter an available author name!!');
    }
    
    console.log('Enter a title: ');
    let addedTitle = read.question();
    while(true){
        if(addedTitle !== ''){
            tempBook.title = addedTitle;
            tempBook.rate = 0; // default rating for a newly added book
            tempBook.id = bookId++;
            break;
        }else{
            console.log('title cannot be blank');
        }
    }
    allBooks.push(tempBook);
    saveData(allBooks, 'books.json');
}

//in Search option
function inSearch(){
    while(true){   
        console.log('\nSearch\n\t1: By title\n\t2: By author\n\t3: By genre\n\t4: By rating\n\t5: Back');
        let chosenValue = read.question();
        let isValidValue = false;
    
        switch(chosenValue){
            case '1':
            case 'By title':
                srcByTitle();
                isValidValue = true;
                break;
            case '2':
            case 'By author':
                srcByAuthor();
                isValidValue = true;
                break; 
            case '3':
            case 'By genre':
                srcByGenre();
                isValidValue = true;
                break; 
            case '4':
            case 'By rating':
                srcByRating();
                isValidValue = true;
                break;
            case '5':
            case 'Back':
                mainMenu();
                break;
            }                                                              
        
        if(chosenValue === 'quit'){
            break;
        } else if (isValidValue === false){
            console.log('\n\nPlease choose a defined search criteria!!\n\n');
        } 
    }

    function srcByTitle(){
        let allBooks = readFile('books.json');
        let order = 0;
        console.log('Title: ');
        let searchValue = read.question();
        
        for(let i = 0; i < allBooks.length; i++){
            if(searchValue === allBooks[i].title){
                console.log('\n\t'+ ++order+'. '+allBooks[i].title+'('+ allBooks[i].author+
                '). Genre:'+allBooks[i].genre+'. Rating: '+allBooks[i].rate);
            }
        }
        inSearch();      
    }

    function srcByAuthor(){
        let allBooks = readFile('books.json');
        let order = 0;
        console.log('Author: ');
        let searchValue = read.question();
        for(let i = 0; i < allBooks.length; i++){
            if(searchValue === allBooks[i].author){
                console.log('\n\t'+ ++order+'. '+allBooks[i].title+'('+ allBooks[i].author+
                '). Genre:'+allBooks[i].genre+'. Rating: '+allBooks[i].rate);
            }
        }
        inSearch();
    }

    function srcByGenre(){
        let allBooks = readFile('books.json');
        let order = 0;
        console.log('Genre: ');
        let searchValue = read.question();
        for(let i = 0; i < allBooks.length; i++){
            if(searchValue === allBooks[i].genre){
                console.log('\n\t'+ ++order+'. '+allBooks[i].title+'('+ allBooks[i].author+
                '). Genre:'+allBooks[i].genre+'. Rating: '+allBooks[i].rate);
            }
        }
        inSearch();
    }

    function srcByRating(){
        let allBooks = readFile('books.json');
        console.log('\nRating search\n\t1: Less\n\t2: Greater\n\t3: Back\n');
        let chooseRateSearchOption = read.question();
        switch (chooseRateSearchOption){
            case '1':
            case 'Less':
                srcByRatingLess();
                break;
            case '2':
            case 'Greater':
                srcByRatingGreater();
                break;
            case '3':
            case 'Back':
                inSearch();
            default:
                console.log('choose rating search condition')
        }
        function srcByRatingLess(){
            let order = 0;
            console.log('Less than:');
            let searchValue = read.question();
            for(let i = 0; i < allBooks.length; i++){
                if(searchValue > allBooks[i].rate){
                    console.log('\n\t'+ ++order+'. '+allBooks[i].title+'('+ allBooks[i].author+
                    '). Genre:'+allBooks[i].genre+'. Rating: '+allBooks[i].rate);
                }
            }
        }
        function srcByRatingGreater(){
            let order = 0;
            console.log('Greater than:');
            let searchValue = read.question();
            for(let i = 0; i < allBooks.length; i++){
                if(searchValue < allBooks[i].rate){
                    console.log('\n\t'+ ++order+'. '+allBooks[i].title+'('+ allBooks[i].author+
                    '). Genre:'+allBooks[i].genre+'. Rating: '+allBooks[i].rate);
                }
            }
        }
        inSearch();
    }
}
//when user wants to rate a book
function inRate(){
    let listBooks = readFile('books.json');
    if(listBooks){
        allBooks = listBooks;
    } 
    if (allBooks.length === 0) {        
        console.log('There is no book. Please add at least one!');
        mainMenu();
    }    
    console.log('Book ID:');
    let enterBookId = read.question();
    for(let i = 0; i < allBooks.length; i++){
        if(enterBookId == allBooks[i].id){
            allBooks[i].rate += 1;
            console.log(`The book with id = ${enterBookId} has been rated!`);
            break;
        }
    }
    saveData(allBooks, 'books.json');
    mainMenu();
}
//when user choose Clear on the home screen
function inClear(){
    allAuthors = [];
    saveData(allAuthors, 'authors.json');
    allBooks = [];
    saveData(allBooks, 'books.json');
    console.log('Library is empty now');
    mainMenu();
}
//when user selects Reload 
function inReload(){
    process.stdout.write('\x1B[2J\x1B[0f\u001b[0;0H');
    mainMenu();
}
mainMenu();