(global as any).doGet = (e: GoogleAppsScript.Events.DoGet) => {
    console.log(e);
    return "";
}