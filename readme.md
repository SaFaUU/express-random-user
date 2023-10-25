Here is a formatted readme.md file for the NodeJS API documentation:

# Express Random User API

This is the API documentation for an Express NodeJS server that provides CRUD operations for random user data.

## Endpoints

### Get all users

```
GET /user/all
```

Query parameters:

- `limit` - Number of users to return (default is 10)

### Get random user

```
GET /user/random
```

Returns a random user object.

### Save user

```
POST /user/save
```

Body:

```json
{
  "gender": "Male", 
  "name": "John Doe",
  "contact": "123-456-7890",
  "address": "123 Main St", 
  "photoUrl": "https://example.com/photo.jpg"
}
```

Saves a new user. Returns the saved user object.

### Update user

```
PUT /user/update/:id
```

Body:

```json
{
  "name": "Jane Doe" 
}
```

Updates a user by ID. Returns the updated user object.

### Delete user

```
DELETE /user/delete/:id 
```

Deletes a user by ID. Returns success message.

### Bulk update users

```
PUT /user/bulk-update
```

Body:

```json
[
  {
    "id": 123,
    "name": "John Doe",
    "contact": "123-456-7890"
  },
  {  
    "id": 456,
    "name": "Jane Doe"
  }
]
```

Allows bulk updating of multiple users. Returns array of updated users.

## Error Handling

Errors are returned in the following format:

```json
{
  "success": false,
  "message": "Error message here"
}
```