const express = require('express');
const {MatchModel} = require('./Model');

const DetailsRoute = express.Router();

//---------------------------------------  GET  -------------------------------------------//
DetailsRoute.get("/", async(req,res)=>{
    try {
        const allDetails = await MatchModel.find();
        res.send({ success: true, data: allDetails });
      } catch (error) {
        res.status(500).send({ success: false, msg: error.message });
      }
})


//---------------------------------------  POST  -------------------------------------------//
DetailsRoute.post("/add-details", async(req,res)=>{
    const {
        name,
        app_id,
        phone,
        points_match,
        occupation,
        place,
        birth_time,
        birth_place
    } = req.body;
    try {
        const payload = {
            name,
            app_id,
            phone,
            points_match,
            occupation,
            place,
            birth_time,
            birth_place
          };
      
          const blogResponse = new MatchModel(payload);
          await blogResponse.save();
      
          res.send({ success: true, msg: "Details saved successfully" });
    } catch (error) {
      res.send({"msg":error.message})  
    }
})
//---------------------------- search with id --------------------// 

DetailsRoute.get("/search/:id", async(req,res)=>{
    const { id } = req.params;

    try {
      const detail = await MatchModel.findOne({ app_id: id });
  
      if (!detail) {
        return res.status(404).send({ success: false, msg: "No record found for this id" });
      }
  
      res.send({ success: true, data: detail });
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
})
//---------------------------- edit detail --------------------// 

DetailsRoute.put("/update-details/:id", async (req, res) => {
    const { id } = req.params;
    const updateData = req.body;
  
    try {
      const updated = await MatchModel.findOneAndUpdate(
        { _id:id },             // Find by app_id
        updateData,             // Fields to update
        { new: true }           // Return the updated document
      );
  
      if (!updated) {
        return res.status(404).send({ success: false, msg: "Record not found for update" });
      }
  
      res.send({ success: true, msg: "Details updated successfully", data: updated });
    } catch (error) {
      res.status(500).send({ success: false, msg: error.message });
    }
  });
  

module.exports  = {DetailsRoute}
