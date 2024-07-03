import httpcommon from "../../httpcommon";


const createCity = (data) => {
    return httpcommon.post("/api/city", data);
};

const loadCity = () => {
    return httpcommon.get("api/city");
};

const CityServices = {
    createCity,
    loadCity,
}


export default CityServices;