import {View,StyleSheet} from "react-native"
import {COLORS} from "../../variables/styles"

export const FlowHighlightView= ({children,style})=> {
    return(
        <View style={{...styles.view, ...style}}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        backgroundColor: COLORS.darkGray,
        borderRadius: 10,
        padding: 15
        }
    })