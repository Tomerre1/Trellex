import { storageService } from './async-storage.service'
// import { httpService } from './http.service'
// import { socketService, SOCKET_EVENT_USER_UPDATED } from './socket.service'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'
const DB_KEY = 'user'
var gWatchedUser = null;

export const userService = {
    login,
    logout,
    signup,
    getLoggedinUser,
    getUsers,
    getById,
    remove,
    update,
    changeScore
}

window.userService = userService

const gUsers = [
    {
        "_id": 'u101',
        "fullname": 'BCD',
        "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
        "username": 'bcd',
        "password": '1'
    },
    {
        "_id": 'u102',
        "fullname": 'Tomer',
        "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg',
        "username": 'tomer',
        "password": '1'
    },
    {
        "_id": 'u103',
        "fullname": 'Matan',
        "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew',
        "username": 'matan',
        "password": '1'
    },
]
async function getUsers() {
    const users = localStorage.getItem(DB_KEY)
    if(!users) await signUpUsers()
    return JSON.parse(localStorage.getItem(DB_KEY))
    // return httpService.get(`user`)
}

async function getById(userId) {
    const user = await storageService.get(DB_KEY, userId)
    // const user = await httpService.get(`user/${userId}`)
    gWatchedUser = user;
    return user;
}
function remove(userId) {
    return storageService.remove(DB_KEY, userId)
    // return httpService.delete(`user/${userId}`)
}

async function update(user) {
    await storageService.put(DB_KEY, user)
    // user = await httpService.put(`user/${user._id}`, user)
    // Handle case in which admin updates other user's details
    if (getLoggedinUser()._id === user._id) _saveLocalUser(user)
    return user;
}

async function login(userCred) {
    const users = await storageService.query(DB_KEY)
    const user = users.find(user => user.username === userCred.username && user.password === userCred.password)
    return _saveLocalUser(user)

    // const user = await httpService.post('auth/login', userCred)
    // socketService.emit('set-user-socket', user._id);
    // if (user) return _saveLocalUser(user)
}
async function signup(userCred) {
    const user = await storageService.post(DB_KEY, userCred)
    // const user = await httpService.post('auth/signup', userCred)
    // socketService.emit('set-user-socket', user._id);
    return _saveLocalUser(user)
}
async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    // socketService.emit('unset-user-socket');
    // return await httpService.post('auth/logout')
}

async function changeScore(by) {
    const user = getLoggedinUser()
    if (!user) throw new Error('Not loggedin')
    user.score = user.score + by || by
    await update(user)
    return user.score
}


function _saveLocalUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER) || 'null')
}


async function signUpUsers(){
    await userService.signup({
        "fullname": 'BCD',
        "imgUrl": 'https://media-exp1.licdn.com/dms/image/C5603AQG9slGN5Fgxug/profile-displayphoto-shrink_100_100/0/1516840011642?e=1638403200&v=beta&t=wl9AzbWc9FwsXJ0xGECA_7T4xynvi067vuYs5ABVhfo',
        "username": 'bcd',
        "password": '1',
        "_id":"u101"

    })
    await userService.signup({
        "fullname": 'Tomer',
        "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4E03AQFlupY8tXNbnA/profile-displayphoto-shrink_400_400/0/1622442415599?e=1638403200&v=beta&t=DBTF6x9nzwz1G04DZ8hBSG14UyM6BUDX6LM30JL84jg',
        "username": 'tomer',
        "password": '1',
        "_id":"u102"

    })
    await userService.signup({
        "fullname": 'Matan',
        "imgUrl": 'https://media-exp1.licdn.com/dms/image/C4D03AQEEFClr3HeA9w/profile-displayphoto-shrink_800_800/0/1575055172966?e=1638403200&v=beta&t=-EaNro-ekUtvBc9ndCkF37SAe2YT6CaaOGe09riqZew',
        "username": 'matan',
        "password": '1',
        "_id":"u103"
        
    })
    await userService.signup({
        "fullname": 'Dave',
        "imgUrl": 'https://m.media-amazon.com/images/M/MV5BMTY5NzY4NzgxNV5BMl5BanBnXkFtZTcwMzcyOTQwOQ@@._V1_UY1200_CR108,0,630,1200_AL_.jpg',
        "username": 'dave',
        "password": '1',
        "_id":"u104"
        
    })
    await userService.signup({
        "fullname": 'Anna',
        "imgUrl": 'https://media-cldnry.s-nbcnews.com/image/upload/t_fit-2000w,f_auto,q_auto:best/newscms/2019_50/3139821/191209-ana_de_armas-mc-1505.JPG',
        "username": 'anna',
        "password": '1',
        "_id":"u105"
    })
    await userService.signup({
        "fullname": 'Rick',
        "imgUrl": 'https://pbs.twimg.com/profile_images/1098178907163975681/cuz_rA54_400x400.jpg',
        "username": 'pickleRick',
        "password": '1',
        "_id":"u106"
        
    })
    await userService.signup({
        "fullname": 'Archer',
        "imgUrl": 'https://pbs.twimg.com/profile_images/1194678819602305024/vFMWJwiT.jpg',
        "username": 'archer',
        "password": '1',
        "_id":"u107"
    })
};



// This IIFE functions for Dev purposes 
// It allows testing of real time updates (such as sockets) by listening to storage events
// (async () => {
//     var user = getLoggedinUser()
//     // Dev Helper: Listens to when localStorage changes in OTHER browser

//     // Here we are listening to changes for the watched user (comming from other browsers)
//     window.addEventListener('storage', async () => {
//         if (!gWatchedUser) return;
//         const freshUsers = await storageService.query('user')
//         const watchedUser = freshUsers.find(u => u._id === gWatchedUser._id)
//         if (!watchedUser) return;
//         if (gWatchedUser.score !== watchedUser.score) {
//             console.log('Watched user score changed - localStorage updated from another browser')
//             socketService.emit(SOCKET_EVENT_USER_UPDATED, watchedUser)
//         }
//         gWatchedUser = watchedUser
//     })
// })();

// This is relevant when backend is connected
// (async () => {
//     var user = getLoggedinUser()
//     if (user) socketService.emit('set-user-socket', user._id)
// })();

