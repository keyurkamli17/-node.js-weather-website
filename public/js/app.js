const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const msg1 = document.querySelector('#m1')
const msg2 = document.querySelector('#m2')

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value
    msg1.textContent = 'Loading...'

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                msg1.textContent = data.error
            } else {
                msg1.textContent = data.location
                msg2.textContent = data.forecast
            }
        })
    })
})
