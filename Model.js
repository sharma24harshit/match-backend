const mongoose = require("mongoose");

const MatchSchema = mongoose.Schema({
    name:{type:String ,required:true},
    app_id:{type:String ,required:true},
    phone:{type:Number ,required:true},
    points_match:{type:Number ,required:true},
    occupation:{type:String ,required:true},
    place:{type:String ,required:true},
    birth_time:{type:String ,required:true},
    birth_place:{type:String ,required:true},
},{
    versionKey:false
})

const MatchModel = mongoose.model("match_data", MatchSchema);

module.exports = {MatchModel}