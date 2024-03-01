import {StyleSheet,View} from "react-native"


export const FlowRow = ({children,style}) => {

  return (
    <View 
    style={{
        ...styles.row,
         ...style,
         }}
         >
      {children}
    </View>
  )
}

const styles = StyleSheet.create({
  row: {
    display:"flex",
    flexDirection:"row",
    alignItems:"center",
  }
})