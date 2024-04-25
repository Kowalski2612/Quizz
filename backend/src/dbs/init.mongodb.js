"use strict"

const mongoose = require("mongoose");
const { db: {host, port, name} } = require("../configs/congif.mongdb");
const connectString = `mongodb://${host}:${port}/${name}`;       // moi truong dev
// const connectString = `mongodb://172.29.0.2:27017/questionAppDev`;  // moi truong docker

const { countConnect } = require("../helpers/check.connect");

class Database {
	constructor() {
		this.connect();
	}
	//connect
	connect(type = "mongodb") {
        console.log(type)
        console.log(this.connect)
		if( 1 === 1 ) {
            console.log('1')
			mongoose.set("debug", true);
			mongoose.set("debug", {color: true});
		}
        console.log(connectString)
		mongoose.connect( connectString, {
			maxPoolSize: 100,									//toi da 100 ket noi 
		} ).then( _ => {
			console.log(`Connected MongoDB`);
		})
		.catch( e => console.log(`Connect failed`) );
	}

	static getInstance() {
		if( !Database.instance ) {
			Database.instance = new Database();
		}
		return Database.instance;
	}
}

const instanceMongoose = Database.getInstance();
module.exports = instanceMongoose;
