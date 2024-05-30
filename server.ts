import { app } from './app/app';


app.listen(3030, (err, address) => {
    if(err){
        console.error(err);
        process.exit(1)
    }
    console.log(`Sereve is running on ${address}`);
})