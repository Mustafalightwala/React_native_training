//To store data of all users
var users = {}

// To store status of current user
var userStatus = {
    uname: false,
    login: false,
}

//sample users
users['demo1'] = {
    fname: 'Walter',
    lname: 'White',
    email: 'wwhite@gmail.com',
    avatar: "https://inklancers.com/wp-content/uploads/2020/08/i-freelancer.png",
    pswrd: 'abc',
}

users['demo2'] = {
    fname: 'Skyler',
    lname: 'White',
    email: 'swhite@gmail.com',
    avatar: "https://avatarfiles.alphacoders.com/791/79102.png",
    pswrd: 'pqr',
}

users['demo3'] = {
    fname: 'Jesse',
    lname: 'Pinkman',
    email: 'jpinkman@gmail.com',
    avatar: "https://www.shareicon.net/data/2016/05/24/770117_people_512x512.png",
    pswrd: 'xyz',
}

export default users;
export { userStatus };