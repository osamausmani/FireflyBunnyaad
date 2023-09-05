import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { AppText, Colors } from '../../constants'

const TermsAndConditionForn = () => {

    let firstBullets = [
        "-   Architectural Services",
        "o   Building floor plans designs",
        "o   Society layout plan designs",
        "o   Building 3D elevations",
        "o   Building 3D interior designs",
        "o   Buildings sections",
        "o   Building working drawings",
        "o   Projects HD animations",
        "o   Submission Drawings",
        "o   Working Drawings",
        "-   Construction",
        "o   Grey Structure construction",
        "o   Finished construction",
        "o   With material construction",
        "o   Without material construction",
        "o   Landscaping",
        "o   House or office interior works",
        "-   Map Approval",
        "o   CDA, RDA, TMA, LDA, GDA, MDA, FDA, DHA, Bahria Town",
        " Residential map approvals",
        " Commercial map approval",
        "• HOME FINANCING"
    ]


    const homefinancing = [
        "-   Bank Alfalah",
        "-   Faysal Bank",
        "-   MCB",
        "-   Meezan Bank",
        "-   Habib Bank Limited",
        "-   Allied Bank Limited",
        "-   National Bank of Pakistan",
        "-   Standard Chartered Bank",
        "-   Silk Bank",
        "-   Habib Metro Bank",
        "-   Bank Al Habib",
        "-   Askari Bank",
        "• APPROVALS"
    ]

    const cdaList = [
        "o   CDA, RDA, TMA, LDA, GDA, MDA, FDA, DHA, Bahria Town- District Council and Union Council approvals.",
        "o   Residential building submission drawings as per by-laws",
        "o   Commercial building submission drawings as per by-laws",
        "o   High-rise commercial building submission drawings as per by-laws",
        "o   Malls building submission drawings as per by-laws",
        "• FLOOR PLANS LIBRARY"
    ]
    const coverdData = [
        "o   CDA",
        "o   RDA",
        "o   TMA",
        "o   LDA",
        "o   GDA",
        "o   MDA",
        "o   FDA",
        "o   DHA",
        "o   Bahria Town"
    ]
    return (
        <View style={{ paddingHorizontal: 25 }}>

            <AppText
                marginTop={10}
                bold
                color={Colors.fieldTextColor}
                alignSelf={"center"}
                title={"CONSULTANCY SERVICES"}
            />
            <AppText
                marginTop={10}
                bold
                color={Colors.fieldTextColor}
                title={"o   Project Consultancy"}
            />
            <AppText
                color={Colors.formTextColor}
                marginTop={5}
                title={"We can help you make sound preparations for your dream building construction projects and ensure that contractors complete the project on cost. Our consultants provide cost estimates, draw budgets, select contractors, administer construction contracts, and resolve differences between contractors and you."}
            />
            <AppText
                bold
                color={Colors.fieldTextColor}
                marginTop={10}
                title={"o  Construction Consultancy"}
            />
            <AppText
                color={Colors.formTextColor}
                marginTop={5}
                title={"We can provide you complete and reliable construction services, from architectural design to grey structure construction till finishing"}
            />
            {
                firstBullets.map(a => <AppText
                    title={a}
                    color={Colors.fieldTextColor}
                    marginTop={5}
                />)
            }


            <AppText
                color={Colors.fieldTextColor}
                marginTop={5}
                title={"Transforming lives through stress-free housing finance.  Get your dream house construction project financed by leading banks in few clicks."}
            />

            {
                homefinancing.map(a => <AppText
                    color={Colors.fieldTextColor}
                    marginTop={5}
                    title={a} />)
            }
            <AppText
                color={Colors.fieldTextColor}
                marginTop={5}
                title={"Get your residential building or a commercial building or an office or a high-rise building or a Mall plans approved by competent authorities"}
            />

            {
                cdaList.map(a => <AppText
                    color={Colors.fieldTextColor}
                    marginTop={5}
                    title={a} />)
            }
            <AppText
                color={Colors.fieldTextColor}
                marginTop={5}
                title={"Numerous by-laws-based house floorplans with trendy elevations. Floorplan for houses as small as 20x40 and as big as 75x120"} />
            {
                coverdData.map(a => <AppText
                    color={Colors.fieldTextColor}
                    marginTop={5}
                    title={a} />)
            }
            <AppText />

        </View>
    )
}

export default TermsAndConditionForn

const styles = StyleSheet.create({})