import { StyleSheet, TextInput, View } from "react-native";
import { FlowButton, FlowHighlightView, FlowModal, FlowText } from "../overrides/index";
import { useEffect, useState } from "react";
import { COLORS, SIZES } from "../../variables/styles";
import { formatTime } from "../../utils/functions";
import { Entypo } from '@expo/vector-icons';
import { ConfirmationModal } from "../common/ConfirmationModal";


export const ItemDetail = ({focusedItem, time, onItemEdit, onItemDelete}) => {
  const [showModal, setShowModal] = useState(false);
  const [showPrompt, setShowPrompt] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  useEffect(() => {
    if (focusedItem) {
      setShowModal(true);
      setTitle(focusedItem.title);
      setDescription(focusedItem.description);
      setIsEditing(false);
    }
  }, [focusedItem]);
  const confirm = () => {
    onItemEdit({...focusedItem, title, description});
    setIsEditing(false);
  }
  const confirmPrompt = () => {
    setShowPrompt(false);
    setShowModal(false);
    onItemDelete({...focusedItem});
  }

  return (
    <FlowModal
      fullScreen
      bgColor={COLORS.black}
      visible={showModal}
      animationType={"fade"}
    >
      <FlowButton
        onPressIn={() => setShowModal(false)}
        style={styles.backButton}
        ghost
        type={"primary"}
        content={"Back"}
      />
      <FlowHighlightView>
        <View>
          <FlowText style={styles.timer}>
            { focusedItem?.isActive ?
              formatTime(time) :
              formatTime(focusedItem?.time)
            }
          </FlowText>
        </View>
        <View>
          { isEditing ?
            <TextInput
              style={{...styles.title, ...styles.input}}
              value={title}
              placeholder="Activity name..."
              placeholderTextColor={COLORS.semiDarkGray}
              onChangeText={setTitle}
            /> :
            <FlowText style={styles.title}>{title}</FlowText>
          }
        </View>
        <View>
        { isEditing ?
            <TextInput
              style={{...styles.title, ...styles.input, ...styles.multilineInput}}
              value={description}
              placeholder="Info about activity..."
              placeholderTextColor={COLORS.semiDarkGray}
              onChangeText={setDescription}
              multiline
              numberOfLines={4}
            /> :
            <FlowText>{description}</FlowText>
          }
        </View>
        <View style={{marginBottom: 20}} />
        <View>
          { isEditing ?
            <FlowButton
              onPressIn={confirm}
              ghost
              type={"primary"}
              content={"Confirm"}
            /> :
            <FlowButton
              onPressIn={() => setIsEditing(true)}
              ghost
              type={"primary"}
              content={"Edit"}
            />
          }
        </View>
      </FlowHighlightView>
      <ConfirmationModal
        visible={showPrompt}
        message={"Are you sure you want to delete this item?"}
        onConfirm={confirmPrompt}
        onCancel={() => setShowPrompt(false)}
      />
      <View>
        <FlowButton
          onPressIn={() => setShowPrompt(true)}
          type={"danger"}
          style={styles.deleteButton}
          content={(props) =>
            <Entypo name="trash" size={24} color="black" />
          }
        />
      </View>
    </FlowModal>
  )
}
const styles = StyleSheet.create({
  backButton: {
    marginBottom: 20,
  },
  deleteButton: {
    marginTop: 10,
    display: "flex",
    alignItems: "center"
  },
  timer: {
    color: COLORS.brightGreen,
    marginBottom: 10,
  },
  title: {
    fontWeight: "bold",
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.semiDarkGray,
    borderRadius: 5,
    padding: 10,
    fontWeight: "500",
    color: COLORS.white
  },
  multilineInput: {
    height: 100,
    textAlignVertical: "top",
  }
})