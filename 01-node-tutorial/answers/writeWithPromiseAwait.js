const {writeFile, readFile} = require("fs").promises;

const writer = async () => {
    try{
        await writeFile ('temp.txt','\nFirst line\nSecond line\nThird line\n' );
        console.log("File has been written successfully")
    }catch(error) {
        console.log('Error writing to file: ', error)
    }
};

const reader = async () => {
    try{
        const data = await readFile ('./temp.txt', 'utf-8');
        console.log("content of temp.txt", data);
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