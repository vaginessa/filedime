use std::collections::HashSet;

use serde::Serialize;
use tauri::{AppHandle, Manager};

use crate::FileItem;

pub fn lfat(windowname: &str, ah: &AppHandle, wtr: &str) -> Result<(), String> {
    ah.emit_to(windowname, "lfat", wtr)
        .map_err(|e| e.to_string())
        .unwrap();
    Ok(())
}
pub fn showdialog(windowname: &str, ah: &AppHandle, wtr: &str) -> Result<(), String> {
    ah.emit_to(windowname, "showdialog", wtr)
        .map_err(|e| e.to_string())
        .unwrap();
    Ok(())
}
pub fn sendbuttonnames(ah: &AppHandle, buttonnames: &Vec<String>) -> Result<(), String> {
    ah.emit_to(
        "main",
        "button-names",
        serde_json::to_string(buttonnames).unwrap(),
    )
    .map_err(|e| e.to_string())
    .unwrap();
    Ok(())
}
#[derive(Clone, Debug, Serialize, Eq, Hash, PartialEq)]
struct Parent {
    path: String,
    tabid: String,
}
pub fn sendparentloc(
    windowname: &str,
    ah: &AppHandle,
    parent: String,
    oid: &String,
) -> Result<(), String> {
    ah.emit_to(
        windowname,
        "parent-loc",
        serde_json::to_string(&Parent {
            path: parent,
            tabid: oid.to_string(),
        })
        .unwrap(),
    )
    .map_err(|e| e.to_string())
    .unwrap();
    Ok(())
}

pub fn notifychange(windowname: &str, ah: &AppHandle) {
    ah.emit_to(windowname, "send-log", "changed")
        .map_err(|e| e.to_string())
        .unwrap();
}
pub fn starttimer(windowname: &str, ah: &AppHandle) -> Result<(), String> {
    ah.emit_to(windowname, "start-timer", "")
        .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn stoptimer(windowname: &str, ah: &AppHandle) -> Result<(), String> {
    ah.emit_to(windowname, "stop-timer", "")
        .map_err(|e| e.to_string())?;
    loadcomplete(windowname, ah);
    Ok(())
}

pub fn loadhistory(windowname: &str, ah: &AppHandle, string: String) -> Result<(), String> {
    ah.emit_to(windowname, "load-hist", string)
        .map_err(|e| e.to_string())?;
    Ok(())
}
pub fn sendprogress(windowname: &str, ah: &AppHandle, string: String) -> Result<(), String> {
    ah.emit_to(windowname, "fopprogress", string)
        .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn loadmarks(windowname: &str, ah: &AppHandle, string: String) {
    ah.emit_to(windowname, "load-marks", string)
        .map_err(|e| e.to_string())
        .unwrap();
}

pub fn lct(windowname: &str, ah: &AppHandle, string: String) -> Result<(), String> {
    ah.emit_to(windowname, "lct", string)
        .map_err(|e| e.to_string())?;
    Ok(())
}
pub fn folsize(windowname: &str, ah: &AppHandle, string: String) -> Result<(), String> {
    ah.emit_to(windowname, "folder-size", string)
        .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn sendfilesetcollection(
    windowname: &str,
    ah: &AppHandle,
    string: &String,
) -> Result<(), String> {
    ah.emit_to(windowname, "fsc", string)
        .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn folcount(windowname: &str, ah: &AppHandle, fcount: usize) -> Result<(), String> {
    ah.emit_to(windowname, "folder-count", fcount)
        .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn fileslist(windowname: &str, ah: &AppHandle, fl: &String) -> Result<(), String> {
    // println!("{}",fl);
    ah.emit_to(windowname, "list-files", fl)
        .map_err(|e| e.to_string())?;
    Ok(())
}
pub fn driveslist(windowname: &str, ah: &AppHandle, fl: &String) -> Result<(), String> {
    // println!("sending drives list to {} {}", fl, windowname);
    ah.emit_to(windowname, "list-drives", fl)
        .map_err(|e| e.to_string())?;
    Ok(())
}

pub fn slist(windowname: &str, ah: &AppHandle, wtr: &Vec<FileItem>, string: String) {
    ah.emit_to(
        windowname,
        "load-sresults",
        serde_json::to_string(&wtr).unwrap(),
    )
    .map_err(|e| e.to_string())
    .unwrap();
    ah.emit_to(windowname, "sterm", string.clone())
        .map_err(|e| e.to_string())
        .unwrap();
    loadcomplete(windowname, ah);
}

pub fn loadcomplete(windowname: &str, ah: &AppHandle) {
    ah.emit_to(windowname, "load-complete", "")
        .map_err(|e| e.to_string())
        .unwrap();
}

pub fn progress(windowname: &str, ah: &AppHandle, len: i32) {
    ah.emit_to(windowname, "progress", len)
        .map_err(|e| e.to_string())
        .unwrap();
}
pub fn processing(windowname: &str, ah: &AppHandle, data: String) {
    ah.emit_to(windowname, "processing", data)
        .map_err(|e| e.to_string())
        .unwrap();
}

pub fn rflist(windowname: &str, ah: &AppHandle, wtr: &HashSet<FileItem>) {
    ah.emit_to(
        windowname,
        "load-sresults",
        serde_json::to_string(&wtr).unwrap(),
    )
    .map_err(|e| e.to_string())
    .unwrap();
    if (wtr.len() > 0) {
        ah.emit_to(windowname, "sterm", "Recents")
            .map_err(|e| e.to_string())
            .unwrap();
        loadcomplete(windowname, ah);
        ah.emit_to(windowname, "sortbydate", "")
            .map_err(|e| e.to_string())
            .unwrap();
    }
}
