import { Feather } from "@expo/vector-icons";
import { useMemo, useState } from "react";
import { FlatList, Modal, View } from "react-native";
import { Press } from "~/components/AppButton";
import Typography from "~/components/Typography";

export type PickerItem = {
  value: string;
  label: string;
};

type Props = (
  | { multiple: true; value?: PickerItem[]; onChange: (v?: PickerItem[]) => void }
  | { multiple?: never; value?: PickerItem; onChange: (v?: PickerItem) => void }
) & {
  data?: PickerItem[];

  label: string;
};

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
}: Props) => {
  const [modalShown, setModalShown] = useState(false);

  const selected = useMemo(() => {
    if (!value) return "";
    if (!data) return "";
    if (multiple) {
      return "";
    }
    return data.find((item) => value.value == item.value)?.label || "";
  }, [data, value]);

  const closeModal = () => {
    setModalShown(false);
  };
  const openModal = async () => {
    setModalShown(true);
  };
  const clear = () => {
    setModalShown(false);
    setTimeout(() => {
      onChange(undefined);
    }, 0);
  };
  const removeValue = (toRemove: string) => {
    if (!multiple) {
      return;
    }
    return onChange(value?.filter((val) => val.value != toRemove));
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
              renderItem={({ item }) => (
                <Press
                  className="my-1 mx-4 items-center rounded-xl bg-neutral-800 p-4"
                  onPress={() => {
                    setModalShown(false);
                    if (multiple) {
                      if (!!value?.find((val) => val.value == item.value)) {
                        return removeValue(item.value);
                      }
                      onChange([...(value ?? []), item]);
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
      {multiple && <TagsDisplay remove={removeValue} tags={value as PickerItem[]} />}
    </View>
  );
};
export default Picker;

const TagsDisplay = ({ tags, remove }: { tags: PickerItem[]; remove: (value: string) => void }) => {
  return (
    <View className="mt-2 flex-row flex-wrap items-center ">
      {tags.map((tag) => (
        <Press
          onPress={() => remove(tag.value)}
          key={tag.value}
          className="m-1 flex-row items-center rounded-xl bg-neutral-700/40 py-2 px-4 text-center"
        >
          <Typography className="mr-2">{tag.label}</Typography>
          <Feather name="x" color="#ffffff55" size={12} />
        </Press>
      ))}
    </View>
  );
};

export const stringsToPickerData = (value: any): PickerItem[] => {
  return value.map((s: string) => ({ value: s, label: s }));
};
