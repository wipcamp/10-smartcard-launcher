require('dotenv').config()

const { Reader } = require('thaismartcardreader.js')

const io = require('socket.io').listen(process.env.SOCKER_PORT || 3002)
const myReader = new Reader()

console.log('--------------------------------------------------')
console.log('Welcome for WIP Camp #10 Thai Smartcard Launcher!')
console.log('--------------------------------------------------')
console.log('- Please Check by Insert ID Card and See Result on Browser -')
console.log('--------------------------------------------------')

myReader.on('device-activated', async (event) => {
  console.log('device-activated')
  console.log(event)
})

myReader.on('error', async (err) => {
  console.log(err)
})

myReader.on('card-inserted', async person => {
  const cid = await person.getCid()
  console.log(`CitizenID: ${cid}`)
  io.emit(`personIdClient`, cid)
})

myReader.on('device-deactivated', () => { console.log('device-deactivated') })