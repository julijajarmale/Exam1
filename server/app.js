const express = require("express");
const app = express();
const port = 3003;
const cors = require("cors");
app.use(express.json({ limit: "10mb" }));
app.use(cors());
const mysql = require("mysql");
const md5 = require('js-md5');
const uuid = require('uuid');


app.use(
  express.urlencoded({
    extended: true,
  })
);
app.use(express.json());

const con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "exam",
});


const doAuth = function(req, res, next) {
    if (0 === req.url.indexOf('/admin')) { // admin
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length || results[0].role !== 'admin') {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    } else if (0 === req.url.indexOf('/login-check') || 0 === req.url.indexOf('/login') || 0 === req.url.indexOf('/')) {
        next();
    } else { 
        const sql = `
        SELECT
        name, role
        FROM users
        WHERE session = ?
    `;
        con.query(
            sql, [req.headers['authorization'] || ''],
            (err, results) => {
                if (err) throw err;
                if (!results.length) {
                    res.status(401).send({});
                    req.connection.destroy();
                } else {
                    next();
                }
            }
        );
    }
  }
  app.use(doAuth)
  
  // AUTH
  app.get("/login-check", (req, res) => {
    let sql;
    let requests;
    if (req.query.role === 'admin') {
        sql = `
        SELECT
        name
        FROM users
        WHERE session = ? AND role = ?
        `;
        requests = [req.headers['authorization'] || '', req.query.role];
    } else {
        sql = `
        SELECT
        name
        FROM users
        WHERE session = ?
        `;
        requests = [req.headers['authorization'] || ''];
    }
    con.query(sql, requests, (err, result) => {
        if (err) throw err;
        if (!result.length) {
            res.send({ msg: 'error' });
        } else {
            res.send({ msg: 'ok' });
        }
    });
  });
  
  app.post("/login", (req, res) => {
    const key = uuid.v4();
    const sql = `
    UPDATE users
    SET session = ?
    WHERE name = ? AND pass = ?
  `;
    con.query(sql, [key, req.body.user, md5(req.body.pass)], (err, result) => {
        if (err) throw err;
        if (!result.affectedRows) {
            res.send({ msg: 'error', key: '' });
        } else {
            res.send({ msg: 'ok', key });
        }
    });
  });
  
  
  app.post("/register", (req, res) => {
    const key = uuid.v4();
    const sql = `
    INSERT INTO users
    (name, email, pass, session)
    VALUES (?, ?, ?, ?)
  `;
    con.query(sql, [req.body.user, req.body.email, md5(req.body.pass), key], (err, result) => {
      if (err) throw err;
      if (!result.affectedRows) {
        res.send({ msg: 'error', key: '' });
      } else {
        res.send({ msg: 'ok', key });
      }
    });
  });


//READ SERVICES
app.get("/admin/services", (req, res) => {
  const sql = `
SELECT *

FROM services 
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


//CREATE Services
app.post("/admin/services", (req, res) => {
  const sql = `
  INSERT INTO services
  (title, city, address, photo)
  VALUES (?, ?, ?, ?)
  `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.city,
      req.body.address,
      req.body.photo,
     
      
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "OK, new and shiny product was created", type: "success" },
      });
    }
  );
});

//DELETE SERVICES
app.delete("/admin/services/:id", (req, res) => {
  const sql = `
  DELETE FROM services
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: "OK, Product gone", type: "success" } });
  });
});

//EDIT Serivces
  
app.put("/admin/services/:id", (req, res) => {
  const sql = `
  UPDATE services
  
  SET title = ?, city = ?, address = ?, photo = ?
  WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.title,
      req.body.city,
      req.body.address,
      req.body.photo,
      req.params.id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "OK, Cat updated. Now it is as new", type: "success" },
      });
    }
  );
});

//READ Masters
app.get("/admin/masters", (req, res) => {
  const sql = `
SELECT masters.id, masters.name, masters.surname, masters.city, masters.spec, masters.photo, services.title AS service
FROM masters
LEFT JOIN services
ON services.id = masters.service_id
ORDER BY name
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//CREATE Masters
app.post("/admin/masters", (req, res) => {
  const sql = `
  INSERT INTO masters
  (name, surname, city, spec, photo, service_id)
  VALUES (?, ?, ?, ?, ?, ?)
  `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.surname,
      req.body.city,
      req.body.spec,
      req.body.photo,
      req.body.service
      
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "OK, new and shiny product was created", type: "success" },
      });
    }
  );
});

//DELETE Masters
app.delete("/admin/masters/:id", (req, res) => {
  const sql = `
  DELETE FROM masters
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: "OK, Product gone", type: "success" } });
  });
});

//EDIT Master
  
app.put("/admin/masters/:id", (req, res) => {
  const sql = `
  UPDATE masters
  
  SET name = ?, surname = ?, city = ?, spec= ?, photo = ?
  WHERE id = ?
  `;
  con.query(
    sql,
    [
      req.body.name,
      req.body.surname,
      req.body.city,
      req.body.spec,
      req.body.photo,
      req.params.id,
    ],
    (err, result) => {
      if (err) throw err;
      res.send({
        result,
        msg: { text: "OK, Cat updated. Now it is as new", type: "success" },
      });
    }
  );
});


//READ USERS
app.get("/admin/users", (req, res) => {
  const sql = `
SELECT *

FROM users
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});


//Delete User

app.delete("/admin/users/:id", (req, res) => {
  const sql = `
  DELETE FROM users
  WHERE id = ?
  `;
  con.query(sql, [req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, Cat gone', type: 'success' } });
  });
});

//Edit Story
app.put("/admin/users/:id", (req, res) => {
  const sql = `
  UPDATE users
  SET approved = ? 
  WHERE id = ?
  `;
  con.query(sql, [req.body.approved, req.params.id], (err, result) => {
      if (err) throw err;
      res.send({ result, msg: { text: 'OK, Cat updated. Now it is as new', type: 'success' } });
  });
});

//READ Masters
app.get("/masters", (req, res) => {
  const sql = `
SELECT masters.id, masters.name, masters.surname, masters.city, masters.spec, masters.photo, masters.rate, masters.rate_sum, services.title AS service
FROM masters
LEFT JOIN services
ON services.id = masters.service_id
ORDER BY name
`;
  con.query(sql, (err, result) => {
    if (err) throw err;
    res.send(result);
  });
});

//CREATE RATE

app.put("/masters/:id", (req, res) => {
  const sql = `
        UPDATE masters
        SET rate = rate + 1, rate_sum = rate_sum + ?
        WHERE id = ?
    `;
  con.query(sql, [req.body.rate, req.params.id], (err, result) => {
    if (err) throw err;
    res.send({ result, msg: { text: "Tu prabalsavai", type: "danger" } });
  });
});


app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(`Portas ${port} klauso!`)
})
