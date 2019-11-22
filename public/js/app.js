console.log('client side java script file...')



const weatherForm = document.querySelector('form')
const mSearchInput = document.querySelector('input')
const mMessageOne = document.querySelector('#message-1')
const mMessageTwo = document.querySelector('#message-2')


weatherForm.addEventListener('submit', (e) => {

    e.preventDefault()
    fetchLocation(mSearchInput.value)
  
})

function fetchLocation(mLocation){
    mMessageOne.textContent = 'Loading...'
    mMessageTwo.textContent = ''
    fetch('http://localhost:3000/weather?address=' + mLocation ).then((response) => {
        response.json().then((data) => {
            if(data.error){
               return mMessageOne.textContent = data.error
            }
            mMessageOne.textContent = data.location
            mMessageTwo.textContent = data.forecast
    
        })
    })
}

