import { FlowButton, FlowModal, FlowRow, FlowText } from "../overrides"


export const ConfirmationModal = ({visible, message, onConfirm, onCancel}) => {

  return (
    <FlowModal visible={visible} animationType={"fade"}>
      <FlowText style={{marginBottom: 10}}>{message}</FlowText>
      <FlowRow style={{justifyContent: "space-around"}}>
      <FlowButton ghost type={"danger"} content={"Confirm"} onPressIn={onConfirm} />
        <FlowButton ghost type={"primary"} content={"Cancel"} onPressIn={onCancel} />
      </FlowRow>
    </FlowModal>
  )
}