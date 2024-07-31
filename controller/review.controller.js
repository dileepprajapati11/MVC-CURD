import '../model/connection.js'
import reviewSchemamodel from '../model/reviewmodel.js';




export var saveReview = async(req,res,next) => {
    var reviewDetails = req.body;
    console.log("Review Details : " + reviewDetails);


    var reviewList = await reviewSchemamodel.find();
    console.log("Review list is : " + reviewList);


    var len = reviewList.length;
    console.log("Review Length is : " + len);

    var _id = len == 0 ? 1 : reviewList[len - 1]._id + 1;
    console.log("Reviw id is : " + _id);

    reviewDetails = {...reviewDetails,_id:_id,"info": Date(),}
    console.log("Reviews Details complete : " + reviewDetails);

    try {
       var review = await reviewSchemamodel.create(reviewDetails);
       console.log("Review Details"+review);
       return res.status(201).json({ status: true ,"message":"Succesfully Review"});
    } catch {
      return res.status(500).json({ satus: false,"message":"not Succesfully Review" });
    }
}

export var fetchReview = ((req,res,next)=>{

})

export var updateReview = ((req,res,next)=>{

})

export var deleteReview = ((req,res,next)=>{

})