
const users = [
  {
    name: "Francisco",
    lastname: "Noriega",
    email: "frannoriega.92@gmail.com",
    dni: 36248745,
    group_id: 1,
    admin: true
  }
]

async function getUser(id: number) {
  return users[0]
}

export { getUser }
