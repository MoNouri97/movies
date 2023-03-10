import { Image, View } from "react-native";
import { getImage } from "~/api/images";
import Typography from "~/components/Typography";
import { CastMember as CastMemberType } from "~/domain/credits";

export const CARD_HEIGHT = 300;
export const CARD_WIDTH = 96;
type Props = { actor: CastMemberType };
const CastMember = ({ actor }: Props) => {
  return (
    <View className="m-2 items-center justify-start" style={{ height: CARD_HEIGHT, width: CARD_WIDTH }}>
      {actor.profile_path && <Image source={{ uri: getImage(actor.profile_path) }} className="h-32 w-24 rounded-xl" />}
      <Typography numberOfLines={1} className="w-full text-center text-purple-400 ">
        {actor.name}
      </Typography>
      <Typography numberOfLines={1} className="w-full text-center">
        {actor.character}
      </Typography>
      {/* <AppText>{actor.character}</AppText> */}
    </View>
  );
};
export default CastMember;
