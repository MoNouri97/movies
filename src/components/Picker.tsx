import { useMemo, useState } from "react";
import { FlatList, Modal, View } from "react-native";
import { Press } from "~/components/AppButton";
import Typography from "~/components/Typography";

type Item = {
  value: string;
  label: string;
};

type Props = {
  data: Item[];
  value: Item;
  onChange: (i: Item) => void;
};

const Picker = ({ data, value, onChange }: Props) => {
  const [modalShown, setModalShown] = useState(false);

  const selected = useMemo(() => {
    if (!value) return "";
    if (!data) return "";
    for (const item of data) {
      if (item.value == value.value) return item.label;
    }
    return "";
  }, [value]);

  const closeModal = () => {
    setModalShown(false);
    // setTouched(true);
  };
  const openModal = async () => {
    setModalShown(true);
    // if (onOpen) {
    //   onOpen();
    // }
  };
  const clear = () => {
    setModalShown(false);
    // setTimeout(() => {
    //   setValue(undefined);
    // }, 0);
  };

  return (
    <View className="w-full overflow-hidden rounded-2xl bg-neutral-700">
      <Press onPress={openModal} className="w-full p-4">
        <Modal onRequestClose={closeModal} visible={modalShown} animationType="slide" transparent>
          <View className="w-full flex-1 bg-neutral-900">
            <FlatList
              contentContainerStyle={{
                flex: 1,
                alignItems: "center",
                justifyContent: "center",
              }}
              data={data}
              // ListEmptyComponent={EmptyListItem}
              keyExtractor={(item) => item.value}
              // ItemSeparatorComponent={Separator}
              renderItem={({ item }) => (
                <Press
                  className="bg-red-200/10 p-2"
                  onPress={() => {
                    setModalShown(false);
                    // setTimeout(() => {
                    // 	setValue(item.id);
                    // }, 0);
                  }}
                >
                  <Typography>{item.label}</Typography>
                </Press>
              )}
            />
          </View>
        </Modal>

        {!value ? (
          <View>
            <Typography>Select ...</Typography>
          </View>
        ) : (
          <Typography>{selected}</Typography>
        )}
      </Press>
    </View>
  );
};
export default Picker;
