require('dotenv').config()

const stdin = process.openStdin()
const { Reader } = require('thaismartcardreader.js')

const io = require('socket.io').listen(process.env.SOCKER_PORT || 3002)
const myReader = new Reader()

let userId = ''

console.log('Welcome for WIP Camp #10 Thai Smartcard Launcher!')
console.log('- Please Enter Your WIP ID for Start Program. -')
stdin.addListener('data', function(data) {
    wipId = data.toString().trim()
    console.log("Your WIP ID is " +  wipId)
    console.log('Ready for Read Thai Smart Card !')
})

myReader.on('device-activated', async (event) => {
  console.log('device-activated')
  console.log(event)
})

myReader.on('error', async (err) => {
  console.log(err)
})

myReader.on('card-readed', async card => {
  console.log(card.cid)
  socket.emit('personIdServer', {
    personId: card.cid,
    userId: wipId
  })
})

myReader.on('device-deactivated', () => { console.log('device-deactivated') })