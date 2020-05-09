let url = "http://localhost:3000/";

window.onload = () => {
    loadUsersTable();
    // addUsers();
}

async function loadUsersTable() {
    try {
        await fetch(url)
            .then(res => res.json())
            .then(users => {
                let str = "";
                for (const user of users) {
                    str += `
                        <tr>
                            <td>${user.id_user}</td>
                            <td>${user.name}</td>
                            <td>${user.email}</td>
                            <td>${user.photo}</td>
                            <td>${user.id_user_type}</td>
                            <td>${user.block}</td>
                            <td>${user.username}</td>
                            <td>${user.location}</td>
                            <td>${user.password}</td>
                            <td>${user.birth}</td>
                        </tr>
                    `
                }
                document.querySelector("#usersTable").innerHTML = str;
            });
    } catch (err) {
        console.log(err);
    }
}

// async function addUsers() {
//     let form = document.querySelector("#form");
//     form.addEventListener("submit", async e => {
//         try {
//             fetch(url)
//                 .then(res => res.json())
//                 .then(users => console.log(users))
//         } catch (err) {
//             console.log(err);
//         }
//     })
// }