import { ReactNode } from "react";
import { Modal, ModalProps, Pressable, StyleProp, View, ViewStyle } from "react-native";

type Props = {
  style?: StyleProp<ViewStyle>;
  modalProps?: ModalProps;
  center?: boolean;
  children?: ReactNode;
};

const BottomSheet = ({ style: containerStyle, modalProps, children, center = false, ...props }: Props) => {
  return (
    <Modal statusBarTranslucent animationType="slide" transparent {...modalProps}>
      <View style={containerStyle} {...props}>
        <Pressable onPress={modalProps?.onRequestClose}>
          <View>{children}</View>
        </Pressable>
      </View>
    </Modal>
  );
};
export default BottomSheet;
