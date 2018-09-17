let registerBtn = document.querySelector('#registerBtn');

registerBtn.addEventListener('click', function(){
    console.log('register clicked');
   
});
registerBtn.addEventListener('click', function(){
    let temp = {
        lastname: "Sheva",
        firstname: "Andr",
        team: "Milan"
    }
    
    fetch('/players.json')
    .then(data=>data.json())
    .then(function(data){
        console.log(data);
        data["players"].push(temp);
        JSON.stringify(data);
        console.log(data);
    });
})