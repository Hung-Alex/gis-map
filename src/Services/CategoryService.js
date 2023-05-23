import axios from "axios";

export async function getCategories(){
    try {
        const response=await axios.get('http://159.223.22.242:8855/api/v1/dist/menu');
        const data=response.data;
        if(data.status==200){
            return data.data;
        }else{
            return null;
        }
    } catch (error) {
        
        console.log('Error',error.message);
        return null;
    }
}