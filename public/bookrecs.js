const btn = document.getElementById("btn")

btn.addEventListener('click', getResponse)

async function getResponse() {
    var inputText = document.getElementById("input").value
    const parentDiv = document.getElementById("chat-area")

    // The remaining code goes inside this function
    if (inputText === '') { return }
    const question = document.createElement('div')
    question.innerHTML = inputText
    question.classList.add("box")
    parentDiv.appendChild(question)

    document.getElementById("input").value = ''
    let res = await fetch('/bookrecs', 
  {
    method: 'POST',
    headers: {
      "Content-Type": 'application/json'                
    },
    body: JSON.stringify({
      question: inputText          
    })
  }
)
    
const data = await res.json()     

if(data.message) {
    const answer = document.createElement('div')
    answer.innerHTML = data.message
    answer.classList.add("box", "answer")
    parentDiv.appendChild(answer)
  }
}