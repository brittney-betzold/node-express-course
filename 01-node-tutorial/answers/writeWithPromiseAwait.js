const {writeFile, readFile} = require("fs").promises;

const writer = async () => {
    try{
        await writeFile ('temp.txt','First line\n' );
        await writeFile ('temp.txt','Second line\n', {flag: "a"} );
        await writeFile ('temp.txt','Third line\n' , {flag: "a"});
        console.log("File has been written successfully")
    }catch(error) {
        console.log('Error writing to file: ', error)
    }
};

const reader = async () => {
    try{
        const data = await readFile ('./temp.txt', 'utf-8');
        console.log("content of temp.txt\n",data);
    }catch(error) {
        console.log("Error reading file: ", error)
    }
};

const readWrite = async () => {
    try{
        await writer();
        await reader();
        console.log('readWrite function complete')
    }catch(error) {
        console.log("Error in readWrite function: ", error)
    }
};
readWrite();