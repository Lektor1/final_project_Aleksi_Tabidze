# Final Project

This is a Express Node.js application for final project.

Basic api for File-sharing Service.

Project task description - _final-project.md_

## Installation

1. Clone the repository:
   ```
   git clone https://github.com/Lektor1/final_project_Aleksi_Tabidze.git
   ```
2. Navigate to the project directory:
   ```
   cd final-project-aleksi-tabidze
   ```
3. Install the dependencies:
   ```
   npm install
   ```

## Usage

To start the application, run:

```
npm start
```

The server will start on `http://localhost:3000`.

## API Endpoints

You can use colection file generated by Postman - _GITA_Final_project.postman_collection.json_

### 1. User management

#### Register a User

- **URL:** `/api/v1/user/create`
- **Method:** `POST`
- **Description:** Register a new user.
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "message": "User created successfully",
    "user": {
      "id": 1,
      "username": "testuser",
      "password": "password123"
    }
  }
  ```

#### Validate a User

- **URL:** `/api/v1/user/validate`
- **Method:** `POST`
- **Description:** Validate user credentials.
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "isValid": true
  }
  ```

#### Validate a User

- **URL:** `/api/v1/user/login`
- **Method:** `POST`
- **Description:** Login a user and return a JWT token.
- **Request Body:**
  ```json
  {
    "username": "testuser",
    "password": "password123"
  }
  ```
- **Response:**
  ```json
  {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
  ```

#### Unregister a User

- **URL:** `/api/v1/user/unregister`
- **Method:** `POST`
- **Description:** Unregister a user and delete all associated data.
- **Response:**
  ```json
  {
    "message": "User unregistered successfully"
  }
  ```

### 2.Folder Management

#### Validate a User

- **URL:** `/api/v1/folder/space`
- **Method:** `GET`
- **Description:** List all items in the user's space.
- **Headers:**
  - Authorization: Bearer <JWT_TOKEN>
- **Response:**
  ```json
  [
    "file1.txt",
    "file2.txt",
    {
      "folder1": ["file3.txt"]
    }
  ]
  ```

#### Create a File or Folder

- **URL:** `/api/v1/folder/space/create`
- **Method:** `PUT`
- **Description:** Create an empty file or folder.
- **Headers:**
  - Authorization: Bearer <JWT_TOKEN>
- **Request Body:**
  type should be 'folder' or 'file'
  ```json
  {
    "type": "folder",
    "name": "newFolder"
  }
  ```
- **Response:**
  ```json
  {
    "message": "folder created successfully"
  }
  ```

#### Delete a File or Folder

- **URL:** `/api/v1/folder/space/file`
- **Method:** `DELETE`
- **Description:** Delete a file or folder. Only empty folders can be deleted.
- **Headers:**
  - Authorization: Bearer <JWT_TOKEN>
- **Request Body:**
  ```json
  {
    "name": "newFolder"
  }
  ```
- **Response:**
  ```json
  {
    "message": "File/folder deleted successfully"
  }
  ```

### 3.File Management

#### Upload a File

- **URL:** `/api/v1/file/space/upload`
- **Method:** `POST`
- **Description:** Upload a file.
- **Headers:**
  - Authorization: Bearer <JWT_TOKEN>
  - file-name: <FILE_NAME>
- **Request Body:** Binary file data
- **Response:**
  ```json
  {
    "message": "File uploaded and compressed successfully",
    "fileName": "example.zip"
  }
  ```

#### Attach Meta Information to a File

- **URL:** `/api/v1/file/space/meta`
- **Method:** `POST`
- **Description:** Attach meta information to a file.
- **Headers:**
  - Authorization: Bearer <JWT_TOKEN>
- **Request Body:**
  ```json
  {
    "fileName": "example.txt",
    "notes": "This is a test file",
    "creationDate": "2023-01-01",
    "tags": ["test", "example"]
  }
  ```
- **Response:**
  ```json
  {
    "message": "Meta information attached successfully"
  }
  ```

#### Get Meta Information of a File

- **URL:** `/api/v1/file/space/meta`
- **Method:** `GET`
- **Description:** Get meta information attached to a file.
- **Headers:**
  - Authorization: Bearer <JWT_TOKEN>
- **Query Parameters:**
  - fileName: <FILE_NAME>
- **Response:**
  ```json
  {
    "fileName": "example.txt",
    "notes": "This is a test file",
    "creationDate": "2023-01-01",
    "tags": ["test", "example"]
  }
  ```

### 3.File Sharing

#### Generate a Share Link

- **URL:** `/api/v1/share`
- **Method:** `GET`
- **Description:** Generate a short link to download a shared file or folder.
- **Headers:**
  - Authorization: Bearer <JWT_TOKEN>
- **Query Parameters:**
  - fileName: <FILE_NAME>
- **Response:**
  ```json
  {
    "link": "http://localhost:3000/api/v1/download/FA2341"
  }
  ```

#### Download a Shared File or Folder

- **URL:** `/api/v1/download/:token`
- **Method:** `GET`
- **Description:** Download a shared file or folder. Folders are compressed as zip.
- **Response:** Binary file data
