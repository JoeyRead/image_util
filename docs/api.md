## APIs
Currently image_util contains two api's.

#### 1. POSt image in request input, with request parameters height, width
- Send image in post request as form-data and request parameters image height and width 
- Signature - POST `/api/image/resize?width=312&height=300`
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
  
#### 2. Get api with image name with with request parameters height, width
- Pass the image name, height and width as request parameter
- Service will read image from given INPUT_PATH, then resize it and save it to given OUTPUT_PATH, 
  with name format `height__width__image_name`.
- Signature - GET `/api/image/resize?width=312&height=300&name=Image3.jpg`
- Curl request - `curl --location --request GET 'http://localhost:3000/api/image/resize?width=312&height=300&name=Image3.jpg'`
- Output - Service will return path of resized image, if success.
    ```json
    {
        "success": true,
        "data": {
            "path": "/Users/abrarkhan/Desktop/JoeyRead/300__312__Image3.jpg"
        }
    }
    ```
- Python request
    ```python
        import requests
    
        url = "http://localhost:3000/api/image/resize?width=312&height=300&name=Image3.jpg"     
        payload = {}
        headers= {}
        response = requests.request("GET", url, headers=headers, data = payload)
        print(response.text.encode('utf8'))
    ```