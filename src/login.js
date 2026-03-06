document.querySelector("#login-btn").addEventListener("click", async () => {

  console.log("login clicked")

  const username = document.querySelector("#username").value
  const id = document.querySelector("#userid").value

  const res = await fetch("http://localhost:3000/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      username,
      id
    })
  })

  const data = await res.json()

  console.log(data)

  const result = document.querySelector("#login-result")

  if (data.success) {
    result.innerHTML = `
      <div class="success-box">
        You are registered
      </div>
    `
  } else {
    result.innerHTML = `
      <div class="error-box">
        Invalid username or id
      </div>
    `
  }

})
