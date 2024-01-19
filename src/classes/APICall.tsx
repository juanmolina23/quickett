export default class APICall {
  public static async get(url: string) {
    return await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      method: "GET",
    }).then((data) => data.json());
  }
  public static async post(url: string, body?: any) {
    return await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      credentials: "include",
      method: "POST",
      body: JSON.stringify(body),
    }).then((data) => data.json());
  }
}
