"use client"
import React from "react";
import GPTchatinterface from "../../components/gptchatinterface";
import {Metadata} from 'next'

export default function RootLayout(){
    let url=typeof window !== 'undefined' ? window.location.hostname : '/'
    console.log(url)
    return <GPTchatinterface fgptendpoint={url} setasollama={true}/>
}