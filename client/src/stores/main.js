import { defineStore } from 'pinia'
import axios from 'axios'
const APIKey = 'AIzaSyAILtd7UH0yES5HrzJm3pZqgUQy1HckSiI'
// let serverUrl = 'https://books-production-ac91.up.railway.app'
let serverUrl = 'http://localhost:3000'
import io from 'socket.io-client'
const socket = io(serverUrl)
import Swal from 'sweetalert2/dist/sweetalert2'


export const useMainStore = defineStore('main', {
  state: () => ({
    books: [],
    query: '',
    totalPage: 1,
    currentPage: 1,
    start: 0,
    loginEmail: '',
    loginPassword: '',
    registerEmail: '',
    registerName: '',
    registerPassword: '',
    shelf: [],
    recentReads: [],
    currentBook: null,
    completedShelf: [],
    currentShelf: [],
    allShelf: [],
    userPost: '',
    userPostName: localStorage.getItem('name') || '',
    userPostEmail: localStorage.getItem('email') || '',
    userPostPicture: localStorage.getItem('picture') || '',
    discussionPosts: [],
    isLoggedIn: false,
    userProfilePic: '',
    userBookDetail: {},
    noteTitle: '',
    noteText: '',
    userNotes: [],
    bookNotes: []
  }),

  actions: {
    async getDefaultBooks() {
      try {
        if (!this.query) {
          this.query = 'fiction+inpublisher:penguin'
        }
        const { data } = await axios.get(`https://www.googleapis.com/books/v1/volumes?key=${APIKey}&q=subject:${this.query}&startIndex=${this.start}&maxResults=30`)
        this.books = data.items
        this.query = ''
        this.totalPage = Math.floor(data.totalItems / 30)
        if (this.totalPage > 10) {
          this.totalPage = 10
        }
      } catch (err) {
        this.errorMessage(err)
        console.log(err.response.data.message)
      }
    },
    async getBookDetails(id) {
      try {
        const { data: thisBook } = await axios.get(`https://www.googleapis.com/books/v1/volumes?key=${APIKey}&q=isbn:${id}&maxResults=1`)
        this.currentBook = thisBook
        this.router.push(`/books/${id}`)
      } catch (err) {
        console.log(err)
        this.errorMessage(err)
        console.log(err.response.data.message)
      }
    },

    async login(loginEmail, loginPassword) {
      try {
        const { data } = await axios({
          method: 'POST',
          url: `${serverUrl}/login`,
          data: {
            email: loginEmail,
            password: loginPassword
          }
        })
        localStorage.setItem('access_token', data.access_token)
        this.loginEmail = ''
        this.loginPassword = ''
        localStorage.setItem('name', data.name)
        localStorage.setItem('email', data.email)
        localStorage.setItem('picture', data.picture)
        this.userPostName = data.name,
        this.userPostEmail=  data.email,
        this.userPostPicture = data.picture,
        this.isLoggedIn = true
        this.router.push('/home')
      } catch (err) {
        this.errorMessage(err)
        console.log(err.response.data.message)
      }
    },
    async register(registerName, registerEmail, registerPassword) {
      try {
        const { data } = await axios({
          url: `${serverUrl}/register`,
          method: 'POST',
          data: {
            name: registerName,
            email: registerEmail,
            password: registerPassword,
          }
        })
        localStorage.setItem('access_token', data.access_token)
        localStorage.setItem('name', data.name)
        localStorage.setItem('email', data.email)
        localStorage.setItem('picture', data.picture)
        this.userPostName = localStorage.name,
        this.userPostEmail=  localStorage.email,
        this.userPostPicture = localStorage.picture,
        this.registerEmail = ''
        this.registerPassword = ''
        this.registerName = ''
        this.isLoggedIn = true
        this.router.push('/home')
      } catch (err) {
        this.errorMessage(err)
        console.log(err)
      }
    },
    async logOut() {
      localStorage.clear()
      this.userPostName = ''
      this.userPostEmail = ''
      this.isLoggedIn = false
    },

    async addToShelf(title, author, desc, pgcount, genre, cover, isbn) {
      try {
        const data = await axios({
          url: `${serverUrl}/shelf`,
          method: 'POST',
          data: {
            title: title,
            author: author,
            pageCount: pgcount,
            description: desc,
            genre: genre,
            cover: cover,
            isbn: isbn
          },
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.router.push('/shelf')
      } catch (err) {
        this.errorMessage(err)
        console.log(err)
      }
    },
    async getAllShelf(){
      try {
        const { data: allShelf } = await axios({
          url: `${serverUrl}/shelf/all`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.allShelf = allShelf
      } catch (err) {
        this.errorMessage(err)
        console.log(err)
      }

    },
    async getMyShelf() {
      try {
        const { data: myShelf } = await axios({
          url: `${serverUrl}/shelf`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.shelf = myShelf
        // if(myShelf.length > 3){
        //   this.recentReads = myShelf.slice(0,3)
        // } else {
        //   this.recentReads = myShelf
        // }
        this.recentReads = myShelf
      } catch (err) {
        this.errorMessage(err)
        console.log(err)
      }
    },

    async getCompletedBooks(){
      try {
        const { data: completedShelf } = await axios({
          url: `${serverUrl}/shelf/completed`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.completedShelf = completedShelf
      } catch (err) {
        this.errorMessage(err)
        console.log(err)
      }
    },

    async getCurrentBooks(){
      try {
        const { data: currentShelf } = await axios({
          url: `${serverUrl}/shelf/current`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.currentShelf = currentShelf
      } catch (err) {
        this.errorMessage(err)
        console.log(err)
      }
    },

    async changeBookToFinish(id){
      try{
        const {data} = await axios({
          url: `${serverUrl}/shelf/completed`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            id: id
          }
        })
        this.getMyShelf()
        this.getCompletedBooks()
        this.getCurrentBooks()
        this.router.push('/home')
      } catch (err){
        this.errorMessage(err)
      }
    },
    async changeBookToCurrent(id){
      try{
        const {data} = await axios({
          url: `${serverUrl}/shelf/current`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            id: id
          }
        })
        this.getMyShelf()
        this.getCompletedBooks()
        this.getCurrentBooks()
        this.router.push('/home')
      } catch (err){
        this.errorMessage(err)
      }
    },

    async changeBookToRead(id){
      try{
        const {data} = await axios({
          url: `${serverUrl}/shelf/toread`,
          method: 'PATCH',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            id: id
          }
        })
        this.getMyShelf()
        this.getCompletedBooks()
        this.getCurrentBooks()
        this.router.push('/home')
      } catch (err){
        this.errorMessage(err)
      }
    },
    
    async getDiscussionThread(bookId) {
      try {
        const { data } = await axios({
          url: `${serverUrl}/discussion`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          },
          params: {
            id: bookId
          }
        })
        this.discussionPosts = data
      } catch (err) {
        if (err.response.status == 404) {
          this.discussionPosts = []
        }
      }
    },

    async sendMessage(userPost, bookId, userEmail) {
      socket.emit("message", userPost, bookId, userEmail)
    },

    async editUserProfile(name, image){
      try {
        const data = await axios({
          url: `${serverUrl}/user`,
          method: 'PUT',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            name: name || localStorage.getItem('name'),
            pic: image || localStorage.getItem('picture')
          }
        })
        if(image && name){
          localStorage.setItem('name', name)
          localStorage.setItem('picture', image)
        } else {
          if(name) {
            localStorage.setItem('name', name)
            this.userPostName = name
            this.userPostPicture = localStorage.getItem('picture') 
          } else if(image) {
            localStorage.setItem('picture', picture)
            this.userPostPicture = picture
            this.userPostName = localStorage.getItem('name') 
            console.log("local storage set")
          } else {
            this.userPostPicture = localStorage.getItem('picture')
            this.userPostName = localStorage.getItem('name')
          }
        }
        this.reload()
      } catch (err) { 
        this.errorMessage(err)
    
      }
    },

    reload(){
      this.router.go()
      this.router
      .push({ path: '/home' })
      .then(() => { this.router.go() })
  }
    ,

    async removeFromShelf(id){
      try{
        const {data} = await axios({
          url: `${serverUrl}/shelf`,
          method: 'DELETE',
          headers: {
            access_token: localStorage.access_token
          },
          data: {
            id: id
          }
        })
        this.getMyShelf()
        this.getCompletedBooks()
        this.getCurrentBooks()
        this.getAllShelf()
        this.successMessage(data.message)
        this.router.push('/home')
      } catch (err){
        this.errorMessage(err)

      }
    },

    async getShelfBookDetail(id){
      try {
        const {data} = await axios({
          url: `${serverUrl}/shelf/book?id=${id}`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.userBookDetail = data.currentBook
        this.bookNotes = data.bookNotes
        this.router.push(`/shelf/${id}`)
      }catch(err){
        console.log(err)
        this.errorMessage(err)
      }

    },

    async addNotes(noteTitle, noteText, id){
      try{
        console.log(id, "addNotes")
        const {data: newNote} = await axios({
          url: `${serverUrl}/notes`,
          method: 'POST',
          headers: {
            access_token: localStorage.access_token
          }, 
          data: {
            title: noteTitle,
            text: noteText,
            bookId: id
          }
        })
        this.router.push(`/shelf/${id}`)
      }catch(err){
        console.log(err.response.data.message)
        this.errorMessage(err)
      }
    },

    async getUserNotes(){
      try {
        const {data: userNotes} = await axios({
          url: `${serverUrl}/notes`,
          method: 'GET',
          headers: {
            access_token: localStorage.access_token
          }
        })
        this.userNotes = userNotes
      }catch(err){
        console.log(err.response.data.message)
        this.errorMessage(err)
      }
    },

  
    successMessage(msg){
      Swal.fire({
        title: 'Success!',
        text: `${msg}`,
        background: '#000000',
        color: '#ffffff',
        confirmButtonColor: '#33C1C7'
      })
    },

    errorMessage(err) {
      Swal.fire({
        title: 'Error!',
        text: `${err.response.data.message}`,
        confirmButtonColor: '#33C1C7',
        background: '#000000',
        color: '#ffffff'
      })
    },

  }
})
