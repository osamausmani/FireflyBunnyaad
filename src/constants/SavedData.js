import { floor_plan_img, floor_final } from "../assets/path";

const date = new Date();
const todayDate = date.getFullYear() + '-' + (date.getMonth() + 1) + '-' + date.getDate();


export const savedData = [
    {
        id: 1,
        title: 'My Dream House',
        timeStamp: '2020-05-14T04:00:00Z',
        completion: 95,
        costTitle: "Total Cost",
        costValue: '120,000,000'
    },
    {
        id: 2,
        title: 'My Dream House 2',
        timeStamp: '2020-05-14T04:00:00Z',
        completion: 30,
        costTitle: "Total Cost",
        costValue: '120,000,000'
    },
    {
        id: 3,
        title: 'My Dream House 3',
        timeStamp: '2020-05-14T04:00:00Z',
        completion: 65,
        costTitle: "Total Cost",
        costValue: '120,000,000'
    },
    {
        id: 4,
        title: 'My Dream House 4',
        timeStamp: '2020-05-14T04:00:00Z',
        completion: 80,
        costTitle: "Total Cost",
        costValue: '120,000,000'
    },
    {
        id: 5,
        title: 'My Dream House 5',
        timeStamp: '2020-05-14T04:00:00Z',
        completion: 70,
        costTitle: "Total Cost",
        costValue: '120,000,000'
    },
    {
        id: 6,
        title: 'My Dream House 5',
        timeStamp: '2020-05-14T04:00:00Z',
        completion: 70,
        costTitle: "Total Cost",
        costValue: '120,000,000'
    },
    {
        id: 7,
        title: 'My Dream House 5',
        timeStamp: '2020-05-14T04:00:00Z',
        completion: 70,
        costTitle: "Total Cost",
        costValue: '120,000,000'
    },

]

export const costCalculatorData = [
    {
        id: 0,
        heading: 'Enter Your Project Name ',
        headingUrdu: '',
        options: [],
        defaultSelected: null
    },
    {
        id: 1,
        heading: 'Select Your City',
        headingUrdu: '',
        options: ["Islamabad", "Lahore", "Karachi", "Quetta",],
        defaultSelected: null
    },
    {
        id: 2,
        heading: 'Select Your Society / Area',
        headingUrdu: '',
        options: ["Naval Anchorage", "Gulberg Greens", "Bahria Town", "Capital Development Authority"],
        defaultSelected: null
    },
    {
        id: 3,
        heading: 'Size of Plot ?',
        headingUrdu: '',
        options: ["20 X 40 ()", "25 X 45 ()", "25 X 50 ()", "30 X 50 ()", "30 X 60 ()", "35 X 70 ()", "35 X 75 ()",],
        defaultSelected: null
    },
    {
        id: 4,
        heading: 'Plot Categories',
        headingUrdu: '',
        options: ["General (Non-corner)", "Right side corner", "Left side corner]"],
        defaultSelected: null
    },
    {
        id: 5,
        heading: 'No. of floors',
        headingUrdu: '',
        options: ["Basement + Ground + 1st floor + Mumty", "Ground + 1st floor + Mumty", "Basement + Ground + Mumty", "Ground + Mumty"],
        defaultSelected: null
    },
    {
        id: 6,
        heading: 'Number of units',
        headingUrdu: '',
        options: ["Single Unit", "Multi Unit"],
        defaultSelected: null
    },
    {
        id: 7,
        heading: 'floor plans',
        headingUrdu: '',
        options: ["Local Tiles", "Branded Tiles", "Import Tiles",],
        defaultSelected: null
    },
    {
        id: 8,
        heading: 'Construction Quality',
        headingUrdu: '',
        options: ["A Grade (Premium Quality)", "B Grade (standard Quality)", "C Grade (Economy Quality)", "Pick your Own"],
        defaultSelected: null
    },

    {
        id: 9,
        heading: 'List of Finishing Material',
        headingUrdu: '',
        options: ["Tiling", "Terazzo", "Magnesite floor covering", "Vinyl asbestos tiles", "Roof Finishes"],
        defaultSelected: null
    },
]

export const ModalData = [
    {
        img: floor_plan_img,
        title: "Basement"
    },
    {
        img: floor_plan_img,
        title: "Ground"
    },
    {
        img: floor_plan_img,
        title: "First Floor"
    },
    {
        img: floor_final,
        title: ""
    }
]

export const boqData = [
    { key: "City", value: "Islamabad" },
    { key: "Plot Area", value: "Bahria Town" },
    { key: "Size of Plot", value: "5 Marla" },
    { key: "Construction Quality", value: "Custom" },
    { key: "Plot Categories", value: "General (Non-Corner)" },
    { key: "No. of Floors", value: "Basement + Ground + 1st Floor + Mumt" },
    { key: "Number of Units", value: "Single Unit" },
]

export const greyStructureBoq = [
    { key: "Bricks", value: "Premium 500 Pieces" },
    { key: "Steel", value: "Single Unit 100 Tons" },
    { key: "Cement", value: "Single Unit 500 Bags" },
]

export const checkImage = [
    {
        img: "https://foyr.com/learn/wp-content/uploads/2022/03/what-is-floor-plan.png",
        title: "Basement"
    },
    {
        img: "https://foyr.com/learn/wp-content/uploads/2022/03/what-is-floor-plan.png",
        title: "Ground"
    },
    {
        img: "https://foyr.com/learn/wp-content/uploads/2022/03/what-is-floor-plan.png",
        title: "First Floor"
    },
    {
        img: "https://stylesatlife.com/wp-content/uploads/2021/03/Best-House-Elevation-Designs.jpg",
        title: "First Floor"
    },

]