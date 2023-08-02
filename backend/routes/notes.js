const express = require("express");


const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const { body, validationResult } = require('express-validator');

const Notes = require("../models/Notes");


//Route 1 : Getting all the notes using get "/api/auth./notes".Login required.
router.get('/fetchallnotes',fetchuser, async(req,res)=>{
    try {
        const notes = await Notes.find({user: req.id});
    res.send(notes)
    } catch (error) {
        res.status(404).send("Some internal error occured")
    }
});

//Route 2 : Adding notes using post "/api/auth./notes".Login required.
router.post('/addnote',fetchuser, [
    body('title',"Title must be atleast 3 characters").isLength({ min: 3 }),
    body('description','Description must be atleast 5 characters').isLength({ min: 5 }),
] ,async(req,res)=>{
    //If there are errors return bad requests
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    const {title,description,tag} = req.body;
    try {
        const note = new Notes({
            title,description,tag,user:req.id
        })
        const setnote = await note.save();
        res.send(setnote)
    } catch (error) {
        res.status(404).send("Some internal error occured")
    }
});

//Route 3 : Updating notes using put "/api/auth/notes".Login required.
router.put('/updatenote/:id', fetchuser , async(req,res)=>{
    const {title,description,tag} = req.body;
    try {
    const newnote = {}
    if (title) {newnote.title=title};
    if (description) {newnote.description=description};
    if (tag) {newnote.tag=tag};

    let note = await Notes.findById(req.params.id);
    if (!note) {return res.status(404).send("Not Found")};
    
    if (note.user.toString() !== req.id) {return res.status(401).send("Please give correct credentials")}
    note = await Notes.findByIdAndUpdate(req.params.id,{$set:newnote},{new:true})
    res.json(note);
    }
    catch(err){
        res.status(404).send("Some internal error occured")
    }

});

//Route 4 : Deleting notes using DELETE "/api/auth/notes".Login required.
router.delete('/deletenote/:id', fetchuser , async(req,res)=>{
    try {

    let note = await Notes.findById(req.params.id);
    if (!note) {return res.status(404).send("Not Found")};
    
    if (note.user.toString() !== req.id) {return res.status(401).send("Please give correct credentials")}
    note = await Notes.findByIdAndDelete(req.params.id);
    res.json({"Success":"Note has been deleted",note:note});
    }
    catch(err){
        res.status(404).send("Some internal error occured")
    }

});


module.exports = router;