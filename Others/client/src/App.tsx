const testFetch = () => {
  fetch('http://localhost:3000/test/cors')
    .then((res) => res.text())
    .then((data) => {
      console.log(data)
    })
}
const testFetch2 = () => {
  fetch('http://localhost:3000/test/cors2')
    .then((res) => res.text())
    .then((data) => {
      console.log(data)
    })
}
const testFetch3 = () => {
  fetch('http://localhost:3000/test/cors3', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: 'test',
    }),
  })
    .then((res) => res.text())
    .then((data) => {
      console.log(data)
    })
}
function App() {

  return (
    <>
      <div>
        <h1> test request</h1>
        <button
          onClick={() => {
            testFetch()
          }}
        >Fetch</button>
        <button
          onClick={() => {
            testFetch2()
          }}
        >Fetch</button>
        <button
          onClick={() => {
            testFetch3()
          }}
        >Fetch</button>
      </div>
    </>
  )
}

export default App
