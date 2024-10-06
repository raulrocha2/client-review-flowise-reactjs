
export class FlowiseAPI {
  
  constructor (url) {
    this.url = url
  }
  
  async getAnswer(data) {
    try {
      const response = await fetch(
        this.url,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
          }
      );
      const result = await response.json();
      return result;
    } catch (error) {
      return {
        json: "An error occurred. Please try again later."
      }
    }
    
  }


}