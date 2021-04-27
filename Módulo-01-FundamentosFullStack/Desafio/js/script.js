const personFilter = document.getElementById('personFilter');
const busca = document.getElementById('busca');
const form = document.querySelector('form');
const tabStatistics = document.getElementById('tabStatistics');
const tabSearchedUsers = document.getElementById('tabSearchedUsers');

let usersArray = [];
let filteredUsers = [];

const minInputSize = 1;
const enableBuscaClass = 'bg-green-500';

async function readUsersBackEnd() {
  const resource = await fetch('http://localhost:3001/users');
  const users = await resource.json();
  usersArray = users.map(({ login, name, dob, gender, picture }) => {
    const fullName = `${name.first} ${name.last}`;
    const searchName = fullName.toLocaleLowerCase();
    return {
      id: login.uuid,
      name: fullName,
      searchName,
      age: dob.age,
      gender: gender,
      picture: picture.medium,
    };
  });
  /*Usando spread para as duas variáveis não ocuparem o mesmo lugar na memória*/
  filteredUsers = [...usersArray];
}

function enableControls() {
  personFilter.disabled = false;
  personFilter.focus();
}

function enableEvents() {
  personFilter.addEventListener('input', ({ currentTarget }) => {
    const shouldEnable = currentTarget.value.length >= minInputSize;
    busca.disabled = !shouldEnable;

    if (shouldEnable) busca.classList.add(enableBuscaClass);
    else busca.classList.remove(enableBuscaClass);
  });
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const searchTerm = personFilter.value;
    doFilter(searchTerm);
  });
}

function doFilter(searchTerm) {
  const lowerSearchTerm = searchTerm.toLocaleLowerCase();

  filteredUsers = usersArray
    .filter((user) => user.searchName.includes(lowerSearchTerm))
    .sort((a, b) => a.name.localeCompare(b.name));

  render();
}

function renderStatistics() {
  if (filteredUsers.length === 0) {
    tabStatistics.textContent = 'Nada a ser exibido!';
    return;
  }

  //prettier-ignore
  const mascCont =
  filteredUsers.filter(({ gender }) => gender === 'male').length;

  //prettier-ignore
  const femaleCont =
  filteredUsers.filter(({ gender }) => gender === 'female').length;

  const totalAges = filteredUsers.reduce(
    (accumulator, { age }) => accumulator + age,
    0
  );

  const media = (totalAges / filteredUsers.length).toFixed(2).replace('.', ',');

  tabStatistics.innerHTML = `
    <h2 class="margin-auto text-center text-xl font-semibold mb-2">
      Estatísticas
    </h2>
    <ul>
      <li>Sexo Masculino: <strong>${mascCont}</strong></li>
      <li>Sexo Feminino: <strong>${femaleCont}</strong></li>
      <li>Soma das idades: <strong>${totalAges}</strong></li>
      <li>Média das idades: <strong>${media}</strong></li>
    </ul>
  `;
}

function renderUsers() {
  if (filteredUsers.length === 0) {
    tabSearchedUsers.textContent = 'Nenhum usuário encontrado!';
    return;
  }

  tabSearchedUsers.innerHTML = `
    <h2 class="margin-auto text-center text-xl font-semibold mb-2">
      ${filteredUsers.length} usuários encontrado(s)
    </h2>

    <ul>
      ${filteredUsers
        .map((user) => {
          return `
          <li class="flex flex-row items-center mb-2 space-x-4">
            <img class="rounded-full" src="${user.picture}" alt="${user.name} title="${user.name}" />
            <span> ${user.name}, ${user.age} anos</span>
          </li>
        `;
        })
        .join('')}
    </ul>
  `;
}

function render() {
  renderStatistics();
  renderUsers();
}

async function start() {
  await readUsersBackEnd();
  enableControls();
  enableEvents();
}

start();
