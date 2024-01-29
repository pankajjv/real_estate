import express from "express";

export const home = (req, res)=>{
    res.send("home page of user/api")
}

export const test = (req, res)=>{
    res.send("test page of user/api")
}
