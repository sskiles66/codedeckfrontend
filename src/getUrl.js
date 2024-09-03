
export default function returnBaseUrl() {
    const developmentString = process.env.REACT_APP_DEVELOPMENT_ENV;
    let baseUrl = ""

    if (developmentString == "development") {
        baseUrl = "http://localhost:4000"
    }
    
    return baseUrl;
}