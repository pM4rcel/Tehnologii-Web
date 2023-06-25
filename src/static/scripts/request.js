// import { urlRoute } from "./routing.js";
// import { addLinksBasedOnLoggedUser } from "./navigation.js";

const API_URL = "http://localhost:8080/api/v1";

//
// register user
//
const registerUser = async (event) => {
    event.preventDefault();
    if (event.target.password.value !== event.target.confirmPassword.value) {
        console.log("Passwords do not match");
        return;
    }
    try {
        const response = await fetch(API_URL + "/register", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: event.target.name.value,
                email: event.target.email.value,
                password: event.target.password.value,
                // TODO: email verification
                verified: false
            })
        });
        const status = response.status;
        console.log(status);
    } catch (error) {
        console.log("Error: " + error);

    }
}



//
// login user
//
const loginUser = async (event) => {
    event.preventDefault();
    let status;
    try {
        const response = await fetch(API_URL + "/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({
                email: event.target.email.value,
                password: event.target.password.value
            }),
        });
        status = response.status;
    } catch (error) {
        console.log("Error: " + error);
    }
    // status === 201 ? urlRoute("/login") : console.log("Error: " + status);
    return false;
}

//
// forgot password
//
const resetPassword = async (event) => {
    event.preventDefault();
    console.log("Not Implemented Yet");
}

const logout = async (event) => {
    event.preventDefault();
    // browser.cookies.remove("token");
    // addLinksBasedOnLoggedUser()
    // urlRoute("/login");
}


//
//  books
//
const getCommentDetails = async (bookId, reviewId, commentId) => {
    try {
        const commentResponse = await fetch(API_URL + `/books/${bookId}/reviews/${reviewId}/comments/${commentId}`);
        const comment = await commentResponse.json();
        console.log('Comment:', comment);
    } catch (error) {
        console.log('Error:', error);
    }
};

const getReviewDetails = async (bookId, reviewId) => {
    try {
        const reviewResponse = await fetch(API_URL + `/books/${bookId}/reviews/${reviewId}`);
        const review = await reviewResponse.json();
        console.log('Review:', review);

        const commentsResponse = await fetch(API_URL + `/books/${bookId}/reviews/${reviewId}/comments`);
        const comments = await commentsResponse.json();
        console.log('Comments:', comments);

        for (const comment of comments) {
            await getCommentDetails(bookId, reviewId, comment.id);
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

const getBookDetails = async (bookId) => {
    try {
        const bookResponse = await fetch(API_URL + `/books/${bookId}`);
        const book = await bookResponse.json();
        console.log('Book:', book);

        const authorResponse = await fetch(API_URL + `/books/${book.bookId}/author`);
        const author = await authorResponse.json();
        console.log('Author:', author);

        const genreResponse = await fetch(API_URL + `/books/${book.bookId}/genre`);
        const genre = await genreResponse.json();
        console.log('Genre:', genre);

        const reviewsResponse = await fetch(API_URL + `/books/${bookId}/reviews`);
        const reviews = await reviewsResponse.json();
        console.log('Reviews:', reviews);

        for (const review of reviews) {
            await getReviewDetails(bookId, review.id);
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

const getAllBooks = async () => {
    try {
        const response = await fetch(API_URL + '/books');
        const books = await response.json();
        console.log('Books:', books);

        for (const book of books) {
            await getBookDetails(book.id);
        }
    } catch (error) {
        console.log('Error:', error);
    }
    return false;
};

//
//  book status
//
// const bookCard = document.querySelector('.cardBook');
// bookCard.addEventListener('click', handleBookStatus);

const addStatus = async (event) => {
    event.preventDefault();

    const href = event.target.getAttribute('href');
    const [_, bookId] = href.split('/');
    const statusSelect = document.querySelector('.dropdown__input');
    const selectedStatus = statusSelect.value;

    const data = {
        bookId: parseInt(bookId),
        status: selectedStatus
    };

    const response = await fetch(`${API_URL}/addBookStatus/${bookId}/${selectedStatus}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    })
        .then(response => response.json())
        .then(result => {
            console.log('Response:', result);
        })
        .catch(error => {
            console.error('Error:', error);
        });
}

//
//  post comment
//
const createComment = async (bookId, reviewId, commentData) => {
    try {
        const response = await fetch(`${API_URL}/books/${bookId}/reviews/${reviewId}/comments`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(commentData)
        });

        if (response.ok) {
            const createdComment = await response.json();
            console.log('Comment created:', createdComment);
        } else {
            console.log('Error:', response.status);
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

//
// post review
//
const createReview = async (bookId, reviewData) => {
    try {
        const response = await fetch(`${API_URL}/books/${bookId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(reviewData)
        });

        if (response.ok) {
            const createdReview = await response.json();
            console.log('Review created:', createdReview);
        } else {
            console.log('Error:', response.status);
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

//
//  get user
//
const fetchUser = async () => {
    try {
        const response = await fetch(API_URL + '/user', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const user = await response.json();
            console.log(user);
        } else {
            console.log('Error:', response.status);
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

//
//  user books
//
const getBooks = async () => {
    try {
        const response = await fetch(API_URL + '/user/books');
        if (response.ok) {
            const userBooks = await response.json();
            console.log(userBooks);
        } else {
            console.log('Error:', response.status);
        }
    } catch (error) {
        console.log('Error:', error);
    }
};

//
//  get filtered books
//
const fetchFilteredBooks = async (bookStatus) => {
    try {
        const response = await fetch(API_URL + `/users/books_filter=${bookStatus}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            const filteredBooks = await response.json();
            console.log(filteredBooks);
        } else {
            console.log('Error:', response.status);
        }
    } catch (error) {
        console.log('Error:', error);
    }
    return false;
};