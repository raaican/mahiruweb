const btn = document.getElementById("registerBtn")
const result = document.getElementById("result")

btn.onclick = async () => {
  const username = document.getElementById("username").value

  const res = await fetch("http://localhost:3000/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: username,
    }),
  })

  const data = await res.json()

  result.textContent = "User ID: " + data.id
}
