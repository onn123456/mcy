import {combineReducers} from "redux"
import {home} from "./homeReducers"
import {goods} from "./goodsReducers"
import {detail} from "./detailReducers"
import {car} from "./carShopReducers"

export let reducer=combineReducers({home,goods,detail,car})