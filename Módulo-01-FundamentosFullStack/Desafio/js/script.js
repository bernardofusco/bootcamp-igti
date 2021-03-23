const personFilter = document.getElementById('personFilter');
const busca = document.getElementById('busca');
let tabSearchedUsers = document.getElementById('tabSearchedUsers');
let search = [];
let usersArray = [];
let findedUsers = [];

async function start() {
  const resource = await fetch('http://localhost:3001/users');
  const users = await resource.json();
  usersArray = renderUsers(users);

  personFilter.addEventListener('keyup', () => {
    search = personFilter.value;
    console.log(search);
  });

  personFilter.addEventListener(
    'keypress',
    function (e) {
      if (e.which == 13) {
        findedUsers = usersArray.filter((pessoa) =>
          pessoa.name.toLowerCase().includes(search.toLowerCase())
        );
        render();
      }
    },
    false
  );

  busca.addEventListener('click', () => {
    findedUsers = usersArray.filter((pessoa) =>
      pessoa.name.toLowerCase().includes(search.toLowerCase())
    );
    render();
  });
}

function renderUsers(users) {
  const temp = users.map((person) => {
    return {
      name: person.name.first + ' ' + person.name.last,
      image: person.picture.thumbnail,
      age: person.dob.age,
      gender: person.gender,
    };
  });
  return temp;
}

function render() {
  searchedUsers();
  renderEstatistcs();
}

function searchedUsers() {
  let testeHTML = '<div>';
  findedUsers.forEach((person) => {
    const { name, image, age } = person;
    const personHTML = `
    <div>
      <div>
        <img src="${image}" alt="${name}">
      </div>
      <div>
        <ul>
          <li>${name}</li>
          <li>${age}</li>
        </ul>
      </div>
    </div>
    `;
    testeHTML += personHTML;
  });
  testeHTML += '</div>';
  tabSearchedUsers.innerHTML = testeHTML;
}

function renderEstatistcs() {
  let genderMasc = 0;
  let genderFem = 0;
  findedUsers.forEach((person) => {
    if (person.gender === 'male') genderMasc++;
    else if (person.gender === 'female') genderFem++;
  });
  console.log('Genders');
  console.log(genderMasc);
  console.log(genderFem);

  const totalAges = findedUsers.reduce((accumulator, current) => {
    return accumulator + current.age;
  }, 0);
  console.log(totalAges);
  const mediaIdades = totalAges / (genderMasc + genderFem);
  console.log(mediaIdades);
}

start();
