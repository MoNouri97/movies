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
      <View className="flex-1 flex-col-reverse bg-white/10">
        <View className="h-[500] rounded-t-3xl bg-neutral-900" style={containerStyle} {...props}>
          <Pressable onPress={modalProps?.onRequestClose}>
            <View>{children}</View>
          </Pressable>
        </View>
      </View>
    </Modal>
  );
};
export default BottomSheet;
