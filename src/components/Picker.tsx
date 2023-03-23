import { useMemo, useState } from "react";
import { FlatList, Modal, View } from "react-native";
import { Press } from "~/components/AppButton";
import Typography from "~/components/Typography";

export type PickerItem = {
  value: string;
  label: string;
};

type Props<T extends PickerItem[] | PickerItem> = (T extends Array<PickerItem>
  ? { multiple?: true }
  : { multiple?: never }) & {
  value?: T;
  data?: PickerItem[];
  onChange: (value: any) => void;
  label: string;
};

const Seperator = () => <View className="h-1 bg-neutral-900" />;
const EmptyListItem = () => (
  <View className="flex-1 items-center justify-center">
    <Typography>No Options</Typography>
  </View>
);
const Picker = <T extends PickerItem[] | PickerItem>({
  data = [],
  value,
  onChange,
  label,
  multiple,
}: Props<T>) => {
  const [modalShown, setModalShown] = useState(false);

  const selected = useMemo(() => {
    if (!value) return "";
    if (!data) return "";
    if (multiple || Array.isArray(value)) {
      return "";
    }
    return data.find((item) => value.value == item.value)?.label || "";
    // if (multiple) {
    //   return data.filter((item) => {
    //     const found = value.find((val) => val.value == item.value);
    //     return found != undefined;
    //   });
    // } else {
    //   return data.find((item) => value.value == item.value)?.label || "";
    // }
  }, [data, value]);

  const closeModal = () => {
    setModalShown(false);
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
    <View className="w-full overflow-hidden">
      <Typography className="m-2">{label}</Typography>
      <Press onPress={openModal} className="w-full  rounded-2xl bg-neutral-700 p-3">
        <Modal onRequestClose={closeModal} visible={modalShown} animationType="slide" transparent>
          <View className="w-full bg-neutral-900">
            <FlatList
              contentContainerStyle={{
                justifyContent: "center",
              }}
              data={data}
              ListEmptyComponent={EmptyListItem}
              keyExtractor={(item) => item.value}
              // ItemSeparatorComponent={Seperator}
              renderItem={({ item }) => (
                <Press
                  className="my-1 mx-4 items-center rounded-xl bg-neutral-800 p-4"
                  onPress={() => {
                    setModalShown(false);
                    if (multiple && Array.isArray(value)) {
                      if (!!value.find((val) => val.value == item.value)) {
                        return onChange(value.filter((val) => val.value != item.value));
                      }
                      onChange([...value, item]);
                    } else {
                      onChange(item);
                    }
                  }}
                >
                  <Typography>{item.label}</Typography>
                </Press>
              )}
            />
          </View>
        </Modal>

        {!value || multiple ? (
          <View>
            <Typography variant="LABEL">Select ...</Typography>
          </View>
        ) : (
          <Typography>{selected}</Typography>
        )}
      </Press>
      {multiple && <TagsDisplay tags={value as PickerItem[]} />}
    </View>
  );
};
export default Picker;

const TagsDisplay = ({ tags }: { tags: PickerItem[] }) => {
  return (
    <View className="mt-2 flex-row flex-wrap items-center ">
      {tags.map((tag) => (
        <View key={tag.value} className="m-1 rounded-xl bg-neutral-700/40 py-2 px-4 text-center">
          <Typography>{tag.label}</Typography>
        </View>
      ))}
    </View>
  );
};
