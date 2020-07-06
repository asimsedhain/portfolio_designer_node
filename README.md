<p align="center">
<h1 align="center">
Portfolio Designer
</h1>
<p align="center">
	<a href="https://capos.netlify.app/">	
		<img align="center" src="https://api.netlify.com/api/v1/badges/3d4f7024-efb0-4e67-8baa-577fe9a3eabb/deploy-status" />
	</a>
	<img align="center" src="https://github.com/asimsedhain/portfolio_designer_node/workflows/CI/badge.svg" />
	<img align="center" src="https://github.com/asimsedhain/portfolio_designer_node/workflows/CD/badge.svg" />
</p>
                                                              
<p align="center">
Web App for creating fast and stylish portfolios..

This repository holds the Node server.
</p>
</p>

## API
The API can be accessed using the https://capos.azurewebsites.net/ endpoint.

|Type | Endpoint | Description |
|---|---|---|
| POST | `/users` | endpoint for creating a new user. It expects a json object with `Name` and `Bio` field. |
| GET | `/users/ID` | Returns the users data with `ID`. |


### Examples with JavaScript

### POST `/users`
```javascript

// Creating a new form object and passing it using a POST request.

const response = await fetch('https://capos.azurewebsites.net/users', {
	method: 'POST',
	body: {Name: "Test", Bio: "Test Bio"}
	});

// Receiving the IMAGE_ID from the response
const Id = (await response.json()).Id;			
console.log(Id)
```

### GET `/users/ID`
```javascript
const response = await fetch('https://capos.azurewebsites.net/users')
const data = await response.json()
console.log(data)
```




## Project Status: Work in Progress