import { loadmarks } from './bookmarks';
import { sendlog } from './debug';
import { watchfile } from './filechangewatcher';
import { getpathlist, searchforit } from './getpathoptions';
import { handleclicks } from './handleclick';
import { handlerightclick } from './handlerightclick';
import { listenforfiles, listenforfolcount } from './listfiles';
import { loadmarkdown } from './markdown';
import { openhtml } from './openfile';
import { progress } from './progress';
import { recentfiles } from './recent_file';
import { loadsearchresult, searchterm } from './searchresult';
import { listtabs } from './tabs';
import { starttimer } from './timer';
import { window as uio } from '@tauri-apps/api';
export default uio;
// import { WebviewWindow } from '@tauri-apps/api/window'
// globalThis.tid=globalThis.globalThis.tid;
// import * from globalsthis;
// export declare var globalThis.tid:number|string;
// globalThis.tid=0;
// declare var globalThis.frompath:string;
// globalThis.frompath=""
globalThis.frompath = "";
globalThis.tid = 0;
globalThis.startstopfilewatchertoggle = false;
export const { invoke } = (window as any).__TAURI__.tauri;
export const { listen } = (window as any).__TAURI__.event;



export const pathInput = document.getElementById("path-input") as HTMLInputElement;
export const searchInput = document.getElementById("search-input") as HTMLInputElement;
export const listButton = document.getElementById("list-button") as HTMLButtonElement;
export const fileList = document.getElementById("file-list") as HTMLTableElement;
export const tablist = document.getElementById("tabs-list") as HTMLTableElement;
export const marklist = document.getElementsByClassName("markslist")[0] as HTMLTableElement;
export const htmlbase = document.getElementById("htmlbase") as HTMLDivElement;
export const sow = document.getElementById("setsofwhat") as HTMLDivElement;
export const pathline = document.getElementById("path") as HTMLDivElement;
export const ousd = document.getElementById("ousd") as HTMLDivElement;
export const filewatch = document.getElementById("startserve") as HTMLDivElement;
export const parentsize = document.getElementById("parent-size") as HTMLParagraphElement;
export const menu = document.getElementById("menu") as HTMLUListElement;


export const reload = document.getElementById("reload") as HTMLButtonElement;
export const recent = document.getElementById("recent") as HTMLButtonElement;
export const newtab = document.getElementById("newtab") as HTMLButtonElement;
export const newwin = document.getElementById("new_window") as HTMLButtonElement;
export const otb = document.getElementById("otb") as HTMLButtonElement;



export const backButton = document.getElementById("back-button") as HTMLButtonElement;
export const nosize = document.getElementById("no-size") as HTMLButtonElement;
export const folcount = document.getElementById("fol-count") as HTMLButtonElement;
export const tsearch = document.getElementById("t-search") as HTMLButtonElement;
export const datalist = document.getElementById("path-list") as HTMLDataListElement;
var lastfolder;
// var bclose = document.querySelector(".tab-close") as HTMLSpanElement;
// var thistory: string[] = [];
// var tforward: string[] = [];
var label=uio.getCurrent().label;
if (label=="main"){
  globalThis.defpath = "/home/roger/.local/share/Zeal/Zeal/docsets/JavaScript.docset/Contents/Resources/Documents"
  lastfolder = globalThis.defpath;
}
// else{

  
  
// }


(window as any).__TAURI__.event.listen("folder-size", (data: { payload: string }) => {
  console.log("foldersize")

  parentsize.innerHTML = data.payload.toString();
  // console.log(data.payload.toString())
});

(window as any).__TAURI__.event.listen("load-complete", (data: { payload: string }) => {
  console.log("load complete")
  var setp = document.getElementById("myprogress") as HTMLProgressElement;
  setp.className = "hide"
});
type fsc={
  name:string,
  count:number
}
(window as any).__TAURI__.event.listen("fsc", (data: { payload: string }) => {
  console.log("-------------__>"+((data.payload)))
  let fscs = JSON.parse(data.payload) as Map<string,number>;
  for (let [key, value] of Object.entries(fscs)) {
    console.log(key + ": " + value);
  }

  // sow
  // var setp = document.getElementById("myprogress") as HTMLProgressElement;
  // setp.className = "hide"
});

(window as any).__TAURI__.event.listen("grandparent-loc", (data: { payload: string }) => {
  console.log("grandloc")

  lastfolder = data.payload.toString();
  // console.log(data.payload.toString())
});
(window as any).__TAURI__.event.listen("parent-loc", (data: { payload: string }) => {
  console.log("--------------parentloc---" + data.payload)
  pathInput.value = data.payload.toString();
  // console.log(data.payload.toString())
});
loadsearchresult();
searchterm();
progress();
// web app code

window.addEventListener("DOMContentLoaded", () => {
  listenforfiles();
  loadmarkdown();
  if(label==="main"){
    (window as any).__TAURI__.invoke(
    "list_files",
    {
      windowname:uio.appWindow.label,
      oid: globalThis.tid.toString(),
      path: globalThis.defpath,
      ff: ""
    });
 
    starttimer();
  }
  else{
    (window as any).__TAURI__.invoke(
      "whattoload",
      {
        windowname:label,
        id: globalThis.tid.toString(),
      });
      starttimer();
  }

  document.addEventListener("contextmenu", function (e) {
    // console.log(e)
    handlerightclick(e);
  });

  // Add a listener for the click event on the document
  document.addEventListener("click", function (e: Event) {
    // console.log(e)
    // Hide the menu if the user clicks outside of it
    handleclicks(e);

  });

  // Add an input event listener to the input element
  pathInput.addEventListener("input", async () => {
    // Get the current value of the input element
    const path = pathInput.value;

    // Invoke the Rust function with the path as an argument
    getpathlist(path);
  });

  searchInput.addEventListener("input", async () => {
    // Get the current value of the input element

    // Invoke the Rust function with the path as an argument
    searchforit(searchInput.value);
  });

  // Add a listener for the keydown event on the document
  document.addEventListener("keydown", function (e) {
    // Hide the menu if the user presses Esc
    if (e.key === "Escape") {
      menu.style.display = "none";
    }
  });

});

listenforfolcount();
listtabs();
loadmarks();
sendlog();
watchfile();
openhtml();