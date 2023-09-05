import React, { useState, useEffect } from 'react';
import { _retrieveObject, _retrieveData, _removeItem } from '../constants/AsyncStorageHelper'


export const AppContext = React.createContext()

const AppProvider = ({ children }) => {

    // login States
    const [authData, setAuthData] = useState({
        isLogin: false,
        userId: -1,
        userName: '',
        phNumber: ''
    })

    // cost estimator states data
    const [result, setResult] = useState({
        name: "",
        city: "",
        plotArea: "",
        sizeOfPlot: "",
        constructionQuality: "",
        plotCategory: "",
        noOfFloors: "",
        noOfUnits: "",
        floorPlan: "",
        cityId: 0,
        societyId: 0,
        plotSizeId: 0,
        plotCategoryId: 0,
        floorId: 0,
        unitId: 0,
        floorPlanId: 0,
        constructionQualityId: 0
    })
    const [constructionData, setContructionData] = useState(null)
    const [floorPlanData, setFloorPlanData] = useState(null)
    const [finishingList, setFinishingList] = useState([])
    const [floorPlanId,setFloorPlanId] = useState('')

    const [floorRelationIds, setFloorRelationIds] = useState({
        userId:0,
        cityID: 0,
        societyID: 0,
        plotSizeID: 0,
        plotCategoryID: 0,
        floorID: 0,
        unitID: 1,
        floorPlanID: 0
    })

    const [approvalRelationIds, setApprovalRelationIds] = useState({
        societyID: 0,
        plotSizeID: 0,
        floorID: 0,
    })
    const [costEstimateId, setCostEstimateId] = useState(0)
    const [modalData, setModlData] = useState({
        user: {},
    })

    const [downloadData, setDownloadData] = useState({
        file: "",
        isIntrestedFile: false
    })




    return (
        <AppContext.Provider
            value={{
                authData,
                setAuthData,

                result,
                setResult,

                constructionData,
                setContructionData,

                floorPlanData,
                setFloorPlanData,

                finishingList,
                setFinishingList,

                floorRelationIds,
                setFloorRelationIds,

                costEstimateId,
                setCostEstimateId,

                modalData,
                setModlData,

                approvalRelationIds,
                setApprovalRelationIds,

                downloadData,
                setDownloadData,
                
                floorPlanId,
                setFloorPlanId
            }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;