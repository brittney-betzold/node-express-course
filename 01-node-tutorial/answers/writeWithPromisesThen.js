const {writeFile, readFile} = require("fs").promises;

writeFile("temp.txt", "Line One\n")
.then(() => {  
   return writeFile("temp.txt", "Line Two\n", {flag: "a"})  
})  
.then(() => {
    return writeFile("temp.txt", "Line Three\n", {flag: "a"}) 
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
