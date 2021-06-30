//jshint esversion:6
const express=require("express");
const bodyParser=require("body-parser");
const request=require("request");
const app=express();
const https=require("https");
app.use(express.static("Public"));
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
    res.sendFile(__dirname+"/index.html");
})
app.post("/failure",function(req,res){
    res.redirect("/");
});
app.post("/",function(req,res){
    var f1=req.body.fname;
    var f2=req.body.lname;
    var f3=req.body.mail;
    var obj={
        members: [
            {
                email_address:f3,
                status:"subscribed",
                merge_fields:{
                    FNAME:f1,
                    LNAME:f2
                }
            }
        ]

    };
    jsonStr=JSON.stringify(obj);
    const url="https://us6.api.mailchimp.com/3.0/lists/0656aa82f1";
    const options={
        method:"POST",
        auth:"abhisek:22f1cb25db560c7b176e6f71dccb1616-us6"
    };
    const rqst=https.request(url,options,function(response){
            if(response.statusCode===200)
            res.sendFile(__dirname+"/success.html");
            else
            res.sendFile(__dirname+"/failure.html");
            response.on("data",function(data){
            console.log(JSON.parse(data));
        });
        
    });
    rqst.write(jsonStr);
    rqst.end();
});
app.listen(process.env.PORT || 3000,function(){
    console.log("server is running");
});


// 22f1cb25db560c7b176e6f71dccb1616-us6
// 0656aa82f1