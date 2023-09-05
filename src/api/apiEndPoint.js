import { PostRequest, AuthRequest } from "./axios"

export { PostRequest, AuthRequest }

// export const baseUrlApi = 'http://192.168.100.37:5000/api/'
// export const imgUrl = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/wwwroot/'
// export const flowUrl = 'http://192.168.100.37:5000/api/'

export const baseUrlApi = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/api/'
export const imgUrl = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/wwwroot/'
export const flowUrl = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/'

// export const baseUrlApi = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/api/'
// export const imgUrl = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/wwwroot/'
// export const flowUrl = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/'

// export const baseUrlApi = 'http://localhost:5000/api/'
// export const imgUrl = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/wwwroot/'
// export const flowUrl = 'http://95.216.202.81/plesk-site-preview/api.bunnyaad.com/'

export const insertUserApi = `User/InsertUser`
export const loginUserApi = `User/UserLogin`
export const validateUserOtpApi = `User/ValidateUserOTP`
export const resendUserOTPApi = `User/ResendUserOTP`
export const resendUserOTPByPhoneNumberApi = `User/ResendUserOTPByPhoneNumber`
export const resetUserPasswordApi = `User/ResetUserPassword`
export const getAllStaticFlowsApi = `StaticFlow/GetAllStaticFlows`

export const getCitysDDLApi = `City/GetCitysDDL`
export const getSocietysDDLApi = `Society/GetSocietysDDL`
export const getPlotSizesDDLApi = `PlotSize/GetPlotSizesDDL`
export const getPlotCategorysDDLApi = `PlotCategory/GetPlotCategorysDDL`
export const getFloorsDDLApi = `Floor/GetFloorsDDL`
export const getUnitsDDLApi = `Unit/GetUnitsDDL`
export const getAllFloorPlansApi = `FloorPlan/GetAllFloorPlans`
export const getAllConstructionQualitysApi = `ConstructionQuality/GetAllConstructionQualitys`
export const getetCustomQualityRawMaterialDetailsApi = `FloorPlan/GetCustomQualityRawMaterialDetails`
export const getRawMaterialDetailsByConstructionQualityApi = `FloorPlan/GetRawMaterialDetailsByConstructionQuality`
export const getRawMaterialByCategoryIDApi = `RawMaterial/GetRawMaterialByCategoryID`
export const getRawMaterialByFloorPlansApi = `FloorPlan/GetFinishingRawMaterialDetailsByFloorPlan`

export const getDevelopmentAuthoritysDDLApi = `DevelopmentAuthority/GetDevelopmentAuthoritysDDL`
export const getAllClientCostEstimatesApi = `ClientCostEstimate/GetAllClientCostEstimates`
export const insertClientCostEstimateApi = `ClientCostEstimate/InsertClientCostEstimate`
export const getBanksDDLApi = `Bank/GetBanksDDL`
export const getHomeFinanceDocApi = `ClientCostEstimate/GetHomeFinanceDoc`
export const updateClientCostEstimateQuestionsApi = `ClientCostEstimate/UpdateClientCostEstimateQuestions`
export const renameProjectNameApi = `ClientCostEstimate/RenameProjectName`
export const updateClientCostEstimateStatusApi = `ClientCostEstimate/UpdateClientCostEstimateStatus`


export const getAllApprovalsApi = `Approval/GetAllApprovals`
export const getAllBilosApi = `Bilos/GetAllBilos`
export const getAllLopsApi = `LOP/GetAllLOPs`

export const insertConsultancyApi = `Consultancy/InsertConsultancy`
export const getAllConsultancyInfosApi = `ConsultancyInfo/GetAllConsultancyInfos`
export const getAllFAQsApi = `FAQ/GetAllFAQs`
export const getAllSoilTestingsApi = `SoilTesting/GetAllSoilTestings`

export const uploadAttachmentBase64Api = `Attachment/UploadAttachmentBase64`
export const getAttachmentApi = `Attachment/GetAttachmentsByDetails`
export const getFloorPlanByIDApi = `FloorPlan/GetFloorPlanByID`
