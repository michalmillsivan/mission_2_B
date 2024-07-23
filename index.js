//hello to who is reading this!
//I like to write notes so I can explain myself what df im doing, feel free to ignore all green :)

const usersPerPage = 40; //Start by setting the number of users to load initially.
const loadMoreUsers = 10; //next the number of users to load each time the user scrolls to the bottom of the page.
let isLoading = false; // someone on the internet said that a flag will prevent multiple simultaneous loading of users. so everything on the internet is true.
let favorites = []; //Initializes an empty array to store the emails of favorite users. fingers crossed it is unique!
let userCount = 0; // Initializes a counter for the number of users loaded.


async function init() {
    resetFavorites(); //Resets the favorites list and updates the counter when the page is loaded.

    loadUsersApi(usersPerPage)//Loads the initial set of users from the API.

    //load 10 more users bu howwwwww???? i got ittt window height! thank you god of internet <3.
    window.addEventListener('scroll', () => {
        const scrollTop = window.scrollY || document.documentElement.scrollTop; // Get the scroll position of the window
        const windowHeight = window.innerHeight || document.documentElement.clientHeight; // Get the height of the window viewport
        const documentHeight = document.documentElement.scrollHeight || document.body.scrollHeight; // Get the total height of the document

        if (scrollTop + windowHeight >= documentHeight - 100 && !isLoading) {// Check if the user has scrolled close to the bottom of the page
            isLoading = true; // Set the loading flag to true.
            loadUsersApi(loadMoreUsers); // Load additional users.
        } //omg it workssss yay mee!! now the fav button:)
    });

    //sorttttttttttttttttt!!!
    $("#user-list").sortable({ //Makes the user list sortable using jQuery UI.
        update: function (event, ui) { //Saves the new order of users whenever the list is reordered.
            saveUsersOrder();
        }
    }).disableSelection(); //This method is chained to the sortable initialization to prevent text selection within the #user-list element.

    updateFavoritesCounter(); //Updates the favorites counter display.


}

async function loadUsersApi(count) { //fetchhhhh.
    const result = await fetch(`https://randomuser.me/api/?results=${count}`)
    const data = await result.json()
    console.log(data.results)
    data.results.forEach(user => drawUser(user)); //Iterates over the user data and adds a card for each user.
    isLoading = false; //Resets the loading flag.
    return data.results
}

function drawUser(user) {
    //Defines a function to create a user card.
    //Creates an HTML template string for the user card:
    const cardHtml = `
    <div class="col-md-4">
      <div class="card" data-email="${user.email}">
        <img src="${user.picture.large}" class="card-img-top" alt="${user.name.first} ${user.name.last}">
        <div class="card-body">
          <h5 class="card-title">${user.name.first} ${user.name.last}</h5>
          <p class="card-text">${user.gender}</p>
          <p class="card-text">${user.dob.age}</p>
          <p class="card-text">${user.email}</p>
          <button class="btn btn-light favorite-btn" onclick="toggleFavorite('${user.email}')">🤍</button>
        </div>
      </div>
    </div>
  `;
    $('#user-list').append(cardHtml); //Appends the user card to the user list.
}

function toggleFavorite(email) {
    const userCard = document.querySelector(`[data-email='${email}']`); // Select the user card by email

    if (!userCard) {
        console.error('User card not found');
        return;
    }

    const favoriteBtn = userCard.querySelector('.favorite-btn'); // Find the favorite button within the user card

    if (isFavorite(email)) {
        favorites = favorites.filter(favEmail => favEmail !== email); // Remove the user from the favorites array if they are already a favorite
        console.log(favorites);
        favoriteBtn.textContent = '🤍'; // Change the button text to unselected heart
    } else {
        favorites.push(email); // Add the user to the favorites array
        console.log(favorites);
        favoriteBtn.textContent = '🩷'; // Change the button text to selected heart
    }

    updateFavoritesCounter();// Update the favorites counter
}

function isFavorite(email) {
    return favorites.includes(email); //Checks if a user is in the favorites array.
}

function updateFavoritesCounter() {
    const counterElement = document.querySelector("#favorites-counter"); // Select the element with the ID 'favorites-counter'
    counterElement.textContent = favorites.length; // Update the text content of the element to reflect the number of favorites
}

function saveUsersOrder() {
    const orderedUsers = [];
    const cards = document.querySelectorAll('#user-list .card'); // Select all user cards

    cards.forEach(card => {   // Iterate over each card and extract the email
        const email = card.getAttribute('data-email');
        orderedUsers.push(email);
    });

    localStorage.setItem('orderedUsers', JSON.stringify(orderedUsers));  // Save the ordered user emails to localStorage
}


//hello if anyone see this! in the paperwork you should save the data after refreshing the page but! the users are allways new,
//so if you select a favorite and refresh the page then you could never unselect him! in my opinion you need to reset or save the favorites somwhere..
function resetFavorites() {
    favorites = [];
    localStorage.removeItem('favorites');
    updateFavoritesCounter();
}


///ahahahhah it workkssss!!! but now for the worst part, sorttttt!!! but howw???? to the jquery documentation!!!
//should i maybe apload to git before i ruin everything? yap.
//ok did this now i am lost..
//lets color everything pink !
// ok stop
init()