const express    = require('express');
const mysql      = require('mysql');

app = express();

app.use(express.json());
app.use(express.urlencoded());

const con = mysql.createConnection({
    host: x.x.x.x,
    user: xxxx,
    host: xxxx,
    database: xxxx
});

con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

app.get('/', function(req, res) {
    res.send("nice!");
});

function entry_exists(table, id) {
    return new Promise(function(resolve, reject) {
        con.query('SELECT EXISTS(SELECT 1 FROM ' + table +' WHERE id=' + id + ')', function(err, results, fields) {
            resolve(results[0][fields[0].name]);
        });
    });
}

app.post('/api/meal/request/add/', function(req, res) {
    if (entry_exists("meals", req.body.meal_id) && entry_exists("families", req.body.family_id) && entry_exists("families", req.body.target_family_id)) {
        var sql = "INSERT INTO meal_requests (`meal_id`, `family_id`, `target_family_id`, `message`, `status`) VALUES ("
            +       req.body.meal_id              + ", "
            +       req.body.family_id            + ", "
            +       req.body.target_family_id     + ", "
            + "'" + req.body.message              + "', "
            + "'" + req.body.status               + "')"
        console.log(sql);
        con.query(sql, function (err, results, fields) {
            if (err) throw err;
            res.send("community added succesfuly");
        });
    } else {
        console.log("INVALID PARAMS!!!!");
        return 1;
    }

});


app.post('/api/community/add/', function(req, res) {
    var sql = "INSERT INTO communities (`admin`, `description`, `background_image_url`, `lat`, `lng`, `radius`) VALUES ("
        +       req.body.admin                + ", "
        + "'" + req.body.description          + "', "
        + "'" + req.body.background_image_url + "', "
        +       req.body.lat                  + ", "
        +       req.body.lng                  + ", "
        +       req.body.radius               + ") "
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        res.send("community added succesfuly");
    });
});

app.post('/api/meal/add/', function(req, res) {
    var sql = "INSERT INTO meals (`id_creator`, `name`, `description`, `total_guests`, `current_guests`, `time`, `lat`, `lng`, `kosher`, `restrictions`, `allergies`, `kids_friendly`, `dog_friendly`, `accessible`, `background_image_url`) VALUES ("
        +       req.body.id_creator           + ", "
        + "'" + req.body.name                 + "', "
        + "'" + req.body.description          + "', "
        +       req.body.total_guests         + ", "
        +       req.body.current_guests       + ", "
        + "'" + req.body.time                 + "', "
        +       req.body.lat                  + ", "
        +       req.body.lng                  + ", "
        + "'" + req.body.kosher               + "', "
        + "'" + req.body.restrictions         + "', "
        + "'" + req.body.allergies            + "', "
        +       req.body.kids_friendly        + ", "
        +       req.body.dog_friendly         + ", "
        + "'" + req.body.accessible           + "', "
        + "'" + req.body.background_image_url + "')";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
        res.send("meal added succesfuly");
    });
});

app.post('/api/family/add/', function(req, res) {
    res.send("got it!");
    var sql = "INSERT INTO families (name, profile_photo_url, about, location) VALUES ("
        + "'" + req.body.name               + "', "
        + "'" + req.body.profile_photo_url  + "', "
        + "'" + req.body.about              + "', "
        + "'" + req.body.location           + "')";
    console.log(sql);
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("1 record inserted");
    });
});

app.listen(xxxx);
