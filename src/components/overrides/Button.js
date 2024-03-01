import { Pressable, Text } from "react-native"
import { COLORS, SIZES } from "../../variables/styles"

// "primary" "danger" "warning"

export const FlowButton = ({content: Content, ghost,size, disabled,style,type, ...rest}) => {
  const color = type === "primary" ?
    COLORS.normalGreen : type === "danger" ?
    COLORS.brightRed : type === "warning" ?
    COLORS.brightYellow : COLORS.brightBlue;

  const _size = size?? SIZES.fontSmall;

  const isDisabled = disabled ?? false;
  const isGhost = ghost ?? false;

  const buttonStyle = isGhost ? {
    backgroundColor: "transparent"
  } : {
    backgroundColor: isDisabled ? COLORS.semiDarkGray : color,
    padding: 10,
    borderRadius: 5
  };

  const textStyle = isGhost ? {
    color: isDisabled ? COLORS.semiDarkGray : color,
    fontSize:_size
  } : {
      color: isDisabled ? COLORS.darkGray : COLORS.white,
     fontSize:_size
  };

  return (
    <Pressable
      disabled={isDisabled} {...rest}
      style={{...buttonStyle, ...style, userSelect: "none"}}
    >
          {typeof Content === "string" ?
        <Text style={{...textStyle}}>{Content}</Text> :
        <Content color={textStyle.color} size={_size} />
      }
    </Pressable>
  )
}