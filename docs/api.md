## APIs
Currently image_util contains two api's.

#### 1. Get image in request input, as request parameters height, width
- Signature - `/api/image/resize?width=312&height=300`
- Curl Request - `curl --location --request POST 'http://localhost:3000/api/image/resize?width=312&height=300' \
       --form 'image=@/Users/abrarkhan/Desktop/Images/Image3.jpg'`
- Output - It will upload the both images at provided UPLOAD_PATH path 
    ```json
       {
           "success": true,
           "data": {
               "path": "/Users/abrarkhan/Desktop/JoeyRead/300__312__Image3.jpg"
           }
       }
    ```
