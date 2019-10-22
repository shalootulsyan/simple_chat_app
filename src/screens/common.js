const contacts = [
    'Olive', 'Ray', 'Tom', 'Ryan', 'Louis', 'Rose', 'Lee'
]


const messageData = {
    Olive: {
        name: 'Olive',
        message: []
    },
    Ray: {
        name: 'Ray',
        message: []
    },
    Tom: {
        name: 'Tom',
        message: []
    },
    Ryan: {
        name: 'Ryan',
        message: []
    },
    Louis: {
        name: 'Louis',
        message: []
    },
    Rose: {
        name: 'Rose',
        message: []
    },
    Lee: {
        name: 'Lee',
        message: []
    },
}




export default class Common {



    setContact = () => {
        localStorage.setItem('contactLists', JSON.stringify(contacts))
    }

    setUserName = (username) => {
        localStorage.setItem('userName', username)
    }

    getContact = () => {
        return JSON.parse(localStorage.getItem('contactLists'));
    }

    getUserName = (username) => {
        return localStorage.getItem('userName')
    }

    setInitialMessage = () => {
        localStorage.setItem('chatMessage', JSON.stringify(messageData))
    }
    setMessage = (data) => {
        localStorage.setItem('chatMessage', JSON.stringify(data))
    }

    getMessage = () => {
        return JSON.parse(localStorage.getItem('chatMessage'))
    }

}
