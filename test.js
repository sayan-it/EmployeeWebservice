async function  asyncWithError(val)   { //returns the value passes after incrementing it by 1
    if(val){
        return val+1
    } else{
        throw new Error("Error inside async function")
    }
 }
 async function callAsyncWithError(){//used to call asyncWithError function
     try{
         let data=await asyncWithError(1) //value 1 is passed to the 
         //this data is passed to the next call
         console.log(await asyncWithError(data)) // 3
         console.log(await asyncWithError()) // throws Error
     }catch(err){  // handles caught error 
         console.log(err.message)//prints Error message 
     }
 }
