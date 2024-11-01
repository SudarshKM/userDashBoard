// Load data from data.json
fetch('data.json')
    .then(res => res.json())
    .then(data => {
        const users = data.users;
        renderUsers(users);

        // Filter users by name
        const searchInput = document.getElementById('search');
        searchInput.addEventListener('input', () => {
            const searchValue = searchInput.value.toLowerCase();
            const filteredUsers = users.filter(user =>
                user.fullName.toLowerCase().includes(searchValue)
            );
            renderUsers(filteredUsers);
        });

        // Sort users by join date
        const sortButton = document.getElementById('sort-button');
        sortButton.addEventListener('click', () => {
            const sortedUsers = [...users].sort((a, b) =>
                new Date(a.joinDate) - new Date(b.joinDate)
            );
            renderUsers(sortedUsers);
        });
    });

function renderUsers(users) {
    const userGrid = document.getElementById('user-grid');
    userGrid.innerHTML = '';

    users.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        
        userCard.innerHTML = `
            <img src="./images/${user.profilePic}" alt="Profile Picture" class="profile-pic">
            <div class="user-info">
                <h3>${user.fullName}</h3>
                <p>${user.age} / ${user.gender}</p>
                <p>${user.occupation}</p>
                <p>${user.location}</p>
                <p class="description">${user.description}</p>
                <div class="traits">${user.traits.join(', ')}</div>
            </div>
        `;

        userGrid.appendChild(userCard);
    });
}
