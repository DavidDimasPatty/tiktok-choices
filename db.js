const mongo=require('mongoose')
const schema=mongo.Schema
require('dotenv').config()
var stringCon=`mongodb+srv://${process.env.USERNAME_DB}:${process.env.PW_DB}@cluster0.hw29l.mongodb.net/ChoiceDB`

const connect = async (e)=>{ 
    await mongo.connect(stringCon,{
        useNewUrlParser: true, 
        useUnifiedTopology: true
    
     }).then(()=>{
         console.log("Database Connect")
     }).catch(err=>{
         console.log("Database Failed to Connect "+err)
     })
    }

    const questionscheme = new schema({
        option1:String,
        option2:String,
        },{collection:'question'});
    var question=mongo.model('question',questionscheme)

    async function getAllQuestion(){
        var arr=[]
        await question.find().then((res)=>{
            arr=res
        }).catch((e)=>{
            console.log(e)
        })
        return arr;
    }

    
module.exports= {
    connect:connect,
    getAllQuestion:getAllQuestion,
}