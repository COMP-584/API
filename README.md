# Chat-app-API

### creating development environment
* Create a new folder "config" in root of project directory.  
* Create a new file in the "config" folder named "dev.env".  
* Put bellow code insode the "dev.env" file to configure local development environment variables.  
>> PORT=3000  

## API useage

### User routes
1. login user
```
    at:- localhost:3000/user/login
    method:- POST
    req. body:- {
                    "username": "test",
                    "password": "test123"
                }
    res. body:- {
                    "_id": "5f033c671cc0830ce07ffc37",
                    "username": "test",
                    "__v": 0
                }
    res. body(error):-  {
                            "error": "invalid credentials!"
                        }
```
