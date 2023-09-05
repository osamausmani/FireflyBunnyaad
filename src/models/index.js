import { staticFlow } from "./StaticFlows"
import { User, userTextList } from "./User"
import {
    city,
    society,
    plotSize,
    plotCategory,
    floor,
    floorPlan,
    clientCostEstimate

} from "./CostEsimateModels"

const userModel = {
    userID: 0,
    userKey: "string",
    languageCode: "en",
    ip: "string",
    responseState: 200,
}

export {
    userModel,
    staticFlow,
    User,
    userTextList,
    city,
    society,
    plotSize,
    plotCategory,
    floor,
    floorPlan,
    clientCostEstimate


}