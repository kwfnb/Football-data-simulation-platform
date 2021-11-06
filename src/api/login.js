/*
 * @Descripttion: your project
 * @Author: kongwf
 * @Date: 2021-11-05 14:14:07
 * @LastEditors: kongwf
 * @LastEditTime: 2021-11-06 16:17:30
 */

import request from "../util/axios"

export function addUser(data){
    return request({
        url:"/user/insertUser",
        method: 'post',
        data:data,
        isJson:true
    })
}

export function selectUserByName(data){
    return request({
        url:"/user/selectUserByName",
        method: 'post',
        data:data,
    })
}

export function deleteUserByName(data){
    return request({
        url:`/user/deleteUserByName/${data}`,
        method: 'get',
    })
}

export function selectUserAll(){
    return request({
        url:`/user/selectUser`,
        method: 'get',
    })
}

export function updateUser(data){
    return request({
        url:`/user/updateUser`,
        method: 'post',
        data:data
    })
}