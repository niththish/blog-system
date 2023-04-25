# blog-system
1) [stack details](https://github.com/niththish/blog-system/blob/main/README.md#stack-detail)
2) [backend requirements](https://github.com/niththish/blog-system/blob/main/README.md#requirements-in-backend-folder)
3) [api endpoints](https://github.com/niththish/blog-system/blob/main/README.md#api-endpoints)
4) [application routing](https://github.com/niththish/blog-system/blob/main/README.md#application-routing)
***

## stack detail
#### backend - `nodejs / expressjs`
#### database - `mongodb`
#### frontend - `angular`
***

## Requirements in backend folder
- create `.env` file containing the following values:- `PORT`, `DATABASEURL`, `JWT_SECRET`, `JWT_EXPIRY`, `fILE_SERVER`\
  fILE_SERVER = "your server address"\
  eg:- localhost:5000

- `npm install` - to download all dependencies the application requires

- `node index` or `npm start` - to start the server
***

## API ENDPOINTS
#### `backend`

| method  | url                       | functionality                       |
| ------- | -------------             | -----------------------             |
| `POST`  | /admin/login              | login admin user                    |
| `POST`  | /admin/verify-login       | verifies whether admin is logged in |
| `POST`  | /admin/new-blog           | create a new blog post              |
| `POST`  | /admin/new-poll           | create a new poll                   |
| `GET`   | /admin/blogs              | get all blog posts                  |
| `GET`   | /admin/polls              | get all polls                       |
| `DELETE`| /admin/blog/:id           | deletes a paricular blog post       |
| `DELETE`| /admin/poll/:id           | deletes a paticular poll            |

## APPLICATION ROUTING
#### `frontend`
| path                | functionality                                             |
| -------------       | -----------------------                                   |
| ''                  | redirects to blogs                                        |
| /blogs              | displays all the blogs present with filter functionality  |
| /polls              | displays all the polls available                          |
| /blog/:id           | displays a particular blog post                           |
| /polls/:id          | displays a paricular poll with ip based vote functionality|
| /admin              | redirects to admin/login page                             |
| /admin/login        | admins login page                                         |
| /admin/blogs        | displays all the blogs with delete delete functionality   |
| /admin/polls        | displays all the polls with delete delete functionality   |
| /admin/new-blog     | to create a new blog post                                 |
| /admin/new-poll     | to create a new poll                                      |
