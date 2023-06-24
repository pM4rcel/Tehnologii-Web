const API_URL = 'http://localhost:8080/api/v1';
const login = async (event) => {
    event.preventDefault();
    const formData = {
        "email": event.target.email.value,
        "password": event.target.password.value
    };
    console.log(event.target);
    console.log(JSON.stringify(formData));
    try{
        const response = await fetch(API_URL + '/login', {
            method: 'POST',
            mode: 'no-cors',
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(formData),
        });
        // const data
        const auth = response.headers.get('Authorization');
        console.log(auth);
        console.log(data);
    }catch(error){
        console.log("Error: " + error);
    }
    return false;
}