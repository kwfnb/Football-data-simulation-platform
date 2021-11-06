
import request from "../util/axios"

export function selectTeamLeague(){
    return request({
        url:"/league/selectTeamLeague"
    })
}
