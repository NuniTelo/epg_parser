const parse = require('xml2js').parseString
const multer = require('multer')
const express = require('express')
const app = express()
var fs = require('fs')

const db = require('./config/database')  //sequelize config file
const epg_model = require('./models/epg_model_db') //model for epg 

const parse_xml_data = require('./parse_functions')  //functions to parse the data

var upload = multer({dest: 'uploads/'})   //multer will be used for file uploading

/**
 * POST
 * SEND myFile example 3 from the client
 */
app.post('/parse', upload.single('myFile'), async (req, res) => {

    const file = req.file //this is the file

    if (file === undefined) { 
        res.json({
            success: false,
            message: 'No file send!'
        })
    } else {  //if the file exists
        if (file.originalname.slice(-3) === 'xml') {  //if the file is xml
            fs.readFile('uploads/' + file.filename, 'utf8', async (err, contents) => {  //read without blocking
                //now let's parse it
                parse(contents, async (err, results) => {  // parse the content

                    if (err) res.end('File parsing failed!!!') //if parsing has errors 

                    try {
                        let [channel_list, programme_list] = await Promise.all([
                            await parse_xml_data.generate_programme_list(results.tv.programme),
                            await parse_xml_data.generate_channel_list(results.tv.channel)
                        ])

                        await epg_model.bulkCreate(channel_list) // create a bulk write to the database

                        let response = {
                            channel_list: channel_list,
                            programme_list: programme_list
                        } //this is the response test 

                        res.json(response) 
                    } catch (e) {
                        res.end('Fail to generate data! Try again!')
                    }
                })
            })
        } else {
            res.status(201).json({
                success: false,
                message: 'File is not XML!'
            })
        }
    }
})


// Start the server on port 3000
app.listen(3000, '127.0.0.1')
console.log('Server Started!')