async function start() {
  const resource = await fetch('http://localhost:3001/users');
  const users = await resource.json();
  renderUsers(users);
}

function renderUsers(users) {
  console.log(users);
}

start();
