const {writeFile, readFile} = require("fs").promises;

writeFile("temp.txt", "\nLine One") // write line 1  
.then(() => {  
   return writeFile("temp.txt", "\nLine Two")  // write line 2.  
})  
.then(() => {
    return writeFile("temp.txt", "\nLine Three\n")  // write line .  
})
.then(() => {
    return readFile("temp.txt", "utf-8")
})
.then((data) => {
    console.log(data, "In order to append and not overwrite files: use appendFile instead ");
})
.catch((error) => {  
    console.log("An error occurred: ", error)  
})  
