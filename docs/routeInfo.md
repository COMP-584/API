# Route Information

## User routes

| Method | Route | Description | Parameters | response |
| --- | --- | --- | --- | --- |
| get | / | All user data | | {_id, name, email, password, pic, isAdmin} |
| post | / | Create a new user | { name, email, password, pic } | {_id, name, email, pic, isAdmin, token} |
| post | /login | Login form | { email, password } |  {_id, name, email, pic, isAdmin, token}  |



