const bodyParser = require('body-parser');
const express = require('express');
const request = require('request');
// The express server port
const port = 3000;
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  // Does not require an access token.
  request({
    url: 'http://apictv.vtv.vn/api/v1/public/post/list/dao-tao?per_page=200',
    method: 'GET',
    headers: {
        'Content-Type': 'application/json'
    }
}, function(error, response, body){
    if(error) {
        console.log(error);
    } else {
        //console.log(response.statusCode, body);
        const data = JSON.parse(body).data.data;
        data.map((item, index) => {
            item.content = 'Hàm convert content nằm ở đây';
            return item;
        })
        res.send(data)
    }
});
});

app.listen(port, () => console.log(`Server is up and running on port ${port}`));